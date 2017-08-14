---
title: React-transition-group动画的使用
categories:
  - 经验分享
type: tags
tags:
  - Javascript
  - React
  - transition
date: 2017-08-14 21:01:03
---
> 本次只简单分享一下Transition的用法。

## 安装`react-transition-group`

官方推荐使用最新的，单独出来的仓库：`react-transition-group`，安装方法如下。

```
npm install --save react-transition-group
```

## React如何使用过渡动画

### Transition组件

使用`Transition`组件来使用过渡动画，即：
```javascript
import Transition from 'react-transition-group/Transition'
```

### Transition组件的用法示例

我单独定义了一个`animation.js`来存放我的动画库。

```javascript
// animation.js
const duration = 400;

export const fadeIn = {
    defaultStyle: {
        transition: `opacity ${duration}ms ease-in-out`,
        opacity: 0
    },
    transitionStyles: {
        entering: { opacity: 0 },
        entered:  { opacity: 0.7 },
        exiting: { opacity: 0 },
        exited: { display: 'none', opacity: 0 }
    }
}

export const slideBottomIn = {
    defaultStyle: {
        transition: `transform ${duration}ms ease-in-out`,
        transform: 'translateY(100%)'
    },
    transitionStyles: {
        entering: { transform: 'translateY(100%)' },
        entered:  { transform: 'translateY(0)' },
        exiting: { transform: 'translateY(100%)' },
        exited: { display: 'none', transform: 'translateY(100%)' }
    }
}
```

在其他组件中使用，代码如下：

```jsx harmony
import { fadeIn, slideBottomIn } from '../animation';

const Example = (props) => {
    <Transition timeout={{enter: 0, exit: 500}} in={isPickerViewShow} >
        {
        state => <div
            className="mask-layer"
            onClick={closePickerView}
            style={{...fadeIn.defaultStyle, ...fadeIn.transitionStyles[state]}}
            ></div>
        }
    </Transition>
}
```
> Transition组件的children为一个函数，接受的参数为state，表示其现在动画的状态，一共有：`entering`，`entered`，`existing`，`existed`这四个状态。




