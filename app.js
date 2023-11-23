const express = require("express");
const app = express();
const port = 3000;
const router = require("./router");

app.use(express.json());

// routers
app.use("/todos", router);
// const router=express.Router();
// router
//   .route("/todos")
//   .get(getTodos)
//   .post(postTodos)
//   .delete(deleteTodos)
//   .patch(updateTodos);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
