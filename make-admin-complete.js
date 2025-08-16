const mongoose = require('mongoose');
require('dotenv').config();

async function makeAdminComplete() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Import User model
    const User = require('./server/models/User');

    // Find the complete test user
    const user = await User.findOne({ email: 'complete@example.com' });
    
    if (!user) {
      console.log('❌ User not found');
      return;
    }

    console.log(`👤 Found user: ${user.name} (${user.email})`);
    console.log(`📊 Current role: ${user.role}`);

    // Make user admin
    user.role = 'admin';
    await user.save();

    console.log('✅ Successfully made user an admin!');
    console.log('👑 Complete Test User is now an admin user');

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

makeAdminComplete();


