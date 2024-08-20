require('dotenv').config(); 
const express = require("express")
const router  = express.Router()
const MongoClient = require('mongodb').MongoClient;
const mongoURI = process.env.MONGODB_CONNECT_URI;
const client = new MongoClient(mongoURI);
 
router.get('/api/getAllSessions', async (req, res) => {
    try {
      const db = client.db('Analytics');
      const collection = db.collection('session');
      
      const documents = await collection.find({}).toArray();
  
      res.json(documents);
    } catch (error) {
      console.error('Error fetching documents:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router