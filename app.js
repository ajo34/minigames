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
configDotenv();
const SECRET = process.env.SECRET;

app.use(session({
    secret: SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false}
}));

// get a fixed path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const staticPath = path.join(__dirname, 'public');

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



//linking to login page
app.get('/', (req, res) => {
    res.redirect('/login/');
})

app.get('/home', (req, res) => {
    res.redirect('/home')
})

app.post('/logon', (req, res) => {
    res.send(sql.getUsers())
})



app.use(express.static(staticPath));
app.listen(8000, () => {
    console.log('Server is running on http://localhost:8000')
})

