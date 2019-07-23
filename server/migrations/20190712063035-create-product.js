'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      categoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {         // Product belongsTo Category 1:1
          model: 'Categories',
          key: 'id'
        }
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      price: {
        type: Sequelize.DOUBLE
      },
      sku: {
        type: Sequelize.STRING
      },
      imagePath: {
        type: Sequelize.STRING
      },
      stockAvailability: {
        allowNull: false,
        type: Sequelize.ENUM('yes', 'no')
      },
      stock: {
        type: Sequelize.BIGINT
      },
      views: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      createdAt: {
        type: Sequelize.DATEONLY,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATEONLY
      },
    },
      {
        timestamps: false
      }
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Products');
  }
};