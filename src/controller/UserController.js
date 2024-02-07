const UserService = require('../services/UserService')
const bcrypt = require('bcrypt')
class UserController {

  create = async(req, res, next) => {
    try {
      const { username, password, email, phone, age } = req.body
      // Kiểm tra xem email đã tồn tại trong cơ sở dữ liệu hay chưa
      const existingUser = await UserService.findByEmail(email)
      if (existingUser) {
        // Nếu email đã tồn tại, trả về một lỗi
        return res.status(400).json({ error: 'Email đã tồn tại' })
      }

      let data ={
        username, password, email, phone, age
      }
      const user = await UserService.create(data)
      const responseData = {
        username: user.username,
        email: user.email,
        phone: user.phone,
        age: user.age
      }

      res.status(200).json({
        user: responseData
      })
    } catch (error) {
      next(error)
    }
  }

  getAll= async (req, res, next) => {
    try {
      //Goi den service
      const users = await UserService.getAll()
      res.status(200).json({
        users
      })
    } catch (error) {
      next(error)
    }
  }

  update = async (req, res, next) => {
    try {
      const { username, password, email, phone, age } = req.body
      const { id } = req.params
      const existingUser = await UserService.findById(id)
      if (!existingUser) {
        // Nếu email đã tồn tại, trả về một lỗi
        res.status(400).json({ error: 'User không tồn tại' })
      }
      let data = { username, email, phone, age }

      // Kiểm tra xem mật khẩu mới đã được cung cấp chưa
      if (password) {
        // Tạo salt mới
        const salt = await bcrypt.genSalt(10)

        // Mã hóa mật khẩu mới với salt
        const hashedPassword = await bcrypt.hash(password, salt)

        // Thêm mật khẩu mới đã mã hóa vào đối tượng dữ liệu
        data.password = hashedPassword
      }

      const result = await UserService.update(id, data)

      if (result) {
        const updatedUser = await UserService.findById(id)
        res.status(200).json({ user: updatedUser })
      } else {
        throw new Error('Update fail')
      }
    } catch (error) {
      next(error)
    }
  }

  delete = async (req, res, next) => {
    try {
      const { id } = req.params
      //Goi den service
      const result = await UserService.detele(id)

      if (result) {
        res.status(200).json({ 'msg' : 'Deleted' })
      } else {
        throw new Error('Delete fail')
      }
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new UserController()