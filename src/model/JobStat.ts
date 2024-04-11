export interface JobStat{ 
    expireInThreeDays: number; 
    expireToday: number; 
    createdToday: number; 
    createdLastThreeDays: number; 
    currentDate: Date 
};