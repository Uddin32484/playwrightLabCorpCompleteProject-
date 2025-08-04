import * as XLSX from 'xlsx';
import * as fs from 'fs';



export interface TestData{
    jobTitle: string;
    jobLocation: string;    
    searchKeyword: string;
    url: string;
}
export class ExcelReader{
    private static instance: ExcelReader;
    private testData: TestData[] = [];

    private constructor(){};
    public static getInstance(): ExcelReader{
        if(!ExcelReader.instance){
            ExcelReader.instance = new ExcelReader();
            
        }
        return ExcelReader.instance;
    }
    public loadData(filePath: string, sheetName: string='Sheet1'): TestData[] {
      try{
         const workbook = XLSX.readFile(filePath);
         const worksheet = workbook.Sheets[sheetName];
         this.testData = XLSX.utils.sheet_to_json(worksheet) as TestData[];
         return this.testData;
      } catch (error) {
        console.error(`Error loading data from ${filePath}:`, error);
        throw error;
      }
 }

    public getTestData(): TestData[] {
       return this.testData;
}

public getTestDataByIndex(index: number):TestData{
    return this.testData[index];
}
}