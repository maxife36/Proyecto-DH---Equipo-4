"use strict";
const { Model, Sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Feature extends Model {

    static associate(models) {
      // define association here
    }
  }

  Feature.init({
    featureId: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.fn("UUID"),
      primaryKey: true,
      allowNull: false,
    },
    fetureName: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    fetureIcon: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: "Feature",
    tableName: "features",
    timestamps: false
  });
  
  return Feature;
};