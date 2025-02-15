// Main file

//import my sql queries
import * as sql from './sql.js';


// Node imports
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import session from 'express-session';
import {configDotenv} from 'dotenv';

//initialize express
const app = express();

// start the session
/*configDotenv();
const SECRET = process.env.SECRET;

app.use(session({
    secret: SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false}
}));*/

// get a fixed path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const staticPath = path.join(__dirname, 'public');

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//site routes

//linking to login page
app.get('/', (req, res) => {
    res.redirect('/login/');
})

//going home
app.get('/home', (req, res) => {
    res.sendFile(staticPath + '/home')
})

app.get('/blackjack', (req, res) => {
    res.sendFile(staticPath + '/blackjack')
})

app.get('/hangman', (req, res) => {
    res.sendFile(staticPath + '/hangman')
})

app.get('/rock paper scissors', (req, res) => {
    res.sendFile(staticPath + '/rock paper scissors')
})

app.get('/tic-tac-toe', (req, res) => {
    res.sendFile(staticPath + '/tic-tac-toe')
})




app.post('/login', (req, res) => {
    const info = req.body
    if (sql.login(info.username, info.password)) {
        return res.redirect('/home')
    }
    res.send('wron')
})

app.get('/fetchgames/', (req, res) => {
    console.log('noticed')
    res.send(sql.getGames())
})


app.use(express.static(staticPath));
app.listen(8000, () => {
    console.log('Server is running on http://localhost:8000')
})

