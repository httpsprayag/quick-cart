const categoryService = require("../../services/product/category.service");
const { CATEGORY_ERROR_CODE } = require("../../utils/errorCode");
const { CATEGORY_MESSAGE_CODE } = require("../../utils/messageCode");
const utils = require("../../utils/utils");

const createCategory = async (req, res) => {
  try {
    const category = await categoryService.createCategory(req);
    if (!category)
      throw { errorCode: CATEGORY_ERROR_CODE.CATEGORY_NOT_CREATED };
    utils.successResponse(
      req.headers.lang,
      CATEGORY_MESSAGE_CODE.CATEGORY_CREATED_SUCCESSFULLY,
      category,
      res
    );
  } catch (error) {
    utils.catchBlockErrors(req.headers.lang, error, res);
  }
};

const getCategoryById = async (req, res) => {
  try {
    const category = await categoryService.getCategoryById(req.params.id);
    if (!category) {
      throw { errorCode: CATEGORY_ERROR_CODE.CATEGORY_DETAILS_NOT_FOUND };
    }
    utils.successResponse(
      req.headers.lang,
      CATEGORY_MESSAGE_CODE.CATEGORY_DETAILS_RETRIEVED_SUCCESSFULLY,
      category,
      res
    );
  } catch (error) {
    utils.catchBlockErrors(req.headers.lang, error, res);
  }
};

const updateCategory = async (req, res) => {
  try {
    const category = await categoryService.updateCategory(
      req.params.id,
      req.body
    );
    if (!category) {
      throw { errorCode: CATEGORY_ERROR_CODE.FAILED_TO_UPDATE_CATEGORY };
    }
    utils.successResponse(
      req.headers.lang,
      CATEGORY_MESSAGE_CODE.CATEGORY_UPDATED_SUCCESSFULLY,
      category,
      res
    );
  } catch (error) {
    utils.catchBlockErrors(req.headers.lang, error, res);
  }
};

const deleteCategory = async (req, res) => {
  try {
    const category = await categoryService.deleteCategory(req.params.id);
    if (!category) {
      throw { errorCode: CATEGORY_ERROR_CODE.FAILED_TO_DELETE_CATEGORY };
    }
    utils.successResponse(
      req.headers.lang,
      CATEGORY_MESSAGE_CODE.CATEGORY_DELETED_SUCCESSFULLY,
      category,
      res
    );
  } catch (error) {
    utils.catchBlockErrors(req.headers.lang, error, res);
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await categoryService.getAllCategories();
    if (!categories) {
      throw { errorCode: CATEGORY_ERROR_CODE.FAILED_TO_RETRIEVE_CATEGORIES };
    }
    utils.successResponse(
      req.headers.lang,
      CATEGORY_MESSAGE_CODE.CATEGORIES_RETRIEVED_SUCCESSFULLY,
      categories,
      res
    );
  } catch (error) {
    utils.catchBlockErrors(req.headers.lang, error, res);
  }
};

module.exports = {
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
  getAllCategories,
};
