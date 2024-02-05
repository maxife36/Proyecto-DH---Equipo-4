"use strict";
/** @type {import("sequelize-cli").Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("comments", {
      commentId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.fn("UUID"),
        primaryKey: true,
        allowNull: false,
      },
      commentBody: {
        type: Sequelize.STRING(300),
        allowNull: false
      },
      score: {
        type: Sequelize.INTEGER,
        unsigned: true,
        allowNull: false
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("comments");
  }
};