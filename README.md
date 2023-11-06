# Hurmaava-Shop BETA

Welcome to the beta version of our web shop app! To get started, please follow these instructions:


## Prerequisites

1. **Node Modules**: Make sure you have Node.js and npm (Node Package Manager) installed on your system. You can download them from [Node.js](https://nodejs.org/).

## Installation

1. **Clone this repository to your local machine**

git clone https://github.com/bereniikke/Hurmaava-Shop


3. **Navigate to the project's directory**


4. **Install required Node module:**

npm install



## Database Configuration

1. **Create a file named `env.js` in the root directory of your project.**

2. **Inside `env.js`, add your MongoDB database configuration as follows:**

```javascript
module.exports = {
  MONGODB_URI: "your-mongodb-uri-here"
};
```

Replace "your-mongodb-uri-here" with your actual MongoDB connection string.

## Start the application

Once you have installed the required Node modules and configured your database, you can start the application with the following command:

npm start

Your web shop app should now be running locally. Access it by opening a web browser and navigating to:

http://localhost:3000


If you have any questions or feedback regarding the web shop app, please feel free to contact us. We appreciate your input!
