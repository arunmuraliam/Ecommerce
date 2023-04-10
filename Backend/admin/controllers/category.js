import Category from "../models/Category.js";

export const addCategory = async (req, res) => {
    const { category } = req.body;
    //console.log(category);
    try {
        if (!category) {
            return res.status(400).json({ message: "Category input is not given" })
        } else {
            const categoryItem = await Category.findOne({ category: category });
            if (categoryItem) {
                return res.json({"message":"category already exists"})
            }

            const categoryDetails = Category({
                category: category,
            })

            await categoryDetails.save();
            res.status(200).json({"message":"Category added"});
        }
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const getCategory = async (req, res) => {
    try {

            const category = await Category.find();
            if (!category) {
                return res.json({"message":"No categories in db"})
            }
            res.status(200).json(category);

    } catch (error) {
        return res.status(500).json(error)
    }
}

export const deleteCategory = async (req, res) => {
    const { categoryID } = req.params;
    //console.log(categoryID);
    try {
        if (!categoryID) {
            return res.status(400).json({ message: "Category input is not given" })
        } else {
            const categoryItem = await Category.findOne({ _id: categoryID });
            if (!categoryItem) {
                return res.json({"message":"category not exists"})
            }
            const deletedCategory = await Category.findOneAndRemove({ _id: categoryID }, { new: true });
            res.status(200).json({"message":"Category deleted", deletedCategory});
        }
    } catch (error) {
        return res.status(500).json(error)
    }
}