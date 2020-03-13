<template>
  <div class="container">
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
		      range-separator="-"
		      start-placeholder="开始日期"
		      end-placeholder="结束日期"
		      :value-format="'yyyy-MM-dd'"
		      @change="loadData()"
		      @blur="loadData()"
		      @clear="loadData()">
		    </el-date-picker>
		    <el-select 
		      v-model="status" 
		      clearable 
		      :style="{'margin-left': '20px'}"
		      @change="loadData()"
		      placeholder="请选择">
		        <el-option
		          key="1"
		          label="VIP用户"
		          value="1">
              VIP用户
		        </el-option>
		        <el-option
		          key="0"
		          label="普通用户"
		          value="0">
              普通用户
		        </el-option>
		      </el-select>
		</div>
		<el-table
		  ref="multipleTable"
		  :data="tableData"
		  tooltip-effect="dark"
		  style="width: 100%"
			highlight-current-row
		  @selection-change="handleSelectionChange">
		  <el-table-column
		    type="selection">
		  </el-table-column>
		  <el-table-column
		    label="微信账号">
		    <template slot-scope="scope">{{ scope.row.wechatName }}</template>
		  </el-table-column>
		  <el-table-column
		    prop="address"
		    label="性别"
		    show-overflow-tooltip>
		  </el-table-column>
		  <el-table-column
		    label="用户类型"
		    show-overflow-tooltip>
        <template slot-scope="scope">
          <el-switch
            disabled
            style="display: block"
            v-model="scope.row.isVip"
            active-color="#13ce66"
            active-value=1
            inactive-value=0
            inactive-color="#ff4949">
          </el-switch>
        </template>
      </el-table-column>
		  <el-table-column
		    label="创建时间"
		    align="center"
		    show-overflow-tooltip>
		    <template slot-scope="scope">
		      <i class="el-icon-time"></i>
		      <span style="margin-left: 10px">{{scope.row.createTime}}</span>
		    </template>
		  </el-table-column>
		  <el-table-column
		    align="center"
		    label="上次登录时间"
		    show-overflow-tooltip>
		    <template slot-scope="scope">
		      <i class="el-icon-time"></i>
		      <span style="margin-left: 10px">{{scope.row.updateTime}}</span>
		    </template>
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
        input: '',
        multipleSelection: [],
        currentPage : 1,
        status: '',
        date: []
      }
    },

    methods: {
      loadData(startTime = '', endTime = '') {
        if(this.date) {
          startTime = this.date[0] ? this.date[0] + ' 00:00:00' : ''
          endTime = this.date[1] ? this.date[1] + ' 23:59:59' : ''
        }
        this.$GET(this.$API.ADMIN.AdminLoadWechatCustomer, {
          page : this.currentPage, 
          size : this.tablePageSize,
          isVip: this.status,
          name: this.input,
          startTime: startTime,
          endTime: endTime
        })
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
        this.multipleSelection = val
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
    mounted (){
      this.loadData()
    }
  }
</script>

<style scoped>
  .el-select .el-input {
    width: 6.25rem;
  }
  .input {
    display: inline-block;
    text-align: left;
    float: left;
  }
</style>
