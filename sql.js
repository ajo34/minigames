import Database from 'better-sqlite3';
const db = new Database('studietid.db', { verbose: console.log });
console.log(db)
