"use strict";
const { Model, Sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {

      // Product - User association
      this.belongsToMany(models.User, {
        as: "users",
        through: {
          model: models.Comment, 
          uniqueKey: 'commentId', 
        },
        foreignKey: "productId",
        otherKey: "userId"
      })

      // Product - Comment association
      this.hasMany(models.Comment, {
        as: "comments",
        foreignKey: "productId"
      })

      // Product - User through -> "favorite" association
      this.belongsToMany(models.User, {
        as: "favoriteUsers",
        through: {
          model: models.Favorite, 
          uniqueKey: 'favoriteId', 
        },
        foreignKey: "userId",
        otherKey: "productId"
      })

      // Product - Cart association
      this.belongsToMany(models.Cart, {
        as: "carts",
        through: "carts_products",
        foreignKey: "productId",
        otherKey: "cartId"
      })

      // Prdouct - "Cart_Product" association
      this.hasMany(models.Cart_Product, {
        as: "cartProducts",
        foreignKey: "productId"
      })

      // Product - Category association
      this.belongsToMany(models.Category, {
        as: "categories",
        through: "products_categories",
        foreignKey: "productId",
        otherKey: "categoryId"
      })

      // Prdouct - Images association
      this.hasMany(models.Image, {
        as: "iamges",
        foreignKey: "productId"
      })

      // Product - Feature association 
      this.belongsToMany(models.Feature, {
        as: "features",
        through: "products_features",
        foreignKey: "productId",
        otherKey: "featureId"
      })

      // Prdouct - "Product_Feature" association
      this.hasMany(models.Product_Feature, {
        as: "specifications",
        foreignKey: "productId"
      })

    }
  }

  Product.init({
    productId: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.fn("UUID"),
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
      unsigned: true,
      allowNull: false
    },
    discount: DataTypes.INTEGER,
    stock: {
      type: DataTypes.INTEGER,
      unsigned: true,
      allowNull: false
    },
    score: {
      type: DataTypes.INTEGER,
      unsigned: true,
      allowNull: false
    },
    categoryId: {
      type: DataTypes.UUID,
      references: {
        model: "Category",
        key: "categoryId"
      }
    }

  }, {
    sequelize,
    modelName: "Product",
    tableName: "products"
  });
  return Product;
};