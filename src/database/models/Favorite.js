"use strict";
const { Model, Sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Favorite extends Model {

    static associate(models) {
      // define association here
    }
  }

  Favorite.init({
    favoriteId: {
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
    productId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Product",
        key: "productId"
      }
    }
  }, {
    sequelize,
    modelName: "Favorite",
    tableName: "favorites",
    timestamps: false
  });
  return Favorite;
};