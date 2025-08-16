#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 Fixing MongoDB connection for signin/signup...\n');

const envPath = path.join(__dirname, '.env');

// Check if .env exists
if (!fs.existsSync(envPath)) {
  console.error('❌ .env file not found. Please run: node setup-env.js first');
  process.exit(1);
}

// Read current .env content
let envContent = fs.readFileSync(envPath, 'utf8');

console.log('Choose your MongoDB setup option:');
console.log('1. Local MongoDB (Quick - for development)');
console.log('2. MongoDB Atlas (Production-ready)\n');

// For quick fix, let's use local MongoDB
const localMongoUri = 'mongodb://localhost:27017/sportspro';
const jwtSecret = require('crypto').randomBytes(64).toString('hex');

// Update the .env file
envContent = envContent.replace(
  /MONGODB_URI=.*/,
  `MONGODB_URI=${localMongoUri}`
);

envContent = envContent.replace(
  /JWT_SECRET=.*/,
  `JWT_SECRET=${jwtSecret}`
);

// Write the updated content
fs.writeFileSync(envPath, envContent);

console.log('✅ Updated .env file with:');
console.log(`   - MongoDB URI: ${localMongoUri}`);
console.log(`   - JWT Secret: Generated secure random key`);
console.log('\n📝 Next steps:');
console.log('1. Install MongoDB locally: brew install mongodb/brew/mongodb-community');
console.log('2. Start MongoDB: brew services start mongodb/brew/mongodb-community');
console.log('3. Restart your backend server');
console.log('\n🔄 The backend will automatically restart with nodemon');
