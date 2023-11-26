const fs = require("fs");
const todos = JSON.parse(fs.readFileSync(`${__dirname}/todo.json`));
const taskIDs = () => {
  return Object.keys(todos);
};

const checkTaskExist = (req) => {
  const id =req.body.id;
  const IDs=taskIDs();
  let taskExist = false;
  for (let i = 1; i < IDs.length; i++) {
    if (id == IDs[i]) {
      taskExist = true;
    }
  }
  return taskExist;
};
module.exports={
taskIDs,checkTaskExist
}
