const { Builder, By, Key, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getRandomDelay(min = 1000, max = 3000) {
  return Math.floor(Math.random() * (max - min) + min);
}

async function loginAndWritePost() {
  const username = "easinxarafat@gmail.com";
  const password = "xxxxxxx";

  const messageToType = "This is a test message. Leaving it as a draft!";

  let chromeOptions = new chrome.Options();
  chromeOptions.addArguments("--disable-notifications");

  let driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(chromeOptions)
    .build();

  try {
    await driver.get("https://www.facebook.com/");
    await delay(getRandomDelay());

    await driver.findElement(By.id("email")).sendKeys(username);
    await delay(getRandomDelay());
    await driver.findElement(By.id("pass")).sendKeys(password, Key.RETURN);
    await delay(getRandomDelay(2000, 4000));

    await driver.wait(until.titleContains("Facebook"), 10000);

    const createPostElement = await driver.wait(
      until.elementLocated(
        By.xpath(
          "/html/body/div[1]/div/div/div[1]/div/div[3]/div/div/div[1]/div[1]/div/div[2]/div/div/div/div[2]/div/div[2]/div/div/div/div[1]/div"
        )
      ),
      10000
    );
    await createPostElement.click();
    await delay(getRandomDelay(2000, 4000));

    const postBox = await driver.wait(
      until.elementLocated(
        By.xpath(
          "/html/body/div[1]/div/div/div[1]/div/div[4]/div/div/div[1]/div/div[2]/div/div/div/form/div/div[1]/div/div/div/div[2]/div[1]/div[1]/div[1]/div/div/div[1]/p"
        )
      ),
      5000
    );

    await postBox.sendKeys(messageToType);
    await delay(getRandomDelay(1500, 3000));

    console.log("Message written in the post box but not submitted.");

    const postButton = await driver.wait(
      until.elementLocated(
        By.xpath(
          "/html/body/div[1]/div/div/div[1]/div/div[4]/div/div/div[1]/div/div[2]/div/div/div/form/div/div[1]/div/div/div/div[3]/div[2]/div/div/div"
        )
      ),
      10000
    );
    await postButton.click();
    console.log("Post submitted successfully!");

    await delay(120000);
    console.log("120 seconds delay completed.");
  } finally {
  }
}

loginAndWritePost();
