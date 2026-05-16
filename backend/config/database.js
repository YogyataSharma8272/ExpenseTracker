const mongoose = require('mongoose');

let cachedConnection = null;
let connectingPromise = null;

const connectDB = async () => {
  const mongoUri =
    process.env.MONGODB_URI ||
    process.env.MONGO_URI ||
    process.env.MONGODB_URL ||
    process.env.DATABASE_URL;

  if (!mongoUri) {
    throw new Error('MongoDB URI not found. Set MONGODB_URI / MONGO_URI / MONGODB_URL / DATABASE_URL.');
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
