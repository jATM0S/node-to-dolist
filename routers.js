const express = require("express");
const controller=require('./controller')
const router = express.Router();


router
  .route("/")
  .get(controller.getTodos)
  .post(controller.postTodos)
  .patch(controller.updateTodos)
  .delete(controller.deleteTodos);

module.exports = router;
