<template>
  <div class="admin">
    <!-- 头部 -->
    <div class="header">
      <div class="left nav">
        <div class="li logo"><router-link to="/Index/ArticleList" tag="div">{{title}}</router-link></div>
        <div class="li" v-for="(item, index) in navLeft" :key="index"><router-link :to="item.href" tag="div">{{item.title}}</router-link></div>
      </div>
      <div class="right nav">
        <div class="li" v-for="(item, index) in navRight" :key="index"><router-link :to="item.href" tag="div">{{item.title}}</router-link></div>
        <div class="li" v-show="!usernameView"><div @click="isLoginShow = true">登录</div></div>
        <div class="li" v-show="!usernameView"><div @click="isRegistShow = true">注册</div></div>
        <div class="li" v-show="usernameView"><div @click="logout">{{usernameView}}，登出</div></div>
      </div>
    </div>
    <!-- 主体 -->
    <el-container>
      <!-- 边栏菜单 -->
      <el-aside>
        <el-menu default-active="2" class="el-menu-vertical-demo">
          <el-submenu :index="item.index" v-for="(item, index) in menuList" :key="index">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item.title}}</span>
            </template>
            <el-menu-item :index="item1.index" v-for="(item1, index1) in item.children" :key="index1"><router-link :to="item1.link" class="menu-item" tag="p">{{item1.title}}</router-link></el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 内容 -->
      <el-main><router-view></router-view></el-main>
    </el-container>
    <!-- 登录组件 -->
    <login :is-login-show="isLoginShow" @on-close="isLoginShow = false" @login-succ="loginSucc"></login>
    <!-- 注册组件 -->
    <register :is-regist-show="isRegistShow" @on-close="isRegistShow = false"></register>
  </div>
</template>
<script>
import Login from '@/components/userOperation/Login'
import Register from '@/components/userOperation/Register'
export default {
  components: {
    Login,
    Register
  },
  data () {
    return {
      title: 'YYJ', // 博客标题
      menuList: [
        {
          index: '1',
          title: '文章管理',
          link: '/',
          children: [
            {
              index: '1-1',
              title: '文章列表',
              link: '/Admin/ArticleList'
            }
          ]
        }
      ], // 侧边栏菜单列表
      navLeft: [], // 左侧导航
      navRight: [], // 右侧导航
      usernameView: null, // 用户名展示
      isLoginShow: false, // 登录对话框开关
      isRegistShow: false // 注册对话框开关
    }
  },
  methods: {
    // 登录成功回调
    loginSucc (val) {
      this.usernameView = val
      this.$store.commit('COMMIT_IF_REFRESH_LIST', true)
    },
    // 登出回调
    logout () {
      axios.post('/users/logout', { name: sessionStorage.YYJ_username })
        .then(response => {
          let res = response.data
          if (res.code === 200) {
            // 清空用户名信息
            this.usernameView = null
            global.sessionStorage.YYJ_username = ''
            // 弹窗提示
            this.$message.success('登出成功')
          } else {
            // 弹窗提示
            this.$message.success('登出失败')
          }
        })
        .catch(err => {
          if (err.response.data === 'Unauthorized') {
            // 清空用户名信息
            this.usernameView = null
            global.sessionStorage.YYJ_username = ''
            // 弹窗提示
            this.$message('登录已过期')
          } else {
            // 弹窗提示
            this.$message.error('未知错误')
          }
        })
    },
    test () {
      axios.get('/users/info').then(response => {
        console.log(response.data)
      })
    }
  },
  created () {
    global.setCookie = (key, value, expiredays) => {
      var exdate = new Date()
      exdate.setDate(exdate.getDate() + expiredays)
      document.cookie = key + '=' + escape(value) + ((expiredays === null) ? '' : ';expires=' + exdate.toGMTString())
    }
    // 重设请求头中的token认证字段
    if (global.sessionStorage && global.sessionStorage.YYJ_token) {
      let session = global.sessionStorage
      this.usernameView = session.YYJ_username
      setCookie('YYJ_username', session.YYJ_username, 1)
      axios.defaults.headers.common['Authorization'] = session.YYJ_token
    }
  }
}
</script>
<style lang="less" scoped>
.admin {
  width: 100%;
  .header {
    display: flex;
    justify-content: space-between;
    height: 60px;
    padding: 0 20px;
    .nav {
      display: flex;
      height: 100%;
      .li {
        height: 100%;
        width: 90px;
        div {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
          width: 90px;
          font-size: 16px;
          color: #606266;
          transition: .2s all;
          cursor: pointer;
        }
        div:hover {
          color: #909399;
        }
      }
      .li.logo {
        div {
          font-size: 32px;
          color: rgb(64, 158, 255);
        }
      }
    }
  }
  aside {
    .collapse {
      overflow: hidden;
    }
    .menu-item {
      width: 100%;
      height: 100%;
    }
  }
}
</style>

