const { Builder, By } = require("selenium-webdriver");

async function googleSearch(query) {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    await driver.get("https://www.google.com");

    let searchBox = await driver.findElement(By.name("q"));

    await searchBox.sendKeys(query);

    await driver.sleep(1000);

    let searchButton = await driver.findElement(By.name("btnK"));

    await searchButton.click();

    await driver.sleep(2000);

    console.log("Search completed for:", query);
  } finally {
    // await driver.quit();
  }
}

googleSearch("Arafat Mist");
