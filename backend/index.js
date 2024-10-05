const express = require("express");
const userRouter = require("./src/routes/user");
const taskRouter = require("./src/routes/task");
const database = require("./src/config/database");
const cors = require("cors");

const app = express();
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
      console.log("Servidor rodando na porta 3000");
    });
  })
  .catch((e) => {
    console.log("Erro ao conectar com o banco: ", e);
  });
