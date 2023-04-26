const express = require("express");
const router = express.Router();
const { Parser }  = require('node-sql-parser');
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const parseSQLContent = require("../utils/parseSQLFile");
const extractSchema = require("../utils/extractSchema");

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

router.post("/handle", async (req, res, next) => {

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
        // const parser = new Parser();
        const response = await fetch(req.url);
        const fileContent = await response.text();

        let cleanStatement = parseSQLContent(`${fileContent}`, ['CREATE TABLE', 'DROP', 'ALTER', 'CREATE']);
        // const parsedStatement = parser.parse(cleanStatement[0]);
        // const schemaData = extractSchema(parsedStatement);
        console.log("Schema Data:", cleanStatement);

        await cloudinary.uploader.destroy(req.publicId, { resource_type: "raw" });

        res.status(200).json({ data: cleanStatement });

    } catch (error) {
        console.error("Error fetching file:", error);
    }
});


module.exports = router;
