const fs = require("fs");
const todos = JSON.parse(fs.readFileSync(`${__dirname}/todo.json`));
const taskIDs = () => {
  return Object.keys(todos);
};
//this checks if the task send in request exists or not
const checkTaskExist = (req) => {
  const id = req.body.id;
  const IDs = taskIDs();
  let taskExist = false;
  for (let i = 1; i < IDs.length; i++) {
    if (id == IDs[i]) {
      taskExist = true;
      break;
    }
  }
  return taskExist;
};
//this updates the task with the request that is send
const updateTodo = (req) => {
  const id = req.body.id;

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
  return todos;
};

const deleteTodo = (req) => {
  const id = req.body.id;

  //getting the taskIDs from utils and stores the ids in an array in IDs so it can be used in shifting the task id
  const IDs = taskIDs();

  delete todos[id];
  //shifting the todo to the deleted todo and deleting last todo
  for (let i = id; i <= IDs.length; i++) {
    let temp = todos[i + 1];
    todos[i] = temp;
  }
  delete todos[IDs.length];
  return todos;
};


module.exports = {
  taskIDs,
  checkTaskExist,
  updateTodo,
  deleteTodo,
};
