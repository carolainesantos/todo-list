const database = require("../config/database");
const user = require("./user");

class TaskModel {
  constructor() {
    this.model = database.db.define("tasks", {
      id: {
        type: database.db.Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      description: {
        type: database.db.Sequelize.STRING,
        allowNull: false,
      },
      userId: {
        type: database.db.Sequelize.INTEGER,
        foreignKey: true,
        references: {
          model: user,
          key: "id",
        },
      },
    });
  }
}

module.exports = new TaskModel().model;
