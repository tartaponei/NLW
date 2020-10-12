function execute(db) {
    return db.exec(`
    CREATE TABLE IF NOT EXISTS proffys (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        avatar TEXT,
        whatsapp TEXT,
        bio TEXT
    );

    CREATE TABLE IF NOT EXISTS classes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        subject INTEGER,
        cost TEXT,
        proffy_id INTEGER
    );

    CREATE TABLE IF NOT EXISTS class_schedule (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        class_id INTEGER,
        weekday INTEGER,
        time_from INTEGER,
        time_to INTEGER
    );
    `)
}

const Database = require("sqlite-async")

//o open cria o banco na pasta dita
//o then executa só depois da abertura do banco ter sido concluída
//module.exports tem a ver com exportar esse objeto -> posso acessá-lo com o require
module.exports = Database.open(__dirname + "/database.sqlite").then(execute)