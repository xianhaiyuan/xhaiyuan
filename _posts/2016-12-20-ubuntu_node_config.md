---
title: ubuntu配置日记--node配置
layout: post
time: 2016/12/20
tags:
- ubuntu
- git
- node配置
- nvm
- npm
- cnpm
excerpt: ubuntu node配置，阅读时间1-3分钟
---

#### 1.首先安装git ####

```Bash
sudo apt-get install git
```

#### 2.n和nvm ####

通常我们使用稳定的 LTS 版本的 Node.js 即可，但有的情况下我们又想尝试一下新的特性，我们总不能来回安装不同版本的 Node.js 吧，这个时候我们就需要 [n](https://github.com/tj/n) 或者 [nvm](https://github.com/creationix/nvm) 了。n 和 nvm 是两个常用的 Node.js 版本管理工具，关于 n 和 nvm 的使用以及区别，[这篇文章](http://taobaofed.org/blog/2015/11/17/nvm-or-n/) 讲得特别详细，这里不再赘述。

#### 3.安装nvm ####
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