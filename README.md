### 基于ant-design-pro的社团管理管理系统

本项目github地址：https://github.com/helloyoucan/cmsys

本项目是后端管理平台，前台展示网站的项目在
https://github.com/helloyoucan/cmsys-show

###### 运行

```
npm install 
npm run start
```

###### 构建

```
npm run build
```

本项目为前端项目，具备mock的数据模拟，也可以把后端运行起来，使用代理

后端项目在https://gitee.com/ZeKaiWang95/sausys

###### 使用代理

在项目根目录打开.roadhogrc，在"theme": "./src/theme.js"下一行添加，注意在"theme": "./src/theme.js"加上逗号

```
"proxy": {
      "/": {
        "target": "http://localhost:8085/",
        "changeOrigin": true,
        "pathRewrite": { "^/": "" }
      }
    }
```

##### 项目介绍

>本项目为本人的毕业设计，基于学校社团管理的需求完成的社团管理项目的前端部分，具备信息管理，信息审批、文章编写等功能

###### 系统的权限

> ```
> 1、chaojiguanliyuan
> 超级管理员，在mock中可用（admin，123456）登陆
> 2、tuanweiguanliyuan
> 团委管理员，在mock中可用（tuanwei，123456）登陆
> 3、shelianguanliyuan
> 社联管理员，在mock中可用（shelian，123456）登陆
> 4、shetuanguanliyuan
> 社团管理员，在mock中可用（shetuan，123456）登陆
> ```



#### 系统截图

![](http://upload-images.jianshu.io/upload_images/3345526-98f6054daf419106.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


![](http://upload-images.jianshu.io/upload_images/3345526-73dcaafa299b3f7c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![](http://upload-images.jianshu.io/upload_images/3345526-5cf46260b468ac26.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![](http://upload-images.jianshu.io/upload_images/3345526-1bee017100c4357c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


![](http://upload-images.jianshu.io/upload_images/3345526-7ce4d55240a073fd.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![](http://upload-images.jianshu.io/upload_images/3345526-cb07183a8f8c803d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![](http://upload-images.jianshu.io/upload_images/3345526-bee4d1abf998df1b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

