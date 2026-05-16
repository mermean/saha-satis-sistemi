const prisma = require("../lib/prisma");

const getCustomers = async (req, res) => {
  try {
    const customers = await prisma.customer.findMany({
      orderBy: {
        id: "desc",
      },
    });

    res.json(customers);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Müşteriler alınamadı",
    });
  }
};

const createCustomer = async (req, res) => {
  try {
    const {
      company,
      branch,
      balance,
      taxNumber,
      address,
    } = req.body;

    const customer = await prisma.customer.create({
      data: {
        company,
        branch,
        balance,
        taxNumber,
        address,
      },
    });

    res.json(customer);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Müşteri oluşturulamadı",
    });
  }
};

const updateCustomer = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      company,
      branch,
      balance,
      taxNumber,
      address,
    } = req.body;

    const customer = await prisma.customer.update({
      where: {
        id: Number(id),
      },
      data: {
        company,
        branch,
        balance,
        taxNumber,
        address,
      },
    });

    res.json(customer);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Müşteri güncellenemedi",
    });
  }
};

const deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.customer.delete({
      where: {
        id: Number(id),
      },
    });

    res.json({
      message: "Müşteri silindi",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Müşteri silinemedi",
    });
  }
};

module.exports = {
  getCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};