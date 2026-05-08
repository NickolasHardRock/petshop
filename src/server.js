const app = require('./app');
const env = require('./config/env');
const sequelize = require('./config/database');

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexao com Postgres estabelecida com sucesso.');

    app.listen(env.port, () => {
      console.log(`Servidor executando na porta ${env.port}.`);
      console.log(`Swagger disponivel em ${env.swagger.serverUrl}/docs`);
    });
  } catch (error) {
    console.error('Falha ao iniciar a aplicacao.', error);
    process.exit(1);
  }
};

startServer();
