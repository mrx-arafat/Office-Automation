const { Builder, By, until } = require("selenium-webdriver");
const { faker } = require("@faker-js/faker");

(async function createAndPublishWordPressPage() {
  // Set up the driver
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    console.log("Navigating to the WordPress admin login page...");
    await driver.get("http://eb-site.local/wp-admin/");

    console.log("Entering username...");
    await driver
      .wait(until.elementLocated(By.id("user_login")), 10000)
      .sendKeys("moxy");

    console.log("Entering password...");
    await driver
      .wait(until.elementLocated(By.id("user_pass")), 10000)
      .sendKeys("test");

    console.log("Clicking 'Log In' button...");
    await driver.wait(until.elementLocated(By.id("wp-submit")), 10000).click();

    console.log("Navigating to 'Pages' section...");
    await driver.get("http://eb-site.local/wp-admin/edit.php?post_type=page");

    // Wait for 3 seconds
    await driver.sleep(3000);

    console.log("Waiting for 'Add New Page' button...");
    await driver
      .wait(
        until.elementLocated(By.xpath("//a[@class='page-title-action']")),
        10000
      )
      .click();

    console.log("Clicked on 'Add New Page' button.");

    // Wait for the new page editor to load
    await driver.sleep(3000);

    // Generate random title and content
    const randomTitle = faker.lorem.sentence();
    const randomContent = faker.lorem.paragraphs(3);

    console.log(`Entering title: ${randomTitle}`);
    const titleElement = await driver.wait(
      until.elementLocated(By.css(".editor-post-title__input")),
      10000
    );
    await titleElement.sendKeys(randomTitle);

    console.log("Waiting for content element...");
    // Increase timeout to 20000ms (20 seconds)
    const contentElement = await driver.wait(
      until.elementLocated(By.css(".block-editor-rich-text__editable")),
      20000
    );
    console.log(`Entering content: ${randomContent}`);
    await contentElement.sendKeys(randomContent);

    // Step 1: Click the first "Publish" button to open the publish panel
    console.log("Waiting for first 'Publish' button...");
    const initialPublishButton = await driver.wait(
      until.elementLocated(By.css(".editor-post-publish-button__button")),
      10000
    );
    await initialPublishButton.click();
    console.log("Clicked first 'Publish' button to open panel.");

    // Step 2: Wait for and click the final confirmation "Publish" button
    console.log("Waiting for final 'Publish' confirmation button...");
    const finalPublishButton = await driver.wait(
      until.elementLocated(By.xpath("//button[text()='Publish']")),
      10000
    );
    await finalPublishButton.click();
    console.log("Clicked on final 'Publish' confirmation button.");

    // Wait for a few seconds to ensure the page gets published
    await driver.sleep(3000);

    console.log("Navigating to the page view...");
    await driver.get("http://eb-site.local/wp-admin/edit.php?post_type=page");
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    await driver.quit();
  }
})();
