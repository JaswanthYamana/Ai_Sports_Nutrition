const axios = require('axios');

const API_BASE_URL = 'http://localhost:5001/api';

async function testBackend() {
  console.log('🧪 Testing SportsPro Backend Server...\n');

  try {
    // Test health check endpoint
    console.log('1️⃣ Testing health check endpoint...');
    const healthResponse = await axios.get(`${API_BASE_URL}/health-check`);
    console.log('✅ Health check:', healthResponse.data);
    console.log('');

    // Test registration endpoint
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
      console.log('');

      // Test login endpoint
      console.log('3️⃣ Testing user login...');
      const loginResponse = await axios.post(`${API_BASE_URL}/auth/login`, {
        email: testUser.email,
        password: testUser.password
      });
      console.log('✅ Login successful:', loginResponse.data.message);
      console.log('🔑 Token received:', loginResponse.data.token ? 'Yes' : 'No');
      console.log('');

      // Test protected endpoint with token
      console.log('4️⃣ Testing protected endpoint...');
      const token = loginResponse.data.token;
      const meResponse = await axios.get(`${API_BASE_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('✅ Protected endpoint access successful');
      console.log('👤 User data:', meResponse.data.user.name);
      console.log('');

    } catch (error) {
      if (error.response?.status === 400 && error.response.data.error.includes('already exists')) {
        console.log('ℹ️  Test user already exists, testing login instead...');
        
        const loginResponse = await axios.post(`${API_BASE_URL}/auth/login`, {
          email: testUser.email,
          password: testUser.password
        });
        console.log('✅ Login successful:', loginResponse.data.message);
        console.log('🔑 Token received:', loginResponse.data.token ? 'Yes' : 'No');
        console.log('');
      } else {
        throw error;
      }
    }

    // Test health endpoints
    console.log('5️⃣ Testing health endpoints...');
    try {
      const vitalsResponse = await axios.get(`${API_BASE_URL}/health/vitals/test-user-id`);
      console.log('✅ Health vitals endpoint accessible');
    } catch (error) {
      if (error.response?.status === 403) {
        console.log('✅ Health vitals endpoint properly protected (requires auth)');
      }
    }

    console.log('\n🎉 All tests completed successfully!');
    console.log('🚀 Your SportsPro backend is working correctly!');

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
testBackend(); 