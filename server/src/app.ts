import Koa from 'koa'
import { koaBody } from 'koa-body'
import cors from 'koa-cors'
import router from './router'

const app = new Koa()

app.use(cors())
app.use(koaBody())

app.use(router.routes())

app.listen(3000)
