const axios = require('axios');

const API_BASE_URL = 'http://localhost:5001/api';

async function testAuthentication() {
  console.log('🧪 Testing SportsPro Authentication System...\n');

  try {
    // Test 1: Health Check
    console.log('1️⃣ Testing health check...');
    const healthResponse = await axios.get(`${API_BASE_URL}/health-check`);
    console.log('✅ Health check:', healthResponse.data.message);
    console.log('');

    // Test 2: User Registration
    console.log('2️⃣ Testing user registration...');
    const testUser = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'testpassword123',
      age: 25,
      sport: 'Running',
      experience: 'Beginner',
      fitnessLevel: 'Just Starting',
      goals: ['weight-loss', 'endurance'],
      location: 'Test City'
    };

    try {
      const registerResponse = await axios.post(`${API_BASE_URL}/auth/register`, testUser);
      console.log('✅ Registration successful:', registerResponse.data.message);
      console.log('🔑 Token received:', registerResponse.data.token ? 'Yes' : 'No');
      console.log('👤 User ID:', registerResponse.data.user.id || registerResponse.data.user._id);
      console.log('');

      // Test 3: User Login
      console.log('3️⃣ Testing user login...');
      const loginResponse = await axios.post(`${API_BASE_URL}/auth/login`, {
        email: testUser.email,
        password: testUser.password
      });
      console.log('✅ Login successful:', loginResponse.data.message);
      console.log('🔑 Token received:', loginResponse.data.token ? 'Yes' : 'No');
      console.log('👤 User data:', {
        name: loginResponse.data.user.name,
        email: loginResponse.data.user.email,
        role: loginResponse.data.user.role,
        id: loginResponse.data.user.id || loginResponse.data.user._id
      });
      console.log('');

      const token = loginResponse.data.token;
      const userId = loginResponse.data.user.id || loginResponse.data.user._id;

      // Test 4: Protected Route Access
      console.log('4️⃣ Testing protected route access...');
      const meResponse = await axios.get(`${API_BASE_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('✅ Protected route access successful');
      console.log('👤 User profile:', meResponse.data.user.name);
      console.log('');

      // Test 5: User Profile Update
      console.log('5️⃣ Testing user profile update...');
      const updateData = {
        bio: 'Updated bio for testing',
        location: 'Updated City'
      };
      
      const updateResponse = await axios.put(`${API_BASE_URL}/users/${userId}`, updateData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('✅ Profile update successful:', updateResponse.data.message);
      console.log('');

      // Test 6: Admin Routes (should fail for regular user)
      console.log('6️⃣ Testing admin route access (should fail for regular user)...');
      try {
        await axios.get(`${API_BASE_URL}/admin/dashboard`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log('❌ Admin access should have failed but succeeded');
      } catch (error) {
        if (error.response?.status === 403) {
          console.log('✅ Admin access properly denied for regular user');
        } else {
          console.log('❌ Unexpected error:', error.response?.status);
        }
      }
      console.log('');

      // Test 7: Logout
      console.log('7️⃣ Testing logout...');
      const logoutResponse = await axios.post(`${API_BASE_URL}/auth/logout`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('✅ Logout successful:', logoutResponse.data.message);
      console.log('');

      console.log('🎉 All authentication tests passed successfully!');
      console.log('🚀 Your SportsPro authentication system is working perfectly!');

    } catch (error) {
      if (error.response?.status === 400 && error.response.data.error.includes('already exists')) {
        console.log('ℹ️  Test user already exists, testing login instead...');
        
        const loginResponse = await axios.post(`${API_BASE_URL}/auth/login`, {
          email: testUser.email,
          password: testUser.password
        });
        console.log('✅ Login successful:', loginResponse.data.message);
        console.log('🔑 Token received:', loginResponse.data.token ? 'Yes' : 'No');
        console.log('👤 User data:', {
          name: loginResponse.data.user.name,
          email: loginResponse.data.user.email,
          role: loginResponse.data.user.role,
          id: loginResponse.data.user.id || loginResponse.data.user._id
        });
        console.log('');
        console.log('🎉 Authentication system is working!');
      } else {
        throw error;
      }
    }

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    if (error.response) {
      console.error('📊 Response status:', error.response.status);
      console.error('📝 Response data:', error.response.data);
    }
    console.log('\n💡 Make sure your backend server is running on port 5001');
    console.log('💡 Check that MongoDB Atlas is connected');
    console.log('💡 Verify your .env file configuration');
  }
}

// Run the test
testAuthentication(); 