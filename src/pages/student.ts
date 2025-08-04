import {Page,Locator,expect} from '@playwright/test';

export class StudentPage{

    private page: Page;
    private readonly studentLink: Locator;
    private readonly discoverLink: Locator;
    private readonly internshipLink: Locator;
    private readonly medicalLavatory: Locator;
constructor(page:Page){
    this.page = page;
 
      this.studentLink = this.page.getByRole('button', { name: 'Students and Graduates' });
      this.discoverLink = this.page.getByRole('link', { name: 'Discover More' });
      this.internshipLink = this.page.locator('//a[@aria-label="Learn more about Labcorp Internships."]');
      this.medicalLavatory = this.page.locator('//a[@aria-label="Learn more about Labcorp Medical Laboratory Science Schools."]');


}


async hoverCareerLinkAndClick(): Promise<void> {
   await this.studentLink.click();
   await this.discoverLink.click();
}

async clickOnMediaclLavatory(): Promise<void> {
    await this.medicalLavatory.waitFor({ state: 'visible' });
    
    await this.medicalLavatory.scrollIntoViewIfNeeded();
    await this.medicalLavatory.click();

}
async clickInternshipLink(): Promise<void> {
     await this.internshipLink.waitFor({ state: 'visible' });
    await this.internshipLink.scrollIntoViewIfNeeded();
    await this.page.pause();
    await this.internshipLink.click();
}



}