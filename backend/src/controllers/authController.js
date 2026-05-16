const prisma = require("../lib/prisma");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userExists) {
      return res.status(400).json({
        message: "Kullanıcı zaten var",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        plainPassword: password,
      },
    });

    res.status(201).json({
      message: "Kullanıcı oluşturuldu",
      user,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Sunucu hatası",
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(400).json({
        message: "Kullanıcı bulunamadı",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Şifre yanlış",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.json({
      message: "Giriş başarılı",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Sunucu hatası",
    });
  }
};

const getUsers = async (req, res) => {
  try {
    const users =
      await prisma.user.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });

    res.json(users);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Sunucu hatası",
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const users =
      await prisma.user.count();

    if (users <= 1) {
      return res.status(400).json({
        message:
          "Son kullanıcı silinemez",
      });
    }

    await prisma.user.delete({
      where: {
        id,
      },
    });

    res.json({
      message: "Kullanıcı silindi",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Sunucu hatası",
    });
  }
};

module.exports = {
  register,
  login,
  getUsers,
  deleteUser,
};