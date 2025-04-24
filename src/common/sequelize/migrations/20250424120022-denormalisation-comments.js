'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('comments', 'username', {
      type: Sequelize.DataTypes.STRING,
      allowNull: false, 
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('comments', 'username');
  }
};
