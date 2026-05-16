const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

const {
  register,
  login,
  getUsers,
  deleteUser,

} = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.get("/users",authMiddleware,getUsers);
router.delete("/users/:id",authMiddleware,deleteUser);
module.exports = router;