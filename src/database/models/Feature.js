"use strict";
const { Model, Sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Feature extends Model {

    static associate(models) {
         // Feature - Product association 
         this.belongsToMany(models.Product, {
          as: "products",
          through: {
            model: models.Product_Feature, 
            uniqueKey: "productFeatureId", 
          },
          foreignKey: "featureId",
          otherKey: "productId"
        })
  
        // Feature - "Product_Feature" association
        this.hasMany(models.Product_Feature, {
          as: "specifications",
          foreignKey: "featureId"
        })
    }
  }

  Feature.init({
    featureId: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    featureName: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    featureIcon: {
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