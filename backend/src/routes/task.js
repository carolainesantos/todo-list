const express = require("express");
const TaskApi = require("../api/task");
const authMiddleware = require("../middleware/auth");

const taskRouter = express.Router();

taskRouter.get("/", authMiddleware, TaskApi.findTask);
taskRouter.get("/:id", authMiddleware, TaskApi.findTaskById);
taskRouter.post("/", authMiddleware, TaskApi.createTask);
taskRouter.put("/:id", authMiddleware, TaskApi.updateTask);
taskRouter.delete("/:id", authMiddleware, TaskApi.deleteTask);

module.exports = taskRouter;
