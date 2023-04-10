import axios from "axios";

export const createOrder = async (req, res) => {
    const orderDetails = req.body;
    const {id} = req.user;
    try {

        if (!orderDetails) {
            return res.status(404).json({ "message": "Body not found" })
        } else {
            //console.log(orderDetails);
            await axios.post("http://localhost:8002/api/admin/create-order/" +id, orderDetails, {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            })
            .then((response) => {
                console.log(response.data);
                return res.status(200).json({ message: "order created", data: response.data });
            })
            .catch((error) => {
                return res.status(400).json(error.message)
            })
        }

    } catch (error) {
        return res.status(500).json(error);
    }
}

export const addDeliveryAddress = async (req, res) => {
    const {address, mobile} = req.body;
    const {orderID} = req.params;
    try {

        if (!address || !mobile || !orderID) {
            return res.status(404).json({ "message": "Data not found" });
        } else {
            //console.log(orderDetails);
            await axios.post("http://localhost:8002/api/admin/add-delivery-address/" +orderID, req.body, {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            })
            .then((response) => {
                console.log(response.data);
                return res.status(200).json({ message: "Delivery address and mobile added", data: response.data });
            })
            .catch((error) => {
                return res.status(400).json(error.message)
            })
            
        }

    } catch (error) {
        return res.status(500).json(error);
    }
}