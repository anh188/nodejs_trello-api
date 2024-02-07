/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-catch */
/* eslint-disable space-before-blocks */
// const { default: mongoose } = require('mongoose')
const Board = require('../models/Board')
const mongoose = require('mongoose')
class BoardService{

  create = async (dataBoard) => {
    try {
      //Goi den tang model
      const board = new Board(dataBoard)
      await board.save()
      return board
    } catch (error) {
      throw error
    }
  }

  getAll = async() => {
    try {
      const boards = await Board.find()
      return boards
    } catch (error) {
      throw error
    }
  }

  update = async (id, data) => {
    try {
      const updatedBoard = await Board.findOneAndUpdate({ _id: id }, data, { new: true })
      return updatedBoard
    } catch (error) {
      throw error
    }
  }

  delete = async (id) => {
    try {
      const deletedBoard = await Board.findByIdAndDelete(id)
      return deletedBoard
    } catch (error) {
      throw error
    }
  }

  findById = async (id) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return null // Trả về null nếu id không hợp lệ
      }
      const board = await Board.findById(id)
      return board || null // Trả về board nếu tìm thấy, hoặc null nếu không tìm thấy
    } catch (error) {
      throw error
    }
  }
}
module.exports = new BoardService()