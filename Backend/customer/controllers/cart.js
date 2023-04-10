import axios from "axios";
import Cart from "../models/Cart.js";
//import Customer from "../models/Customer.js"

export const addToCart = async (req, res, next) => {
    const { productID, sellerID } = req.params;
    const { id } = req.user;
    try {
        let isProduct = false;
        const customer = await Cart.findOne({ userID: id }); // checking if customer id already exists in cart 
        //console.log(customer);
        if (customer != null) {
            for (let i = 0; i < customer.products.length; i++) {
                if (customer.products[i].productID === productID) {
                    console.log(customer.products[i].productID);
                    isProduct = true;
                    return res.json({ "message": "Product already added" })
                }
            }
            if (!isProduct) {
                const updatedItem = await Cart.updateOne({ userID: id }, { $push: { products: { productID:productID, sellerID:sellerID } } })
                //console.log(updatedItem);
                return res.status(200).json({ "message": "Product added" })
            }
        } else {
            // Create new cart for the customer
            const newItem = Cart({
                userID: id,
                products: {
                    productID: productID,
                    sellerID:sellerID,
                },
            })

            await newItem.save();
            res.status(200).json({ "message": "Item added to cart" });
        }

    } catch (error) {
        return res.status(500).json(error)
    }
}

export const deleteCartItem = async (req, res) => {
    const { id } = req.user;
    const { productID } = req.params;

    try {
        let isProduct = false;
        const customer = await Cart.findOne({ userID: id }); // checking if customer id already exists in cart 
        //console.log(customer);
        if (customer != null) {
            for (let i = 0; i < customer.products.length; i++) {
                if (customer.products[i].productID === productID) {
                    console.log(customer.products[i].productID);
                    isProduct = true;
                    const deletedProduct = await Cart.updateOne(
                        { userID: id },
                        { $pull: { products: { productID: productID } } },
                        { new: true }
                    )
                    console.log(deletedProduct);
                    return res.status(200).json({ "message": "Product deleted" })
                }
            }
            if (!isProduct) {
                return res.json({ "message": "Product not found" })
            }
        } else {
            return res.json({ "message": "Product or customer not found" })
        }

    } catch (error) {
        return res.status(500).json(error)
    }
}

export const updateQuantity = async (req, res) => {
    const { id } = req.user;
    const { productID } = req.params;
    const { quantity } = req.body;
    try {
        let isProduct = false;
        const customer = await Cart.findOne({ userID: id }); // checking if customer id already exists in cart 
        //console.log(customer);
        if (customer != null && quantity >= 1) {
            for (let i = 0; i < customer.products.length; i++) {
                if (customer.products[i].productID === productID) {
                    console.log(customer.products[i].productID);
                    isProduct = true;
                    await Cart.updateOne({ userID: id, "products.productID": productID }, { $set: { 'products.$.quantity': quantity } })

                    return res.status(200).json({ "message": "Ouantity updated" })
                }
            }
            if (!isProduct) {
                return res.json({ "message": "Product not found" })
            }
        } else {
            return res.json({ "message": "Product or customer or quantity not found" })
        }

    } catch (error) {
        return res.status(500).json(error)
    }

}

export const getCartItems = async (req, res) => {
    const { id } = req.user;
    const { productID } = req.params;
    const { quantity } = req.body;
    try {
        const customer = await Cart.findOne({ userID: id }); // checking if customer id already exists in cart
        console.log(customer.products);
        if (customer != null) {
            if (customer.products.length == 0) {
                return res.status(404).json({ "message": "Cart is empty" })
            } else {
                return res.status(200).json({ "message": "Cart Items Retrived", cartItems: customer.products })
            }
        } else {
            return res.json({ "message": "User not found" })
        }

    } catch (error) {
        return res.status(500).json(error)
    }

}

export const getCartTotal = async (req, res) => {
    const { id } = req.user;
    let cartTotal = 0;
    //const { productID } = req.params;
    try {
        const customer = await Cart.findOne({ userID: id }); // checking if customer id already exists in cart
        console.log(customer.products);
        if (customer != null) {
            if (customer.products.length == 0) {
                return res.status(404).json({ "message": "Cart is empty" })
            } else {
                for (let i = 0; i < customer.products.length; i++) {
                    let qty = customer.products[i].quantity;
                    let productid = customer.products[i].productID;
                    await axios.get("http://localhost:8001/api/seller/get-product/" + productid)
                        .then((response) => {
                            cartTotal = cartTotal + (qty * response.data.price);
                        });
                }
                //console.log(cartTotal);
                return res.status(200).json({"messsage":"success", "CartTotal": cartTotal})
            }
        } else {
            return res.json({ "message": "User not found" })
        }

    } catch (error) {
        return res.status(500).json(error)
    }

}