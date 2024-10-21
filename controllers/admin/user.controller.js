const userService = require("../../services/admin/user.service"); // Adjust the path as necessary
const { USER_ERROR_CODE } = require("../../utils/errorCode");
const { USER_MESSAGE_CODE } = require("../../utils/messageCode");
const utils = require("../../utils/utils");

const createUser = async (req, res) => {
  try {
    const user = await userService.createUser(req);
    if (!user) throw { errorCode: USER_ERROR_CODE.USER_NOT_CREATED };
    console.log("user => : ", user);
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
    const user = await userService.getUserById(req.params.id);
    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body);
    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await userService.deleteUser(req.params.id);
    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    return res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  getAllUsers,
};
