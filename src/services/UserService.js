/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-catch */
const User = require('../models/User')
const bcrypt = require('bcrypt')
class UserService {

  checkUserData = async(username, password) => {
    const user = await User.findOne({ username })

    // Nếu không tìm thấy người dùng, hoặc mật khẩu không khớp, trả về null
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return null
    }

    // Nếu mật khẩu khớp, trả về đối tượng người dùng
    return user
  }
  async findByEmail(email) {
    try {
      const user = await User.findOne({ email })
      return user
    } catch (error) {
      throw error
    }
  }

  // findById = async (id) => {
  //   try {
  //     const user = await User.findById(id);
  //     return user;
  //   } catch (error) {
  //     throw error;
  //   }
  // }
  findById = async (id) => {
    try {
      const user = await User.findById(id)
      return user || null // Trả về user nếu tìm thấy, hoặc null nếu không tìm thấy
    } catch (error) {
      throw error
    }
  }

  create = async (dataUser) => {
    try {
      //Goi den tang model
      const user = new User(dataUser)
      await user.save()
      return user
    } catch (error) {
      throw error
    }
  }
  update = async (id, data) => {
    try {
      // Goi den tang model
      const result = await User.updateOne({ _id: id }, data)
      return true
    } catch (error) {
      throw error
    }
  }
  //   update = async (id, data) => {
  //     try {
  //         // Sử dụng phương thức findByIdAndUpdate của model User để cập nhật thông tin người dùng
  //         const result = await User.findByIdAndUpdate(id, data);
  //         return result ? true : false; // Trả về true nếu cập nhật thành công, ngược lại trả về false
  //     } catch (error) {
  //         throw error; // Ném ngoại lệ để xử lý ở nơi gọi
  //     }
  // }

  detele = async (id) => {
    try {
      //Goi den tang model
      const user = await User.findById(id)
      // console.log(user)
      await user.deleteOne()
      return true
    } catch (error) {
      throw error
    }
  }

  getAll = async() => {
    try {
      const users = await User.find()
      return users
    } catch (error) {
      throw error
    }
  }

}
module.exports = new UserService()