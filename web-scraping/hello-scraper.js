const puppeteer = require("puppeteer");
const fs = require("fs");

(async () => {
  let data = [];

  const browser = await puppeteer.launch({
    headless: false,
    userDataDir: "./data",
  });
  const page = await browser.newPage();

  
    for (let pg = 1; pg <= 3; pg++) {
      
      await page.goto(
        "https://sh.ziroom.com/z/z2-s100025-t100334-u13-p"+`${pg}`+"/?sort=2" 
          
      );

      await page.waitForSelector("body > section > div.Z_list > div.Z_list-box > div > div.info-box > h5 > a");

      let titles = await page.$$eval(
        "body > section > div.Z_list > div.Z_list-box > div > div.info-box > h5 > a",
        (links) => links.map((x) => x.innerText)
      );

      console.log(titles);
      data = data.concat(titles);
      await page.waitForTimeout(5000);
    }
  

  fs.writeFile("data.json", JSON.stringify(data, null, "\t"), function (err) {
    if (err) {
      console.log(err);
    }
  });
})();