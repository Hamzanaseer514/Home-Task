const Product = require('../Models/Product');

const addProduct = async (req, res) => {
    const { name, price, description, category } = req.body;

    if (!name || price === undefined || !description || !category  === undefined) {
        return res.status(400).json({ msg: "All fields are required" ,success:false});
    }

    try {
        const product = new Product({ name, price, description, category });
        await product.save();
        return res.status(201).json({ msg: "Product added successfully", product,success:true });
    } catch (error) {
        return res.status(500).json({ msg: "Server error", error: error.message,success:false});
    }
};
const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, price, description, category } = req.body;

    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { name, price, description, category },
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ msg: "Product not found" ,success:false});
        }

        return res.status(200).json({ msg: "Product updated successfully", updatedProduct,success:true });
    } catch (error) {
        return res.status(500).json({ msg: "Server error", error: error.message ,success:false});
    }
};

const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({ msg: "Product not found" ,success:false});
        }

        return res.status(200).json({ msg: "Product deleted successfully",success:true });
    } catch (error) {
        return res.status(500).json({ msg: "Server error", error: error.message,success:false});
    }
};
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        return res.status(200).json({ products });
    } catch (error) {
        return res.status(500).json({ msg: "Server error", error: error.message,success:false });
    }
};


module.exports = { addProduct, updateProduct, deleteProduct, getAllProducts };
