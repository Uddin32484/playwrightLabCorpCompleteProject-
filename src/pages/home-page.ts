import {Page,Locator,expect} from '@playwright/test';
import jobSerachTestData from '../pages/testDataFixture'
import { helperFunc } from '../utils/helperFunc';
export class HomePage {
private helper: helperFunc;
private readonly page: Page;
private readonly careerLink: Locator;
private readonly careerSearchLink: Locator;
private readonly careerSerchInput:Locator;
private readonly clickSearchButton: Locator;
private readonly  clickOnJobTitle:Locator;
private readonly TitleHeading:Locator;
private readonly jobLocation:Locator;
private readonly clickonpopUp: Locator;
private readonly seeAllButton: Locator;
readonly url: string;
private readonly applyButton: Locator;
private readonly startApplicationText: Locator;
private readonly clickonHome: Locator;

constructor(page: Page){
   this.page = page;
   this.url = jobSerachTestData.jobSearch.url;
   this.careerLink = this.page.getByRole('button', { name: 'Featured Careers' });
   this.careerSearchLink = this.page.getByRole('link', { name: 'Information Technology' });
   this.careerSerchInput = this.page.getByRole('textbox', { name: "Search job title or location" });
   this.clickSearchButton = this.page.getByRole('button', { name: 'Search' });
   this.clickOnJobTitle = this.page.getByRole('link', { name: 'Senior Software Engineer' });
   this.TitleHeading = this.page.getByRole('heading', { name: 'Senior Software Engineer' });
   this.jobLocation = this.page.locator("(//ul//li[@class='each-location'])[1]");
   this.clickonpopUp = this.page.getByRole('button', { name: 'Close popup' }); 
   this.seeAllButton = this.page.getByRole('button', { name: 'See all' });
   this.applyButton = this.page.getByRole('button',{name: 'Apply Now'});
   this.startApplicationText= this.page.locator('.css-124gh4t')
   this.clickonHome = this.page.locator('.css-15pyy16');
   this.helper = new helperFunc(page);
}

async validateNewPageText(expectedText: string): Promise<string> {
    const context = this.page.context();
    
    // Click apply button and wait for new tab at the same time
    const [newPage] = await Promise.all([
        context.waitForEvent('page', { timeout: 10000 }),
        this.applyButton.click()  // This triggers the new tab
    ]);
    
    await newPage.waitForLoadState('networkidle');
    console.log('New tab URL:', newPage.url());
    
    const actualText = await newPage.locator('.css-124gh4t').textContent();
    console.log('Text found:', actualText);
    
    expect(actualText).toContain(expectedText);
    await newPage.locator('.css-15pyy16').click();
    await newPage.close();
    
    return actualText || '';
}


// async validateNewPageText(expectedText:string): Promise<string> {
//     const context = this.page.context();
    
//     return await this.helper.validateNewTabAndText(this.applyButton, '.css-124gh4t', expectedText);
// }

//await page1.getByRole('heading', { name: 'Start Your Application' }).click();
async clickonNewPagwe(newPage: Page): Promise<string> {
    await this.page.waitForLoadState('networkidle')
    console.log(await newPage.locator('.css-18mbozw').innerText());
    const startApplicationTest = await newPage.getByRole('heading', { name: 'Start Your Application' }).innerText();
    console.log(`Start Application Text: ${startApplicationTest}`);
    return startApplicationTest; // Return the text
}catch (error) {
    console.log('Error clicking on new page:', error);
    return "";
}
async clickHome(): Promise<void> {
      await  this.clickonHome.click();
      await this.page.waitForLoadState('networkidle');

}


async hoverCareerLink(): Promise<void> {
   await this.careerLink.hover();
   await this.careerLink.click();
}
async clickCareerSearchLink(): Promise<void> {
    await this.careerSearchLink.click();
    await this.page.waitForLoadState('networkidle');
}

async fillCareerSearchInput(text: string): Promise<void> {
    await this.careerSerchInput.fill(text);

}
async clickSearch(): Promise<void> {
    await this.clickSearchButton.click();
    await this.page.waitForLoadState('networkidle');    
}
async clickOnJobText(): Promise<void> {
    await this.clickOnJobTitle.click();
    await this.page.waitForLoadState('networkidle');
}

async getJobTitle(): Promise<string> {
    const name = await this.TitleHeading.innerText();
    await this.page.waitForTimeout(900);
    await this.seeAllButton.click();
    return name;
   
     
    
}
async getJobLocation(): Promise<string> {
    return await this.jobLocation.innerText();
}
async clickOnPopUp(): Promise<void> { 

   await this.clickonpopUp.click();
}
async clickOnApplyButton(): Promise<void> {
    await this.clickonoption(this.applyButton);
}

async getStartApplicationText(): Promise<string> {

    const text = await this.startApplicationText.innerText();
    return text.trim();
}

async clickonoption(selector: string | Locator): Promise<void> {
    if (typeof selector === 'string') {
        const locator = this.page.locator(selector);
        await locator.click();
    } else {
        await selector.click();
    }
}

}