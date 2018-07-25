<template>
    <div>
        <Row>
            <Col span="12">应用名称:</Col>
            <Col span="12"><Input placeholder="应用名称..." style="width: 300px"></Input></Col>
        </Row>
        <Row>
            <Col span="12">状态:</Col>
            <Col span="12">

                    <i-switch size="large">
                        <span slot="open">开启</span>
                        <span slot="close">关闭</span>
                    </i-switch>
            </Col>
        </Row>
        <Row>
            <Col span="12">应用描述	:</Col>
            <Col span="12">
                <Input type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="应用描述..."></Input>
            </Col>
        </Row>
    </div>
</template>
