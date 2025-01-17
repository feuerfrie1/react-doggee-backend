import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import UserModel from "../models/user.js";
import Pet from "../models/pet.js";

export const register = async (req, res) => {
  try {
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const doc = new UserModel({
      email: req.body.email,
      passwordHash: hash,
    });

    const user = await doc.save();

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secret123",
      {
        expiresIn: "30d",
      }
    );

    const { passwordHash, ...userData } = user._doc;

    res.json({
      ...userData,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось зарегистрироваться",
    });
  }
};

export const login = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).json({
        message: "Неверный логин или пароль",
      });
    }

    const isValidPass = await bcrypt.compare(
      req.body.password,
      user._doc.passwordHash
    );

    if (!isValidPass) {
      return res.status(400).json({
        message: "Неверный логин или пароль",
      });
    }
    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secret123",
      {
        expiresIn: "30d",
      }
    );

    const { passwordHash, ...userData } = user._doc;

    res.json({
      ...userData,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось авторизоваться",
    });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "Пользователь не найден",
      });
    }

    const { passwordHash, ...userData } = user._doc;

    res.json(userData);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Нет доступа",
    });
  }
};

export const editUser = async (req, res) => {
  try {
    const userId = req.params.id;

    await UserModel.updateOne(
      {
        _id: userId,
      },
      {
        name: req.body.name,
        registrationAddress: req.body.registrationAddress,
        birthDate: req.body.birthDate,
      }
    );

    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось обновить данные пользователя",
    });
  }
};

export const addPets = async (req, res) => {
  const userId = req.params.id;
  const petsArray = req.body.pets;

  if (!petsArray || !Array.isArray(petsArray)) {
    return res.status(400).send("Invalid pets array");
  }
  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).send("Пользователь не найден");
    }

    petsArray.forEach((pet) => {
      user.pets.push(new Pet(pet));
    });

    await user.save();
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось добавить питомцев",
    });
  }
};
