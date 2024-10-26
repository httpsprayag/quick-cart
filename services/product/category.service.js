const Category = require("../../models/product/Category");
const utils = require("../../utils/utils");
const { CATEGORY_ERROR_CODE } = require("../../utils/errorCode");

// Create a new category
const createCategory = async (req) => {
  try {
    utils.checkRequestParams(req.body, [
      { name: "name", type: "string" },
      { name: "description", type: "string" },
    ]);

    const { name, description } = req.body;

    // Check for existing category
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      throw { errorCode: CATEGORY_ERROR_CODE.CATEGORY_DETAILS_NOT_FOUND };
    }

    // Save new category
    const category = new Category({ name, description });
    return await category.save();
  } catch (error) {
    throw error;
  }
};

// Get all categories
const getAllCategories = async () => {
  try {
    return await Category.find();
  } catch (error) {
    throw error;
  }
};

// Get category by ID
const getCategoryById = async (req) => {
  try {
    utils.checkRequestParams(req.body, [{ name: "id", type: "string" }]);
    const { id } = req.body;

    const category = await Category.findById(id);
    if (!category) {
      throw { errorCode: CATEGORY_ERROR_CODE.CATEGORY_DETAILS_NOT_FOUND };
    }

    return category;
  } catch (error) {
    throw error;
  }
};

const updateCategory = async (req) => {
  try {
    utils.checkRequestParams(req.body, [{ name: "id", type: "string" }]);

    const { id, ...updateData } = req.body;

    const updatedCategory = await Category.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!updatedCategory) {
      throw { errorCode: CATEGORY_ERROR_CODE.CATEGORY_DETAILS_NOT_FOUND };
    }

    return updatedCategory;
  } catch (error) {
    throw error;
  }
};

// Delete category by ID
const deleteCategory = async (req) => {
  try {
    utils.checkRequestParams(req.body, [{ name: "id", type: "string" }]);
    const { id } = req.body;

    const deletedCategory = await Category.findByIdAndDelete(id);
    if (!deletedCategory) {
      throw { errorCode: CATEGORY_ERROR_CODE.CATEGORY_DETAILS_NOT_FOUND };
    }

    return { message: "Category deleted successfully" };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
