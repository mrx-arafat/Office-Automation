const { Builder, By, until } = require("selenium-webdriver");
const { faker } = require("@faker-js/faker");

(async function example() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const email = faker.internet.email();
    const password = "Abcd@1234";

    console.log(`Generated User Details: 
      First Name: ${firstName}, 
      Last Name: ${lastName}, 
      Email: ${email}, 
      Password: ${password}`);

    await driver.get("https://app.easy.jobs/registration");

    console.log(await driver.getTitle());

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

    await driver.findElement(By.css("button[type='submit']")).click();

    await driver.wait(
      until.urlIs("https://app.easy.jobs/subscribe?plan=free"),
      10000
    );
    await driver.findElement(By.css("button[type='submit']")).click();

    await driver.wait(
      until.urlContains("https://app.easy.jobs/company/create"),
      10000
    );

    const companyName = faker.company.name();
    const username = `${faker.internet
      .userName()
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "")}${Math.floor(Math.random() * 100)}`;
    const phoneNumber = faker.phone.number();

    console.log(`Generated Company Details: 
      Company Name: ${companyName}, 
      Username: ${username}, 
      Phone Number: ${phoneNumber}`);

    await driver.findElement(By.id("company-name")).sendKeys(companyName);
    await driver.findElement(By.id("username")).sendKeys(username);
    await driver.findElement(By.id("phone-no")).sendKeys(phoneNumber);

    await driver.findElement(By.css(".multiselect__tags")).click();

    await driver.wait(
      until.elementLocated(
        By.css("div.col-md-6.login-content li:nth-child(11)")
      ),
      10000
    );

    await driver
      .findElement(By.css("div.col-md-6.login-content li:nth-child(11)"))
      .click();

    const website = faker.internet.url();
    await driver.findElement(By.id("website")).sendKeys(website);
    await driver.findElement(By.css("label.checkbox.mt-3 span")).click();
    await driver.findElement(By.css("button[type='submit']")).click();

    await driver.findElement(By.css("button.dropdown-toggle")).click();
    await driver
      .findElement(
        By.css("div.dropdown.profile-control li:nth-child(3) a:nth-child(1)")
      )
      .click();

    await driver
      .findElement(By.css("input[placeholder='youremail@gmail.com']"))
      .clear();
    await driver
      .findElement(By.css("input[placeholder='youremail@gmail.com']"))
      .sendKeys(email);
    await driver
      .findElement(By.css("input[placeholder='Enter password']"))
      .sendKeys(password);

    await driver.sleep(3000);

    await driver.findElement(By.css("button[type='submit']")).click();
    await driver.wait(until.urlIs("https://app.easy.jobs/dashboard"), 10000);
    await driver.findElement(By.css(".button.info-button")).click();
  } finally {
    ///
  }
})();
