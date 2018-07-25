<template>
    <div style="margin: 5px">
        <Row style="margin:10px 10px;">
            <Col span="16">
                <Input v-model="search.name" placeholder="请输入应用名搜搜..." style="width: 200px" />
                <span @click="handleSearch" style="margin: 0 10px;"><Button type="primary" icon="search">搜索</Button></span>
                <Button @click="handleCancel" type="ghost" >取消</Button>
            </Col>
            <Col span="7" style="text-align:right;" >
                <Button @click="handleAdd" type="primary">新增应用</Button>
            </Col>
        </Row>
        <Row>
            <Col span="24">
            <PageTable :current="current" :columns="tableColumns" :data="tableData" :total="tableTotal" :pageSize="pageSize"></PageTable>
            </Col>
        </Row>

        <Modal
            v-model="modal1"
            title="应用详细"
            @on-ok="ok"
            @on-cancel="cancel">
            <p>
                <Row>
                    <Col span="12">应用名称:</Col>
                    <Col span="12"><Input v-model="application.name" placeholder="应用名称..." ></Input></Col>
                </Row>
                <Row>
                    <Col span="12">状态:</Col>
                    <Col span="12">

                            <i-switch size="large" v-model="application.status">
                                <span slot="open">开启</span>
                                <span slot="close">关闭</span>
                            </i-switch>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">应用描述	:</Col>
                    <Col span="12">
                        <Input v-model="application.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="应用描述..."></Input>
                    </Col>
                </Row>
            </p>
        </Modal>
    </div>

</template>

<script>
import PageTable from '_c/pageTable'
export default {
  components: {
    PageTable
  },
  data () {
    return {
      modal1: false,
      tableColumns: [
        {
          title: '应用名称',
          key: 'name',
          editable: true
        },
        {
          title: '应用描述',
          key: 'desc',
          editable: true
        },
        {
          title: '状态',
          key: 'status',
          render: (h, params) => {
            const row = params.row
            const color = row.status === 1 ? 'blue' : row.status === 2 ? 'green' : 'red'
            const text = row.status === 1 ? '构建中' : row.status === 2 ? '构建完成' : '构建失败'

            return h('Tag', {
              props: {
                type: 'dot',
                color: color
              }
            }, text)
          }
        },
        {
          title: '画像内容',
          key: 'portrayal',
          render: (h, params) => {
            return h('Poptip', {
              props: {
                trigger: 'hover',
                title: params.row.portrayal.length + '个画像',
                placement: 'bottom'
              }
            }, [
              h('Tag', params.row.portrayal.length),
              h('div', {
                slot: 'content'
              }, [
                h('ul', this.tableData[params.index].portrayal.map(item => {
                  return h('li', {
                    style: {
                      textAlign: 'center',
                      padding: '4px'
                    }
                  }, item)
                }))
              ])
            ])
          }
        },
        {
          title: '选定人群数',
          key: 'people',
          render: (h, params) => {
            return h('Poptip', {
              props: {
                trigger: 'hover',
                title: params.row.people.length + '个客群',
                placement: 'bottom'
              }
            }, [
              h('Tag', params.row.people.length),
              h('div', {
                slot: 'content'
              }, [
                h('ul', this.tableData[params.index].people.map(item => {
                  return h('li', {
                    style: {
                      textAlign: 'center',
                      padding: '4px'
                    }
                  }, item.n + '：' + item.c + '人')
                }))
              ])
            ])
          }

        },
        {
          title: '取样时段',
          key: 'time',
          render: (h, params) => {
            return h('div', '近' + params.row.time + '天')
          }
        },
        {
          title: '创建时间',
          key: 'createDate',
          render: (h, params) => {
            return h('div', this.formatDate(this.tableData[params.index].createDate))
          }
        },
        {
          title: '操作',
          align: 'center',
          // width: 190,
          key: 'action',
          render: (h, currentRow) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  loading: false
                },
                style: {
                  margin: '0 5px'
                },
                on: {
                  'click': (data) => {
                    this.open(this.tableData[currentRow.index])
                  }
                }
              }, '编辑'),
              h('Button', {
                props: {
                  type: 'success',
                  loading: false
                },
                style: {
                  margin: '0 5px'
                },
                on: {
                  'click': (data) => {

                  }
                }
              }, '删除')
            ])
          }
        }
      ],
      ajaxData: [],
      tableData: [],
      tableTotal: 0,
      pageSize: 10,
      current: 1,
      search: {
        name: ''
      },
      application: {
        name: '',
        desc: '',
        status: 0
      }
    }
  },
  methods: {
    init () {
      this.initTableData()
      this.initTable()
    },
    initTable () {
      // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
      if (this.tableTotal < this.pageSize) {
        this.tableData = this.ajaxData
      } else {
        this.tableData = this.ajaxData.slice(0, this.pageSize)
      }
    },
    initTableData () {
      let data = []
      for (let i = 0; i < 35; i++) {
        var temp = Math.floor(Math.random() * 100 + 1)
        data.push({
          name: '应用' + temp,
          desc: '应用' + temp + '描述',
          status: Math.floor(Math.random() * 3 + 1),
          portrayal: ['城市渗透', '人群迁移', '消费指数', '生活指数', '娱乐指数'],
          people: [
            {
              n: '客群' + Math.floor(Math.random() * 100 + 1),
              c: Math.floor(Math.random() * 1000000 + 100000)
            },
            {
              n: '客群' + Math.floor(Math.random() * 100 + 1),
              c: Math.floor(Math.random() * 1000000 + 100000)
            },
            {
              n: '客群' + Math.floor(Math.random() * 100 + 1),
              c: Math.floor(Math.random() * 1000000 + 100000)
            }
          ],
          time: Math.floor(Math.random() * 7 + 1),
          createDate: new Date()

        })
      }
      this.ajaxData = data
      this.tableTotal = this.ajaxData.length
    },
    formatDate (date) {
      const y = date.getFullYear()
      let m = date.getMonth() + 1
      m = m < 10 ? '0' + m : m
      let d = date.getDate()
      d = d < 10 ? ('0' + d) : d
      return y + '-' + m + '-' + d
    },
    handleSearch () {

    },
    handleCancel () {

    },
    handleAdd () {
      debugger
      this.open()
    },
    open (row) {
      if (row) {
        this.application = {
          name: row.name,
          desc: row.desc,
          status: true
        }
      } else {
        this.application = {
          name: '',
          desc: '',
          status: ''
        }
      }
      this.modal1 = true
    },
    ok () {
      this.$Message.info('Clicked ok')
    },
    cancel () {
      this.$Message.info('Clicked cancel')
    }

  },
  mounted () {
    this.init()
  }
}
</script>
