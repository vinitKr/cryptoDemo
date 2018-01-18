const express = require('express'),
    cors = require('cors'),
    morgan = require('morgan'),
    compression = require('compression'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    errorHandler = require('errorhandler'),
    crypto = require('crypto'),
    app = express();

app.use(cors());

app.use(compression());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(methodOverride());
app.use(morgan('dev'));
app.use(errorHandler());

function encrypt(text, password) {
    var cipher = crypto.createCipher('aes192', password)
    var crypted = cipher.update(text, 'utf8', 'hex')
    crypted += cipher.final('hex');
    return crypted;
}

app.post('/api/encrypt', function (req, res) {
    var cipher = encrypt(req.body.plainText, req.body.secret);

    res.status(200).json({ cipher });
});

app.post('/api/bruteforce', function (req, res) {
    console.log('req.body>>>> ', req.body);
    res.status(200).json({ data: 'success' });
});

app.listen(3000, () => console.log('Server listening on port 3000.'))