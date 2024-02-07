const BoardList = require('../models/BoardList')
const BoardListService = require('../services/BoardListService')
const CardService = require('../services/CardService')
class BoardListController {
  getAll = async(req, res, next ) => {
    try {
      const { boardId } = req.params
      //sắp xếp theo trường position tăng dần/asc:ascending
      const lists = await BoardList.find({ boardId }).sort({ position: 'asc' })
      res.status(200).json({ lists })
    } catch (error) {
      next(error)
    }
  }

  create = async (req, res, next) => {
    try {
      const { title, position }= req.body
      const boardId = req.body.boardId
      let data = {
        title, position, boardId
      }
      const boardlist = await BoardList.create(data)
      res.status(200).json({
        boardlist
      })
    } catch (error) {
      next(error)
    }
  }

  update= async (req, res, next) => {
    try {
      const { title, position } = req.body
      const { listId } = req.params
      const data = { title, position }
      const existingBoard = await BoardListService.findById(listId)
      if (!existingBoard) {
        return res.status(400).json({ error: 'List không tồn tại' })
      }
      const result = await BoardListService.update(listId, data)
      if (result) {
        res.status(200).json({ msg: 'Sửa List thành công', boardlist:existingBoard })
      } else {
        throw new Error('Sửa List thất bại')
      }
    } catch (error) {
      next(error)
    }
  }

  delete = async(req, res, next) => {
    try {
      const { listId } = req.params
      await CardService.deleteCardsByListId(listId)
      const existingBoard = await BoardListService.findById(listId)
      if (!existingBoard) {
        return res.status(400).json({ error: 'List không tồn tại' })
      }
      const result = await BoardListService.delete(listId)
      if (result) {
        res.status(200).json({ msg: 'Xóa List thành công', boardlist:existingBoard })
      } else {
        throw new Error('Xóa List thất bại')
      }
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new BoardListController()