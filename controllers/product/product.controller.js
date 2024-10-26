const productService = require("../../services/product/product.service");
const { PRODUCT_ERROR_CODE } = require("../../utils/errorCode");
const { PRODUCT_MESSAGE_CODE } = require("../../utils/messageCode");
const utils = require("../../utils/utils");

const createProduct = async (req, res) => {
  try {
    const product = await productService.createProduct(req);
    if (!product) throw { errorCode: PRODUCT_ERROR_CODE.PRODUCT_NOT_CREATED };
    utils.successResponse(
      req.headers.lang,
      PRODUCT_MESSAGE_CODE.PRODUCT_CREATED_SUCCESSFULLY,
      product,
      res
    );
  } catch (error) {
    utils.catchBlockErrors(req.headers.lang, error, res);
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.id);
    if (!product)
      throw { errorCode: PRODUCT_ERROR_CODE.PRODUCT_DETAILS_NOT_FOUND };
    utils.successResponse(
      req.headers.lang,
      PRODUCT_MESSAGE_CODE.PRODUCT_DETAILS_RETRIEVED_SUCCESSFULLY,
      product,
      res
    );
  } catch (error) {
    utils.catchBlockErrors(req.headers.lang, error, res);
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await productService.updateProduct(req.params.id, req.body);
    if (!product)
      throw { errorCode: PRODUCT_ERROR_CODE.FAILED_TO_UPDATE_PRODUCT };
    utils.successResponse(
      req.headers.lang,
      PRODUCT_MESSAGE_CODE.PRODUCT_UPDATED_SUCCESSFULLY,
      product,
      res
    );
  } catch (error) {
    utils.catchBlockErrors(req.headers.lang, error, res);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await productService.deleteProduct(req.params.id);
    if (!product)
      throw { errorCode: PRODUCT_ERROR_CODE.FAILED_TO_DELETE_PRODUCT };
    utils.successResponse(
      req.headers.lang,
      PRODUCT_MESSAGE_CODE.PRODUCT_DELETED_SUCCESSFULLY,
      product,
      res
    );
  } catch (error) {
    utils.catchBlockErrors(req.headers.lang, error, res);
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    if (!products)
      throw { errorCode: PRODUCT_ERROR_CODE.FAILED_TO_RETRIEVE_PRODUCTS };
    utils.successResponse(
      req.headers.lang,
      PRODUCT_MESSAGE_CODE.PRODUCTS_RETRIEVED_SUCCESSFULLY,
      products,
      res
    );
  } catch (error) {
    utils.catchBlockErrors(req.headers.lang, error, res);
  }
};

module.exports = {
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  getAllProducts,
};
