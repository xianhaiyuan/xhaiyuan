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

> 注意：有一些文章和书本可能为了让正则表达式看起来不那么密密麻麻，而在正则表达式里加了空格隔开，例如`/(\w+)\s(\w+)/`,这个表达式可以匹配Hello RegExp，但有的文章和书本里写成`/(\w+) \s (\w+)/`，这样的话就不是匹配Hello RegExp，而是匹配Hello RegExp中间再加两个空格。  

## Javascript正则表达式的定义 ##
1.构造函数定义

构造函数定义接受两个参数，一个是要匹配的字符串模式(注意此参数是字符串，不能是正则表达式字面量)，另一个是可选的标志字符串，即g,i,m


```javascript
var reg = new RegExp("java[script]",'gim');    
```

g,i,m为可选属性。

- g--全文查找，即模式被应用于所有字符串，而并非在发现第一个匹配项时立即停止
- i--忽略大小写
- m--多行查找，即在到达一行文本末尾时还会继续查找下一行中是否存在模式匹配的项


2.字面量定义

```javascript
var reg = /(\w+)\s(\w+)/;
```

3.构造函数定义与字面量定义比较

由于构造函数定义的参数是字符串，所以在某些情况下要对字符串进行双重转义。另外所有的元字符都必须进行双重转义，那些已经转义过的字符串也是如此，以下左边为字面量模式，右边为等价的构造函数定义时使用的字符串参数。

| 字面量模式          |  等价的字符串          |
| -------------      |:-------------:       |
| `/\w/`             | `"\\w"`              |
| `/\[java\]script/` | `"\\[java\\]script"` |
| `/\.com/`          | `"\\.com"`           |
| `/China\/Eng/`     | `"China\\/Eng"`      |
| `/\d\.\d{1,2}/`    | `"\\d\\.\\d{1,2}"`   |
| `/\w\\hello`       | `"\\w\\\\hello"`     |

在ECMAScript3中，正则表达式字面量会始终共享同一个RegExp实例，而使用构造函数创建的每一个新RegExp都是一个新的实例。

```javascript
var reg = null,i;
	
for (i = 0; i < 10; i++){
	reg = /java/g;
	reg.test("javascript");
}
	
for (i = 0; i < 10; i++){
	reg = new RegExp("java","g");
	reg.test("javascript");
}
```

第一个循环中第一次调用test()找到了"java",但第二次调用从索引为3(上一次匹配的末尾)的字符开始,所以第二次就匹配不到，由于匹配会一直找到字符串末尾，所以下一次再调用test()又会重头开始。

第二个循环使用构造函数在每次循环中创建正则表达式，因为每次迭代都会创建一个新的RegExp实例，所以每次调用test()都会返回true。

注意，在ECMAScript5中，正则表达式字面量和构造函数一样，每次都会创建新的RegExp实例。所以ECMAScript5往后上面两个循环结果都一样。

## 正则表达式的方法和属性 ##

1.exec(str)

exec()方法接受一个参数，即要应用模式的字符串，返回包含第一个匹配项信息的数组，没有匹配项的情况下返回null。返回的是Array实例，另外还包含两个额外的属性，index和input，index表示匹配项在字符串中的位置，input表示应用正则表达式的字符串。

```javascript
var text = "mom and dad and baby";
var reg = /mom( and dad( and baby)?)?/gi;
	
var matches = reg.exec(text);
alert(matches.index);    //0
alert(matches.input);    //"mom and dad and baby"
alert(matches[0]);       //"mom and dad and baby"
alert(matches[1]);       //" and dad and baby"
alert(matches[2]);       //" and baby"
```

对于exec()方法而言，在模式中设置了g，它每次也只返回一个匹配项，但每次调用exec()都会在字符串中继续查找新的匹配项，如不设置g，每次调用exec()都只返回第一个匹配的信息。

```javascript
var text = "cat, bat, sat, fat";        
var pattern1 = /.at/;
        
var matches = pattern1.exec(text);        
alert(matches.index);     //0
alert(matches[0]);        //"cat"
alert(pattern1.lastIndex);//0

matches = pattern1.exec(text);        
alert(matches.index);     //0
alert(matches[0]);        //"cat"
alert(pattern1.lastIndex);//0

var pattern2 = /.at/g;
        
var matches = pattern2.exec(text);        
alert(matches.index);     //0
alert(matches[0]);        //"cat"
alert(pattern2.lastIndex);//3

matches = pattern2.exec(text);        
alert(matches.index);     //5
alert(matches[0]);        //"bat"
alert(pattern2.lastIndex);//8
```	

2.test(str)

test()方法接受一个字符串参数。在模式与该参数匹配的情况下返回true，否则返回false。

3.replace(RegExp/str,str_replace)

replace()方法接受两个参数，第一个参数为字符串或RegExp对象，第二个参数为字符串或一个回调函数，若为字符串，第二个参数将替换第一个参数匹配到的值，然后将替换后的原文本作为返回值返回，其中第二个参数中可包含RegExp属性$1~$9,表示从原文本中捕获到的对象，使用$1~$9属性时，第一个参数必须是RegExp对象,且需用()来捕获。

注意调用函数str.replace(),并不改变str的值。

```javascript
var text = "first_second";
var text_replaced = text.replace(/first/,"1");
alert(text);    //first_second
alert(text_replaced);    //1_second

text_replaced = text.replace(/(first)/,"1$1");
alert(text_replaced);     ////1first_second
```

x.正则属性

| 属性名         　　 |  说明                                     |
| -------------      |:-------------:                           |
| input              | 返回最近一次要匹配的字符串                   |
| lastMatch          | 返回最近一次的匹配项                        |
| lastParen          | 返回最近一次匹配的捕获组                     |
| leftContext        | input字符串中lastMatch之前的文本            |
| rightContext       | input字符串中lastMatch之后的文本            |
| Multiline          | 返回布尔值，表示是否所有表达式都使用多行模式   |

```javascript
var text = "this has been a short summer";
var pattern = /(.)hort/g;
        
       
if (pattern.test(text)){
alert(RegExp.input);               //this has been a short summer
alert(RegExp.leftContext);         //this has been a            
alert(RegExp.rightContext);        // summer
alert(RegExp.lastMatch);           //short
alert(RegExp.lastParen);           //s
alert(RegExp.multiline);           //false
}
```

注意：某些属性在某些浏览器可能未实现。

除了上面的几个属性外，还有9个用于存储捕获组的属性。访问语法是RegExp.$1,RegExp.$2...RegExp.$9，在调用test()和exec()方法时，这些属性会被自动填充。

```javascript
var text = "this has been a short summer";
var pattern = /(..)or(.)/g;
              
if (pattern.test(text)){
alert(RegExp.$1);       //sh
alert(RegExp.$2);       //t
}
```