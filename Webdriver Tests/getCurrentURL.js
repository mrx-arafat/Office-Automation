const { Builder } = require("selenium-webdriver");

async function testGitHubCurrentUrl() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    await driver.get("https://github.com/login");
    let currentUrl = await driver.getCurrentUrl();
    console.log("Current URL:", currentUrl);
  } finally {
    await driver.quit();
  }
}

testGitHubCurrentUrl();
