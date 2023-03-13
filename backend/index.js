import express from 'express';
import cors from 'cors';
import multer from 'multer';
const app = express();
const port = 8000;
const upload = multer();

app.use(express.json());
app.use(cors());

app.post('/upload', upload.single('csv'), (req, res) => {
    console.log('uploading');
    const csvReadable = req.file.buffer.toString('utf8');
    res.status(200).send(csvReadable);
    
});

app.get('/upload', (req, res) => {
    console.log('testing');
    res.status(404).send();
})

app.listen(port, () => console.log('listening on port ' + port));