const fs = require("fs");
const todos = JSON.parse(fs.readFileSync(`${__dirname}/todo.json`));
module.exports.taskIDs =()=>{
    return Object.keys(todos);
} 
    
// const checkTaskExist = (req) => {
//     const id = req.body.id;
//     const ids = taskIDs(); // Call the function to get the IDs
  
//     let taskExist = false;
//     for (let i = 1; i < ids.length; i++) {
//       if (id == ids[i]) {
//         taskExist = true;
//         break;
//       }
//     }
//     return taskExist;
//   };
  

// module.exports.taskIDs()