'use strict';
const DataLoader = require('dataloader');
const BasicConnector = require('../common/basicConnector');

const dialogflow = require('@google-cloud/dialogflow');

// Instantiates a session client

const moment = require('moment');
const MODEL_NAME = 'User';

class UserConnector /*extends BasicConnector */ {

    constructor(ctx, model) {
        this.ctx = ctx;
        //this.model = model;
        ids => this.fetch(ids)
        ;
    }

    async fetch(ids) {
        /* return await this.ctx.model.User.create({
           name:"testone"
         });*/
        console.log("what is the ids" + ids)
        return await this.ctx.model.User.find({
            name: ids
        });
    }

    fetchByIds(ids) {
        return this.loader.loadMany(ids);
    }

    async fetchById(id) {
        return this.loader.load(id);
    }

    //login
    async fetchByName(userInput) {
        var user = await this.ctx.model.User.findOne(
            {"name": userInput.name}, function (err, docs) {
                console.log(docs);
            }
        );

        await Promise.all([user]);
        user = await user;
        if(user == null || !user){
            return {"status": 1, "msg": "该用户不存在"}
        }

        if (userInput.password == user.password) {
            return {"status": 0, "msg": "success", data:user}
        } else {
            return {"status": 1, "msg": "faile"}
        }

    }


