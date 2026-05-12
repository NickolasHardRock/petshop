const path = require('path');
require('dotenv').config();

const shared = {
  dialect: 'sqlite',
  storage: process.env.DB_STORAGE || path.resolve(__dirname, '../../database.sqlite'),
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
    storage: process.env.DB_STORAGE_TEST || path.resolve(__dirname, '../../database.test.sqlite'),
  },
  production: shared,
};
