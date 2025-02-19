const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');

dotenv.config(); // Load environment variables from .env file into process.env

const db_username = process.env.DB_USERNAME;
const db_password = process.env.DB_PASSWORD;

// Connect to MongoDB Atlas
mongoose.connect(`mongodb+srv://${db_username}:${db_password}@tutorial.wklsj.mongodb.net/oc_tuto_node?retryWrites=true&w=majority&appName=tutorial`)
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

// Express will take every request that has a application/json Content-Type and put their body in a req.body property
app.use(express.json());

// Tutorial project, let's keep it simple
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use('/api/stuff', stuffRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;