const { Builder, By } = require("selenium-webdriver");

async function testGitHubLogin() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    await driver.get("https://github.com/login");

    let usernameField = await driver.findElement(By.id("login_field"));
    let usernamePlaceholder = await usernameField.getAttribute("placeholder");
    console.log("Username placeholder:", usernamePlaceholder);

    let passwordField = await driver.findElement(By.id("password"));
    let passwordPlaceholder = await passwordField.getAttribute("placeholder");
    console.log("Password placeholder:", passwordPlaceholder);

    let forgotPasswordLink = await driver.findElement(
      By.linkText("Forgot password?")
    );
    let linkTarget = await forgotPasswordLink.getAttribute("target");
    console.log("Forgot password link target:", linkTarget);

    if (linkTarget === "_blank") {
      console.log("Forgot password link opens in a new tab.");
    } else {
      console.log("Forgot password link does not open in a new tab.");
    }
  } finally {
    await driver.quit();
  }
}

testGitHubLogin();
