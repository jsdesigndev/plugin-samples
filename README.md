# 即时设计示例插件 plugin-samples 🎨 

## 初始化准备
1. 安装 [Node.js](https://nodejs.org/en/download/)  
2. 下载或升级即时设计[桌面版客户端](https://js.design/download)

## 使用插件
以 plugin-samples 为例：
1. cd <path/插件文件名称> 进入某一插件文件夹下  
```
$ cd/Users/jishisheji/Desktop/插件文件名称
``` 
2. npm install 安装依赖  
	> 
```JavaScript
$ npm install
```
3. npm run build 打包
	> 
```JavaScript
$ npm run build
```
4. 登录「即时设计」客户端
5. 进入工作台后在系统菜单中选择 插件 > 开发者 > 导入插件 
<img src="https://user-images.githubusercontent.com/108673278/177242940-156a6cba-9e3d-4104-9df6-a1c9372e5720.png" width="500px">
6. 找到插件文件夹内部的 manifest.json文件，选择打开完成插件导入 

## 示例插件：有用户界面的插件 (with user interface)    
### 创建色卡  
添加色卡至画布视区中心  
- 展示如何调用 viewport API 将创建的节点定位在画布中央
- 展示使用 scrollAndZoomIntoView 方法将创建节点居中后以最佳缩放比展示 
- 展示使用 resizeWithoutConstraints 方法设置画板宽高，子级图层不跟随等比缩放

<img src="https://user-images.githubusercontent.com/108673278/177479987-7ebe5026-783e-4eb1-b06e-7799d23dd065.png" width="500px">

### 拖拽添加icon  

制作图标，点击或拖拽将图标添加至画布
- 展示如何监听由插件 ui 发送过来的事件消息及相关数据（insert & drop 事件）
- 展示如何通过 createNodeFromSvg 方法将svg字符串创建成节点（导入svg）  
<img src= "https://user-images.githubusercontent.com/108673278/177313395-7d950bd9-0606-4a88-b844-d5a72a7a56c9.png" width="500px">  


### 创建矢量星形 
选择颜色，创建多个星形并将其添加至画布内
- 展示如何创建 node 节点（.createStar)
- 展示如何设置 Frame 的布局方式
- 展示如何将页面中的选中目标设置为「画板」

<img src="https://user-images.githubusercontent.com/108673278/177310498-47166813-b9ac-44cf-b5aa-3ca1e2f25a8a.png" width="500px">


## 示例插件：无用户界面的插件 (without user interface)
### 图片去饱和
一键为图片去饱和
- 展示如何读/写存储在即时设计文件中的图片  

<img src="https://user-images.githubusercontent.com/108673278/177302272-75d54cc4-a50f-439c-95fb-97a5f0928eb2.png " width="400px">  
  

### 图层拉伸
将子级图层拉伸至父级大小
- 展示使用 jsDesign.command 获取描述文件中 menu 所配置的 command 属性值
- 展示通过 resize 的方法改变宽高，其子级元素同步会等比缩放

<img src="https://user-images.githubusercontent.com/108673278/177304502-c5fd00d7-9e96-4a70-8c20-6d6fd28db73b.png" width="400px">

## 示例插件：输入参数运行的插件 (jsDesign.parameters)
- 展示用户在插件中输入参数时，按键触发 input 事件时如何通过调用 parameters API 来进行响应
- 展示如何使用 vctorPath API 创建多种形状图形  

<img src="https://user-images.githubusercontent.com/108673278/177486652-74c13a5a-6698-49ee-ad0d-780873861d93.png" width="400px">






