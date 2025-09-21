'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.changeColumn('users', 'phone', {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true, // add uniqueness
  });
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.changeColumn('users', 'phone', {
    type: Sequelize.STRING,
    allowNull: false,
    unique: false, // rollback
  });
}
