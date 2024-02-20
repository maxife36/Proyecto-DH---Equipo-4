"use strict";
const { Model, Sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Category extends Model {

    static associate(models) {
      // Product - Category association
      this.belongsToMany(models.Product, {
        as: "products",
        through: "products_categories",
        through: {
          model: models.Product_Category, 
          uniqueKey: "productCategoryId", 
        },
        foreignKey: "categoryId",
        otherKey: "productId"
      })
    }
  }

  Category.init({
    categoryId: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.fn("UUID"),
      primaryKey: true
    },
    categoryTitle: {
      type: DataTypes.STRING(30),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: "Category",
    tableName: "categories",
    timestamps: false
  });

  return Category;
};