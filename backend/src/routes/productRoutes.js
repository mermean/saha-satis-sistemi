const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createProduct,
  getProducts,
  deleteProduct,
  updateProduct,
  addStock,
} = require("../controllers/productController");

router.post("/", authMiddleware, createProduct);
router.get("/", authMiddleware, getProducts);
router.delete("/:id", authMiddleware, deleteProduct);
router.put("/stock",authMiddleware,addStock);
router.put("/:id", authMiddleware, updateProduct);
module.exports = router;