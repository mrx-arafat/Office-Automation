const { Builder, By } = require("selenium-webdriver");

async function findSearchBar() {
  let driver = await new Builder().forBrowser("chrome").build();
  await driver.get("https://google.com");
  let searchBar = await driver.findElement(By.name("q"));
}

findSearchBar();
