const fs = require("fs");
let todos = JSON.parse(fs.readFileSync(`${__dirname}/todo.json`));
const utils = require("./utils");

module.exports.removeTodos = (req) => {
  //after checking if task exists in the controller using utils then deleteTodo is called which deletes the task and shifts the ids
  todos = utils.deleteTodo(req);

  return todos;
};

module.exports.changeTodo = (req) => {
  //after checking if task exist in the controller using utils then updateTodo is called which changes the task to get todo after updating
  todos = utils.updateTodo(req);
  return todos;
};

module.exports.findTodos = () => {
  return todos;
};

module.exports.putTodos = (req) => {
  //taking the number of value of the todo
  const taskIDs = utils.taskIDs();
  const newId = taskIDs.length + 1;

  //adding todo to the newId
  todos[newId] = req.body;
  return todos;
};
