const path = require('path');
const express = require('express');
// const port = process.env.PORT || 3001;
app.set('port', (process.env.PORT || 5000));

const redis = require('redis');
const client = redis.createClient({url: process.env.REDIS_URL});
const app = express();

app.get('/api/jobs', async (req, res) => {
    await client.connect();
    const jobs = await client.get('serpapi')
    res.header("Access-Control-Allow-Origin", `https://0.0.0.0:${port}`);
    await client.disconnect();
    return res.send(jobs);
}).listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});

// // Have Node serve the files for our built React app
// app.use(express.static('client'));
app.use(express.static(path.resolve(__dirname, '../client/build')));


// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`)
// })

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});


