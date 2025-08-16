const fs = require('fs');

console.log('🔧 Fixing MongoDB URI and restarting servers...\n');

// Read the current .env file
const envContent = fs.readFileSync('.env', 'utf8');

// Check if the typo exists
if (envContent.includes('mmongodb+srv://')) {
  // Fix the typo: mmongodb -> mongodb
  const fixedContent = envContent.replace('mmongodb+srv://', 'mongodb+srv://');
  
  // Write the fixed content back
  fs.writeFileSync('.env', fixedContent);
  
  console.log('✅ Fixed MongoDB URI typo (mmongodb -> mongodb)');
} else {
  console.log('✅ MongoDB URI is already correct');
}

console.log('\n🔄 Now let\'s restart the servers for full connectivity...');
console.log('\n📋 Please run these commands in separate terminals:');
console.log('\nTerminal 1 (Backend):');
console.log('  npm run server:dev');
console.log('\nTerminal 2 (Frontend):');
console.log('  npm run dev');
console.log('\nOr use the combined command:');
console.log('  npm run dev:full');
console.log('\nAfter restarting, test the connection with:');
console.log('  curl http://localhost:5001/api/health-check');
