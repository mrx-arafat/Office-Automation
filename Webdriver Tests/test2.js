const { Builder, By } = require("selenium-webdriver");

(async function test2() {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    await driver.get("https://app.easy.jobs/login");

    let emailInput = await driver.findElement(By.css('input[type="email"]'));
    await emailInput.sendKeys("arafat@wpdeveloper.com");
  } finally {
    await driver.quit();
  }
})();
