//Rota que add os Jobs no banco via Sequelize

const express = require('express');
const router = express.Router();
const Job = require('../models/Job');

//Teste de rota | Utilizando o Postman | ACESSO A ROTA PELO HANDLEBARS
router.get('/add', (req, res) => {
	res.render('add');
});

//Fim do teste

//detalhe da vaga -> view/1 view/2
router.get('/views/:id', (req,res) => Job.findOne({
	where: {id: req.params.id}
}).then(job => {

	res.render('view', {
		job
	});

  }).catch(err => console.log(err)));



//add job via POST
router.post('/add', (req, res) => {

	let{title, salary, company, description, email, new_job} = req.body; //Todos os dados vem por essa propriedadew

	//insert
	Job.create({
		title,
		description,
		salary,
		company,
		email,
		new_job	
	})
	.then(() => res.redirect('/')) //Retorno da promise| Quando der certo => Redireciona para o Ther
	.catch(err => console.log(err)); // Erro 

});

module.exports = router



