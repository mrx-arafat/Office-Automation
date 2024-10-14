const { Builder } = require("selenium-webdriver");

async function manageWindowExample() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    await driver.get("http://the-internet.herokuapp.com");

    await driver.manage().window().maximize();
    console.log("Window maximized");
    await driver.sleep(1000);

    let windowSize = await driver.manage().window().getSize();
    console.log("Window size:", windowSize);
    await driver.sleep(1000);

    await driver.manage().window().setRect({ width: 800, height: 600 });
    console.log("Window resized to 800x600");
    await driver.sleep(1000);

    let windowPosition = await driver.manage().window().getRect();
    console.log("Window position:", windowPosition);
    await driver.sleep(1000);

    await driver.manage().window().setRect({ x: 100, y: 100 });
    console.log("Window moved to position (100, 100)");
    await driver.sleep(1000);

    await driver.manage().window().minimize();
    console.log("Window minimized");
  } finally {
    ///
  }
}

manageWindowExample();
