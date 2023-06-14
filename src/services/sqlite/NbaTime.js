import db from "./SQLiteDatabase";

db.transaction(tx => {
    tx.executeSql(
        "CREATE TABLE nba_time (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, sigla TEXT, cidade TEXT, conferencia TEXT, divisao TEXT);"
    )
    /*
    DELETAR TABELA
    tx.executeSql(
        "DROP TABLE nba_time;"
    )
    */
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

const update = (id, obj) => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                "UPDATE nba_time SET nome=?, sigla=?, cidade=?, conferencia=?, divisao=? WHERE id=?;", [obj.nome, obj.sigla, obj.cidade, obj.conferencia, obj.divisao, id],
                (_, { rowsAffected }) => {
                    if (rowsAffected > 0) resolve(rowsAffected);
                    else reject("Error updating obj: id=" + id);
                },
                (_,error) => reject(error)
            );
        });
    });
}

const remove = (id) => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                "DELETE FROM nba_time WHERE id=?;", [id],
                (_, { rowsAffected }) => {
                    resolve(rowsAffected);
                },
                (_,error) => reject(error)
            );
        });
    });
}

const listarTodos = () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        //comando SQL modificável
        tx.executeSql(
          "SELECT * FROM nba_time;",
          [],
          //-----------------------
          (_, { rows }) => resolve(rows._array),
          (_, error) => reject(error) // erro interno em tx.executeSql
        );
      });
    });
};

const buscarTime = (id) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        //comando SQL modificável
        tx.executeSql(
          "SELECT * FROM nba_time WHERE id=?;",
          [id],
          //-----------------------
          (_, { rows }) => {
            if (rows.length > 0) resolve(rows._array[0]);
            else reject("Obj not found: id=" + id); // nenhum registro encontrado
          },
          (_, error) => reject(error) // erro interno em tx.executeSql
        );
      });
    });
  };

export default {
    create,
    update,
    remove,
    listarTodos,
    buscarTime
}