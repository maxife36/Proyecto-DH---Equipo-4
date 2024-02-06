"use strict";
const { Model, Sequelize } = require("sequelize");

const CartModel = require("./Cart")

module.exports = (sequelize, DataTypes) => {

  const Cart = CartModel(sequelize, Sequelize.DataTypes)
  class User extends Model {

    static associate(models) {

      // User - Cart association
      this.hasOne(models.Cart, {
        as: "cart",
        foreignKey: "userId"
      })

      // User - Credit Cards association
      this.hasMany(models.Credit_Card, {
        as: "creditCards",
        foreignKey: "userId"
      })

      // User - Product through -> "comments" association
      this.belongsToMany(models.Product, {
        as: "productsReviews",
        through: "comments",
        foreignKey: "userId",
        otherKey: "productId"
      })

      // User - Comment association
      this.hasMany(models.Comment, {
        as: "comments",
        foreignKey: "userId"
      })

      // User - Purchase association
      this.hasMany(models.Purchase, {
        as: "purchases",
        foreignKey: "userId"
      })

      // User - Product through -> "favorite" association
      this.belongsToMany(models.Product, {
        as: "favoriteProducts",
        through: "favorites",
        foreignKey: "userId",
        otherKey: "productId"
      })


    }
  }

  // HOOKS de User - Crea automaticamente un carrito por usuario
  User.afterCreate(async (user, options) => {
    await Cart.create({ userId: user.userId })

  })

  return User;
};