'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'faceDescriptor', {
      type: Sequelize.TEXT, // store JSON string of face descriptor array
      allowNull: false,
      defaultValue: '[]', // optional, empty array if you want
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('users', 'faceDescriptor');
  }
};
