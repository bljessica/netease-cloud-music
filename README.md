# netease-cloud-music

> 此项目为网易云音乐app前端界面，后端使用[网易云音乐NodeJS版API](https://binaryify.github.io/NeteaseCloudMusicApi/#/)

## 技术
+ vue+vuex+vue-router+scss+axios+webpack
+ 使用ElementUI的部分组件
+ 使用better-scroll滚动插件

## 功能
+ 登录（使用自己的网易云账号密码登录即可）
+ 播放、暂停音乐，查看、拖拽歌词，跳转进度，前后切换音乐，播放列表中切换音乐
+ 搜索，搜索结果分类
+ 发现页：轮播图，热门歌单推荐，每日推荐，歌单广场
+ 我的页：个人信息，喜欢的音乐，创建的歌单，收藏的歌单
+ 云村页：云村热评墙，查看关注的人列表

还有不少功能没写，努力完善ing...

## 项目演示
[项目演示地址](http://49.234.89.20:8081) 

PC端按F12切换到移动设备模式查看即可（目前移动端访问会出现部分布局不正确的问题，建议采用PC端访问） 

## 界面展示
<img src="https://github.com/bljessica/netease-cloud-music/blob/master/static/find.png" style="display: inline-block; margin-left: 20px;" width="200px" height="360px" alt="发现"><img src="https://github.com/bljessica/netease-cloud-music/blob/master/static/mine.png" style="display: inline-block; margin-left: 20px;" width="200px" height="360px" alt="我的"><img src="https://github.com/bljessica/netease-cloud-music/blob/master/static/search.png" style="display: inline-block; margin-left: 20px;" width="200px" height="360px" alt="搜索"><img src="https://github.com/bljessica/netease-cloud-music/blob/master/static/menu.png" style="display: inline-block; margin-left: 20px;" width="200px" height="360px" alt="菜单"><img src="https://github.com/bljessica/netease-cloud-music/blob/master/static/playlist.png" style="display: inline-block; margin-left: 20px;" width="200px" height="360px" alt="歌单"><img src="https://github.com/bljessica/netease-cloud-music/blob/master/static/cover.png" style="display: inline-block; margin-left: 20px;" width="200px" height="360px" alt="播放"><img src="https://github.com/bljessica/netease-cloud-music/blob/master/static/lyrics.png" style="display: inline-block; margin-left: 20px;" width="200px" height="360px" alt="歌词"><img src="https://github.com/bljessica/netease-cloud-music/blob/master/static/ground.png" style="display: inline-block; margin-left: 20px;" width="200px" height="360px" alt="歌单广场">

## 运行
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
