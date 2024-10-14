const { Builder, By, Key, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

// Helper function for random delays
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Random delay generator (e.g., between 1 and 3 seconds)
function getRandomDelay(min = 1000, max = 3000) {
  return Math.floor(Math.random() * (max - min) + min);
}

async function loginAndScrapeComments() {
  const username = "easinxarafat@gmail.com";
  n;
  const password = "xxxxxxxx";

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

    // Navigate to the provided URL
    await driver.get("https://www.facebook.com/share/v/zQ3foCoyAayQm7iZ/");
    await delay(getRandomDelay(3000, 5000));

    // Select the comments dropdown to display "All comments"
    const commentsDropdown = await driver.wait(
      until.elementLocated(
        By.xpath(
          "/html/body/div[1]/div/div/div[1]/div/div[3]/div/div/div[1]/div[1]/div[4]/div/div/div/div/div/div/div/div[1]/div/div/div/div/div/div/div/div/div/div/div[2]/div/div/div[4]/div/div/div[2]/div[2]/div/div/span/div"
        )
      ),
      10000
    );
    await commentsDropdown.click();
    await delay(getRandomDelay(2000, 3000));

    // Select the "All comments" option
    const allCommentsOption = await driver.wait(
      until.elementLocated(
        By.xpath(
          "/html/body/div[1]/div/div/div[1]/div/div[3]/div/div/div[2]/div/div/div[1]/div[1]/div/div/div/div/div/div/div[1]/div/div[3]/div[1]/div/div[1]/span"
        )
      ),
      10000
    );
    await allCommentsOption.click();
    await delay(getRandomDelay(2000, 4000));

    // Now click "View More Comments" until no more exist
    let viewMoreExists = true;
    while (viewMoreExists) {
      try {
        const viewMoreButton = await driver.findElement(
          By.xpath(
            "/html/body/div[1]/div/div/div[1]/div/div[3]/div/div/div[1]/div[1]/div[4]/div/div/div/div/div/div/div/div[1]/div/div/div/div/div/div/div/div/div/div/div[2]/div/div/div[4]/div/div/div[2]/div[3]/div[4]/div[1]/div/div[2]"
          )
        );

        if (viewMoreButton) {
          await viewMoreButton.click();
          console.log(
            "Clicked 'View More Comments'. Waiting for comments to load..."
          );
          await delay(5000);
        }
      } catch (error) {
        console.log("No more 'View More Comments' buttons found.");
        viewMoreExists = false;
      }
    }

    // Scrape all comment names and text
    const commentBlocks = await driver.findElements(
      By.css('div[role="article"]')
    ); // Find all comment blocks

    for (let block of commentBlocks) {
      try {
        // Extract the name of the commenter
        const nameElement = await block.findElement(
          By.css('span[class*="xeuugli"]')
        );
        const commenterName = await nameElement.getText();

        // Extract the comment text
        const commentElement = await block.findElement(
          By.css('div[dir="auto"]')
        );
        const commentText = await commentElement.getText();

        console.log(`Name: ${commenterName}, Comment: ${commentText}`);
      } catch (err) {
        console.log(`Error extracting comment: ${err.message}`);
      }
    }

    // Additional delay to observe the output
    await delay(10000);
  } finally {
    // await driver.quit();
  }
}

loginAndScrapeComments();
