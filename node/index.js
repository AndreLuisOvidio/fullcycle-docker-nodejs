const express = require('express');
const app = express();
const port = 3000;
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
}
const mysql = require('mysql')
const connection = mysql.createConnection(config)

const sql = `CREATE TABLE IF NOT EXISTS people(
    id int not null auto_increment, 
    name varchar(255), 
    primary key(id));
    `
connection.query(sql)
connection.query(`DELETE FROM PEOPLE WHERE NAME = 'Andre Ovidio';`);
connection.query(`INSERT INTO people(name) values('Andre Ovidio');`);
connection.end()

app.get('/', (req,res) => {
    const con = mysql.createConnection(config);
    con.query("SELECT * FROM people", function (err, result, fields) {
        if (err) res.send(err);
        let retorno = `<h1>Full Cycle - Consulta de nomes</h1>
            <p>- Lista de nomes cadastrada no banco de dados.</p>
            <ul>
                ${result.map((el) => '<li>'+el.name+'</li>').join('')}
            </ul>
            <h2>Para cadastrar mais nomes acesse esse mesmo site colocando /nome ao final do Link</h2>
        `

        res.send(retorno);
    });
    con.end()
})

app.get('/:nome', (req,res) => {
    const con = mysql.createConnection(config);
    const sql = `INSERT INTO people(name) values(?)`
    con.query(sql,[req.params.nome])
    con.end()

    res.send(`
        <h1>Full Cycle</h1>
        <p>Registrado nome: ${req.params.nome}</p>
    `);
})

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})