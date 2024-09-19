// mock/user.ts
import Mock from 'mockjs'

export default [
  // 用户登录接口
  {
    url: '/mock/user/login',
    method: 'post',
    response: ({ body }) => {
      console.log(body)

      return {
        error: '',
        code: 200,
        data: Mock.mock({
          account: body.account || 'admin',
          token: `${body.account}_@string`,
          avatar: 'https://pic1.zhimg.com/80/v2-e1427f6a21122ac163ff98d24f55d372_720w.webp',
        }),
      }
    },
  },
]
