const express = require('express')
const router = express.Router()
const userController = require('../../controller/UserController')
// eslint-disable-next-line no-unused-vars
const verifyToken = require('../../middlewares/verifyToken')
const Joi = require('joi')

const userValidationSchema = Joi.object({
  username: Joi.string().alphanum().required().messages({
    // eslint-disable-next-line quotes
    'any.required': `"username" không được bỏ trống !`
  }),
  password: Joi.string().min(6).required(),
  email: Joi.string().email().required(),
  age: Joi.number().min(18).required(),
  phone: Joi.string().min(10).max(10).required()
})

// Middleware kiểm tra và xác thực dữ liệu
const validateUserData = (req, res, next) => {
  const { error, value } = userValidationSchema.validate(req.body, { abortEarly: false })
  // console.log(error)
  if (error) {
    const errorMessages = error.details.map((detail) => detail.message)
    return res.status(400).json({ errors: errorMessages })
  }

  // Dữ liệu hợp lệ, gán lại vào req.body và chuyển đến middleware tiếp theo hoặc xử lý logic
  req.body = value
  next()
}
// router.post('/', userController.create);

router.post('/', validateUserData, userController.create)
router.get('/', userController.getAll)
router.put('/:id', userController.update)
router.delete('/:id', userController.delete)

module.exports = router