    //rigister
    async userRigister(userInput) {
        if(userInput.password != userInput.ensurePassword){
        //var msg ="\n <div class=\"title\">新冠自测掀起千亿市场，这些企业正在加速布局</div>\n <div class=\"author\">\n <span class=\"time fl\">\n <span class=\"fonteditor icon-time icon\"></span>2022-03-19 18:18 </span>\n <span class=\"time fr\">\n <span class=\"fonteditor icon-tag icon\"></span>新冠自测 </span>\n </div>\n <p class=\"img-content\">\n <img src=\"http://upload.iheima.com/2022/0319/1647685107114.jpg\" alt=\"2新冠自测掀起千亿市场，这些企业正在加速布局\">\n </p>\n <div class=\"outline\">\n <p></p>\n </div>\n <p>来源：猎云网（ID：ilieyun） 作者：孙媛</p>\n<p>新一轮的新冠疫情之下，一个个小小的新冠抗原检测试剂盒正成为核酸检测的辅助，进入日常生活。</p>\n<p>3月11日，国家卫健委发布文件，讨论已久的抗原自测终于开闸，作为新冠检测的补充方案开始试行。在国外卖疯国内“遇冷”的抗原检测产品，一时炙手可热，以前所未有的速度涌入市场。</p>\n<p>短短一周内，国内已有12款产品火速获批。杭州、厦门、吉林等城市更是陆续发起了向居民免费派发新冠自测盒的行动。位于吉林省长春市南关区的狄女士对猎云网表示，小区正在挨家挨户发自测盒。“之前我家小区是下楼做核酸的，但昨天我家隔壁小区有确诊，所以现在不让下楼。就领取自测盒，将结果发到小区群里即可。”</p>\n<p>狄女士坦言，在吉林现在疫情每天新增多例的情况下，自己也担心在等待核酸检测的过程中出现问题，很乐于接受自测盒这类检测方式。但检测过程也并不那么美好，自测加重了心理负担，甚至还有人捅出鼻血。</p>\n<p style=\"text-align: center; text-indent: 0;\"><img src=\"https://img.36krcdn.com/20220319/v2_5104819159c548a2a18954380f2edc0e_img_000\" border=\"0\" data-img-size-val=\"\"></p>\n<p>来源：受访者供图</p>\n<p>在政府、获批企业、药店和电商平台的参与下，一场抗原检测产品的备货竞速战如火如荼地进行，无论是出于公共卫生政策、还是商业利益的考量，一个新千亿赛道的大门已经打开。</p>\n<p>头部电商携手获批企业，竞速C端自测市场</p>\n<p>目前市场上新冠检测盒的检测方法主要分为两种，一种是基于分子层面的核酸检测；一种是基于免疫学原理的检测，主要是抗原检测和抗体检测。</p>\n<p>虽然相较于核酸检测，抗原检测准确度低，但其出结果速度快、操作简便，可应用居家自检的特性，在大规模筛查阳性人群和康复评估上有着不容忽视的优势，能对核酸检测进行有效补充。也因此，在国外疫情爆发以来以及中国香港地区最近的防疫实践中，抗原检测起到了重要的作用。</p>\n<p>据《新冠病毒抗原检测应用方案（试行）》内容显示，抗原检测的适用人群：一是到基层医疗卫生机构就诊，伴有呼吸道、发热等症状且出现症状5天以内的人员；二是隔离观察人员，包括居家隔离观察、密接和次密接、入境隔离观察、封控区和管控区内的人员；三是有抗原自我检测需求的社区居民。</p>\n<p>里面提到，社区居民有需求的，可通过零售药店、网络销售平台等渠道，自行购买抗原检测试剂进行测试。</p>\n<p>而这也就催生了除了政府、企业集体采购外，更多C端消费者对抗原检测试剂的购买需求。各厂商也加速向各大药店和互联网平台供货。</p>\n<p>自3月12日首批获批企业名单一公布，包括益丰大药房、老百姓大药房等多在内的家连锁药店便开始与新冠抗原自测相关企业展开合作销售，天猫、京东、美团、苏宁等线上售卖渠道也纷纷跟进。据了解，新冠抗原检测产品售卖价格在30元/份左右浮动。检测试剂结果在15~20分钟内就可读取。</p>\n<p>从线上医药电商渠道来看，多个商家已经开启预约和预售模式，其中，美团最快，京东最全。</p>\n<p style=\"text-align: center; text-indent: 0;\"><img src=\"https://img.36krcdn.com/20220319/v2_31d9641911cf4fd7b15c43f39684a218_img_000\" border=\"0\" data-img-size-val=\"\"></p>\n<p>来源：猎云网</p>\n<p>3月13日，除可以在美团买药上预约，美团还联合了老百姓大药房、国大药房等多家连锁药店，与线下药店同步上架新冠抗原自测产品。而京东则是除上架5款经国家药监局获批的新冠抗原自测试剂之外，还有从日本以及印度进口的试剂盒，每支均价百元左右。</p>\n<p>天猫可在阿里健康大药房上下单购买；苏宁则是首页专门辟出了“新冠防疫专场”，开启预售。</p>\n<p>叮当快药、饿了么和平安好医生也不甘落后。3月14日叮咚快药携手热景生物上市首批新冠抗原自测试剂盒，将通过“网订店送”方式实现抗原检测试剂28分钟到家服务。平安好医生用户也表示即将上线首批新冠抗原自测试试剂盒，可在平安健康App中进行预约购买。</p>\n<p>这场新冠抗原检测试剂上架时速赛是疫情关键时期下，互联网企业对流量入口的抢夺。从上架速度可明显看出，以头部电商为主的巨头抢先入场，互联网医疗健康服务平台等垂直玩家则稍显落后。</p>\n<p>CIC灼识咨询合伙人王文华表示，京东、淘宝、美团、苏宁等作为线上最大的几家平台，是触达C端最重要的渠道，也是医院、药房等传统渠道之外最重要和增长最快的渠道。</p>\n<p>一方面，BAT们是中国活跃用户最大的互联网平台，巨量的流量资源需要找到变现的产品和服务，而合适在线上销售的产品需要有需求人群庞大、无区域性差异、方便物流配送并且轻售后等多个属性，新冠的检测试剂盒正是具备以上满足诸多属性的产品，既承担了疫情防控的社会责任，并且可以在短时间内分得这一巨大市场红利。因此互联网大厂一定会竞速争取最短时间内落地试剂盒的商业化。</p>\n<p>另一方面，对于企业而言，他们对于平台的选择也要考虑到企业自身既往和大互联网平台的合作，在定价、商业条款、排他等条款考虑，也要结合互联网平台能够为企业带来协同的资源。</p>\n<p>抗原检测企业出口转内销，打响价格战</p>\n<p>截至目前，市场供不应求之下，抗原检测产品从火速获批、再到集采，竞争愈发激烈，这就意味要想更快抢占更大份额的国内市场，一场价格战势在必行。参考核酸检测试剂自上市以来的降价历程，未来抗原检测试剂盒价格下降有较大的空间。</p>\n<p>3月15日，万孚生物主动申请其在广东省、河南省的中选产品新型冠状病毒（2019-nCoV）抗原检测试剂盒（胶体金法）中选价格调整为9.8元/人份。而目前在线上售价中，其产品价格则是在25元/人份。</p>\n<p>值得关注的是，2021年4月，广东省药品交易中心就曾开展新冠检测试剂联盟地区集采，当时万孚生物作为唯一中选企业，以16.8元/人份中选。相较去年，万孚生物的抗原检测试剂盒此番调价降幅约在41.7％左右。</p>\n<p>3月16日晚间，山东省公共资源交易中心公布鲁晋联盟新冠抗原检测试剂专项集采中选结果，5家中选企业分别为：华大因源（7.9元/人份）、万泰生物（8元/人份）、明德生物（8.19元/人份）、东方生物（8.4元/人份）、天津博奥赛斯（9元/人份）。</p>\n<p>参考海外销售和目前国内集采的情况，不难看出，大订单是政府采购、免费发放，其次是企业端和C端市场。尽管国内正式获批较晚，但是海外市场从2021年就开始大量使用，当下获批的企业绝大多数都已获得了国外市场的检验和认可，在海外注册获批的拥有新冠抗原自检试剂的中国品牌已有上百家。</p>\n<p>据不完全统计，目前欧盟CE认证的中国抗原检测产品共有95 家，包括万孚生物、东方生物、亚辉龙、&nbsp;乐普生物、基蛋生物等。此外，九安医疗、艾康生物、东方生物（西门子获批产品，东方生物为生产商）这些中国企业也通过了美国FDA对新冠抗原自检产品的审批。</p>\n<p>过去一年，新冠病毒抗原自测产品在海外市场的迅速扩张，成为了热景生物、博拓生物、奥泰生物、东方生物等新冠检测企业业绩暴涨背后的主要原因之一。值得注意的是，截至3月16日，国内获批的12家企业中就有6家为上市公司，此外还有2家为上市公司关联企业。</p>\n<p style=\"text-align: center; text-indent: 0;\"><img src=\"https://img.36krcdn.com/20220319/v2_1aa511745d46402fab7fe7f41ebdc5ab_img_000\" border=\"0\" data-img-size-val=\"\"></p>\n<p>来源：猎云网</p>\n<p>道彤资本医药投资总监张彦认为，当下国内对抗原检测试剂盒的接受将优先利好国外已获批的中国抗原检测企业，产品成熟且没有风险，但是随着更多企业在国内获批进入市场，在技术、产品差距不大的情况下，市场其实已经高度饱和，竞争格局会更为激烈。</p>\n<p>“参考早孕棒，抗原自测产品的单个成本也相对较低，不足5元。目前从政策来看，政府端依然是采购的主要对象，对于获批的新冠抗原检测企业来说，政府集采价格虽低，但减少销售成本的同时，采购量会进一步加大，整体来看，其利润依然可观。”</p>\n<p>新千亿赛道来袭，后来者还有几分机遇？</p>\n<p>据中泰证券研究所统计，参考海外发放政策，海外新冠抗原自检的发放频次差别显著，在人均2-10次不等。如国内抗原自检试剂盒正式放开，根据草根调研，目前国内新冠抗原自检试剂盒出厂单价大约1-1.5美金，使用频率参考海外政策按照最低频率假设每月2次，按照14亿总人口基数计算，预计国内新冠抗原自检试剂盒市场单月规模有望达177-266亿元。如考虑到居民、企业自费购买情况，预计新冠抗原检测产品采购需求有望进一步提升。即使检测试剂将被纳入集采，这也应该是一个每年超1000亿级别的市场。</p>\n<p>事实上，新冠抗原检测试剂盒的出现属于IVD企业的新增业务板块。王文华认为，对于已有相关产品或者产品管线的IVD企业，这项业务推进主要面临的问题是如何尽快获得国家审批，以及迅速提高产能和保障渠道供应，快速抢滩市场。</p>\n<p>“参考新冠核酸检测试剂获批的进程以及市场格局的发展，我们看到2020年初抢到第一杯羹的6家企业里有4家（伯杰医疗、之江生物、圣湘生物、达安基因）目前占据了我国新冠核酸检测市场超60%的市场份额。因此我们相信如何迅速地将产品触达需求人群，以及实现持续高质量的生产是目前这项业务取胜的关键。”</p>\n<p>但这是否意味着这个新千亿赛道留给后来者的时间不多了呢？</p>\n<p>值得注意的是，3月14日，国家药监局医疗器械技术审评中心发布《新型冠状病毒抗原检测试剂注册技术审评要点（试行）》文件：要求抗原检测试剂与核酸检测试剂进行对比试验，根据已有研究数据进行初步估算，建议对比试剂（核酸检测试剂）检测阳性样本不少于200例，阴性样本不少于300例，并对阳性样本中的不同病毒载量样本提出要求。</p>\n<p>这意味着未来入局难度增大，对新冠抗原检测试剂产品注册申请企业提出了更高的审核要求。</p>\n<p>在王文华看来，一家从零开始的创业公司需要从技术积累开始，从产品研发申报到批准，尤其是三类医疗器械证的批准，至少需要2-3年的时间，此后还需要从研发到商业化。这对于创业型公司而言， 会错过检测试剂盒的最快成长阶段。</p>\n<p>“疫情能持续多久虽然还有很大的不确定性， 但是错过2-3年甚至更长的时间，可能吃到的只是甘蔗最后一段。”</p>\n<p>他指出，从产品看，如果企业有足够的技术积累和快速报证的团队以及丰富的经验，能够短时间内做出产品、报产品注册证，那么对于一个还是跑马圈地阶段的新增需求市场而言，还有机会获得一定市场份额。从产业链去看，对于一些在帮助新冠试剂盒快速商业化，通过线上线下的渠道资源使其能够快速触达更多的人群，或许是积累不多的创业公司可以考虑的角度。</p>\n<p>（首图来源：受访者供图）</p> <div class=\"copyright\">［本文作者猎云网，i黑马授权转载。如需转载请联系微信公众号（ID:ilieyun）授权，未经授权，转载必究。］</div>\n <!-- <div class=\"mesinfo cf js-share\">\n <div class=\"inner fixed\">\n <div class=\"fl ad\">\n <img src=\"http://file.iheima.com/static/ihm/527a74/images/avatar.png\" class=\"advator\"> 猎云网 </div>\n <div class=\"fr rightinfo cf\">\n <div class=\"fl suppose\">\n <span id=\"zan-box\">\n <span class=\"fonteditor icon-zan icon\"></span><span id=\"zan-num\"></span>\n </span>\n </div>\n <div class=\"fr share\">\n <span>分享到：</span>\n <dl class=\"changeshare\">\n <a href=\"http://share.baidu.com/s?type=text&pic=http://upload.iheima.com/2022/0319/1647685107114.jpg&searchPic=0&sign=on&to=tsina&url=http%3A%2F%2Fwww.iheima.com%2Farticle%2Findex%3Fid%3D333749&title=新冠自测掀起千亿市场，这些企业正在加速布局&key=1116687299\" target=\"_blank\"><dd class=\"sina\"></dd></a>\n <a href=\"http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=http%3A%2F%2Fwww.iheima.com%2Farticle%2Findex%3Fid%3D333749&title=新冠自测掀起千亿市场，这些企业正在加速布局&pics=http://upload.iheima.com/2022/0319/1647685107114.jpg&desc=&summary=&site=\" target=\"_blank\"><dd class=\"qzone\"></dd></a>\n <a href=\"#\" class=\"wx\">\n <dd class=\"wechat wechat-333749\"></dd>\n <span class=\"share-weixin share-weixin-333749\" style=\"display: none;position: relative;top: -145px\"></span>\n </a>\n </dl>\n </div>\n </div>\n </div>\n </div> -->\n <div class=\"cf mobile-common\">\n <div class=\"common-title\" style=\"display:none\">\n 文章评价\n </div>\n\n\n\n <div class=\"comment-wrap comment-wrap-333749\" style=\"display:none\">\n <div class=\"respons_wp\">\n <div class=\"comment-content\">\n <div class=\"comment-frame comment-frame-333749 cf\">\n <div class=\"user-portrait fl\">\n <img src=\"/static/ihm/ladders/images/avatar.png\" alt=\"\">\n <span>匿名用户</span>\n </div>\n <div class=\"comment fr\">\n <textarea name=\"comment\" id=\"comment\" placeholder=\"发表简短评论......\"></textarea>\n <div class=\"btn-wrap cf btn-wrap-333749\">\n <!-- 验证码 -->\n <div class=\"publish bluebtn fr\">发布</div>\n </div>\n </div>\n </div>\n </div>\n </div>\n </div>\n <div class=\"comment-item-wrap comment-item-wrap-333749\" style=\"display:none\">\n <div class=\"comment-item\">\n <div class=\"title\">\n 全部评论：<span class=\"comment-num comment-num-333749\">0</span>\n </div>\n <div class=\"comment hide-comment fr hide-comment-333749\">\n <textarea name=\"comment\" id=\"comment\" placeholder=\"发表简短评论......\"></textarea>\n <div class=\"btn-wrap btn-wrap-333749 cf\">\n <!--\n <div class=\"valid-wrap fl\">\n <input type=\"text\" class=\"valid-code fl\" placeholder=\"验证码\">\n <div class=\"valid-img fl\"></div>\n </div>\n -->\n <div class=\"publish bluebtn fr\">发布</div>\n </div>\n </div>\n <ul class=\"user-comment user-comment-333749\">\n\n </ul>\n </div>\n </div>\n </div>\n <!-- <a href=\"#\" class=\"more\">加载更多</a> -->\n "
              return {"status": 1, "msg": "注册失败,两次密码不一致"}
        }
        var user = await this.ctx.model.User.findOne(
            {"name": userInput.name}, function (err, docs) {
               // console.log(docs);
                return {"status": 1, "name": "hehe"}
            }
        );

        await Promise.all([user]);
        user = await user;
        if (user && user.name != null) {
            return {"status": 1, "msg": "注册失败,已存在一样的用户名"}
        }
        var imgs = ["https://qn2.proflu.cn/%E5%A4%B4%E5%83%8F/%E5%A4%B4%E5%83%8F10.png",
                    "https://qn2.proflu.cn/%E5%A4%B4%E5%83%8F/%E5%A4%B4%E5%83%8F8.png",
                    "https://qn2.proflu.cn/%E5%A4%B4%E5%83%8F/%E5%A4%B4%E5%83%8F9.png",
                    "https://qn2.proflu.cn/%E5%A4%B4%E5%83%8F/%E5%A4%B4%E5%83%8F5.png",
                    "https://qn2.proflu.cn/%E5%A4%B4%E5%83%8F/%E5%A4%B4%E5%83%8F5.png",
                    "https://qn2.proflu.cn/%E5%A4%B4%E5%83%8F/%E5%A4%B4%E5%83%8F6.png"];
        var random = Math.floor(Math.random()*10 / 5);
        var test = await this.ctx.model.User.create(
            {
                password: userInput.password,
                name: userInput.name,
                imgUrl: imgs[random],
                addTime   : new Date().toLocaleString(),
                timestamp : '' + Date.now()
            }
        );
        await Promise.all([test]);
        test = await test;
        return {"status": 0, "msg": "插入成功"}
    }


