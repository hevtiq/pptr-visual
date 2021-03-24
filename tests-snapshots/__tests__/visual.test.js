// bring puppeteer module as a middleware
const puppeteer = require('puppeteer');

// bring jest-image-snapshot as a middleware
const { toMatchImageSnapshot } = require('jest-image-snapshot');

// add/load middleware to Jest
expect.extend({ toMatchImageSnapshot });

// description for test suite
describe('Visual Regression Testing', () => {
    // declare variables use through test steps run
    let browser;
    let page;

    // prepare before test steps run
    beforeAll(async function(){
        // launch a new browser instance
        browser = await puppeteer.launch({ headless: true });

        // create a new page instance
        page = await browser.newPage();
    });

    // works as test steps done
    afterAll(async function(){
        // close the browser instance
        await browser.close();
    })

    // TC-XXX
    test('Full Page Snapshot', async function(){
        // navigate to page
        await page.goto('https://www.example.com');

        // wait for H1 tag rendered
        await page.waitForSelector('h1');

        // screenshot page
        const image = await page.screenshot();

        // test image should match with config to detect if UT changed over 500px
        expect(image).toMatchImageSnapshot({
            // true if image different with less than 500px
            // false if image different with more 500px
            failureThresholdType: 'pixel',
            failureThreshold: 500,
        });
    });

    // TC-XXX
    test('Single Element Snapshot', async function(){
        // navigate to page
        await page.goto('https://www.example.com');

        // wait for H1 tag rendered
        const h1 = await page.waitForSelector('h1');

        // screenshot page
        const image = await h1.screenshot();

        // test image should match with config to detect if UT changed over 0.01%
        expect(image).toMatchImageSnapshot({
            // true if image different with less than 0.01%
            // false if image different with more 0.01%
            failureThresholdType: 'percent',
            failureThreshold: 0.01,
        });
    });

    // TC-XXX
    test('Mobile Snapshot', async function(){
        // navigate to page
        await page.goto('https://www.example.com');

        // wait for H1 tag rendered
        await page.waitForSelector('h1');

        // emulate device
        await page.emulate(puppeteer.devices['iPhone X']);

        // screenshot page
        const image = await page.screenshot();

        // test image should match with config to detect if UT changed over 0.01%
        expect(image).toMatchImageSnapshot({
            // true if image different with less than 0.01%
            // false if image different with more 0.01%
            failureThresholdType: 'percent',
            failureThreshold: 0.01,
        });
    });

    // TC-XXX
    test('Tablet Snapshot', async function(){
        // navigate to page
        await page.goto('https://www.example.com');

        // wait for H1 tag rendered
        await page.waitForSelector('h1');

        // emulate device
        await page.emulate(puppeteer.devices['iPad landscape']);

        // screenshot page
        const image = await page.screenshot();

        // test image should match with config to detect if UT changed over 0.01%
        expect(image).toMatchImageSnapshot({
            // true if image different with less than 0.01%
            // false if image different with more 0.01%
            failureThresholdType: 'percent',
            failureThreshold: 0.01,
        });
    });

    // TC-XXX
    test.only('Remove Element Before Snapshot', async function(){
        // navigate to page
        await page.goto('https://www.example.com');

        // remove/hide any element before snapshot
        await page.evaluate(() => {
            ;(document.querySelectorAll('h1') || []).forEach(el => el.remove());
        });

        // wait for delay time to remove dom
        await page.waitForTimeout(5000);
    });
});