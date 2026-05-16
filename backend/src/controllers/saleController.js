const prisma = require("../lib/prisma");

const createSale = async (req, res) => {
  try {
    const {
      customerId,
      items,
      totalPrice,
    } = req.body;

    const customer =
      await prisma.customer.findUnique({
        where: {
          id: customerId,
        },
      });

    if (!customer) {
      return res.status(404).json({
        message: "Müşteri bulunamadı",
      });
    }
    for (const item of items) {
  const product =
    await prisma.product.findUnique({
      where: {
        id: item.productId,
      },
    });

  if (!product) {
    return res.status(404).json({
      message: "Ürün bulunamadı",
    });
  }

  let multiplier = 1;

  if (item.unit === "TON") {
    multiplier = 1000;
  }

  if (item.unit === "GRAM") {
    multiplier = 0.001;
  }

  if (item.unit === "KG") {
  multiplier = 1;
  }

  if (item.unit === "CUVAL") {
    multiplier = 50;
  }

  const totalQuantity =
    Number(item.quantity) * multiplier;

  if (product.stock < totalQuantity) {
    return res.status(400).json({
      message: `${product.name} için yeterli stok yok`,
    });
  }
}
    // SATIŞ OLUŞTUR
    const sale = await prisma.sale.create({
      data: {
        customerId,

        customerName: customer.company,

        branchName: customer.branch,

        totalPrice,

        items: {
          create: items.map((item) => ({
            productId: item.productId,
            productName: item.productName,
            quantity: item.quantity,
            unit: item.unit,
            unitPrice: item.unitPrice,
            totalPrice: item.totalPrice,
            withVat: item.withVat,
          })),
        },
      },

      include: {
        items: true,
      },
    });

    // MÜŞTERİ BAKİYESİ DÜŞ
    await prisma.customer.update({
      where: {
        id: customerId,
      },

      data: {
        balance:
          customer.balance - totalPrice,
      },
    });

    for (const item of items) {
  let multiplier = 1;

  if (item.unit === "TON") {
    multiplier = 1000;
  }

  if (item.unit === "GRAM") {
    multiplier = 0.001;
  }

  if (item.unit === "KG") {
  multiplier = 1;
  }

  if (item.unit === "CUVAL") {
    multiplier = 50;
  }

  const totalQuantity =
    Number(item.quantity) * multiplier;

  await prisma.product.update({
    where: {
      id: item.productId,
    },

    data: {
      stock: {
        decrement: totalQuantity,
      },
    },
  });
}
    // BALANCE LOG OLUŞTUR
    await prisma.balanceLog.create({
      data: {
        customerId,
        type: "SALE",
        amount: totalPrice,
        description: "Satış işlemi",
      },
    });

    res.status(201).json(sale);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Sunucu hatası",
    });
  }
};

const getSales = async (req, res) => {
  try {
    const sales =
      await prisma.sale.findMany({
        include: {
          customer: true,

          items: {
            include: {
              product: true,
            },
          },
        },

        orderBy: {
          createdAt: "desc",
        },
      });

    res.json(sales);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Sunucu hatası",
    });
  }
};



const deleteSale = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const sale = await prisma.sale.findUnique({
      where: {
        id,
      },
    });

    if (!sale) {
      return res.status(404).json({
        message: "Satış bulunamadı",
      });
    }

    await prisma.sale.delete({
      where: {
        id,
      },
    });

    res.json({
      message: "Satış silindi",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Sunucu hatası",
    });
  }
};

module.exports = {
  createSale,
  getSales,
  deleteSale,

};