const express = require('express');
const https = require('https');
const fs = require('fs');
const app = express();
const port = 3000;

const options = {
    key: fs.readFileSync(`${__dirname}/site1.com-key.pem`),
    cert: fs.readFileSync(`${__dirname}/site1.com.pem`)
}

app.post('/login', (req, res) => {
    // what is the difference between open directly and opened by a href?
    // how web browser knows this differences?
    const cookie = 'loginId=12345; SameSite=strict'; // link can't be opened
    // const cookie = 'loginId=12345; samesite=lax'; // link can open
    // const cookie = 'loginId=12345; samesite=none; secure'; // samesite requires secure attribute. Why? and What is secure?
    // const cookie = 'loginId=12345;'; // default behaves like lax
    res.setHeader('set-cookie', [cookie])
    res.send();
});

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/public/index.html`);
});

app.get('/img', (req, res) => {
    const cookies = req.headers.cookie;

    if (cookies && cookies.includes('loginId')) {
        res.sendFile(`${__dirname}/public/image.jpeg`);
    } else {
        res.sendStatus(403);
    }
})

https.createServer(options, app).listen(port, () => {
    console.log('listening...');
})
