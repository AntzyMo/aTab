import type { Middleware } from 'koa'

export const handleError: Middleware = async (ctx, next) => {
  try {
    const data = await next()
    ctx.body = {
      code: 200,
      data,
      msg: '请求成功'
    }
  } catch (error) {
    console.log('error', error)
    ctx.body = {
      code: 500,
      data: null,
      msg: error.message
    }
  }
}
