const path = require('path');
require('dotenv').config();

const resolveStoragePath = (storage) => {
  if (!storage) {
    return path.resolve(process.cwd(), 'database.sqlite');
  }

  return path.isAbsolute(storage) ? storage : path.resolve(process.cwd(), storage);
};

const shared = {
  dialect: process.env.DB_DIALECT || 'sqlite',
  storage: resolveStoragePath(process.env.DB_STORAGE),
  logging: (process.env.DB_LOGGING || 'false') === 'true',
  define: {
    underscored: true,
    timestamps: true,
  },
};

module.exports = {
  development: shared,
  test: {
    ...shared,
    storage: resolveStoragePath(process.env.DB_STORAGE_TEST || './database.test.sqlite'),
  },
  production: shared,
};
