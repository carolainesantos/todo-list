const TaskModel = require("../model/task");

class TaskController {
  async findAll(userId) {
    if (!userId) {
      throw new Error("UserId obrigatório!");
    }

    const taskValue = await TaskModel.findAll({
      where: { userId },
    });

    return taskValue;
  }

  async findTaskById(userId, id) {
    if (!userId) {
      throw new Error("UserId obrigatório!");
    } else if (!id) {
      throw new Error("Id obrigatório!");
    }

    const taskValue = await TaskModel.findOne({
      where: { id, userId },
    });

    if (!taskValue) {
      throw new Error("Tarefa não encontrada.");
    }
    return taskValue;
  }

  async create(userId, description) {
    if (!userId || !description) {
      throw new Error("Campos obrigatórios não preenchidos.");
    }

    return TaskModel.create({
      userId,
      description,
    });
  }

  async update(userId, id, description) {
    const oldTask = await this.findTaskById(userId, id);

    oldTask.description = description || oldTask.description;
    oldTask.save();
    return oldTask;
  }

  async delete(userId, id) {
    if (!id) {
      throw new Error("Id é obrigatório");
    }

    const taskValue = await this.findTaskById(userId, id);
    taskValue.destroy();
    return;
  }
}

module.exports = new TaskController();
