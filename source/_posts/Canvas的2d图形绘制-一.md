---
title: Canvas的2d图形绘制(一)
categories:
  - 项目
type: tags
tags:
  - Javascript
date: 2017-08-17 23:22:37
---

## Canvas坐标系统

canvas的左上角为默认坐标中心，水平向右为X轴正方向，竖直向下为Y轴正方向。

> 然而，你可以通过平移，旋转，缩放等方式改变坐标系位置。

## 图形绘制

### 矩形的绘制

Canvas提供三个API，分别用于清除、描边、填充矩形。

#### `clearReact(double x, double y, double w, double h)`

用于将指定矩形与当前剪辑区域相交范围内的所有像素清除。

#### `strokeRect(double x, double y, double w, double h)`

用于矩形的描边。需要使用 `strokeStyle`, `lineWidth`, `lineJoin`, `miterLimit`来控制所绘图形。如果w，h中有任意一个为0，则绘制一条直线。

#### `fillReact(double x, double y, double w, double h)`

用于填充矩形。如果宽度或高度有一个为0，则不进行绘制。

> 示例代码如下。

```javascript
var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d');

context.lineJoin = 'round';
context.lineWidth = 30;

context.font = '24px Helvetica';
context.fillText('Click anywhere to erase', 175, 40);

context.strokeRect(75, 100, 200, 200);
context.fillRect(325, 100, 200, 200);

context.canvas.onmousedown = function(e) {
  context.clearRect(0, 0, canvas.width, canvas.height)
}
```

### 颜色与透明度

> 可以通过RGB、RGBA、HSL、HSLA、十六进制RGB标注法以及颜色名称这6种方式定义颜色。

```css
div {
    color: #ffffff;
    color: #123;
    color: rgba(7, 17, 27, 0.5);
    color: rgb(7, 17, 27);
    color: hsla(20, 62%, 28%, .5);
    color: hsl(20, 62%, 28%);
    color: antiquewhite;
}
```
> HSL：三个字母分别表示色相、饱和度和亮度。H色相的数值就像在一个轮盘中一样，红色位于0°（取值为0，后面一样），绿色位于120°，蓝色位于240°。

设置颜色通过`strokeStyle`和`fillStyle`来设置。

### 渐变色和图案

#### 渐变色

 - 通过方法`context.createLinearGradient(x0, y0, x1, y1)`创建线性渐变。
 
 > (x0, y0)为渐变起点，(x1, y1)为渐变终点。
 
 - 通过方法`context.createRadialGradient(x0, y0, r0, x1, y1, r1)`创建放射渐变。

 > (x0, y0, r0)为开始圆的位置和半径，(x1, y1, r1)为结束圆的位置和半径。
 
 #### 图案
 
 通过方法``context.createPattern(image, type)`
 
 > 该方法接受两个参数。image可以是一个`Image`对象的引用，或者另一个`canvas`对象。type必须是下面的字符串值之一：`repeat`，`repeat-x`，`repeat-y`和 `no-repeat`。
 
 ### 阴影效果
 
 通过在context下设置以下属性，实现阴影：
 
  - `shadowBlur`: 表示阴影的高斯模糊值，默认为0。
  - `shadowColor`: 表示阴影的颜色，默认为`rgba(0, 0, 0, 0)`，即完全透明的黑色。
  - `shadowOffsetX`: 阴影在X轴方向的偏移量，以像素为单位，默认为0。
  - `shadowOffsetY`: 阴影在Y轴方向的偏移量，以像素为单位，默认为0。