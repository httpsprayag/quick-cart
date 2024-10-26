const express = require("express");
const router = express.Router();

const userController = require("../../../controllers/admin/user.controller");
const categoryController = require("../../../controllers/product/category.controller");

// Welcome Route
router.post("/", (req, res) => {
  res.status(200).json({
    success: true,
    message:
      "Welcome to the Admin API! Manage users and categories seamlessly.",
  });
});

// User Routes
router.post("/users/add", userController.createUser);
router.post("/users/getAll", userController.getAllUsers);
router.post("/users/get", userController.getUserById);
router.post("/users/update", userController.updateUser);
router.post("/users/delete", userController.deleteUser);

// Category Routes
router.post("/categories/add", categoryController.createCategory);
router.post("/categories/getAll", categoryController.getAllCategories);
router.post("/categories/get", categoryController.getCategoryById);
router.post("/categories/update", categoryController.updateCategory);
router.post("/categories/delete", categoryController.deleteCategory);

module.exports = router;
