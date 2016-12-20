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
设置git的用户用和邮箱
git config --global user.name xxx
git config --global user.email xxx@example.com
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

安装4.7.0版本，并使用4.7.0的版本，注意在切换版本的时候并不会自动把这个版本的包直接加载到另一个版本，也就是说在另一个版本中需要重新安装包
nvm install v6.9.2
nvm use v4.7.0
node -v

设置默认版本
nvm alias default v4.7.0

安装cnpm，由于我已经安装了nvm，所以在全局安装的时候就不用sudo npm
npm install -g cnpm --registry=https://registry.npm.taobao.org
cnpm -v

```

#### 4.如果想更方便用其他的源，也可以安装nrm ####

[nrm](https://github.com/Pana/nrm) 是一个管理 npm 源的工具。用过 ruby 和 gem 的同学会比较熟悉，通常我们会把 gem 源切到国内的淘宝镜像，这样在安装和更新一些包的时候比较快。nrm 同理，用来切换官方 npm 源和国内的 npm 源（如: [cnpm](http://cnpmjs.org/)），当然也可以用来切换官方 npm 源和公司私有 npm 源。

``` Bash
npm i -g nrm
nrm ls
nrm use cnpm
nrm ls
```

#### 5.安装nodemon ####

nodemon是一个nodejs监视工具，和supervisor相似。

```Bash
cnpm i -g nodemon
nodemon -v
```
