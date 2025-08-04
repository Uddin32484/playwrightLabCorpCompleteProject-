import fs from 'fs';
import csv from 'csv-parser';
import path from 'path';

export interface JobSearchData {
    jobTitle: string;
    jobLocation: string;
    searchKeyword: string;
    url: string;
}

export class CSVTestDataReader {
    private static csvFilePath = path.join(process.cwd(), 'testData', 'jobSearchData.csv');

    static async readJobSearchData(): Promise<JobSearchData[]> {
        return new Promise((resolve, reject) => {
            const results: JobSearchData[] = [];

            // Check if file exists
            if (!fs.existsSync(this.csvFilePath)) {
                reject(new Error(`CSV file not found: ${this.csvFilePath}`));
                return;
            }

            fs.createReadStream(this.csvFilePath)
                .pipe(csv())
                .on('data', (data) => {
                    const cleanData: JobSearchData = {
                        jobTitle: data.jobTitle?.replace(/"/g, '').trim() || '',
                        jobLocation: data.jobLocation?.replace(/"/g, '').trim() || '',
                        searchKeyword: data.searchKeyword?.replace(/"/g, '').trim() || '',
                        url: data.url?.replace(/"/g, '').trim() || ''
                    };
                    results.push(cleanData);
                })
                .on('end', () => {
                    console.log(`✅ Successfully loaded ${results.length} test cases from CSV`);
                    resolve(results);
                })
                .on('error', (error) => {
                    console.error('❌ Error reading CSV file:', error);
                    reject(error);
                });
        });
    }

    // Get specific test data by index
    static async getTestData(index: number = 0): Promise<JobSearchData> {
        const allData = await this.readJobSearchData();
        
        if (index >= allData.length) {
            throw new Error(`Index ${index} is out of bounds. Available data: ${allData.length}`);
        }
        
        return allData[index];
    }

    // Get all test data for iteration
    static async getAllTestData(): Promise<JobSearchData[]> {
        return await this.readJobSearchData();
    }
}

// Fallback data if CSV fails
export const fallbackJobSearchData: JobSearchData[] = [
    {
        jobTitle: "Senior Software Engineer",
        jobLocation: "San Francisco, California, United States of America",
        searchKeyword: "Senior Software Developer",
        url: "https://careers.labcorp.com"
    },
    {
        jobTitle: "Data Analyst",
        jobLocation: "New York, New York, United States of America",
        searchKeyword: "Data Scientist",
        url: "https://careers.labcorp.com"
    }
];