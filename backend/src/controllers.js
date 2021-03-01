require('dotenv').config();
const express = require('express');
const mysql = require('./database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authMiddleware = require('./authMiddleware');

const router = express.Router();

function generateToken(params) {
	return jwt.sign({ id: params.id, image: params.image }, process.env.SECRET, {
		expiresIn: 86400,
	});
}

router.post('/worker/refresh', async (req, res) => {
	const { token } = req.body;
	jwt.verify(token, process.env.SECRET, (err, decoded) => {
		if (err) return res.status(401).json({ error: 'TOKEN INVALIDO' });

		const newToken = generateToken({ id: decoded.id, image: decoded.image });
		return res.json({ token: newToken });
	});
});

router.post('/worker/register', async (req, res) => {
	const {
		nome,
		email,
		password,
		tags,
		image,
		description,
		city,
		phone,
	} = req.body;

	const worker = await mysql.queryAsync(
		`SELECT COUNT(id) FROM workers WHERE email = ?`,
		[email],
	);

	if (worker[0]['COUNT(id)'] > 0)
		return res.status(400).json({ error: 'Esse email já esta em uso' });

	const hashPassword = await bcrypt.hashSync(password, 10);
	const newWorker = await mysql.queryAsync(
		`INSERT INTO workers (name, email, password, image, description, city, phone) 
		 VALUES (?, ?, ?, ?, ?, ?, ?)`,
		[nome, email, hashPassword, image, description, city, phone],
	);

	await tags.forEach(async (tag) => {
		await mysql.queryAsync(
			`INSERT INTO worker_tag (tags_id, workers_id) 
			 VALUES (?, ?)`,
			[tag, newWorker.insertId],
		);
	});

	return res.json({ token: generateToken({ id: worker[0].id, image: worker[0].image }) });
});
router.post('/worker/login', async (req, res) => {
	const { email, password } = req.body;

	const worker = await mysql.queryAsync(
		`SELECT id, image, password FROM workers WHERE email = ?`,
		[email],
	);

	if(worker.length === 0)
		return res.status(400).json({ error: 'Email e/ou Senha invalido(s)' });
	if(!await bcrypt.compareSync(password, worker[0].password))
		return res.status(400).json({ error: 'Email e/ou Senha invalido(s)' });

	return res.json({ token: generateToken({ id: worker[0].id, image: worker[0].image }) });
});
router.get('/tag/list', async (req, res) => {
	const list = await mysql.queryAsync(`SELECT * FROM tags`);

	return res.json({ list });
});
router.get('/worker/list', async (req, res) => {
	const workers = await mysql.queryAsync(`
		SELECT id, image, name, city FROM workers
	`);

	const tags = workers.map(async (worker) => {
		const tags = await mysql.queryAsync(
			`SELECT t.id, t.name FROM tags AS t
			 INNER JOIN worker_tag AS wt ON wt.workers_id = ?
			 WHERE t.id = wt.tags_id`, 
			 [worker.id]
		); 
		worker.tags = tags;
		return worker;
	});

	Promise.all(tags).then((list) => {
		return res.json({ list });
	});
});
router.get('/worker/:id', async (req, res) => {
	const worker = await mysql.queryAsync(
		`SELECT id, name, email, image, description, city, phone FROM workers WHERE id = ?`,
		[req.params.id]
	);

	return res.json({ worker: worker[0] });
});

router.post('/worker/:id/edit/auth', authMiddleware, (req, res) => {

});
router.post('/worker/:id/edit/about', authMiddleware, (req, res) => {

});
router.post('/worker/:id/edit/tags', authMiddleware, (req, res) => {

});

module.exports = router; 