    //update user
    async userUpdate(userInput) {
        console.log(userInput.wechat + "===" + userInput.phone +"=====" + userInput.sex + "====" + userInput.age +"=====" + userInput.img)
        var user = await this.ctx.model.User.findOne(
            {"name": userInput.name}, function (err, docs) {
                // console.log(docs);
               // return {"status": 1, "name": "hehe"}
            }
        );

        await Promise.all([user]);
        user = await user;
        if (user && user.name != null && user._id != userInput._id ) {
            return {"status": 1, "msg": "更新失败,已存在一样的用户名"}
        }

        var user = await this.ctx.model.User.findOne(
            {"_id": userInput._id}, function (err, docs) {
                // console.log(docs);
                // return {"status": 1, "name": "hehe"}
            }
        );
        await Promise.all([user]);
        user = await user;
       // console.log(userInput.sex + "==thetestundefined" + (userInput.sex == undefined) +"======")
        if(userInput.imgUrl!=null){
            user.imgUrl = userInput.imgUrl;
        }if(userInput.sex != null){
            user.sex = userInput.sex;
        }if(userInput.imgs!=null){
            user.imgs = userInput.imgs;
        }if(userInput.description!=null){
            user.description = userInput.description;
        }if(userInput.wechat!=null){
            user.wechat = userInput.wechat;
        }if(userInput.phone!=null){
            user.phone = userInput.phone;
        }if(userInput.profileImgUrl!=null){
            user.profileImgUrl = userInput.profileImgUrl;
        }if(userInput.email!=null){
            user.email = userInput.email;
        }if(userInput.schoolRecord!=null){
            user.schoolRecord = userInput.schoolRecord;
        }if(userInput.detailMsg!=null){
            user.detailMsg = userInput.detailMsg;
        }if(userInput.workCondition!=null){
            user.workCondition = userInput.workCondition;
        }if(userInput.category!=null){
            user.category = userInput.category;
        }if(userInput.userType!=null){
            user.userType = userInput.userType;
        }if(userInput.birth!=null){
            user.birth = userInput.birth;
        }if(userInput.identity!=null){
            user.identity = userInput.identity;
        }if(userInput.iconUrl!=null){
            user.iconUrl = userInput.iconUrl;
        }if(userInput.bigCoverUrl!=null){
            user.bigCoverUrl = userInput.bigCoverUrl;
        }if(userInput.password!=null){
            user.password = userInput.password;
        }if(userInput.duration!=null){
            user.duration = userInput.duration;
        }if(userInput.address!=null){
            user.address = userInput.address;
        }if(userInput.name!=null){
            user.name = userInput.name;
        }if(userInput.company!=null){
            user.company = userInput.company;
        }if(userInput.location!=null){
            user.location = userInput.location;
        }if(userInput.tags!=null){
            user.tags = userInput.tags;
        }if(userInput.homeTown!=null){
            user.homeTown = userInput.homeTown;
        }if(userInput.videoUrl!=null){
            user.videoUrl = userInput.videoUrl;
        }if(userInput.addTime!=null){
            user.addTime = userInput.addTime;
        }if(userInput.timestamp!=null){
            user.timestamp = userInput.timestamp;
        }



        var user = await this.ctx.model.User.updateMany(
            {_id:userInput._id},{$set:{"imgUrl":user.imgUrl,"sex":user.sex,"imgs":user.imgs,
                               "description":user.description,"addTime":user.addTime,"timestamp":user.timestamp,
                               "wechat":user.wechat,"position":user.position,"videoUrl":user.videoUrl,
                               "industry":user.industry,"country":user.country,"phone":user.phone,"profileImgUrl":user.profileImgUrl,
                               "email":user.email,"schoolRecord":user.schoolRecord,"detailMsg":user.detailMsg,
                    "identity":user.identity, "iconUrl":user.iconUrl, "bigCoverUrl":user.bigCoverUrl, "password":user.password,"location":user.location,
                    "duration":user.duration,"address":user.address,"name":user.name,"company":user.company,"tags":user.tags,"homeTown":user.homeTown}

          }, function (err, docs) {
                   console.log(JSON.stringify(docs)+"err" +"====="+err)
                   return {"status": 1, "msg": "更新失败"+err}
            }
        );
        await Promise.all([user]);
        user = await user;
        return {"status": 0, "msg": "更新成功"}
    }


