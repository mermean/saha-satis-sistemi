const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createBalanceLog,
  getBalanceLogs,
  getCustomerBalanceLogs,
} = require("../controllers/balanceController");

router.post(
  "/",
  authMiddleware,
  createBalanceLog
);

router.get(
  "/",
  authMiddleware,
  getBalanceLogs
);

router.get(
  "/customer/:id",
  authMiddleware,
  getCustomerBalanceLogs
);

module.exports = router;