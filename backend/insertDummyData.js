const mongoose = require('mongoose');
const Item = require('./models/itemModel'); // Path to your itemModel.js

// Dummy data
const dummyData = [
  {
    title: "EGL Kit",
    price: 450,
    description: "Great condition, 128GB, space gray",
    category: "Stationary",
    images: ["https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRXjxvcitihitkFcWDKqug4QLngJerakMav75LHVvi5XxHCaMBIuz6KslxeMz_ttotKV7KDa9FkRKtIAkQit6H4P860KtVEIIAP0uPPUbX_S027xmgHvjH8Yg"],
    location: "New York, NY",
    ownerUsername: "john_doe",
    ownerPhone: "123-456-7890",
    yearsUsed: 2
  },
  {
    title: "Vintage Leather Sofa",
    price: 300,
    description: "Comfortable and stylish, minor wear",
    category: "Furniture",
    images: ["https://via.placeholder.com/150"],
    location: "Los Angeles, CA",
    ownerUsername: "jane_smith",
    ownerPhone: "098-765-4321",
    yearsUsed: 5
  },
  {
    title: "Designer Handbag",
    price: 800,
    description: "Hardly used, authentic Gucci bag",
    category: "Clothing",
    images: ["https://via.placeholder.com/150"],
    location: "Chicago, IL",
    ownerUsername: "alice_johnson",
    ownerPhone: "555-987-6543",
    yearsUsed: 1
  }
];

// Connect to MongoDB
mongoose.connect('mongodb+srv://utkarshraj2168:kdA0peXsryCjhgYv@teamname.1fn0l.mongodb.net/?retryWrites=true&w=majority&appName=TeamName', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected');
  // Insert dummy data
  return Item.insertMany(dummyData);
})
.then(() => {
  console.log('Dummy data inserted successfully');
  mongoose.connection.close();
})
.catch((err) => {
  console.error('Error inserting dummy data:', err);
  mongoose.connection.close();
});