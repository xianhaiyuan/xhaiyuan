---
title: ubuntu配置日记--初始配置
layout: post
time: 2016/12/20
tags:
- ubuntu
- 初始化
excerpt: ubuntu初始配置，阅读时间1-3分钟
---

#### 1.首先更换源。 ####

```Bash
cd /etc/apt/
sudo cp sources.list sources.list.bk
vi sources.list (替换以下内容)

# deb cdrom:[Ubuntu 16.04 LTS _Xenial Xerus_ - Release amd64 (20160420.1)]/ xenial main restricted
deb-src http://archive.ubuntu.com/ubuntu xenial main restricted #Added by software-properties
deb http://mirrors.aliyun.com/ubuntu/ xenial main restricted
deb-src http://mirrors.aliyun.com/ubuntu/ xenial main restricted multiverse universe #Added by software-properties
deb http://mirrors.aliyun.com/ubuntu/ xenial-updates main restricted
deb-src http://mirrors.aliyun.com/ubuntu/ xenial-updates main restricted multiverse universe #Added by software-properties
deb http://mirrors.aliyun.com/ubuntu/ xenial universe
deb http://mirrors.aliyun.com/ubuntu/ xenial-updates universe
deb http://mirrors.aliyun.com/ubuntu/ xenial multiverse
deb http://mirrors.aliyun.com/ubuntu/ xenial-updates multiverse
deb http://mirrors.aliyun.com/ubuntu/ xenial-backports main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ xenial-backports main restricted universe multiverse #Added by software-properties
deb http://archive.canonical.com/ubuntu xenial partner
deb-src http://archive.canonical.com/ubuntu xenial partner
deb http://mirrors.aliyun.com/ubuntu/ xenial-security main restricted
deb-src http://mirrors.aliyun.com/ubuntu/ xenial-security main restricted multiverse universe #Added by software-properties
deb http://mirrors.aliyun.com/ubuntu/ xenial-security universe
deb http://mirrors.aliyun.com/ubuntu/ xenial-security multiverse

sudo apt-get update
```

#### 2.由于ubuntu自带的vim很恶心，所以重新装一个。 ####

```Bash
sudo apt-get remove vim-common
sudo apt-get install vim
```

#### 3.安装ssh服务器 ####
```Bash
sudo apt-get install openssh-server
/etc/init.d/ssh restart
```

或
```Bash
sudo apt-get autoremove openssh-client
sudo apt-get install openssh-client openssh-server
```

#### 4.安装中文输入法  ####
```Bash
sudo apt-get install ibus-pinyin
sudo ibus-setup

用fcitx的拼音也行
```

#### 5.sublime中文输入解决  ####
```Bash
git clone https://github.com/xianhaiyuan/sublime-text-imfix.git

cd ~/sublime-text-imfix
sudo cp ./lib/libsublime-imfix.so /opt/sublime_text/
sudo cp ./src/subl /usr/bin/

新建一个shell脚本(subl)
#!/bin/sh
LD_PRELOAD=/opt/sublime_text/libsublime-imfix.so exec /opt/sublime_text/sublime_text "$@"

此方法要使用fcitx输入法才能起作用
```

