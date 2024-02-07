const BoardService = require('../services/BoardService')
// const cover = require('base64-js')
// const fs = require('fs');

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
      const existingBoard = await BoardService.findById(id)
      if (!existingBoard) {
        return res.status(400).json({ error: 'Board không tồn tại' })
      }
      let data ={
        title,
        cover: req.file ? req.file.path: cover
      }
      const updatedBoard = await BoardService.update(id, data)
      const result =await BoardService.update(id, data)
      if (result) {
        existingBoard
        res.status(200).json({
          'msg':'Sửa Board thành công', board: updatedBoard
        })
      } else {
        throw new Error('Sửa Board thất bại')
      }
    } catch (error) {
      next(error)
    }
  }

  delete = async (req, res, next ) => {
    try {
      const { id } = req.params
      const existingBoard = await BoardService.findById(id)
      if (!existingBoard) {
        return res.status(400).json({ error: 'Board không tồn tại' })
      }
      const result = await BoardService.delete(id)
      if (result) {
        res.status(200).json({ 'msg':'Xóa Board thành công', board: existingBoard })
      } else {
        throw new Error('Xóa Board thất bại')
      }
    } catch (error) {
      next(error)
    }
  }

}

module.exports = new BoardController()