<template>
  <div>
    <Card>
      <tables ref="tables" editable searchable btnAdd  v-model="tableData"
      :columns="columns"
      :totalData="totalData"
      :currentIndex="pageIndex"
      :pageSize="pageSize"
      :addBtnTitle="addBtnTitle"
      :addBtnTo="addBtnTo"
      @on-add="handleAdd"
      @on-change="handlePageChange"
      @on-page-size-change='handlePageSizeChange'
      @on-delete="handleDelete"/>
    </Card>
    <Modal :title="modalTitle" :mask-closable="false" v-model="createModalShow" width="50">
           <Form ref="apiInfo" :model="apiInfo" :rules="apiRuleValidate" :label-width="80">
                <FormItem label="api名称" prop="Name">
                    <Input type="text" v-model="apiInfo.Name" placeholder="api名称..."></Input>
                </FormItem>
                <FormItem label="api描述" prop="Desc">
                    <Input type="textarea" :rows="4"  v-model="apiInfo.ApiDesc" placeholder="api描述..."></Input>
                </FormItem>
                <FormItem label="API请求路径" prop="ApiPath">
                    <Input type="text" v-model="apiInfo.ApiPath" placeholder="API请求路径..."></Input>
                </FormItem>
                <FormItem label="目标地址" prop="TargetApiUrl">
                    <Input v-model="apiInfo.TargetApiUrl" type="textarea" :rows="4" placeholder="目标地址..."></Input>
                </FormItem>
                <FormItem label="api状态" prop="Status">
                    <Select v-model="apiInfo.Status">
                        <Option v-for="item in statusList" :value="item.value" :key="item.value">{{item.label}}</Option>
                    </Select>
                </FormItem>
           </Form>
           <div slot="footer">
                <Button type="primary" @click="handleSubmit('apiInfo')">提交</Button>
                <!-- <Button @click="handleReset('application')" style="margin-left: 8px">重置</Button> -->
                <Button @click="handleCancel()" style="margin-left: 8px">关闭</Button>
            </div>
    </Modal>
  </div>
</template>

<script>
import Tables from '_c/tables'
import { getList } from '@/api/apiInfo'
export default {
  name: 'api-table',
  components: {
    Tables
  },
  data () {
    return {
      addBtnTo: 'api-create',
      addBtnTitle: '添加API',
      columns: [
        {title: '名称', key: 'Name', sortable: true, isSearchable: true},
        {title: '类型', key: 'Type', isSearchable: true},
        {title: '所属模块', key: 'GroupID', isSearchable: true},
        {title: '描述', key: 'Desc'},
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
      modalTitle: '添加API基本信息',
      apiInfo: {
        ID: 0,
        Name: '',
        Type: 0,
        Desc: '',
        GroupID: 0,
        DevUser: '', // 开发人员
        ServiceHostType: 0, // 服务Host类型
        ServiceDiscoveryName: '', // 服务发现注册的服务名
        ValidateType: 0, // 验证类型
        Version: '', // Api 版本
        ApiPath: '', // API请求路径
        SupportProtocol: 0, // 支持协议 1.http 2.rpc
        ReqMethod: 0, // 请求方式 http 协议支持1.get 2.post 3.put 4.delete rpc 协议支持 5.jsonrpc
        TargetApis: '', // 目标api服务 [{"TargetKey":"","TargetUrl":"","CallMethod":"","CallName":"","Weight":0,"Status":0,"Timeout":0}]
        IsUseMock: 0, // 是否启用Mock 0:不启用；1:启用
        MockData: '', // mock请求返回数据
        Status: 0, // 状态 0:是初始化 1:是有效 -1:是无效
        RawResponseFlag: 0, // 是否返回原始响应字符串  0:不返回；1:返回
        ResultType: 0, // 返回ContentType 1.json 2.文本 3.二进制 4.xml 5.html
        ResultSample: '', // 返回结果示例
        FailResultSample: '', // 失败返回结果示例
        CreateUser: 0, // 创建人
        CreateTime: 0// 创建时间

      },
      statusList: [{value: 0, label: '初始化'}, {value: 1, label: '有效'}, {value: -1, label: '无效'}],
      apiRuleValidate: {
        Name: [
          { required: true, message: 'api名称不能为空！', trigger: 'blur' }
        ],
        Desc: [
          { required: true, message: '请输入api简介！', trigger: 'blur' },
          { type: 'string', min: 20, message: 'api简介不能小于20字！', trigger: 'blur' }
        ]
      },
      totalData: 0,
      pageIndex: 1,
      pageSize: 10

    }
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success('保存成功!')
        } else {
          this.$Message.error('保存失败!')
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
      this.open(null)
      this.createModalShow = true
      this.modalTitle = '添加API基本信息'
    },
    handleEdit (row) {
      this.open(row)
      this.createModalShow = true
      this.modalTitle = '编辑API基本信息'
    },
    open (row) {
      me = this
      if (row) {
        var id = row.ID
        getAPIInfoById(id).then((data) => {
          me.apiInfo = data
        })
      } else {
        me.apiInfo = {
          ID: 0,
          Name: '',
          Type: 0,
          Desc: '',
          GroupID: 0,
          DevUser: '', // 开发人员
          ServiceHostType: 0, // 服务Host类型
          ServiceDiscoveryName: '', // 服务发现注册的服务名
          ValidateType: 0, // 验证类型
          Version: '', // Api 版本
          ApiPath: '', // API请求路径
          SupportProtocol: 0, // 支持协议 1.http 2.rpc
          ReqMethod: 0, // 请求方式 http 协议支持1.get 2.post 3.put 4.delete rpc 协议支持 5.jsonrpc
          TargetApis: '', // 目标api服务 [{"TargetKey":"","TargetUrl":"","CallMethod":"","CallName":"","Weight":0,"Status":0,"Timeout":0}]
          IsUseMock: 0, // 是否启用Mock 0:不启用；1:启用
          MockData: '', // mock请求返回数据
          Status: 0, // 状态 0:是初始化 1:是有效 -1:是无效
          RawResponseFlag: 0, // 是否返回原始响应字符串  0:不返回；1:返回
          ResultType: 0, // 返回ContentType 1.json 2.文本 3.二进制 4.xml 5.html
          ResultSample: '', // 返回结果示例
          FailResultSample: '', // 失败返回结果示例
          CreateUser: 0, // 创建人
          CreateTime: 0// 创建时间
        }
      }
    },
    handleDelete (params) {
      console.log(params)
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
