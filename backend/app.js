const express = require('express'),
    cors = require('cors'),
    morgan = require('morgan'),
    compression = require('compression'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    errorHandler = require('errorhandler'),
    crypto = require('crypto'),
    http = require('http'),
    app = express(),
    server = http.createServer(app),
    WebSocket = require('ws'),
    wss = new WebSocket.Server({ server });
    // Worker = require('webworker-threads').Worker;

app.use(cors());

app.use(compression());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(methodOverride());
app.use(morgan('dev'));
app.use(errorHandler());

// function encrypt(text, password) {
//     var cipher = crypto.createCipher('aes192', password)
//     var crypted = cipher.update(text, 'utf8', 'hex')
//     crypted += cipher.final('hex');
//     return crypted;
// }

app.post('/api/encrypt', function (req, res) {
    // var cipher = encrypt(req.body.plainText, req.body.secret);

    const cipher = crypto.createCipher('aes192', req.body.secret);

    var encrypted = '';
    cipher.on('readable', () => {
        const data = cipher.read();
        if (data)
            encrypted += data.toString('hex');
    });
    cipher.on('end', () => {
        console.log(encrypted);
        res.status(200).json({ cipher: encrypted });
    });

    cipher.write(req.body.plainText);
    cipher.end();
});

app.post('/api/bruteforce', function (req, res) {

    startBruteforce(req.body, res);
});

function startBruteforce(data, res) {
    var randomKey = Math.random().toString(36).replace(/[^a-zA-Z0-9]+/g, '').substr(0, Number(data.keyLength));
    const decipher = crypto.createDecipher('aes192', randomKey);

    let decrypted = '';
    decipher.on('readable', () => {
        const data = decipher.read();
        if (data) decrypted += data.toString('utf8');
    });
    decipher.on('end', () => {
        console.log(decrypted);
        res.status(200).json({ randomKey, decrypted });
        // if (decrypted == data.plainText) {
        //     res.status(200).json({ randomKey, decrypted });
        // } else {
        //     startBruteforce(data, randomKey)
        // }
    });

    decipher.write(data.cipherText, 'hex');
    decipher.end();
}

server.listen(3000, () => console.log('Server listening on port 3000.'))