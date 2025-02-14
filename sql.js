import Database from 'better-sqlite3';
const db = new Database('minigames.db', { verbose: console.log });
console.log(db)



export function getUsers(){
    let sql = db.prepare('SELECT name FROM user');
    let users = sql.all();
    console.log(users)
    return users
}

