// models/User.js
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type:String, require:true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, min: 18 },
  phone: { type: String, required:true }
})

userSchema.pre('save', async function (next) {
  try {
    // Kiểm tra xem mật khẩu đã được thay đổi hay chưa
    if (!this.isModified('password')) {
      return next()
    }

    // Tạo salt để thêm vào mật khẩu
    const salt = await bcrypt.genSalt(10)

    // Mã hóa mật khẩu với salt
    const hashedPassword = await bcrypt.hash(this.password, salt)

    // Gán mật khẩu đã mã hóa vào trường password
    this.password = hashedPassword

    next()
  } catch (error) {
    return next(error)
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User