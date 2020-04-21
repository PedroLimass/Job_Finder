const express = require('express');
const app = express();
const db = require('./db/connection');
const bodyParser = require('body-parser');

const PORT = 3000; //Porta para o servidor



app.listen(PORT, function () { // Exposta a porta e func
	console.log(`O Express está rodando na porta ${PORT}`);
});

//Body-Parser
app.use(bodyParser.urlencoded({ extended: false}));


// db connection

db
	.authenticate()
	.then(() => {
		console.log('Conectado ao Banco de Dados')
	})
	.catch(err =>{
		console.log('Erro ao conectar', err);
	});



//routs
app.get('/',(req, res) => {
	res.send("Esta funcionando! :)");
}); //npm run dev - comand


// Jobs Raoutes | Todas as rotas do Jobs iram vir com /jobs antes da mesma| Ex: /jobs/cadastro
app.use('/jobs', require('./routes/jobs'));

 
