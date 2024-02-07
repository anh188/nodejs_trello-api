const express = require('express')
const router = express.Router()
const userRouter = require('./userRoutes')
const boardRouter = require('./boardRoutes')
const boardlistRouter = require('./boardListRoutes')
const cardRouter =require('./cardRoutes')
const authRouter = require('./authRoutes')

router.get('/status', (req, res) => {
  res.status(200).json({ msg:'API are ready !' })
})


router.use('/users', userRouter)
router.use('/auth', authRouter)
router.use('/boards', boardRouter)
router.use('/:boardId', boardlistRouter)
router.use('/cards', cardRouter)

module.exports = router