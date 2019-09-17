const fs = require('fs');
const faker = require('faker');
const uuidv4 = require('uuid/v4');

const gallaryGenerator = (restaurantId,imageId) => {

  // let image_id = (restaurantId-1) * 10 + imageId;
  //use uuid
  let image_id = uuidv4();
  let index = Math.floor(Math.random() * 901);
  let url = `https://jinjing-photo-gallery.s3-us-west-1.amazonaws.com/photos/${index}.jpg`;
  let description = faker.lorem.words();
      description = description.split(' ');
      description = description.map(word => word[0].toUpperCase() + word.substr(1));
      description = description.join(' ');
  let user_submit = faker.random.boolean();
  let date = faker.date.past();

  return `${image_id}, ${url}, ${description}, ${user_submit}, ${date}`
}

const restaurantGenerator = (restaurantId) => {
  let id = restaurantId;
  let restaurant_name = faker.lorem.words();
  let record = '';
  for (var i=1; i<=10; i++) {
    let imageDetail = gallaryGenerator(restaurantId,i);
    record += `${id},${restaurant_name},${imageDetail}\n`
  }
  return record;
}

const write = (writer,data) => {
  return new Promise((resolve) => {
    if (!writer.write(data)) {
      writer.once('drain', resolve)
    } else {
      resolve()
    }
  })
}

const generator = async(path, num, iterator) => {
  let writelistings = fs.createWriteStream(path);
  for(let i=1; i<=num; i++){
    await write(writelistings, iterator(i))
  }
  await console.log('complete',path)
}

generator('./testforUUID.csv',10,restaurantGenerator)