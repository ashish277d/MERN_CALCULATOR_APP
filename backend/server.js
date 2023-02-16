const express = require('express');
const mongodb = require('mongodb');
const port = process.env.PORT || 5001;
const connectDB = require('./config/db');
const dotenv = require('dotenv').config();
const colors = require('colors');
const cors = require('cors');
	
const serverless = require('serverless-http')


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

	
module.exports.handler = serverless(app);