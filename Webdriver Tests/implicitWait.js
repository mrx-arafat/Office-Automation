const { Builder, By } = require("selenium-webdriver");

async function wordpressLogin() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    // Set an implicit wait of 10 seconds for all elements
    await driver.manage().setTimeouts({ implicit: 10000 });

    // Navigate to the WordPress login page
    await driver.get("https://wordpress.com/log-in");

    // Locate the username input field
    let usernameField = await driver.findElement(By.id("usernameOrEmail"));
    await usernameField.sendKeys("e4rafat@gmail.com");
    console.log("Entered username or email");

    // Locate and click the Continue button
    let continueButton = await driver.findElement(
      By.css(".login__form-action button")
    );
    await continueButton.click();
    console.log("Clicked Continue");

    // Locate the password input field (after clicking Continue, it takes time to appear)
    let passwordField = await driver.findElement(By.id("password"));
    await passwordField.sendKeys("your-password");
    console.log("Entered password");

    // Locate and click the Log In button
    let loginButton = await driver.findElement(
      By.css(".login__form-action button")
    );
    await loginButton.click();
    console.log("Clicked Logged in");
  } finally {
    // await driver.quit();
  }
}

wordpressLogin();
