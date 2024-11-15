const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../../db/models');
const generateTokens = require('../utils/generateTokens');
const cookiesConfig = require('../configs/cookiesConfig');

const accountRouter = express.Router();

accountRouter.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, fatherName, registration, email, password } =
      req.body;
    if (!email || !password || !firstName || !lastName || !registration) {
      return res.status(400).json({ message: 'Заполни все поля' });
    }

    const [newUser, created] = await User.findOrCreate({
      where: { email },
      defaults: {
        firstName,
        lastName,
        fatherName,
        registration,
        password: await bcrypt.hash(password, 10),
      },
    });

    if (!created) {
      return res
        .status(400)
        .json({ message: 'Такой пользователь уже существует' });
    }

    const user = newUser.get();
    delete user.password;
    delete user.createdAt;

    const { accessToken, refreshToken } = generateTokens({ user });
    res
      .cookie('refreshToken', refreshToken, cookiesConfig)
      .json({ user, accessToken });
  } catch (error) {
    console.error('Ошибка регистрации:', error);
    res.status(500).json({ message: 'Ошибка сервера при регистрации' });
  }
});

accountRouter.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Заполни все поля' });
    }

    const targetUser = await User.findOne({ where: { email } });
    if (!targetUser) return res.status(400).json({ message: 'Ошибка входа' });

    const isPasswordValid = await bcrypt.compare(password, targetUser.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Ошибка входа' });
    }

    const user = targetUser.get();
    delete user.password;
    delete user.createdAt;

    const { accessToken, refreshToken } = generateTokens({ user });
    res
      .cookie('refreshToken', refreshToken, cookiesConfig)
      .json({ user, accessToken });
  } catch (error) {
    console.error('Ошибка входа:', error);
    res.status(500).json({ message: 'Ошибка сервера при входе' });
  }
});

accountRouter.get('/logout', (req, res) => {
  try {
    res.clearCookie('refreshToken').sendStatus(200);
  } catch (error) {
    console.error('Ошибка выхода:', error);
    res.status(500).json({ message: 'Ошибка сервера при выходе' });
  }
});

module.exports = accountRouter;
