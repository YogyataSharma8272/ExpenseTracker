const dotenv = require('dotenv');
const connectDB = require('../backend/config/database');
const app = require('../backend/app');

dotenv.config();

module.exports = async (req, res) => {
  try {
    await connectDB();

    return app(req, res);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Database connection failed',
      error: error.message,
    });
  }
};