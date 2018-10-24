<template>
  <div>
    <Card>
      <tables ref="tables" editable searchable btnAdd page  v-model="tableData"
      :columns="columns"
      :totalData="totalData"
      :currentIndex="pageIndex"
      :pageSize="pageSize"
      @on-add="handleAdd"
      @on-change="handlePageChange"
      @on-page-size-change='handlePageSizeChange'
      @on-delete="handleDelete"/>
    </Card>
    <Modal :title="modalTitle" :mask-closable="false" v-model="createModalShow" width="50">
           <Form ref="appInfo" :model="appInfo" :rules="appInfoRuleValidate" :label-width="80">
                <FormItem label="应用名称" prop="Name">
                    <Input type="text" v-model="appInfo.Name" placeholder="应用名称..."></Input>
                </FormItem>
                <FormItem label="应用描述" prop="Desc">
                    <Input type="textarea" :rows="4"  v-model="appInfo.Desc" placeholder="应用描述..."></Input>
                </FormItem>
                <FormItem label="应用地址" prop="Url">
                    <Input type="text" v-model="appInfo.Url" placeholder="应用地址..."></Input>
                </FormItem>
                <FormItem label="服务器IP" prop="IPList">
                    <Input v-model="appInfo.IPList" type="textarea" :rows="4" placeholder="服务器IP..."></Input>
                </FormItem>
                <FormItem label="开发人员" prop="DevUser">
                    <Input v-model="appInfo.DevUser" placeholder="开发人员..."></Input>
                </FormItem>
                <FormItem label="产品人员" prop="ProductUser">
                    <Input v-model="appInfo.ProductUser" placeholder="产品人员..."></Input>
                </FormItem>
                <FormItem label="开通状态" prop="Status">
                    <Select v-model="appInfo.Status">
                        <Option v-for="item in statusList" :value="item.value" :key="item.value">{{item.label}}</Option>
                    </Select>
                </FormItem>
           </Form>
           <div slot="footer">
                <Button type="primary" @click="handleSubmit('appInfo')">提交</Button>
                <!-- <Button @click="handleReset('appInfo')" style="margin-left: 8px">重置</Button> -->
                <Button @click="handleCancel()" style="margin-left: 8px">关闭</Button>
            </div>
    </Modal>
  </div>
</template>

<script>
import Tables from '_c/tables'
import { getList, add, update, del } from '@/api/appInfo'
export default {
  name: 'applicaton-table',
  components: {
    Tables
  },
  data () {
    return {
      columns: [
        {title: '应用名称', key: 'Name', sortable: true, isSearchable: true},
        {title: '应用描述', key: 'Desc', isSearchable: true},
        {title: '状态',
          key: 'Status',
          render: (h, params) => {
            const row = params.row
            const color = row.Status === 1 ? 'blue' : row.Status === 0 ? 'green' : 'red'
            const text = row.Status === 1 ? '有效' : row.Status === 0 ? '初始化' : '无效'
            return h('span', {
              props: {

              },
              style: {
                color: color

              }
            }, text)
          }
        },
        {title: '创建时间', key: 'CreateDate'},
        {
          title: '操作',
          // align: 'center',
          key: 'handle',
          // options: ['delete'],
          button: [
            (h, params, vm) => {
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
                      // var i=params;
                      this.handleEdit(this.tableData[params.index])
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
                      this.handleDelete(this.tableData[params.index])
                    }
                  }
                }, '删除')
              ])
            }
          ]
        }
      ],
      tableData: [],
      createModalShow: false,
      modalTitle: '添加应用',
      appInfo: {
        ID: 0, //
        Name: '', // 应用名称
        Desc: '', // 应用简介
        Key: '', // appkey
        Url: '', // 应用地址
        IPList: '', // 服务器IP
        DevUser: '', // 开发人员
        ProductUser: '', // 产品人员
        CreateTime: 0,
        CreateUser: 0,
        Status: 0// 状态
      },
      statusList: [{value: 0, label: '初始化'}, {value: 1, label: '有效'}, {value: -1, label: '无效'}],
      appInfoRuleValidate: {
        Name: [
          { required: true, message: '应用名称不能为空！', trigger: 'blur' }
        ],
        Desc: [
          { required: true, message: '请输入应用简介！', trigger: 'blur' },
          { type: 'string', min: 20, message: '应用简介不能小于20字！', trigger: 'blur' }
        ],
        Url: [
          { required: true, type: 'url', min: 1, message: '请输入正确的url应用地址', trigger: 'change' }
        ]
      },
      totalData: 0,
      pageIndex: 1,
      pageSize: 10

    }
  },
  methods: {
    handleSubmit (name) {
      var me = this
      var data = this.appInfo
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (data.ID > 0) {
            update(data).then(res => {
              me.$Message.success('Success!')
              me.loadData()
              this.createModalShow = false
            })
          } else {
            add(data).then(res => {
              me.$Message.success('Success!')
              me.loadData()
              this.createModalShow = false
            })
          }
        } else {
          this.$Message.error('Fail!')
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields()
    },
    handleCancel () {
      this.createModalShow = false
    },
    init () {
      this.loadData()
    },
    loadData () {
      var query = {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      }
      getList(query).then(data => {
        if (data.totalCount === 0) {
          this.tableData = []
          this.totalCount = 0
        } else {
          this.tableData = data.pageData
          this.totalData = data.totalCount
        }
      })
    },
    handleAdd () {
      this.setApp(null)
      this.createModalShow = true
      this.modalTitle = '添加应用'
    },
    handleEdit (row) {
      this.setApp(row)
      this.createModalShow = true
      this.modalTitle = '编辑应用'
    },
    setApp (row) {
      if (row) {
        this.appInfo = {
          ID: row.ID,
          Name: row.Name,
          Desc: row.Desc,
          Key: row.Key,
          Url: row.Url,
          IPList: row.IPList,
          DevUser: row.DevUser,
          ProductUser: row.ProductUser,
          Status: row.Status
        }
      } else {
        this.appInfo = {
          ID: 0, //
          Name: '', // 应用名称
          Desc: '', // 应用简介
          Key: '', // appkey
          Url: '', // 应用地址
          IPList: '', // 服务器IP
          DevUser: '', // 开发人员
          ProductUser: '', // 产品人员
          CreateDate: '',
          Status: 0// 状态
        }
      }
    },
    handleDelete (row) {
      var me = this
      me.setApp(row)
      del(me.appInfo).then(res => {
        me.$Message.success('删除成功!')
        me.loadData()
      })
    },
    handlePageChange (index) {
      this.pageIndex = index
      this.loadData()
    },
    handlePageSizeChange (size) {
      this.pageSize = size
      this.loadData()
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style>

</style>
