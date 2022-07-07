const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const moment = require("moment");

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
    const $courseList = $(".td_module_wrap");
    $courseList.each((idx,node) => {
        const gettitle = $(node).find(".entry-title").text().replace(/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi);
        const getcontent = $(node).find(".td-excerpt ").text().replace(/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi);
        const gettime = $(node).find('time').text();
        const settime = moment(gettime).format("YYYYMMDD");
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
    const $courseList = $(".td_module_wrap");
    $courseList.each((idx,node) => {
        const gettitle = $(node).find(".entry-title").text().replace(/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi);
        const getcontent = $(node).find(".td-excerpt ").text().replace(/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi);
        const gettime = $(node).find('time').text();
        const settime = moment(gettime).format("YYYYMMDD");
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