import Admin from "../models/Admin.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
//import jwt_decode from 'jwt-decode';

export const adminSignup = async (req, res, next) => {
    try {
        let adminDetails = req.body;
        console.log(adminDetails);
        if (!adminDetails.username || !adminDetails.password || !adminDetails.email) {
            return res.status(404).send("Invalid details. All fields are required")
        } else {
            const admin = await Admin.findOne({ username: adminDetails.username });
            if (admin) {
                return res.json({"message":"Admin already exists"})
            }
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(req.body.password, salt);

            const adminCredentials = Admin({
                username: req.body.username,
                password: hash,
                email: req.body.email,
            })

            await adminCredentials.save();
            res.status(200).send("Admin has been created");
        }

    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error:error });
    }
}


export const adminLogin = async (req, res, next) => {
    try {
        const adminDetails = req.body;
        if (!adminDetails.username || !adminDetails.password) {
            return res.status(404).json({ "message": "Please enter all fields" })
        } else {
            const admin = await Admin.findOne({ username: adminDetails.username });
            if (!admin) return res.json({ "message": "Admin not found" });

            const isPasswordCorrect = await bcrypt.compare(adminDetails.password, admin.password);
            if (!isPasswordCorrect) return res.json({ "message": "Invalid email or password" });

            const token = jwt.sign({ id: admin._id, username: admin.username, isAdmin: true }, process.env.JWT);
            const { password, ...otherDetails } = admin._doc;

            //response

            await res
                .cookie("access_token", token, {
                    httpOnly: true,
                })
                .status(200)
                .json({ ...otherDetails });

            // Decoding access_token payload

            // const token = req.cookies.access_token;

            // function getDecodedAccessToken(token) {
            //     try {
            //         return jwt_decode(token);
            //     } catch (Error) {
            //         return null;
            //     }
            // }
            // const tokenInfo = getDecodedAccessToken(token); // decode token
            // //const expireDate = tokenInfo.exp; // get token expiration dateTime
            // console.log(expireDate);
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error:error });
    }
}

export const logout = async (req, res, next) => {
    try {
        res.cookie("access-token", "").status(200).json({ "message": "Logout successful" })
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error:error });
    }
}