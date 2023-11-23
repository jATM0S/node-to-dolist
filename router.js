const express=require("express");
const controller=require('./controllers');

const router=express.Router();
router
  .route("/")
  .get(controller.getTodos)
  .post(controller.postTodos)
  .delete(controller.deleteTodos)
  .patch(controller.updateTodos);

  module.exports =router; 