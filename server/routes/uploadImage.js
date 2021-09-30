const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = require('../helpers/fileHelpers')
const passport = require('passport')
const passportConfig = require('../middlewares/passport')
const resize = require('../helpers/resizeImage')
const fs = require('fs')
const imageCtr = require('../controllers/imageBackground')
router.route('/').post(passport.authenticate('jwt', {
  session: false,
}), upload.single('avatar'), (req, res, next) => {
  res.status(200).json({ url: `${process.env.HOST_SERVER}/${req.file.path}` })
})


router.route('/get-all').get((req, res) => {
  const dir = 'assets/backgrounds'
  const files = fs.readdirSync(dir)
  const images = []
  let format
  res.type(`image/${format || 'png'}`)
  for (const file of files) {
    let nameFile = file + ''
    let image = resize(`assets/backgrounds/${nameFile}`, 'png', 400, 225).pipe()
  }

})
router.route('/get-background/:idImage').get((req, res, next) => {
  try {


    const dir = 'assets/backgrounds'
    const files = fs.readdirSync(dir)

    for (const file of files) {
      console.log(file)
    }
    /* const widthStr = req.body.width
    const heightStr = req.body.height
    const format = req.body.format
    const { idImage } = req.params
    let width, height
    if (widthStr) {
      width = parseInt(widthStr)
    }
    if (heightStr) {
      height = parseInt(heightStr)
    }
    console.log(width, height, format, idImage);
    res.type(`image/${format || 'png'}`)
    resize(`assets/backgrounds/${idImage}`, format, width, height).pipe(res) */
  } catch (error) {
    next(error)
  }
})
module.exports = router
