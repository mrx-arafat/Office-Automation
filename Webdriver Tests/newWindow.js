const { Builder } = require("selenium-webdriver");

async function switchToNewWindow() {
  let driver = await new Builder().forBrowser("chrome").build();
  await driver.get("https://app.easy.jobs/login");
  let originalWindow = await driver.getWindowHandle();
  await driver.executeScript("window.open('https://google.com', '_blank');");
  let windows = await driver.getAllWindowHandles();
  await driver.switchTo().window(windows[1]);
  console.log("Switched to the new window");
}

switchToNewWindow();
