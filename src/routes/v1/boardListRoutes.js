const express = require('express')
const router = express.Router()
// const Joi = require('joi');
const Joi = require('joi')

const boardListController = require('../../controller/BoardListController')

const boardListValidationSchema = Joi.object({
  title: Joi.string().required(),
  position: Joi.number(),
  boardId: Joi.string().required()
})


const validateBoardListData = (req, res, next) => {
  const { error, value } = boardListValidationSchema.validate(req.body, { abortEarly: false })
  // console.log(error)
  if (error) {
    const errorMessages = error.details.map((detail) => detail.message)
    return res.status(400).json({ errors: errorMessages })
  }
  req.body = value
  next()
}

// // Định nghĩa API để tạo mới một danh sách trong bảng
router.post('/lists', validateBoardListData, boardListController.create)
router.put('/lists/:listId', boardListController.update)
router.delete('/lists/:listId', boardListController.delete)
router.get('/:boardId/lists', boardListController.getAll)

module.exports = router