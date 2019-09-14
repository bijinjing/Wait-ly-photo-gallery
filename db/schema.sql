DROP DATABASE IF EXISTS banner_images;

CREATE DATABASE banner_images;

USE banner_images;

CREATE TABLE listings (
  id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  listings varchar(5) NOT NULL
);

CREATE TABLE images (
  id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  url varchar(2083) NOT NULL UNIQUE,
  description varchar(255),
  user_submit boolean,
  date date,
);

CREATE TABLE listings_images (
  id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  listing_id int NOT NULL,
  image_id int NOT NULL,
  FOREIGN KEY (listing_id) REFERENCES listings(id),
  FOREIGN KEY (image_id) REFERENCES images(id)
)