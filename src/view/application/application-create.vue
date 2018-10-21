<template>
    <div>
        <Modal title="添加应用">
             <Form ref="applicationForm"  label-position="left" :label-width="80" :model="application" :rules="applicationRuleValidate">
                    <TabPane label="应用详细" prop="application.AppName">
                        <FormItem label="应用名称">
                            <Input v-model="application.AppName" placeholder="应用名称..."></Input>
                        </FormItem>
                        <FormItem label="应用简介" >
                            <Input v-model="application.AppDesc" type="textarea" :rows="4" placeholder="应用简介..."></Input>
                        </FormItem>
                        <FormItem label="应用地址">
                            <Input v-model="application.AppUrl" splaceholder="应用地址..."></Input>
                        </FormItem>
                        <FormItem label="服务器IP" >
                            <Input v-model="application.AppIPList" type="textarea" :rows="4" placeholder="服务器IP..."></Input>
                        </FormItem>
                        <FormItem label="开发人员">
                            <Input v-model="application.DevUser" placeholder="开发人员..."></Input>
                        </FormItem>
                        <FormItem label="产品人员" >
                            <Input v-model="application.ProductUser" placeholder="产品人员..."></Input>
                        </FormItem>
                        <FormItem label="开通状态"> 
                            <Select v-model="application.Status">
                                <Option value="1">开启</Option>
                                <Option value="0">关闭</Option>
                                <Option value="2">构建中</Option>
                            </Select>
                        </FormItem>
                    </TabPane>
            </Form>
            <div slot="footer">
                <Button>取消</Button>
                <Button type="primary">确定</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
    export default {
        name: 'applicationcreate',
        props: {
           application:{},
        },
        data () {
            return {
              insideApplication: {
                AppID:'',//
                AppName:'',//应用名称
                AppDesc:'',//应用简介
                AppKey:'',//appkey
                AppUrl:'',//应用地址
                AppIPList:'',//服务器IP
                DevUser:'',//开发人员
                ProductUser:'',//产品人员
                Status:0//状态  开启 关闭 构建中
            }
            }
        },
        methods:{
            onCancel(){
                //this.$emit('on-cancel')
            },
            onSave(){
                //this.$emit('on-save',this.application)
            }
        },
        watch: {
            application (application) {
                this.insideApplication=application
            }
        },
        mounted () {
            this.insideApplication=this.application
        }
    }
</script>