const Sequelize = require("sequelize")
const db = require("../models/index")

module.exports = db.sequelize.define(
  'Deal',
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    productId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Products',
        key: 'id'
      }
    },
    discountPrice: {
      type: Sequelize.DOUBLE
    },
    startDate: {
      allowNull: false,
      type: Sequelize.DATE
    },
    endDate: {
      allowNull: false,
      type: Sequelize.DATE
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATEONLY,
      defaultValue: Sequelize.NOW
    },
    updatedAt: {
      allowNull: true,
      type: Sequelize.DATEONLY
    }
  },
  {
    timestamps: false
  }
);