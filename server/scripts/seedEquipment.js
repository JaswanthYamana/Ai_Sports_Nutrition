const mongoose = require('mongoose');
const Equipment = require('../models/Equipment');
require('dotenv').config();

const sampleEquipment = [
  {
    name: "Nike Air Zoom Pegasus 40",
    brand: "Nike",
    category: "Running Shoes",
    sport: "Running",
    price: 130,
    originalPrice: 150,
    rating: 4.5,
    reviewCount: 1247,
    description: "Responsive cushioning in the Pegasus provides an energized ride for everyday road running.",
    features: ["Zoom Air unit", "Engineered mesh upper", "Waffle outsole"],
    images: ["/images/nike-pegasus.jpg"],
    inStock: true,
    stockQuantity: 50,
    reviews: [],
    isActive: true
  },
  {
    name: "Adidas Ultraboost 22",
    brand: "Adidas",
    category: "Running Shoes",
    sport: "Running",
    price: 180,
    originalPrice: 200,
    rating: 4.7,
    reviewCount: 892,
    description: "Energy-returning cushioning and a flexible outsole for confident strides.",
    features: ["BOOST midsole", "Primeknit upper", "Continental rubber outsole"],
    images: ["/images/adidas-ultraboost.jpg"],
    inStock: true,
    stockQuantity: 30,
    reviews: [],
    isActive: true
  },
  {
    name: "Wilson Pro Staff RF97 Autograph",
    brand: "Wilson",
    category: "Tennis Racket",
    sport: "Tennis",
    price: 249,
    originalPrice: 279,
    rating: 4.6,
    reviewCount: 324,
    description: "Roger Federer's racket of choice, offering precision and control.",
    features: ["97 sq in head size", "340g weight", "16x19 string pattern"],
    images: ["/images/wilson-prostaff.jpg"],
    inStock: true,
    stockQuantity: 15,
    reviews: [],
    isActive: true
  },
  {
    name: "Spalding NBA Official Basketball",
    brand: "Spalding",
    category: "Basketball",
    sport: "Basketball",
    price: 59,
    originalPrice: 69,
    rating: 4.4,
    reviewCount: 567,
    description: "Official NBA game ball with superior grip and durability.",
    features: ["Full-grain leather", "Official size and weight", "Deep channel design"],
    images: ["/images/spalding-basketball.jpg"],
    inStock: true,
    stockQuantity: 100,
    reviews: [],
    isActive: true
  },
  {
    name: "Bowflex SelectTech 552 Dumbbells",
    brand: "Bowflex",
    category: "Weights",
    sport: "Gym",
    price: 349,
    originalPrice: 399,
    rating: 4.3,
    reviewCount: 1156,
    description: "Adjustable dumbbells that replace 15 sets of weights.",
    features: ["5-52.5 lbs per dumbbell", "Space-saving design", "Quick weight changes"],
    images: ["/images/bowflex-dumbbells.jpg"],
    inStock: true,
    stockQuantity: 25,
    reviews: [],
    isActive: true
  },
  {
    name: "Speedo Endurance+ Swimsuit",
    brand: "Speedo",
    category: "Swimwear",
    sport: "Swimming",
    price: 89,
    originalPrice: 109,
    rating: 4.2,
    reviewCount: 234,
    description: "Chlorine-resistant swimsuit designed for training and competition.",
    features: ["Endurance+ fabric", "Chlorine resistant", "4-way stretch"],
    images: ["/images/speedo-swimsuit.jpg"],
    inStock: true,
    stockQuantity: 40,
    reviews: [],
    isActive: true
  },
  {
    name: "Trek Domane AL 2",
    brand: "Trek",
    category: "Road Bike",
    sport: "Cycling",
    price: 899,
    originalPrice: 999,
    rating: 4.5,
    reviewCount: 89,
    description: "Endurance road bike with comfort-focused geometry.",
    features: ["Alpha Aluminum frame", "Carbon fork", "Shimano Claris drivetrain"],
    images: ["/images/trek-domane.jpg"],
    inStock: true,
    stockQuantity: 8,
    reviews: [],
    isActive: true
  },
  {
    name: "Everlast Pro Style Training Gloves",
    brand: "Everlast",
    category: "Boxing Gloves",
    sport: "Boxing",
    price: 39,
    originalPrice: 49,
    rating: 4.1,
    reviewCount: 445,
    description: "Professional-style training gloves with superior protection.",
    features: ["Synthetic leather", "Full thumb enclosure", "Hook and loop closure"],
    images: ["/images/everlast-gloves.jpg"],
    inStock: true,
    stockQuantity: 60,
    reviews: [],
    isActive: true
  }
];

async function seedEquipment() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing equipment
    await Equipment.deleteMany({});
    console.log('Cleared existing equipment data');

    // Insert sample equipment
    await Equipment.insertMany(sampleEquipment);
    console.log(`Inserted ${sampleEquipment.length} equipment items`);

    console.log('Equipment seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding equipment:', error);
    process.exit(1);
  }
}

seedEquipment();
