const actions = driver.actions({ async: true });
const kb = actions.keyboard();
const mouse = actions.mouse();

actions.keyDown(SHIFT).pause(kb).pause(kb).key(SHIFT);
actions.pause(mouse).move({ origin: el }).press().release();
actions.perform();
