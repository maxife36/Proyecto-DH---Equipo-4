'use strict';

const { Model, Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Image extends Model {

    static associate(models) {
      // define association here
    }
  }

  Image.init({
    imageId: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.fn('UUID'),
      primaryKey: true,
      allowNull: false,
    },
    productId: {
      type: DataTypes.UUID,
      references:{
          model: "Product", 
          key: "productId"
        }
    },
    imageTitle: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Image',
  });
  
  return Image;
};