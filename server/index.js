var express = require('express')
const app = express()
var bodyParser = require('body-parser')
const morgan = require('morgan'); // 命令行log显示
const passport = require('passport'); // 用户认证模块passport
const Strategy = require('passport-http-bearer').Strategy; // token验证模块
var session = require('express-session');
import { Nuxt, Builder } from 'nuxt'

var index = require('./api/index');
var users = require('./api/users');
var article = require('./api/article');

const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000

app.set('port', port)

app.use(session({
  secret: 'YYJ', // 用来对session id相关的cookie进行签名
  saveUninitialized: false, // 是否自动保存未初始化的会话，建议false
  resave: false // 是否每次都重新保存会话，建议false
}));
app.use(passport.initialize()); // 初始化passport模块
app.use(morgan('dev')); // 命令行中显示程序运行日志,便于bug调试
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // 调用bodyParser模块以便程序正确解析body传入值

// Import API Routes
app.use('/', index);
app.use('/users', users);
app.use('/article', article);

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

// Init Nuxt.js
const nuxt = new Nuxt(config)

// Build only in dev mode
if (config.dev) {
  const builder = new Builder(nuxt)
  builder.build()
}

// Give nuxt middleware to express
app.use(nuxt.render)

// Listen the server
app.listen(port, host)
console.log('Server listening on ' + host + ':' + port) // eslint-disable-line no-console