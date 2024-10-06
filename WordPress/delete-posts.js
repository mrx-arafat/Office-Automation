const { Builder, By, until } = require("selenium-webdriver");
const { Select } = require("selenium-webdriver");

(async function deleteAllPosts() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    console.log("Navigating to WordPress posts page...");
    await driver.get("http://eb-site.local/wp-admin/edit.php");

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

    console.log("Checking if there are posts to delete...");

    // Check if the 'Select All' checkbox exists (indicating there are posts)
    const postsExist = await driver
      .findElements(By.id("cb-select-all-1"))
      .then((elements) => elements.length > 0);

    if (postsExist) {
      console.log("Posts found. Proceeding with deletion...");

      console.log("Selecting all posts...");
      const selectAllCheckbox = await driver.findElement(
        By.id("cb-select-all-1")
      );
      await selectAllCheckbox.click();

      console.log("Choosing 'Move to Trash' from bulk actions...");

      // Wait for the bulk action dropdown to be available
      await driver.wait(
        until.elementLocated(By.id("bulk-action-selector-top")),
        10000
      );

      const bulkActionSelector = await driver.findElement(
        By.id("bulk-action-selector-top")
      );

      if (bulkActionSelector) {
        const selectDropdown = new Select(bulkActionSelector);
        await selectDropdown.selectByValue("trash"); // Selecting by value 'trash'

        console.log("Clicking 'Apply' button...");
        const applyButton = await driver.findElement(By.id("doaction"));
        await applyButton.click();

        console.log("Waiting for confirmation that posts were deleted...");
        await driver.wait(
          until.elementLocated(By.css(".notice-success")),
          10000
        );
        console.log("Posts moved to trash.");
      } else {
        console.error("Bulk action dropdown not found!");
      }

      // Now check if "No posts found" appears after deletion
      console.log("Checking if 'No posts found' message appears...");
      const noPostsMessage = await driver
        .findElements(By.xpath("//td[contains(text(), 'No posts found.')]"))
        .then((elements) => elements.length > 0);

      if (noPostsMessage) {
        console.log("'No posts found' message detected.");
      } else {
        console.log(
          "'No posts found' message not detected. Posts may still exist."
        );
      }
    } else {
      console.log("No posts found.");
    }
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    // Uncomment this line when you're ready to close the browser
    // await driver.quit();
  }
})();
