"use strict";

/** @type {import("sequelize-cli").Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("products", "categoryId", {
      type: Sequelize.UUID,
      references: {
        model: "categories", //debe ir el nombre de la Tabla, no del modelo
        key: "categoryId"
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    });
    await queryInterface.addColumn("images", "productId", {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: "products",
        key: "productId"
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    });
    await queryInterface.addColumn("products_features", "productId", {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: "products",
        key: "productId"
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    });
    await queryInterface.addColumn("products_features", "featureId", {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: "features",
        key: "featureId"
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    });
    await queryInterface.addColumn("favorites", "userId", {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "userId"
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    });
    await queryInterface.addColumn("favorites", "productId", {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: "products",
        key: "productId"
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    });
    await queryInterface.addColumn("comments", "userId", {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "userId"
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    });
    await queryInterface.addColumn("comments", "productId", {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: "products",
        key: "productId"
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    });
    await queryInterface.addColumn("carts", "userId", {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "userId"
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    });
    await queryInterface.addColumn("carts_products", "cartId", {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: "carts",
        key: "cartId"
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    });
    await queryInterface.addColumn("carts_products", "productId", {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: "products",
        key: "productId"
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    });
    await queryInterface.addColumn("credits_cards", "userId", {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "userId"
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    });
    await queryInterface.addColumn("purchases", "userId", {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "userId"
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    });
    await queryInterface.addColumn("products_categories", "productId", {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: "products",
        key: "productId"
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    });
    await queryInterface.addColumn("products_categories", "categoryId", {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: "categories",
        key: "categoryId"
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("products", "categoryId");
    await queryInterface.removeColumn("images", "productId");
    await queryInterface.removeColumn("products_features", "productId");
    await queryInterface.removeColumn("products_features", "featureId");
    await queryInterface.removeColumn("favorites", "userId");
    await queryInterface.removeColumn("favorites", "productId");
    await queryInterface.removeColumn("comments", "userId");
    await queryInterface.removeColumn("comments", "productId");
    await queryInterface.removeColumn("carts", "userId");
    await queryInterface.removeColumn("carts_products", "cartId");
    await queryInterface.removeColumn("carts_products", "productId");
    await queryInterface.removeColumn("credits_cards", "userId");
    await queryInterface.removeColumn("purchases", "userId");
    await queryInterface.removeColumn("products_categories", "productId");
    await queryInterface.removeColumn("products_categories", "categoryId");
  }
};
