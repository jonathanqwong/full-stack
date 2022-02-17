var fetch = require('node-fetch');
var redis = require('redis');
var {promisify} = require('util');

const secrets = require('../../config/secrets.js');
const client = redis.createClient({url: secrets.redisIp});
const setAsync = promisify(client.set).bind(client);
const baseURL = 'https://serpapi.com/search';
const headers = {'Content-Type': 'application/json'};
const params = {
    'engine': 'google_jobs',
    'lang': 'en',
    'search': 'software engineer',
    'location': 'bay area',
    'api': secrets.serpapiToken,
};

async function fetchJobs() {
    const allJobs = [];
    let requestUrl = `${baseURL}?engine=${params.engine}&hl=${params.lang}&q=${params.search}+${params.location}&api_key=${params.api}`;
    let resultCount = 1, onPage = 0;

    // fetch all pages of jobs
    // while (resultCount > 0) {  // commented out to due api limitations
    for (onPage; onPage < 1; onPage++) {
        const res = await fetch(requestUrl + `&start=${onPage}`, headers);
        try {
            const resJson = await res.json();
            const jobs = resJson.jobs_results;
            allJobs.push(...jobs); // flatten nested array
            resultCount = jobs.length;
            // onPage++; // commented out to due api limitations
            console.log('got', resultCount, 'jobs on page', onPage);
        } catch (error) {
            console.error('no more jobs found');
            break;
        };
    }

    console.log('got', allJobs.length, 'jobs total');

    // filter ago
    const jrJobs = allJobs.filter(jobs => {
        const jobTitle = jobs.title.toLowerCase();
        // algo logic
        if (
            jobTitle.includes('sr.') ||
            jobTitle.includes('senior') ||
            jobTitle.includes('lead') ||
            jobTitle.includes('manager') ||
            jobTitle.includes('architect') ||
            jobTitle.includes('principal')
        ) {
            return false;
        }
        return true;
    })

    console.log('filtered down to', jrJobs.length);

    // connect to redis cliet and set allJobs to redis key
    await client.connect();
    const success = await setAsync('serpapi', JSON.stringify(jrJobs));
    console.log({success});
}

module.exports = fetchJobs;
