'use strict';
var http = require('http');
var fs = require('fs');
var https = require('https');
var iconv = require('iconv-lite');
var cheerio = require('cheerio');
const request = require('superagent')
var MongoClient = require('mongodb').MongoClient;
const moment = require('moment');
//require('superagent-charset')(request) // install charset
//var express = require('express');

class GeekParkSpider {
    /*var url = 'http://price.pcauto.com.cn/shangjia/';
    var app = express();

    var MongoClient = require('mongodb').MongoClient;
    // 数据库cars
    var DB_CONN_STR = 'mongodb://localhost:27017/test';*/


    getUrl() {
        var url = 'http://www.geekpark.net/column/74';
        //var app = express();

        var MongoClient = require('mongodb').MongoClient;
        // 数据库cars
        //var DB_CONN_STR = 'mongodb://127.0.0.1:27017/test';
        var DB_CONN_STR = 'mongodb://test:123456@192.168.101.14:27017/test';
        
        //语音合成
        var AipSpeechClient = require("baidu-aip-sdk").speech;
        var APP_ID = "25252661";
        var API_KEY = "SSNgxCnwPtBlufAcElrztQyY";
        var SECRET_KEY = "u0R1S4zLXQnpqpCHxfNpLv040DgoN5UT";
        var client = new AipSpeechClient(APP_ID, API_KEY, SECRET_KEY);
        var fs = require('fs');


        http.get(url, function (sres) {
            var html1 = '';
            var chunks = [];

            sres.on('data', function (chunk) {
                chunks.push(chunk);
                html1 += chunk;
            });


            sres.on('end', function () {
                // 将二进制数据解码成 gb2312 编码数据
                var html = iconv.decode(Buffer.concat(chunks), 'utf-8');
                var $ = cheerio.load(html, {decodeEntities: false});

                //console.log($('body').html())
                var $zy = $('body').find('a[data-event-category="article-list.title"]')
                // console.log($zy)

                var list = [];
                var alltext;
                $zy.each(function (index) {

                    //if (index == 0) {
                        var $a = $(this);
                        var text = $a.text();
                        console.log(text+"========")
                        //console.log(text);attr('data-event-labe').
                        // console.log(text);
                        var videoName = moment(new Date()).format('YYYYMMDDHHmmsss') + "_" + index + ".wav"
                        var path = "./video/" + videoName
                        //console.log("videoname:" + videoName)
                        //aip
                        client.text2audio(text).then(function (result) {
                            if (result.data) {
                                fs.writeFileSync(path, result.data);
                            } else {
                                // 服务发生错误
                                console.log(result)
                            }
                        }, function (e) {
                            // 发生网络错误
                            console.log(e)
                        });

                        list.push({
                            date: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
                            summary: text,
                            videoName: videoName
                        })
                    //}
                })
                MongoClient.connect(DB_CONN_STR, function(err, db) {
                    console.log("连接成功！");
                    var dbcollect = db.db("test")
                    var collection = dbcollect.collection('geekNews');
                    //插入数据
                    collection.insert(list, function (err, result) {
                        if (err) {
                            console.log('Error:' + err);
                            return;
                        }
                        //console.log(result);
                    });
                });


            })

        });
    }


}

module.exports = new GeekParkSpider();