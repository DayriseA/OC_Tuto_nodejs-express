const express = require('express');

const app = express();

app.use((req, res, next) => {
  console.log("Request received!");
  next();
});

app.use((req, res, next) => {
  res.status(201);
  next();
});

app.use((req, res, next) => {
  res.json({ message: "Your request was successful!" });
  next();
});

app.use((req, res) => {
  console.log("Answer sent with success!");
});


module.exports = app;