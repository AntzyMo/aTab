interface bodyRes<T> {
  data?: T
  msg?: string
}

export const successRes = <T>(data: T, msg = '请求成功') => {
  return {
    code: 200,
    data,
    msg
  }
}

export const errorRes = <T>(options: bodyRes<T>) => {
  return {
    code: 500,
    ...options
  }
}
