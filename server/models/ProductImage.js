const Sequelize = require("sequelize")
const db = require("../models/index")

module.exports = db.sequelize.define(
  'ProductImage',
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
      references: {         // Order belongsTo User 1:1
        model: 'Products',
        key: 'id'
      }
    },
    name: {
      type: Sequelize.STRING
    },
    imagePath: {
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