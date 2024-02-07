/* eslint-disable no-useless-catch */
// const { date } = require('joi');
const Card = require('../models/Card')
class CardService {
  static async createCard(data) {
    try {
      const card = await Card.create(data)
      return card
    } catch (error) {
      throw error
    }
  }
  static async updateCard (cardId, updatedData) {
    try {
      const updatedCard = await Card.findByIdAndUpdate(
        cardId,
        { $set: updatedData },
        { new: true }
      )

      return updatedCard
    } catch (error) {
      throw error
    }
  }

  static async deleteCard (id) {
    try {
      const card = await Card.findById(id)
      // console.log(card)
      await card.deleteOne()
      return true
    } catch (error) {
      throw error
    }
  }

  static async getCard(listId) {
    try {
      const cards = await Card.find({ listId }).select('title')
      return cards
    } catch (error) {
      throw error
    }
  }

  static async getCardId (idCard) {
    try {
      const card = await Card.findOne({ _id: idCard })
      // console.log(card)
      return card
    } catch (error) {
      throw error
    }
  }
  static async deleteCardsByListId(listId) {
    try {
      // Xóa tất cả các thẻ có listId tương ứng
      const result = await Card.deleteMany({ listId })
      return result.deletedCount
    } catch (error) {
      throw error
    }
  }
}


module.exports = CardService