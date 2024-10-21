const User = require("../../models/admin/User");

const utils = require("../../utils/utils");
const commonService = require("../../services/common/common.service");

exports.createUser = async (req) => {
  utils.checkRequestParams(req.body, [
    { name: "userName", type: "string" },
    { name: "email", type: "string" },
    { name: "password", type: "string" },
  ]);

  const user = new User(req.body);
  console.log("user in service  => ", user);
  try {
    return await user.save();
  } catch (error) {
    throw error;
  }
};

exports.getUserById = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    throw new Error("Error fetching user: " + error.message);
  }
};

exports.updateUser = async (userId, data) => {
  try {
    const user = await User.findByIdAndUpdate(userId, data, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    throw new Error("Error updating user: " + error.message);
  }
};

exports.deleteUser = async (userId) => {
  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    throw new Error("Error deleting user: " + error.message);
  }
};

exports.getAllUsers = async () => {
  try {
    return await User.find();
  } catch (error) {
    throw new Error("Error fetching users: " + error.message);
  }
};
