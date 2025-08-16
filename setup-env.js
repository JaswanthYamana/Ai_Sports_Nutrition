const fs = require('fs');
const path = require('path');

console.log('🔧 Setting up environment configuration...\n');

// Check if .env already exists
if (fs.existsSync('.env')) {
  console.log('⚠️  .env file already exists!');
  console.log('💡 If you need to update it, please edit it manually or delete it first.\n');
  process.exit(0);
}

// Read the example file
const exampleContent = fs.readFileSync('env.example', 'utf8');

// Create .env file with the example content
fs.writeFileSync('.env', exampleContent);

console.log('✅ Created .env file from env.example');
console.log('\n📝 Next steps:');
console.log('1. Edit the .env file with your actual credentials:');
console.log('   - Replace MONGODB_URI with your MongoDB Atlas connection string');
console.log('   - Replace JWT_SECRET with a secure random string');
console.log('   - Replace EMAIL_USER and EMAIL_PASS with your Gmail credentials');
console.log('\n2. Make sure to fix any typos in MONGODB_URI (should be "mongodb" not "mmongodb")');
console.log('\n3. Restart the backend server after updating the .env file');
console.log('\n🔗 MongoDB Atlas Setup:');
console.log('- Go to https://cloud.mongodb.com');
console.log('- Create a new cluster or use existing one');
console.log('- Get your connection string from "Connect" button');
console.log('- Replace <username>, <password>, and <cluster-url> in the connection string');
console.log('\n📧 Gmail Setup:');
console.log('- Enable 2-factor authentication on your Gmail account');
console.log('- Generate an App Password: https://myaccount.google.com/apppasswords');
console.log('- Use the App Password (not your regular password) in EMAIL_PASS');


