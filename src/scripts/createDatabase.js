const fs = require('fs');
const path = require('path');
const env = require('../config/env');

const createDatabase = async () => {
  const dbPath = path.resolve(process.cwd(), env.db.storage || './database.sqlite');
  const dbDir = path.dirname(dbPath);

  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }

  if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, '');
    console.log(`Arquivo de banco criado em ${dbPath}`);
  } else {
    console.log(`Arquivo de banco já existe em ${dbPath}`);
  }
};

createDatabase().catch((error) => {
  console.error('Falha ao criar banco.', error);
  process.exit(1);
});
