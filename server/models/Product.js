const Sequelize = require("sequelize")
const db = require("../models/index")

module.exports = db.sequelize.define(
  'Product',
  {
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
    desc: {
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