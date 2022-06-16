const { Router } = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const router = Router();
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const config = require("config");

router.post(
  '/register',
  [
    check("email", "Некорректный email").isEmail(),
    check("password", "минимальная длина пароля 6 символов").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Некорретные данные при регистрации",
        });
      }
      const { email, password } = req.body;

      const candidate = await User.findOne({ email });

      if (candidate) {
        return res
          .status(400)
          .json({ message: "такой пользователь уже сущевствует" });
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const user = new User({ email, password: hashedPassword });

      await user.save();

      res.status(201).json({ message: "Пользователь создан" });
    } catch (e) {
      res
        .status(500)
        .json({ message: "что-то пошло не так, попробуйте снова" });
    }
  }
);

router.post(
  "/login",
  [
    check("email", "Введите корретный email").normalizeEmail().isEmail(),
    check("password", "Введите пароль").exists(),
  ],

  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Некорретные данные при входе в систему",
        });
      }
      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: "пользователь не найден" });
      }

      const isMatch = await bcrypt.compare(password, user.password); // сравнивает хэш пароли
      if (!isMatch) {
        return res.status(400).json({ message: "неверный пароль" });
      }

      const token = jwt.sign({ userId: user.id }, config.get("jwtSecret"), {
        expiresIn: "1h",
      });
      res.json({ token, userId: user.id });
    } catch (e) {
      res
        .status(500)
        .json({ message: "что-то пошло не так, попробуйте снова" });
    }
  }
);

module.exports = router;
