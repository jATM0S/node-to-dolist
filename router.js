const express = require("express");
const app = express(); 

const routing=express.Router();
routing.route('/')
.get()
.post()
.patch()
.detele()

module.exports(routing);