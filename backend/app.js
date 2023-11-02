const express = require('express');
const { run } = require('./connect');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); // For parsing form data

mongoose.connect('mongodb+srv://lauraelfving:30lXJEEtUx1lt37B@orders.tugrgb1.mongodb.net/my-web-shop?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Order = require('./models/orders');

// Initialize the Express app
const app = express();
const port = 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the frontend/public directory
app.use(express.static('../frontend/public'));

// Define a route to retrieve orders
app.get('/orders', async (req, res) => {
  try {
    const db = mongoose.connection; // Use the Mongoose connection

    // Query the "orders" collection
    const orders = await db.collection('orders').find().toArray();

    // Send the orders as a JSON response
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Could not fetch the documents' });
  }
});

// Function to calculate product price
function calculateProductPrice(productType) {
  // Define prices for different product types
  const productPrices = {
    takki: 100,  // Replace with actual prices
    liivi: 65,  // Replace with actual prices
  };

  return productPrices[productType] || 0;
}

// Function to calculate fabric price
function calculateFabricPrice(fabric) {
  // Define prices for different fabric types
  const fabricPrices = {
    'pinkit kukat': 10,  // Replace with actual prices
    'värikäs': 15,  // Replace with actual prices
    'keltainen': 12,  // Replace with actual prices
    'oma kangas': 0,  // If user provides their own fabric
  };

  return fabricPrices[fabric] || 0;
}

// Define a route for form submissions
app.post('/submit-order', async (req, res) => {
  try {
    const { productType, fabric, phoneNumber, email } = req.body;

    // Calculate the total price
    const productPrice = calculateProductPrice(productType);
    const fabricPrice = calculateFabricPrice(fabric);
    const shippingCost = 6.90;
    const totalCost = productPrice + fabricPrice + shippingCost;

    // Create a new Order instance and save only the total price to the database
    const newOrder = new Order({
      productType,
      fabric,
      phoneNumber,
      email,
      totalCost,
      date: Date.now(),
    });

    const savedOrder = await newOrder.save();

    // Send an HTML response to the user
    const orderDetails = {
      productType: savedOrder.productType,
      fabric: savedOrder.fabric,
      phoneNumber: savedOrder.phoneNumber,
      email: savedOrder.email,
      totalCost: totalCost,
    };

    // Read the HTML template and replace placeholders with order details
    const fs = require('fs');
    const htmlTemplate = fs.readFileSync('../frontend/public/thankyou.html', 'utf8');
    const formattedHTML = htmlTemplate.replace(/{productType}/g, orderDetails.productType)
      .replace(/{fabric}/g, orderDetails.fabric)
      .replace(/{phoneNumber}/g, orderDetails.phoneNumber)
      .replace(/{email}/g, orderDetails.email)
      .replace(/{totalCost}/g, orderDetails.totalCost);

    res.status(201).send(formattedHTML);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Could not save the order' });
  }
});


// Start the Express server
run().then(() => {
  // Database connection is established
  console.log('Connected to MongoDB Atlas');

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
