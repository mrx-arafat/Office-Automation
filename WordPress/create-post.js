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

    // Ensure the content block is present and ready
    const contentBlock = await driver.wait(
      until.elementLocated(
        By.css(".block-editor-default-block-appender__content")
      ),
      10000
    );
    await contentBlock.click(); // This opens/focuses the content area

    const contentElement = await driver.findElement(
      By.css(".block-editor-rich-text__editable")
    );
    await contentElement.click(); // Ensure the content block is focused

    // Instead of directly sending content to the content field, use JavaScript to insert text
    await driver.executeScript(
      "arguments[0].innerText = arguments[1]",
      contentElement,
      randomContent
    );

    console.log("Clicking on the 'Publish' button...");

    // Find and click the Publish button using a more specific selector
    const publishButton = await driver.wait(
      until.elementLocated(
        By.css(".editor-post-publish-button__button.is-primary.is-compact")
      ),
      10000
    );
    await publishButton.click();

    // Wait for the publish confirmation, and click if necessary
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

    // Wait for the "View Post" button and click it
    console.log("Waiting for the 'View Post' button...");
    const viewPostButton = await driver.wait(
      until.elementLocated(By.css("a.components-button.is-primary")),
      10000
    );
    const postUrl = await viewPostButton.getAttribute("href");
    console.log(`Post published. You can view it at: ${postUrl}`);

    await viewPostButton.click(); // This will open the post in the browser
    await driver.sleep(3000); // Wait for the page to load

    console.log("Post preview opened successfully.");
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    // await driver.quit();
  }
})();
