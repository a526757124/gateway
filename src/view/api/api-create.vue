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
            <Form ref="apiInfo" :model="apiInfo" :rules="ruleCustom" :label-width="400">
            
            <Form-item label="API名称" prop="apiName" >
                <Row>
                    <Col span="12">
                    <Input v-model="apiInfo.apiName" placeholder="API名称..."></Input>
                    </Col>
                </Row>
            </Form-item>
            <Form-item label="API简介" prop="apiDesc">
                <Row>
                    <Col span="12">
                    <Input v-model="apiInfo.apiDesc" placeholder="API简介..."></Input>
                    </Col>
                </Row>
            </Form-item>
            <Form-item label="开发人员" prop="devUser">
                <Row>
                    <Col span="12">
                    <Input v-model="apiInfo.devUser" placeholder="API简介..."></Input>
                    </Col>
                </Row>
            </Form-item>
            <Form-item label="所属分组" prop="groupId">
                <Row>
                    <Col span="12">
                    <Select v-model="apiInfo.groupId" filterable >
                        <Option v-for="item in groupList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                    </Col>
                    <Col>

                    </Col>
                </Row>
            </Form-item>
            <Form-item label="API状态" prop="status">
                <Row>
                    <Col span="12">
                    <Select v-model="apiInfo.status" filterable >
                        <Option v-for="item in statusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                    </Col>
                    <Col>

                    </Col>
                </Row>
            </Form-item>
            <Form-item label="是否返回原始响应字符串" prop="status">
                <Row>
                    <Col span="12">
                    <Select v-model="apiInfo.status" filterable >
                        <Option value="1">是</Option>
                        <Option value="0">否</Option>
                    </Select>
                    </Col>
                    <Col>

                    </Col>
                </Row>
            </Form-item>
            <Form-item label="验证类型" prop="status">
                <Row>
                    <Col span="12">
                    <Select v-model="apiInfo.status" filterable >
                        <Option value="1">基本</Option>
                        <Option value="0">无校验</Option>
                    </Select>
                    </Col>
                    <Col>

                    </Col>
                </Row>
            </Form-item>
          </Form>
        </Card>
        <Card title="定义API请求" v-show="stepIndex===1">
            <Form ref="apiInfo" :model="apiInfo" :rules="ruleCustom" :label-width="400">
                <Form-item label="协议" prop="status">
                    <Row>
                        <Col span="12">
                            <Select v-model="apiInfo.apiMethode" filterable >
                                <Option v-for="item in apiMethodeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </Col>
                        <Col>
                        </Col>
                    </Row>
                </Form-item>
                <Form-item label="Api请求地址" prop="apiUrl">
                    <Row>
                        <Col span="12">
                        <Input v-model="apiInfo.apiUrl" placeholder="Api请求地址..."></Input>
                        </Col>
                        <Col>
                        </Col>
                    </Row>
                </Form-item>
                <Form-item label="Api请求方式" prop="apiMethode">
                    <Row>
                        <Col span="12">
                            <Select v-model="apiInfo.apiMethode" filterable >
                                <Option v-for="item in apiMethodeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </Col>
                        <Col>
                        </Col>
                    </Row>
                </Form-item>
            </Form>
        </Card>
        <Card title="定义API后端服务" v-show="stepIndex===2">
            <Form ref="apiInfo" :model="apiInfo" :rules="ruleCustom" :label-width="400">
                 <Form-item label="类型" prop="apiType">
                    <Row>
                        <Col span="12">
                            <Select v-model="apiInfo.apiType" filterable >
                                <Option v-for="item in apiTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
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
            </Form>
        </Card>
        </Col>
    </Row>
    <Row>
        <Col>
        <Card>
            <Form ref="op" :label-width="400">
            <Form-item >
              <Button type="primary" @click="handleSubmit('formCustom')"  :loading="loading">下一步</Button>
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
  //import { GetQueryString } from '@/common/utils'
  //import bgUrl from '@/assets/img/bg_login.jpg'
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
        groupList: [{value: '1',label: '分组1'},{value: '2',label: '分组2'}],
        statusList: [{value: 0,label: '初始化'},{value: 100,label: '有效'},{value: -100,label: '暂停'}],
        apiMethodeList:[{value: 1,label: 'HttpGet'},{value: 2,label: 'HttpPost'},{value: 100,label: 'JsonRpc'}],
        apiTypeList:[{value: 1,label: '组合'},{value: 2,label: '负载'}],
        stepIndex:2,
        token: true,
        loading: false,
        modalShow:false,
        //bgUrl: bgUrl,
        apiInfo: {
          groupId: 2,
          devUser: '',
          apiDesc: '',
          apiName: '',
          status:1,
          apiUrl:'',
          apiMethode:'',
        },
        targetApiInfo:{
            targetUrl:'',
            callName:'',
            callMethod:'',
            weight:'',
            status:0,
        },
        columns:[
            {title: '地址', key: 'targetUrl'},
            {title: 'CallName', key: 'callName'},
            {title: 'CallMethod', key: 'callMethod'},
            {title: 'Weight', key: 'weight'},
            {title: 'Status', key: 'status'},
            {title: '操作',key: 'handle',align: 'center',
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
                            ]);
                        }
            }
        ],
        tableData:[],
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
              telephone: this.formCustom.phone,
              //promotionTableName: GetQueryString('promotionTableName') || '',
              //promotionTableId: GetQueryString('promotionTableId') || '',
              //email: GetQueryString('e') || ''
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
          //token: GetQueryString('token') || '',
          //e: GetQueryString('e') || '',
          //p: GetQueryString('p') || ''
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
      handleAddTargetApiInfo(){
        this.modalShow=true;
      },
      init(){
          var targetApiInfo={
              targetUrl:'',
              callName:'aa',
              callMethod:'bb',
              weight:'',
              status:'',
          }
          this.tableData.push(targetApiInfo);
          this.tableData.push(targetApiInfo);
      }
    },
    created () {
      this.checkToken()
    },
    mounted () {
        this.init();
    }
  }
</script>

<style lang="less" scoped>
  html, body {
    position: absolute;
    height: 100%;
    width: 100%;
  }
.bg{
}
  #app {
    width: 100%;
    height: 100%;
    //overflow: scroll;
  }
  .help {
    display: block;
    text-align: left;
    font-size: 12px;
    color: #9ea7b4;
  }
</style>