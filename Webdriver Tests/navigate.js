const { Builder } = require("selenium-webdriver");

async function navigateToPage() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    await driver.get("https://google.com");
    console.log("Open Google");

    await driver.navigate().to("https://app.easy.jobs/login");
    console.log("Navigated to Easy Jobs login page");

    await driver.navigate().back();
    console.log("Navigated back to Google");

    await driver.navigate().forward();
    console.log("Navigated forward to Easy Jobs login page");
    await driver.sleep(3000);
    await driver.navigate().refresh();
    console.log("Page refreshed");
  } finally {
    ///
  }
}

navigateToPage();
