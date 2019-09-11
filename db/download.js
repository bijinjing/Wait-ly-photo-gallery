
const download = require('image-downloader')

for (let i=1; i<=900; i++) {
  const options = {
    url: `https://loremflickr.com/g/526/526/resturant?num=${i}`,
    dest: `./db/photos/${i}.jpg`
  }

  download.image(options)
    .then(({ filename, image }) => {
      console.log('Saved to', filename)  // Saved to /path/to/dest/image.jpg
    })
    .catch((err) => console.error(err))
}







