const Koa = require('koa');
const app = new Koa();

app.use(async ctx => {
  ctx.body = 'Hello World';
});

app.listen(process.env.port || 3000);
console.log('*Server is running at localhost:3000')