const express = require('express');
const { Initiative } = require('../../db/models');
const verifyAccessToken = require('../middlewares/verifyAccessToken');

const initiativeRouter = express.Router();

initiativeRouter
.route('/')
.get(async (req, res) => {
    try {
        const initiatives = await Initiative.findAll();
        res.status(200).json(initiatives)
    } catch (error) {
        res.status(500).send(error)
    }
})
.post(verifyAccessToken, async (req, res) => {
    const { title, description, imagesUrl, count, discount, levelPriority } = req.body;
    try {
       const newInit = await Initiative.create({ title, description, imagesUrl, count, discount, levelPriority });
       res.status(201).json(newInit)
    } catch (error) { 
        res.status(500).send(error)
    }
})

initiativeRouter
.route('/:initiativeId')
.get(async (req, res) => {
    const { initiativeId } = req.params;
    try {
        const initiativeById = await Initiative.findByPk(initiativeId);
        res.status(200).json(initiativeById)
    } catch (error) {
        res.status(500).send(error)
    }
})

initiativeRouter
.route('/userCards/:userId')
.get(async (req, res) => {
    const { userId } = req.params;
    try {
        const initiativeOfUser = await Initiative.findAll({
            where: { userId }
        })
        res.status(200).json(initiativeOfUser)
    } catch (error) {
        res.status(500).send(error)
    }
})


module.exports = initiativeRouter;