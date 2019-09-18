import express from 'express';
import db from './mongodb/db.js';
import config from 'config-lite';
import session from 'express-session';
import connectMongo from 'connect-mongo';
import cookieParser from 'cookie-parser'; //方便操作客户端中的cookie值。
import history from 'connect-history-api-fallback';
import router from './routes/index'
import chalk from 'chalk';

const app = express();

// express 处理跨域问题
app.all('*', (req, res, next) => {
  const { origin, Origin, referer, Referer } = req.headers;

  const allowOrigin = origin || Origin || referer || Referer || '*';

  res.header('Access-Control-Allow-Origin', allowOrigin); //允许的域
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With'); //允许的header类型
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('X-Powered-By', 'Express');
  if(req.method == 'OPTIONS'){
    res.sendStatus(200)
  } else {
    next()
  }
})

// Express使用MongoDB存储session
const MongoStore = connectMongo(session); // 获取session储存插件
app.use(cookieParser());
app.use(session({
  name: config.session.name, 
  secret: config.session.secret, //加密字符串也可以写数组
  resave: false,    // 如果未修改则不会保存
  saveUninitialized: false, // 如果不保存则不会创建session
  cookie: config.session.cookie,
  rolling: true, //动态刷新页面cookie存放时间
  store: new MongoStore({ //将session存进数据库  用来解决负载均衡的问题
    url: config.url
  })
}))

router(app)

app.use(history());
app.use(express.static('./public'));
app.listen(config.port, () => {
  console.log(
    chalk.green(`成功监听端口: ${config.port}`)
  )
})