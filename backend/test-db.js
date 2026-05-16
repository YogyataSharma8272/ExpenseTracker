require('dotenv').config();
const connectDB = require('./config/database');

(async () => {
  try {
    const conn = await connectDB();
    console.log('TEST: MongoDB connection successful:', conn.connection.host);
    process.exit(0);
  } catch (err) {
    console.error('TEST: MongoDB connection failed:');
    console.error(err);
    process.exit(1);
  }
})();
