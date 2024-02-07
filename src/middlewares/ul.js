// const fs = require('fs');

// const base64EncodeMiddleware = (req, res, next) => {
//   if (req.file) {
//     try {
//       // Đọc nội dung của tệp
//       const fileContent = fs.readFileSync(req.file.path);

//       // Mã hóa nội dung sang Base64
//       const base64Encoded = fileContent.toString('base64');

//       // Lưu mã hóa vào req để sử dụng trong controller hoặc service
//       req.base64Encoded = base64Encoded;

//       // Xóa tệp đã tải lên vì bạn đã có Base64Encoded
//       fs.unlinkSync(req.file.path);

//       next();
//     } catch (error) {
//       return res.status(500).json({ error: 'Error processing file' });
//     }
//   } else {
//     next();
//   }
// };

// module.exports = base64EncodeMiddleware;