const TaskController = require("../controller/task");

class TaskApi {
  async findTask(req, res) {
    try {
      const userId = req.session.id;
      const tasks = await TaskController.findAll(userId);

      res.send({ tasks });
    } catch (e) {
      console.log(e);
      res.status(400).send("Get Deu erro");
    }
  }

  async findTaskById(req, res) {
    try {
      const userId = req.session.id;
      const id = req.params.id;
      const task = await TaskController.findTaskById(userId, id);

      res.send({ task });
    } catch (e) {
      console.log(e);
      res.status(400).send("Get Deu erro");
    }
  }

  async createTask(req, res) {
    try {
      const userId = req.session.id;
      const { description } = req.body;
      const task = await TaskController.create(userId, description);
      return res.status(201).send(task);
    } catch (e) {
      return res
        .status(400)
        .send({ error: `Erro ao criar tarefa ${e.message}` });
    }
  }

  async updateTask(req, res) {
    try {
      const userId = req.session.id;
      const id = req.params.id;
      const { description } = req.body;
      const task = await TaskController.update(userId, id, description);
      return res.status(200).send(task);
    } catch (e) {
      console.log("e");
      res.status(400).send("Update Deu erro");
    }
  }

  async deleteTask(req, res) {
    try {
      const userId = req.session.id;
      const id = req.params.id;
      await TaskController.delete(userId, id);
      return res.status(204).send();
    } catch (e) {
      console.log(e);
      res.status(400).send("Delete Deu erro");
    }
  }
}

module.exports = new TaskApi();
