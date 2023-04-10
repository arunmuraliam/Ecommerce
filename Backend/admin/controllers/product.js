import axios from "axios";
import FormData from "form-data";
import fs from "fs";

export const getAllProducts = async (req, res, next) => {
    try {
        await axios.get("http://localhost:8001/api/seller/get-all-products")
            .then((response) => {
                //console.log(response.data);
                return res.status(200).json({ message: "success", data: response.data });
            });

    } catch (error) {
        return res.status(500).json(error);
    }
}

export const getProductsBySellerID = async (req, res, next) => {
    const { sellerID } = req.params;
    try {
        await axios.get("http://localhost:8001/api/seller/get-products-by-seller/" + sellerID)
            .then((response) => {
                //console.log(response.data);
                return res.status(200).json({ message: "success", data: response.data });
            });

    } catch (error) {
        return res.status(500).json(error);
    }
}

export const getProductsByProductID = async (req, res, next) => {
    const { productID } = req.params;
    try {
        await axios.get("http://localhost:8001/api/seller/get-product/" + productID) //use axios or node-fetch to make an http request
            .then((response) => {
                //console.log(response.data);
                return res.status(200).json({ message: "success", data: response.data });
            });

    } catch (error) {
        return res.status(500).json(error);
    }
}

export const addProduct = async (req, res, next) => {
    const productDetails = req.body;
    const { adminID } = req.params;
    //console.log(productDetails);
    const files = req.files;
    //console.log(files);
    //const mergedData = Object.assign({}, productDetails, files); // Merging two json documents
    //console.log(mergedData);

    const formData = new FormData();
    formData.append("name", productDetails.name);
    formData.append("features", productDetails.features);
    formData.append("description", productDetails.description);
    formData.append("price", productDetails.price);
    formData.append("stock", productDetails.stock);
    formData.append("category", productDetails.category);
    // for (const file of files.image) {
    //     formData.append('image', fs.createReadStream(file));
    // }
    for (let i=0 ;i<files.image.length; i++){
        const fileData = fs.createReadStream(files.image[i].path);
        formData.append('image', fileData, files.image[i].originalname);
    }
    for (let i=0 ;i<files.resources.length; i++){
        const fileData = fs.createReadStream(files.resources[i].path);
        formData.append('resources', fileData, files.resources[i].originalname);
    }

    console.log(formData);
    try {
        await axios.post("http://localhost:8001/api/seller/add-product/" + adminID, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
            .then((response) => {
                console.log(response.data);
                return res.status(200).json({ message: "product added successfully", data: response.data });
            });

    } catch (error) {
        return res.status(500).json(error);
    }
}

export const updateProduct = async (req, res, next) => {
    const productDetails = req.body;
    const { productID } = req.params;
    //console.log(productDetails);
    const files = req.files;
    //console.log(files);
    //const mergedData = Object.assign({}, productDetails, files); // Merging two json documents
    //console.log(mergedData);

    const formData = new FormData();
    formData.append("name", productDetails.name);
    formData.append("features", productDetails.features);
    formData.append("description", productDetails.description);
    formData.append("price", productDetails.price);
    formData.append("stock", productDetails.stock);
    formData.append("category", productDetails.category);
    // for (const file of files.image) {
    //     formData.append('image', fs.createReadStream(file));
    // }
    for (let i=0 ;i<files.image.length; i++){
        const fileData = fs.createReadStream(files.image[i].path);
        formData.append('image', fileData, files.image[i].originalname);
    }
    for (let i=0 ;i<files.resources.length; i++){
        const fileData = fs.createReadStream(files.resources[i].path);
        formData.append('resources', fileData, files.resources[i].originalname);
    }

    console.log(formData);
    try {
        await axios.put("http://localhost:8001/api/seller/update-product/" + productID, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
            .then((response) => {
                console.log(response.data);
                return res.status(200).json({ message: "updated successfully", data: response.data });
            });

    } catch (error) {
        return res.status(500).json(error);
    }
}

export const deletedProduct = async (req, res, next) => {
    const { id } = req.params;
    try {
        await axios.delete("http://localhost:8001/api/seller/delete-product/" + id)
            .then((response) => {
                //console.log(response.data);
                return res.status(200).json({ message: "deleted successfully", data: response.data });
            });

    } catch (error) {
        return res.status(500).json(error);
    }
}