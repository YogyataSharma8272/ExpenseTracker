const mongoose = require('mongoose');

let cachedConnection = null;
let connectingPromise = null;

const connectDB = async () => {
  const mongoUri =
    process.env.MONGODB_URI ||
    process.env.MONGO_URI ||
    process.env.MONGODB_URL ||
    process.env.DATABASE_URL ||
    'mongodb+srv://yogyatasharma1515_db_user:KV3eeazrx3IRPCY7@cluster0.6pfnn5o.mongodb.net/expensetracker?retryWrites=true&w=majority&tls=true';

  if (!mongoUri) {
    throw new Error('MongoDB URI not found.');
  }

  if (cachedConnection && mongoose.connection.readyState === 1) {
    return cachedConnection;
  }

  if (connectingPromise) {
    return connectingPromise;
  }

  try {
    connectingPromise = mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000,
    });

    const conn = await connectingPromise;
    cachedConnection = conn;
    connectingPromise = null;

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    connectingPromise = null;
    console.error(`❌ Error: ${error.message}`);
    throw error;
  }
};

module.exports = connectDB;
