const prisma = require("../lib/prisma");

const createBalanceLog = async (req, res) => {
  try {
    const {
      customerId,
      type,
      amount,
      description,
    } = req.body;

    const customer = await prisma.customer.findUnique({
      where: {
        id: customerId,
      },
    });

    if (!customer) {
      return res.status(404).json({
        message: "Müşteri bulunamadı",
      });
    }

    let newBalance = customer.balance;

    // BORÇ EKLEME
    if (type === "ADD_BALANCE") {
      newBalance += amount;
    }

    if (
      type === "SALE" ||
      type === "COLLECTION" ||
      type === "REMOVE_BALANCE"
    ) {
      newBalance -= amount;
    }


    // Müşteri bakiyesini güncelle
    await prisma.customer.update({
      where: {
        id: customerId,
      },
      data: {
        balance: newBalance,
      },
    });

    // Hareket kaydı oluştur
    const balanceLog =
      await prisma.balanceLog.create({
        data: {
          customerId,
          type,
          amount,
          description,
        },
      });

    res.status(201).json(balanceLog);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Sunucu hatası",
    });
  }
};

const getBalanceLogs = async (req, res) => {
  try {
    const logs =
      await prisma.balanceLog.findMany({
        include: {
          customer: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

    res.json(logs);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Sunucu hatası",
    });
  }
};

const getCustomerBalanceLogs = async (
  req,
  res
) => {
  try {
    const customerId = Number(req.params.id);

    const logs =
      await prisma.balanceLog.findMany({
        where: {
          customerId,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

    res.json(logs);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Sunucu hatası",
    });
  }
};

module.exports = {
  createBalanceLog,
  getBalanceLogs,
  getCustomerBalanceLogs,
};