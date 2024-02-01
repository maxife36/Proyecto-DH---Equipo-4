'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    static associate(models) {
      // define association here
    }
  }

  User.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.fn('UUID'),
      primaryKey: true,
      allowNull: false,
    },
    admin: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
      allowNull: false,
      validate: {
        isIn: [[0, 1]], // Restricción para permitir solo 0 o 1
      }
    },
    fullname: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(60),
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    birthday: {
      type: DataTypes.DATE,
      allowNull: false
    },
    address: DataTypes.STRING(100),
    profile_img: DataTypes.STRING(100),
    username: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate: {
        is: /^[a-zA-Z0-9._-]{6,20}$/
      }
    },
    password: {
      type: DataTypes.STRING(30),
      allowNull: false,
      validate: {
        min: 8,
        max: 30
      }
    }
  }, {
    sequelize,
    modelName: "User",
    tableName: "users",
    timestamps: true
  });
  
  return User;
};