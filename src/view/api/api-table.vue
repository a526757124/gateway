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
    <Modal :title="modalTitle" :mask-closable="false" v-model="createModalShow" width="50" :z-index="0">
        <div>
          <Row>
            <Col :xs="24" >
            <Card>
                  <Steps :current="stepIndex" size="small" style="padding-left: 70px;padding-bottom: 10px;text-align: left">
                  <Step title="基本信息"></Step>
                  <Step title="定义API请求"></Step>
                  <Step title="定义API后端服务"></Step>
                </Steps>
            </Card>
            </Col>
          </Row>
          <Row>
              <Col :xs="24">
                  <Card title="基本信息" v-show="stepIndex===0">
                    <Form ref="apiInfoStep1" class="steps" :model="apiInfo" :rules="apiInfoStep1Validate" :label-width="180">
                        <Form-item label="API名称" prop="Name" >
                            <Row>
                                <Col span="18">
                                  <Input v-model="apiInfo.Name" placeholder="API名称..."></Input>
                                </Col>
                            </Row>
                        </Form-item>
                        <Form-item label="API简介" prop="Desc">
                            <Row>
                                <Col span="18">
                                  <Input type="textarea" v-model="apiInfo.Desc" placeholder="API简介..."></Input>
                                </Col>
                            </Row>
                        </Form-item>
                        <Form-item label="所属应用" prop="BelongApps">
                            <Row>
                                <Col span="18">
                                <Select v-model="apiInfo.BelongApps"
                                  multiple
                                  :loading="appInfoLoading">
                              <Option v-for="(option,index) in appInfoOption" :value="option.value" :key="index">{{ option.label }}</Option>
                          </Select>
                                </Col>
                            </Row>
                        </Form-item>
                        <Form-item label="所属分组" prop="GroupID">
                            <Row>
                                <Col span="18">
                                <Select v-model="apiInfo.GroupID"
                                :loading="groupLoading">
                                    <Option v-for="(option,index) in groupOption" :value="option.value" :key="index">{{ option.label }}</Option>
                                </Select>
                                </Col>
                                <Col>

                                </Col>
                            </Row>
                        </Form-item>
                        <Form-item label="验证类型" prop="ValidateType">
                            <Row>
                                <Col span="18">
                                <Select v-model="apiInfo.ValidateType" >
                                  <Option v-for="(option,index) in validateTypeOption" :value="option.value" :key="index">{{ option.label }}</Option>
                                </Select>
                                </Col>
                            </Row>
                        </Form-item>
                        <Form-item label="开发人员" prop="DevUser">
                            <Row>
                                <Col span="18">
                                <Input v-model="apiInfo.DevUser" placeholder="开发人员..."></Input>
                                </Col>
                            </Row>
                        </Form-item>
                        <Form-item label="API状态" prop="Status">
                            <Row>
                                <Col span="18">
                                <Select v-model="apiInfo.Status" >
                                    <Option v-for="item in statusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                                </Col>
                            </Row>
                        </Form-item>
                        <Form-item label="是否返回原始响应字符串" prop="RawResponseFlag">
                            <Row>
                                <Col span="18">
                                  <i-Switch v-model="apiInfo.RawResponseFlag" :true-value="1" :false-value="0">
                                    <span slot="open">是</span>
                                    <span slot="close">否</span>
                                  </i-Switch>
                                </Col>
                            </Row>
                        </Form-item>
                    </Form>
                  </Card>
                  <Card title="定义API请求" v-show="stepIndex===1">
                    <Form ref="apiInfoStep2" class="steps" :model="apiInfo" :rules="apiInfoStep2Validate" :label-width="180">
                          <Form-item label="服务Host类型" prop="ServiceHostType">
                              <Row>
                                  <Col span="18">
                                      <Select v-model="apiInfo.ServiceHostType" >
                                        <Option v-for="item in serviceHostTypeOption" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                      </Select>
                                  </Col>
                              </Row>
                          </Form-item>
                          <Form-item label="服务注册名称" prop="ServiceDiscoveryName">
                              <Row>
                                  <Col span="18">
                                  <Input v-model="apiInfo.ServiceDiscoveryName" placeholder="服务注册名称..."></Input>
                                  </Col>
                              </Row>
                          </Form-item>
                          <Form-item label="请求路径" prop="ApiPath">
                              <Row>
                                  <Col span="18">
                                  <Input v-model="apiInfo.ApiPath" placeholder="请求路径..."></Input>
                                  </Col>
                              </Row>
                          </Form-item>
                          <Form-item label="支持协议" prop="SupportProtocol">
                              <Row>
                                  <Col span="18">
                                      <Select v-model="apiInfo.SupportProtocol"   @on-change="handleSupportProtocolChange">
                                        <Option v-for="item in supportProtocolOption" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                      </Select>
                                  </Col>
                              </Row>
                          </Form-item>
                          <Form-item label="请求方式" prop="ReqMethod">
                              <Row>
                                  <Col span="18">
                                      <Select v-model="apiInfo.ReqMethod">
                                          <Option v-for="item in ReqMethodOption" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                      </Select>
                                  </Col>
                              </Row>
                          </Form-item>
                          <Form-item label="是否启用Mock" prop="IsUseMock">
                              <Row>
                                  <Col span="18">
                                      <i-Switch size="large" v-model="apiInfo.IsUseMock"  :true-value="1" :false-value="0">
                                          <span slot="open" >启用</span>
                                          <span slot="close">关闭</span>
                                      </i-Switch>
                                  </Col>
                              </Row>
                          </Form-item>
                          <Form-item label="Mock请求返回数据" prop="MockData" v-show="apiInfo.IsUseMock===1">
                              <Row>
                                  <Col span="18">
                                      <Input type="textarea" v-model="apiInfo.MockData" :rows="2"></Input>
                                  </Col>
                              </Row>
                          </Form-item>
                    </Form>
                  </Card>
                  <Card title="定义API后端服务" v-show="stepIndex===2">
                    <Form ref="apiInfoStep3" class="steps" :model="apiInfo" :rules="apiInfoStep3Validate" :label-width="100">
                          <Form-item label="接口类型" prop="Type">
                              <Row>
                                  <Col span="8">
                                      <Select v-model="apiInfo.Type" filterable >
                                          <Option v-for="item in typeOption" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                      </Select>
                                  </Col>
                              </Row>
                          </Form-item>
                          <Form-item label="服务地址" prop="TargetApis">
                              <Row>
                                  <Col span="22">
                                      <Table ref="tables" :data="targetApiTableData" :columns="targetApiColumns"/>
                                      <Button type="primary" @click="handleAddTargetApiInfo()">添加服务地址</Button>
                                  </Col>
                              </Row>
                          </Form-item>
                    </Form>
                  </Card>

              </Col>
          </Row>
        </div>
        <div slot="footer" style="text-align:center">
          <Button @click="prevStep('apiInfo')"  :loading="loading" v-show="stepIndex>0">上一步</Button>
          <Button type="primary" @click="nextStep('apiInfo')"  :loading="loading" v-show="stepIndex<2">下一步</Button>
          <Button type="primary" @click="handleSubmit('apiInfo')"  v-show="stepIndex===2" :loading="loading">保 存</Button>
          <Button  @click="cancelApiInfo('targetApiInfo')">关 闭</Button>
        </div>
    </Modal>
    <Modal title="服务地址" :mask-closable="false" v-model="modalShow" width="30" :z-index="100">
          <Form ref="targetApiInfo" :model="targetApiInfo" :label-width="120">
                <Form-item label="服务地址" prop="TargetUrl">
                    <Row>
                        <Col span="18">
                        <Input v-model="targetApiInfo.TargetUrl" placeholder="服务地址..."></Input>
                        </Col>
                    </Row>
                </Form-item>
                <Form-item label="调用方式" prop="CallMethod">
                    <Row>
                        <Col span="18">
                        <Select v-model="targetApiInfo.CallMethod" >
                          <Option v-for="item in targetApiInfoCallMethodOption" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                        </Col>
                    </Row>
                </Form-item>
                <Form-item label="调用方法" prop="CallName" v-show="targetApiInfo.CallMethod===5">
                    <Row>
                        <Col span="18">
                        <Input v-model="targetApiInfo.CallName" placeholder="调用方法..."></Input>
                        </Col>
                    </Row>
                </Form-item>
                <Form-item label="权重" prop="Weight">
                    <Row>
                        <Col span="18">
                        <Input v-model="targetApiInfo.Weight" placeholder="权重..."></Input>
                        </Col>
                    </Row>
                </Form-item>
          </Form>
          <div slot="footer">
                <Button type="primary" @click="savetargetApiInfo('targetApiInfo')">保 存</Button>
                <!-- <Button @click="handleReset('application')" style="margin-left: 8px">重置</Button> -->
                <Button style="margin-left: 8px" @click="cancelTargetApiInfo('targetApiInfo')">关 闭</Button>
          </div>
    </Modal>
  </div>
