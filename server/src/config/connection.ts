import dotenv from 'dotenv';
dotenv.config();
import path from 'node:path';

import mongoose from 'mongoose';

dotenv.config ({ path: path.join(process.cwd(), '.env')});
const MONGODB_URI = process.env.MONGODB_URI || '';

const db = async (): Promise<typeof mongoose.connection> => {
  try {
    await mongoose.connect(MONGODB_URI, {dbName: 'GoogleBooksSearch'});
    console.log('Database connected.');
    return mongoose.connection;
  } catch (error) {
    console.error('Database connection error:', error);
    throw new Error('Database connection failed.');
  }
};

export default db;
