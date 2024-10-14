const { Builder, By, until } = require("selenium-webdriver");
const { faker } = require("@faker-js/faker");

(async function createAndPublishWordPressPost() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    console.log("Navigating to WordPress post editor...");
    await driver.get("http://eb-site.local/wp-admin/post-new.php");

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

    console.log("Waiting for the post editor to load...");
    await driver.wait(
      until.elementLocated(By.css(".block-editor-writing-flow")),
      10000
    );

    const randomTitle = faker.lorem.words(3);
    const randomContent = faker.lorem.paragraphs(2);

    console.log(`Entering title: ${randomTitle}`);
    const titleElement = await driver.findElement(
      By.css(".editor-post-title__input")
    );
    await titleElement.sendKeys(randomTitle);

    console.log("Entering content...");

    const contentBlock = await driver.wait(
      until.elementLocated(
        By.css(".block-editor-default-block-appender__content")
      ),
      10000
    );
    await contentBlock.click();

    const contentElement = await driver.findElement(
      By.css(".block-editor-rich-text__editable")
    );
    await contentElement.click();

    await driver.executeScript(
      "arguments[0].innerText = arguments[1]",
      contentElement,
      randomContent
    );

    console.log("Clicking on the 'Publish' button...");

    const publishButton = await driver.wait(
      until.elementLocated(
        By.css(".editor-post-publish-button__button.is-primary.is-compact")
      ),
      10000
    );
    await publishButton.click();

    console.log("Waiting for the 'Confirm Publish' button...");
    const confirmPublishButton = await driver.wait(
      until.elementLocated(
        By.css(
          ".editor-post-publish-panel__header-publish-button .editor-post-publish-button__button"
        )
      ),
      10000
    );
    await confirmPublishButton.click();

    console.log("Post published successfully.");

    console.log("Waiting for the 'View Post' button...");
    const viewPostButton = await driver.wait(
      until.elementLocated(By.css("a.components-button.is-primary")),
      10000
    );
    const postUrl = await viewPostButton.getAttribute("href");
    console.log(`Post published. You can view it at: ${postUrl}`);

    await viewPostButton.click();
    await driver.sleep(3000);

    console.log("Post preview opened successfully.");
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    ///
  }
})();
