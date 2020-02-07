<template>
  <div class="container">
		<div class="header">
      <div class="input">
        <el-input
          v-model="orderSn" 
          clearable 
          :style="{'margin-left': '20px'}"
					@change="loadData"
          placeholder="请选择">
        </el-input>
        <el-date-picker
          v-model="date"
          type="date"
					format="yyyy-MM-dd"
					@change="loadData()"
          placeholder="选择日期">
        </el-date-picker>
      </div>
			<div class="table-header">
        <el-button type="primary" 
				plain 
				@click="loadData()"
				><i class="el-icon-plus"></i>刷新</el-button>
      </div>
		</div>
		<el-table
		  ref="multipleTable"
		  :data="tableData"
			v-loading="loading"
		  tooltip-effect="dark"
      border
			fit
		  style="width: 100%; background-color: #FFFFFF;"
			highlight-current-row="true"
		  @selection-change="handleSelectionChange">
			<el-table-column
			  type="selection"
			  width="55">
			</el-table-column>
		  <el-table-column
		    label="id">
		    <template slot-scope="scope">{{ scope.row.id }}</template>
		  </el-table-column>
		  <el-table-column
				prop="orderSn"
				width="150"
		    label="订单号">
		  </el-table-column>
			<el-table-column
				prop="movieName"
			  label="电影名称">
			</el-table-column>
			<el-table-column
				prop="num"
			  label="数量">
			</el-table-column>
			<el-table-column
			  label="单价">
				<template slot-scope="scope">{{ scope.row.price }}元</template>
			</el-table-column>
			<el-table-column
				width="total"
			  label="总价">
				<template slot-scope="scope">{{ scope.row.num * scope.row.price }}元</template>
			</el-table-column>
			<el-table-column
			  label="订单状态">
				<template slot-scope="scope">{{ scope.row.status }}</template>
			</el-table-column>
      <el-table-column
        label="创建时间"
        show-overflow-tooltip>
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{scope.row.createTime}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="更新时间"
        show-overflow-tooltip>
				<template slot-scope="scope">
				  <i class="el-icon-time"></i>
				  <span style="margin-left: 10px">{{scope.row.updateTime}}</span>
				</template>
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
    <el-dialog :title="title" :visible.sync="dialogFormVisible" width="520px">
      <el-form :model="userInfo" status-icon :rules="rules" ref="ruleForm" label-width="100px">
				<el-form-item label="电影名称">
					<el-select
						v-model="movieId" 
						clearable
						:style="{'margin-left': '20px'}"
						placeholder="请选择">
						<el-option
							v-for="(item, index) in movies"
							:key="item.id"
							:label="item.name"
							:value="item.id"
							>
							{{item.name}}
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="播放时间">
					<el-time-picker
							is-range
							v-model="time"
							range-separator="-"
							start-placeholder="开始时间"
							end-placeholder="结束时间"
							placeholder="选择时间范围">
          </el-time-picker>
				</el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
		<!-- 电影院信息 -->
		<el-dialog title="电影院信息" :visible.sync="infoDialog" width="500px">
		  <el-form :model="movieInfo" status-icon ref="ruleForm" label-width="100px">
		    <el-form-item label="电影院名称">
		      <el-input 
		        v-model="movieInfo.name" 
		        autocomplete="off" 
		        placeholder="请输入电影院名称"
		        maxlength="20"
		        show-word-limit/>
		    </el-form-item>
		    <el-form-item label="电影院地址">
		      <el-input
		        v-model="movieInfo.address"
		        autocomplete="off" 
		        placeholder="请输电影院地址"/>
		    </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="infoDialog = false">取 消</el-button>
		    <el-button type="primary" @click="infoSubmit">确 定</el-button>
		  </div>
		</el-dialog>
	</div>
</template>

