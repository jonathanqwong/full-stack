const cronJob = require('cron').CronJob;

const fetchJobs = require('./tasks/fetch-jobs.js');

// fetch jobs from api
new cronJob('* */12 * * *', fetchJobs, null, true, 'America/Los_Angeles');
