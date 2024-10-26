const Product = require("../../models/product/Product");
const utils = require("../../utils/utils");
const { PRODUCT_ERROR_CODE } = require("../../utils/errorCode");

const createProduct = async (req) => {
  try {
    utils.checkRequestParams(req.body, [
      { name: "name", type: "string" },
      { name: "description", type: "string" },
      { name: "category", type: "string" },
      { name: "brand", type: "string" },
      { name: "price", type: "number" },
      { name: "stock", type: "number" },
    ]);

    const {
      name,
      description,
      category,
      brand,
      price,
      stock,
      images,
      specifications,
      featured,
      tags,
    } = req.body;

    const existingProduct = await Product.findOne({ name });
    if (existingProduct) {
      throw { errorCode: PRODUCT_ERROR_CODE.PRODUCT_ALREADY_EXISTS };
    }

    const product = new Product({
      name,
      description,
      category,
      brand,
      price,
      stock,
      images,
      specifications,
      featured,
      tags,
    });
    return await product.save();
  } catch (error) {
    throw error;
  }
};

const getAllProducts = async () => {
  try {
    return await Product.find().populate("category");
  } catch (error) {
    throw error;
  }
};

const getProductById = async (id) => {
  try {
    const product = await Product.findById(id).populate("category");
    if (!product) {
      throw { errorCode: PRODUCT_ERROR_CODE.PRODUCT_DETAILS_NOT_FOUND };
    }
    return product;
  } catch (error) {
    throw error;
  }
};

const updateProduct = async (id, updateData) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!updatedProduct) {
      throw { errorCode: PRODUCT_ERROR_CODE.FAILED_TO_UPDATE_PRODUCT };
    }
    return updatedProduct;
  } catch (error) {
    throw error;
  }
};

const deleteProduct = async (id) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      throw { errorCode: PRODUCT_ERROR_CODE.FAILED_TO_DELETE_PRODUCT };
    }
    return { message: "Product deleted successfully" };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
