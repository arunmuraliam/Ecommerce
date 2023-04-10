import Customer from "../models/Customer.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const customerSignup = async (req, res, next) => {
    try {
        let customerDetails = req.body;
        console.log(customerDetails);
        if (!customerDetails.username || !customerDetails.password || !customerDetails.email) {
            return res.status(404).json({"message":"Invalid details. All fields are required"})
        } else { 
            const customer = await Customer.findOne({ email: customerDetails.email });
            if (customer) {
                return res.json({"message":"Account already exists"})
            }
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(req.body.password, salt);

            const newCustomer = Customer({
                username: req.body.username,
                email: req.body.email,
                password: hash,
            })

            await newCustomer.save();
            res.status(200).json({"message":"Account created"});
        }

    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error:error });
    }
}

export const customerLogin = async (req, res, nest) => {
    try {
        const customerDetails = req.body;
        if (!customerDetails.email || !customerDetails.password) {
            return res.json({"message":"Please enter all fields"})
        } else {
            const customer = await Customer.findOne({ email: customerDetails.email });
            if (!customer) return res.status(404).json({ "message": "User not found" });

            const isPasswordCorrect = await bcrypt.compare(customerDetails.password, customer.password);
            if (!isPasswordCorrect) return res.status(404).json({ "message": "Invalid email or password" });

            const token = jwt.sign({ id: customer._id, email: customer.email }, process.env.JWT);
            const { password, ...otherDetails } = customer._doc;

            //response

            res
                .cookie("access_token", token, {
                    httpOnly: true,
                })
                .status(200)
                .json({ ...otherDetails });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error:error });
    }
}

export const logout = async (req,res, next) => {
    try {
        res.cookie("access-token", "").status(200).json({"message":"Logout successful"})
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error:error });
    }
}
