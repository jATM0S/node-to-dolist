const fs = require("fs");
const todos = JSON.parse(fs.readFileSync(`${__dirname}/todo.json`));
const utils = require("./utils");

module.exports.changeTodo = (req) => {
  const id = req.body.id;
  // getting the taskIDs by creating a funciton that stores the ids in a array in task id
  let taskIDs = utils.taskIDs();


  //this checks if task exists from utils then if it exists it changes the task
  if (utils.checkTaskExist(req)) {
    // let idBody=todos[id];
    let changeBody = req.body.changes;
    console.log(changeBody);
    if (todos[id].task !== changeBody.task) {
      todos[id].task = changeBody.task;
    }
    if (todos[id].description !== changeBody.description) {
      todos[id].description = changeBody.description;
    }
    if (todos[id].completed !== changeBody.completed) {
      todos[id].completed = changeBody.completed;
    }
  }
  return todos;
};
module.exports.removeTodos = (req) => {
  const id = req.body.id;
  //getting the taskIDs from utils creating a funciton that stores the ids in a array in task id

  const taskIDs = utils.taskIDs();

  //checking if task exists from utils If task  exists it deletes and shifts the ids
  if (utils.checkTaskExist(req)) {
    delete todos[id];
    //shifting the todo to the deleted todo and deleting last todo
    for (let i = id; i <= taskIDs.length; i++) {
      let temp = todos[i + 1];
      todos[i] = temp;
    }
    delete todos[taskIDs.length];
  }
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