    async userRich(id) {
        let user = this.ctx.model[this.model].findOne({
            _id: id
        }).exec();

        const basicQuery = {
            user: id,
            isDeleted: false,
            isBlocked: false
        };

        const getCount = (model, query) => {
            return this.ctx.model[model].countDocuments(query).exec();
        }

        let postCount = getCount(MODEL_NAMES.POST, basicQuery);
        let commentCount = getCount(MODEL_NAMES.COMMENT, basicQuery);
        let postCommentCount = getCount(MODEL_NAMES.POST_COMMENT, basicQuery);
        let collectCount = getCount(MODEL_NAMES.COLLECT, {
            actor: id,
            value: true
        });
        let notificationCount = getCount(MODEL_NAMES.NOTIFICATION, {
            ...basicQuery,
            status: NOTIFICATION_STATUS.INIT
        });

        await Promise.all([user, postCount, commentCount, postCommentCount, collectCount, notificationCount]);

        // 将promise转化成值，mongoose配合promise.all所需的特殊操作
        user = await user;
        postCount = await postCount;
        commentCount = await commentCount;
        postCommentCount = await postCommentCount;
        collectCount = await collectCount;
        notificationCount = await notificationCount;

        if (user) {
            return {
                ...user._doc,
                postCount,
                commentCount,
                postCommentCount,
                collectCount,
                notificationCount
            };
        }
    }

