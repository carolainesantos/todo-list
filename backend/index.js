const express = require("express");
const userRouter = require("./src/routes/user");
const taskRouter = require("./src/routes/task");
const database = require("./src/config/database");
const cors = require("cors");
const xssClean = require("xss-clean");
const cookieParser = require("cookie-parser");

const app = express();

// Middleware para sanitizar dados de entrada contra XSS
app.use(xssClean());

// Configurar o parsing de cookies para armazenar o token CSRF
app.use(cookieParser());

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE",
  })
);

app.use("/api/v1/user", userRouter);
app.use("/api/v1/task", taskRouter);

database.db
  .sync({ force: false })
  .then((_) => {
    app.listen(3000, () => {
      console.info("Servidor rodando na porta 3000");
    });
  })
  .catch((e) => {
    console.error("Erro ao conectar com o banco: ", e);
  });
