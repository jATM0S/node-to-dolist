const express = require("express");
const app = express();
const port = 3000;


app.use(express.json());


const router=require ('./routers');
app.use("/todos",router);

app.listen(3000, () => {
  console.log(`Listening on port ${port}`);
});
