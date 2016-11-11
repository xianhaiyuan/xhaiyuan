---
title: Javascript正则一篇入门，不入魂
layout: post
time: 2013/10/19
tags:
- 正则
- 入门
- javascript
excerpt: 以下是js正则基础篇，阅读时间估计10-20分钟。
---

这里不会对正则的背景进行介绍，将直接对正则的使用进行讲解。

> 注意：有一些文章和书本可能为了让正则表达式看起来不那么密密麻麻，  
> 而在正则表达式里加了空格隔开，例如`/(\w+)\s(\w+)/`,这个表达式可以匹配  
> Hello RegExp，但有的文章和书本里写成`/(\w+) \s (\w+)/`，这样的话就不是  
> 匹配Hello RegExp，而是匹配Hello RegExp中间再加两个空格。  

## Javascript正则表达式的定义 ##
1.构造函数定义

(1)

```javascript
var reg = new RegExp(/(\w+)\s(\w+)/);
var reg = new RegExp(/(\w+)\s(\w+)/,'gim');    
```

g,i,m为可选属性。

- g--全文查找
- i--忽略大小写
- m--多行查找

(2)

```javascript
var reg = new RegExp("hello");
```

注意第二种用双引号或单引号包含正则表达式的方式只能匹配对应的字符，而把正则表达式写入则不能匹配成功。  
如：

```javascript
var reg = new RegExp("/(\w+)\s(\w+)/");
var reg = new RegExp("(\w+)\s(\w+)");
var reg = new RegExp("hello");
```

上面两个都不能匹配Hello RegExp,第三个可以匹配hello，所以建议用方式(1)定义正则表达式。

2.直接定义

```javascript
var reg = /(\w+)\s(\w+)/;
```

这种方式简单不易出错.