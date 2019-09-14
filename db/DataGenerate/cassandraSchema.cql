CREATE KEYSPACE listings_by_id WITH replication = {'class': 'SimpleStrategy', 'replication_factor' : 1} AND durable_writes='true' ;

CREATE TABLE photos.listings_by_id (
  id int,
  restaurant_name text,
  image_id int,
  url text,
  description text,
  user_submit boolean,
  date text,
  PRIMARY KEY (id, image_id)
);


-- COPY listings_by_id (id, restaurant_name, image_id, url, description, user_submit, date) FROM './listing.csv' WITH HEADER = true;id, restaurant_name, image_id, url, description, user_submit, date] FROM './test.csv' WITH HEADER = true;
