const { Builder, By } = require("selenium-webdriver");

async function navigateToPage() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    await driver.get("https://google.com");
    console.log("Navigated to Google");

    await driver.navigate().to("https://app.easy.jobs/login");
    console.log("Navigated to Easy Jobs login page");

    await driver.navigate().back();
    console.log("Navigated back to Google");
  } finally {
    // await driver.quit();
  }
}

navigateToPage();
