/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-catch */
/* eslint-disable space-before-blocks */
const Board = require('../models/Board')

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
      const result = await Board.updateOne({ _id:id }, { title:data.title, cover:data.cover })
      return true
    } catch (error) {
      throw error
    }
  }

  delete = async (id) => {
    try {
      const board = await Board.findById(id)
      // console.log(board)
      await board.deleteOne()
      return true
    } catch (error){
      throw error
    }
  }
}
module.exports = new BoardService()