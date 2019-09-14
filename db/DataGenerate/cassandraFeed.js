const cassandra = require('cassandra-driver');
const Client = cassandra.Client;

const client = new Client({ contactPoints:['127.0.0.1'], localDataCenter:'datacenter1', keyspace:'photos' });

const getImage = (id, callback) => {
  const query = 'select * from photos.listings_by_id where id = 8;';
  client.execute(query,[id])
    .then(result => console.log('result:',result.rows))
    .then(console.log('done'))

}
