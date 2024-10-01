const { Builder, By, until } = require("selenium-webdriver");
const { faker } = require("@faker-js/faker");

async function registerAndLogin() {
  let driver = await new Builder().forBrowser("chrome").build();

  let firstName = faker.person.firstName();
  let lastName = faker.person.lastName();
  let email = faker.internet.email();
  let password = "Abcd@123";

  try {
    // Navigate to the registration page
    await driver.get("https://app.easy.jobs/registration");

    // Fill in the registration form
    await driver
      .findElement(By.css("input[placeholder='Enter first name']"))
      .sendKeys(firstName);
    await driver
      .findElement(By.css("input[placeholder='Enter last name']"))
      .sendKeys(lastName);
    await driver
      .findElement(By.css("input[placeholder='youremail@gmail.com']"))
      .sendKeys(email);
    await driver
      .findElement(By.css("input[placeholder='Password']"))
      .sendKeys(password);
    await driver
      .findElement(By.css("input[placeholder='Re-Type Password']"))
      .sendKeys(password);

    // Submit the registration form
    await driver.findElement(By.css("button[type='submit']")).click();

    // Wait for the registration to complete
    await driver.sleep(2000);

    // Click the logout button
    await driver.findElement(By.css(".back-button__text")).click();

    // Wait for 10 seconds before logging in
    await driver.sleep(10000);

    // Wait for the login email input to be present
    await driver.wait(
      until.elementLocated(By.css("input[placeholder='youremail@gmail.com']")),
      10000
    );

    // Fill in the login form
    await driver
      .findElement(By.css("input[placeholder='youremail@gmail.com']"))
      .sendKeys(email);
    await driver
      .findElement(By.css("input[placeholder='Enter password']"))
      .sendKeys(password);

    // Submit the login form
    await driver.findElement(By.css("button[type='submit']")).click();

    // Wait for a moment after logging in
    await driver.sleep(2000);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await driver.quit();
  }
}

(async function main() {
  // Create an array of promises for 3 concurrent registrations
  const registrations = [];
  for (let i = 0; i < 3; i++) {
    registrations.push(registerAndLogin());
  }

  // Wait for all registrations to complete
  await Promise.all(registrations);
})();
