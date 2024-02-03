"use strict";
const { Model, Sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Product_Feature extends Model {

    static associate(models) {
      // define association here
    }
  }

  Product_Feature.init({
    productFeatureId: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.fn("UUID"),
      primaryKey: true,
      allowNull: false,
    },
    productId: {
      type: DataTypes.UUID,
      allowNull: false,
      references:{
          model: "Product", 
          key: "productId"
        }
    },
    featureId: {
      type: DataTypes.UUID,
      allowNull: false,
      references:{
          model: "Feature", 
          key: "featureId"
        }
    }}, {
    sequelize,
    modelName: "Product_Feature",
    tableName: "products_features",
    timestamps:false
  });

  return Product_Feature;
};