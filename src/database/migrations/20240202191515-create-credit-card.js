"use strict";
/** @type {import("sequelize-cli").Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("credits_cards", {
      creditCardId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.fn("UUID"),
        primaryKey: true,
        allowNull: false,
      },
      creditNumber: {
        type: Sequelize.STRING(16),
        allowNull: false
      },
      creditName: {
        type: Sequelize.STRING(20),
        allowNull: false
      },
      expirationDate: {
        type: Sequelize.DATE,
        allowNull: false
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
    await queryInterface.dropTable("credits_cards");
  }
};