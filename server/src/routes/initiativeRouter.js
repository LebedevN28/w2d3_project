const express = require('express');
const { Initiative } = require('../../db/models');
const verifyAccessToken = require('../middlewares/verifyAccessToken');
const upload = require('../middlewares/multer');
const fs = require('fs/promises');
const sharp = require('sharp');

const initiativeRouter = express.Router();

initiativeRouter
  .route('/')
  .get(async (req, res) => {
    try {
      const initiatives = await Initiative.findAll();
      res.status(200).json(initiatives);
    } catch (error) {
      res.status(500).send(error);
    }
  })
  .post(verifyAccessToken, upload.single('file'), async (req, res) => {
    const { title, description, imagesUrl } = req.body;
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'Файл не загружен' });
      }
      const name = `${Date.now()}.webp`;
      const outputBuffer = await sharp(req.file.buffer).webp().toBuffer();
      await fs.writeFile(`./public/img/${name}`, outputBuffer);
      const newInit = await Initiative.create({
        title,
        description,
        imagesUrl: name,
        levelPriority: res.locals.user.registration,
        userId: res.locals.user.id,
      });
      res.status(201).json(newInit);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  });

initiativeRouter.route('/:initiativeId').get(async (req, res) => {
  const { initiativeId } = req.params;
  try {
    const initiativeById = await Initiative.findByPk(initiativeId);
    res.status(200).json(initiativeById);
  } catch (error) {
    res.status(500).send(error);
  }
});

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
      res.status(500).send(error);
    }
  });

initiativeRouter
.route('/userCards/:userId')
.get(async (req, res) => {
  })
  .delete(async (req, res) => {

    const { userId } = req.params;
    try {
      await Initiative.destroy({
        where: { userId },
      });
      res.sendStatus(204);
    } catch (error) {
      res.status(500).send(error);
    }
  });

module.exports = initiativeRouter;
