const { Builder } = require("selenium-webdriver");

async function openPage() {
  let driver = await new Builder().forBrowser("chrome").build();
  await driver.get("https://app.easy.jobs/login");
  await driver.quit();
}

openPage();
