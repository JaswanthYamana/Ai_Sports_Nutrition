const mongoose = require('mongoose');
require('dotenv').config();

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// User model
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: {
    type: String,
    enum: ['user', 'admin', 'moderator'],
    default: 'user'
  }
});

const User = mongoose.model('User', userSchema);

async function makeFirstUserAdmin() {
  try {
    // Find the first user
    const firstUser = await User.findOne().sort({ createdAt: 1 });
    
    if (!firstUser) {
      console.log('❌ No users found in the database');
      return;
    }

    console.log(`👤 Found user: ${firstUser.name} (${firstUser.email})`);
    console.log(`📊 Current role: ${firstUser.role}`);

    if (firstUser.role === 'admin') {
      console.log('✅ User is already an admin');
      return;
    }

    // Update user to admin
    firstUser.role = 'admin';
    await firstUser.save();

    console.log('✅ Successfully made user an admin!');
    console.log(`👑 ${firstUser.name} is now an admin user`);

  } catch (error) {
    console.error('❌ Error making user admin:', error);
  } finally {
    mongoose.connection.close();
  }
}

// Run the script
makeFirstUserAdmin(); 