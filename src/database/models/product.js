'use strict';
const { Model, Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      // define association here
    }
  }

  Product.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.fn('UUID'),
      primaryKey: true,
      allowNull: false,
    },
    productName: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    productBrand: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    shortDescription: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    longDescription: DataTypes.STRING(200),
    productPrice: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    discount: DataTypes.INTEGER,
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    categoryId: {
      type: DataTypes.UUID,
      references:{
          model: "Category", 
          key: "categoryId"
        }
    }

  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};