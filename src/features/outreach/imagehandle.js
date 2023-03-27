const express = require('express');
const multer = require('multer');
const router = express.Router();
const { MongoClient } = require('mongodb');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads');
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

router.post('/upload', upload.single('image'), async (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).json({ message: 'Please upload a file' });
  }

  const uri = 'mongodb+srv://Nodica:WATASHI123@cluster0.0tj0xg7.mongodb.net/?retryWrites=true&w=majority';
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  try {
    await client.connect();
    const database = client.db('test');
    const collection = database.collection('anexcs');
    const result = await collection.insertOne({
      name: file.originalname,
      type: file.mimetype,
      size: file.size,
      data: {
        contentType: file.mimetype,
        data: fs.readFileSync(file.path)
      }
    });
    fs.unlinkSync(file.path);
    return res.status(200).send(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  } finally {
    await client.close();
  }
});

module.exports = router;