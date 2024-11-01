const UserController = require("../controller/user");

class UserApi {
  async findById(req, res) {
    try {
      const id = req.session.id;
      const user = await UserController.findById(id);

      res.send({ user });
    } catch (e) {
      console.error(e);
      res.status(400).send("Erro ao encontrar usuário");
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
        .send({ error: `Erro ao criar usuário: ${e.message}` });
    }
  }

  async updateUser(req, res) {
    try {
      const id = req.session.id;
      const { name, email, password } = req.body;
      const user = await UserController.update(id, name, email, password);
      return res.status(200).send(user);
    } catch (e) {
      console.error(e);
      res.status(400).send("Erro ao fazer update");
    }
  }

  async deleteUser(req, res) {
    try {
      const id = req.session.id;
      await UserController.delete(id);
      return res.status(204).send();
    } catch (e) {
      console.error(e);
      res.status(400).send("Erro ao deletar");
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      await UserController.login(email, password);
      return res.status(201).send({ msg: "Código enviado para o seu email" });
    } catch (e) {
      return res.status(400).send({ error: `Erro: ${e.message}` });
    }
  }

  async verify(req, res) {
    try {
      const { email, password, code } = req.body;
      const token = await UserController.verify(email, password, code);
      return res.status(201).send({ token });
    } catch (e) {
      return res.status(400).send({ error: `Erro: ${e.message}` });
    }
  }
}

module.exports = new UserApi();
