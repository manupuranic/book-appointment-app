const Sequelize = require("sequelize");

const sequelize = new Sequelize("booking-appointment", "root", "root2000", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
