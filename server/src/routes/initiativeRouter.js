const express = require('express');
const { Initiative, User } = require('../../db/models'); // Подключаем User модель
const verifyAccessToken = require('../middlewares/verifyAccessToken');
const upload = require('../middlewares/multer');
const fs = require('fs/promises');
const sharp = require('sharp');

const initiativeRouter = express.Router();

// Получить все инициативы с пользователями
initiativeRouter
  .route('/')
  .get(async (req, res) => {
    try {
      const initiatives = await Initiative.findAll({
        include: [{ model: User, attributes: ['firstName', 'lastName', 'id'] }], // Исправление атрибутов
      });
      res.status(200).json(initiatives);
    } catch (error) {
      console.error('Ошибка получения инициатив:', error);
      res
        .status(500)
        .json({ message: 'Ошибка сервера при получении инициатив' });
    }
  })
  .post(verifyAccessToken, upload.single('file'), async (req, res) => {
    const { title, description } = req.body; // Убираем дублирование
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'Файл не загружен' });
      }

      const name = `${Date.now()}.webp`;
      const outputBuffer = await sharp(req.file.buffer).webp().toBuffer();
      await fs.writeFile(`./public/img/${name}`, outputBuffer);

      const today = new Date();
      const futureDate = new Date(today);
      futureDate.setDate(today.getDate() + 30);

      const newInit = await Initiative.create({
        title,
        description,
        imagesUrl: name,
        levelPriority: res.locals.user.registration,
        userId: res.locals.user.id,
        deadline: futureDate,
      });

      res.status(201).json(newInit);
    } catch (error) {
      console.error('Ошибка создания инициативы:', error);
      res
        .status(500)
        .json({ message: 'Ошибка сервера при создании инициативы' });
    }
  });

// Получить инициативу по ID
initiativeRouter.route('/:initiativeId').get(async (req, res) => {
  try {
    const { initiativeId } = req.params;
    const initiativeById = await Initiative.findByPk(initiativeId);

    if (!initiativeById) {
      return res.status(404).json({ message: 'Инициатива не найдена' });
    }

    res.status(200).json(initiativeById);
  } catch (error) {
    console.error('Ошибка получения инициативы по ID:', error);
    res
      .status(500)
      .json({ message: 'Ошибка сервера при получении инициативы' });
  }
});

// Удаление инициатив пользователя
initiativeRouter
  .route('/userCards/:userId')
  .get(async (req, res) => {
    const { userId } = req.params;
    try {
      const initiativeOfUser = await Initiative.findAll({
        where: { userId },
      });
      res.status(200).json(initiativeOfUser);
    } catch (error) {
      console.error('Ошибка получения инициатив пользователя:', error);
      res.status(500).send(error);
    }
  })
  .delete(async (req, res) => {
    const { userId } = req.params;
    try {
      const deletedCount = await Initiative.destroy({
        where: { userId },
      });

      if (deletedCount === 0) {
        return res
          .status(404)
          .json({ message: 'Инициативы для удаления не найдены' });
      }

      res.sendStatus(204); // No Content
    } catch (error) {
      console.error('Ошибка удаления инициатив пользователя:', error);
      res.status(500).send(error);
    }
  });

// Обработчик для голосования "за"
initiativeRouter.put(
  '/:initiativeId/voteFor',
  verifyAccessToken,
  async (req, res) => {
    const { initiativeId } = req.params;
    try {
      const vote = await Initiative.findByPk(initiativeId);
      if (!vote)
        return res.status(404).json({ message: 'Инициатива не найдена' });

      // Обновляем количество голосов
      await vote.update({ count: vote.count + 1 });
      await vote.save();
      res.json(vote);
    } catch (error) {
      console.error('Ошибка при голосовании за:', error);
      res.status(500).json({ message: 'Ошибка сервера при голосовании' });
    }
  }
);

// Обработчик для голосования "против"
initiativeRouter.put(
  '/:initiativeId/voteAnti',
  verifyAccessToken,
  async (req, res) => {
    const { initiativeId } = req.params;
    try {
      const vote = await Initiative.findByPk(initiativeId);
      if (!vote)
        return res.status(404).json({ message: 'Инициатива не найдена' });

      // Обновляем количество голосов
      await vote.update({ count: vote.count - 1 });
      await vote.save();
      res.json(vote);
    } catch (error) {
      console.error('Ошибка при голосовании против:', error);
      res.status(500).json({ message: 'Ошибка сервера при голосовании' });
    }
  }
);

module.exports = initiativeRouter;
