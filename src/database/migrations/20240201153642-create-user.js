"use strict";
/** @type {import("sequelize-cli").Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users",  {
      userId: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
      },
      admin : {
        type: Sequelize.TINYINT,
        defaultValue: 0,
        allowNull: false,
      },
      fullname:{
        type: Sequelize.STRING(100),
        allowNull: false
      },
      email: {
        type: Sequelize.STRING(60),
        allowNull: false,
        unique: true,        
      },
      birthday:{
        type: Sequelize.DATE,
        allowNull:false
      },
      address: Sequelize.STRING(100),
      profileImg: Sequelize.STRING(100),
      username: {
        type: Sequelize.STRING(20),
        allowNull:false,
        unique: true,       
      },
      password : {
        type: Sequelize.STRING(100),
        allowNull:false,
      },
      isVerified : {
        type: Sequelize.TINYINT,
        defaultValue: 0,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"),
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("users");
  }
};