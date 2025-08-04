import {Page,Locator, expect} from '@playwright/test';
import { promises } from 'dns';

export class helperFunc {
 private page :Page;
 constructor(page: Page) {
   this.page = page;
 }

async validateNewTabAndText(textLocator:string, expectedText:string): Promise<string> {

    //listen for new Tab
    const [newPage] = await Promise.all([
     this.page.context().waitForEvent('page'),
    ]);

    // wait for newPage to load //  
    await newPage.waitForLoadState('networkidle');
    console.log('New tab URL:', newPage.url());

 /// get text //
  const actualText = await newPage.locator(textLocator).textContent()
 console.log('Text found:', actualText);
  return actualText || '';

  }


}



// async handleNewTab<T = any>(
//     elementToClick: string | Locator,
//     actionOnNewPage?: (newPage: Page) => Promise<T>,
//     options?: {
//         timeout?: number;
//         closeAfterAction?: boolean;
//         expectUrl?: string;
//         expectText?: string;
//     }
// ): Promise<Page> {
//     const defaultOptions = {
//         timeout: 10000,
//         closeAfterAction: false,
//         ...options
//     };

//     let newPage: Page | undefined;
//     const context = this.page.context();

//     try {
//         // Wait for new tab and click element
//         const [popup] = await Promise.all([
//             context.waitForEvent('page', { timeout: defaultOptions.timeout }),
//             this.clickElement(elementToClick)
//         ]);
//           newPage = popup;
//         await newPage.waitForLoadState('networkidle');
//         console.log('New tab opened:', newPage.url());

//         // Validate URL if expected
//         if (defaultOptions.expectUrl) {
//             expect(newPage.url()).toContain(defaultOptions.expectUrl);
//         }

//         // Validate text if expected
//         if (defaultOptions.expectText) {
//             const pageText = await newPage.textContent('body');
//             expect(pageText).toContain(defaultOptions.expectText);
//         }

//         // Execute action on new page if provided
//         if (actionOnNewPage) {
//             await actionOnNewPage(newPage);
//         }

//         return newPage;
//          } catch (error) {
//         console.error('New tab handling failed:', error);
//         if (newPage) {
//             console.log('New page URL:', newPage.url());
//             return newPage;
//         }
//         throw error;

//     } finally {
//         // Close new tab if specified
//         if (defaultOptions.closeAfterAction && newPage && !newPage.isClosed()) {
//             await newPage.close();
//             console.log('New tab closed');
//         }
//     }
// }

// private async clickElement(element: string | Locator): Promise<void> {
//         if (typeof element === 'string') {
//             await this.page.locator(element).click();
//         } else {
//             await element.click();
//         }
//     }
// }