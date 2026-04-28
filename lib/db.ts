import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://sgrx245_db_user:GiZB5VbRsxmRVCjq@ac-c8j0jhc-shard-00-00.7yynazh.mongodb.net:27017,ac-c8j0jhc-shard-00-01.7yynazh.mongodb.net:27017,ac-c8j0jhc-shard-00-02.7yynazh.mongodb.net:27017/planificaciones?ssl=true&replicaSet=atlas-14fjvj-shard-0&authSource=admin&appName=plataforma-escolar'

let cached = (globalThis as any)._mongooseCache

if (!cached) {
  cached = (globalThis as any)._mongooseCache = { conn: null, promise: null }
}

export async function connectDB() {
  if (cached.conn) return cached.conn
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => mongoose)
  }
  cached.conn = await cached.promise
  return cached.conn
}

export default connectDB