const fs = require("fs");
const model = require("./model");
module.exports.deleteTodos = (req, res) => {
  try {
    // const todos = JSON.parse(fs.readFileSync(`${__dirname}/todo.json`));
    const todos = model.removeTodo(req);
    //writing the modified todo after deleting in json file
    fs.writeFileSync("./todo.json", JSON.stringify(todos, null, 2));

    //getting the updated todos
    // getTaskIds();
    console.log(todos);
    //sending feedback
    res.status(200).json(todos);

    //  else {
    //   console.log(todos);
    //   res.status(400).send("number doesnt exist");
    // }
  } catch (error) {
    console.log("Error:", error);
    res.status(400).send("error");
  }
};

module.exports.getTodos = (req, res) => {
  try {
    todos = model.findTodos();
    console.log(todos);
    res.status(200).json(todos);
  } catch (error) {
    console.log("Error:", error);
    res.status(400).send("Error Occured");
  }
};
module.exports.postTodos = (req, res) => {
  try {
    const todos = model.putTodos(req); // Pass req object here

    //stringifying the to-be-added todo then writing the whole todo to JSON
    fs.writeFileSync("./todo.json", JSON.stringify(todos, null, 2));

    console.log(todos);
    res.status(200).json(todos); // Use json() instead of JSON()
  } catch (error) {
    console.error("Error:", error);
    res.status(400).send("Error occurred");
  }
};

module.exports.updateTodos = (req, res) => {
  try {
    const todos = JSON.parse(fs.readFileSync(`${__dirname}/todo.json`));

    const id = req.body.id;
    // getting the taskIDs by creating a funciton that stores the ids in a array in task id
    let taskIDs = [];
    const getTaskIds = () => {
      taskIDs = Object.keys(todos);
    };

    getTaskIds();
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

      //writing the modified todo after deleting in json file
      const updateTodo = JSON.stringify(todos, null, 2);
      fs.writeFileSync("./todo.json", updateTodo);
      console.log(todos);
      res.status(200).send(`sucessfully updated todo ${id}`);
    } else {
      res.status(400).send("error");
    }
  } catch {
    res.status(400).send("error");
  }
};


