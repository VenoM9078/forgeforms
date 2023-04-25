const express = require("express");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/upload", upload.single("file"), async (req, res) => {
  const file = req.file;
  const fileName = file.originalname;
  const fileContent = file.buffer.toString("base64");
  res.status(200).send({ file: fileName, fileContent: fileContent });
});

router.post("/handle", async (req, res) => {

    const fileName = req.body.file;
    const fileContent = req.body.fileContent;
  
    try {
      const result = await cloudinary.uploader.upload(
        `data:application/octet-stream;base64,${fileContent}`,
        {
          resource_type: "raw",
          public_id: `${Date.now()}-${fileName}`,
        }
      );
      res.json({ data: result });
    } catch (error) {
      res.status(500).json({ error });
    }
  });

module.exports = router;
