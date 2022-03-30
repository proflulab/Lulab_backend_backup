const GeekParkSpider = require("../spider/geekParkSpider")
module.exports = {
    schedule: {
        interval: '120m', // 任务的间隔时间, 这个定义的10秒执行一次*/
       // cron: '0 0 9 * * *',
        type: 'all', // 指定所有的 worker都需要执行
    },
    async task(ctx) {
        // 这里编写我们要执行的任务代码, 我们这里就打印一下当前时间的试试
     /*   var dataGeek = await ctx.curl('http://43.154.186.113:3000/crawl/api?user=zzz&cid=4220c933-9bd4-41d5-a263-84485cff9937',{
            method: 'GET',
            dataType: 'json',
            timeout: 10000
        });
        var dataTiger =await  ctx.curl('http://43.154.186.113:3000/crawl/api?user=zzz&cid=239319d2-9dfc-4606-b4aa-106cbb38cde0',{
            method: 'GET',
            dataType: 'json',
            timeout: 10000
        });
        var dataEntry =await  ctx.curl('http://43.154.186.113:3000/crawl/api?user=zzz&cid=de0879b5-a05b-4f43-844b-f3633130d16c',{
            method: 'GET',
            dataType: 'json',
            timeout: 10000
        });*/
      /*  var dataBlack =await  ctx.curl('http://43.154.186.113:3000/crawl/api?user=zzz&cid=5d53fc6d-f2bc-4440-aaa4-c827c414de14',{
            method: 'GET',
            dataType: 'json',
            timeout: 10000
        });
        */
        await Promise.all([dataGeek,dataTiger,dataEntry]);
       /* dataGeek = await   dataGeek;
        dataTiger = await  dataTiger;
        dataEntry = await  dataEntry;*/
        // dataBlack = await  dataBlack;

        console.log("任务执行爬虫 : "+ new Date().toString());
       // GeekParkSpider.getUrl();
    },
};