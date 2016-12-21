---
title: ubuntu配置日记--mongodb配置
layout: post
time: 2016/12/21
tags:
- ubuntu
- mongodb
excerpt: ubuntu mongodb配置，阅读时间1-3分钟
---

#### 1.导入软件仓库的公匙 ####

```Bash
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 0C49F3730359A14518585931BC711F9BA15703C6
```

#### 2.同步软件源 ####

```Bash
echo "deb [ arch=amd64,arm64 ] http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.4.list

sudo apt-get update
```

#### 3.安装mongodb ####

```Bash
sudo apt-get install -y mongodb-org
```

mongodb的其他安装可以到官网查看，[这里](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/)是ubuntu的mongodb官网安装指导：

最后安装[mongobooster](https://mongobooster.com)

#### 4.关于mongodb ####

```Bash
启动mongodb服务
sudo service mongod start
关闭mongodb服务
sudo service mongod stop
```

- 数据文件存放位置：/var/lib/mongodb
- 日志文件存放位置：/var/log/mongodb
- 数据库配置文件位置：/etc/mongod.conf，mongod.conf里保存有数据库数据文件路径，日志文件路径，端口号等，可以进行自定义设置。

**上面方式开启服务，一旦打开其他软件就会断开，所以使用这条命令指定开启服务时数据文件和日志文件的路径并在后台运行：**

```Bash
sudo mongod --dbpath /var/lib/mongodb/ --logpath /var/log/mongodb/mongodb.log --logappend &
```


**为方便启动，可以写一个shell文件**

```Bash
vi mongo.sh

\#!/bin/bash
sudo -S mongod --dbpath /var/lib/mongodb/ --logpath /var/log/mongodb/mongodb.log --logappend & << EOF 
'password'
EOF

chmod +x mongo.sh
./mongo.sh
```
**关闭服务**

```Bash
ps -aux | grep mongo
sudo kill 'PID'
```

- --dbpath：指定mongo的数据库文件在哪个文件夹。
- --logpath：指定mongo的log日志是哪个，这里log一定要指定到具体的文件名。
- --logappend：表示log的写入是采用附加的方式，默认的是覆盖之前的文件。
- &：表示程序在后台运行。

**注意**：如果是系统非正常关闭，这样启动会报错，由于mongodb自动被锁上了，这是需要进入mongodb数据库文件所在的目录（/var/lib/mongodb/）,删除目录中的mongodb.lock文件,然后再进行上述操作。