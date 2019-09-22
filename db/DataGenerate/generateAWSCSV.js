const fs = require('fs');
const faker = require('faker');
const gallaryGenerator = (restaurantId,imageId) => {
  let image_id = (restaurantId-1) * 10 + imageId;
  let index = Math.floor(Math.random() * 901);
  let url = index.toString();
  let description = faker.lorem.words();
      description = description.split(' ');
      description = description.map(word => word[0].toUpperCase() + word.substr(1));
      description = description.join(' ');
  let user_submit = faker.random.boolean();
  let date = faker.date.past().toString();
      date = date.split(' ');
      date = date[1] +' '+ date[2] + ' ' + date[3];

  return ` ${image_id},${url}, ${description}, ${user_submit}, ${date}`
}

const restaurantGenerator = (restaurantId) => {
  let id = restaurantId;
  let record = '';
  for (var i=1; i<=10; i++) {
    let imageDetail = gallaryGenerator(restaurantId,i);
    record += `${imageDetail},${id}\n`
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

generator('./AWSnewfile.csv',10000000,restaurantGenerator)