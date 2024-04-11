import { config } from 'dotenv';
import { MongoClient, Db } from 'mongodb';

config();


export async function connectToMongoDB(): Promise<Db> {
    const client = new MongoClient(`${process.env.DB}`);
    try {
        await client.connect();
        console.log('Connected to MongoDB server');
        const db = client.db(`${process.env.DB_NAME}`);
        return db;
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
}
