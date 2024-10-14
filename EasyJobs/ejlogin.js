const { Builder, By, until } = require("selenium-webdriver");

(async function loginExample() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    const email = "e4rafat+test1@gmail.com";
    const password = "e4rafat+test1";

    await driver.get("https://app.easy.jobs/login");
    console.log("Navigated to the login page");

    await driver
      .findElement(By.css("input[placeholder='youremail@gmail.com']"))
      .sendKeys(email);
    console.log("Email entered");

    await driver
      .findElement(By.css("input[placeholder='Enter password']"))
      .sendKeys(password);
    console.log("Password entered");

    await driver.findElement(By.css("button[type='submit']")).click();
    console.log("Login form submitted");

    await driver.wait(until.urlIs("https://app.easy.jobs/dashboard"), 10000);
    console.log("Successfully logged in and navigated to the dashboard");

    await driver.wait(
      until.elementLocated(By.css("a.sidebar__nav__link[href='/job/all']")),
      10000
    );

    await driver
      .findElement(By.css("a.sidebar__nav__link[href='/job/all']"))
      .click();
    console.log("Navigated to the Jobs page");

    await driver.wait(until.urlIs("https://app.easy.jobs/job/all"), 10000);
    console.log("Successfully navigated to the Jobs page");

    await driver.wait(
      until.elementLocated(
        By.css(".button.primary-button.text-capitalize.ml-auto")
      ),
      10000
    );

    await driver
      .findElement(By.css(".button.primary-button.text-capitalize.ml-auto"))
      .click();
    console.log("Clicked the 'Create a job post' button");
  } catch (error) {
    console.error("Error during login and navigation:", error);
  } finally {
  }
})();
