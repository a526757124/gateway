<template>
  <div>
    <Card>
      <tables ref="tables" editable searchable btnAdd page v-model="tableData"
      :columns="columns"
      :totalData="totalData"
      :currentIndex="pageIndex"
      :pageSize="pageSize"
      :addBtnTitle="addBtnTitle"
      @on-add="handleAdd"
      @on-change="handlePageChange"
      @on-page-size-change='handlePageSizeChange'
      @on-delete="handleDelete"/>
    </Card>
    <Modal :title="modalTitle" :mask-closable="false" v-model="createModalShow" width="30">
           <Form ref="userInfo" :model="userInfo" :rules="userUpdateRuleValidate" :label-width="80">
                <FormItem label="昵称" prop="NickName">
                    <Input type="text" v-model="userInfo.NickName" placeholder="昵称..."></Input>
                </FormItem>
                <FormItem label="登录名" prop="LoginName">
                    <Input type="text" v-model="userInfo.LoginName" placeholder="登录名..."></Input>
                </FormItem>
                <FormItem label="登录密码" prop="LoginPwd" v-show="userInfo.ID==0">
                    <Input type="password" v-model="userInfo.LoginPwd" ></Input>
                </FormItem>
                <FormItem label="状态" prop="Status">
                    <Select v-model="userInfo.Status">
                        <Option v-for="item in statusList" :value="item.value" :key="item.value">{{item.label}}</Option>
                    </Select>
                </FormItem>

           </Form>
           <div slot="footer">
                <Button type="primary" @click="handleSubmit('userInfo')">提交</Button>
                <!-- <Button @click="handleReset('application')" style="margin-left: 8px">重置</Button> -->
                <Button @click="handleCancel()" style="margin-left: 8px">关闭</Button>
            </div>
    </Modal>
  </div>
</template>

<script>
import Tables from '_c/tables'
import { getList, add, update, del } from '@/api/user'
export default {
  name: 'user-table',
  components: {
    Tables
  },
  data () {
    return {
      addBtnTitle: '添加用户',
      columns: [
        {title: '昵称', key: 'NickName', sortable: true, isSearchable: true},
        {title: '登录名', key: 'LoginName'},
        {title: '状态',
          key: 'Status',
          render: (h, params) => {
            const row = params.row
            const color = row.Status === 1 ? 'blue' : row.Status === 0 ? 'green' : 'red'
            const text = row.Status === 1 ? '有效' : row.Status === 0 ? '初始化' : '无效'
            return h('Tag', {
              props: {
                type: 'dot',
                color: color
              },
              style: {
                padding: '6px 5px'
              }
            }, text)
          }
        },
        {
          title: '操作',
          align: 'center',
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
      statusList: [{value: 0, label: '初始化'}, {value: 1, label: '有效'}, {value: -1, label: '无效'}],
      tableData: [],
      createModalShow: false,
      modalTitle: '添加用户信息',
      userInfo: {
        ID: 0,
        NickName: '',
        LoginName: '',
        LoginPwd: '',
        Status: 0,
        CreateTime: 0
      },
      userRuleValidate: {
        NickName: [
          { required: true, message: '昵称不能为空！', trigger: 'blur' }
        ],
        LoginName: [
          { required: true, message: '请输入登录名！', trigger: 'blur' },
          { type: 'string', min: 3, message: '登录名不能小于3字！', trigger: 'blur' }
        ],
        LoginPwd: [
          { required: true, message: '请输入密码！', trigger: 'blur' },
          { type: 'string', min: 6, message: '密码不能小于6个字符！', trigger: 'blur' }
        ]
      },
      userUpdateRuleValidate: {
        NickName: [
          { required: true, message: '昵称不能为空！', trigger: 'blur' }
        ],
        LoginName: [
          { required: true, message: '请输入登录名！', trigger: 'blur' },
          { type: 'string', min: 3, message: '登录名不能小于3字！', trigger: 'blur' }
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
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (me.userInfo.ID > 0) {
            update(me.userInfo).then(res => {
              me.$Message.success('保存成功!')
              me.loadData()
              me.createModalShow = false
            })
          } else {
            add(me.userInfo).then(res => {
              me.$Message.success('保存成功!')
              me.loadData()
              me.createModalShow = false
            })
          }
        } else {
          me.$Message.error('保存失败!')
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
      getList(query).then(res => {
        if (res.success) {
          var data = res.data
          if (data.totalCount === 0) {
            this.tableData = []
            this.totalCount = 0
          } else {
            this.tableData = data.pageData
            this.totalData = data.totalCount
          }
        }
      })
    },
    handleAdd () {
      this.setModel(null)
      this.createModalShow = true
      this.modalTitle = '添加用户信息'
    },
    handleEdit (row) {
      this.setModel(row)
      this.createModalShow = true
      this.modalTitle = '编辑用户信息'
    },
    setModel (row) {
      if (row) {
        this.userInfo = {
          ID: row.ID,
          NickName: row.NickName,
          LoginName: row.LoginName,
          Status: row.Status
        }
      } else {
        this.userInfo = {
          ID: 0,
          NickName: '',
          LoginName: '',
          LoginPwd: '',
          Status: 0,
          CreateTime: 0
        }
      }
    },
    handleDelete (row) {
      var me = this
      me.setModel(row)
      del(me.userInfo).then(data => {
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
