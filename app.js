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
    const newId = taskIDs.length+1;
    
    //adding todo to the newId
    todos[newId]=req.body;

    //stringfying the tobe added todo then writing the whole todo to json so that the todo added to "todos" is also added
    const addTodo= JSON.stringify(todos, null, 2);
    fs.writeFileSync('./todo.json',addTodo);
    console.log(todos[newId]);
    res.status(200).send("success");
  } catch {
    res.status(400).send("error");
  }
});

app.delete("/",(req,res)=>{
try{
  const id=req.body.id;
  //getting the taskIDs by creating a funciton that stores the ids in a array in task id 
  let taskIDs=[];
  const getTaskIds =()=>{
    taskIDs=Object.keys(todos);
  }
  getTaskIds();
  console.log(taskIDs);

  let taskExist=false;
  for (let i = 1; i < taskIDs.length; i++) {
    if(id==taskIDs[i]){
      taskExist=true;
    }
}

//this checks if task exists then if it exists it deletes and prints the no of tasks present in the file
if (taskExist) {
  delete todos[id];
  const deleteTodo= JSON.stringify(todos, null, 2);
  fs.writeFileSync('./todo.json',deleteTodo);
  getTaskIds();
  console.log(todos);
  console.log(taskIDs);
  res.status(200).send(`Deleted todo no ${id}`);
}else{
res.status(400).send("number doesnt exist");
}

}catch{
  res.status(400).send("error");
}
})

app.listen(3000, () => {
  console.log(`Listening on port ${port}`);
});
