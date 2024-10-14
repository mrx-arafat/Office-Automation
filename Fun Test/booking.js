const { Builder, By, until } = require("selenium-webdriver");
const moment = require("moment");
require("chromedriver");

(async function bookingAutomation() {
  let driver = await new Builder().forBrowser("chrome").build();

  async function dismissPopupIfPresent() {
    try {
      let dismissButton = await driver.wait(
        until.elementLocated(
          By.css('button[aria-label="Dismiss sign-in info."]')
        ),
        2000
      );
      await dismissButton.click();
      console.log("Popup dismissed.");
    } catch (err) {
      console.log("No popup found or failed to dismiss.");
    }
  }

  try {
    await driver.get("https://www.booking.com/");

    await dismissPopupIfPresent();

    let searchBox = await driver.wait(
      until.elementLocated(By.css('input[name="ss"]')),
      5000
    );
    await searchBox.sendKeys("Cox's Bazar");

    await dismissPopupIfPresent();

    let dateButton = await driver.findElement(
      By.css('[data-testid="searchbox-dates-container"]')
    );
    await dateButton.click();

    await driver.wait(until.elementLocated(By.css("[data-date]")), 5000);

    let checkInDate = moment().add(1, "days").format("YYYY-MM-DD");
    let checkOutDate = moment().add(4, "days").format("YYYY-MM-DD");

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

    await dismissPopupIfPresent();

    let searchButton = await driver.wait(
      until.elementLocated(By.css('button[type="submit"]')),
      5000
    );
    await searchButton.click();

    await driver.wait(
      until.elementLocated(By.css('[data-testid="property-card"]')),
      10000
    );

    await dismissPopupIfPresent();

    try {
      let sortByDropdown = await driver.wait(
        until.elementLocated(
          By.css('[data-testid="sorters-dropdown-trigger"]')
        ),
        5000
      );
      await sortByDropdown.click();

      let distanceSortOption = await driver.wait(
        until.elementLocated(
          By.xpath("//span[contains(text(), 'Distance from closest beach')]")
        ),
        5000
      );
      await distanceSortOption.click();
      console.log("Sorting by distance from closest beach.");
    } catch (err) {
      console.error("Error sorting by distance from the closest beach:", err);
    }

    await driver.sleep(3000);

    let hotels = await driver.findElements(
      By.css('[data-testid="property-card"]')
    );

    for (let hotel of hotels) {
      try {
        let hotelNameElement = await hotel.findElement(
          By.css('[data-testid="title"]')
        );
        let hotelName = await hotelNameElement.getText();

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
    await driver.sleep(30000);
  }
})();
