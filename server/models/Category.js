const Sequelize = require("sequelize")
const db = require("../models/index")

module.exports = db.sequelize.define(
  'Category',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING
    },
    imagePath: {
      type: Sequelize.STRING
    },
    desc: {
      type: Sequelize.TEXT
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATEONLY,
      defaultValue: Sequelize.NOW
    },
    updatedAt: {
      type: Sequelize.DATEONLY,
      allowNull: true
    }
  },
  {
    timestamps: false
  }
);