// docker run --rm -it -v $(pwd)/05-docker/:/usr/src/app -p 3000:3000 node:15 bash
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
