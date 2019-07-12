const Sequelize = require("sequelize")
const db = require("../models/index")

module.exports = db.sequelize.define(
  'Order',
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {         // Order belongsTo User 1:1
        model: 'Users',
        key: 'id'
      }
    },
    deliveryAddress: {
      type: Sequelize.TEXT
    },
    subTotalPrice: {
      type: Sequelize.DOUBLE
    },
    tax: {
      type: Sequelize.DOUBLE
    },
    finalAmount: {
      type: Sequelize.DOUBLE
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