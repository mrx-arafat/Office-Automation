const { Builder, By } = require("selenium-webdriver");

async function handleAlert() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    await driver.get("http://the-internet.herokuapp.com/javascript_alerts");

    let alertButton = await driver.findElement(
      By.xpath("//button[text()='Click for JS Alert']")
    );

    await driver.sleep(2000);

    await alertButton.click();

    let alert = await driver.switchTo().alert();

    console.log("Alert text:", await alert.getText());

    await alert.accept();
    console.log("Alert accepted");
  } finally {
    //
  }
}

handleAlert();
