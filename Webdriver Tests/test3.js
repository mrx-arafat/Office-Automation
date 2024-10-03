const { Builder, By } = require("selenium-webdriver");

(async function testLoginPage() {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    await driver.get("https://app.easy.jobs/login");

    await new Promise((resolve) => setTimeout(resolve, 2000));

    let googleSignInButton = await driver.findElement(
      By.css(".social-signin__button:first-child")
    );
    console.log("Clicking the 'Sign in with Google' button");
    await googleSignInButton.click();

    await new Promise((resolve) => setTimeout(resolve, 2000));

    await driver.get("https://app.easy.jobs/login");

    let linkedinSignInButton = await driver.findElement(
      By.css(".social-signin__button:nth-child(2)")
    );
    console.log("Clicking the 'Sign in with LinkedIn' button");
    await linkedinSignInButton.click();

    await new Promise((resolve) => setTimeout(resolve, 2000));

    await driver.get("https://app.easy.jobs/login");

    let emailField = await driver.findElement(By.css('input[type="email"]'));
    await emailField.sendKeys("arafat@wpdeveloper.com");
    console.log("Entered email: arafat@wpdeveloper.com");

    let passwordField = await driver.findElement(
      By.css('input[type="password"]')
    );
    await passwordField.sendKeys("Abcd@123");
    console.log("Entered password: Abcd@123");

    await new Promise((resolve) => setTimeout(resolve, 2000));

    let signInButton = await driver.findElement(
      By.css('button[type="submit"]')
    );
    console.log("Clicking the 'Sign In' button");
    await signInButton.click();

    await new Promise((resolve) => setTimeout(resolve, 2000));
  } finally {
    await driver.quit();
  }
})();
