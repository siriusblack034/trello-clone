const fs = require('fs')
const resize = require('../helpers/resizeImage')
const getAllBackground = (req, res, next) => {
  const dir = 'assets/backgrounds'
  const files = fs.readdirSync(dir)
  const images = []
  let format
  res.type(`image/${format || 'png'}`)
  for (const file of files) {
    let image = resize(`assets/backgrounds/${file}`, 'png', 400, 225).pipe(res)
    resize().pipe()
    images.push(image)
  }
  return res.status(200).json(images)
}
module.exports = { getAllBackground }