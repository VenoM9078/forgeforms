const express = require("express");
const router = express.Router();
const path = require("path");
const { Parser } = require("node-sql-parser");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const parseSQLContent = require("../utils/parseSQLFile");
const fs = require("fs");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", "..", "src", "assets", "files"));
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 20 * 1024 * 1024, // 200 MB in bytes
  },
});

router.post("/upload", upload.single("file"), async (req, res) => {
  const file = req.file;
  const fileName = file.originalname;
  res.status(200).send({ file: fileName, filePath: file.path });
});

router.post("/handle", async (req, res, next) => {
  const filePath = req.body.filePath;
  req.filePath = filePath;
  // const fileName = req.body.file;

  try {
    // const fileContent = fs.readFileSync(filePath, "utf-8");
    // let cleanStatement = parseSQLContent(`${fileContent}`, ["CREATE TABLE"]);

    // console.log(filePath);
    // fs.writeFileSync(filePath, cleanStatement, 'utf-8');

    // Delete the existing file
    // fs.unlinkSync(filePath);

    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "raw",
    });

    const secureUrl = result.secure_url;
    const public_id = result.public_id;

    req.url = secureUrl;
    req.publicId = public_id;

    next();
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.use(async (req, res) => {
  try {
    const response = await fetch(req.url);
    const fileContent = await response.text();

    let cleanStatement = parseSQLContent(`${fileContent}`, ["CREATE TABLE"]);
    fs.writeFileSync(req.filePath, `${cleanStatement[0]}`, "utf8");

    await cloudinary.uploader.upload(req.filePath, {
      resource_type: "raw",
      public_id: req.publicId,
    }, function (error, result) {
      if (error) {
        console.error(error);
      } else {
        console.log(result);
      }
    });

    // Delete the existing file
    fs.unlinkSync(req.filePath);

    res.status(200).json({ data: cleanStatement });
  } catch (error) {
    console.error("Error fetching file:", error);
  }
});

module.exports = router;
