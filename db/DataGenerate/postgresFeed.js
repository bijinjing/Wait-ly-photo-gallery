const { Client, pool } = require('pg');
const fs = require('fs');
const readline = require('readline');
const stream = require('stream');


client = new Client({
  host: 'localhost',
  username: 'root',
  database: 'photos',
});

client.connect();
const text = 'INSERT INTO oldListest(id, name, image_id, url, description, user_submit, date ) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *';

//change the file name if needed
const instream = fs.createReadStream('./test2.csv');
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
      console.log('hit post',res.rows[0])
    })
    .catch(e => console.error(e.stack));
});
