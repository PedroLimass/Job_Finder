const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const path = require('path');
const db = require('./db/connection');
const bodyParser = require('body-parser');
const Job = require ('./models/Job');
const Sequelize = require('sequelize');
const Op 		= Sequelize.Op;


const PORT = 3000; //Porta para o servidor



app.listen(PORT, function () { // Exposta a porta e func
	console.log(`O Express está rodando na porta ${PORT}`);
});

//Body-Parser
app.use(bodyParser.urlencoded({ extended: false }));

// Handle-Bars
app.set('views', path.join(__dirname, 'views'));

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// static folder
app.use(express.static(path.join(__dirname, 'public')));

//


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
app.get('/', (req, res) => {

	let search = req.query.job;
	let query = '%'+search+'%'; // PH -> PHP, wor -> wordpress | Semelhança!!

	if(!search){//Motor de busca 

		Job.findAll({order: [ 		//Chama todas as Jobs
		
			["createdAt", 'DESC'] 	//Ordena a lista por ordem de Descrescente
		
		]})
		.then(jobs => {
		
			res.render('index', { //renderiza a pagina com o conteudo do banco
				jobs
			});

		}).catch(err => console.log(err));

	}else{

		Job.findAll({ 
			where:{title: {[Op.like]: query}},
			order: [ 		
			["createdAt", 'DESC'] 	
		
		]})
		.then(jobs => {
		
			res.render('index', { 
				jobs, search
			});

		})
		.catch(err => console.log(err));
	}//Fim do motor de busca

	
}); //npm run dev - comand


// Jobs Raoutes | Todas as rotas do Jobs iram vir com /jobs antes da mesma| Ex: /jobs/cadastro
app.use('/jobs', require('./routes/jobs'));



 




