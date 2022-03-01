const path = require('path');
const express = require('express');
const port = process.env.PORT || 3001;
const redis = require('redis');
const client = redis.createClient(process.env.REDIS_IP, {no_ready_check: true});
const app = express();

app.get('/api/jobs', async (req, res) => {
    await client.connect();
    const jobs = await client.get('serpapi')
    res.header("Access-Control-Allow-Origin", `https://0.0.0.0:${port}`);
    await client.disconnect();
    return res.send(jobs);
})

// // Have Node serve the files for our built React app
// app.use(express.static('client'));
app.use(express.static(path.resolve(__dirname, '../client/build')));


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});


