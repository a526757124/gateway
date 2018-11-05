<template>
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
            <Form ref="apiInfo" class="steps" :model="apiInfo" :label-width="180">
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
              <Form-item label="所属应用" prop="BelongAppID">
                  <Row>
                      <Col span="18">
                      <Select v-model="apiInfo.BelongAppID"
                      multiple
                      filterable
                      remote
                      :remote-method="groupRemoteLoad"
                      :loading="groupLoading">
                          <Option v-for="(option,index) in groupOption" :value="option.value" :key="index">{{ option.label }}</Option>
                      </Select>
                      </Col>
                  </Row>
              </Form-item>
              <Form-item label="所属分组" prop="GroupID">
                  <Row>
                      <Col span="18">
                      <Select v-model="apiInfo.GroupID"
                      filterable
                      remote
                      :remote-method="groupRemoteLoad"
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
                        <i-Switch size="large" v-model="apiInfo.RawResponseFlag">
                          <span slot="open" >是</span>
                          <span slot="close">否</span>
                        </i-Switch>
                      </Col>
                  </Row>
              </Form-item>
              <Form-item >
                <Button type="primary" @click="nextStep('apiInfo',1)"  :loading="loading">下一步</Button>
              </Form-item>
          </Form>
        </Card>
        <Card title="定义API请求" v-show="stepIndex===1">
            <Form ref="apiInfo" :model="apiInfo" :label-width="120">
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
                            <i-Switch size="large" v-model="apiInfo.IsUseMock" @on-change="handleIsUseMockChange">
                                <span slot="open" >启用</span>
                                <span slot="close">关闭</span>
                            </i-Switch>
                        </Col>
                    </Row>
                </Form-item>
                <Form-item label="Mock请求返回数据" prop="MockData" v-show="mockDataShow">
                    <Row>
                        <Col span="18">
                            <Input type="textarea" v-model="apiInfo.MockData" :rows="2"></Input>
                        </Col>
                    </Row>
                </Form-item>
                <Form-item >
                  <Button @click="prevStep('apiInfo',0)"  :loading="loading">上一步</Button>
                  <Button type="primary" @click="nextStep('apiInfo',2)"  :loading="loading">下一步</Button>
                </Form-item>
            </Form>
        </Card>
        <Card title="定义API后端服务" v-show="stepIndex===2">
            <Form ref="apiInfo" :model="apiInfo"  :label-width="120">
                 <Form-item label="接口类型" prop="Type">
                    <Row>
                        <Col span="18">
                            <Select v-model="apiInfo.Type" filterable >
                                <Option v-for="item in typeOption" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </Col>
                    </Row>
                </Form-item>
                <Form-item label="服务地址" prop="TargetApis">
                    <Row>
                        <Col span="18">
                            <Table ref="tables" :data="targetApiTableData" :columns="targetApiColumns"/>
                            <Button type="primary" @click="handleAddTargetApiInfo()">添加服务地址</Button>
                        </Col>
                    </Row>
                </Form-item>
                <Form-item >
                  <Button @click="prevStep('apiInfo',1)"  :loading="loading">上一步</Button>
                  <Button type="primary" @click="handleSubmit('apiInfo')"  :loading="loading">提交</Button>
                </Form-item>
            </Form>
        </Card>
        </Col>
    </Row>
    <Modal title="服务地址" :mask-closable="false" v-model="modalShow" width="30" z-index="100">
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
                        <Select v-model="targetApiInfo.CallMethod" filterable @on-change="handleTargetApiInfoCallMethodChange">
                           <Option v-for="item in targetApiInfoCallMethodOption" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                        </Col>
                    </Row>
                </Form-item>
                <Form-item label="调用方法" prop="CallName" v-show="callNameShow">
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
                <Button type="primary" @click="savetargetApiInfo('targetApiInfo')">提交</Button>
                <!-- <Button @click="handleReset('application')" style="margin-left: 8px">重置</Button> -->
                <Button style="margin-left: 8px" @click="cancelTargetApiInfo('targetApiInfo')">关闭</Button>
            </div>
    </Modal>
  </div>
</template>
<script>
import { getTop10ByKey } from '@/api/api-group'
import { add, getAPIInfoById } from '@/api/apiInfo'
export default {
  name: 'createAPI',
  props: {
  },
  data () {
    return {
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
      ReqMethodOption: [],
      modalShow: false,
      callNameShow: false,
      mockDataShow: false,
      apiInfo: {
        ID: 0,
        Name: '',
        Type: 0,
        Desc: '',
        BelongAppID: [],
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
      targetApiInfo: {
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
        {title: '调用方法', key: 'CallName'},
        { title: '调用方式',
          key: 'CallMethod',
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
        {title: '权重', key: 'Weight'},
        {title: '操作',
          key: 'handle',
          align: 'center',
          width: 80,
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
    groupRemoteLoad (query) {
      var me = this
      me.groupLoading = true
      getTop10ByKey(query).then(data => {
        me.groupLoading = false
        const list = data.map(item => {
          return {
            value: item.ID,
            label: item.Name
          }
        })
        me.groupOption = list.filter(item => item.label.toLowerCase().indexOf(query.toLowerCase()) > -1)
      })
      // if (query !== '') {
      // } else {
      //   me.groupOption = []
      // }
    },
    loadGroupOption (key) {
      var me = this
      me.groupLoading = true
      getTop10ByKey(key).then(data => {
        me.groupLoading = false
        const list = data.map(item => {
          return {
            value: item.ID,
            label: item.Name
          }
        })
        me.groupOption = list.filter(item => item.label.toLowerCase().indexOf(query.toLowerCase()) > -1)
      })
    },
    nextStep (name, index) {
      var me = this
      this.loading = true
      this.$refs[name].validate(valid => {
        if (valid) {
          me.stepIndex = index
        }
        this.loading = false
      })
    },
    prevStep (name, index) {
      this.stepIndex = index
    },
    handleIsUseMockChange (value) {
      if (value) {
        this.mockDataShow = true
      } else {
        this.mockDataShow = false
      }
    },
    handleTargetApiInfoCallMethodChange (value) {
      if (value === 5) {
        this.callNameShow = true
      } else {
        this.callNameShow = false
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
      this.loading = true
      this.apiInfo.TargetApis = JSON.stringify(this.targetApiTableData)
      this.$refs[name].validate((valid) => {
        if (valid) {
          add(this.apiInfo).then(data => {
            this.loading = false
          })
        }
      })
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
      for (var i = 0; i < me.targetApiTableData.length; i++) { me.targetApiTableData.splice(1, 1) }
    },
    openTargetApiInfo (data) {
      if (!data) {
        this.targetApiInfo = {
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
        me.targetApiTableData.push(me.targetApiInfo)
        this.modalShow = false
      })
    },
    cancelTargetApiInfo () {
      this.modalShow = false
    },
    init () {
      this.groupRemoteLoad('')
      this.initData()
    },
    initData () {
      var me = this
      if (apiID !== 0) {
        getAPIInfoById(apiID).then((data) => {
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
    }

  },
  watch: {
    formData (val, oldVal) {
      console.log('new: %s, old: %s', val, oldVal)
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style lang="less" scoped>
  .steps {
      margin: 16px auto;
  }

</style>
