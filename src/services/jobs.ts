import axios from "axios";
import { Job } from "../model/Job";

export async function fetchJobs(): Promise<Job[]> {
    try {
      const response = await axios.get(`${process.env.API_URL}/jobs`);
      return response.data.map((job: Job) => ({
        id: job.id,
        created: job.created,
        expired: job.expired,
      }));
    } catch (error) {
      console.error('Error fetching jobs:', error);
      return [];
    }
  }
  