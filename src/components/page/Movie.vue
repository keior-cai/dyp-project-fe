<template>
    <div>
			<div class="header">
			  <div class="input">
			    <el-input
			      placeholder="请输入关键字"
			      prefix-icon="el-icon-search"
			      :style="{'width':'200px'}"
			      v-model="input"
			      @clear="loadData()"
			      @blur="loadData()"
			      clearable>
			    </el-input>
			      <el-date-picker
			        v-model="date"
			        type="daterange"
			        align="right"
			        unlink-panels
			        range-separator="至"
			        start-placeholder="开始日期"
			        end-placeholder="结束日期"
			        :value-format="'yyyy-MM-dd'"
			        @change="loadData()"
			        @blur="loadData()"
			        @clear="loadData()"
			        :picker-options="pickerOptions">
			      </el-date-picker>
			      <el-select 
			        v-model="status" 
			        clearable 
			        :style="{'margin-left': '20px'}"
			        @change="loadData()"
			        placeholder="请选择">
			          <el-option
			            :key="'ACTIVE'"
			            :label="'正常'"
			            :value="'ACTIVE'">
			          </el-option>
			          <el-option
			            :key="'NOT_ACTIVE'"
			            :label="'禁用'"
			            :value="'NOT_ACTIVE'">
			          </el-option>
			        </el-select>
			  </div>
				<div class="table-header">
			    <el-button type="primary" plain @click="add()"><i class="el-icon-plus"></i>添加电影</el-button>
			    <el-button type="danger" @click="delAll()" plain><i class="el-icon-delete"></i>批删除电影</el-button>
			  </div>
			</div>
    	<el-table
    	  ref="multipleTable"
    	  :data="tableData"
				v-loading="loading"
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
				input: '',
				loading: false,
	      multipleSelection: []
	    }
	  },
	
	  methods: {
	    toggleSelection(rows) {
	      if (rows) {
	        rows.forEach(row => {
	          this.$refs.multipleTable.toggleRowSelection(row)
	        });
	      } else {
	        this.$refs.multipleTable.clearSelection()
	      }
	    },
	    handleSelectionChange(val) {
	      this.multipleSelection = val;
	    },
			handleSizeChange(val) {
			  console.log(val)
			},
			handleCurrentChange(val) {
				
				console.log(`当前页: ${val}`)
			}
	  },
		mounted() {
			this.$GET(this.$API.ADMIN.AdminQueryMovie, {size : this.tablePageTotal, page : this.tablePageSize})
			.then(res => {
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
	.el-select .el-input {
	  width: 6.25rem;
	}
	.input {
	  display: inline-block;
	  text-align: left;
	  float: left;
	}
	.block {
	  padding: 0rem;
	}
	.el-date-editor {
	  margin-left: 3.125rem;
	}
	.header {
	  background-color: #FFFFFF;
	  padding: 0.9375rem 0.625rem;
	}
	.table-header {
	  text-align: right;
	}
	.block {
	  background-color: #FFFFFF;
	  padding: 0.9375rem 0rem;
	}
</style>