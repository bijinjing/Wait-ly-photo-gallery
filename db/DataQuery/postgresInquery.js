const { Client, Pool } = require('pg');
/* use pool */
const pool = new Pool({
  host: '54.153.89.1',
  username: 'ubuntu',
  password:'Student111!',
  database: 'photos',
  port:5432
});

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})


const getImagebyPostgres = (id, callback) => {
  pool
    .connect()
    .then(client => {
      const newId = Number(id)
      const query = `SELECT * FROM images where listing_id=${newId};`
      client
        .query(query)
        .then((res) => {
          callback(null, res.rows)
        })
        .catch(e => callback(e.stack));
        client.release()
    })
}

const addImagebyPostgres = (options, callback) => {
  pool
    .connect()
    .then(client => {
      let {url, description, user_submit, date, listing_id} = options;
      let data = [url, description, user_submit, date, listing_id]
      const query = 'INSERT INTO images(url, description, user_submit, date, listing_id) VALUES($1,$2,$3,$4,$5) RETURNING *';
      return client
              .query(query, data)
              .then((res) => {
                callback(null, res.rows[0])
                client.release()
              })
              .catch(e => {
                callback(e.stack)
                client.release()});
    })
}


const updateImagebyPostgres = (options, callback) => {
  pool
  .connect()
  .then(client => {
    let {image_id, url, description, user_submit, date} = options;
    const old_image_id = Number(image_id);
    let data = [url, description, user_submit, date];
    const query = `UPDATE images SET url = $1, description = $2, user_submit = $3, date = $4 where image_id = ${old_image_id}`;
      return client
        .query(query,data)
        . then((res) => {
          callback(null, res);
          client.release()
        })
        . catch(e => 
          {callback(e.stack)
          client.release()})
        
  })
}

const deleteImagebyPostgres = (option, callback) => {
  pool
  .connect()
  .then(client => {
    let {image_id} = option;
    let number_image_id = Number(image_id)
    const query = `DELETE FROM images where image_id = ${number_image_id}`;
    return client
      .query(query)
      .then((res) => {
        callback(null, res.rows[0])
        client.release()
      })
      .catch(e => {
        callback(e.stack);
        client.release()
      });
  
  })
}

module.exports = {
  getImagebyPostgres,
  addImagebyPostgres,
  updateImagebyPostgres,
  deleteImagebyPostgres
};


/* use client*/
// const addImagebyPostgres = (options, callback) => {
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

// const getImagebyPostgres = (id, callback) => {
//   client.connect();
//   const newId = Number(id)
//   const query = `SELECT * FROM images where listing_id=${newId};`
//   client
//     .query(query)
//     .then((res) => {
//       console.log('hit get',res.rows)
//       callback(null, res.rows)
//     })
//     .catch(e => callback(e.stack));
// }

// const updateImagebyPostgres = (options, callback) => {
//   client.connect();
//   let {image_id, url, description, user_submit, date} = options;
//   const old_image_id = Number(image_id);
//   let data = [url, description, user_submit, date];
//   const query = `UPDATE images SET url = $1, description = $2, user_submit = $3, date = $4 where image_id = ${old_image_id}`;
//   client
//   .query(query,data)
//   . then((res) => {callback(null, res)})
//   . catch(e => callback(e.stack))
// }

// const deleteImagebyPostgres = (option, callback) => {
//   client.connect();
//   let {image_id} = option;
//   let number_image_id = Number(image_id)
//   const query = `DELETE FROM images where image_id = ${number_image_id}`;
//   client
//   .query(query)
//   .then((res) => {
//     callback(null, res.rows[0])
//   })
//   .catch(e => callback(e.stack));
// }