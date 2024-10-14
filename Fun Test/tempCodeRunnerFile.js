const { Builder, By, until } = require("selenium-webdriver");
const moment = require("moment");
require("chromedriver");

(async function bookingAutomation() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    // Step 1: Navigate to Booking.com
    await driver.get("https://www.booking.com/");

    // Step 2: Dismiss the popup (if it appears)
    try {
      let dismissButton = await driver.wait(
        until.elementLocated(
          By.css('button[aria-label="Dismiss sign-in info."]')
        ),
        5000 // Wait up to 5 seconds for the popup to appear
      );
      await dismissButton.click();
      console.log("Popup dismissed.");
    } catch (err) {
      console.log("No popup found or failed to dismiss.");
    }

    // Step 3: Find the search box, input "Cox's Bazar"
    let searchBox = await driver.wait(
      until.elementLocated(By.css('input[name="ss"]')),
      5000 // Wait up to 5 seconds for the search box to be present
    );
    await searchBox.sendKeys("Cox's Bazar");

    // Step 4: Open the calendar and select the next 3 days
    let dateButton = await driver.findElement(
      By.css('[data-testid="searchbox-dates-container"]')
    );
    await dateButton.click();

    // Wait for the calendar to be available
    await driver.wait(until.elementLocated(By.css("[data-date]")), 5000);

    // Calculate check-in and check-out dates using moment.js
    let checkInDate = moment().add(1, "days").format("YYYY-MM-DD");
    let checkOutDate = moment().add(4, "days").format("YYYY-MM-DD");

    // Ensure the dates exist in the DOM before clicking
    try {
      let checkInInput = await driver.wait(
        until.elementLocated(By.css(`[data-date="${checkInDate}"]`)),
        5000
      );
      await checkInInput.click();

      let checkOutInput = await driver.wait(
        until.elementLocated(By.css(`[data-date="${checkOutDate}"]`)),
        5000
      );
      await checkOutInput.click();
    } catch (error) {
      console.error("Error selecting dates:", error);
    }

    // Step 5: Click the 'Search' button
    let searchButton = await driver.wait(
      until.elementLocated(By.css('button[type="submit"]')),
      5000
    );
    await searchButton.click();

    // Step 6: Wait for the results to load (wait up to 10 seconds)
    await driver.wait(
      until.elementLocated(By.css('[data-testid="property-card"]')),
      10000 // Wait up to 10 seconds for the results to fully load
    );

    // Step 7: Click on the sort dropdown
    try {
      let sortByDropdown = await driver.wait(
        until.elementLocated(
          By.css('[data-testid="sorters-dropdown-trigger"]')
        ),
        5000 // Wait for the sort dropdown to appear
      );
      await sortByDropdown.click();

      // Step 8: Select "Distance from closest beach"
      let distanceSortOption = await driver.wait(
        until.elementLocated(
          By.xpath("//span[contains(text(), 'Distance from closest beach')]")
        ),
        5000 // Wait up to 5 seconds for the option to be visible
      );
      await distanceSortOption.click();
      console.log("Sorting by distance from closest beach.");
    } catch (err) {
      console.error("Error sorting by distance from the closest beach:", err);
    }

    // Step 9: Add a short delay to allow results to refresh after sorting
    await driver.sleep(3000);

    // Step 10: Fetch fresh elements after sorting (relocating elements to avoid stale references)
    let hotels = await driver.findElements(
      By.css('[data-testid="property-card"]')
    );

    for (let hotel of hotels) {
      try {
        // Relocate the hotel element after sorting to avoid stale reference
        let hotelNameElement = await hotel.findElement(
          By.css('[data-testid="title"]')
        );
        let hotelName = await hotelNameElement.getText();

        // Extract the distance (if available)
        try {
          let distanceElement = await hotel.findElement(
            By.css('[data-testid="distance"]')
          );
          let distance = await distanceElement.getText();
          console.log("Hotel Name:", hotelName);
          console.log("Distance:", distance);
        } catch (distanceError) {
          console.log(
            `No distance information available for hotel: ${hotelName}`
          );
        }
      } catch (err) {
        console.error("Error extracting hotel data:", err);
      }
    }
  } finally {
    // Close the browser
    // await driver.quit();
  }
})();
