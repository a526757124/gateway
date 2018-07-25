<style scoped>
    .c-table {
        /* width: 100%; */
        /* position: absolute;
        top: 0;
        bottom: 0;
        left: 0; */
        text-align: center;
    }

    .c-table .ivu-row-flex {
        height: 100%;
    }
    .c-table .table-page{
        margin-top: 10px;
    }
</style>
<template>
    <div class="c-table">
        <Row type="flex">
            <Col span="24">
                <Table stripe :columns="tableColumns" :data="tableData"></Table>
            </Col>
        </Row>
        <Row type="flex" justify="center" align="middle" class-name="table-page">
            <Col span="24" >
                <Page :total="dataCount" :page-size="pageSize" show-total  @on-change="changePage"></Page>
            </Col>
        </Row>
    </div>
</template>

<script>
    let testData = {
        "histories": [
            {
                "username": "智能审批",
                "shenpistatus": "审批已通过",
                "shenpicomments": "自动审批通过",
                "time": "2017-07-24 18:11"
            },
            {
                "username": "智能审批",
                "shenpistatus": "审批已通过",
                "shenpicomments": "自动审批通过",
                "time": "2017-07-24 18:11"
            },
            {
                "username": "智能审批",
                "shenpistatus": "审批已通过",
                "shenpicomments": "自动审批通过",
                "time": "2017-07-24 10:04"
            },
            {
                "username": "智能审批",
                "shenpistatus": "审批被拒绝",
                "shenpicomments": "  收入 > 999 && 支出 < 201",
                "time": "2017-07-24 10:03"
            },
            {
                "username": "智能审批",
                "shenpistatus": "审批被拒绝",
                "shenpicomments": "  收入 > 999 && 支出 < 201",
                "time": "2017-07-24 10:02"
            },
            {
                "username": "智能审批",
                "shenpistatus": "审批已通过",
                "shenpicomments": "自动审批通过",
                "time": "2017-07-24 10:02"
            },
            {
                "username": "智能审批",
                "shenpistatus": "审批被拒绝",
                "shenpicomments": "自动审批通过",
                "time": "2017-07-24 10:01"
            },
            {
                "username": "智能审批",
                "shenpistatus": "审批被拒绝",
                "shenpicomments": "自动审批通过",
                "time": "2017-07-24 09:56"
            },
            {
                "username": "智能审批",
                "shenpistatus": "审批被拒绝",
                "shenpicomments": "自动审批通过",
                "time": "2017-07-21 14:23"
            },
            {
                "username": "智能审批",
                "shenpistatus": "审批被拒绝",
                "shenpicomments": "  收入 > 999 && 支出 < 201 && 所有项目的总净收入 > 5000",
                "time": "2017-07-21 14:23"
            },
            {
                "username": "智能审批",
                "shenpistatus": "审批被拒绝",
                "shenpicomments": "自动审批通过",
                "time": "2017-07-21 14:23"
            },
            {
                "username": "智能审批",
                "shenpistatus": "审批被拒绝",
                "shenpicomments": "  收入 > 999 && 支出 < 201 && 所有项目的总净收入 > 5000",
                "time": "2017-07-21 14:23"
            },
            {
                "username": "智能审批",
                "shenpistatus": "审批被拒绝",
                "shenpicomments": "  收入 > 999 && 支出 < 201 && 所有项目的总净收入 > 5000",
                "time": "2017-07-21 14:23"
            },
            {
                "username": "智能审批",
                "shenpistatus": "审批被拒绝",
                "shenpicomments": "  收入 > 999 && 支出 < 201 && 所有项目的总净收入 > 5000",
                "time": "2017-07-21 14:21"
            },
            {
                "username": "智能审批",
                "shenpistatus": "审批被拒绝",
                "shenpicomments": "自动审批通过",
                "time": "2017-07-21 14:21"
            },
            {
                "username": "智能审批",
                "shenpistatus": "审批被拒绝",
                "shenpicomments": "自动审批通过",
                "time": "2017-07-21 14:20"
            },
            {
                "username": "智能审批",
                "shenpistatus": "审批被拒绝",
                "shenpicomments": "  收入 > 999 && 支出 < 201 && 所有项目的总净收入 > 5000",
                "time": "2017-07-21 14:20"
            },
            {
                "username": "智能审批",
                "shenpistatus": "审批被拒绝",
                "shenpicomments": "自动审批通过",
                "time": "2017-07-21 14:14"
            },
            {
                "username": "智能审批",
                "shenpistatus": "审批被拒绝",
                "shenpicomments": "自动审批通过",
                "time": "2017-07-21 14:13"
            },
            {
                "username": "智能审批",
                "shenpistatus": "审批被拒绝",
                "shenpicomments": "自动审批通过",
                "time": "2017-07-21 14:11"
            },
            {
                "username": "智能审批",
                "shenpistatus": "审批被拒绝",
                "shenpicomments": "自动审批通过",
                "time": "2017-07-21 14:10"
            },
            {
                "username": "智能审批",
                "shenpistatus": "审批被拒绝",
                "shenpicomments": "  收入 > 999 && 支出 < 201 && 所有项目的总净收入 > 5000",
                "time": "2017-07-20 18:09"
            }
        ]
    }
    

