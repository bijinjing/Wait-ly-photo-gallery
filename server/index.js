const newrelic = require('newrelic');
const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const db = require('../db/index.js');
const dbCassandra = require('../db/DataQuery/cassandraInquery.js');
const dbPostgres = require('../db/DataQuery/postgresInquery.js');
const uuidv4 = require('uuid/v4');
const redis = require('redis')
// const option = {
//   host:'52.8.132.146', 
//   port: 6379,
// }
const client = redis.createClient(6379, '52.8.132.146');
client.auth('Student111!')

const goRedis = (req, res, next) => {
  client.get(req.params.listing, (err, reply) => {
    if (err) throw err;
    if (reply !== null) {
      res.send(JSON.parse(reply));
    } else {
      next();
    }
  });
};


const app = express();
const port = 3001;
app.use(require('morgan')('tiny'));
app.locals.newrelic = newrelic;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(compression());
app.use(express.static('public'));
app.use('/:listing', express.static('public'));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

//get photo gallaries
app.get('/api/restaurants/:listing', (req, res) => {
  
  let params = req.params.listing;
  // db.getImagesFromListing(params, (error, images) => {
  //   if (error) { return error; }
  //   res.send(images);
  // });
  // console.log(params);
  //Cassandra
  // dbCassandra.getImagebyCassandra(params,(err, result) => {
  //   if(err) {return err}
  //   res.send(result)
  //   console.log(result)
  // })

  //Postgres
  dbPostgres.getImagebyPostgres(params,(err,result) => {
       if(err) {res.send(err)}
      //  client.set(JSON.stringify(params), JSON.stringify(result))
       res.send(result)
  })
});

//add listing and related photo gallaries
app.post('/api/restaurants/:listing', (req, res) => {  
  //data generated automatically
  let listing_id = req.params.listing;
  // let id = req.params.listing;
  let image_id = 100000001;
  let options = req.body;
  options.image_id = image_id;

  // for postgress
  options.listing_id = listing_id;
  dbPostgres.addImagebyPostgres(options,(err,result) => {
    if(err) {
      res.send(err)
    } else {
      res.send("succesful add")
      console.log(result)
    }
  })
  
  //for Cassandra
  // options.id = id;
  // dbCassandra.addImagebyCassandra(options,(err,result) => {
  //   if(err) {res.send(err)}
  //   res.send("succesful add")
  //   console.log(result)
  // })
});

//update an photo in a listing
app.put('/api/photos/:listing', (req, res) => {
  let image_id = req.params.listing;
  let options = req.body;
  options.image_id = image_id;

  dbPostgres.updateImagebyPostgres(options, (err,result) => {
    if(err) {
      res.send(err)
    } else {
      res.send("succesful update")
    }
  })

});

//delete listing and related photo gallaries
app.delete('/api/photos/:listing', (req, res) => {
  let image_id = req.params.listing;

  let option = {image_id};
  dbPostgres.deleteImagebyPostgres(option, (err,result) => {
    if(err) {
      res.send(err)
    } else {
      res.send("succesful delete")
    }
  })

});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));