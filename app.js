const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables from .env file into process.env

const db_username = process.env.DB_USERNAME;
const db_password = process.env.DB_PASSWORD;

// Connect to MongoDB Atlas
mongoose.connect(`mongodb+srv://${db_username}:${db_password}@tutorial.wklsj.mongodb.net/?retryWrites=true&w=majority&appName=tutorial`)
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

app.get('/api/stuff', (req, res, next) => {
  const stuff = [
    {
      _id: 'oeihfzeoi',
      title: 'Mon premier objet',
      description: 'Les infos de mon premier objet',
      imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
      price: 4900,
      userId: 'qsomihvqios',
    },
    {
      _id: 'oeihfzeomoihi',
      title: 'Mon deuxième objet',
      description: 'Les infos de mon deuxième objet',
      imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
      price: 2900,
      userId: 'qsomihvqios',
    },
  ];
  res.status(200).json(stuff);
});

app.post('/api/stuff', (req, res, next) => {
  // For now as we don't have a database, we will just log the request body and send a response
  console.log(req.body);
  res.status(201).json({
    message: 'Object created!'
  });
});

module.exports = app;