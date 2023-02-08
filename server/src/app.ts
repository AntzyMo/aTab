import Koa from 'koa'
import { koaBody } from 'koa-body'
import cors from 'koa-cors'

import { handleError } from './middleware'
import router from './router'
const app = new Koa()

app.use(cors())
app.use(koaBody())

app.use(handleError)

app.use(router.routes())

app.on('error', err => {
  console.log('err', err)
})

app.listen(3001, () => {
  console.log('服务已启动')
})
