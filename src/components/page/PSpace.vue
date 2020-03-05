<template>
  <div class="container">
		<div class="header">
      <div class="input">
        <el-select
          v-model="spaceId" 
          clearable 
          :style="{'margin-left': '20px'}"
					@change="loadData"
          placeholder="请选择">
          <el-option
						v-for="(item, index) in spaces"
            :key="index"
            :label="item.name"
						:value="item.id"
						>
						{{item.name}}
          </el-option>
        </el-select>
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
				@click="add()"
				:disabled="addPSpace"
				><i class="el-icon-plus"></i>添加排场</el-button>
        <el-button type="danger" @click="delAll()" plain><i class="el-icon-delete"></i>批删除排场</el-button>
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
			highlight-current-row
		  @selection-change="handleSelectionChange">
			<el-table-column type="expand">
			  <template slot-scope="props">
			    <div class="line fe">屏幕</div>
			    <div v-for="(item, index) in format(props.row.info)" 
			      :key="index" 
			      :index="index" style="text-align: center;">
			      <div v-for="(i, iIndex) in item" :index="iIndex"
			        :key="iIndex" 
			        :class="{
			        'infoItem': true,
			        'color': i
			        }"/>
			      <span class="size">{{item.length}}位</span>
			    </div>
			  </template>
			</el-table-column>
			<el-table-column
			  type="selection"
			  width="55">
			</el-table-column>
		  <el-table-column
				prop="movieName"
        show-overflow-tooltip
		    label="电影名称">
		  </el-table-column>
			<el-table-column
				prop="name"
        show-overflow-tooltip
			  label="场地名称">
			</el-table-column>
			<el-table-column
			  label="场地位置">
        <template slot-scope="scope">
          <i class="el-icon-location"></i>
          <span style="margin-left: 10px">{{scope.row.address}}</span>
        </template>
			</el-table-column>
			<el-table-column
			  label="场地容量">
        <template slot-scope="scope">
          <el-tag
            type="success"
            effect="plain"
            disable-transitions>
            <span>{{scope.row.total}}位</span>
          </el-tag>
        </template>
			</el-table-column>
			<el-table-column
				width="100"
			  label="场地剩余容量">
        <template slot-scope="scope">
          <el-tag
            type="success"
            effect="plain"
            disable-transitions>
            <span>{{scope.row.num}}位</span>
          </el-tag>
        </template>
			</el-table-column>
			<el-table-column
			  label="影票单价">
        <template slot-scope="scope">
          <el-tag
            type="danger"
            disable-transitions>
            <span>{{scope.row.price | price(scope.row.price)}} 元</span>
          </el-tag>
        </template>
			</el-table-column>
			<el-table-column
				width="100"
			  label="影票VIP单价">
        <template slot-scope="scope">
          <el-tag
            type="warning"
            disable-transitions>
            <span>{{scope.row.vipPrice | price(scope.row.vipPrice)}} 元</span>
          </el-tag>
        </template>
			</el-table-column>
		  <el-table-column
        width="105"
		    label="播放日期">
        <template slot-scope="scope">
          <el-tag
            type="info"
            disable-transitions>
            <span><i class="el-icon-time"></i>&nbsp;{{scope.row.date | formatTime(scope.row.date, 'YYYY-MM-DD')}}</span>
          </el-tag>
        </template>
		  </el-table-column>
      <el-table-column
        label="排查状态">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.movieStatus == 2 ? 'danger' : 'success'"
            disable-transitions>
            <span v-if="scope.row.movieStatus == 2">已过期</span>
            <span v-else>进行中</span>
          </el-tag>
        </template>
      </el-table-column>
			<el-table-column
		    label="播放时间"
		    width="120">
        <template slot-scope="scope">
          <el-tag
            type="info"
            effect="plain"
            disable-transitions>
            <span><i class="el-icon-time"></i>{{scope.row.upTime}}</span>
          </el-tag>
        </template>
		  </el-table-column>
			<el-table-column
				width="100"
			  label="结束播放时间">
        <template slot-scope="scope">
          <el-tag
            type="warning"
            effect="plain"
            disable-transitions>
            <span><i class="el-icon-time"></i>{{scope.row.downTime}}</span>
          </el-tag>
        </template>
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
        prop="updateTime"
        label="更新时间"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        label="操作"
        fixed="right"
        highlight-current-row
				width="180"
        show-overflow-tooltip>
          <template slot-scope="scope">
            <el-tooltip 
              v-if="scope.row.movieStatus != 2"
              class="item" 
              effect="dark" 
              content="编辑"  
              placement="right">
              <el-button 
                type="primary" 
                size="mini"
                icon="el-icon-edit"
                @click="edit(scope.row)"/>
            </el-tooltip>
            <el-tooltip 
              v-if="scope.row.movieStatus != 2"
              class="item" 
              effect="dark" 
              content="删除"
              placement="right">
              <el-button
                type="danger" 
                icon="el-icon-delete"
                size="mini"
                @click="del(scope.row)"/>
            </el-tooltip>
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
							:key="index"
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
       var validatePass = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入密码'));
          } else {
            if (this.userInfo.password !== '') {
              this.$refs.ruleForm.validateField('password2')
            }
            callback()
          }
        }
        var validatePass2 = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请再次输入密码'))
          } else if (value !== this.ruleForm.password) {
            callback(new Error('两次输入密码不一致!'))
          } else {
            callback()
          }
        }
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
				movieId: '',
				movieInfo: {},
        date : '',
        ids : [],
				infoDialog: false,
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
        }
      }
    },
    methods: {
      loadData(startTime = '', endTime = '') {
				if(this.date && this.spaceId){
					this.addPSpace = false
				}
				this.loading = true
				let data = {}
				if(this.date){
					data.date = this.date.toLocaleDateString().replace('/','-').replace('/','-')
				}
				data.page = this.page
				data.size = this.tablePageSize
				data.sId = this.spaceId
				this.$GET(this.$API.ADMIN.AdminQueryPSpace, data)
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
      submit(){
				let startTime = this.time[0].toTimeString().split(' ')[0]
				let endTime = this.time[1].toTimeString().split(' ')[0]
				let data = {}
				if(this.userInfo.userUpdate){
					data.id = this.id
				}
				data.mId = this.movieId
				data.sId = this.spaceId
				data.date = this.date.toLocaleDateString().replace('/','-').replace('/','-')
				data.upTime = startTime
				data.downTime = endTime
				this.$POST(this.$API.ADMIN.AdminInsertUpdatePSpace,data)
				.then(res => {
					this.dialogFormVisible = false
					if(this.userInfo.userUpdate){
						this.$message.success('修改成功')
					}else{
						this.$message.success('添加成功')
					}
					this.loadData()
				})
      }
    },
    created(){
			this.loadMovie()
			this.loadSpace()
			this.loadData()
      // this.loadData()
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