    async userLogin(userLoginPayload) {
        const clientType = await this.ctx.service.util.getClientType();
        switch (clientType) {
            case CLIENTS.GUGU_WECHAT_MINI:
                return await this.userWechatMiniLogin(clientType, userLoginPayload);

            default:
                return;
        }
    }

    async latestClassificationUser(category, option){
        return await this.ctx.model.User.find({category:category},null,{limit:option.limit,skip:option.skip},function(err,docs){
             //console.log(docs +"cassuser ");
        });
    }

    async userWechatMiniLogin(clientType, userLoginPayload) {

        try {

            const {
                jscode,
                grantType
            } = userLoginPayload;

            let result = await this.ctx.service.wechat.jsCode2Session(jscode, grantType);

            if (!result) return;
            result = JSON.parse(result);
            const sessionKey = result['session_key'];
            const openId = result['openid'];
            // const unionId = result['unionid'];
            if (!sessionKey || !openId) return;

            const user = await this.ctx.model[this.model].findOneAndUpdate({
                "credential": {
                    $elemMatch: {
                        clientType,
                        openId
                    }
                }
            }, {
                loginedAt: Date.now(),
                credential: {
                    sessionKey,
                    clientType,
                    openId
                }
                // unionId
            }, {
                new: true,
                upsert: true,
                setDefaultsOnInsert: true
            });

            const accessToken = await this.ctx.service.token.signJwt({
                openId,
                sessionKey,
                clientType
            });

            this.ctx.cookies.set('accessToken', accessToken, {
                signed: false,
                encrypt: true
            });

            return user;
        } catch (e) {
            console.error(e);
            this.ctx.response.body = {
                error: "Fail to login WeChat mini program user: " + e,
                code: errorCode.USER_FAILED_TO_USER_WECHAT_MINI_LOGIN
            };
        }
    }

