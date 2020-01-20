<template>
    <div>
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
    	    label="ID"
					width="180"
					prop="id">
    	  </el-table-column>
    	  <el-table-column
    	    label="电影名称"
					prop="name"
    	    width="120">
    	    <template slot-scope="scope">{{ scope.row.name }}</template>
    	  </el-table-column>
    	  <el-table-column
    	    prop="title"
    	    label="标题"
    	    width="120">
    	  </el-table-column>
				<el-table-column
    	    prop="price"
    	    label="单价"
    	    width="120">
    	  </el-table-column>
				<el-table-column
				  prop="vipPrice"
				  label="VIP价格"
				  width="120">
				</el-table-column>
    	  <el-table-column
    	    prop="context"
    	    label="详情"
    	    show-overflow-tooltip>
    	  </el-table-column>
    	  <el-table-column
    	    prop="labels"
    	    label="标签"
    	    show-overflow-tooltip>
    	  </el-table-column>
    	  <el-table-column
    	    prop="status"
    	    label="状态"
    	    show-overflow-tooltip>
    	  </el-table-column>
    	  <el-table-column
    	    prop="director"
    	    label="导演"
    	    show-overflow-tooltip>
    	  </el-table-column>
    	  <el-table-column
    	    prop="actor"
    	    label="演员"
    	    show-overflow-tooltip>
    	  </el-table-column>
        <el-table-column
          prop="upTime"
          label="上映时间"
          show-overflow-tooltip>
        </el-table-column>
    	  <el-table-column
    	    prop="createTime"
    	    label="创建时间"
    	    show-overflow-tooltip>
    	  </el-table-column>
    	  <el-table-column
    	    prop="updateTime"
    	    label="更新时间"
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
				tablePageSize: 1,
				tablePageTotal: 10,
				currentPage: 1,
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
				
				console.log(`当前页: ${val}`);
			}
	  },
		mounted() {
			this.$GET(this.$API.ADMIN.AdminQueryMovie, {size : this.tablePageTotal, page : this.tablePageSize})
			.then(res => {
				console.info(res.data)
				this.tableData = res.data.details
			})
			.catch(err => {
				console.log(err)
			})
		}
	}
</script>
<style scoped>
    .editor-btn{
        margin-top: 20px;
    }
</style>