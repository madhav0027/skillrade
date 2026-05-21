const multer = require("multer");
const multerS3 = require("multer-s3")
const { S3Client } = require("@aws-sdk/client-s3")

const s3 = new S3Client({
  region:"auto",
  endpoint:process.env.R2_ENDPOINT,
  credentials:{
    accessKeyId:process.env.R2_ACCESS_KEYID,
    secretAccessKey:process.env.R2_SECRETACESS_KEY,
  }
})
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     let folderdest;
//     folderdest = "src/Public/uploads/";
//     fs.mkdirSync(folderdest, { recursive: true });
//     cb(null, folderdest);
//   },
//   filename: (req, file, cb) => {
//     const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, uniqueName + path.extname(file.originalname));
//   },
// });

// const fileFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith("image/")) {
//     cb(null, true);
//   } else {
//     cb(new Error("Only image files are allowed"), false);
//   }
// };

module.exports = multer({
  storage:multerS3({
    s3,
    bucket:process.env.R2_BUCKETNAME,
    contentType:multerS3.AUTO_CONTENT_TYPE,

    key:async (req,file,cb) => {
      const userId = await req.user.userId;
      const extension = file.originalname.split(".").pop();
      const fileName = `profile.${extension}`;
      cb(null, `uploads/${userId}/${fileName}`);
    }
  }),
  fileFilter : (req,file,cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"), false);
    }
  },
  limits: { fileSize: 1 * 1024 * 1024 }, // 5MB limit
});
