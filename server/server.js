require('dotenv').config();  
const PORT = 3000;
const express = require('express') 
const cors = require('cors')
const app = express()
app.use(express.json()) 
const bodyParser = require('body-parser');

require('dotenv').config()
const jwt = require('jsonwebtoken')
 

const getRoute = require("./api/get")
const putRoute = require("./api/put")
const postRoute = require("./api/post") 
const authRoute = require('./auth');  // Import the auth routes

const corsOptions = {
  origin: '*', 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

const connectDB = require('./connectMongo')
connectDB()

app.use('/', getRoute)
app.use('/', putRoute)
app.use('/', postRoute)
app.use('/', authRoute);  // Use the auth routes under the "/auth" path

 

app.listen(PORT, ()=> console.log("your server is running at port http://localhost:"+PORT))

 