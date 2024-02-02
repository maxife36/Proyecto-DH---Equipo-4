'use strict';
const { Model, Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Purchase extends Model {

    static associate(models) {
      // define association here
    }
  }

  Purchase.init({
    purchaseId: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.fn('UUID'),
        primaryKey: true,
        allowNull: false,
      },
      cartId: {
        type: DataTypes.UUID,
        allowNull: false
      },
      productId: {
        type: DataTypes.UUID,
        allowNull: false
      },
      productName: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      quantity: {
        type: DataTypes.INTEGER,
        unsigned: true,
        allowNull: false
      },
      amount: {
        type: DataTypes.INTEGER,
        unsigned: true,
        allowNull: true
      }
  }, {
    sequelize,
    modelName: "Purchase",
    tableName: "purchases"
  });
  return Purchase;
}; 