    async onboardSelf(id, input) {
        const result = await this.ctx.model[this.model].findByIdAndUpdate({
            _id: id
        }, {
            ...input,
            onboardingStatus: ONBOARDING_STATUS.ONBOARDED,
            loginedAt: Date.now(),
            updatedAt: Date.now(),
        }, {
            upsert: false,
            new: true,
            setDefaultsOnInsert: true
        });
        return result;
    }

    // async userByToken(token) {
    //   const user = await this.ctx.model[this.model].find(
    //     {
    //       isDeleted: false,
    //       isBlocked: false,
    //       token,
    //     },
    //   );
    //   if (!user) throw new Error("User not found")
    //   return user
    // }

    async sendEmailCode(userInput) {
        const {
            ctx
        } = this;
        var tempEmail = userInput.email; // TODO: 前端传递的email应当也为salt加密过的
        var email = ctx.service.secret.reversibleEncrypt(tempEmail, true);
        // TODO: 这里是不是可以用findByIdAndUpdate, upsert true，直接就插入了？
        var user = await ctx.service.user.userByEmail(email);
        if (user) {
            if (user.onboardingStatus === ONBOARDING_STATUS.ONBOARDED) {
                return null;
            }
        } else {
            user = await ctx.model.User.create({
                email: email,
                onboardingStatus: ONBOARDING_STATUS.DEFAULT
            });
        }
        //  var token = sign(user._id.toString(),'wsd',{expiresIn: 24 * 60 * 60  /* 1 days */});
        // TODO: 以后这行逻辑可以放进service里
        const activeKey = Array.from(Array(6), () => parseInt((Math.random() * 10))).join('');
        // TODO: 这里需要await确认发送成功，如果没有法功成功也要返回状态给前端
        ctx.service.user.sendEmail(activeKey, tempEmail);
        const result = await ctx.model.User.findByIdAndUpdate(
            user._id, {
                emailVerificationCode: activeKey,
                emailVerificationCodeExpiredAt: moment().add(15, 'minutes').toDate() // TODO: 这里不用存可读的时间戳，用Date.now() + 600就行，表示600秒之后
            }, {
                new: true
            }
        );
        return result;
    }

