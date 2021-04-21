本项目是Gugu的后端服务器仓库，使用egg-graphql项目模板[egg-graphql-boilerplate](https://github.com/freebyron/egg-graphql-boilerplate)。

## installation
1. 安装redis
   1. 启动 `sudo systemctl start redis`
2. 安装elasticsearch([RPM](https://github.com/zhangqi444/gugu-backend.git))
   1. 启动 `sudo systemctl start elasticsearch.service`
   2. 访问 http://localhost:9200/articles/_mapping?pretty=true
3. 安装mongodb
   1. 启动 `mongod --fork --auth --dbpath /data/mongodb --logpath /var/log/mongodb/mongod.log`

### 本地测试
请先联系管理员获取权限链接到云服务器，建立本地到云端数据库的SSH Tunnel，之后即可运行以下命令启动服务器进行测试。
```shell
npm install 
export JWT_SECRET_KEY='community' &&
export WECHAT_MINI_APP_ID='YOUR_WECHAT_NIMI_APP_ID' &&
export WECHAT_MINI_APP_SECRET='YOUR_WECHAT_MINI_APP_SECRET' &&
export MONGODB_URL='YOUR_MOGONDB_URL' &&
npm run dev
```

在浏览器打开 http://localhost:7001/graphql

## 测试服务器部署
```shell
npm run stop
npm install 
export JWT_SECRET_KEY='community' &&
export WECHAT_MINI_APP_ID='YOUR_WECHAT_NIMI_APP_ID' &&
export WECHAT_MINI_APP_SECRET='YOUR_WECHAT_MINI_APP_SECRET' &&
export MONGODB_URL='YOUR_MOGONDB_URL' &&
npm run dev
```
访问 http://localhost:7001/graphql

## 生产服务器部署
```shell
npm run stop-gamma
npm install 
export JWT_SECRET_KEY='YOUR_TOKEN' &&
export WECHAT_MINI_APP_ID='YOUR_WECHAT_NIMI_APP_ID' &&
export WECHAT_MINI_APP_SECRET='YOUR_WECHAT_MINI_APP_SECRET' &&
export MONGODB_URL='YOUR_MOGONDB_URL' &&
npm run start-gamma
```

在浏览器打开 http://localhost:7777/graphql

## FAQ
1. 如何添加 elasticsearch config [elasticvue](https://app.elasticvue.com/setup)？

将下列配置加入 `/etc/elasticsearch/elasticsearch.yml`
``` 
# allow CORS requests from https://app.elasticvue.com
http.cors.enabled: true
http.cors.allow-origin: "https://app.elasticvue.com"
```

2. 如何备份数据库？
使用[mongoexport](https://docs.mongodb.com/database-tools/mongoexport/)或任何GUI工具。
```
export MONGODB_URL="MONGODB_URL"
mongoexport --uri=MONGODB_URL --collection=articles --out=articles.json
```
或使用[mongodump](https://docs.mongodb.com/database-tools/mongorestore/)
```
mongodump --uri=MONGODB_URL -o=gugudump
```

3. 如何设置自动数据库备份脚本？

https://pranavprakash.net/2017/02/04/automate-mongodb-backups-using-cron-and-shell-script/

对应脚本请参考`script/mongodb_dump.sh`

4. 如何使用GUI工具连接服务器端ElasticSearch？

使用`ssh -L9201:localhost:9200 root@x.x.x.x`连接到服务器并映射端口到本地9201

使用https://app.elasticvue.com/ 连接本地9201端口。

5. 数据库搭建

  1. 如何打开数据库auth并创建admin用户，https://docs.mongodb.com/manual/tutorial/enable-authentication/
  2. 创建所需的新数据库
  3. 为新的数据库创建对应的管理员用户，https://docs.mongodb.com/manual/tutorial/manage-users-and-roles/