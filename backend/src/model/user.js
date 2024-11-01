const database = require("../config/database");

class UserModel {
  constructor() {
    this.model = database.db.define("users", {
      id: {
        type: database.db.Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: database.db.Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: database.db.Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: database.db.Sequelize.STRING,
        allowNull: false,
      },
      loginVerificationCode: {
        type: database.db.Sequelize.STRING,
        allowNull: true,
      },
      loginVerificationExpires: {
        type: database.db.Sequelize.DATE,
        allowNull: true,
      },
    });
  }
}

module.exports = new UserModel().model;
