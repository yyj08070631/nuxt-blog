/* use strict */
module.exports = function (io) {
  let users = [] // 保存所有在线用户的昵称

  // hichat: socket部分
  io.on('connection', function (socket) {
    // 昵称设置
    socket.on('login', function (nickname) {
      if (users.indexOf(nickname) > -1) {
        socket.emit('nickExisted')
      } else {
        socket.userIndex = users.length
        socket.nickname = nickname
        users.push(nickname)
        socket.emit('loginSuccess')
        io.emit('system', { nickname, userCount: users.length, type: 'login' })
      }
    })

    // 断开连接的事件
    socket.on('disconnect', function () {
      // 将断开连接的用户从users中删除
      users.splice(socket.userIndex, 1)
      // 通知除自己以外的所有人
      socket.broadcast.emit('system', { nickname: socket.nickname, userCount: users.length, type: 'logout' })
    })

    // 接收新消息
    socket.on('postMsg', function (msg) {
      // 将消息发送到除自己外的所有用户
      socket.broadcast.emit('newMsg', { nickname: socket.nickname, msg: msg })
    })
  })
}
