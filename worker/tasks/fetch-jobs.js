var fetch = require('node-fetch');
const secrets = require('../../config/secrets.js');
const baseURL = 'https://serpapi.com/search';
const headers = {'Content-Type': 'application/json'};
const params = {
    'engine': 'google_jobs',
    'lang': 'en',
    'search': 'software engineer',
    'location': 'bay area',
    'api': secrets.serpapiApiToken,
}

async function fetchJobs() {
    const allJobs = [];
    let requestUrl = `${baseURL}?engine=${params.engine}&hl=${params.lang}&q=${params.search}+${params.location}&api_key=${params.api}`;
    let resultCount = 1, onPage = 0;

    while (resultCount > 0) {
        const res = await fetch(
            requestUrl + `&start=${onPage}`,
            headers
        );

        try {
            const resJson = await res.json();
            const jobs = resJson.jobs_results;
            allJobs.push(...jobs);
            resultCount = jobs.length;
            onPage++;
            console.log(requestUrl + `&start=${onPage}`);
            console.log('got', resultCount, 'jobs on page', onPage);
        } catch (error) {
            console.error('no more jobs found');
            break;
        };
    }

    console.log('got', allJobs.length, 'jobs total')
}

module.exports = fetchJobs;
