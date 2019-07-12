'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      dob: {
        type: Sequelize.DATEONLY
      },
      profile: {
        type: Sequelize.STRING
      },
      contact: {
        type: Sequelize.BIGINT
      },
      resetToken: {
        allowNull: true,
        type: Sequelize.STRING
      },
      role: {
        type: Sequelize.ENUM('admin', 'user')
      },
      shippingAddress: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      deliveryAddress: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    },
      {
        timestamps: false
      }
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};