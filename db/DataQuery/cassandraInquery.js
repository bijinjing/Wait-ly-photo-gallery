 const cassandra = require('cassandra-driver');
const Client = cassandra.Client;

const client = new Client({ contactPoints:['127.0.0.1'], localDataCenter:'datacenter1', keyspace:'photos' });

const getImagebyCassandra = (id, callback) => {
  const newId = Number(id)
  const query = 'select * from photos.listings_by_id where id = ?;';
  client.execute(query,[id],{ prepare : true, hints : ['int'] })
    .then((result) => {
      callback(null,result.rows);})
    .catch(err => callback(err))
};

const addImagebyCassandra = (options, callback) => {
  const query = 'Insert into photos.listings_by_id (id, restaurant_name, image_id, url, description, user_submit, date) values (?, ?, ?, ?, ?, ?, ?);';
  const {id, restaurant_name, image_id, url, description, user_submit, date} = options;
 
  const newId = Number(id);
  const param = [newId, restaurant_name, image_id, url, description, user_submit, date];
  client.execute(query,param,{ prepare : true, hints : ['int'] })
    .then((result) => {
      callback(null,result.rows);})
    .catch(err => callback(err))
};


module.exports = {
  getImagebyCassandra,
  addImagebyCassandra
};