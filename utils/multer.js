const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Change 'uploads/' to the desired destination folder
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const Multer = multer({ storage: storage });
module.exports = Multer;
