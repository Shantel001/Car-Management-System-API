const multer = require("multer");

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
    console.log(req.body);
  },
});

const upload = multer({ storage });

module.exports = upload.single("imageUrl");
