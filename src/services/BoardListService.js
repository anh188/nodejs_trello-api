/* eslint-disable no-useless-catch */
const BoardList = require('../models/BoardList')

class BoardListService {

  getAll= async() => {
    try {
      const boardlist = await BoardList.find()
      return boardlist
    } catch (error) {
      throw error
    }
  }

  create = async (dataBoardList) => {
    try {
      const boardlist = new BoardList(dataBoardList)
      await boardlist.save()
      return boardlist
    } catch (error) {
      throw error
    }
  }

  update = async(listId, data) => {
    try {
      const existingList = await BoardList.findById(listId)

      if (!existingList) {
        throw new Error('List not found')
      }

      // Kiểm tra xem vị trí có đang được cập nhật không
      if (data.position !== undefined && data.position !== existingList.position) {
        // Hoán đổi vị trí với danh sách khác
        const otherList = await BoardList.findOne({ boardId: existingList.boardId, position: data.position })

        if (otherList) {
          // sắp xếp theo position
          const tempPosition = existingList.position
          existingList.position = otherList.position
          otherList.position = tempPosition

          // lưu thay đổi
          await existingList.save()
          await otherList.save()
        }
      }

      // cập nhật các thay đổi khác
      existingList.title = data.title || existingList.title
      await existingList.save()
      return true
    } catch (error) {
      throw error
    }
  }

  delete = async (listId) => {
    try {
      const deletedList = await BoardList.findByIdAndDelete(listId)
      if (!deletedList) {
        throw new Error('List not found.')
      }

      const remainingLists = await BoardList.find({ boardId: deletedList.boardId, position: { $gt: deletedList.position } })

      // Giảm vị trí của danh sách sau danh sách đã xóa
      for (const list of remainingLists) {
        list.position -= 1
        await list.save()
      }

      return true
    } catch (error) {
      throw error
    }
  }

}

module.exports = new BoardListService()
