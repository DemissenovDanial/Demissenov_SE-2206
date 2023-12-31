const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const path = require('path');
app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'bmi-calculator.html'));
});

app.post('/calculateBMI', (req, res) => {
    const { weight, height, units } = req.body;

    let bmi = weight / (height * height);
    res.json({ bmi });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});