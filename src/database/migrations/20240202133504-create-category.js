'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('categories', {
      categoryId: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.fn('UUID'),
        primaryKey: true
      },
      categoryTitle: {
        type: DataTypes.STRING(30),
        allowNull: false
      }
    },{
      timestamp:false
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('categories');
  }
};