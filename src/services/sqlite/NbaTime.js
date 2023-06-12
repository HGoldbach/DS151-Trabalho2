import db from "./SQLiteDatabase";

db.transaction(tx => {
    tx.executeSql(
        "CREATE TABLE IF NOT EXISTS nba_time (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, sigla TEXT, cidade TEXT, conferencia TEXT, divisao TEXT);"
    )
});

const create = (obj) => {
    return new Promise((resolve, reject) => {
        db.transaction( tx => {
            tx.executeSql("INSERT INTO nba_time(nome, sigla, cidade, conferencia, divisao) VALUES (?,?,?,?,?)", [obj.nome, obj.sigla, obj.cidade, obj.conferencia, obj.divisao],
                (_, {rowsAffected, insertId}) => {
                    if (rowsAffected > 0) {
                        resolve(insertId);
                    } else {
                        reject("Erro ao inserir obj: " +JSON.stringify(obj));
                    }
                },
                (_, error) => reject(error)
            )
        })
    })
}

export default {
    create
}