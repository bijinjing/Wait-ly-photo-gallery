psql -U root;
CREATE DATABASE photos WHERE NOT EXISTS;
GRANT ALL PRIVILEGES ON DATABASE photos TO root;

\CONNECT photos;
/* \c photos;*/

CREATE TABLE oldList (
  id integer,
  restaurant_name varchar(100) NOT NULL,
  image_id integer PRIMARY KEY,
  url varchar(2083) NOT NULL,
  description varchar(255),
  user_submit boolean,
  date varchar(2083)
);

-- COPY oldList (id, restaurant_name, image_id, url, description, user_submit, date) FROM '/Users/jinjing/SDC/Banner-Gallery/listing.csv'DELIMITER ',' CSV HEADER;

CREATE TABLE listings (
   id serial PRIMARY KEY,
   restaurant_name varchar(100) NOT NULL
);
-- \COPY listings (id, restaurant_name) FROM 'listings.csv'DELIMITER ',' CSV HEADER;


CREATE TABLE images (
   image_id serial PRIMARY KEY,
   url varchar(2083) NOT NULL,
   description varchar(255),
   user_submit boolean,
   date varchar(2083) ,
   listing_id int NOT NULL,
   FOREIGN KEY (listing_id) REFERENCES listings(id)
);
-- \COPY images (image_id, url, description, user_submit, date, listing_id) FROM 'images.csv'DELIMITER ',' CSV HEADER;

INSERT INTO listings select distinct id, restaurant_name from oldList ORDER BY id;
INSERT INTO images select image_id, url, description, user_submit, date, id from oldList ORDER BY image_id;

/*test*/
CREATE TABLE oldListestUUID (
   id integer,
   name varchar(2083) NOT NULL,
   image_id UUID PRIMARY KEY,
   url varchar(2083) NOT NULL,
   description varchar(255),
   user_submit boolean,
   date varchar(2083)
);

CREATE TABLE listingsUUID (
   id integer PRIMARY KEY,
   restaurant_name varchar(100) NOT NULL
);

CREATE TABLE imagesUUID (
   image_id UUID PRIMARY KEY,
   url varchar(2083) NOT NULL,
   description varchar(255),
   user_submit boolean,
   date varchar(2083) ,
   listing_id int NOT NULL,
   FOREIGN KEY (listing_id) REFERENCES listings(id)
);

INSERT INTO listingsUUID select distinct id, restaurant_name from oldListestUUID ORDER BY id;
INSERT INTO imagesUUID select image_id, url, description, user_submit, date, id from oldListestUUID ORDER BY image_id;



