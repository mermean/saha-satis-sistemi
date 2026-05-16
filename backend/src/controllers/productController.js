const prisma = require("../lib/prisma");

const createProduct = async (req, res) => {
  try {
    const { name, barcode, price, stock, category } = req.body;

    const product = await prisma.product.create({
      data: {
        name,
        barcode,
        price,
        stock,
        category,
      },
    });

    res.status(201).json(product);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Ürün oluşturulamadı",
    });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(products);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Ürünler alınamadı",
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.product.delete({
      where: {
        id: Number(id),
      },
    });

    res.json({
      message: "Ürün silindi",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Ürün silinemedi",
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const { name, barcode, price, stock, category } =
      req.body;

    const product = await prisma.product.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
        barcode,
        price,
        stock,
        category,
      },
    });

    res.json(product);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Ürün güncellenemedi",
    });
  }
};



const addStock = async (req, res) => {
  try {
    const { productId, amount } = req.body;

    const product =
      await prisma.product.findUnique({
        where: {
          id: productId,
        },
      });

    if (!product) {
      return res.status(404).json({
        message: "Ürün bulunamadı",
      });
    }

    const updatedProduct =
      await prisma.product.update({
        where: {
          id: productId,
        },

        data: {
          stock:
            product.stock + amount,
        },
      });

    res.json(updatedProduct);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Sunucu hatası",
    });
  }
};


module.exports = {
  createProduct,
  getProducts,
  deleteProduct,
  updateProduct,
  addStock,
};
