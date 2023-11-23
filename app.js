const express = require("express");
const fs = require("fs");
const app = express();
const port = 3000;

const todos = JSON.parse(fs.readFileSync(`${__dirname}/todo.json`));

app.use(express.json());

app.get("/", (req, res) => {
  try {
    console.log(todos);
    res.status(200).json(todos);
  } catch {
    res.status(400).send("error");
  }
});

app.post("/", (req, res) => {
  try {
    //taking the number of value of the todo
    const taskIDs = Object.keys(todos);
    const newId = taskIDs.length + 1;

    //adding todo to the newId
    todos[newId] = req.body;

    //stringfying the tobe added todo then writing the whole todo to json so that the todo added to "todos" is also added
    const addTodo = JSON.stringify(todos, null, 2);
    fs.writeFileSync("./todo.json", addTodo);
    console.log(todos);
    res.status(200).send("success");
  } catch {
    res.status(400).send("error");
  }
});

app.delete("/", (req, res) => {
  try {
    const id = req.body.id;
    //getting the taskIDs by creating a funciton that stores the ids in a array in task id
    let taskIDs = [];
    const getTaskIds = () => {
      taskIDs = Object.keys(todos);
    };

    getTaskIds();
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
        let temp = todos[i+1];
        todos[i]=temp;
      }
      delete todos[taskIDs.length];
      //writing the modified todo after deleting in json file
      const deleteTodo = JSON.stringify(todos, null, 2);
      fs.writeFileSync("./todo.json", deleteTodo);

      //getting the updated todos
      getTaskIds();
      console.log(todos);
      //sending feedback 
      res.status(200).send(`Deleted todo no ${id}`);
    } else {
      console.log(todos);
      res.status(400).send("number doesnt exist");
    }
  } catch {
    res.status(400).send("error");
  }
});

app.patch("/", (req, res) => {
  try {
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
});


app.listen(3000, () => {
  console.log(`Listening on port ${port}`);
});
