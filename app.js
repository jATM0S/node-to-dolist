const express = require("express");
const app = express();

app.use("/todo/", router);

app.listen(3000);
