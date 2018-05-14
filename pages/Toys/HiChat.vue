<template>
  <div class="hello">
    <div class="wrapper">
      <div class="banner">
        <h1>HiChat :)</h1>
        <span id="status">{{onlineNum}}</span>
      </div>
      <div id="historyMsg">
        <template v-for="(item, index) in list">
          <p :style="{color: item.color}" :key="index">
            {{item.user}} <span class="timespan">({{item.date}}): </span>{{item.msg}}
          </p>
        </template>
      </div>
      <div class="controls">
        <!-- <div class="items">
          <input id="colorStyle" type="color" placeHolder='#000' title="font color" />
          <input id="emoji" type="button" value="emoji" title="emoji" />
          <label for="sendImage" class="imageLable">
            <input type="button" value="image"  />
            <input id="sendImage" type="file" value="image"/>
          </label>
          <input id="clearBtn" type="button" value="clear" title="clear screen" />
        </div> -->
        <textarea id="messageInput" placeHolder="enter to send" v-model="msgInserting"></textarea>
        <input id="sendBtn" type="button" value="SEND" @click="sendMsg">
        <div id="emojiWrapper">
        </div>
      </div>
    </div>
    <div id="loginWrapper" v-if="maskShow">
      <p id="info">{{msgStart}}</p>
      <div id="nickWrapper" v-if="msgStartShow">
        <input type="text" placeHolder="nickname" id="nicknameInput" v-model="nickName" />
        <input type="button" value="OK" id="loginBtn" @click="submitName" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msgStart: 'connecting to server...', // 开始界面信息
      msgStartShow: false, // 是否展示昵称输入界面
      maskShow: true, // 是否展示遮罩层界面
      nickName: '', // 用户昵称
      list: [], // 聊天室消息列表
      onlineNum: '', // 在线人数
      msgInserting: '' // 准备发送的文字
    }
  },
  sockets: {
    // 监听socket的connect事件，此事件表示连接已经建立
    connect () {
      console.log('connection', '--------------------------------------------------------------')
      // 连接到服务器后，显示昵称输入框
      this.msgStart = 'get yourself a nickname :)'
      this.msgStartShow = true
    },
    // 设置系统消息样式
    system (nickName, userCount, type) {
      let msg = nickName + (type === 'login' ? ' joined' : ' left')
      // 指定系统消息显示为红色
      this._displayNewMsg('system ', msg, 'red')
      this.onlineNum = userCount + (userCount > 1 ? ' users' : ' user') + ' online'
    },
    // 显示昵称被占用的提示
    nickExisted () { this.msgStart = '!nickname is taken, choose another pls' },
    // 登录成功
    loginSuccess () {
      // document.title = 'hichat | ' + this.nickName
      this.maskShow = false // 隐藏遮罩层显聊天界面
    },
    // 用户提交新的信息
    newMsg (user, msg) { this._displayNewMsg(user, msg) }
  },
  methods: {
    // 提交用户名到服务器
    submitName () {
      // 检查昵称输入框是否为空
      if (this.nickName.trim().length !== 0) {
        // 不为空，则发起一个login事件并将输入的昵称发送到服务器
        this.$socket.emit('login', this.nickName)
      } else {
        this.$message('用户名为空')
      }
    },
    // 用户提交一条信息
    sendMsg () {
      if (this.msgInserting.trim().length !== 0) {
        this.$socket.emit('postMsg', this.msgInserting) // 把消息发送到服务器
        this._displayNewMsg('me', this.msgInserting) // 把自己的消息显示到自己的窗口中
        this.msgInserting = ''
      }
    },
    // 推送一条新消息
    _displayNewMsg (user, msg, color) {
      let date = new Date().toTimeString().substr(0, 8)
      this.list.push({
        user: user || '',
        msg: msg || '',
        color: color || '',
        date: date || ''
      })
    }
  },
  mounted () {
  }
}
</script>

<style scoped>
html,
body {
  margin: 0;
  background-color: #efefef;
  font-family: sans-serif;
}

.wrapper {
  width: 500px;
  height: 640px;
  padding: 5px;
  margin: 0 auto;
  background-color: #ddd;
}

#loginWrapper {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(5, 5, 5, .6);
  text-align: center;
  color: #fff;
  display: block;
  padding-top: 200px;
}

.banner {
  height: 80px;
  width: 100%;
}

.banner p {
  float: left;
  display: inline-block;
}

.controls {
  height: 100px;
  margin: 5px 0px;
  position: relative;
}

#historyMsg {
  height: 400px;
  background-color: #fff;
  overflow: auto;
  padding: 2px;
}

#historyMsg img {
  max-width: 99%;
}

.timespan {
  color: #ddd;
}

.items {
  height: 30px;
}

#colorStyle {
  width: 50px;
  border: none;
  padding: 0;
}

/*custom the file input*/

.imageLable {
  position: relative;
}

#sendImage {
  position: absolute;
  width: 52px;
  left: 0;
  opacity: 0;
  overflow: hidden;
}

/*end custom file input*/

#messageInput {
  width: 440px;
  max-width: 440px;
  height: 90px;
  max-height: 90px;
}

#sendBtn {
  width: 50px;
  height: 96px;
  float: right;
}

#emojiWrapper {
  display: none;
  width: 500px;
  bottom: 105px;
  position: absolute;
  background-color: #aaa;
  box-shadow: 0 0 10px #555;
}

#emojiWrapper img {
  margin: 2px;
  padding: 2px;
  width: 25px;
  height: 25px;
}

#emojiWrapper img:hover {
  background-color: blue;
}

.emoji {
  display: inline;
}

footer {
  text-align: center;
}
</style>
