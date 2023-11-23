const express = require("express");
const app = express();
const port = 3000;


app.use(express.json());

// controllers

const router=require ('./routers');
app.use("/todos",router);
// const router =express.Router();
// router.route("/todos")
//   .get(getTodos)
//   .post(postTodos)
//   .patch(updateTodos)
//   .delete(deleteTodos);

app.listen(3000, () => {
  console.log(`Listening on port ${port}`);
});
