import Customer from "../models/Customer.js";

export const updateAddress = async (req, res) => {
    const { id } = req.user;
    const { mobile, address, state, district } = req.body;
    try {
        if (!id) {
            res.status(404).json({ "message": "User not logged in" });
        } else {
            const customer = await Customer.findOne({ _id: id });
            if (customer) {
                const updatedData = await Customer.updateOne({ _id: id }, { $set: { mobile: mobile, address: address, state: state, district: district } }, { new: true });
                if (updatedData) {
                    return res.status(200).json({ "message": "Address updated", updatedData })
                } else {
                    return res.status(200).json({ "message": "Address not updated", err })
                }
            } else {
                return res.status(404).json({ "message": "Customer not found" })
            }
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error });
    }
}