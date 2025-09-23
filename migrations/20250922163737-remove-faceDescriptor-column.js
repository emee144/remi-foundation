"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn("users", "faceDescriptor");
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn("users", "faceDescriptor", {
      type: Sequelize.TEXT("long"), // or DataTypes you originally used
      allowNull: true,
    });
  },
};
