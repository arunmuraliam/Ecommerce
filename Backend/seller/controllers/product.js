import Product from "../models/Product.js";
import fs from "fs";

export const addProduct = async (req, res) => {
  const { name, features, description, price, stock, category } = req.body;
  //console.log(req.user);

  console.log(req.files);

  let filePath = "";
  let resourcesPath = [];

  if (Array.isArray(req.files.image) && req.files.image.length > 0) {
    filePath = "/" + req.files.image[0].path;
  }

  if (Array.isArray(req.files.resources) && req.files.resources.length > 0) {
    for (let resource of req.files.resources) {
      resourcesPath.push("/" + resource.path);
    }
  }
  //Validations
  // const errors = validationResult(req.body);
  // if (!errors.isEmpty()) {
  //   return res.status(422).json({ error: errors.array() });
  // }

  try {
    const product = await Product.create({
      name,
      features,
      description,
      price,
      stock,
      category,
      image: filePath,
      resources: resourcesPath,
      seller: req.params.id,
    });
    if(!product){
      return res.status(404).json({ message: "Product not added"});
    }
    return res.status(201).json({ message: "Product added successfully", product });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};


export const updateProduct = async (req, res) => {
  const { id } = req.params;

  const { name, features, description, price, sellerid, stock, category } = req.body;

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "No record exist" });
    }

    let filePath = "";
    let resoucesPaths = [];

    if (product.image) {
      console.log(product.image);
      fs.unlink("." + product.image, function (error) {
        if (error) console.log(error);
      });

      filePath = "";
    }

    if (Array.isArray(req.files.image) && req.files.image.length > 0) {
      filePath = "/" + req.files.image[0].path;
    }

    if (product.resources.length > 0) {
      for (let resource of product.resources) {
        fs.unlink("." + resource, function (err) {
          if (err) {
            console.log(err);
          }
        });
      }
      resoucesPaths = [];
    }

    if (Array.isArray(req.files.resources) && req.files.resources.length > 0) {
      for (let resource of req.files.resources) {
        resoucesPaths.push("/" + resource.path);
      }
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        name,
        features,
        description,
        price,
        stock,
        category,
        image: filePath,
        resources: resoucesPaths,
      },
      { new: true }
    );

    res.status(200).json({ message: "Product updated successfully", updatedProduct });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found!!" });
    }

    const deletedProduct = await Product.findOneAndRemove({ _id: id }, { new: true });
    return res.status(200).json({ message: "Product deleted successfully", deletedProduct });

  } catch (error) {
    res.status(400).json(error);
  }
}

export const getAllProducts = async (req, res, next) => {
  //const { id } = req.params;
  //const {sellerID} = req.body;

  try {
    const products = await Product.find();
    if (!products) {
      return res.status(204).json({ message: "Products not found!!" });
    }
    return res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
}

export const getProductsBySellerID = async (req, res, next) => {
  const { id } = req.params;

  try {
    const products = await Product.find({ seller: id });
    if (!products) {
      return res.status(404).json({ message: "Products not found!!" });
    }
    return res.status(200).json(products);
  } catch (error) {
    res.status(400).json(error);
  }
}

export const getProductByProductID = async (req, res, next) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Products not found!!" });
    }
    return res.status(200).json(product);
  } catch (error) {
    res.status(400).json(error);
  }
}