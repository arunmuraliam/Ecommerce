import Razorpay from 'razorpay';
import crypto from "crypto";
import axios from "axios";

// payment order
export const paymentOrder = async (req, res, next) => {
    try {
        const instance = new Razorpay({
            key_id: process.env.KEY_ID,
            key_secret: process.env.KEY_SECRET,
        })

        const options = {
            amount: req.body.amount * 100,
            currency: "INR",
            receipt: crypto.randomBytes(10).toString("hex"),
        }

        instance.orders.create(options, function (err, order) {
            if (err) {
                console.log(err);
                return res.status(500).json({ message: "Something went wrong" })
            }
            res.status(200).json({ data: order });
            console.log(order);
        });

    } catch (error) {
        //next(error);
        console.log(error);
        res.status(500).json({ message: "Internal Server Error!" })
    }
}

//payment verify

export const paymentVerify = async (req, res, next) => {
    try {
        const { orderID } = req.params;
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature } = req.body;
        console.log(req.body);

        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        var expectedSign = crypto
            .createHmac('sha256', process.env.KEY_SECRET)
            .update(sign.toString())
            .digest('hex');

        if (razorpay_signature === expectedSign) {
            console.log("Verification success");
            //res.status(200).json({ message: "Payment Verification successful" });
            await axios.post("http://localhost:8002/api/admin/verify-order/" + orderID)
                .then((response) => {
                    console.log(response);
                    return res.status(200).json({"message":"Payment Successful", data: response });
                })
                .catch((error) => {
                    return res.status(400).json(error.message)
                })
        } else {
            res.status(400).json({ message: "Invalid signature sent" })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error!" })
    }
}

