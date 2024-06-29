require('dotenv').config(); // Stellen Sie sicher, dass dies ganz oben steht

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const shareRoutes = require('./routes/share');

const app = express();

// Verwenden von cors Middleware
app.use(cors());
app.use(bodyParser.json());

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('MONGO_URI is not defined. Please add it to your .env file.');
  process.exit(1); // Beenden Sie die Anwendung, wenn MONGO_URI nicht definiert ist
}

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB Atlas');
})
.catch(err => {
  console.error('Error connecting to MongoDB Atlas', err);
});

app.use('/api/share', shareRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
 
