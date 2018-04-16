<template>
  <!-- 登录操作弹窗 -->
  <el-dialog class="login" title="登录" :visible.sync="isLoginShow" :before-close="closeDialog">
    <el-form :model="form">
      <el-form-item label="用户名" :label-width="formLabelWidth">
        <el-input v-model="form.username" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" :label-width="formLabelWidth">
        <el-input type="password" v-model="form.password" auto-complete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="submitLogin">登 录</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  props: {
    // 登录弹窗展示开关
    isLoginShow: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      // 弹窗中的表单数据
      form: {
        username: '', // 用户名
        password: '' // 密码
      },
      // 表单的label宽度
      formLabelWidth: '80px'
    }
  },
  methods: {
    // 关闭登录对话框
    closeDialog () { this.$emit('on-close') },
    // 登录
    submitLogin () {
      axios.post('/users/accesstoken', { name: this.form.username, password: this.form.password }).then(response => {
        let res = response.data
        if (res.code === 200) {
          axios.defaults.headers.common['Authorization'] = res.data.token
          sessionStorage.setItem('YYJ_token', res.data.token)
          sessionStorage.setItem('YYJ_username', res.data.name)
          setCookie('YYJ_username', res.data.name, 1)
          this.$emit('login-succ', res.data.name)
          this.closeDialog()
          // 提示
          this.$message.success(res.msg)
        } else {
          this.closeDialog()
          this.$message.error(res.msg)
        }
      }).catch(err => {
        if (err) {
          this.closeDialog()
          this.$message.error('未知错误')
        }
      })

      // 清空
      this.form = { username: '', password: '' }
    }
  }
}
</script>
<style lang="less" scoped>
</style>
