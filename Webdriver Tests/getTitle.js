const { Builder } = require("selenium-webdriver");

async function testGitHubTitle() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    await driver.get("https://github.com/login");
    let pageTitle = await driver.getTitle();
    console.log("Page title:", pageTitle);

    if (pageTitle === "Sign in to GitHub · GitHub") {
      console.log("Title is correct");
    } else {
      console.log("Title is incorrect");
    }
  } finally {
    await driver.quit();
  }
}

testGitHubTitle();
