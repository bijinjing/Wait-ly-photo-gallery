const express = require('express');
const compression = require('compression')
const db = require('../db/index.js');
const dbCassandra = require('../db/DataQuery/cassandraInquery.js')

const app = express();
const port = 3001;

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

  db.getImagesFromListing(params, (error, images) => {
    if (error) { return error; }
    res.send(images);
  });

  //Cassandra
  dbCassandra.getImagebyCassandra(params,(err, result) => {
    if(err) {return err}
    res.send(result)
    console.log(result)
  })

});

//add listing and related photo gallaries
app.post('/api/restaurants', (req, res) => {
  console.log("successfully post")
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