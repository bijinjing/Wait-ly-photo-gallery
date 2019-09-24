const { Client, pool } = require('pg');
const fs = require('fs');
const readline = require('readline');
const stream = require('stream');


client = new Client({
  // host: 'localhost',
  username: 'ubuntu',
  database: 'photos',
});

client.connect()
.then(() => {
  console.log('db is connected')
})
.catch((err) => {
  console.log(err)
})
//update url;
// const selectQuery = 'SELECT url from images where listing_id = $1';
// const updateQuery = 'UPDATE images SET url = $1 where image_id = $2';
// const updateURL = async() => {
//   for(let id=9577366; id<= 100000000; id++){
//       // .query(selectQuery,[id])
//       // .then(res => {
//       //   let newURLArray = res.rows[0].url.split('/');
//       //   let length = newURLArray.length;
//       //   let newURL = newURLArray[length-1].split('.')[0];
//         // console.log('hit post',newURL)
//   let newURL = Math.floor(Math.random() * 901).toString();
//   await client
//     .query(updateQuery,[newURL,id])
//     .then(res => {
//     })
//     .catch(e => console.error(e.stack));
//   // })
//   // .catch(e => console.error(e.stack));
//   }
//   await console.log('complete')
// }

// updateURL()

//change the file name if needed
const text = 'INSERT INTO images(url, description, user_submit, date, listing_id ) VALUES($1,$2,$3,$4,$5) RETURNING *';

//change the file name if needed
const instream = fs.createReadStream('./AWSnewfile.csv');
const outstream = new stream;
outstream.readable = true;
outstream.writable = true;

const rl = readline.createInterface({
  input: instream,
  output: outstream,
  terminal: false
});


rl.on('line', (line) => {
  let data = line.split(',');
  client
  .query(text, data)
  .then(res => {
    // console.log('hit post',res.rows[0])
  })
  .catch(e => console.error(e.stack));
});
                  
