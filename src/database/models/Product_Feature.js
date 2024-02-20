"use strict";
const { Model, Sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Product_Feature extends Model {

    static associate(models) {
      // "Product_Feature" - Feature association
      this.belongsTo(models.Feature, {
        as: "feature",
        foreignKey: "featureId"
      })

      // "Product_Feature" - Product association
      this.belongsTo(models.Product, {
        as: "product",
        foreignKey: "productId"
      })
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
      references: {
        model: "Product",
        key: "productId"
      }
    },
    featureId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Feature",
        key: "featureId"
      }
    },
    specification: {
      type: DataTypes.STRING(20),
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: "Product_Feature",
    tableName: "products_features",
    timestamps: false
  });

  return Product_Feature;
};