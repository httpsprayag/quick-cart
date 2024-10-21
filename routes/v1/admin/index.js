const express = require("express");
const router = express.Router();

const user = require("../../../controllers/admin/user.controller");

router.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "Hello From The Admin." });
});
router.post("/user/add", user.createUser);

module.exports = router;
