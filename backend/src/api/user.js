const UserController = require("../controller/user");

class UserApi {
  async findById(req, res) {
    try {
      const id = req.session.id;
      const user = await UserController.findById(id);

      res.send({ user });
    } catch (e) {
      console.log(e);
      res.status(400).send("Get Deu erro");
    }
  }

  async createUser(req, res) {
    try {
      const { name, email, password } = req.body;
      const user = await UserController.create(name, email, password);
      return res.status(201).send(user);
    } catch (e) {
      return res
        .status(400)
        .send({ error: `Erro ao criar usuário ${e.message}` });
    }
  }

  async updateUser(req, res) {
    try {
      const id = req.session.id;
      const { name, email, password } = req.body;
      const user = await UserController.update(id, name, email, password);
      return res.status(200).send(user);
    } catch (e) {
      console.log(e);
      res.status(400).send("Update Deu erro");
    }
  }

  async deleteUser(req, res) {
    try {
      const id = req.session.id;
      await UserController.delete(id);
      return res.status(204).send();
    } catch (e) {
      console.log(e);
      res.status(400).send("Delete Deu erro");
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const token = await UserController.login(email, password);
      return res.status(201).send(token);
    } catch (e) {
      return res
        .status(400)
        .send({ error: `Erro ao criar usuário ${e.message}` });
    }
  }
}

module.exports = new UserApi();
