"use strict";
const { Model, Sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Product_Category extends Model {

    static associate(models) {
      // define association here
    }
  }
  Product_Category.init({
    productCategoryId: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.fn("UUID"),
      primaryKey: true,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: "Product_Category",
    tableName: "products_categories",
    timestamps:false
  });
  return Product_Category;
};