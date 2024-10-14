const { Builder, By } = require("selenium-webdriver");

async function wordpressLogin() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    await driver.manage().setTimeouts({ implicit: 10000 });

    await driver.get("https://wordpress.com/log-in");

    let usernameField = await driver.findElement(By.id("usernameOrEmail"));
    await usernameField.sendKeys("e4rafat@gmail.com");
    console.log("Entered username or email");

    let continueButton = await driver.findElement(
      By.css(".login__form-action button")
    );
    await continueButton.click();
    console.log("Clicked Continue");

    let passwordField = await driver.findElement(By.id("password"));
    await passwordField.sendKeys("your-password");
    console.log("Entered password");

    let loginButton = await driver.findElement(
      By.css(".login__form-action button")
    );
    await loginButton.click();
    console.log("Clicked Logged in");
  } finally {
    ///
  }
}

wordpressLogin();
