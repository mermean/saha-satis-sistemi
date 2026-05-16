const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const authMiddleware = require("./src/middleware/authMiddleware");
const authRoutes = require("./src/routes/authRoutes");
const productRoutes = require("./src/routes/productRoutes");
const customerRoutes = require("./src/routes/customerRoutes");
const balanceRoutes = require("./src/routes/balanceRoutes");
const saleRoutes = require("./src/routes/saleRoutes");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/balance", balanceRoutes);
app.use("/api/sales", saleRoutes);
app.get("/", (req, res) => {
  res.json({
    message: "Saha Satış API Çalışıyor.",
  });
});

app.get("/api/profile", authMiddleware, (req, res) => {
  res.json({
    message: "Profil bilgileri",
    user: req.user,
  });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server çalışıyor: http://localhost:${PORT}`);
});