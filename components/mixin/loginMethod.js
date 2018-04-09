export default {
  methods: {
    submitLogin () {
      axios.post('/users/accesstoken', {name: this.username, password: this.password}).then(response => {
        let res = response.data
        if (res.code === 200) {
          console.log('登录成功!')
          axios.defaults.headers.common['Authorization'] = res.data.token
          sessionStorage.setItem('YYJ_token', res.data.token)
          sessionStorage.setItem('YYJ_username', res.data.name)
          setCookie('YYJ_username', res.data.name, 1)
          this.$emit('login-succ')
          // 提示
          this.loginTxt = res.msg
          $('#loginDialog').modal('show')
        } else {
          this.loginTxt = res.code + ': ' + res.msg
          $('#loginDialog').modal('show')
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
