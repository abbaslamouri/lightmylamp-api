export default {
  DB_IP: process.env.DB_IP || 'db',
  DB_PORT: process.env.DB_PORT || 27017,
  DB_NAME: process.env.DB_NAME || 'lightmylamp-db',
  DB_USER: process.env.DB_USER || '',
  DB_PASSWORD: process.env.DB_PASSWORD || '',
  PORT: process.env.PORT || 5000,
  REDIS_IP: process.env.REDIS_IP || 'redis',
  REDIS_PORT: process.env.REDIS_PORT || 6379,
  SESSION_SECRET: process.env.JWT_SECRET as string,
}
