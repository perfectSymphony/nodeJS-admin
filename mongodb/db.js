'use strict';

// mongoose是nodeJS提供连接 mongodb的一个库
import mongoose from 'mongoose';
// config-lite 是一个轻量的读取配置文件的模块。
// config-lite 会根据环境变量（NODE_ENV）的不同从当前执行进程目录下的 config 目录加载不同的配置文件。
// 如果不设置 NODE_ENV，则读取默认的 default 配置文件，
// 如果设置了 NODE_ENV，则会合并指定的配置文件和 default 配置文件作为配置，
// config-lite 支持 .js、.json、.node、.yml、.yaml 后缀的文件。
import config from 'config-lite';
import chalk from 'chalk';

mongoose.connect(config.url, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }, function(err,db){})
// Use native promises
mongoose.Promise = global.Promise
const db = mongoose.connection;

db.once('open', () => {
  console.log(
      chalk.green('数据库连接成功')
  )
})

db.on('error', (error) => {
  console.error(
    chalk.red('Error in MongoDb connection:' + error)
  );
  mongoose.disconnect()
});

//auto_reconnect 当数据库连接异常中断时，是否自动重新连接？
db.on('close', () => {
  console.log(
    chalk.red('数据库断开，重新连接数据库')
  );
  mongoose.connect(config.url, {server: {
    auto_reconnect: true
  }});
});

export default db