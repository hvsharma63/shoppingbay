const Sequelize = require("sequelize")
const db = require("./index")

module.exports = db.sequelize.define(
  'ProductRating',
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
    productId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {         // Order belongsTo User 1:1
        model: 'Products',
        key: 'id'
      }
    },
    rating: {
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