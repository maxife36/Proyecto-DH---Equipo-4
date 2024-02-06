"use strict";
const { Model, Sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Purchase extends Model {

    static associate(models) {
      // Purchase - User association
      this.belongsTo(models.User,{
        as:"user",
        foreignKey: "userId"
      })

    }
  }

  Purchase.init({
    purchaseId: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.fn("UUID"),
      primaryKey: true,
      allowNull: false,
    },
    data: {
      type: DataTypes.JSON,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: "Purchase",
    tableName: "purchases"
  });

  return Purchase;
}; 