'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Initiative extends Model {
    static associate({ User }) {
      this.belongsTo(User, { foreignKey: 'userId' })
    }
  }
  Initiative.init({
    tittle: DataTypes.STRING,
    description: DataTypes.TEXT,
    imagesUrl: DataTypes.STRING,
    count: DataTypes.INTEGER,
    levelPriority: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Initiative',
  });
  return Initiative;
};