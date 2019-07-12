const Sequelize = require("sequelize")
const db = require("../models/index")

module.exports = db.sequelize.define(
  'OrderProduct',
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    orderId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {         // Order belongsTo User 1:1
        model: 'Orders',
        key: 'id'
      }
    },
    productId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {         // Order belongsTo User 1:1
        model: 'Products',
        key: 'id'
      }
    },
    productPrice: {
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