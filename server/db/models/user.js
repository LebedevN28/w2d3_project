'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ Initiative }) {
      this.hasMany(Initiative, { foreignKey: 'userId' });
    }
  }
  User.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      fatherName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      registration: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
