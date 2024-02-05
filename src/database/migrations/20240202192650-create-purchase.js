"use strict";
/** @type {import("sequelize-cli").Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("purchases", {
      purchaseId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.fn("UUID"),
        primaryKey: true,
        allowNull: false,
      },
      productId: {
        type: Sequelize.UUID,
        allowNull: false
      },
      productName: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      quantity: {
        type: Sequelize.INTEGER,
        unsigned: true,
        allowNull: false
      },
      amount: {
        type: Sequelize.INTEGER,
        unsigned: true,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("purchases");
  }
}; 