const axios = require('axios')
const User = require('../models/userModel')
const RecordModel = require('../models/recordModel')
const mongoose = require('mongoose');


async function generateRandomString() {
  const url = process.env.RANDOM_API_URL;

  var data = JSON.stringify({
    "jsonrpc": "2.0",
    "method": "generateStrings",
    "params": {
      "apiKey": process.env.RANDOM_API_KEY,
      "n": 2,
      "length": 10,
      "characters": "abcdefghijklmnopqrstuvwxyz0123456789"
    },
    "id": 1
  });

  var config = {
    method: 'post',
    url: url,
    headers: {
      'Content-Type': 'application/json',
    },
    data: data
  };
  // Make API call 
  try {
    const response = await axios(config);
    const obj = JSON.parse(JSON.stringify(response.data));
    console.log(obj.result.random.data[0]);
    return obj.result.random.data[0];
  } catch (error) {
    console.log(error);
  }
}

async function saveData(user,operation,userData,result){
  const newBalance = userData.balance - operation.cost;
  const updatedUser = await User.updateOne({ _id: user._id }, { $set: { balance: newBalance } });
  // Save the operation record in the records collection
  const record = await RecordModel.create( {
      operation_id:  mongoose.Types.ObjectId(operation.id),
      user_id:  mongoose.Types.ObjectId(user.id),
      amount: 1,
      user_balance: newBalance,
      operation_response: result,
      date: new Date()
  });  
  return record;

}

module.exports = { generateRandomString, saveData }