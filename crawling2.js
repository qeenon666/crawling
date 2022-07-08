const cheerio = require("cheerio");
const fs = require("fs");
const moment = require("moment");
const {Builder, By, Key} = require("selenium-webdriver");

const rink = ["https://mbaranking.com","https://edutimes.com"]

const parsing = async () => {
    
    for(i=0;i<rink.length;i++){
        const driver = new Builder().forBrowser("chrome").build();
        await driver.get(rink[i]);
        const searchname = await driver.findElement(By.className("tdb-head-search-btn"));
        await searchname.click();
        await driver.sleep(1000)
        const titlesearch = await driver.findElement(By.className("tdb-head-search-form-input"));
        titlesearch.sendKeys("MBA",Key.ENTER);
        await driver.sleep(1000);
        const html = await driver.getPageSource();
        const $ = cheerio.load(html);
        const $htmlList = $(".tdb_module_loop");
        $htmlList.each((idx,node) => {
            const gettitle = $(node).find(".entry-title").text().replace(/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi);
            const getcontent = $(node).find(".td-excerpt ").text().replace(/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi);
            const gettime = $(node).find('time').text();
            const settime = moment(gettime, "").format("YYYYMMDD");
            fs.writeFile(`${settime+"-"+gettitle}.txt`,gettitle+"\n"+getcontent,function(err){
                if (err === null) {
                    console.log('success');
                } else {
                    console.log('fail');
                }
            });
        });
        driver.sleep(1000);
        driver.close();
    }
}

parsing();
