const express = require('express');

const app = express();

app.use(express.static('static'));

require('./static/lab1/server')(app);
require('./static/lab2/server')(app);

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log(`Browser lab site is now running, you can open it in browser via http://localhost:${PORT}`);
    console.log('Press Ctrl+C to quit.');
});