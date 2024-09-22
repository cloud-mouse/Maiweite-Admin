import Mock from 'mockjs'

export default [{
  url: '/mock/admin/home/getLineChartData',
  method: 'post',
  response: () => {
    return {
      code: 200,
      message: 'success',
      ok: true,
      data: Mock.mock({
        'total': 30,
        'records|30': () => {
          let category: any = []
          let dottedBase = +new Date() - 1000 * 3600 * 24 * 30
          for (let i = 0; i < 30; i++) {
            let date = new Date((dottedBase += 1000 * 3600 * 24))
            category.push({
              'count|1-999': 1,
              'date': [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('-'),
            })
          }
          return category
        },
      }),
    }
  },
}, {
  url: '/mock/admin/home/getBarChartData',
  method: 'post',
  response: () => {
    return {
      code: 200,
      message: 'success',
      ok: true,
      data: Mock.mock({
        'total': 30,
        'records|30': () => {
          let category: any = []
          let dottedBase = +new Date() - 1000 * 3600 * 24 * 30
          for (let i = 0; i < 30; i++) {
            let date = new Date((dottedBase += 1000 * 3600 * 24))
            category.push({
              'formNumber|1-20': 1,
              'messageNumber|1-20': 1,
              'missionNumber|1-20': 1,
              'paperworkNumber|1-20': 1,
              'date': [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('-'),
            })
          }
          return category
        },
      }),
    }
  },
}, {
  url: '/mock/admin/home/getUserSort',
  method: 'get',
  response: () => {
    return {
      code: 200,
      message: 'success',
      ok: true,
      data: Mock.mock({
        'total': 100,
        'records|10': [
          {
            'id|+1': 1,
            'name': '@cname',
            'sort|1-100': 1,
            'createTime': '@date(\'yyyy-MM-dd\')',
          },
        ],
      }),
    }
  },
}]
