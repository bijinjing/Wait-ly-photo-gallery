const { Client, pool } = require('pg');
const fs = require('fs');


client = new Client({
  host: 'localhost',
  username: 'root',
  database: 'photos',
});

client.connect();
const text = 'INSERT INTO oldListest(id, restaurant_name, image_id, url, description, user_submit, date) VALUES(?,?,?,?,?,?,?) RETURNING *';

const read = (reader,data) => {
  return new Promise((resolve) => {
    if (!reader.read(data)) {
      reader.once('drain', resolve)
    } else {
      resolve()
    }
  })
}

const addData = (data)=> {
  client
    .query(text, data)
    .then(res => {
      console.log(res.rows[0])
    })
    .catch(e => console.error(e.stack))
}

const seedor = async(path, iterator) => {
  let readingFile = fs.createReadStream(path);
    await read(readingFile, iterator(data))
  await console.log('complete',path)
}


// const query = {
//   text: 'SELECT $1::text as first_name, select $2::text as last_name',
//   values: ['Brian', 'Carlson'],
//   rowMode: 'array',
// };

// client
//   .query(query)
//   .then(res => {
//     console.log(res.fields.map(f => field.name)) // ['first_name', 'last_name']
//     console.log(res.rows[0]) // ['Brian', 'Carlson']
//   })
//   .catch(e => console.error(e.stack))