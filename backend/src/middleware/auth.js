const jwt = require("jsonwebtoken");
const user = require("../controller/user");

function generateVerificationCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function authMiddleware(req, res, next) {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(400).json({ mensagem: "Token não fornecido" });
  }

  jwt.verify(token, "exemplo", async (err, decoded) => {
    if (err) {
      return res.status(401).json({ mensagem: "Token inválido" });
    }

    const userLogged = await user.verifyUser(decoded.id);
    if (!userLogged) {
      return res.status(401).json({ mensagem: "Token inválido" });
    }

    req.session = decoded;

    next();
  });
}

module.exports = authMiddleware;
