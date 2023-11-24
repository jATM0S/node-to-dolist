const fs = require("fs");
const todos = JSON.parse(fs.readFileSync(`${__dirname}/todo.json`));

module.exports.changeTodo = (req) => {
  const id = req.body.id;
  // getting the taskIDs by creating a funciton that stores the ids in a array in task id
  let taskIDs = Object.keys(todos);

  let taskExist = false;
  for (let i = 1; i < taskIDs.length; i++) {
    if (id == taskIDs[i]) {
      taskExist = true;
    }
  }

  //this checks if task exists then if it exists it changes the task
  if (taskExist) {
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
  return { todos, taskExist };
};
module.exports.removeTodos = (req) => {
  const id = req.body.id;
  //getting the taskIDs by creating a funciton that stores the ids in a array in task id

  const taskIDs = Object.keys(todos);
  console.log(todos);

  let taskExist = false;
  for (let i = 1; i < taskIDs.length; i++) {
    if (id == taskIDs[i]) {
      taskExist = true;
    }
  }

  //this checks if task exists then if it exists it deletes and prints the no of tasks present in the file
  if (taskExist) {
    delete todos[id];
    //shifting the todo to the deleted todo and deleting last todo
    for (let i = id; i <= taskIDs.length; i++) {
      let temp = todos[i + 1];
      todos[i] = temp;
    }
    delete todos[taskIDs.length];
  }
  return { todos, taskExist };
};

module.exports.findTodos = () => {
  return todos;
};

module.exports.putTodos = (req) => {
  //taking the number of value of the todo
  const taskIDs = Object.keys(todos);
  const newId = taskIDs.length + 1;

  //adding todo to the newId
  todos[newId] = req.body;
  return todos;
};
