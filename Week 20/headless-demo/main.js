const puppeteer = require("puppeteer");
(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    await page.goto("http://127.0.0.1:5500/home.html");

    const a = await page.$("a");
    console.log(await a.asElement().boxModel());
})();