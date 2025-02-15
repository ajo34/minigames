import Database from 'better-sqlite3';
const db = new Database('minigames.db', { verbose: console.log });



//gets name of all users
export function getUsers(){
    let sql = db.prepare('SELECT name FROM user');
    let users = sql.all();
    console.log(users)
    return users
}

//checks if a user already exists
export function userExists(username) {
    let sql = db.prepare(`SELECT name FROM user WHERE name = ?`)
    let user = sql.get(username)
    return user
}

//checks if ypur login details match one in the database
export function login(username, password) {
    let sql = db.prepare(`SELECT name FROM user WHERE name = ? AND password = ?`)
    let user = sql.get(username, password)
    return user
}

//gets names of all games
export function getGames() {
    let sql = db.prepare(`SELECT name FROM game`)
    let games = sql.all()
    return games
}