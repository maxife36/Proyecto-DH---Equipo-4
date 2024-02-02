'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users',  {
      userId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.fn('UUID'),
        primaryKey: true,
        allowNull: false,
      },
      admin : {
        type: Sequelize.TINYINT,
        defaultValue: 0,
        allowNull: false,
        validate: {
          isIn: [[0, 1]], // Restricción para permitir solo 0 o 1
        }
      },
      fullname:{
        type: Sequelize.STRING(100),
        allowNull: false
      },
      email: {
        type: Sequelize.STRING(60),
        allowNull: false,
        unique: true,        
        validate:{
          isEmail: true
        }
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
        validate:{
          is: /^[a-zA-Z0-9._-]{6,20}$/
        }
      },
      password : {
        type: Sequelize.STRING(30),
        allowNull:false,
        validate:{
          len: [8,30]
        }
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};