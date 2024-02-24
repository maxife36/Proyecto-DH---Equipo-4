"use strict";
const { Model, Sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Product_Category extends Model {

    static associate(models) {
      // "Product_Category" - Product association
      this.belongsTo(models.Product, {
        as: "product",
        foreignKey: "productId"
      })
    }
  }
  Product_Category.init({
    productCategoryId: {
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
    categoryId: {
      type: DataTypes.UUID,
      references: {
        model: "Category",
        key: "categoryId"
      }
    }
  }, {
    sequelize,
    modelName: "Product_Category",
    tableName: "products_categories",
    timestamps: false
  });
  return Product_Category;
};