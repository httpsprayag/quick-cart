const userService = require("../../services/admin/user.service"); // Adjust the path as necessary
const { USER_ERROR_CODE } = require("../../utils/errorCode");
const { USER_MESSAGE_CODE } = require("../../utils/messageCode");
const utils = require("../../utils/utils");

const createUser = async (req, res) => {
  try {
    const user = await userService.createUser(req);
    if (!user) throw { errorCode: USER_ERROR_CODE.USER_NOT_CREATED };
    utils.successResponse(
      req.headers.lang,
      USER_MESSAGE_CODE.USER_CREATED_SUCCESSFULLY,
      user,
      res
    );
  } catch (error) {
    utils.catchBlockErrors(req.headers.lang, error, res);
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req);
    if (!user) {
      throw { errorCode: USER_ERROR_CODE.USER_DETAILS_NOT_FOUND };
    }
    utils.successResponse(
      req.headers.lang,
      USER_MESSAGE_CODE.USER_CREATED_SUCCESSFULLY,
      user,
      res
    );
  } catch (error) {
    utils.catchBlockErrors(req.headers.lang, error, res);
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await userService.updateUser(req);
    if (!user) {
      throw { errorCode: USER_ERROR_CODE.FAILED_TO_UPDATE_USER };
    }
    utils.successResponse(
      req.headers.lang,
      USER_MESSAGE_CODE.USER_DETAILS_UPDATED_SUCCESSFULLY,
      user,
      res
    );
  } catch (error) {
    utils.catchBlockErrors(req.headers.lang, error, res);
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await userService.deleteUser(req);
    if (!user) {
      throw { errorCode: USER_ERROR_CODE.FAILED_TO_DELETE_USER };
    }
    utils.successResponse(
      req.headers.lang,
      USER_MESSAGE_CODE.USER_DELETED_SUCCESSFULLY,
      user,
      res
    );
  } catch (error) {
    utils.catchBlockErrors(req.headers.lang, error, res);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    if (!users) {
      throw { errorCode: USER_ERROR_CODE.FAILED_TO_RETRIVE_USERS };
    }
    utils.successResponse(
      req.headers.lang,
      USER_MESSAGE_CODE.USERS_RETRIVED_SUCCESSFULLY,
      user,
      res
    );
  } catch (error) {
    utils.catchBlockErrors(req.headers.lang, error, res);
  }
};

module.exports = {
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  getAllUsers,
};
