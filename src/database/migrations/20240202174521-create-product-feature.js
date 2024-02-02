'use strict';
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('products_features', {
      productFeatureId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.fn('UUID'),
        primaryKey: true,
        allowNull: false,
      },
      productId: {
        type: Sequelize.UUID,
        allowNull: false,
        references:{
            model: "Product", 
            key: "productId"
          }
      },
      featureId: {
        type: Sequelize.UUID,
        allowNull: false,
        references:{
            model: "Feature", 
            key: "featureId"
          }
      },
      specification: {
        type: Sequelize.STRING(20),
        allowNull: false,
      }
    },{
      timestamp:false
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('products_features');
  }
};