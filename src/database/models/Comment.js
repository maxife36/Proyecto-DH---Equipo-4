"use strict";
const { Model, Sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {


    static associate(models) {
      // Comment - User association
      this.belongsTo(models.User,{
        as: "user",
        foreignKey: "userId"
      })

      // Comment - Product association
      this.belongsTo(models.Product,{
        as: "product",
        foreignKey: "productId"
      })
    }
  }
  Comment.init({
    commentId: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.fn("UUID"),
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
    productId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Product",
        key: "productId"
      }
    },
    commentBody: {
      type: DataTypes.STRING(300),
      allowNull: false
    },
    score: {
      type: DataTypes.INTEGER,
      unsigned: true,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: "Comment",
    tableName: "comments"
  });
  return Comment;
};