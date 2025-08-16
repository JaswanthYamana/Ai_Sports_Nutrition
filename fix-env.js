const fs = require('fs');

console.log('🔧 Fixing MongoDB URI typo in .env file...\n');

// Read the current .env file
const envContent = fs.readFileSync('.env', 'utf8');

// Fix the typo: mmongodb -> mongodb
const fixedContent = envContent.replace('mmongodb+srv://', 'mongodb+srv://');

// Write the fixed content back
fs.writeFileSync('.env', fixedContent);

console.log('✅ Fixed MongoDB URI typo (mmongodb -> mongodb)');
console.log('\n🔄 Please restart your backend server for the changes to take effect:');
console.log('   npm run server:dev');


