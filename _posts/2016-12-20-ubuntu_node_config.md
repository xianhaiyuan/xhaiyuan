---
title: ubuntu配置日记--node配置
layout: post
time: 2016/12/20
tags:
- ubuntu
- node配置
- nvm
- npm
excerpt: ubuntu node配置,阅读时间1-3分钟
---

#### 1.首先安装git ####

```Bash
sudo apt-get install git
```

#### 2.安装nvm ####
```Bash
git clone https://github.com/creationix/nvm.git ~/.nvm && cd ~/.nvm && git checkout `git describe --abbrev=0 --tags`

配置环境变量
cd
vim ~/.bashrc
source ~/.nvm/nvm.sh
source .bashrc

nvm --versioin

安装node和npm
nvm ls-remove
nvm install 0.12.17
node -v
npm -v

安装4.7.0版本，并使用4.7.0的版本
nvm install v6.9.2
nvm use v4.7.0
node -v


安装cnpm
npm install -g cnpm --registry=https://registry.npm.taobao.org
cnpm -v
```