## 制作首页App组件

1. 完成Header区域，使用的是mint-ui中的Header组件
2. 制作底部的tarbar区域，使用的是mui的tabbar.html
 + 在制作购物车小图标时，找到mui的扩展图标库
 + 先把扩展图标的css样式，拷贝到项目中
 + 拷贝扩展字体库tff文件到项目中
 + 为购物车小图标添加如下样式`mui-icon mui-icon-extra mui-icon-extra-cart`
3. 要在中间区域放置一个router-view来显示路由匹配到的组件

## 改造底部a标签r为router-link

## 设置路由高亮
- 结合路由的`linkActiveClass`属性完成`mui-active`类样式的高亮

## 点击底部对应路由链接显示对应路由组件
- 配置路由规格时的注意事项，可以参考现有的开源项目，更方便的管理自己的文件结构
- 参考结构：
src=>pages=>home=>index.vue

## 制作首页轮播图
1. 通过mint-ui的swipe组件完成样式
2. 使用 vue-resource的this.$http.get获取接口中的数据，进行渲染
3. 获取到的数据保存到data身上
4. 使用v-for循环渲染每个item项

## 改造九宫格区域的样式
- 使用mui的代码片段作为改造的基础模板
- 修改结构并覆盖mui的默认样式
- 抽取全局的common.less,通过main.js引入

## 添加组件切换动画
- 切换动画的起点和终点不同，所以单独设置v-enter和v-leave-to的样式
```css
.v-enter {
  transform: translateX(100%);//使组件开始位置在右侧，从右侧进入
  opacity: 0;
}

.v-leave-to {
  position: absolute;//使组件出去时不占位置，不会出现两个组件位于页面上下的情况
  transform: translateX(-100%);//使组件结束位置在左侧，从左侧出去
  opacity: 0;
}

.v-enter-active,
.v-leave-active {
  transition: all 0.6s ease;
}
```



