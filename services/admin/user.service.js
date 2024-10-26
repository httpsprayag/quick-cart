const User = require("../../models/admin/User");
const utils = require("../../utils/utils");
const { USER_ERROR_CODE } = require("../../utils/errorCode");

// Create a new user
const createUser = async (req) => {
  try {
    utils.checkRequestParams(req.body, [
      { name: "userName", type: "string" },
      { name: "email", type: "string" },
      { name: "password", type: "string" },
    ]);

    const { userName, email, password } = req.body;

    // Check if email or username already exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      throw { errorCode: USER_ERROR_CODE.EMAIL_ALREADY_TAKEN };
    }

    const existingUsername = await User.findOne({ userName });
    if (existingUsername) {
      throw { errorCode: USER_ERROR_CODE.USERNAME_ALREADY_TAKEN };
    }

    // Create and save the user
    const user = new User({ userName, email, password });
    return await user.save();
  } catch (error) {
    throw error;
  }
};

// Retrieve user by ID
const getUserById = async (req) => {
  try {
    utils.checkRequestParams(req.body, [{ name: "id", type: "string" }]);
    const { id } = req.body;

    const user = await User.findById(id);
    if (!user) {
      throw { errorCode: USER_ERROR_CODE.USER_DETAILS_NOT_FOUND };
    }

    return user;
  } catch (error) {
    throw error;
  }
};

// Update user details by ID
const updateUser = async (req) => {
  try {
    utils.checkRequestParams(req.body, [
      { name: "id", type: "string" },
    ]);

    const { id, ...updateData } = req.body;

    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
    if (!updatedUser) {
      throw { errorCode: USER_ERROR_CODE.FAILED_TO_UPDATE_USER };
    }

    return updatedUser;
  } catch (error) {
    throw error;
  }
};

// Delete user by ID
const deleteUser = async (req) => {
  try {
    utils.checkRequestParams(req.body, [{ name: "id", type: "string" }]);
    const { id } = req.body;

    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      throw { errorCode: USER_ERROR_CODE.FAILED_TO_DELETE_USER };
    }

    return { message: "User deleted successfully" };
  } catch (error) {
    throw error;
  }
};

// Retrieve all users
const getAllUsers = async () => {
  try {
    return await User.find();
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  getAllUsers,
};