<script>
  export default {
    data() {
      return {
        title: '',
				addPSpace: true,
        tableData: [],
				tablePageSize: 10,
				tablePageTotal: 0,
        currentPage: 1,
				input: '',
				movies: [],
				spaces: [],
				loading: false,
        status: '',
        multipleSelection: [],
        page : 1,
        dialogFormVisible: false,
        showPassword: true,
        userInfo: {
          name : '',
          userName: '',
          password: '',
          
        },
				id: '',
				time: '',
				spaceId: '',
				orderSn: '',
				movieInfo: {},
        date : '',
        ids : [],
				infoDialog: false,
			}
    },
    methods: {
      loadData(startTime = '', endTime = '') {
				this.loading = true
				let data = {}
				if(this.date){
					data.date = this.date.toLocaleDateString().replace('/','-').replace('/','-')
				}
				data.page = this.page
				data.size = this.tablePageSize
				data.orderSn = this.orderSn
				this.$GET(this.$API.ADMIN.AdminInsertQeryOrder, data)
				.then(res => {
				  this.tablePageTotal = res.data.total
				  this.tableData = res.data.details
					this.loading = false
				})
				.catch(res => {
					this.loading = false
				})
				
      },
      filterTag(key, row) {
        return row.status == key
      },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
			format(info){
				return JSON.parse(info)
			},
			info(row){
				this.id = row.id
				if(row.info){
					this.movieInfo = JSON.parse(row.info)
				}else{
					this.movieInfo = {}
				}
				this.infoDialog = true
			},
			infoSubmit(){
				this.$POST(this.$API.ADMIN.AdminInsertUpdate, {
					id: this.id,
					info: JSON.stringify(this.movieInfo)
				})
				.then(res => {
					this.$message.success('修改成功')
				})
				this.infoDialog = false
				this.loadData()
			},
      handleSelectionChange(val) {
        this.multipleSelection = val
        this.ids = val.map(e => e.id)
      },
			handleSizeChange(val) {
			  this.loadData(this.page, this.tablePageSize)
			},
			handleCurrentChange(val) {
				this.page = val
        this.loadData(val, this.tablePageSize)
      },
      edit(data){
        this.title = '修改排场信息'
        this.dialogFormVisible = true
        this.userInfo = data
        this.userInfo.userUpdate = true
        this.userInfo.statueTmp = this.userInfo.status == 'ACTIVE' ? true : false
        this.userInfo.roleTmp = this.userInfo.role == 0 ? '普通客户' : ''
      },
      add(){
        this.userInfo = {
          userUpdate: false
        }
        this.title = '添加排场'
        this.dialogFormVisible = true
      },
      del(data) {
        this.userInfo = data
        this.$POST(this.$API.ADMIN.AdminInsertUpdate, {id : this.userInfo.id, deleted : 1})
        .then(res => {
           this.$message.success('删除成功')
           this.loadData()
           this.dialogFormVisible = false
        })
      },
      delAll(){
        this.ids.forEach(e=> {
          this.$POST(this.$API.ADMIN.AdminInsertUpdate, {id : e, deleted : 1})
        })
        this.$message.success('批量删除成功')
        this.loadData()
      },
      play(data){
        
      },
			loadMovie(){
				this.$GET(this.$API.ADMIN.AdminLoadMovie,{})
				.then(res => {
					this.movies = res.data
				})
			},
			loadSpace(){
				this.$GET(this.$API.ADMIN.AdminLoadSpace,{})
				.then(res => {
					this.spaces = res.data
				})
			},
    },
    created(){
			this.loadMovie()
			this.loadData()
      // this.loadData()
    }
  }
</script>

<style scoped>
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
	.el-date-editor{
		margin-left: 1.25rem;
	}
	.size{
		position: relative;
		color: #F02D2D;
		margin-left: 1.25rem;
		bottom: 0.4375rem;
	}
	.infoItem {
		width: 2.1875rem;
		height: 2.1875rem;
		cursor: default;
		margin-left: 0.1875rem;
		border: 0.0625rem solid #999999;
		display: inline-block;
		text-align: center;
		margin-top: 0.3125rem;
	}
	.line{
		clear: left;
		cursor: default;
		text-align: center;
		border-radius: 0.25rem;
		margin: 0 auto;
		width: 60%;
		background-color: #409EFF;
		color: #FFFFFF;
	}
	.fe{
		background-color: #FFFFFF;
		height: 5rem;
		border: 0.0625rem solid #999999;
		cursor: default;
		color: #000000;
		line-height: 5rem;
		margin-bottom: 1.25rem;
	}
</style>
