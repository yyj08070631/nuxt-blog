<template>
  <el-container class="index">
    <el-header>
      <ul class="left nav">
        <li class="logo"><router-link to="/Index/ArticleList">{{title}}</router-link></li>
        <li v-for="(item, index) in navLeft" :key="index"><router-link :to="item.href">{{item.title}}</router-link></li>
      </ul>
      <ul class="right nav">
        <li v-for="(item, index) in navRight" :key="index"><router-link :to="item.href">{{item.title}}</router-link></li>
      </ul>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>
<script>
export default {
  data () {
    return {
      title: 'YYJ', // 博客标题
      navLeft: [], // 左侧导航
      navRight: [
        { title: '文章', href: '/Index/ArticleList' },
        { title: '小玩具', href: '/Index/Toys' },
        { title: '关于我', href: '/Me' }
      ] // 右侧导航
    }
  }
}
</script>
<style lang="less" scoped>
.index {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  header {
    display: flex;
    justify-content: space-between;
    width: 870px;
    .nav {
      display: flex;
      height: 100%;
      li {
        height: 100%;
        width: 90px;
        a {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
          width: 90px;
        }
      }
      li.logo {
        a {
          font-size: 32px;
          color: rgb(64, 158, 255);
        }
      }
    }
  }
  main {
    width: 870px;
  }
}
</style>
