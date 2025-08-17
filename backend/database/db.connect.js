
import { env } from '../env.js';
import mongoose from 'mongoose';

export const dbConnect = async () => {
    try {
        if (!env.MONOGDB_URI) {
            throw new Error('Database URI is not defined in environment variables');
        }
        await mongoose.connect(env.MONOGDB_URI);
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Database connection error:', error);
        throw error; // Re-throw the error to be handled by the caller
    }
}