export default {
    data (){
        return{
            tableColumns:[{
                        title: '人员',
                        key: 'username'
                    },
                    {
                        title: '操作',
                        key: 'shenpistatus',
                        render: (h, params) => {
                            return h('Select', {
                                props:{
                                    value: this.tableData[params.index].shenpistatus,
                                },
                                on: {
                                    'on-change':(value) => {
                                        this.tableData[params.index].shenpistatus = value;
                                    }
                                },
                            },
                            [
                                h('Option',{
                                    props: {
                                        value: '审批已通过'
                                    }
                                },'审批已通过'),
                                h('Option',{
                                    props: {
                                        value: '审批被拒绝'
                                    }
                                },'审批被拒绝')

                            ]   
                        );
                        },
                    },
                    {
                        title: '意见',
                        key: 'shenpicomments'
                    },
                    {
                        title: '时间',
                        key: 'time'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        align:'center',
                        render:(h,params)=>{
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
                                                debugger;
                                                //this.show(params.index)
                                            }
                                        }
                                    }, 'View'),
                                    h('Poptip', {
                                        props: {
                                            confirm: true,
                                            // 'ok-text':"yes",
                                            // 'cancel-text':"no",
                                            type: 'error',
                                            size: 'large',
                                            title: '你确定要删除吗?'
                                        },
                                        on: {
                                            'on-ok': () => {
                                                // vm.$emit('on-delete', params)
                                                // vm.$emit('input', params.tableData.filter((item, index) => index !== params.row.initRowIndex))                                            }
                                            }
                                        }
                                    },[
                                            h('Button', {
                                                props: {
                                                    type: 'primary',
                                                    size: 'small'
                                                },
                                                style: {
                                                    marginRight: '5px'
                                                },
                                            },'删除')
                                    ])
                            ]);
                        }
                    }],
            tableData:[],
            dataCount:0,
            pageSize:10,
            ajaxData:[]
        }
    },
    methods:{
        initTable(){
            // 保存取到的所有数据
                this.ajaxData = testData.histories
                this.dataCount = testData.histories.length;
                // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
                if(testData.histories.length < this.pageSize){
                    this.tableData = this.ajaxData;
                }else{
                    this.tableData = this.ajaxData.slice(0,this.pageSize);
                }
        },
        changePage(index){
            var _start = ( index - 1 ) * this.pageSize;
            var _end = index * this.pageSize;
            this.tableData = this.ajaxData.slice(_start,_end);
        }
    },
    created(){
        this.initTable();
    }

}
</script>