const path = require('path');
const { Sequelize } = require('sequelize');
const env = require('./env');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.resolve(process.cwd(), env.db.storage || './database.sqlite'),
  logging: env.db.logging ? console.log : false,
  define: {
    underscored: true,
    timestamps: true,
  },
  dialectOptions: {
    decimalNumbers: true,
  },
});

module.exports = sequelize;
