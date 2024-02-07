const express = require ('express')
const router = express.Router()
const CardController = require('../../controller/CardController')
// const {uploadcardcover,uploadattachments} = require('../../middlewares/upload');
const { uploadcard } = require('../../middlewares/upload')
const Joi = require('joi')
const cardValidationSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string(),
  members: Joi.array().items(Joi.string()),
  dueDate: Joi.date(),
  cover: Joi.string(),
  attachments: Joi.array().items(Joi.string()),
  listId: Joi.string().required()
})

// Middleware kiểm tra và xác thực dữ liệu
const validateCardData = (req, res, next) => {
  const { error, value } = cardValidationSchema.validate(req.body, { abortEarly: false })
  // console.log(error)
  if (error) {
    const errorMessages = error.details.map((detail) => detail.message)
    return res.status(400).json({ errors: errorMessages })
  }

  // Dữ liệu hợp lệ, gán lại vào req.body và chuyển đến middleware tiếp theo hoặc xử lý logic
  req.body = value
  next()
}

router.post('/', uploadcard.fields([{ name: 'cover' }, { name: 'attachments' }]), CardController.createCard)
router.put('/:cardId', validateCardData, uploadcard.fields([{ name: 'cover' }, { name: 'attachments' }]), CardController.updateCard)
router.delete('/:cardId', CardController.deleteCard)
router.get('/:listId', CardController.getCard)
router.get('/:cardId', CardController.getCardById)
module.exports=router