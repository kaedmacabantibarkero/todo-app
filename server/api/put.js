require('dotenv').config();
const express = require("express")
const router  = express.Router()
const MongoClient = require('mongodb').MongoClient;
const mongoURI = process.env.MONGODB_CONNECT_URI;
const client = new MongoClient(mongoURI);

//updateAccount
router.put('/api/updateAccount', async (req, res) => {
  try {
    await client.connect();
    const db = client.db('Admin_Account');
    const collection = db.collection('account');

    const currentEmail = req.body.currentEmail;
    const newEmail = req.body.newEmail;
    const confirmemail = req.body.confirmemail;
    const currentPassword = req.body.currentPassword;
    const newPass = req.body.newPass;
    const confirmpass = req.body.confirmpass;

    const existingAccount = await collection.findOne({ email: currentEmail });

    if (!existingAccount || existingAccount.password !== currentPassword) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    if (newPass && newPass.trim() !== '') {
      if (newPass === confirmpass) {
        await collection.updateOne(
          { email: currentEmail },
          { $set: { password: newPass } }
        );
      } else {
        return res.status(400).json({ error: 'New password and confirmation do not match' });
      }
    }

    if (newEmail && newEmail.trim() !== '' && confirmemail === newEmail) {
      await collection.updateOne(
        { email: currentEmail },
        { $set: { email: newEmail } }
      );
    }

    res.json({ message: 'Account updated successfully' });
  } catch (error) {
    console.error('Error updating account in MongoDB:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router
  