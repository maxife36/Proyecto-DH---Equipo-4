'use strict';
const { Model, Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {

    static associate(models) {
      // define association here
    }
  }

  Cart.init({
    cartId: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.fn('UUID'),
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
    amount:{
      type: DataTypes.INTEGER,
      defaultValue: 0,
      unsigned: true,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: "Cart",
    tableName: "carts",
    timestamps: false
  });
  return Cart;
};