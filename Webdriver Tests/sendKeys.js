const { Builder, By } = require("selenium-webdriver");

async function openPage() {
  let driver = await new Builder().forBrowser("chrome").build();
  await driver.get("https://app.easy.jobs/login");
  await driver.quit();
}

openPage();

async function fillLoginForm() {
  let driver = await new Builder().forBrowser("chrome").build();
  await driver.get("https://app.easy.jobs/login");
  let emailField = await driver.findElement(By.css('input[type="email"]'));
  await emailField.sendKeys("test@example.com");
  let passwordField = await driver.findElement(
    By.css('input[type="password"]')
  );
  await passwordField.sendKeys("password123");
  console.log("Filled email and password fields");
}

fillLoginForm();
