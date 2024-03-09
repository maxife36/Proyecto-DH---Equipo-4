"use strict";
const { Model, Sequelize } = require("sequelize");
const CartProductModel = require("./Cart_Product")

module.exports = (sequelize, DataTypes) => {

  class Cart extends Model {

    static associate(models) {

      // Cart - User association
      this.belongsTo(models.User, {
        as: "user",
        foreignKey: "userId"
      })

      // Cart - Product association
      this.belongsToMany(models.Product, {
        as: "products",
        through: {
          model: models.Cart_Product,
          uniqueKey: "cartProductId",
        },
        foreignKey: "cartId",
        otherKey: "productId"
      })

      // Cart - "Cart_Product" association
      this.hasMany(models.Cart_Product, {
        as: "cartProducts",
        foreignKey: "cartId"
      })

    }
  }

  Cart.init({
    cartId: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "User",
        key: "userId"
      }
    },
    amount: {
      type: Sequelize.VIRTUAL,
      unsigned: true,
      get: async function () {
        const CartProductInstance = CartProductModel(sequelize, DataTypes)
        const cartProducts = await CartProductInstance.findAll({
          where: { cartId: this.cartId }
        })

        let totalAmount = 0
        
        for (const product of cartProducts) {
          totalAmount += await product.total
        }

        return totalAmount
      }
    },
  }, {
    sequelize,
    modelName: "Cart",
    tableName: "carts",
    timestamps: false
  });

  return Cart;
};