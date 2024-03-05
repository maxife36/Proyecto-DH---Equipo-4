"use strict";
const { Feature } = require("../models");

/** @type {import("sequelize-cli").Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const features = [
      {
        featureName: "Almacenamiento",
        featureIcon: "/almacenamiento.png"
      },
      {
        featureName: "Conectividad",
        featureIcon: "/conectividad.png"
      },
      {
        featureName: "Memoria RAM",
        featureIcon: "/memoriaRAM.png"
      },
      {
        featureName: "Otras Caracteristicas",
        featureIcon: "/otrasCaracteristicas.png"
      },
      {
        featureName: "Pantalla",
        featureIcon: "/pantalla.png"
      },
      {
        featureName: "Procesador",
        featureIcon: "/procesador.png"
      },
      {
        featureName: "Puertos",
        featureIcon: "/puertos.png"
      },
      {
        featureName: "Sistema Operativo",
        featureIcon: "/sistemaOperativo.png"
      },
    ]

    await Feature.bulkCreate(features);

  },

  async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("features", null, {});
  }
};
