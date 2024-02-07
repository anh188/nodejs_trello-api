// src/controllers/AuthController

const jwt = require('jsonwebtoken')
const UserService = require('../services/UserService')
class AuthController {

  login = async (req, res, next) => {
    try {
      const { username, password } = req.body
      const user = await UserService.checkUserData(username, password)
      if (!user) {
        res.status(401).json({
          message:'Tài khoản hoặc mật khẩu không đúng'
        })
        return
      }
      // check username and password
      const token = jwt.sign({ username }, process.env.SECRET_KEY_JWT)
      res.status(200).json({
        token: token
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new AuthController()