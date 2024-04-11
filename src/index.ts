import { config } from 'dotenv';
import { fetchJobs } from './services/jobs';
import { Job } from './model/Job';
import { countJobsStatus } from './services/counter';

config();

async function main() {
  try {
    const jobs: Job[] = await fetchJobs();
    console.log('Jobs found:');
    countJobsStatus(jobs);
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

main();
