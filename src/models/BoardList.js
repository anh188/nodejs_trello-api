const mongoose = require ('mongoose')
const boardListSchema = new mongoose.Schema({
  title:{ type: String, require: true },
  createdAt:{ type: Date, default: Date.now },
  position: { type: Number },
  boardId :{ type: mongoose.Schema.Types.ObjectId, ref:'Board', require:true }
})

boardListSchema.pre('save', async function (next) {
  try {
    if (!this.isNew) {
      // Chỉ sinh position khi tạo mới
      return next()
    }

    const lastList = await this.constructor.findOne({ boardId: this.boardId }).sort({ position: -1 })

    if (lastList) {
      this.position = lastList.position + 1
    } else {
      // Nếu không có danh sách trước đó, đặt position là 1
      this.position = 1
    }

    return next()
  } catch (error) {
    return next(error)
  }
})

const BoardList = mongoose.model('BoardList', boardListSchema)

module.exports= BoardList
