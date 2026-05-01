import mongoose from 'mongoose'
import "dotenv/config"
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/planificaciones'

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