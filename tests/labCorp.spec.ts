import {test, expect, chromium} from '@playwright/test';

import { HomePage} from '../src/pages/home-page';
import jobSerachTestData from '../src/pages/testDataFixture';
import { StudentPage } from '../src/pages/student';
import { CSVTestDataReader } from '../src/utils/csvTestData';




// Start///
test.describe('LabCorp CareerSearch Test',() => {

let homePage: HomePage;
test.beforeEach(async ({page})=>{
await page.setViewportSize({ width: 1920, height: 1080 });
homePage = new HomePage(page);
await page.goto(homePage.url);

})

test('serch job tittle and location', async({page})=>{
  
   await homePage.hoverCareerLink();
   await homePage.clickCareerSearchLink();
   await homePage.fillCareerSearchInput(jobSerachTestData.jobSearch.jobTitle); 
   await homePage.clickSearch();
   await homePage.clickOnJobText(); 
   const jobTitle = await homePage.getJobTitle();
   console.log(`Job Title: ${jobTitle}`); 
   expect(jobTitle).toContain(jobSerachTestData.jobSearch.jobTitle);
   const jobLocation = await homePage.getJobLocation();
   console.log(`Job Location: ${jobLocation}`);
   expect(jobLocation).toContain(jobSerachTestData.jobSearch.jobLocation);
   await homePage.clickOnPopUp();
   console.log(await homePage.validateNewPageText('Start Your Application'));
   await page.bringToFront();
    

    
  
})
    
test('Varify InternShip Student', async ({page}) => {
    const internshipPage = new StudentPage(page);
    await internshipPage.hoverCareerLinkAndClick();
    await internshipPage.clickOnMediaclLavatory();
    

})


test.skip('verify CSV reader works', async ({ page }) => {
    try {
        const testData = await CSVTestDataReader.getAllTestData();
        console.log('Test data loaded:', testData.length);
        console.log('First item:', testData[0]);
        
        expect(testData.length).toBeGreaterThan(0);
        expect(testData[0].jobTitle).toBeDefined();
    } catch (error) {
        console.error('CSV reader test failed:', error);
        throw error;
    }
});






});
