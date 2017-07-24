---
title: JS面向委托的设计模式
date: 2017-07-24 09:55:28
categories:
 - 学习记录
tags:
 - Javascript
 - 设计模式
type: "tags"
---

# 面向委托的设计模式

> 看了很久的You don't know Javascript，今天就来写一写对于OLOO（对象关联）编程模式的小总结，虽然这本书吃的不是很透，但是还是试着写一写，分享一下。

相信大家对于面向对象编程语言中的**类**都不陌生，子类会复制父类的所有属性，而对于JS呢，她并不会去复制，而是利用了委托（即[[prototype]]链）。

### 模仿“类”的JS

Javascript中有一种奇怪的行为一直在被无耻的滥用，那就是模仿类。
比如如下代码：
```
function Foo(name) {
  this.name = name;
}
Foo.prototype.myName = function () {
  return this.name;
}

var a = new Foo('a');
var b = new Foo('b');

a.myName();  // a
b.myName();  // b
```
以上代码用到了`this`和`prototype`，相信大家都很熟悉，但是我们的Foo函数里并没有`myName`方法，此时就用到了[[prototype]]链，如果`myName`在`a`或者`b`中找不到，就会通过**委托**在Foo.prototype上进行查找。
下面这段代码使用的就是典型的“原型风格”：
```
function Foo(name) {
  this.name = name;
}

Foo.prototype.myName = function () {
  return this.name;
}

function Bar(name, label) {
  Foo.call(this, name);
  this.label = label;
}
// 将Bar.prototype关联到Foo.prototype上
Bar.prototype = Object.create(Foo.prototype);
// 提示一下，如果此时要使用到Bar.constructor
// 就应该手动重置一下此属性，使其指到Bar上。

Bar.prototype.myLabel = function () {
  return this.label;
}

var a = new Bar('a', 'obj a');

a.myName();  // a
a.myLabel(); // obj a
```

### 委托关联

大家可以看到，强行模仿类的JS，看着很晦涩难懂。接下就简单介绍一下委托关联OLOO（Objects Linking to Others Objects）。

委托关联没有用到构造函数，直接通过`Object.create`方法，构建对象之间的关系。
直接上代码可能会更容易理解，我们就直接改写了上边那个Foo和Bar的例子，代码如下：
```
var Foo = {
  initFoo: function (name) {
    this.name = name;
  },
  myName: function () {
    return this.name;
  }
};

// 创建Bar，并委托Foo的属性
var Bar = Object.create(Foo);

Bar.initBar = function (name, label) {
  this.initFoo(name);
  this.label = label;
};
Bar.myLabel = function () {
  return this.label;
};

var a = Object.create(Bar);

a.initBar('a', 'obj a');
a.myName();  // a
a.myLabel(); // obj a
```
以上代码就十分容易理解了吧，Bar委托了Foo的属性，也没有烦人的`prototype`干扰思维。


>以上就是对于委托关联的简单介绍，请原谅本人是前端小白，讲的不妥或者不好的地方，欢迎大家指正以及交流。