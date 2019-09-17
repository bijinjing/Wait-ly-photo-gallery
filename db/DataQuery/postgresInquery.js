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
  let {url, description, user_submit, date, listing_id} = options;
  let data = [url, description, user_submit, date, listing_id]
  const query = 'INSERT INTO images(url, description, user_submit, date, listing_id) VALUES($1,$2,$3,$4,$5) RETURNING *';
  client
    .query(query, data)
    .then((res) => {
      callback(null, res.rows[0])
    })
    .catch(e => callback(e.stack));
}


const updateImagebyPostgres = (options, callback) => {
  client.connect();
  let {image_id, url, description, user_submit, date} = options;
  const old_image_id = Number(image_id);
  let data = [url, description, user_submit, date];
  const UpdateQuery = `UPDATE images SET url = $1, description = $2, user_submit = $3, date = $4 where image_id = ${old_image_id}`;
  client
    .query(UpdateQuery,data)
    . then((res) => {callback(null, res)})
    . catch(e => callback(e.stack))
}

// const deleteImagebyPostgres = (options, callback) => {
//   client.connect();
//   let {url, description, user_submit, date, listing_id} = options;
//   let data = [url, description, user_submit, date, listing_id]
//   const query = 'INSERT INTO images(url, description, user_submit, date, listing_id) VALUES($1,$2,$3,$4,$5) RETURNING *';
//   client
//     .query(query, data)
//     .then((res) => {
//       callback(null, res.rows[0])
//     })
//     .catch(e => callback(e.stack));
// }

module.exports = {
  getImagebyPostgres,
  addImagebyPostgres,
  updateImagebyPostgres
};