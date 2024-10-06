const { Builder, By } = require("selenium-webdriver");

async function getHeadingText() {
  let driver = await new Builder().forBrowser("chrome").build();
  await driver.get("https://app.easy.jobs/login");
  let heading = await driver.findElement(By.css(".login-box__title"));
  let text = await heading.getText();
  console.log("Page Heading:", text);
  //   await driver.quit();
}

getHeadingText();
