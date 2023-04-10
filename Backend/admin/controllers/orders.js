import axios from "axios";
import Order from "../models/Order.js";

export const createOrder = async (req, res) => {
    const orderDetails = req.body;
    const { userID } = req.params;
    try {

        if (!orderDetails) {
            return res.status(404).json({ "message": "Body not found" })
        } else {
            //console.log(orderDetails);
            const orderData = Order({
                userID: userID,
                products: orderDetails.products,
                amount: orderDetails.amount,
            })

            await orderData.save();
            return res.status(200).json({ "message": "Order has been created" });
        }

    } catch (error) {
        return res.status(500).json(error);
    }
}

export const addDeliveryAddress = async (req, res) => {
    const { address, mobile } = req.body;
    const { orderID } = req.params;
    try {

        if (!address || !mobile || !orderID) {
            return res.status(404).json({ "message": "Data not found" });
        } else {
            //console.log(orderDetails);
            await Order.findByIdAndUpdate({ _id: orderID }, { $set: { deliveryAddress: address, mobile: mobile } }, { new: true })
                .then((response) => {
                    //console.log(response);
                    return res.status(200).json({ "message": "success", response })
                })
                .catch((error) => {
                    return res.status(400).json({ "error": error.message })
                })

        }

    } catch (error) {
        return res.status(500).json(error);
    }
}

export const confirmOrder = async (req, res) => {
    const { totalAmount, paymentMode } = req.body;
    const { orderID } = req.params;

    try {
        if (!paymentMode & !totalAmount) {
            return res.status(400).json({ "message": "Input data not found" })
        } else {
            if (paymentMode === "cod") {
                await Order.findByIdAndUpdate({ _id: orderID }, { paymentMode: paymentMode, orderStatus: "ordered", deliveryStatus: "pending", paymentStatus: "pending" }, { new: true })
                    .then((response) => {
                        return res.status(200).json(response);
                    })
                    .catch((error) => {
                        return res.status(404).json({ error: error });
                    })
            } else if (paymentMode === "online") {
                const order = await Order.findOne({ _id: orderID });
                if (order) {
                    await axios.post("http://localhost:8000/api/payment/razorpay-order", { amount: totalAmount }, {
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                    })
                        .then((response) => {
                            console.log(response);
                            return res.status(200).json({ data: response });
                        })
                        .catch((error) => {
                            return res.status(400).json(error.message)
                        })
                } else {
                    return res.status(404).json({ "message": "Order not found" });
                }


            } else {
                return res.status(400).json({ "message": "Payment failed" });
            }
        }
    } catch (error) {
        return res.status(500).json(error);
    }

}

export const onlinePaymentConfirmation = async (req, res) => {
    const { orderID } = req.params;
    await Order.findByIdAndUpdate({ _id: orderID }, { paymentMode: "online", orderStatus: "ordered", deliveryStatus: "pending", paymentStatus: "paid" }, { new: true })
        .then((response) => {
            return res.status(200).json(response);
        })
        .catch((error) => {
            return res.status(404).json({ error: error });
        })
}