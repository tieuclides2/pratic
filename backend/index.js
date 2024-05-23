const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();

// Configuração do body-parser para lidar com dados do formulário
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configuração da conexão MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'mydb'
});

// Conectar ao MySQL
connection.connect();

// Rota para criar um novo usuário
app.post('/users', (req, res) => {
  const { name, email, password } = req.body;
  const INSERT_USER_QUERY = `INSERT INTO users (name, email, password) VALUES ('${name}', '${email}', '${password}')`;

  connection.query(INSERT_USER_QUERY, (error, results) => {
    if (error) throw error;
    res.send('Usuário criado com sucesso!');
  });
});

// Rota para buscar todos os usuários
app.get('/users', (req, res) => {
  const SELECT_ALL_USERS_QUERY = 'SELECT * FROM users';

  connection.query(SELECT_ALL_USERS_QUERY, (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

// Rota para buscar um usuário por ID
app.get('/users/:id', (req, res) => {
  const { id } = req.params;
  const SELECT_USER_BY_ID_QUERY = `SELECT * FROM users WHERE id = ${id}`;

  connection.query(SELECT_USER_BY_ID_QUERY, (error, results) => {
    if (error) throw error;
    res.json(results[0]);
  });
});

// Rota para atualizar um usuário
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  const UPDATE_USER_QUERY = `UPDATE users SET name = '${name}', email = '${email}', password = '${password}' WHERE id = ${id}`;

  connection.query(UPDATE_USER_QUERY, (error, results) => {
    if (error) throw error;
    res.send('Usuário atualizado com sucesso!');
  });
});

// Rota para deletar um usuário
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  const DELETE_USER_QUERY = `DELETE FROM users WHERE id = ${id}`;

  connection.query(DELETE_USER_QUERY, (error, results) => {
    if (error) throw error;
    res.send('Usuário deletado com sucesso!');
  });
});

// Iniciando o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
