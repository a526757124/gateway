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
           <Form ref="application" :model="application" :rules="applicationRuleValidate" :label-width="80">
                <FormItem label="应用名称" prop="AppName">
                    <Input type="text" v-model="application.AppName" placeholder="应用名称..."></Input>
                </FormItem>
                <FormItem label="应用描述" prop="AppDesc">
                    <Input type="textarea" :rows="4"  v-model="application.AppDesc" placeholder="应用描述..."></Input>
                </FormItem>
                <FormItem label="应用地址" prop="AppUrl">
                    <Input type="text" v-model="application.AppUrl" placeholder="应用地址..."></Input>
                </FormItem>
                <FormItem label="服务器IP" prop="AppIPList">
                    <Input v-model="application.AppIPList" type="textarea" :rows="4" placeholder="服务器IP..."></Input>
                </FormItem>
                <FormItem label="开发人员" prop="DevUser">
                    <Input v-model="application.DevUser" placeholder="开发人员..."></Input>
                </FormItem>
                <FormItem label="产品人员" prop="ProductUser">
                    <Input v-model="application.ProductUser" placeholder="产品人员..."></Input>
                </FormItem>
                <FormItem label="开通状态" prop="Status"> 
                    <Select v-model="application.Status">
                        <Option v-for="item in statusList" :value="item.value" :key="item.value">{{item.label}}</Option>
                    </Select>
                </FormItem>
           </Form>
           <div slot="footer">
                <Button type="primary" @click="handleSubmit('application')">提交</Button>
                <!-- <Button @click="handleReset('application')" style="margin-left: 8px">重置</Button> -->
                <Button @click="handleCancel()" style="margin-left: 8px">关闭</Button>
            </div>
    </Modal>
  </div>
</template>

<script>
import Tables from '_c/tables'
import { getList, add,update,del } from '@/api/application'
export default {
  name: 'applicaton-table',
  components: {
    Tables
  },
  data () {
    const validatePass = (rule, value, callback) => {
        if (value === '') {
            callback(new Error('Please enter your password'));
        } else {
            if (this.formCustom.passwdCheck !== '') {
                // 对第二个密码框单独验证
                this.$refs.formCustom.validateField('passwdCheck');
            }
            callback();
        }
    };
    const validatePassCheck = (rule, value, callback) => {
        if (value === '') {
            callback(new Error('Please enter your password again'));
        } else if (value !== this.formCustom.passwd) {
            callback(new Error('The two input passwords do not match!'));
        } else {
            callback();
        }
    };
    const validateAge = (rule, value, callback) => {
        if (!value) {
            return callback(new Error('Age cannot be empty'));
        }
        // 模拟异步验证效果
        setTimeout(() => {
            if (!Number.isInteger(value)) {
                callback(new Error('Please enter a numeric value'));
            } else {
                if (value < 18) {
                    callback(new Error('Must be over 18 years of age'));
                } else {
                    callback();
                }
            }
        }, 1000);
    };
    return {
      columns: [
        {title: '应用名称', key: 'AppName', sortable: true,isSearchable:true},
        {title: '应用描述', key: 'AppDesc',isSearchable:true},
        {title: '状态',key: 'Status',render: (h, params) => {
            const row = params.row
            const color = row.Status === 1 ? 'blue' : row.Status === 2 ? 'green' : 'red'
            const text = row.Status === 1 ? '开启' : row.Status === 2 ? '构建中' : '关闭'
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
        {title: '创建时间', key: 'CreateDate'},
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
      modalTitle: "添加应用",
      application:{
          AppID:0,//
          AppName:'',//应用名称
          AppDesc:'',//应用简介
          AppKey:'',//appkey
          AppUrl:'',//应用地址
          AppIPList:'',//服务器IP
          DevUser:'',//开发人员
          ProductUser:'',//产品人员
          Status:0//状态  开启 关闭 构建中
      },
      statusList:[{value:1,label:"开启"},{value:2,label:"构建中"},{value:0,label:"关闭"}],
      applicationRuleValidate: {
          AppName: [
              { required: true, message: '应用名称不能为空！', trigger: 'blur' }
          ],
          AppDesc: [
              { required: true, message: '请输入应用简介！', trigger: 'blur' },
              { type: 'string', min: 20, message: '应用简介不能小于20字！', trigger: 'blur' }
          ],
          AppUrl: [
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
        var me=this;
        var data=this.application;
        this.$refs[name].validate((valid) => {
            if (valid) {
                if(data.AppID>0){
                    update(data).then(res=>{
                        me.$Message.success('Success!');
                        me.loadData();
                        this.createModalShow = false;
                    })
                }else{
                    add(data).then(res=>{
                        me.$Message.success('Success!');
                        me.loadData();
                        this.createModalShow = false;
                    })
                }

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
      getList(query).then(res => {
          if(res.data.totalCount==0){
            this.tableData=[];
            this.totalCount=0;
          }else{
            this.tableData = res.data.pageData;
            this.totalData=res.data.totalCount;
          }
      })
    },
    handleAdd(){
        this.setApp(null);
        this.createModalShow = true;
        this.modalTitle="添加应用";
    },
    handleEdit(row){
        this.setApp(row);
        this.createModalShow = true;
        this.modalTitle="编辑应用";
    },
    setApp (row) {
      if (row) {
        this.application = {
          AppID: row.AppID,
          AppName: row.AppName,
          AppDesc: row.AppDesc,
          AppKey: row.AppKey,
          AppUrl: row.AppUrl,
          AppIPList: row.AppIPList,
          DevUser: row.DevUser,
          ProductUser: row.ProductUser,
          Status: row.Status,
        }
      } else {
        this.application = {
            AppID:0,//
            AppName:'',//应用名称
            AppDesc:'',//应用简介
            AppKey:'',//appkey
            AppUrl:'',//应用地址
            AppIPList:'',//服务器IP
            DevUser:'',//开发人员
            ProductUser:'',//产品人员
            CreateDate:'',
            Status:0//状态  开启 关闭 构建中
        }
      }
    },
    handleDelete (row) {
        var me=this;
        me.setApp(row)
        del(me.application).then(res=>{
            me.$Message.success('Success!');
            me.loadData();
        })
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
