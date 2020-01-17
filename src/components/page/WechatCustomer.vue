<template>
  <div>
		<div>
			<div style="margin-top: 15px;">
			  <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
			    <el-button slot="append" icon="el-icon-search"></el-button>
			  </el-input>
			</div>
		</div>
		<el-table
		  ref="multipleTable"
		  :data="tableData"
		  tooltip-effect="dark"
		  style="width: 100%"
			highlight-current-row="true"
		  @selection-change="handleSelectionChange">
		  <el-table-column
		    type="selection"
		    width="55">
		  </el-table-column>
		  <el-table-column
		    label="id"
		    width="120">
		    <template slot-scope="scope">{{ scope.row.id }}</template>
		  </el-table-column>
		  <el-table-column
		    label="帐号"
		    width="120">
		    <template slot-scope="scope">{{ scope.row.userName }}</template>
		  </el-table-column>
		  <el-table-column
		    prop="name"
		    label="姓名"
		    width="120">
		  </el-table-column>
		  <el-table-column
		    prop="address"
		    label="性别"
		    show-overflow-tooltip>
		  </el-table-column>
		  <el-table-column
		    label="用户类型"
		    show-overflow-tooltip>
		  <template slot-scope="scope"><span v-if="scope.row.role == 0">普通管理员</span></template>
      </el-table-column>
		  <el-table-column
		    prop="updateTime"
		    label="上次登录时间"
		    show-overflow-tooltip>
		  </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="ip"
        label="上次登录IP"
        show-overflow-tooltip>
      </el-table-column>
		</el-table>
		<div class="block" style="text-align: right;">
		    <el-pagination
		      @size-change="handleSizeChange"
		      @current-change="handleCurrentChange"
		      :current-page="currentPage"
		      :page-sizes="[10, 20, 50, 100]"
		      :page-size="tablePageSize"
		      layout="total, sizes, prev, pager, next, jumper"
		      :total="tablePageTotal">
		    </el-pagination>
		  </div>
	</div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [],
				tablePageSize: 10,
				tablePageTotal: 0,
				input3: '',
        multipleSelection: [],
        currentPage : 1,
      }
    },

    methods: {
      loadData(startTime = '', endTime = '') {
        this.$GET(this.$API.ADMIN.AdminLoadWechatCustomer, {page : this.currentPage, size : this.tablePageSize})
        .then(res => {
          this.tablePageTotal = res.data.total
          this.tableData = res.data.details
        })
      },
      toggleSelection(rows) {
        console.log(rows)
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        console.log(val)
        this.multipleSelection = val;
      },
			handleSizeChange(val) {
        this.tablePageSize = val
			  this.loadData(this.currentPage, val)
			},
			handleCurrentChange(val) {
				this.currentPage = val
        this.loadData(val, tablePageSize)
      }
    },
    created(){
      this.loadData()
    }
  }
</script>

<style scoped>
  .el-select .el-input {
      width: 6.25rem;
    }
</style>
