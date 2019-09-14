const { Client, pool } = require('pg');


client = new Client({
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
    .then(result => {
      console.log('hit post',res.rows[0])
    })
    .catch(e => console.error(e.stack));
}


