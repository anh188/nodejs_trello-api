const express = require('express')
const router = express.Router()
const boardController = require('../../controller/BoardController')
// const boardListRouter = require('../v1/boardListRoutes');
const verifyToken = require('../../middlewares/verifyToken')
const { upload } = require('../../middlewares/upload')
const Joi = require('joi')

const boardValidationSchema = Joi.object({
  title: Joi.string().required(),
  cover: Joi.string()
})

// eslint-disable-next-line no-unused-vars
const validateBoardData = (req, res, next) => {
  const { error, value } = boardValidationSchema.validate(req.body, { abortEarly: false })
  // console.log(error)
  if (error) {
    const errorMessages = error.details.map((detail) => detail.message)
    return res.status(400).json({ errors: errorMessages })
  }

  // Dữ liệu hợp lệ, gán lại vào req.body và chuyển đến middleware tiếp theo hoặc xử lý logic
  req.body = value
  next()
}
// const base64EncodeMiddleware = require('../../middlewares/ul');


router.post('/', upload.single('cover'), boardController.create)
// router.post('/', boardController.create);
router.get('/', verifyToken, boardController.getAll)
router.put('/:id', verifyToken, upload.single('cover'), boardController.update)
router.delete('/:id', verifyToken, boardController.delete)

module.exports = router