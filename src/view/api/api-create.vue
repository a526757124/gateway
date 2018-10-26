<template>
  <div id="app" class="type" style="margin: 5px auto;padding-top: 20px;text-align: left">
    <Row class="bg" >
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
            <Form ref="apiInfo" class="steps" :model="apiInfo" :rules="ruleCustom" :label-width="400">
              <Form-item label="API名称" prop="Name" >
                  <Row>
                      <Col span="12">
                      <Input v-model="apiInfo.Name" placeholder="API名称..."></Input>
                      </Col>
                  </Row>
              </Form-item>
              <Form-item label="API简介" prop="Desc">
                  <Row>
                      <Col span="12">
                      <Input type="textarea" v-model="apiInfo.Desc" placeholder="API简介..."></Input>
                      </Col>
                  </Row>
              </Form-item>
              <Form-item label="所属应用" prop="BelongAppID">
                  <Row>
                      <Col span="12">
                      <Select v-model="apiInfo.BelongAppID"
                      multiple
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
              <Form-item label="所属分组" prop="GroupID">
                  <Row>
                      <Col span="12">
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
                      <Col span="12">
                      <Select v-model="apiInfo.ValidateType" filterable >
                          <Option value="1">MD5验证</Option>
                          <Option value="0">无校验</Option>
                      </Select>
                      </Col>
                      <Col>

                      </Col>
                  </Row>
              </Form-item>
              <Form-item label="开发人员" prop="DevUser">
                  <Row>
                      <Col span="12">
                      <Input v-model="apiInfo.DevUser" placeholder="开发人员..."></Input>
                      </Col>
                  </Row>
              </Form-item>
              <Form-item label="API状态" prop="Status">
                  <Row>
                      <Col span="12">
                      <Select v-model="apiInfo.Status" filterable >
                          <Option v-for="item in statusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                      </Select>
                      </Col>
                      <Col>

                      </Col>
                  </Row>
              </Form-item>
              <Form-item label="是否返回原始响应字符串" prop="RawResponseFlag">
                  <Row>
                      <Col span="12">
                      <Select v-model="apiInfo.RawResponseFlag" filterable >
                          <Option value="1">是</Option>
                          <Option value="0">否</Option>
                      </Select>
                      </Col>
                      <Col>
                      </Col>
                  </Row>
              </Form-item>
              <Form-item >
                <Button type="primary" @click="nextStep('apiInfo',1)"  :loading="loading">下一步</Button>
              </Form-item>
          </Form>
        </Card>
        <Card title="定义API请求" v-show="stepIndex===1">
            <Form ref="apiInfo" :model="apiInfo" :rules="ruleCustom" :label-width="400">
                <Form-item label="服务Host类型" prop="ServiceHostType">
                    <Row>
                        <Col span="12">
                            <Select v-model="apiInfo.ServiceHostType" filterable >
                              <Option value="1">手动注册</Option>
                              <Option value="2">自发现</Option>
                            </Select>
                        </Col>
                        <Col>
                        </Col>
                    </Row>
                </Form-item>
                <Form-item label="服务注册名称" prop="ServiceDiscoveryName">
                    <Row>
                        <Col span="12">
                        <Input v-model="apiInfo.ServiceDiscoveryName" placeholder="服务注册名称..."></Input>
                        </Col>
                        <Col>
                        </Col>
                    </Row>
                </Form-item>
                <Form-item label="请求路径" prop="ApiPath">
                    <Row>
                        <Col span="12">
                        <Input v-model="apiInfo.ApiPath" placeholder="请求路径..."></Input>
                        </Col>
                        <Col>
                        </Col>
                    </Row>
                </Form-item>
                <Form-item label="支持协议" prop="SupportProtocol">
                    <Row>
                        <Col span="12">
                            <Select v-model="apiInfo.SupportProtocol"   @on-change="handleSupportProtocolChange">
                              <Option value="1">HTTP协议</Option>
                              <Option value="2">RPC协议</Option>
                            </Select>
                        </Col>
                        <Col>
                        </Col>
                    </Row>
                </Form-item>
                <Form-item label="请求方式" prop="ReqMethod">
                    <Row>
                        <Col span="12">
                            <Select v-model="apiInfo.ReqMethod" filterable>
                                <Option v-for="item in ReqMethodOption" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </Col>
                        <Col>
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
            <Form ref="apiInfo" :model="apiInfo" :rules="ruleCustom" :label-width="400">
                 <Form-item label="接口类型" prop="Type">
                    <Row>
                        <Col span="12">
                            <Select v-model="apiInfo.Type" filterable >
                                <Option v-for="item in typeOption" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </Col>
                        <Col>
                        </Col>
                    </Row>
                </Form-item>
                <Form-item label="服务地址" prop="apiType">
                    <Row>
                        <Col span="12">
                           <Table ref="tables" :data="tableData" :columns="columns"/>
                            <Button type="primary" @click="handleAddTargetApiInfo()">添加服务地址</Button>
                        </Col>
                        <Col>
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

    <Modal title="服务地址" :mask-closable="false" v-model="modalShow" width="30">
           <Form ref="targetApiInfo" :model="targetApiInfo" :label-width="120">
                <Form-item label="targetUrl" prop="targetUrl">
                    <Row>
                        <Col span="12">
                        <Input v-model="targetApiInfo.targetUrl" placeholder="请求地址..."></Input>
                        </Col>
                        <Col>
                        </Col>
                    </Row>
                </Form-item>
                <Form-item label="callName" prop="callName">
                    <Row>
                        <Col span="12">
                        <Input v-model="targetApiInfo.callName" placeholder="请求地址..."></Input>
                        </Col>
                        <Col>
                        </Col>
                    </Row>
                </Form-item>
                <Form-item label="callMethod" prop="callMethod">
                    <Row>
                        <Col span="12">
                        <Input v-model="targetApiInfo.callMethod" placeholder="请求地址..."></Input>
                        </Col>
                        <Col>
                        </Col>
                    </Row>
                </Form-item>
                <Form-item label="weight" prop="weight">
                    <Row>
                        <Col span="12">
                        <Input v-model="targetApiInfo.weight" placeholder="请求地址..."></Input>
                        </Col>
                        <Col>
                        </Col>
                    </Row>
                </Form-item>
                <Form-item label="status" prop="status">
                    <Row>
                        <Col span="12">
                        <Input v-model="targetApiInfo.status" placeholder="请求地址..."></Input>
                        </Col>
                        <Col>
                        </Col>
                    </Row>
                </Form-item>
           </Form>
           <div slot="footer">
                <Button type="primary">提交</Button>
                <!-- <Button @click="handleReset('application')" style="margin-left: 8px">重置</Button> -->
                <Button style="margin-left: 8px">关闭</Button>
            </div>
    </Modal>
  </div>

