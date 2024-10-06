const { Builder, By } = require("selenium-webdriver");

async function interactWithRecaptcha() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    await driver.get("https://www.google.com/recaptcha/api2/demo");

    let recaptchaFrame = await driver.findElement(
      By.css('iframe[title="reCAPTCHA"]')
    );

    await driver.switchTo().frame(recaptchaFrame);
    console.log("Switched to the reCAPTCHA iframe");

    let recaptchaCheckbox = await driver.findElement(
      By.css(".recaptcha-checkbox-border")
    );
    await recaptchaCheckbox.click();
    console.log("Clicked on the reCAPTCHA checkbox");
  } finally {
    //quit
  }
}

interactWithRecaptcha();
