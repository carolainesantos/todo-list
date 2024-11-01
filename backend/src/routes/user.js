const express = require("express");
const UserApi = require("../api/user");
const authMiddleware = require("../middleware/auth");

const userRouter = express.Router();

userRouter.post("/login", UserApi.login);
userRouter.post("/verify", UserApi.verify);
userRouter.get("/", authMiddleware, UserApi.findById);
userRouter.post("/", UserApi.createUser);
userRouter.put("/:id", authMiddleware, UserApi.updateUser);
userRouter.delete("/", authMiddleware, UserApi.deleteUser);

module.exports = userRouter;
