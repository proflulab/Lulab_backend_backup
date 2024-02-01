# 陆向谦实验室AI智能App后端项目
# Lu Lab AI Intelligent Application Back-end Project
#
#### 1.现在主分支为develop_prod分支，master分支为旧版本，不再更新
#### 1.The main branch is now the develop_prod branch, and the master branch is the old version and will not be updated
#### 2.下滑以阅读英文版README
#### 2.Scroll down to read the English version of README
#
# Chinese README ｜ 中文README

```

本项目是后端服务器仓库，使用egg-graphql项目模板[egg-graphql-boilerplate](https://github.com/freebyron/egg-graphql-boilerplate)。建议生产环境系统CentOS + Docker容器。

```

## installation
1. 安装redis
   1. 启动 `sudo systemctl start redis`
2. 安装elasticsearch [RPM](https://www.elastic.co/guide/en/elasticsearch/reference/current/rpm.html)
   1. 启动 `sudo systemctl start elasticsearch.service`
   2. 访问 http://localhost:9200/articles/_mapping?pretty=true
3. 安装mongodb
   1. `makir /data && mkdir /data/mongodb`
   2. 启动 `mongod --auth --fork --dbpath /data/mongodb --logpath /var/log/mongodb/mongod.log`
4. 安装node
5. 安装nginx(本地部署不需要)
   1. 配置nginx
   2. 启动`nginx`

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
### 1. 如何添加 elasticsearch config [elasticvue](https://app.elasticvue.com/setup)？

将下列配置加入 `/etc/elasticsearch/elasticsearch.yml`
``` 
# allow CORS requests from https://app.elasticvue.com
http.cors.enabled: true
http.cors.allow-origin: "https://app.elasticvue.com"
```

### 2. 如何备份数据库？
使用[mongoexport](https://docs.mongodb.com/database-tools/mongoexport/)或任何GUI工具。
```
export MONGODB_URL="MONGODB_URL"
mongoexport --uri=MONGODB_URL --collection=articles --out=articles.json
```
或使用[mongodump](https://docs.mongodb.com/database-tools/mongorestore/)
```
mongodump --uri=MONGODB_URL -o=gugudump
```

### 3. 如何设置自动数据库备份脚本？

https://pranavprakash.net/2017/02/04/automate-mongodb-backups-using-cron-and-shell-script/

对应脚本请参考`script/mongodb_dump.sh`

### 4. 如何使用GUI工具连接服务器端ElasticSearch？

使用`ssh -L9201:localhost:9200 root@x.x.x.x`连接到服务器并映射端口到本地9201

使用https://app.elasticvue.com/ 连接本地9201端口。

### 5. 数据库搭建

1. 如何打开数据库auth并创建admin用户，https://docs.mongodb.com/manual/tutorial/enable-authentication/
   1. `mongo`
   2. `use admin`
   3. `db.createUser({ user: "opsAdmin", pwd: passwordPrompt(), roles: [ { role: "userAdminAnyDatabase", db: "admin" }, "readWriteAnyDatabase" ]})`
2. 创建所需的新数据库
3. 为新的数据库创建对应的管理员用户，https://docs.mongodb.com/manual/tutorial/manage-users-and-roles/

### 6. 配置Nginx
```
server {
        listen 443;
        server_name test-gugu.yuanyou.site; # 改为绑定证书的域名
        # ssl 配置
        ssl on;
        ssl_certificate 1_test-gugu.yuanyou.site_bundle.crt; # 改为自己申请得到的 crt 文件的名称
        ssl_certificate_key 2_test-gugu.yuanyou.site.key; # 改为自己申请得到的 key 文件的名称
        ssl_session_timeout 5m;
        ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
        ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;
        ssl_prefer_server_ciphers on;

        location / {
          proxy_pass http://127.0.0.1:7001;
        }
    }
```
#
# English README ｜ 英文README


```
This project is the backend server warehouse, use the egg - graphql project template [egg - graphql - boilerplate] (https://github.com/freebyron/egg-graphql-boilerplate). The production environment system CentOS + Docker container is recommended.
```

## installation
1. Install redis
   1. start `sudo systemctl start redis`
2. Install elasticsearch [RPM](https://www.elastic.co/guide/en/elasticsearch/reference/current/rpm.html)
   1. start `sudo systemctl start elasticsearch.service`
   2. Open it up in the browser http://localhost:9200/articles/_mapping?pretty=true
3. Install mongodb
   1. `makir /data && mkdir /data/mongodb`
   2. start `mongod --auth --fork --dbpath /data/mongodb --logpath /var/log/mongodb/mongod.log`
4. Install node
5. Install nginx
   1. configure nginx
   2. start `nginx`

### Local testing
Contact the administrator to obtain permission to link to the cloud server and establish a local SSH Tunnel to the cloud database. Then run the following command to start the server for testing.
```shell
npm install 
export JWT_SECRET_KEY='community' &&
export WECHAT_MINI_APP_ID='YOUR_WECHAT_NIMI_APP_ID' &&
export WECHAT_MINI_APP_SECRET='YOUR_WECHAT_MINI_APP_SECRET' &&
export MONGODB_URL='YOUR_MOGONDB_URL' &&
npm run dev
```

Open it up in the browser http://localhost:7001/graphql
## Test server deployment
```shell
npm run stop
npm install 
export JWT_SECRET_KEY='community' &&
export WECHAT_MINI_APP_ID='YOUR_WECHAT_NIMI_APP_ID' &&
export WECHAT_MINI_APP_SECRET='YOUR_WECHAT_MINI_APP_SECRET' &&
export MONGODB_URL='YOUR_MOGONDB_URL' &&
npm run dev
```
http://localhost:7001/graphql

## Production server deployment
```shell
npm run stop-gamma
npm install 
export JWT_SECRET_KEY='YOUR_TOKEN' &&
export WECHAT_MINI_APP_ID='YOUR_WECHAT_NIMI_APP_ID' &&
export WECHAT_MINI_APP_SECRET='YOUR_WECHAT_MINI_APP_SECRET' &&
export MONGODB_URL='YOUR_MOGONDB_URL' &&
npm run start-gamma
```

Open it up in the browser  http://localhost:7777/graphql

## FAQ
### 1. how to add elasticsearch config [elasticvue](https://app.elasticvue.com/setup)？

Add the following configuration `/etc/elasticsearch/elasticsearch.yml`
``` 
# allow CORS requests from https://app.elasticvue.com
http.cors.enabled: true
http.cors.allow-origin: "https://app.elasticvue.com"
```

### 2. How to back up a database?
use [mongoexport](https://docs.mongodb.com/database-tools/mongoexport/)Or any GUI tool.
```
export MONGODB_URL="MONGODB_URL"
mongoexport --uri=MONGODB_URL --collection=articles --out=articles.json
```
or use [mongodump](https://docs.mongodb.com/database-tools/mongorestore/)
```
mongodump --uri=MONGODB_URL -o=gugudump
```

### 3. How to set up an automatic database backup script?

https://pranavprakash.net/2017/02/04/automate-mongodb-backups-using-cron-and-shell-script/

Please refer to the corresponding script `script/mongodb_dump.sh`

### 4. How to connect to server-side ElasticSearch using GUI tools?

use`ssh -L9201:localhost:9200 root@x.x.x.x` Connect to the server and map port to local 9201

Use https://app.elasticvue.com/ to connect local port 9201.

### 5. Database construction

1. How to open database auth and create admin user，https://docs.mongodb.com/manual/tutorial/enable-authentication/
   1. `mongo`
   2. `use admin`
   3. `db.createUser({ user: "opsAdmin", pwd: passwordPrompt(), roles: [ { role: "userAdminAnyDatabase", db: "admin" }, "readWriteAnyDatabase" ]})`
2. Create the required new database
3. Create the corresponding administrator user for the new database，https://docs.mongodb.com/manual/tutorial/manage-users-and-roles/

### 6. Configure Nginx
```
server {
        listen 443;
        server_name test-gugu.yuanyou.site; 
        ssl on;
        ssl_certificate 1_test-gugu.yuanyou.site_bundle.crt; 
        ssl_certificate_key 2_test-gugu.yuanyou.site.key; 
        ssl_session_timeout 5m;
        ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
        ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;
        ssl_prefer_server_ciphers on;

        location / {
          proxy_pass http://127.0.0.1:7001;
        }
    }
```
