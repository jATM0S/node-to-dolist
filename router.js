const express = require("express");
const app = express();

const controller = require("./controller");

const routing = express.Router();

routing
  .route("/")
  .get(controller.getTodo)
  .post(controller.postTodo)
  .patch(controller.updateTodo)
  .detele(controller.deleteTodo);

module.exports(routing);
