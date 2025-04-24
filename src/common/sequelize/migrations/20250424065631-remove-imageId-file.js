'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    try {
      await queryInterface.removeConstraint('files', 'files_imageId_fkey');
    } catch (error) {
      console.warn(`Constraint 'files_imageId_fkey' not found, skipping removal.`);
    }

    try {
       await queryInterface.removeIndex('files', 'files_imageId_unique_idx');
    } catch (error) {
       console.warn(`Index 'files_imageId_unique_idx' not found, skipping removal.`);
    }


    await queryInterface.removeColumn('files', 'imageId');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn('files', 'imageId', {
      type: Sequelize.DataTypes.UUID,
      allowNull: true,
    });

    await queryInterface.addConstraint('files', {
      fields: ['imageId'],
      type: 'foreign key',
      name: 'files_imageId_fkey',
      references: {
        table: 'images',
        field: 'id',
      },
      onDelete: 'SET NULL', 
      onUpdate: 'CASCADE',
    });

     await queryInterface.addIndex('files', ['imageId'], {
         unique: true,
         name: 'files_imageId_unique_idx', 
         where: {
             imageId: {
                 [Sequelize.Op.ne]: null
             }
         }
     });
  }
};
