"use strict";
/** @type {import("sequelize-cli").Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("products_categories", {
      productCategoryId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.fn("UUID"),
        primaryKey: true,
        allowNull: false,
      }
    }, {
      timestamp: false
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("products_categories");
  }
};