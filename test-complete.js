const axios = require('axios');

const API_BASE_URL = 'http://localhost:5001/api';

console.log('🧪 Testing Complete SportsPro Application...\n');

let authToken = '';
let userId = '';

async function testComplete() {
  try {
    // 1. Health Check
    console.log('1️⃣ Testing health check...');
    const healthResponse = await axios.get(`${API_BASE_URL}/health-check`);
    console.log('✅ Health check:', healthResponse.data.message);

    // 2. User Registration
    console.log('\n2️⃣ Testing user registration...');
    const registerData = {
      name: 'Complete Test User',
      email: 'complete2@example.com',
      password: 'testpass123',
      age: 25,
      sport: 'Football',
      experience: 'Intermediate',
      fitnessLevel: 'Regular Exerciser',
      goals: ['weight-loss', 'endurance'],
      location: 'New York'
    };
    
    const registerResponse = await axios.post(`${API_BASE_URL}/auth/register`, registerData);
    console.log('✅ Registration:', registerResponse.data.message);
    authToken = registerResponse.data.token;
    userId = registerResponse.data.user.id;

    // 3. User Login
    console.log('\n3️⃣ Testing user login...');
    const loginResponse = await axios.post(`${API_BASE_URL}/auth/login`, {
      email: 'complete2@example.com',
      password: 'testpass123'
    });
    console.log('✅ Login:', loginResponse.data.message);
    authToken = loginResponse.data.token;

    // 4. Profile Update
    console.log('\n4️⃣ Testing profile update...');
    const updateResponse = await axios.put(`${API_BASE_URL}/users/${userId}`, {
      bio: 'Updated bio for testing',
      location: 'Los Angeles'
    }, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    console.log('✅ Profile update:', updateResponse.data.message);

    // 5. Frontend Integration Test
    console.log('\n5️⃣ Testing frontend integration...');
    const frontendResponse = await axios.get('http://localhost:3000');
    if (frontendResponse.status === 200) {
      console.log('✅ Frontend is running and accessible');
    } else {
      console.log('⚠️ Frontend might not be running');
    }

    console.log('\n🎉 All tests completed successfully!');
    console.log('🚀 Your SportsPro application is fully functional!');
    console.log('\n📝 Next steps:');
    console.log('1. Open http://localhost:3000 in your browser');
    console.log('2. Test the user interface and navigation');
    console.log('3. Try registering a new user through the frontend');
    console.log('4. Test all the features like profile editing, navigation, etc.');

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data?.error || error.message);
    console.log('\n💡 Troubleshooting tips:');
    console.log('- Make sure both frontend (port 3000) and backend (port 5001) are running');
    console.log('- Check that MongoDB Atlas is connected');
    console.log('- Verify your .env file configuration');
  }
}

testComplete();
