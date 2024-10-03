const { Builder, By, until } = require("selenium-webdriver");
const { faker } = require("@faker-js/faker");

(async function createAndPublishWordPressPage() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    console.log("Navigating to WordPress editor...");
    await driver.get(
      "http://eb-site.local/wp-admin/post-new.php?post_type=page"
    );

    console.log("Checking if login is required...");
    const loginPageElement = await driver
      .wait(until.elementLocated(By.id("user_login")), 10000)
      .catch(() => null);

    if (loginPageElement) {
      console.log("Login detected, logging in...");
      await loginPageElement.sendKeys("moxya");

      console.log("Entering password...");
      await driver
        .wait(until.elementLocated(By.id("user_pass")), 10000)
        .sendKeys("test");

      console.log("Clicking 'Log In' button...");
      await driver
        .wait(until.elementLocated(By.id("wp-submit")), 10000)
        .click();
    }

    console.log("Waiting for the editor to load...");
    await driver.wait(
      until.elementLocated(By.css(".editor-post-title__input")),
      10000
    );

    const randomTitle = faker.lorem.words(3);

    console.log(`Entering title: ${randomTitle}`);
    const titleElement = await driver.wait(
      until.elementLocated(By.css(".editor-post-title__input")),
      10000
    );
    await titleElement.sendKeys(randomTitle);

    console.log("Clicking on the 'Publish' button...");
    const initialPublishButton = await driver.wait(
      until.elementLocated(By.css(".editor-post-publish-button__button")),
      10000
    );
    await initialPublishButton.click();

    console.log("Waiting for final 'Publish' confirmation button...");
    const finalPublishButton = await driver.wait(
      until.elementLocated(
        By.css(
          ".editor-post-publish-panel__header-publish-button .editor-post-publish-button__button"
        )
      ),
      10000
    );
    await finalPublishButton.click();

    console.log("Waiting for post-publish confirmation...");
    await driver.sleep(3000);

    console.log("Closing the modal...");
    const closeButton = await driver.wait(
      until.elementLocated(By.css(".components-button[aria-label='Close']")),
      10000
    );
    await closeButton.click();

    await driver.sleep(1000);

    console.log("Navigating to the page preview...");
    const previewLink = await driver.wait(
      until.elementLocated(By.css("a.components-button.is-primary")),
      10000
    );
    await previewLink.click();

    await driver.sleep(3000);

    console.log("Page preview opened successfully.");
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
  }
})();
