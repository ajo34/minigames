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

export function regResult (idUser, idGame, result) {
    let sql = db.prepare(`INSERT INTO record (idUser, idGame, result)
                            VALUES (?, ?, ?)`)
    const info = sql.run(idUser, idGetter('game', idGame), result)

    sql = db.prepare(`SELECT user.name, game.name, result
                        FROM record
                        INNER JOIN 
                        user ON user.id = idUser,
                        game ON game.id = idGame
                        WHERE record.id = ?`)
    const row = sql.all(info.lastInsertRowid)
    console.log('row inserted', row)
    return row[0]
}

export function nameGetter(table, id) {
    const sql = db.prepare(`SELECT name FROM \`${table}\` WHERE id = ?`)
    const name = sql.get(id)
    return name.name
}

export function idGetter(table, name) {
    const sql = db.prepare(`SELECT id FROM \`${table}\` WHERE name = ?`)
    const id = sql.get(name)
    console.log('id', id.id, 'table', table, 'name', name)
    return id.id
}

//console.log("id", nameGetter('user', 3))