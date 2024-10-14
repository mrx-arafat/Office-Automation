const { Builder, By, Key, until } = require("selenium-webdriver");
const { Actions } = require("selenium-webdriver/lib/input");

(async function scrollPage() {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    await driver.get(
      "https://www.selenium.dev/selenium/docs/api/javascript/Actions.html"
    );

    await driver.wait(until.elementLocated(By.css("body")), 10000);

    const pageHeight = await driver.executeScript(
      "return document.body.scrollHeight"
    );

    for (let i = 0; i < pageHeight; i += 100) {
      await driver.executeScript(`window.scrollTo(0, ${i});`);
      await driver.sleep(100);
    }
  } finally {
  }
})();