</template>
<script>
// import { GetQueryString } from '@/common/utils'
// import bgUrl from '@/assets/img/bg_login.jpg'
import { getTop10ByKey } from '@/api/api-group'
export default {
  name: 'api-create',
  data () {
    const validateCompanyId = (rule, value, callback) => {
      if (value.toString().length !== 15 && value.toString().length !== 18) {
        callback(new Error('请输入正确的营业执照注册号'))
      } else {
        callback()
      }
    }
    return {
      statusList: [{value: 0, label: '初始化'}, {value: 1, label: '有效'}, {value: -1, label: '无效'}],
      apiMethodeList: [{value: 1, label: 'HttpGet'}, {value: 2, label: 'HttpPost'}, {value: 100, label: 'JsonRpc'}],
      typeOption: [{value: 1, label: '组合'}, {value: 2, label: '负载'}],
      stepIndex: 0,
      token: true,
      loading: false,
      groupLoading: false,
      groupOption: [],
      ReqMethodOption: [],
      modalShow: false,
      // bgUrl: bgUrl,
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
      targetApiInfo: {
        targetUrl: '',
        callName: '',
        callMethod: '',
        weight: '',
        status: 0
      },
      columns: [
        {title: '地址', key: 'targetUrl'},
        {title: 'CallName', key: 'callName'},
        {title: 'CallMethod', key: 'callMethod'},
        {title: 'Weight', key: 'weight'},
        {title: 'Status', key: 'status'},
        {title: '操作',
          key: 'handle',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.show(params.index)
                  }
                }
              }, '编辑'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.remove(params.index)
                  }
                }
              }, '删除')
            ])
          }
        }
      ],
      tableData: [],
      ruleCustom: {
        company: [
          {required: true, message: '企业名称不能为空', trigger: 'blur'}
        ],
        mark: [
          {required: true, message: '标示不能为空', trigger: 'blur'},
          {message: '标示只支持字母', trigger: 'blur', pattern: /^[A-Za-z]$/}
        ],
        companyId: [
          {required: true, message: '营业执照注册号不能为空', trigger: 'blur'},
          {validator: validateCompanyId, trigger: 'blur'}
        ],
        userName: [
          {required: true, message: '管理员名称不能为空', trigger: 'blur'}
        ],
        idCard: [
          {required: true, message: '身份证号不能为空', trigger: 'blur'},
          {
            message: '身份证号格式不正确',
            trigger: 'blur',
            pattern: /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{4}$/
          }
        ],
        phone: [
          {required: true, message: '手机号不能为空', trigger: 'blur'},
          {message: '手机号格式不正确', len: 11, trigger: 'blur', pattern: /^[1][3,4,5,7,8][0-9]{9}$/}
        ]
      }
    }
  },
  methods: {
    //
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
    handleSupportProtocolChange (value) {
      if (value === '1') {
        this.ReqMethodOption = [{value: 1, label: 'HttpGet'}, {value: 2, label: 'HttpPost'}, {value: 3, label: 'HttpPut'}, {value: 4, label: 'HttpDelete'}]
        this.apiInfo.ReqMethod = 1
      } else if (value === '2') {
        this.ReqMethodOption = [{value: 5, label: 'JsonRPC'}]
        this.apiInfo.ReqMethod = 5
      }
    },
    handleSubmit (name) {
      this.loading = true
      this.$refs[name].validate((valid) => {
        if (valid) {
          let data = {
            account_type: this.formCustom.typeId,
            company_name: this.formCustom.company,
            business_license_number: this.formCustom.companyId,
            personName: this.formCustom.userName,
            personSex: this.formCustom.idCard.substring(16, 1) % 2 ? '1' : '0',
            idCard: this.formCustom.idCard,
            telephone: this.formCustom.phone
            // promotionTableName: GetQueryString('promotionTableName') || '',
            // promotionTableId: GetQueryString('promotionTableId') || '',
            // email: GetQueryString('e') || ''
          }
          this.$api.postUserInfo(data).then(res => {
            this.loading = false
            if (res.code === 0) {
              this.$Message.success('提交成功!')
              let url = window.location.href
              if (window.location.search === '') {
                url = window.location.href
              } else {
                url = url.split(window.location.search)[0]
              }
              url = url.replace('type.html', 'login.html')
              window.location.href = url
            } else {
              alert(JSON.stringify(res))
            }
          }).catch(err => {
            this.loading = false
            console.error('哎哟~！', err)
          })
        } else {
          this.loading = false
          this.$Message.error('表单验证失败!')
        }
      })
    },
    checkToken () {
      let data = {
        // token: GetQueryString('token') || '',
        // e: GetQueryString('e') || '',
        // p: GetQueryString('p') || ''
      }
      this.$api.checkToken(data).then(res => {
        if (res.code === 0) {
          if (res.state === '1') {
            this.token = true
          } else {
            this.token = false
          }
        }
      })
    },
    save () {
    },
    handleAddTargetApiInfo () {
      this.modalShow = true
    },
    init () {
      var targetApiInfo = {
        targetUrl: '',
        callName: 'aa',
        callMethod: 'bb',
        weight: '',
        status: ''
      }
      this.tableData.push(targetApiInfo)
      this.tableData.push(targetApiInfo)
      this.groupRemoteLoad('')
    }
  },
  created () {
    this.checkToken()
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
