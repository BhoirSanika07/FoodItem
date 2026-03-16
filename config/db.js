const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      // These options prevent deprecation warnings
      serverSelectionTimeoutMS: 5000, // Timeout after 5s if can't connect
    });

    console.log('');
    console.log('✅ MongoDB Connected Successfully!');
    console.log(`   Host: ${conn.connection.host}`);
    console.log(`   Database: ${conn.connection.name}`);
    console.log('');
  } catch (error) {
    console.error('');
    console.error('❌ MongoDB Connection FAILED!');
    console.error('   Error:', error.message);
    console.error('');
    console.error('   TROUBLESHOOTING STEPS:');
    console.error('   1. Make sure MONGO_URI is set in your .env file');
    console.error('   2. If using local MongoDB: ensure MongoDB service is running');
    console.error('      → Windows: Run "net start MongoDB" in CMD as Admin');
    console.error('      → Mac:     Run "brew services start mongodb-community"');
    console.error('      → Linux:   Run "sudo systemctl start mongod"');
    console.error('   3. If using Atlas: check your IP is whitelisted');
    console.error('      → Go to Atlas → Security → Network Access → Add IP');
    console.error('      → Add 0.0.0.0/0 to allow all (for development)');
    console.error('   4. Check your .env file exists (copy from .env.example)');
    console.error('');
    process.exit(1); // Stop server if DB can't connect
  }
};

// Handle disconnection events
mongoose.connection.on('disconnected', () => {
  console.warn('⚠️  MongoDB disconnected. Attempting to reconnect...');
});

mongoose.connection.on('reconnected', () => {
  console.log('✅ MongoDB reconnected!');
});

module.exports = connectDB;
