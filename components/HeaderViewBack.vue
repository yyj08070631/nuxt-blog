<template>
  <nav class="navbar navbar-default">
    <div class="container-fluid">
      <!-- Brand and toggle get grouped for better mobile display -->
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <router-link class="navbar-brand" to="/Home/Frontend/ArticleList">YYJ</router-link>
      </div>

      <!-- Collect the nav links, forms, and other content for toggling -->
      <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul class="nav navbar-nav">
          <li class="active"><a href="#">首页</a></li>
          <li><a href="#">文章</a></li>
          <li><a href="#" @click.prevent="mvp">测试</a></li>
        </ul>
        <ul class="nav navbar-nav navbar-right">
          <template v-if="!name || name === ''">
            <li><a href="#" type="button" data-toggle="modal" data-target="#login">登录</a></li>
            <li><a href="#" type="button" data-toggle="modal" data-target="#register">注册</a></li>
          </template>
          <template v-else>
            <li><router-link to="/Home/Backend/Admin">欢迎回来，{{name}}</router-link></li>
            <li><a href="#" type="button" @click.prevent="loginOut">登出</a></li>
          </template>
        </ul>
        <form class="navbar-form navbar-right">
          <div class="form-group">
            <input type="text" class="form-control" placeholder="输入您想搜索的关键词">
          </div>
          <button type="submit" class="btn btn-default">搜索</button>
        </form>
      </div><!-- /.navbar-collapse -->
    </div><!-- /.container-fluid -->

    <!-- 登录弹窗 -->
    <login id="login" @login-succ="getSession"></login>
    <register id="register"></register>
    
    <!-- 登出结果弹窗 -->
    <v-alert id="logout">
      <template slot="alert-title">提示</template>
      <template slot="alert-body">{{logoutTxt}}</template>
    </v-alert>
  </nav>
</template>
<script>
import Login from './userOperation/Login'
import Register from './userOperation/Register'
import VAlert from '@/components/base/VAlert'
export default {
  components: {
    Login,
    Register,
    VAlert
  },
  data () {
    return {
      name: '', // 用户名
      logoutTxt: '' // 登出结果提示文字
    }
  },
  methods: {
    getSession () {
      if (global.sessionStorage.YYJ_username) {
        this.name = global.sessionStorage.YYJ_username
      } else {
        this.name = ''
      }
    },
    loginOut () {
      axios.post('/users/logout', {name: sessionStorage.YYJ_username})
        .then(response => {
          let res = response.data
          if (res.code === 200) {
            // 清空用户名信息
            this.name = ''
            global.sessionStorage.YYJ_username = ''
            // 弹窗提示
            this.logoutTxt = '登出成功'
            $('#logout').modal('show')
          } else {
            // 弹窗提示
            this.logoutTxt = '登出失败'
            $('#logout').modal('show')
          }
        })
        .catch(err => {
          if (err.response.data === 'Unauthorized') {
            // 清空用户名信息
            this.name = ''
            global.sessionStorage.YYJ_username = ''
            // 弹窗提示
            $('#login').modal('show')
          } else {
            // 弹窗提示
            this.logoutTxt = err.response.data
            $('#logout').modal('show')
          }
        })
    },
    // 测试函数
    mvp () {
      axios.get('/users/info', {params: {name: sessionStorage.YYJ_username}})
        .then(res => {
          if (res.code === 200) {
            console.log(res)
          } else {
            console.log(res.code, res.msg)
          }
        })
        .catch(err => {
          console.log(err.response.data)
        })
    }
  },
  computed: {
  },
  mounted () {
    this.getSession()
  }
}
</script>
<style lang="less" scoped>
.navbar {
  width: 100%;
}
</style>
