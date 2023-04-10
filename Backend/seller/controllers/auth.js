import Seller from "../models/Seller.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const sellerSignup = async (req, res, next) => {
    try {
        let sellerDetails = req.body;
        console.log(sellerDetails);
        if (!sellerDetails.username || !sellerDetails.password || !sellerDetails.email) {
            return res.status(404).json({"message":"Invalid details. All fields are required"})
        } else { 
            const seller = await Seller.findOne({ email: sellerDetails.email });
            if (seller) {
                return res.json({"message":"Account already exists"})
            }
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(req.body.password, salt);

            const newSeller = Seller({
                username: req.body.username,
                email: req.body.email,
                password: hash,
            })

            await newSeller.save();
            res.status(200).json({"message":"Account created"});
        }

    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error:error });
    }
}

export const sellerLogin = async (req, res, next) => {
    try {
        const sellerDetails = req.body;
        if (!sellerDetails.email || !sellerDetails.password) {
            return res.status(401).json({"message":"Please enter all fields"})
        } else {
            const seller = await Seller.findOne({ email: sellerDetails.email });
            if (!seller) return res.status(404).json({ "message": "User not found" });

            const isPasswordCorrect = await bcrypt.compare(sellerDetails.password, seller.password);
            if (!isPasswordCorrect) return res.status(404).json({ "message": "Invalid email or password" });

            const token = jwt.sign({ id: seller._id, email: seller.email, isSeller: true }, process.env.JWT);
            const { password, ...otherDetails } = seller._doc;

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