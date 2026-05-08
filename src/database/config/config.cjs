require('dotenv').config();

const shared = {
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '12345',
  database: process.env.DB_NAME || 'petshop_db',
  host: process.env.DB_HOST || '127.0.0.1',
  port: Number(process.env.DB_PORT) || 5432,
  dialect: 'postgres',
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
    database: `${shared.database}_test`,
  },
  production: shared,
};
