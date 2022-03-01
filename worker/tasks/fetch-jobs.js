const fetch = require('node-fetch');
const redis = require('redis');
const client = redis.createClient({url: process.env.REDIS_IP});
const BASE_URL = 'https://serpapi.com/search';
const headers = {'Content-Type': 'application/json'};
const params = {
    'engine': 'google_jobs',
    'lang': 'en',
    'search': 'software+engineer',
    'location': 'bay+area',
    'api': process.env.SERPAPI_TOKEN,
};

async function fetchJobs() {
    let requestUrl = `${BASE_URL}?engine=${params.engine}&hl=${params.lang}&q=${params.search}+${params.location}&api_key=${params.api}`;
    let resultCount = 1, onPage = 1;
    const allJobs = [];

    // fetch all pages of jobs
    // while (resultCount > 0) {  // commented out to due api limitations
    for (onPage; onPage <= 1; onPage++) {
        const res = await fetch(`${requestUrl}&start=${onPage}`);
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

    //filter algo
    const jrJobs = allJobs.filter(jobs => {
        const jobTitle = jobs.title.toLowerCase();
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
    await client.connect();
    await Promise.all([
        client.set('serpapi', JSON.stringify(jrJobs))
    ]);
}

module.exports = fetchJobs;
