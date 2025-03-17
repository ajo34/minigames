// Main file

//import my sql queries
import * as sql from './sql.js';


// Node imports
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import session from 'express-session';
import {configDotenv} from 'dotenv';
import bcrypt from 'bcrypt'

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


//site routes

//linking to login page
app.get('/', (req, res) => {
    res.redirect('/login/');
})

//going home
app.get('/home', (req, res) => {
    if (!req.session.idUser) {
        req.session.idUser = 1
    }
    
    res.sendFile(staticPath + '/home')
})


//Route to game sites
app.get('/game', (req, res) => {
    const game = req.query.game
    res.sendFile(path.join(__dirname, "public", game, "index.html")
    
)
})
//staticPath + `/${game}/index.html`

app.post('/login', async (req, res) => {
    const {userName, password} = req.body
    console.log(userName, password, 'req:', req.body)

    // Finn brukeren basert på id/email
    const user = sql.getUser(sql.idGetter('user', userName))

    // Sjekk om passordet samsvarer med hash'en i databasen
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
        req.session.idUser = sql.idGetter('user', userName)
        return res.redirect('/home')
    } else {res.send('wron')}

    /*if (!sql.login(userName, password)) {
        res.send('wron')
    }*/
    
    
})

app.post('/reguser', async (req, res) => {
    let user = req.body
    console.log(user)

    //hash the password
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(user.password, saltRounds)

    user = sql.regUser(user.username, hashedPassword)

    res.redirect('/login')
})

app.get('/fetchgames/', (req, res) => {
    res.send(sql.getGames())
})

app.post('/regresult', (req, res) => {
    const info = req.body
    console.log(info)
    const newGame = sql.regResult(req.session.idUser, info.name, info.result)
    console.log('applogger', newGame)
    return res.send(newGame)

})


app.use(express.static(staticPath));
app.listen(8000, () => {
    console.log('Server is running on http://localhost:8000')
})

