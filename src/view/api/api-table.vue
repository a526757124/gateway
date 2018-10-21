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
                <FormItem label="api名称" prop="AppName">
                    <Input type="text" v-model="apiInfo.ApiName" placeholder="应用名称..."></Input>
                </FormItem>
                <FormItem label="api描述" prop="AppDesc">
                    <Input type="textarea" :rows="4"  v-model="apiInfo.ApiDesc" placeholder="应用描述..."></Input>
                </FormItem>
                <FormItem label="api地址" prop="AppUrl">
                    <Input type="text" v-model="apiInfo.ApiUrl" placeholder="应用地址..."></Input>
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
import { getApiInfoList } from '@/api/apiInfo'
export default {
  name: 'api-table',
  components: {
    Tables
  },
  data () {
    return {
        addBtnTo:'api-create',
        addBtnTitle:'添加API',
      columns: [
        {title: '名称', key: 'ApiName', sortable: true,isSearchable:true},
        {title: '类型', key: 'ApiType',isSearchable:true},
        {title: '所属模块', key: 'ApiModule',isSearchable:true},
        {title: '描述', key: 'ApiDesc'},
        {title: '状态',key: 'Status',render: (h, params) => {
            const row = params.row
            const color = row.Status === 100 ? 'blue' : row.Status === 0 ? 'green' : 'red'
            const text = row.Status === 100 ? '初始化' : row.Status === 0 ? '初始化' : '暂停'
            return h('Tag', {
              props: {
                type: 'dot',
                color: color
              },
              style: {
                    padding: '6px 5px'
                },
            }, text)
          }
        },
        {
          title: '操作',
          //align: 'center',
          key: 'handle',
          //options: ['delete'],
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
                                    //var i=params;
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
      modalTitle: "添加API基本信息",
      apiInfo:{
            ApiID:'',
            ApiName:'',
            ApiModule:'',//api所属模块
            ApiKey:'',//
            ApiType:'',//api类型  组合、负载
            ApiVersion:'',//Api 版本
            ApiUrl:'',//api 地址
            TargetApiUrl:'',//targetapi地址 目标地址
            ValidIP:'',//有效IP
            HttpMethode:'',//http请求方法get,post
            Status:0,//状态
            ValidateType:1,//验证类型
            RawResponseFlag:0,//是否返回原始响应字符串 默认否
            ApiDesc:'',//api简介
            DevUser:'',//开发人员
            Product:'',//产品人员
            Operator:'',//操作人员
            WriteTime:'',//创建时间
            LastModifyTime:'',//最后修改时间
            ServiceHostType:0,//
            ServiceDiscoveryName:''//
      },
      statusList:[{value:0,label:"初始化"},{value:100,label:"有效"},{value:-100,label:"暂停"}],
      apiRuleValidate: {
          ApiName: [
              { required: true, message: '应用名称不能为空！', trigger: 'blur' }
          ],
          ApiDesc: [
              { required: true, message: '请输入应用简介！', trigger: 'blur' },
              { type: 'string', min: 20, message: '应用简介不能小于20字！', trigger: 'blur' }
          ],
          ApiUrl: [
              { required: true, type: 'url', min: 1, message: '请输入正确的url应用地址', trigger: 'change' }
          ]  
      },
      totalData:0,
      pageIndex:1,
      pageSize:10,
      
    }
  },
  methods: {
    handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('Success!');
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
    },
    handleReset (name) {
        this.$refs[name].resetFields();
    },
    handleCancel () {
        this.createModalShow=false;
    },
    init(){
      this.loadData();
    },
    loadData(){
      var query={
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      }
      getApiInfoList(query).then(res => {
        this.tableData = res.data;
        this.totalData=this.tableData.length;
      })
    },
    handleAdd(){
        this.open(null);
        this.createModalShow = true;
        this.modalTitle="添加API基本信息";
    },
    handleEdit(row){
        this.open(row);
        this.createModalShow = true;
        this.modalTitle="编辑API基本信息";
    },
    open (row) {
      if (row) {
        this.apiInfo = {
          ApiID: row.ApiID,
          ApiName: row.ApiName,
          ApiModule: row.ApiModule,
          ApiDesc: row.ApiDesc,
          ApiUrl: row.ApiUrl,
          TargetApiUrl: row.TargetApiUrl,
          ApiType: row.ApiType,
          HttpMethode: row.HttpMethode,
          Status: row.Status
        }
      } else {
        this.apiInfo = {
            ApiID:'',
            ApiName:'',
            ApiModule:'',//api所属模块
            ApiKey:'',//
            ApiType:'',//api类型  组合、负载
            ApiVersion:'',//Api 版本
            ApiUrl:'',//api 地址
            TargetApiUrl:'',//targetapi地址 目标地址
            ValidIP:'',//有效IP
            HttpMethode:'',//http请求方法get,post
            Status:0,//状态
            ValidateType:1,//验证类型
            RawResponseFlag:0,//是否返回原始响应字符串 默认否
            ApiDesc:'',//api简介
            DevUser:'',//开发人员
            Product:'',//产品人员
            Operator:'',//操作人员
            WriteTime:'',//创建时间
            LastModifyTime:'',//最后修改时间
            ServiceHostType:0,//
            ServiceDiscoveryName:''//
        }
      }
    },
    handleDelete (params) {
      console.log(params)
    },
    handlePageChange(index){
      this.pageIndex=index;
      this.loadData();
    },
    handlePageSizeChange(size){
      this.pageSize=size;
      this.loadData();
    }
  },
  mounted () {
    this.init();
  }
}
</script>

<style>

</style>
