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
           <Form ref="apiGroup" :model="apiGroup" :rules="groupRuleValidate" :label-width="80">
                <FormItem label="api名称" prop="Name">
                    <Input type="text" v-model="apiGroup.Name" placeholder="api分组名称..."></Input>
                </FormItem>
                <FormItem label="api描述" prop="Desc">
                    <Input type="textarea" :rows="4"  v-model="apiGroup.Desc" placeholder="api分组描述..."></Input>
                </FormItem>
           </Form>
           <div slot="footer">
                <Button type="primary" @click="handleSubmit('apiGroup')">提交</Button>
                <!-- <Button @click="handleReset('application')" style="margin-left: 8px">重置</Button> -->
                <Button @click="handleCancel()" style="margin-left: 8px">关闭</Button>
            </div>
    </Modal>
  </div>
</template>

<script>
import Tables from '_c/tables'
import { getList, add, update, del } from '@/api/api-group'
export default {
  name: 'api-group-table',
  components: {
    Tables
  },
  data () {
    return {
      addBtnTitle: '添加分组',
      columns: [
        {title: '名称', key: 'Name', sortable: true, isSearchable: true},
        {title: '描述', key: 'Desc'},
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
      tableData: [],
      createModalShow: false,
      modalTitle: '添加分组信息',
      apiGroup: {
        ID: 0,
        Name: '',
        Desc: '', // api所属模块
        CreateTime: 0
      },
      groupRuleValidate: {
        Name: [
          { required: true, message: '分组名称不能为空！', trigger: 'blur' }
        ],
        Desc: [
          { required: true, message: '请输入分组简介！', trigger: 'blur' },
          { type: 'string', min: 20, message: '分组简介不能小于20字！', trigger: 'blur' }
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
          if (me.apiGroup.ID > 0) {
            update(me.apiGroup).then(res => {
              me.$Message.success('保存成功!')
              me.loadData()
              me.createModalShow = false
            })
          } else {
            add(me.apiGroup).then(res => {
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
      this.setModel(null)
      this.createModalShow = true
      this.modalTitle = '添加分组信息'
    },
    handleEdit (row) {
      this.setModel(row)
      this.createModalShow = true
      this.modalTitle = '编辑分组信息'
    },
    setModel (row) {
      if (row) {
        this.apiGroup = {
          ID: row.ID,
          Name: row.Name,
          Desc: row.Desc
        }
      } else {
        this.apiGroup = {
          ID: 0,
          Name: '',
          Desc: ''
        }
      }
    },
    handleDelete (row) {
      var me = this
      me.setModel(row)
      del(me.apiGroup).then(res => {
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
