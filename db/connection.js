//Chamando o Sequelize => Banco relacional

const Sequelize = require('sequelize');

const sequelize = new Sequelize({
	dialect: 'sqlite',
	storage: './db/app.db'
}); // Apontamento do Banco de Dados ... Não é a propria conecao em si


// Aqui é exporta a conecção no arquivo app.js
// Assim é autenticado o banco
module.exports = sequelize