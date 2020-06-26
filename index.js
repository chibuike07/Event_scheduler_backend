const express = require("express");
const mongoose = require("mongoose");

const PORT = 6000;
const MONGODB_URI = "mongodb://localhost:07017(express.server)";
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
