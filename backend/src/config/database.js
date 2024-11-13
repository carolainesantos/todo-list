const { Sequelize } = require("sequelize");
require("dotenv").config();

class Database {
  constructor() {
    this.initDB();
  }

  initDB() {
    this.db = new Sequelize({
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      dialect: "mysql",
    });
  }
}

module.exports = new Database();
