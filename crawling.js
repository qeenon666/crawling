const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const dayjs = require("dayjs");

const url = "https://mbaranking.com";
const url2 = "https://edutimes.com";
const getHTML = async() => {
    try{
        return await axios.get(url);
    }catch(err){
        console.log(err);
    }
}
const getHTML2 = async() => {
    try{
        return await axios.get(url2);
    }catch(err){
        console.log(err);
    }
}

const parsing = async () => {
    const html = await getHTML();
    const $ = cheerio.load(html.data);
    const $htmlList = $(".td_module_wrap");
    $htmlList.each((idx,node) => {
        const gettitle = $(node).find(".entry-title").text().replace(/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi);
        const getcontent = $(node).find(".td-excerpt ").text().replace(/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi);
        const gettime = $(node).find('time').text();
        const settime = dayjs(gettime).format("YYYYMMDD");
        fs.writeFile(`${settime+"-"+gettitle}.txt`,gettitle+"\n"+getcontent,function(err){
            if (err === null) {
                console.log('success');
            } else {
                console.log('fail');
            }
        });
    });
}
const parsing2 = async () => {
    const html = await getHTML2();
    const $ = cheerio.load(html.data);
    const $htmlList = $(".td_module_wrap");
    $htmlList.each((idx,node) => {
        const gettitle = $(node).find(".entry-title").text();
        const getcontent = $(node).find(".td-excerpt ").text();
        const gettime = $(node).find('time').text();
        const settime = dayjs(gettime).format("YYYYMMDD");
        fs.writeFile(`${settime+"-"+gettitle}.txt`,gettitle+"\n"+getcontent,function(err){
            if (err === null) {
                console.log('success');
            } else {
                console.log('fail');
            }
        });
    });
}
parsing();
parsing2();