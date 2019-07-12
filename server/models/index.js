const Sequelize = require('sequelize');
const db = {}
const sequelize = new Sequelize("shoppingBay", "root", "password", {
  host: "localhost",
  dialect: "mysql",

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idel: 10000
  }
})
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;