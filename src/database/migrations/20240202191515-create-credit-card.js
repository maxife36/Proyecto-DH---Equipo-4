'use strict';
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('credits_cards', {
      creditCardId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.fn('UUID'),
        primaryKey: true,
        allowNull: false,
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "User",
          key: "userId"
        }
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
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('credits_cards');
  }
};