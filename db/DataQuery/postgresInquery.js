const { Client, pool } = require('pg');
const client = new Client({
  host: 'localhost',
  username: 'root',
  database: 'photos',
});

const getImagebyPostgres = (id, callback) => {
  client.connect();
  const newId = Number(id)
  const query = `SELECT * FROM images where listing_id=${newId};`
  client
    .query(query)
    .then((res) => {
      console.log('hit get',res.rows)
      callback(null, res.rows)
    })
    .catch(e => callback(e.stack));
}


const addImagebyPostgres = (options, callback) => {
  client.connect();
  let {image_id, url, description, user_submit, date, listing_id} = options;
  let data = [image_id, url, description, user_submit, date, listing_id]
  const query = 'INSERT INTO imagesuuid(image_id, url, description, user_submit, date, listing_id) VALUES($1,$2,$3,$4,$5,$6) RETURNING *';
  client
    .query(query, data)
    .then((res) => {
      // console.log('hit post',res)
      callback(null, res.rows[0])
    })
    .catch(e => callback(e.stack));
}


module.exports = {
  getImagebyPostgres,
  addImagebyPostgres
};