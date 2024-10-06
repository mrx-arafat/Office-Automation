const { Builder, By } = require("selenium-webdriver");

async function extractHeaders() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    await driver.get(
      "https://betterdocs.co/create-training-manuals-your-ultimate-guide/"
    );

    let headers = await driver.findElements(By.css("h1, h2, h3, h4"));

    for (let header of headers) {
      let text = await header.getText();
      console.log(text);
    }
  } finally {
    await driver.quit();
  }
}

extractHeaders();
