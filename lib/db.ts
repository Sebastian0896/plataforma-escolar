import mongoose from 'mongoose'
import "dotenv/config"
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://sgrx245_db_user:GiZB5VbRsxmRVCjq@ac-m67jijy-shard-00-00.pxxvkbe.mongodb.net:27017,ac-m67jijy-shard-00-01.pxxvkbe.mongodb.net:27017,ac-m67jijy-shard-00-02.pxxvkbe.mongodb.net:27017/?ssl=true&replicaSet=atlas-z826oo-shard-0&authSource=admin&appName=plataforma-escolar'

let cached = (globalThis as any)._mongooseCache

if (!cached) {
  cached = (globalThis as any)._mongooseCache = { conn: null, promise: null }
}

export async function connectDB() {
  if (cached.conn) return cached.conn
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => mongoose)
  }
  console.log('🔌 Conectando a:', MONGODB_URI)
  cached.conn = await cached.promise
  return cached.conn
}

export default connectDB