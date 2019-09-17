const express = require('express');
const compression = require('compression');
var bodyParser = require('body-parser');
const db = require('../db/index.js');
const dbCassandra = require('../db/DataQuery/cassandraInquery.js');
const dbPostgres = require('../db/DataQuery/postgresInquery.js');
const uuidv4 = require('uuid/v4');

const app = express();
const port = 3001;

app.use(bodyParser.urlencoded({ extended: false }))
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
       res.send(result)
       console.log(result)
  })
});

//add listing and related photo gallaries
app.post('/api/restaurants/:listing', (req, res) => {  
  //data generated automatically
  let listing_id = req.params.listing;
  let id = req.params.listing;
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
  console.log("successfully put")
});

//delete listing and related photo gallaries
app.delete('/api/restaurants/:listing', (req, res) => {
  console.log("successfully delete")
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));