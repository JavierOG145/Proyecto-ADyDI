const express = require('express');

const app = express();


app.listen(3000, () => {
    console.log('Authentication service started on port 3000');
});

const users = [
    {
        username: 'john',
        password: 'password123admin',
        role: 'admin'
    },
    {
        username: 'anna',
        password: 'password123member',
        role: 'member'
    }
];

const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

const accessTokenSecret = 'laParaulaSecretaDelServidor';
const refreshTokenSecret = 'laParaulaSecretaDelServidorDeRefresc';
const refreshTokens = [];

app.post('/login', (req, res) => {
    // Llegim username and password des del cos
    const { username, password } = req.body;

    // Filtrem de l'array d'usuaris, i comprovem si existeix o no
    const user = users.find(u => {
        return u.username === username && u.password === password
    });

    if (user) {
        // Generarem el token
        const accessToken = jwt.sign(
            {
                username: user.username,
                role: user.role
            },
            accessTokenSecret,
            { expiresIn: '1m' });

        // token de refresco
        const refreshToken = jwt.sign(
            { username: user.username, role: user.role },
            refreshTokenSecret);

        // guardamos token de refresco
        refreshTokens.push(refreshToken);

        // carreguem el la resposta el jwt que hem generat
        res.json({ accessToken, refreshToken });
    } else {
        res.send('Username or password incorrect');
    }
});

const authenticateJWT = (req, res, next) => {
    // arrepleguem el JWT d'autoritzaciÃ³
    const authHeader = req.headers.authorization;

    if (authHeader) {

        // si hi ha toquen
        const token = authHeader.split(' ')[1];
        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            // afegim a la peticiÃ³ les dades que venien en el jwt user
            req.user = user;
            // s'executa la segÃ¯uent funciÃ³, un cop s'ha fet el middleware
            next();
        });

    } else {  // no estÃ . contestem directament al client amb un error
        res.sendStatus(401);
    }
};

app.get('/contactos', authenticateJWT, (req, res) => {
    const user = req.user;
    // autoritzaciÃ³
    if (user.role === 'admin') {
        res.json({ "contactos": "Lista de contactos" })
    }
    else {
        res.sendStatus(402);
    }
});

app.post('/token', (req, res) => {
    // token de refresc
    const { token } = req.body;
    // comprovem si me l'ha enviat l'usuari
    if (!token) {
        return res.sendStatus(401);
    }

    if (!refreshTokens.includes(token)) {
        return res.sendStatus(403);
    }
    // el verifiquem, amb el password de refresc
    jwt.verify(token, refreshTokenSecret, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        //generem un nou token
        const accessToken = jwt.sign(
            { username: user.username, role: user.role },
            accessTokenSecret,
            { expiresIn: '1m' });

        res.json({
            accessToken
        });
    });
});
