'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('carts', {
      cartId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.fn('UUID'),
        primaryKey: true,
        allowNull: false,
      },
      amount: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        unsigned: true,
        allowNull: true
      }
    }, {
      timestamps: false
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('carts');
  }
};