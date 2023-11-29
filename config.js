const {
  PORT = 3000,
  MONGO_DB = 'mongodb://127.0.0.1:27017/bitfilmsdb',
  JWT_SECRET = 'SECRET_KEY',
  NODE_ENV = 'production',
} = process.env;

module.exports = {
  PORT, MONGO_DB, JWT_SECRET, NODE_ENV,
};
