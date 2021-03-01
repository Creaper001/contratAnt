require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
	const authHeader = req.headers.authorization;
	
	if (!authHeader)
		return res.status(401).json({ error: 'SEM TOKEN' });

	const parts = authHeader.split(' ');

	if (parts.length !== 2)
		return res.status(401).json({ error: 'TOKEN INVALIDO' });

	const [ scheme, token ] = parts;

	if (!/^Bearer$/i.test(scheme))
		return res.status(401).json({ error: 'TOKEN INVALIDO' });

	jwt.verify(token, process.env.SECRET, (err, decoded) => {
		if (err) return res.status(401).json({ error: 'TOKEN INVALIDO' });

		req.id = decoded.id;
		req.image = decoded.image;
		return next();
	});
};