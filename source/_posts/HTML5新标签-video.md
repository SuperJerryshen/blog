---
title: HTML5新标签`<video>`
categories:
  - 项目
type: tags
tags:
  - Javascript HTML
date: 2017-07-24 19:59:32
---

# HTML5新标签`<video>`

## HTML标签属性
`<video></video>`标签支持的属性如下表：

| 属性 | 作用 | 值 |
|:---:|:----:|:-----:|
|autoplay|加载完成后自动播放|autoplay|
|controls |播放控件显示 |controls |
|loop |开启循环播放 |loop |
|preload |页面加载时视频就加载播放 |none/metadata/auto |
|src |视频的URL |url |
|height |播放器高度 |pixels |
|width |播放器宽度 |pixels |
|poster |播放或跳帧之前的海报帧 |url |
|buffered |获取被缓存的时间范围 |buffered |
|crossorigin |是否用到CORS |anonymous/use-credentials |
|muted |音频的默认设置 |默认false，音乐随视频播放 |

需要注意的几个属性：
① `preload`：预加载方式。
* `none`: 提示作者认为用户不需要查看该视频，服务器也想要最小化访问流量；换句话说就是提示浏览器该视频不需要缓存。
* `metadata`: 提示尽管作者认为用户不需要查看该视频，不过抓取元数据（比如：长度）还是很合理的。
* `auto`: 用户需要这个视频优先加载；换句话说就是提示：如果需要的话，可以下载整个视频，即使用户并不一定会用它。
* `空字符串`: 即`auto`值。

② `crossorigin`: 此枚举属性指明抓取相关图片是否必须用到`CORS`（跨域资源共享）。 支持`CORS`的资源可在`<canvas>`元素中被重用，而不会被污染。允许的值如下：

* `anonymous`: 跨域请求（即，使用 Origin: 的HTTP头）会被执行。但是不发送凭证（即，不发送cookie， X.509 证书或者 HTTP Basic 授权）。如果服务器不提供证书给源站点 (不设置 Access-Control-Allow-Origin: HTTP头)，图片会被 污染 并且它的使用会受限。
* `use-credentials`: 跨域请求A cross-origin request (i.e. with Origin: HTTP header) 会被执行，且凭证会被发送 (即， 发送一个 cookie, 一个证书和HTTP Basic授权会被执行)。如果服务器不提供证书给源站点 (通过Access-Control-Allow-Credentials: HTTP 头)，图像会被 污染 且它的使用会受限。

> 不加这个属性时，抓取资源不会走CORS请求(即，不会发送`Origin: HTTP`头)，保证其在`<canvas>`元素中使用时不会被污染。如果指定非法值，会被当作指定了枚举关键字`anonymous`一样使用。

③ `buffered`: 这个属性可以读取到哪段时间范围内的媒体被缓存了。该属性包含了一个`TimeRanges`对象。

## 通过`Javascript`控制播放器

元素等级顺序：

`HTMLVideoElement` ----> `HTMLMediaElement` ----> `HTMLElement` ----> `Element` ----> `Node` ----> `EventTarget`

### `HTMLVideoElement`
1. `height`: pixels单位给出显示区域的高度。
2. `width`: pixels单位给出显示区域的宽度。
3. `poster`: 指定视频无法播放时需要展示的图片。
4. `videoHeight`: 以CSS pixels的单位给出视频资源的实际高度（**只读，由视频资源决定**）。
5. `videoWidth`: 以CSS pixels的单位给出视频资源的实际宽度（**只读，由视频资源决定**）。
6. `mozParsedFrames`: 返回一个 unsigned long 值，给出已经从媒体资源中解析的视频帧数。（只读）
7. `mozDecodedFrames`: 返回一个 unsigned long 值，给出已经从媒体资源中解析，并解码为图像的视频帧数。（只读）
8. `mozPresentedFrames`: 返回一个 unsigned long 值，给出被置入绘制队列(pipeline)等待绘制的视频帧数。（只读）
9. `mozPaintedFrames`: 返回一个 unsigned long 值，给出已经被绘制的视频帧数。（只读）
10. `mozFrameDelay`: 返回一个 double 值，表示到目前为止，距上一次绘制过去了多长时间，单位是秒。（只读）
11. `mozHasAudio`: 返回一个Boolean值，表示这个视频是否有关联音频。（只读）
12. `getVideoPlaybackQuality()`: 返回一个 VideoPlaybackQuality 对象，包含了对当前播放引擎的量度信息。（方法）


### `HTMLMediaElement`

包含的部分属性如下：

1. `audioTracks`: 表示在该元素中包含的`AudioTrack`对象列表：`AudioTrackList`。
2. `autoplay`: 表示`autoplay`的HTML属性，表明在视频加载可用时是否不中断地自动播放资源。
3. `buffered`(只读): 如果buffered属性加载成功，会返回一个格式化后的TimeRanges对象。
4. `controller`: 控制器连接成功后会返回`MediaController`，连接失败返回`null`。
5. `controls`: 映射HTML的controls值，选择控制条是否显示，值为Boolean。
6. `crossOrigin`: 图片元素的CORS值，值为DOMString。
7. `currentSrc`(只读): 资源的绝对路径。
8. `currentTime`: 当前播放的时间，单位为秒。为其赋值将会使媒体跳到一个新的时间。
9. `defaultMuted`: 映射HTML的muted值，表示是否静音。值为Boolean，默认false。
10. `defaultPlaybackRate`: 默认视频播放速度，默认值为`1.0`，设置为`0.0`时，会报错`NOT_SUPPORTED_ERR`
11. `duration`(只读): 资源按秒计算的长度。如果视频不能加载，值为0；视频资源可用但是长度未知，值为NaN；如果资源为流媒体，长度没有预定义，则值为Inf。
12. `ended`(只读): 布尔值，表示资源是否播放完毕，播放完毕后值变为true。重新播放会使该值变为false。
13. `error`(只读): MediaError储存最近的error，没发生过错误时，该值为null。
14. `loop`: 映射HTML中的loop值，表示是否循环播放。
15. `mediaGroup`: 映射HTML中的`mediagroup`属性，指向资源组的名字。
16. `networkState`: 当前获取资源的网络状态。0: NETWORK_EMPTY;1: NETWORK_IDLE;2: NETWORK_LOADING;3: NETWORK_NO_SOURCE。

17. `paused`(只读): 表示视频是否暂停，布尔值。
18. `playbackRate`: 当前的媒体播放速度，值的范围0.5 ~ 5.0。
19. `played`(只读): 浏览器已经播放的比例。
20. `preload`: 映射HTML的preload值。
21. `readyState`: 媒体加载的状态码：0: HAVE_NOTHING;1: HAVE_METADATA;2: HAVE_CURRENT_DATA;3: HAVE_FUTURE_DATA;4: HAVE_ENOUGH_DATA。
22. `seekable`(只读): 用户可以请求的范围，TimeRanges。
23. `seeking`(只读): 指向当前正在请求的新播放位置。
24. `src`: 映射HTML的src属性。
25.  `textTracks`: 表示TextTrackList。
26. `videoTracks`: 表示VideoTrackList。
27. `volume`: 表示音量大小，值的范围为0.0 ~ 1.0。

包含的部分方法如下：
1. `fastSeek(double time)`: 直接跳到指定时间的位置。
2. `load()`: 重新加载视频。
3. `pause()`: 暂停播放。
4. `play()`: 开始播放。


> 所有内容参考自[MDN开发者网络](https://developer.mozilla.org/zh-CN/)和[W3school](http://www.w3school.com.cn/)，并翻译了部分内容。

