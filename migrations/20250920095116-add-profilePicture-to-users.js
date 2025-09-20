'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'profilePicture', {
      type: Sequelize.BLOB('long'), // store large image
      allowNull: true,              // optional, user may not have uploaded yet
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('users', 'profilePicture');
  }
};