    async verifyEmailCode(userInput) {
        const {
            ctx
        } = this;
        // TODO: 这些以后都应当是加密的
        var {
            email,
            emailVerificationCode
        } = userInput;
        email = ctx.service.secret.reversibleEncrypt(email, true);
        var user = await ctx.service.user.userByEmail(email);
        if (!user) return null; //这里返回前端的消息还是不太一样的，比如用户不存在、已注册等等，null可能不能够表示清楚
        if (user.onboardingStatus === ONBOARDING_STATUS.ONBOARDED) return null;
        if (emailVerificationCode !== user.emailVerificationCode) return null;
        if (moment().toDate() > user.emailVerificationCodeExpiredAt) return null; // TODO: 根据上面的修改所存的时间戳，这里直接跟data.now()比大小就行
        const result = await ctx.model.User.findByIdAndUpdate(
            user._id, {
                onboardingStatus: ONBOARDING_STATUS.EMAIL_VERIFIED,
                updatedAt: Date.now()
            }, {
                new: true
            }
        );
        return result;
    }

    async onboardSelfByEmail(userInput) {
        const {
            ctx
        } = this;
        // TODO: 这些以后都应当是加密的
        var {
            email,
            password
        } = userInput;
        // salt加密email
        // 加密email
        email = ctx.service.secret.reversibleEncrypt(email, true);
        //这里不应该是按email查，而是应该按前面注册后储存的东西来查，但我不知咋写
        var user = await ctx.service.user.userByEmail(email);
        if (user.onboardingStatus !== ONBOARDING_STATUS.EMAIL_VERIFIED) return null;

        //TODO: 这个salt需要存进数据库吗？salt1和salt2每次生成的结果如果都一样那就没必要存进数据库，还是说它这个随时间或随机变化吗？
        // 如果这样，是不是generateSalt应该直接合并进saltHash?
        var [salt1, salt2] = ctx.service.secret.generateSalt(11, 23);
        password = ctx.service.secret.saltHash(password, salt1, salt2);
        const result = await ctx.model.User.findByIdAndUpdate(
            user._id, {
                onboardingStatus: ONBOARDING_STATUS.ONBOARDED,
                password: password,
                updatedAt: Date.now(),
                salt1: salt1,
                salt2: salt2
            }, {
                new: true
            }
        );
        return result;
    }

    async userLoginByEmail(userInput) {
        const {
            ctx
        } = this;
        // TODO: 此处前端传来的密码和邮箱都应当是salt加密过的
        var {
            email,
            password
        } = userInput;
        // salt加密email
        email = ctx.service.secret.reversibleEncrypt(email, true);
        // 通过解码的email在数据库中查找用户
        var user = await ctx.service.user.userByEmail(email);
        if (!user) return null;
        // 如果用户尚未注册过
        if (user.onboardingStatus != ONBOARDING_STATUS.ONBOARDED) return null;
        var passwordSalt = ctx.service.secret.saltHash(password, user.salt1, user.salt2);
        if (!ctx.service.secret.safeEqualForString(user.password, passwordSalt)) return null; //TODO 需要加密后再比较
        const result = await this.ctx.model[this.model].findByIdAndUpdate({
            _id: user.id
        }, {
            loginedAt: Date.now(),
        }, {
            upsert: false,
            new: true,
            setDefaultsOnInsert: true
        });
        return result;
    }
}

module.exports = UserConnector;
