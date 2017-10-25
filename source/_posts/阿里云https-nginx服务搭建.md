---
title: 阿里云https+nginx服务搭建
categories:
  - 经验分享
type: tags
tags:
  - https
  - http
  - ssl
  - nginx
  - 阿里云
date: 2017-10-25 17:43:09
---

> 本文不会介绍https相关知识，只是把我创建https服务的过程分享出来，供读者参考。并且已经假设你已经购买了服务器和域名。

## 购买证书

- 通过控制台进入`CA证书服务`，点击右上角的购买证书，进入如下图的界面，选择免费的`Symantec`的`DV SSL`。

![购买https证书](bug_https_service.png)

- 一路点过去，然后回到证书服务主页，会出现一条订单信息，点击补全，如下图所示。

![证书信息补全](buquan.png)

- 然后按照要求，首先填写你要申请证书的完整域名（例如www.test.com，因为此证书为单域名，不能使用通配符）；然后填写个人信息，值得注意的是需要勾选下图红圈包围的选项，让验证自动化进行，不用手动操作；然后下一步，完成信息补全，等待几分钟，验证就可以通过。

![个人信息](buquan_2.png)

## 添加443端口（https）安全组规则
- 等待的这个时间，你可以去检查一下你的服务器的安全组配置，看一下是否加入了443端口的链接，防止后面连接不上。创建的新规则如下图。

![添加https安全组](https_config.png)

## 下载证书
- 几分钟后，可以看到下图的状态。

![完成证书签发](auth_complete.png)

- 接着点击下载，进入下图的界面，并点击`下载证书for Nginx`

![下载证书](cert_download.png)

## 配置`Nginx`服务器

- 把这个文件解压后，会有两个文件，分别为`***.pem`和`***.key`（可以修改成你需要的名字），将这两个文件拷贝到你的`Nginx`根目录下的`cert`文件夹内（自己创建的，也可以命名成其他名字）。

- 接下来就要配置`Nginx`服务器了。

如果你配置了反向代理，就去`conf.d`目录下，修改你要配置`https`的conf文件。下面贴一个范例配置。其中端口80为`http`链接，设置为重定向`https`；端口443为`https`链接。

```
upstream blog {
  server 127.0.0.1:8080;
}

server {
  listen 80;
  server_name www.test.com;
  return 301 https://$host$request_uri;
}
server {
    listen 443;
    server_name www.test.com;

    ssl on;
    index index.html;
    ssl_certificate   /etc/nginx/cert/***.pem;
    ssl_certificate_key  /etc/nginx/cert/***.key;
    ssl_session_timeout 5m;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_prefer_server_ciphers on;

    location / {
    proxy_set_header  X-Forwarded-Host $host;
    proxy_set_header  X-Forwarded-Proto $scheme;
    proxy_set_header  X-Real-IP  $remote_addr;
    proxy_set_header  X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header Host $http_host;
    proxy_redirect off;
    expires off;
    sendfile off;
    proxy_pass http://test;
  }
}
```

- 配置完以后运行`nginx -s reload`重新加载配置，去浏览器输入链接，此时成功进入https链接✌️。