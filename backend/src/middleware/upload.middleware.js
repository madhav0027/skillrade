const multer = require("multer");
const path = require("path");
const fs = require('fs')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    folderdest = "src/Public/uploads/"
    fs.mkdirSync(folderdest,{recursive:true})
    cb(null,folderdest); 
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

module.exports = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1 * 1024 * 1024 }, // 2MB limit
});
