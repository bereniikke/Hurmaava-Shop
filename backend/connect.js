const { MongoClient } = require('mongodb');

const url = "mongodb+srv://lauraelfving:30lXJEEtUx1lt37B@orders.tugrgb1.mongodb.net/?retryWrites=true&w=majority";

async function run() {
  const client = new MongoClient(url);
  
  try {
    await client.connect();
    console.log("Successfully connected to Atlas");
  } catch (err) {
    console.log(err.stack);
  }

  return client; // Return the MongoDB client instance
}

module.exports = { run };
