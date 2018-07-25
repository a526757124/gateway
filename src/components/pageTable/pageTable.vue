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
                <Table stripe :columns="columns" :data="data" border
                @on-selection-change="handleSectionChange"></Table>
            </Col>
        </Row>
        <Row type="flex" justify="center" align="middle" class-name="table-page">
            <Col span="24" >
                <Page :total="total" :current="current" :page-size="pageSize" show-sizer show-total
                @on-change="handlePageChange" @on-page-size-change='handlePageSizeChange'></Page>
            </Col>
        </Row>
    </div>
</template>

<script>
export default {
  name: 'pageTable',
  props: {
    current: {
      type: Number,
      default: 1
    },
    columns: {
      type: Array,
      default () {
        return []
      }
    },
    data: {
      type: Array,
      default () {
        return []
      }
    },
    total: {
      type: Number,
      default: 0
    },
    pageSize: {
      type: Number,
      default: 10
    }
  },
  data () {
    return {
      selection: []
    }
  },
  computed: {

  },
  methods: {
    handleSectionChange (selection) {
      this.$set(this, 'selection', selection)
    },
    handlePageChange (current) {
      this.$emit('on-pageIndex-change', current)
    },
    handlePageSizeChange (pageSize) {
      this.$emit('on-pageSize-change', pageSize)
    }
  }
}
</script>
