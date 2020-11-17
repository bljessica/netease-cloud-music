# netease-cloud-music

基于Vue(2.9) + vuex + vue-router + scss + axios + webpack仿网易云音乐app前端界面  
后端使用[网易云音乐NodeJS版API](https://binaryify.github.io/NeteaseCloudMusicApi/#/)

## 技术栈
+ `vue`：用于构建用户界面的MVVM框架
+ `vuex`：Vue集中状态管理，用于多组件之间共享状态
+ `vue-router`：为单页面应用提供的路由系统
+ `scss`：CSS预处理器
+ `axios`：用于发送ajax请求
+ `vue-cli`：脚手架工具，用于快速初始化项目
+ `webpack`：模块打包工具
+ `iconfont`：阿里巴巴矢量图标库字体图标
+ `ElementUI`的部分组件
+ `better-scroll`：一款移动端滚动插件

## 功能
+ 登录（使用自己的网易云账号密码登录即可）
+ 播放、暂停音乐，查看、拖拽歌词，跳转进度，前后切换音乐，播放列表中切换音乐
+ 搜索，搜索结果分类
+ 发现页：轮播图，每日推荐，排行榜，热门歌单推荐，歌单广场，音乐日历
+ 我的页：个人信息，喜欢的音乐，创建的歌单，收藏的歌单
+ 云村页：云村热评墙，查看关注的人列表

还有不少功能没写，努力完善ing...

## 项目演示
[项目演示地址](http://49.234.89.20:8081) 

PC端按F12切换到移动设备模式查看即可

## 界面展示
<img src="https://github.com/bljessica/netease-cloud-music/blob/master/static/find.png" style="display: inline-block; margin-left: 20px;" width="200px" height="360px" alt="发现"><img src="https://github.com/bljessica/netease-cloud-music/blob/master/static/mine.png" style="display: inline-block; margin-left: 20px;" width="200px" height="360px" alt="我的"><img src="https://github.com/bljessica/netease-cloud-music/blob/master/static/search.png" style="display: inline-block; margin-left: 20px;" width="200px" height="360px" alt="搜索"><img src="https://github.com/bljessica/netease-cloud-music/blob/master/static/menu.png" style="display: inline-block; margin-left: 20px;" width="200px" height="360px" alt="菜单"><img src="https://github.com/bljessica/netease-cloud-music/blob/master/static/playlist.png" style="display: inline-block; margin-left: 20px;" width="200px" height="360px" alt="歌单"><img src="https://github.com/bljessica/netease-cloud-music/blob/master/static/cover.png" style="display: inline-block; margin-left: 20px;" width="200px" height="360px" alt="播放"><img src="https://github.com/bljessica/netease-cloud-music/blob/master/static/lyrics.png" style="display: inline-block; margin-left: 20px;" width="200px" height="360px" alt="歌词"><img src="https://github.com/bljessica/netease-cloud-music/blob/master/static/ground.png" style="display: inline-block; margin-left: 20px;" width="200px" height="360px" alt="歌单广场"><img src="https://github.com/bljessica/netease-cloud-music/blob/master/static/highType.png" style="display: inline-block; margin-left: 20px;" width="200px" height="360px" alt="精品歌单标签分类"><img src="https://github.com/bljessica/netease-cloud-music/blob/master/static/rank.png" style="display: inline-block; margin-left: 20px;" width="200px" height="360px" alt="排行榜">

## TODO
+ 优化图片加载速度，图片懒加载
+ 添加下拉搜索更多功能，完善搜索页面
+ 添加MV、电台、设置等功能
+ to be continued...

## 运行
后台代码运行详见[网易云音乐NodeJS版API](https://github.com/Binaryify/NeteaseCloudMusicApi)

```
#切换到项目目录
cd netease-cloud-music

# 安装依赖
npm install

# 本地运行
npm run dev

# 生产打包
npm run build

```
