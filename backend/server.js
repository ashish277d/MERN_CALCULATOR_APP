const express = require('express');
const mongodb = require('mongodb');
const port = process.env.PORT || 5001;
const connectDB = require('./config/db');
const dotenv = require('dotenv').config();
const colors = require('colors');
const cors = require('cors');


const app = express();

connectDB();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/operation', require('./routes/operationRoutes'));
app.use('/api/records', require('./routes/recordsRoutes'));

  // Start the server
app.listen(port, () => console.log(`Server started on port ${port}`));









// Connect to MongoDB
// mongodb.connect('mongodb://localhost:27017/calculator_db', { useNewUrlParser: true }, (err, client) => {
//   if (err) {
//     console.error(err);
//     return;
//   }

//   const db = client.db('calculator_db');
//   const usersCollection = db.collection('users');
//   const operationsCollection = db.collection('operations');
//   const recordsCollection = db.collection('records');

//   // User authentication and authorization
//   app.post('/signup', (req, res) => {
//     // Implement the user sign up logic
//   });

//   app.post('/login', (req, res) => {
//     // Implement the user login logic
//   });

//   // REST APIs for calculator functionalities
//   app.post('/addition', (req, res) => {
//     // Implement the addition operation logic
//   });

//   app.post('/subtraction', (req, res) => {
//     // Implement the subtraction operation logic
//   });

//   // Similar implementation for multiplication, division, square root, and random string generation


// });
