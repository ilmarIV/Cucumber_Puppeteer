const { Given, When, Then, After } = require('@cucumber/cucumber');
const puppeteer = require('puppeteer');

let browser;
let page;

Given('I open the calculator app', async function () {
  browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null
  });

  page = await browser.newPage();
  await page.goto('http://localhost:3000');
});

When('I click {string}', async function (value) {
  const buttons = await page.$$('button');

  for (const btn of buttons) {
    const text = await btn.evaluate(el => el.innerText);

    if (text === value) {
      await btn.click();
      return;
    }
  }

  throw new Error(`Button "${value}" not found`);
});

Then('I should see {string}', async function (expected) {
  const value = await page.$eval('[data-testid="display"]', el => el.value);

  if (value !== expected) {
    throw new Error(`Expected ${expected} but got ${value}`);
  }
});

Then('input should be empty', async function () {
  const value = await page.$eval('[data-testid="display"]', el => el.value);

  if (value !== '') {
    throw new Error(`Expected empty input but got ${value}`);
  }
});

Then('input should show {string}', async function (expected) {
  const value = await page.$eval('[data-testid="display"]', el => el.value);

  if (value !== expected) {
    throw new Error(`Expected ${expected} but got ${value}`);
  }
});

After(async function () {
  if (browser) {
    await browser.close();
  }
});
