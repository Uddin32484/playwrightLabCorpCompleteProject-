import{Page,Locator,expect} from "@playwright/test";
import { Logger } from "../utils/Logger";   


//base class should be abstract to all pages
export abstract class BasePage{
protected page:Page;
 logger = new Logger(this.constructor.name);
protected url?:string


constructor(page:Page){
    this.page = page;
}
 //Navigate to the page url//
 async navigateTo(): Promise<void> {
  if (!this.url) {
    throw new Error(`URL is not defined for this page ${this.constructor.name}`);
  }
  await this.page.goto(this.url);
  await this.waitForPageLoad();
 }

 //Wait for the page to load//

 async waitForPageLoad(): Promise<void>{
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForLoadState('domcontentloaded');
 }

// Click Element with retry //
async clickElement(locator:Locator,description:string):Promise<void>{
   this.logger.info(`Clicking on element: ${description}`);
      await expect(locator).toBeVisible({timeout:5000});
      await expect(locator).toBeEnabled({timeout:5000});
      try {
        await locator.click({timeout:5000});
      } catch (error) {
        this.logger.error(`Failed to click on element: ${description}`);
        throw error;
      }

}
  
    // Type text //
    async typeText(locator:Locator,text:string,description:string):Promise<void>{
      this.logger.info(`Typing text: "${text}" into element: ${description}`);
        await expect(locator).toBeVisible({timeout:5000});
      await expect(locator).toBeEnabled({timeout:5000});
      await locator.clear();
        await locator.fill(text);
        const inputValue = await locator.inputValue();
        expect(inputValue).toBe(text);

    }

    async waitForElement(locator: Locator, description: string, timeout: number = 10000): Promise<void> {
    this.logger.info(`Waiting for element: ${description}`);
    await expect(locator).toBeVisible({ timeout });
  }
  
async getElementText(locator: Locator, description: string): Promise<string> {
    this.logger.info(`Getting text from: ${description}`);
    await expect(locator).toBeVisible();
    
    const text = await locator.textContent();
    return text?.trim() || '';
  }

   async isElementVisible(locator: Locator): Promise<boolean> {
    try {
      await expect(locator).toBeVisible({ timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }
  async scrollToElement(locator: Locator, description: string): Promise<void> {
    this.logger.info(`Scrolling to element: ${description}`);
    await locator.scrollIntoViewIfNeeded();
  }

   async waitForNavigation(action: () => Promise<void>): Promise<void> {
    await Promise.all([
      this.page.waitForLoadState('networkidle'),
      action()
    ]);
  }

  async takeScreenshot(name: string): Promise<void> {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `${name}-${timestamp}.png`;
    
    this.logger.info(`Taking screenshot: ${filename}`);
    await this.page.screenshot({ 
      path: `test-results/screenshots/${filename}`,
      fullPage: true 
    });
  }

    async handleCookieConsent(): Promise<void> {
    const cookieAcceptSelectors = [
      '[data-testid="cookie-accept"]',
      '#cookie-accept',
      '.cookie-accept',
      'button:has-text("Accept")',
      'button:has-text("Accept All")',
      'button:has-text("Allow All")'
    ];
}

 async getPageTitle(): Promise<string> {
    const title = await this.page.title();
    this.logger.info(`Current page title: ${title}`);
    return title;
  }

    async getCurrentUrl(): Promise<string> {
    const url = this.page.url();
    this.logger.info(`Current URL: ${url}`);
    return url;
  }
}