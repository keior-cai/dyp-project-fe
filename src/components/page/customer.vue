<template>
  <div>
		<div>
			<div style="margin-top: 15px;">
			  <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
			    <el-select v-model="select" slot="prepend" placeholder="请选择">
			      <el-option label="餐厅名" value="1"></el-option>
			      <el-option label="订单号" value="2"></el-option>
			      <el-option label="用户电话" value="3"></el-option>
			    </el-select>
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
		    label="序号"
		    width="120">
		    <template slot-scope="scope">{{ scope.row.date }}</template>
		  </el-table-column>
		  <el-table-column
		    label="帐号"
		    width="120">
		    <template slot-scope="scope">{{ scope.row.date }}</template>
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
		    prop="address"
		    label="用户类型"
		    show-overflow-tooltip>
		  </el-table-column>
		  <el-table-column
		    prop="address"
		    label="上次登录时间"
		    show-overflow-tooltip>
		  </el-table-column>
		  <el-table-column
		    prop="address"
		    label="上次登录IP"
		    show-overflow-tooltip>
		  </el-table-column>
		</el-table>
		<div class="block" style="text-align: right;">
		    <el-pagination
		      @size-change="handleSizeChange"
		      @current-change="handleCurrentChange"
		      :current-page="currentPage4"
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
				tablePageTotal: 100,
				input3: '',
        multipleSelection: []
      }
    },

    methods: {
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
			handleSizeChange(val) {
			  console.log(val)
			},
			handleCurrentChange(val) {
				if (val == 2) {
					this.tableData = [{
				  date: '2016-05-03',
				  name: '王小虎',
				  address: '上海市普陀区金沙江路 1518 弄'
				}, {
				  date: '2016-05-02',
				  name: '王小虎',
				  address: '上海市普陀区金沙江路 1518 弄'
				}, {
				  date: '2016-05-04',
				  name: '王小虎',
				  address: '上海市普陀区金沙江路 1518 弄'
				}, {
				  date: '2016-05-01',
				  name: '王小虎',
				  address: '上海市普陀区金沙江路 1518 弄'
				}, {
				  date: '2016-05-08',
				  name: '王小虎',
				  address: '上海市普陀区金沙江路 1518 弄'
				}, {
				  date: '2016-05-06',
				  name: '王小虎',
				  address: '上海市普陀区金沙江路 1518 弄'
				}, {
				  date: '2016-05-07',
				  name: '王小虎',
				  address: '上海市普陀区金沙江路 1518 弄'
				}];
				} 
				console.log(`当前页: ${val}`);
			}
    }
  }
</script>

<style lang="stylus" scoped>
</style>
