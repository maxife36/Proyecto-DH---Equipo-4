'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('carts_products', {
      cartProductId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.fn('UUID'),
        primaryKey: true,
        allowNull: false,
      },
      cartId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Cart",
          key: "cartId"
        }
      },
      productId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Product",
          key: "productId"
        }
      },
      quantity: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        unsigned: true,
        allowNull: false
      },
      total: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        unsigned: true,
        allowNull: false
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('carts_products');
  }
};