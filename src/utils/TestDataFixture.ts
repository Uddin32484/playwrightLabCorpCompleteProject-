import {ExcelReader, TestData} from '../utils/ExcelReader';
import path from 'path';

class TestDataManager {
private excelReader: ExcelReader;
private testData: TestData[];

constructor(){
    this.excelReader = ExcelReader.getInstance();
    this.loadTestData();
}

private loadTestData(){
    const excelFilePath = path.join(__dirname, '../data/testData.xlsx');
    this.testData = this.excelReader.loadData(excelFilePath, 'Sheet1');
}

public getJobSearchData(index: number = 0): TestData {return this.excelReader.getTestDataByIndex(index);

}
public getAllJobSearchData(): TestData[] {return this.testData}



}

// Create singleton instance
const testDataManager = new TestDataManager();

// Export for backward compatibility
export const jobSerachTestData = {
    jobSearch: testDataManager.getJobSearchData(0)
};

export default testDataManager;