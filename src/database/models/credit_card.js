"use strict";
const { Model, Sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Credit_Card extends Model {

    static associate(models) {
      // define association here
    }
  }

  Credit_Card.init({
    creditCardId: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.fn("UUID"),
      primaryKey: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "User",
        key: "userId"
      }
    },
    creditNumber: {
      type: DataTypes.STRING(16),
      allowNull: false
    },
    creditName: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    expirationDate: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: "Credit_Card",
    tableName: "credits_cards"
  });
  return Credit_Card;
};