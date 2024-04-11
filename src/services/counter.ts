import { connectToMongoDB } from "../config/db";
import { Job } from "../model/Job";
import { JobStat } from "../model/JobStat";

export async function  countJobsStatus(jobs: Job[]): Promise<JobStat> {

    const db = await connectToMongoDB();
    const collection = db.collection('stats');

    const currentDate = new Date();
    const threeDaysFromNow = new Date();
    threeDaysFromNow.setDate(currentDate.getDate() + 3);

    const expireInThreeDays = jobs.filter(job => toDate(job.expired) <= threeDaysFromNow && toDate(job.expired) > currentDate).length;
    const expireToday = jobs.filter(job => toDateString(job.expired) === currentDate.toDateString()).length;
    const createdToday = jobs.filter(job => toDateString(job.created) === currentDate.toDateString()).length;

    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(currentDate.getDate() - 3);
    const createdLastThreeDays = jobs.filter(job => {
        const createdDate = toDate(job.created);
        return createdDate >= threeDaysAgo && createdDate <= currentDate;
    }).length;

    console.log(`Expire in three days: ${expireInThreeDays} | Expire today: ${expireToday} | Created today: ${createdToday} | Created last three days: ${createdLastThreeDays}`);

    const result = await collection.insertOne({ expireInThreeDays, expireToday, createdToday, createdLastThreeDays, currentDate });

    console.log(`Inserted document with ID: ${result.insertedId}`);
    
    return { expireInThreeDays, expireToday, createdToday, createdLastThreeDays, currentDate };
}

export function toDate(dateOrString: Date | string): Date {
    return typeof dateOrString === 'string' ? new Date(dateOrString) : dateOrString;
}

export function toDateString(dateOrString: Date | string): string {
    const dateObj = toDate(dateOrString);
    return dateObj.toDateString();
}