</template>

<script>
import Tables from '_c/tables'
import { Message } from 'iview'
import { getTop10ByKey } from '@/api/api-group'
import { getAppInfoSelectDataByKey } from '@/api/appInfo'
import { add, update, del, getList, getAPIInfoById } from '@/api/apiInfo'
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
        {title: '类型',
          key: 'Type',

          render: (h, params) => {
            const row = params.row
            var text = ''
            this.typeOption.map(m => {
              if (m.value === row.Type) {
                text = m.label
              }
            })
            return h('span', {}, text)
          }
        },
        {title: '开发人员', key: 'DevUser'},
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
      modalTitle: '添加API基本信息',
      apiInfo: {
        ID: 0,
        Name: '',
        Type: 0,
        Desc: '',
        BelongApps: [],
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
        IsUseMock: false, // 是否启用Mock 0:不启用；1:启用
        MockData: '', // mock请求返回数据
        Status: 0, // 状态 0:是初始化 1:是有效 -1:是无效
        RawResponseFlag: false, // 是否返回原始响应字符串  0:不返回；1:返回
        ResultType: 0, // 返回ContentType 1.json 2.文本 3.二进制 4.xml 5.html
        ResultSample: '', // 返回结果示例
        FailResultSample: '', // 失败返回结果示例
        CreateUser: 0, // 创建人
        CreateTime: 0// 创建时间

      },
      apiInfoStep1Validate: {
        Name: [
          { required: true, message: 'api名称不能为空！', trigger: 'blur' }
        ],
        Desc: [
          { required: true, message: '请输入api简介！', trigger: 'blur' },
          { type: 'string', min: 10, message: 'api简介不能小于10字！', trigger: 'blur' }
        ]
      },
      apiInfoStep2Validate: {
        ServiceDiscoveryName: [
          { required: true, message: '服务发现注册的服务名不能为空！', trigger: 'blur' }
        ],
        ApiPath: [
          { required: true, message: '请求路径不能为空！', trigger: 'blur' }
        ]
      },
      apiInfoStep3Validate: {
        Type: [
          { required: true, message: '接口类型不能为空！', trigger: 'blur' }
        ]
      },

      totalData: 0,
      pageIndex: 1,
      pageSize: 10,

      statusList: [{value: 0, label: '初始化'}, {value: 1, label: '有效'}, {value: -1, label: '无效'}],
      validateTypeOption: [{value: 1, label: 'MD5校验'}, {value: 0, label: '无校验'}],
      serviceHostTypeOption: [{value: 1, label: '手动注册'}, {value: 2, label: '自发现'}],
      supportProtocolOption: [{value: 1, label: 'HTTP协议'}, {value: 2, label: 'RPC协议'}],
      targetApiInfoCallMethodOption: [{value: 1, label: 'HttpGet'}, {value: 2, label: 'HttpPost'}, {value: 3, label: 'HttpPut'}, {value: 4, label: 'HttpDelete'}, {value: 5, label: 'JsonRPC'}],
      typeOption: [{value: 1, label: '组合'}, {value: 2, label: '负载'}],
      stepIndex: 0,
      token: true,
      loading: false,
      groupLoading: false,
      groupOption: [],
      appInfoLoading: false,
      appInfoOption: [],
      ReqMethodOption: [{value: 1, label: 'HttpGet'}, {value: 2, label: 'HttpPost'}, {value: 3, label: 'HttpPut'}, {value: 4, label: 'HttpDelete'}, {value: 5, label: 'JsonRPC'}],
      modalShow: false,
      callNameShow: false,
      mockDataShow: false,
      targetApiInfo: {
        ID: 0,
        TargetKey: '',
        TargetUrl: '',
        CallName: '',
        CallMethod: 0,
        Weight: '',
        Timeout: 0,
        Status: 0
      },
      targetApiColumns: [
        {title: '服务地址', key: 'TargetUrl'},
        { title: '调用方式',
          key: 'CallMethod',
          width: 100,
          render: (h, params) => {
            const row = params.row
            const v = row.CallMethod
            var text = ''
            this.targetApiInfoCallMethodOption.map(function (item, index) {
              if (item.value === v) {
                text = item.label
              }
            })
            return h('span', {
              props: {
              },
              style: {
              }
            }, text)
          }
        },
        {title: '调用方法', key: 'CallName', width: 100},
        {title: '权重', key: 'Weight', width: 60},
        {title: '操作',
          width: 100,
          key: 'handle',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('a', {
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.handleEditTargetApiInfo(this.targetApiTableData[params.index])
                  }
                }
              }, '编辑'),
              h('a', {
                on: {
                  click: () => {
                    this.handleDelTargetApiInfo(this.targetApiTableData[params.index])
                  }
                }
              }, '删除')
            ])
          }
        }
      ],
      targetApiTableData: []
    }
  },
  methods: {
    handleReset (name) {
      this.$refs[name].resetFields()
    },
    handleCancel () {
      this.createModalShow = false
    },
    init () {
      this.loadData()
      this.groupRemoteLoad('')
      this.loadAppInfoOption('')
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
      var me = this
      me.stepIndex = 0
      if (row) {
        var id = row.ID
        getAPIInfoById({ID: id}).then((res) => {
          if (res.success) {
            var data = res.data
            me.apiInfo = data
            me.targetApiTableData = JSON.parse(data.TargetApis)
            for (var i = 0; i < me.targetApiTableData.length; i++) {
              me.targetApiTableData[i].ID = (i + 1)
            }
          }
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
        me.targetApiTableData = []
        me.targetApiInfo = {
          ID: 0,
          TargetKey: '',
          TargetUrl: '',
          CallName: '',
          CallMethod: 0,
          Weight: '',
          Timeout: 0,
          Status: 0
        }
      }
    },
    handleDelete (row) {
      var me = this
      me.loading = true
      del({ID: row.ID}).then(res => {
        if (res.success) {
          me.loading = false
          me.loadData()
          Message.success('删除成功！')
        }
      })
    },
    handlePageChange (index) {
      this.pageIndex = index
      this.loadData()
    },
    handlePageSizeChange (size) {
      this.pageSize = size
      this.loadData()
    },
    groupRemoteLoad (query) {
      var me = this
      me.groupLoading = true
      getTop10ByKey(query).then(res => {
        if (res.success) {
          var data = res.data
          me.groupLoading = false
          const list = data.map(item => {
            return {
              value: item.ID,
              label: item.Name
            }
          })
          me.groupOption = list.filter(item => item.label.toLowerCase().indexOf(query.toLowerCase()) > -1)
        }
      })
      // if (query !== '') {
      // } else {
      //   me.groupOption = []
      // }
    },
    loadGroupOption (key) {
      var me = this
      me.groupLoading = true
      getTop10ByKey(key).then(res => {
        if (res.success) {
          var data = res.data
          me.groupLoading = false
          const list = data.map(item => {
            return {
              value: item.ID,
              label: item.Name
            }
          })
          me.groupOption = list.filter(item => item.label.toLowerCase().indexOf(query.toLowerCase()) > -1)
        }
      })
    },
    loadAppInfoOption (query) {
      var me = this
      me.appInfoLoading = true
      getAppInfoSelectDataByKey(query).then(res => {
        if (res.success) {
          var data = res.data
          me.appInfoLoading = false
          const list = data.map(item => {
            return {
              value: item.Value,
              label: item.Label
            }
          })

          me.appInfoOption = list.filter(item => item.label.toLowerCase().indexOf(query.toLowerCase()) > -1)
        }
      })
    },
    // 下一步
    nextStep (name) {
      var me = this
      this.loading = true
      if (me.stepIndex === 0) {
        this.$refs.apiInfoStep1.validate((valid) => {
          this.loading = false
          if (valid) {
            me.stepIndex = 1
          }
        })
      } else if (me.stepIndex === 1) {
        this.$refs.apiInfoStep2.validate((valid) => {
          this.loading = false
          if (valid) {
            me.stepIndex = 2
          }
        })
      }
      // this.$refs[name].validate(valid => {
      //   if (valid) {
      //     me.stepIndex++
      //     if (me.stepIndex >= 2) {
      //       me.stepIndex = 2
      //     }
      //   }
      //   this.loading = false
      // })
    },
    // 上一步
    prevStep (name) {
      this.stepIndex--
      if (this.stepIndex <= 0) {
        this.stepIndex = 0
      }
    },
    handleSupportProtocolChange (value) {
      if (value === 1) {
        this.ReqMethodOption = [{value: 1, label: 'HttpGet'}, {value: 2, label: 'HttpPost'}, {value: 3, label: 'HttpPut'}, {value: 4, label: 'HttpDelete'}]
        this.apiInfo.ReqMethod = 1
      } else if (value === 2) {
        this.ReqMethodOption = [{value: 5, label: 'JsonRPC'}]
        this.apiInfo.ReqMethod = 5
      }
    },
    handleSubmit (name) {
      var me = this
      me.loading = true
      me.apiInfo.TargetApis = JSON.stringify(me.targetApiTableData)
      me.$refs.apiInfoStep3.validate((valid) => {
        if (valid) {
          if (me.apiInfo.ID === 0) {
            add(me.apiInfo).then(res => {
              if (res.success) {
                me.loading = false
                me.loadData()
                me.createModalShow = false
                Message.success('保存成功！')
              }
            })
          } else {
            update(me.apiInfo).then(res => {
              if (res.success) {
                me.loading = false
                me.loadData()
                me.createModalShow = false
                Message.success('保存成功！')
              }
            })
          }
        }
      })
    },
    cancelApiInfo () {
      this.createModalShow = false
    },

    handleAddTargetApiInfo () {
      this.modalShow = true
      this.openTargetApiInfo(null)
    },
    handleEditTargetApiInfo (row) {
      this.modalShow = true
      this.openTargetApiInfo(row)
    },
    handleDelTargetApiInfo (row) {
      var me = this
      for (var i = 0; i < me.targetApiTableData.length; i++) {
        if (me.targetApiTableData[i].ID === row.ID) {
          me.targetApiTableData.splice(i, 1)
        }
      }
    },
    openTargetApiInfo (data) {
      if (!data) {
        this.targetApiInfo = {
          ID: 0,
          TargetKey: '',
          TargetUrl: '',
          CallName: '',
          CallMethod: 0,
          Weight: '',
          Timeout: 0,
          Status: 0
        }
      } else {
        this.targetApiInfo = {
          ID: data.ID,
          TargetKey: data.TargetKey,
          TargetUrl: data.TargetUrl,
          CallName: data.CallName,
          CallMethod: data.CallMethod,
          Weight: data.Weight,
          Timeout: data.Timeout,
          Status: data.Status
        }
      }
    },
    savetargetApiInfo (name) {
      var me = this
      this.$refs[name].validate((valid) => {
        if (me.targetApiInfo.ID === 0) {
          me.targetApiInfo.ID = (me.targetApiTableData.length + 1)
          me.targetApiTableData.push(me.targetApiInfo)
        } else {
          for (var i = 0; i < me.targetApiTableData.length; i++) {
            if (me.targetApiTableData[i].ID === me.targetApiInfo.ID) {
              me.targetApiTableData.splice(i, 1, me.targetApiInfo)
            }
          }
        }
        this.modalShow = false
      })
    },
    cancelTargetApiInfo () {
      this.modalShow = false
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style>

</style>
