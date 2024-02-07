const BoardService = require('../services/BoardService')
class BoardController {

  create = async(req, res, next) => {
    try {
      const { title, cover } = req.body
      //Goi den service
      let data ={
        title,
        cover: req.file ? req.file.path: cover
      }
      const board = await BoardService.create(data)
      res.status(200).json({
        board
      })
    } catch (error) {
      next(error)
    }
  }

  getAll = async(_req, res, next ) => {
    try {
      const boards = await BoardService.getAll()
      res.status(200).json({
        boards
      })
    } catch (error) {
      next(error)
    }
  }

  update = async(req, res, next ) => {
    try {
      const { title, cover } = req.body
      const { id } = req.params
      let data ={
        title,
        cover: req.file ? req.file.path: cover
      }
      const result =await BoardService.update(id, data)
      if (result) {
        res.status(200).json({
          'msg':'Updated'
        })
      } else {
        throw new Error('Update fail')
      }
    } catch (error) {
      next(error)
    }
  }

  delete = async (req, res, next ) => {
    try {
      const { id } = req.params
      const result = await BoardService.delete(id)
      if (result) {
        res.status(200).json({ 'msg':'Deleted' })
      } else {
        throw new Error('Delete fail')
      }
    } catch (error) {
      next(error)
    }
  }

}

module.exports = new BoardController()