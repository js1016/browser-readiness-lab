
const formidable = require('formidable');

module.exports = function (app) {
    console.log('aaa');
    app.post('/lab1/submit', (req, res) => {
        let form = new formidable.IncomingForm(), fields = [];
        form.on('field', function (field, value) {
            fields.push({
                name: field,
                value: value
            });
        })
            .on('file', function (field, file) {
                fields.push({
                    name: field,
                    file: {
                        name: file.name,
                        type: file.type,
                        size: file.size
                    }
                });
            })
            .on('end', function () {
                res.send(JSON.stringify(fields));
            });
        form.parse(req);
    });

    app.get('/lab1/submit', (req, res) => {
        res.send(JSON.stringify(req.query));
    });
}