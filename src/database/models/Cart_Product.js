'use strict';
const { Model, Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Cart_Product extends Model {

    static associate(models) {
      // define association here
    }
  }
  Cart_Product.init({
    cartProductId: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.fn('UUID'),
      primaryKey: true,
      allowNull: false,
    },
    cartId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Cart",
        key: "cartId"
      }
    },
    productId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Product",
        key: "productId"
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      unsigned: true,
      allowNull: false
    },
    total: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      unsigned: true,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Cart_Product',
    tableName: "carts_products"
  });
  return Cart_Product;
};