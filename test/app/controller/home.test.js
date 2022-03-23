'use strict'

const { app, assert } = require('egg-mock/bootstrap')

describe('test/app/controller/home.test.js', () => {
  it('should assert', function* () {
    const pkg = require('../../../package.json')
    assert(app.config.keys.startsWith(pkg.name))

    // const ctx = app.mockContext({});
    // yield ctx.service.xx();
  })

  it('should GET /', () => {
    return app
      .httpRequest()
      .get('/')
      .expect('哈喽，我是egg-graphql项目例子')
      .expect(200)
  })

  it('测试graphql的user', async () => {
    console.log('执行到这里了')

    const resp = await app
      .httpRequest()
      .get(
        '/graphql?query=query+user($id:ID!){user(id:$id){ id name password foods{id address} }}&variables={"id":1}'
      )
      .expect(200)

    assert.deepEqual(resp.body.data, {
      user: {
        id: '1',
        name: '小新',
        password: '121312312',
        foods: [
          {
            id: '1',
            address: '山西'
          },
          {
            id: '2',
            address: '上海闵行'
          },
          {
            id: '3',
            address: null
          },
          {
            id: '4',
            address: null
          },
          {
            id: '5',
            address: '西安'
          },
          {
            id: '6',
            address: '山西'
          },
          {
            id: '7',
            address: null
          },
          {
            id: '9',
            address: null
          }
        ]
      }
    })
    // assert.deepEqual(resp.body.data, {})
  })

  it('graphql foods', async () => {
    console.log('执行到这里了')

    const resp = await app
      .httpRequest()
      .get(
        '/graphql?query=query+foods($page:Int!,$per_page:Int!){foods(page:$page,per_page:$per_page){id}}&variables={"page":1,"per_page":1}'
      )
      .expect(200)

    assert.deepEqual(resp.body.data, {
      foods: [
        {
          id: '1'
        }
      ]
    })
    // assert.deepEqual(resp.body.data, {})
  })
})
