"use strict";
const { Category } = require("../models");

/** @type {import("sequelize-cli").Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const categories = [
      { categoryTitle: "Procesadores" },
      { categoryTitle: "Tarjetas Gráficas" },
      { categoryTitle: "Almacenamiento" },
      { categoryTitle: "Memoria RAM" },
      { categoryTitle: "Monitores" },
      { categoryTitle: "Periféricos" },
      { categoryTitle: "Laptops" },
      { categoryTitle: "PC de Escritorio" },
      { categoryTitle: "Accesorios Gaming" },
      { categoryTitle: "Ofertas" },
    ];
    await Category.bulkCreate(categories);

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("categories", null, {});
  }
};
