'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('images', 'fileId', {
      type: Sequelize.DataTypes.UUID,
      allowNull: true,
    });

    await queryInterface.addConstraint('images', {
      fields: ['fileId'],
      type: 'foreign key',
      name: 'images_fileId_fkey',
      references: {
        table: 'files',
        field: 'id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });

    await queryInterface.addIndex('images', ['fileId'], {
        unique: true,
        name: 'images_fileId_unique_idx',
        where: {
            fileId: {
                [Sequelize.Op.ne]: null
            }
        }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeIndex('images', 'images_fileId_unique_idx');
    await queryInterface.removeConstraint('images', 'images_fileId_fkey');
    await queryInterface.removeColumn('images', 'fileId');
  }
};
