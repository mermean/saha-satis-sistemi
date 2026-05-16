const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createSale,
  getSales,
  deleteSale,

} = require("../controllers/saleController");


router.delete(
  "/:id",
  authMiddleware,
  deleteSale
);

router.post(
  "/",
  authMiddleware,
  createSale
);

router.get(
  "/",
  authMiddleware,
  getSales
);

module.exports = router;