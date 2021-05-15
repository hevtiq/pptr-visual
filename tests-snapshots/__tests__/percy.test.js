// NOTE: need git to complete this lesion

// bring puppeteer module as a middleware
const puppeteer = require('puppeteer');

// bring @percy/puppeteer module as a middleware
const percySnapshot = require('@percy/puppeteer');

// description for test suite
describe('Percy Visual Test', () => {
    // declare variables use through test steps run
    let browser;
    let page;

    // prepare before test steps run
    beforeAll(async () => {
        // launch a new browser instance
        browser = await puppeteer.launch({
            headless: true,
            args: [
                '--ignore-certificate-errors',
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-gpu',
                '--disable-dev-shm-usage',
                '--disable-web-security',
                // '--proxy-server=your.proxy.domain:port',
            ],
        });

        // create a new page instance
        page = await browser.newPage();
    });

    // works as test steps done
    afterAll(async () => {
        // close the browser instance
        await browser.close();
    })

    // TC-XXX
    test('Full Page Percy Snapshot', async () => {

        // navigate to page
        await page.goto('https://www.google.com', {waitUntil: "networkidle0"});

        // wait for 1s delay time
        await page.waitForTimeout(1000);

        // screenshot page
        await percySnapshot(page, 'Google page')
    });
});
