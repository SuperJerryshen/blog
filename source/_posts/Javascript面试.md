---
title: Javascript面试题目
categories:
  - 学习笔记
type: tags
tags:
  - Javascript
  - 面试
date: 2017-07-31 23:24:07
---

> 看到题目后，需要分析**考点**是什么，通过考点来回答问题。

### JS中使用`typeof`能得到哪几种数据类型？
- 考点：JS变量类型

```javascript
typeof null; // object
typeof console.log; //function
```

- Ans：string, number, boolean, undefined, object, function


### `===`和`==`如何使用，以及使用场景？
- 考点：强制类型转换
- 发生类型转换的场景：①字符串拼接 ②==运算符 ③if语句 ④逻辑运算
```javascript
// 字符串拼接
100 + '10' // '10010'

// ==运算符
100 == '100' // true
0 == '' // true
null == undefined // true

// if语句
if (0) {} // 不执行
if (10) {} // 执行
// 0, NaN, '', null, undefined, false在if中会转化为false

// 逻辑运算
console.log(10 && 0) // 0
console.log('' || 'abc') // 'abc'
console.log(!window.abc) // true
```

### JS中有哪些内置函数？
- 考点：数据封装类对象
- Ans：Object, Array, Boolean, String, Number, Date, RegExp, Error, Math

### JS变量按照存储方式区分为那些类型，并描述其特点。
- JS中变量按存储方式分为**值类型**和**引用类型**(包括对象，数组，函数)。
```javascript
// 值类型
var x = 100;
var y = x;
x = 200;
console.log(y); // 100
// 引用类型
var x = {a: 100};
var y = x;
x.b = 200;
console.log(y.b); // 200，x和y指向同一对象的内存地址
```
- 区别是：值类型赋值的时候会新建一个内存空间储存数据；而引用类型进行复制的时候，只是复制指针，两个对象指向的是同一段内存空间。
> 判断对象属性或函数参数是不是存在时，可以使用`if(x.a == null) {}`。

### 如何理解JSON？
- 考点：理解JSON

- JSON只不过是一个JS的对象而已。
```javascript
JSON.stringify({a: 100, b: 200})
JSON.parse('{"a":100,"b":200}')
```

### `window.onload`和`DOMContentLoaded`的区别？
- 考点：浏览器渲染过程

### 如何用Javascript创建10个`<a>`标签，并设置点击每个标签的时候弹出对应的序号？
- 考点：作用域

### 简书如何实现一个**模块加载器**，实现类似`require.js`的基本功能。
- 考点：JS模块化

### 实现数组的**随机排序**。
- 考点：JS基础算法