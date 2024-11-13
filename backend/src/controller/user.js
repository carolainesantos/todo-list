const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserModel = require("../model/user");
const sendMfa = require("../commom/nodemailer");
const randomCode = require("../commom/random-code");
require("dotenv").config();

const SECRET_KEY = process.env.JWT_SECRET;
const SALT_VALUE = process.env.JWT_SALT;

class UserController {
  async findById(id) {
    if (id === undefined) {
      throw new Error("Id obrigatório!");
    }

    const userValue = await UserModel.findByPk(id);

    if (!userValue) {
      throw new Error("Usuário não encontrado.");
    }
    return userValue;
  }
  async verifyUser(id) {
    return UserModel.findOne({ where: { id } });
  }

  async create(name, email, password) {
    if (!name || !email || !password) {
      throw new Error("Nome, email e senha são obrigatórios.");
    }

    const regexEmail = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b/g;
    if (!regexEmail.test(email)) {
      throw new Error("Email inválido.");
    }

    const cypherSenha = await bcrypt.hash(String(password), SALT_VALUE);

    const userValue = await UserModel.create({
      name,
      email,
      password: cypherSenha,
    });
    return userValue;
  }

  async update(id, name, email, password) {
    const oldUser = await UserModel.findByPk(id);
    if (email) {
      const sameEmail = await UserModel.findOne({ where: { email } });
      if (sameEmail && sameEmail.id !== id) {
        throw new Error("Email ja cadastrado");
      }
    }
    oldUser.name = name || oldUser.name;
    oldUser.email = email || oldUser.email;
    oldUser.password = password
      ? await bcrypt.hash(String(password), SALT_VALUE)
      : oldUser.password;
    oldUser.save();

    return oldUser;
  }

  async delete(id) {
    const userValue = await this.findById(id);
    userValue.destroy();
    return;
  }

  async login(email, password) {
    if (email === undefined || password === undefined) {
      throw new Error("Email e senha são obrigatórios.");
    }

    const userValue = await UserModel.findOne({ where: { email } });
    if (!userValue) {
      throw new Error("Usuário ou senha inválido.");
    }

    const senhaValida = await bcrypt.compare(
      String(password),
      userValue.password
    );
    if (!senhaValida) {
      throw new Error("Usuário ou senha inválido.");
    }
    const code = randomCode();

    // define a data de expiração para o código
    const expires = new Date();
    expires.setMinutes(expires.getMinutes() + 10);

    await UserModel.update(
      {
        loginVerificationCode: code,
        loginVerificationExpires: expires,
      },
      { where: { id: userValue.id } }
    );

    // salvar o cód randomico no banco e enviar pro usuario
    sendMfa(email, code);

    return;
  }

  async verify(email, password, userSendCode) {
    if (
      email === undefined ||
      password === undefined ||
      userSendCode === undefined
    ) {
      throw new Error("Email e senha são obrigatórios.");
    }

    const userValue = await UserModel.findOne({ where: { email } });
    if (!userValue) {
      throw new Error("Código Inválido.");
    }

    const senhaValida = await bcrypt.compare(
      String(password),
      userValue.password
    );
    if (!senhaValida) {
      throw new Error("Código Inválido.");
    }

    const now = new Date();
    if (
      userSendCode !== userValue.loginVerificationCode ||
      now > userValue.loginVerificationExpires
    ) {
      throw new Error("Código Inválido ou expirado.");
    }

    if (userSendCode === userValue.loginVerificationCode) {
      return jwt.sign({ id: userValue.id }, SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRATION,
      });
    }
    throw new Error("Código Inválido.");
  }
}

module.exports = new UserController();
