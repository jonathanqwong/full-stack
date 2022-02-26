const express = require('express')
const app = express()
const port = process.env.PORT || 3001
const redis = require('redis');
const client = redis.createClient();

app.get('/api/jobs', async (req, res) => {
    await client.connect();
    const jobs = await client.get('serpapi')
    res.header("Access-Control-Allow-Origin", "http://0.0.0.0:${port}");
    await client.disconnect();
    return res.send(jobs);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
