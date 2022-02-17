var fetch = require('node-fetch');
var redis = require('redis');

const client = redis.createClient({url: 'redis://127.0.0.1:6379'});
const {promisify} = require('util');
const setAsync = promisify(client.set).bind(client);
const secrets = require('../../config/secrets.js');
const baseURL = 'https://serpapi.com/search';
const headers = {'Content-Type': 'application/json'};
const params = {
    'engine': 'google_jobs',
    'lang': 'en',
    'search': 'software engineer',
    'location': 'bay area',
    'api': secrets.serpapiApiToken,
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
            // flatten nested array when jobs_results array from response pushed to allJobs array
            allJobs.push(...jobs);
            resultCount = jobs.length;
            // onPage++;
            console.log(requestUrl + `&start=${onPage}`);
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

fetchJobs();

module.exports = fetchJobs;
