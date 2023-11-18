const express = require("express");

const app = express();

const router = require("./router");
app.use("/todo/", router);

module.exports=app;