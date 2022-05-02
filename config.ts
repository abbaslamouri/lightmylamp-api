export default {
  DB_IP: process.env.DB_IP || 'db',
  DB_PORT: process.env.DB_PORT || 27017,
  DB_NAME: process.env.DB_NAME || 'test',
  DB_USER: process.env.DB_USER || '',
  DB_PASSWORD: process.env.DB_PASSWORD || '',
  PORT: process.env.PORT || 5000,
}
