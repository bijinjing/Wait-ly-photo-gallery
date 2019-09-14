const { Client, pool } = require('pg');
const client = new Client({
  host: 'localhost',
  username: 'root',
  database: 'photos',
});

const getImagebyPostgres = (id, callback) => {
  client.connect();
  const newId = Number(id)
  const query = 'SELECT * FROM photos where id=?';
  client
    .query(query, [id])
    .then((res) => {
      console.log('hit post',res.rows[0])
      callback(null, res.rows)
    })
    .catch(e => callback(e.stack));
}


module.exports = {
  getImagebyPostgres
};