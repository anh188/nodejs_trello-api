const BoardList = require('../models/BoardList')
const BoardListService = require('../services/BoardListService')

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
      const result = await BoardListService.update(listId, data)
      if (result) {
        res.status(200).json({ msg: 'Updated' })
      } else {
        throw new Error('Update failed')
      }
    } catch (error) {
      next(error)
    }
  }

  delete = async(req, res, next) => {
    try {
      const { listId } = req.params
      const result = await BoardListService.delete(listId)
      if (result) {
        res.status(200).json({ msg: 'List deleted' })
      } else {
        throw new Error('List deletion failed')
      }
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new BoardListController()