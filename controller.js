const fs = require("fs");
const model = require("./model");
const utils = require("./utils");
module.exports.deleteTodos = (req, res) => {
  try {
    
    if (utils.checkTaskExist(req)) {
      const todos = model.removeTodos(req);
      //writing the modified todo after deleting in json file
      fs.writeFileSync("./todo.json", JSON.stringify(todos, null, 2));

      //getting the updated todos
      console.log(todos);
      //sending feedback
      res.status(200).json(todos);
    } else {
      console.log(todos);
      res.status(400).send("number doesnt exist");
    }
  } catch (error) {
    console.log("Error:", error);
    res.status(400).send("error");
  }
};



module.exports.updateTodos = (req, res) => {
  try {
    if (utils.checkTaskExist(req)) {
      const todos = model.changeTodo(req);
      //writing the modified todo after deleting in json file
      fs.writeFileSync("./todo.json", JSON.stringify(todos, null, 2));
      console.log(todos);
      res.status(200).json(todos);
    } else {
      res.status(400).send("id doesn't exists");
    }
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
