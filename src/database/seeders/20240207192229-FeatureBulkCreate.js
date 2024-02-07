'use strict';
const { Feature } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const features = [
      {
        fetureName: "Almacenamiento",
        fetureIcon: "/almacenamiento.png"
      },
      {
        fetureName: "Conectividad",
        fetureIcon: "/conectividad.png"
      },
      {
        fetureName: "Memoria RAM",
        fetureIcon: "/memoriaRAM.png"
      },
      {
        fetureName: "Otras Caracteristicas",
        fetureIcon: "/otrasCaracteristicas.png"
      },
      {
        fetureName: "Pantalla",
        fetureIcon: "/pantalla.png"
      },
      {
        fetureName: "Procesador",
        fetureIcon: "/procesador.png"
      },
      {
        fetureName: "Puertos",
        fetureIcon: "/puertos.png"
      },
      {
        fetureName: "Sistema Operativo",
        fetureIcon: "/sistemaOperativo.png"
      },
    ]

    await Feature.bulkCreate(features);

  },

  async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('features', null, {});
  }
};
