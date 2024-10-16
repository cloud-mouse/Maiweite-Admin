// src/mock/user.ts
import Mock from 'mockjs'

let user_default = [
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
export {
  user_default as default,
}
// # sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3JjL21vY2svdXNlci50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX19pbmplY3RlZF9maWxlbmFtZV9fID0gXCJFOlxcXFx6aGFuZ2hhb1xcXFxNYWl3ZWl0ZS1BZG1pblxcXFxzcmNcXFxcbW9ja1xcXFx1c2VyLnRzXCI7Y29uc3QgX19pbmplY3RlZF9kaXJuYW1lX18gPSBcIkU6XFxcXHpoYW5naGFvXFxcXE1haXdlaXRlLUFkbWluXFxcXHNyY1xcXFxtb2NrXCI7Y29uc3QgX19pbmplY3RlZF9pbXBvcnRfbWV0YV91cmxfXyA9IFwiZmlsZTovLy9FOi96aGFuZ2hhby9NYWl3ZWl0ZS1BZG1pbi9zcmMvbW9jay91c2VyLnRzXCI7Ly8gbW9jay91c2VyLnRzXHJcbmltcG9ydCBNb2NrIGZyb20gJ21vY2tqcydcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFtcclxuICAvLyBcdTc1MjhcdTYyMzdcdTc2N0JcdTVGNTVcdTYzQTVcdTUzRTNcclxuICB7XHJcbiAgICB1cmw6ICcvbW9jay91c2VyL2xvZ2luJyxcclxuICAgIG1ldGhvZDogJ3Bvc3QnLFxyXG4gICAgcmVzcG9uc2U6ICh7IGJvZHkgfSkgPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZyhib2R5KVxyXG5cclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBlcnJvcjogJycsXHJcbiAgICAgICAgY29kZTogMjAwLFxyXG4gICAgICAgIGRhdGE6IE1vY2subW9jayh7XHJcbiAgICAgICAgICBhY2NvdW50OiBib2R5LmFjY291bnQgfHwgJ2FkbWluJyxcclxuICAgICAgICAgIHRva2VuOiBgJHtib2R5LmFjY291bnR9X0BzdHJpbmdgLFxyXG4gICAgICAgICAgYXZhdGFyOiAnaHR0cHM6Ly9waWMxLnpoaW1nLmNvbS84MC92Mi1lMTQyN2Y2YTIxMTIyYWMxNjNmZjk4ZDI0ZjU1ZDM3Ml83MjB3LndlYnAnLFxyXG4gICAgICAgIH0pLFxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gIH0sXHJcbl1cclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUNBLE9BQU8sVUFBVTtBQUVqQixJQUFPLGVBQVE7QUFBQTtBQUFBLEVBRWI7QUFBQSxJQUNFLEtBQUs7QUFBQSxJQUNMLFFBQVE7QUFBQSxJQUNSLFVBQVUsQ0FBQyxFQUFFLEtBQUssTUFBTTtBQUN0QixjQUFRLElBQUksSUFBSTtBQUVoQixhQUFPO0FBQUEsUUFDTCxPQUFPO0FBQUEsUUFDUCxNQUFNO0FBQUEsUUFDTixNQUFNLEtBQUssS0FBSztBQUFBLFVBQ2QsU0FBUyxLQUFLLFdBQVc7QUFBQSxVQUN6QixPQUFPLEdBQUcsS0FBSyxPQUFPO0FBQUEsVUFDdEIsUUFBUTtBQUFBLFFBQ1YsQ0FBQztBQUFBLE1BQ0g7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGOyIsCiAgIm5hbWVzIjogW10KfQo=
