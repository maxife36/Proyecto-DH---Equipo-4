"use strict";

const { Model, Sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Image extends Model {

    static associate(models) {
      // Images - Prdouct association
      this.belongsTo(models.Product, {
        as: "product",
        foreignKey: "productId"
      })
    }
  }

  Image.init({
    imageId: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.fn("UUID"),
      primaryKey: true,
      allowNull: false,
    },
    productId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Product",
        key: "productId"
      }
    },
    imageTitle: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: "Image",
    tableName: "images",
    timestamps: false
  });

  return Image;
};