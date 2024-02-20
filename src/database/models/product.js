"use strict";
const { Model, Sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {

      // Product - User through -> "comments" association
      this.belongsToMany(models.User, {
        as: "users",
        through: {
          model: models.Comment, 
          uniqueKey: "commentId", 
        },
        foreignKey: "productId",
        otherKey: "userId"
      })

      // Product - Comment association
      this.hasMany(models.Comment, {
        as: "comments",
        foreignKey: "productId"
      })

      // Product - User through -> "favorites" association
      this.belongsToMany(models.User, {
        as: "favoriteUsers",
        through: {
          model: models.Favorite, 
          uniqueKey: "favoriteId", 
        },
        foreignKey: "userId",
        otherKey: "productId"
      })

      // Product - Favorite association
      this.hasMany(models.Favorite, {
        as: "favorites",
        foreignKey: "productId"
      })

      // Product - Cart association
      this.belongsToMany(models.Cart, {
        as: "carts",
        through: {
          model: models.Cart_Product, 
          uniqueKey: "cartProductId", 
        },
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
        through: {
          model: models.Product_Category, 
          uniqueKey: "productCategoryId", 
        },
        foreignKey: "productId",
        otherKey: "categoryId"
      })

      // Prdouct - Images association
      this.hasMany(models.Image, {
        as: "images",
        foreignKey: "productId"
      })

      // Product - Feature association 
      this.belongsToMany(models.Feature, {
        as: "features",
        through: {
          model: models.Product_Feature, 
          uniqueKey: "productFeatureId", 
        },
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