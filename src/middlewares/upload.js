
const path = require('path')
const multer = require('multer')

//boardcover
const boardstorage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/board/')
  },
  filename: function(req, file, cb) {
    let ext = path.extname(file.originalname)
    cb(null, Date .now()+ext)
  }
})

const upload = multer ({
  storage: boardstorage,
  fileFilter: function(req, file, callback) {
    if (
      file.mimetype == 'image/png' ||
      file.mimetype == 'image/jpg' ||
      file.mimetype == 'image/jpeg' || // Thêm định dạng JPEG
      file.mimetype == 'image/webp'
    ) {
      callback(null, true)
    } else {
      // console.log('only...')
      callback(null, false)
    }
  },
  limits:{
    fileSize: 1024 * 1024 *5
    // fileSize: Infinity // hoặc không đặt giá trị
  }
})

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const folder = file.fieldname === 'cover' ? 'uploads/covers/' : 'uploads/attachments/'
    cb(null, folder)
  },
  filename: function (req, file, cb) {
    let ext = path.extname(file.originalname)
    cb(null, Date.now() + ext)
  }
})

const uploadcard = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    if (file.fieldname === 'cover') {

      if (['image/png', 'image/jpg', 'image/jpeg', 'image/webp'].includes(file.mimetype)) {
        callback(null, true)
      } else {
        callback(null, false)
      }
    } else if (file.fieldname === 'attachments') {

      if (
        ['image/png',
          'image/bmp',
          'image/jpg',
          'image/jpeg',
          'image/webp',
          'image/tiff',
          'image/x-icon',
          'image/gif',
          'video/asf',
          'text/plain',
          'application/pdf',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.template',
          'application/vnd.ms-word.document.macroEnabled.12',
          'application/vnd.ms-word.template.macroEnabled.12',
          'application/vnd.ms-excel',
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'application/vnd.openxmlformats-officedocument.spreadsheetml.template',
          'application/vnd.ms-excel.sheet.macroEnabled.12',
          'application/vnd.ms-excel.template.macroEnabled.12',
          'application/vnd.ms-excel.addin.macroEnabled.12',
          'application/vnd.ms-excel.sheet.binary.macroEnabled.12',
          'application/vnd.ms-powerpoint',
          'application/vnd.openxmlformats-officedocument.presentationml.presentation',
          'application/vnd.openxmlformats-officedocument.presentationml.template',
          'application/vnd.openxmlformats-officedocument.presentationml.slideshow',
          'application/vnd.ms-powerpoint.addin.macroEnabled.12',
          'application/vnd.ms-powerpoint.presentation.macroEnabled.12',
          'application/vnd.ms-powerpoint.template.macroEnabled.12',
          'application/vnd.ms-powerpoint.slideshow.macroEnabled.12',
          'application/vnd.ms-access'].includes(file.mimetype)
      ) {
        callback(null, true)
      } else {
        callback(null, false)
      }
    } else {

      callback(new Error('Unexpected field'))
    }
  },
  limits: {
    fileSize: Infinity // or set a specific file size limit
  }
})

module.exports = { upload, uploadcard }


