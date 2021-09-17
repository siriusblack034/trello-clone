const multer = require('multer')
const { v4: uuidv4 } = require('uuid');
const fileFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    req.fileValidationError = 'Only image files are allowed!';
    return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
}
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploadsImage/')
  },
  filename: (req, file, cb) => {
    cb(null, uuidv4() + file.originalname)
  }
})
const upload = multer({
  storage: storage, limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter
})
module.exports = upload