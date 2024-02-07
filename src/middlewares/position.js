// const position = async function (next) {
//   try {
//     if (!this.isNew) {
//       // Nếu không phải là tạo mới, không cần thực hiện gì cả
//       return next()
//     }

//     const lastList = await this.constructor.findOne({ boardId: this.boardId }).sort({ position: -1 })

//     if (lastList) {
//       // Tìm xem có danh sách khác có cùng position hay không
//       const existingList = await this.constructor.findOne({ boardId: this.boardId, position: this.position })

//       if (existingList) {
//         // Nếu có danh sách khác có cùng position, thực hiện hoán đổi position
//         const tempPosition = existingList.position
//         existingList.position = this.position
//         this.position = tempPosition
//       } else {
//         // Nếu không có danh sách khác có cùng position, đặt position là 1 lớn hơn position của danh sách cuối cùng
//         this.position = lastList.position + 1
//       }
//     } else {
//       // Nếu không có danh sách trước đó, đặt position là 1
//       this.position = 1
//     }

//     return next()
//   } catch (error) {
//     return next(error)
//   }
// }

// module.exports = position