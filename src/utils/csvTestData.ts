// Fallback data if CSV fails
export type JobSearchData = {
    jobTitle: string;
    jobLocation: string;
    searchKeyword: string;
    url: string;
};

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
    },
    {
        jobTitle: "Lab Technician",
        jobLocation: "Boston, Massachusetts, United States of America", 
        searchKeyword: "Laboratory Specialist",
        url: "https://careers.labcorp.com"
    },
    {
        jobTitle: "Quality Assurance Engineer",
        jobLocation: "Austin, Texas, United States of America",
        searchKeyword: "QA Engineer", 
        url: "https://careers.labcorp.com"
    },
    {
        jobTitle: "Research Scientist",
        jobLocation: "Seattle, Washington, United States of America",
        searchKeyword: "Senior Research Scientist",
        url: "https://careers.labcorp.com"
    }
];