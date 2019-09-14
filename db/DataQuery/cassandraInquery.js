const cassandra = require('cassandra-driver');
const Client = cassandra.Client;

const client = new Client({ contactPoints:['127.0.0.1'], localDataCenter:'datacenter1', keyspace:'photos' });

const getImagebyCassandra = (id, callback) => {
  const newId = Number(id)
  const query = 'select * from photos.listings_by_id where id = ?;';
  client.execute(query,[id],{ prepare : true, hints : ['int'] })
    .then((result) => {
      callback(null,result.rows);
      console.log('succesful get data')})
    .catch(err => callback(err))
}

module.exports = {
  getImagebyCassandra
};