const { Builder } = require("selenium-webdriver");

(async function test1() {
  // Get the browser ready
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    await driver.get("https://app.easy.jobs/login");
  } finally {
    await driver.quit();
  }
})();
