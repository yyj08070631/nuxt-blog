<template>
  <div class="hello">
    <el-card class="wrapper">
      <div class="banner">
        <h1>我是聊天室</h1>
        <span id="status">{{onlineNum}}</span>
      </div>
      <div class="historyMsg">
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
        <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="msgInserting" @keyup.enter.native="sendMsg"></el-input>
        <div class="controls-btn">
          <el-button type="primary" @click="sendMsg">发送</el-button>
        </div>
      </div>
      <!-- 系统按钮 -->
      <div class="system">
        <el-tooltip class="item" effect="dark" content="主页" placement="bottom">
          <el-button type="primary" size="small" round><i class="fa fa-home" aria-hidden="true"></i></el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="issue" placement="bottom">
          <el-button type="primary" size="small" round plain><i class="fa fa-pencil" aria-hidden="true"></i></el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="简介" placement="bottom">
          <el-button type="info" size="small" round plain><i class="fa fa-info-circle" aria-hidden="true"></i></el-button>
        </el-tooltip>
      </div>
    </el-card>
    <div class="loginWrapper" v-if="maskShow">
      <p class="info">{{msgStart}}</p>
      <div class="nickWrapper" v-if="msgStartShow">
        <el-input v-model="nickName" placeholder="请输入您的用户名"></el-input>
        <el-button type="primary" @click="submitName">进入聊天室</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msgStart: '正在连接...', // 开始界面信息
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
      // 连接到服务器后，显示昵称输入框
      this.msgStart = '请输入您的用户名'
      this.msgStartShow = true
    },
    // 设置系统消息样式
    system (val) {
      let msg = val.nickname + (val.type === 'login' ? ' 进入聊天室' : ' 溜了')
      // 指定系统消息显示为红色
      this._displayNewMsg('系统: ', msg, 'red')
      this.onlineNum = val.userCount + ' 用户在线'
    },
    // 显示昵称被占用的提示
    nickExisted () { this.msgStart = '用户名已存在，请使用别的用户名' },
    // 登录成功
    loginSuccess () {
      // document.title = 'hichat | ' + this.nickName
      this.maskShow = false // 隐藏遮罩层显聊天界面
    },
    // 用户提交新的信息
    newMsg (val) { this._displayNewMsg(val.nickname, val.msg) }
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
        this._displayNewMsg('我', this.msgInserting) // 把自己的消息显示到自己的窗口中
        this.msgInserting = ''
      }
    },
    // 推送一条新消息
    _displayNewMsg (nickname, msg, color) {
      let date = new Date().toTimeString().substr(0, 8)
      this.list.push({
        user: nickname || '',
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

<style lang="less" scoped>
.hello {
  overflow: hidden;
  .wrapper {
    position: relative;
    width: 500px;
    height: 680px;
    padding: 5px;
    margin: 0 auto;
    background-color: #ddd;
    .system {
      position: absolute;
      top: 20px;
      right: 10px;
    }
  }
  .loginWrapper {
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
    .info {
      font-size: 16px;
    }
    .nickWrapper {
      display: flex;
      width: 400px;
      margin: 8px auto 0;
    }
  }
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
  position: relative;
  height: 100px;
  margin: 5px 0px;
  .controls-btn {
    display: flex;
    justify-content: flex-end;
    margin-top: 8px;
  }
}

.historyMsg {
  height: 400px;
  padding: 12px;
  border-radius: 4px;
  background-color: #fff;
  overflow: auto;
  img {
    max-width: 99%;
  }
  p {
    margin-bottom: 4px;
  }
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
