<template>
  <!-- 登录操作弹窗 -->
  <el-dialog class="regist" title="注册" :visible.sync="isRegistShow" :before-close="closeDialog">
    <el-form :model="form">
      <el-form-item label="用户名" :label-width="formLabelWidth">
        <el-input v-model="form.username" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" :label-width="formLabelWidth">
        <el-input type="password" v-model="form.password" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="重复密码" :label-width="formLabelWidth">
        <el-input type="password" v-model="form.passwordAgain" auto-complete="off"></el-input>
      </el-form-item>
    </el-form>
    <el-alert :title="registAlert" v-if="!registAllow" type="error" :closable="false"></el-alert>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="submitRegist" :disabled="!registAllow">注 册</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  props: {
    // 登录弹窗展示开关
    isRegistShow: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      // 弹窗中的表单数据
      form: {
        username: '', // 用户名
        password: '', // 密码
        passwordAgain: '' // 重复密码
      },
      // 表单的label宽度
      formLabelWidth: '80px',
      registAlert: '', // 注册警告框文字
      registAllow: true // 是否允许提交注册
    }
  },
  methods: {
    // 关闭登录对话框
    closeDialog () { this.$emit('on-close') },
    // 提交注册请求
    submitRegist () {
      if (this.form.username === '' || this.form.password === '' || this.form.passwordAgain === '') {
        this.$message.success('请填写所有信息')
      } else {
        axios.post('/users/signup', { username: this.form.username, password: this.form.password })
          .then((response) => {
            var res = response.data
            if (res.code === 200) {
              this.isRegistShow = false
              this.$message.success('注册成功！请自行登录')
            } else {
              this.$message.error(res.msg)
            }
          })
      }
    }
  },
  watch: {
    'form.username' (val) {
      let reg = /^[a-zA-Z0-9_]{4,16}$/
      if (reg.test(val)) {
        this.registAllow = true
      } else {
        this.registAlert = '用户名是4-16位的数字、字母或下划线'
        this.registAllow = false
      }
    },
    'form.password' (val) {
      let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/
      if (reg.test(val)) {
        if (val === this.passwordAgain) {
          this.registAllow = true
        } else {
          this.registAlert = '两次输入的密码不一样'
          this.registAllow = false
        }
      } else {
        this.registAlert = '密码必须是6-21位的数字或字母的组合，且不能是纯数字或纯字母'
        this.registAllow = false
      }
    },
    'form.passwordAgain' (val) {
      if (val === this.form.password) {
        let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/
        if (reg.test(val)) {
          this.registAllow = true
        } else {
          this.registAlert = '密码必须是6-21位的数字或字母的组合，且不能是纯数字或纯字母'
          this.registAllow = false
        }
      } else {
        this.registAlert = '两次输入的密码不一样'
        this.registAllow = false
      }
    }
  }
}
</script>
<style lang="less" scoped>

</style>
