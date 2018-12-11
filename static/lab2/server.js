const formidable = require('formidable');

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomWeatherData() {
    return {
        min: getRandomIntInclusive(1, 10),
        max: getRandomIntInclusive(25, 35)
    }
}

function sendWeatherData(res) {
    let weatherData = getRandomWeatherData();
    res.set('Cache-Control', 'no-cache');
    res.send(`<div>Min: ${weatherData.min}°C</div><div>Max: ${weatherData.max}°C</div>`);
}

module.exports = function (app) {
    app.get('/lab2/getWeatherData', (req, res) => {
        let delaySeconds = Number(req.query.delay);
        if (delaySeconds) {
            setTimeout(function () {
                sendWeatherData(res);
            }, delaySeconds * 1000);
        } else {
            sendWeatherData(res);
        }
    });
    app.get('/lab2/getWeatherDataJSON', (req, res) => {
        res.set('Cache-Control', 'no-cache');
        res.json(getRandomWeatherData());
    });
    app.get('/lab2/getWeatherDataErr', (req, res) => {
        res.status(500).send('Server Error');
    });
}