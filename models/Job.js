const Sequelize = require('sequelize');
const db = require('../db/connection');


//Model com metodo define do Sequelize | Criando o objeto Job 
const Job = db.define('job', {
	title: { // DEFINIÇÃO de campo do banco
		type: Sequelize.STRING,
	},
	description: {
		type: Sequelize.STRING,
	},
	salary: {
		type: Sequelize.STRING,
	},
	company: {
		type: Sequelize.STRING,
	},
	email: {
		type: Sequelize.STRING,
	},
	new_job: {
		type: Sequelize.INTEGER,
	}
});

module.exports = Job

// Esse procedimento poderia ser feito no arquivo connection! Porem ficaria bagunçado.