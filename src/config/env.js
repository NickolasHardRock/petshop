const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const toBool = (value, defaultValue = false) => {
  if (value === undefined) {
    return defaultValue;
  }

  return ['true', '1', 'yes', 'on'].includes(String(value).toLowerCase());
};

const toList = (value, defaultValue = []) => {
  if (!value) {
    return defaultValue;
  }

  return String(value)
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
};

const resolveStoragePath = (storage) => {
  if (!storage) {
    return path.resolve(process.cwd(), 'database.sqlite');
  }

  return path.isAbsolute(storage) ? storage : path.resolve(process.cwd(), storage);
};

module.exports = {
  env: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 3000,
  db: {
    dialect: process.env.DB_DIALECT || 'sqlite',
    storage: resolveStoragePath(process.env.DB_STORAGE),
    storageTest: resolveStoragePath(process.env.DB_STORAGE_TEST || './database.test.sqlite'),
    logging: toBool(process.env.DB_LOGGING, false),
  },
  auth: {
    jwtSecret: process.env.JWT_SECRET || 'development_secret',
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1d',
  },
  integrations: {
    cepApiBaseUrl: process.env.CEP_API_BASE_URL || 'https://viacep.com.br/ws',
  },
  cors: {
    origins: toList(process.env.CORS_ORIGINS, [
      'http://localhost:5173',
      'http://localhost:5174',
    ]),
  },
  swagger: {
    serverUrl: process.env.SWAGGER_SERVER_URL || `http://localhost:${Number(process.env.PORT) || 3000}`,
  },
};
