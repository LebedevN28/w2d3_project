const express = require('express');
const { Initiative } = require('../../db/models');
const verifyAccessToken = require('../middlewares/verifyAccessToken');
const upload = require('../middlewares/multer');
const fs = require('fs/promises');
const sharp = require('sharp');

const initiativeRouter = express.Router();

// Получить все инициативы
initiativeRouter
  .route('/')
  .get(async (req, res) => {
    try {
      const initiatives = await Initiative.findAll();
      res.status(200).json(initiatives);
    } catch (error) {
      console.error('Ошибка получения инициатив:', error);
      res
        .status(500)
        .json({ message: 'Ошибка сервера при получении инициатив' });
    }
  })
  .post(verifyAccessToken, upload.single('file'), async (req, res) => {
    const { title, description, imagesUrl, deadline } = req.body;
    try {
      const { title, description } = req.body;

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
        deadline: futureDate
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

// Получить все инициативы пользователя и удалить их
initiativeRouter.route('/userCards/:userId').delete(async (req, res) => {
  try {
    const { userId } = req.params;

    const deletedCount = await Initiative.destroy({ where: { userId } });

    if (deletedCount === 0) {
      return res
        .status(404)
        .json({ message: 'Инициативы для удаления не найдены' });
    }

    res.sendStatus(204);
  } catch (error) {
    console.error('Ошибка удаления инициатив пользователя:', error);
    res.status(500).json({
      message: 'Ошибка сервера при удалении инициатив пользователя',
    });
  }
});

initiativeRouter
  .route('/userCards/:userId')
  .get(async (req, res) => {})
  .delete(async (req, res) => {
    try {
      const { userId } = req.params;

      const deletedCount = await Initiative.destroy({ where: { userId } });

      if (deletedCount === 0) {
        return res
          .status(404)
          .json({ message: 'Инициативы для удаления не найдены' });
      }

      res.sendStatus(204);
    } catch (error) {
      console.error('Ошибка удаления инициатив пользователя:', error);
      res.status(500).json({
        message: 'Ошибка сервера при удалении инициатив пользователя',
      });
    }
  });

  initiativeRouter
  .route('/:initiativeId/voteFor')
  .put(verifyAccessToken, async (req, res) => {
    const { initiativeId } = req.params;
    const vote = await Initiative.findByPk(initiativeId);
    await vote.update({ count: vote.count + 1 });
    await vote.save();
    res.json(vote);
  })
  .route('/:initiativeId/voteAnti')
  .put(verifyAccessToken, async (req, res) => {
    const { initiativeId } = req.params;
    const vote = await Initiative.findByPk(initiativeId);
    await vote.update({ count: vote.discount + 1 });
    await vote.save();
    res.json(vote);
  });

module.exports = initiativeRouter;
