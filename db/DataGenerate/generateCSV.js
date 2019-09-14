const fs = require('fs');
const faker = require('faker');


const write = (writer) => {
  return new Promise((resolve) => {
    if (!writer.write(data)) {
      writer.once('drain', resolve)
    }
    else {
      resolve()
    }
  })
}

const generator = async(path, num, iterator) => {
  let writelistings = fs.createWriteStream(path);
  let readinglisting = fs.read
      await write(writelistings, iterator(i))
  await console.log('complete',path)
}