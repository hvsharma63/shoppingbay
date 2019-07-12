// 'use strict';
// module.exports = (sequelize, DataTypes) => {
//   const User = sequelize.define('user', {
//     firstName: DataTypes.STRING,
//     lastName: DataTypes.STRING,
//     email: DataTypes.STRING,
//     password: DataTypes.STRING,
//     dob: DataTypes.DATE,
//     profile: DataTypes.STRING,
//     contact: DataTypes.STRING,
//     resetToken: DataTypes.STRING,
//     role: DataTypes.ENUM('admin', 'user'),
//     shippingAddress: DataTypes.STRING,
//     deliveryAddress: DataTypes.STRING
//   }, {});
//   User.associate = function (models) {
//     // associations can be defined here
//   };
//   return User;
// };

const Sequelize = require("sequelize")
const db = require("../models/index")

module.exports = db.sequelize.define(
  'User',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
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
      type: Sequelize.DATE
    },
    profile: {
      type: Sequelize.STRING
    },
    contact: {
      type: Sequelize.STRING
    },
    resetToken: {
      type: Sequelize.STRING
    },
    role: {
      type: Sequelize.ENUM,
      values: ['admin', 'user']
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