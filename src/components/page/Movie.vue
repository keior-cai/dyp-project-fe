<template>
    <div class="container">
			<div class="header">
			  <div class="input">
			    <el-input
			      placeholder="请输入关键字"
			      prefix-icon="el-icon-search"
			      :style="{'width':'200px', 'margin-right': '20px'}"
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
			            :key="'ACTIVE'"
			            label="发布"
			            value="1">
                  发布
			          </el-option>
			          <el-option
			            :key="'NOT_ACTIVE'"
			            label="下线"
			            value="2">
                  下线
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
    		highlight-current-row
    	  @selection-change="handleSelectionChange">
    	  <el-table-column
    	    type="selection">
    	  </el-table-column>
    	  <el-table-column
    	    label="电影名称"
          show-overflow-tooltip
					prop="name">
    	    <template slot-scope="scope"><span style="color: #303133; font-size: 0.875rem;">{{ scope.row.name }}</span></template>
    	  </el-table-column>
				<el-table-column
				  label="图片">
				  <template slot-scope="scope"><img style="width: 5.625rem; height: 5.625rem;" :src="scope.row.imgUrl" class="avatar"></template>
				</el-table-column>
    	  <el-table-column
    	    prop="title"
          show-overflow-tooltip
    	    label="标题">
    	  </el-table-column>
				<el-table-column
    	    label="单价">
          <template slot-scope="scope">
            <el-tag
              type="success"
              disable-transitions>
              <span>{{scope.row.price | price(scope.row.price)}} 元</span>
            </el-tag>
          </template>
    	  </el-table-column>
				<el-table-column
				  label="VIP价格">
          <template slot-scope="scope">
            <el-tag
              type="warning"
              disable-transitions>
              <span>{{scope.row.vipPrice | price(scope.row.vipPrice)}} 元</span>
            </el-tag>
          </template>
				</el-table-column>
    	  <el-table-column
    	    prop="content"
    	    label="详情"
    	    show-overflow-tooltip>
    	  </el-table-column>
    	  <el-table-column
    	    label="状态"
    	    show-overflow-tooltip>
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.status == 1  ? 'success' : 'danger'"
              disable-transitions>
              <span v-if="scope.row.status == 1">在线</span>
              <span v-if="scope.row.status == 2">下线</span>
              <span v-if="scope.row.status == 3">预售</span>
            </el-tag>
          </template>
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
          label="上映时间"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{scope.row.upTime}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="下线时间"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{scope.row.downTime}}</span>
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
    	    label="更新时间"
    	    show-overflow-tooltip>
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{scope.row.updateTime}}</span>
          </template>
    	  </el-table-column>
				<el-table-column
				  label="操作"
				  fixed="right"
					width="120"
				  highlight-current-row
				  show-overflow-tooltip>
				    <template slot-scope="scope">
				      <el-tooltip 
                v-if="scope.row.status != 2"
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
                v-if="scope.row.status != 2"
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
			<el-dialog :title="title" :visible.sync="dialogFormVisible" width="500px">
			  <el-form :model="userInfo" status-icon ref="ruleForm" label-width="100px">
			    <el-form-item label="电影名称">
			      <el-input 
			        v-model="userInfo.name" 
			        autocomplete="off" 
			        placeholder="请输入电影名称"
			        maxlength="20"
			        show-word-limit/>
			    </el-form-item>
			    <el-form-item label="标题">
			      <el-input
			        v-model="userInfo.title"
			        maxlength="20"
			        show-word-limit
			        autocomplete="off" 
			        placeholder="请输标题"/>
			    </el-form-item>
			    <el-form-item label="单价">
			      <el-input 
			        placeholder="请输入单价"
			        type="number"
			        v-model="userInfo.price" 
			        prop="price"/>
			    </el-form-item>
					<el-form-item label="VIP价格">
					  <el-input 
					    placeholder="请输入VIP价格"
					    type="number"
					    v-model="userInfo.vipPrice" 
					    prop="vipPrice"/>
					</el-form-item>
					<el-form-item label="电影详情">
						<el-input type="textarea"
						v-model="userInfo.content"
						autocomplete="off"
						placeholder="请输入电影详情"/>
					</el-form-item>
					<el-form-item label="导演">
					  <el-input
					    v-model="userInfo.director"
					    autocomplete="off"
					    placeholder="请输导演"/>
					</el-form-item>
					<el-form-item label="演员">
					  <el-input
					    v-model="userInfo.actor"
					    autocomplete="off" 
					    placeholder="请输演员"/>
					</el-form-item>
					<el-form-item label="上映时间">
					  <el-date-picker
					    v-model="userInfo.upTime"
					    align="left"
							format="yyyy-MM-dd"
					    type="date"
					    placeholder="选择上映日期"/>
					</el-form-item>
					<el-form-item label="下线时间">
					  <el-date-picker
					    v-model="userInfo.downTime"
					    align="left"
							format="yyyy-MM-dd"
					    type="date"
					    placeholder="选择下线日期"/>
					</el-form-item>
					<el-form-item label="电影图片">
						<el-upload
						  class="avatar-uploader"
						  :action="uploadUrl"
						  :show-file-list="false"
							:data="uploadData"
							name="location"
						  :on-success="handleAvatarSuccess"
						  :before-upload="beforeAvatarUpload">
						  <img v-if="imageUrl" :src="imageUrl" class="avatar">
						  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
					</el-form-item>
			  </el-form>
			  <div slot="footer" class="dialog-footer">
			    <el-button @click="qx">取 消</el-button>
			    <el-button type="primary" @click="submit">确 定</el-button>
			  </div>
			</el-dialog>
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
				dialogFormVisible: false,
				loading: false,
				date: [],
				uploadData: {
					supportType: 'local',
					serveName: 'movie',
					fileName: '',
				},
				userInfo: {},
				checkboxGroup: [],
	      multipleSelection: [],
				imageUrl: '',
				uploadUrl: '',
        status: '',
        title: ''
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
				this.ids = val.map(e => e.id)
	    },
			handleSizeChange(val) {
			  this.tablePageTotal = val
				this.loadData()
			},
			handleCurrentChange(val) {
				this.tablePageSize = val
				this.loadData()
			},
			loadData(startTime = '', endTime = ''){
				this.loading = true
				if(this.date) {
				  startTime = this.date[0] ? this.date[0] + ' 00:00:00' : ''
				  endTime = this.date[1] ? this.date[1] + ' 23:59:59' : ''
				}
				this.$GET(this.$API.ADMIN.AdminQueryMovie, {
					size : this.tablePageTotal,
					page : this.tablePageSize,
          status: this.status,
          name: this.input,
					startTime: startTime,
					endTime: endTime
				})
				.then(res => {
					this.tableData = res.data.details
					this.loading = false
				})
				.catch(err => {
					this.loading = false
				})
			},
			submit(){
				let data = this.userInfo
				this.$POST(this.$API.ADMIN.AdminInsertUpdateMovie, data)
				.then(res => {
					if(this.userInfo.userUpdate){
						this.$message.success('修改成功')
					}else {
						this.$message.success('添加成功')
					}
					this.userInfo = {}
					this.imageUrl = ''
					this.loadData()
					this.dialogFormVisible = false
				})
			},
			qx(){
				this.userInfo = {}
				this.imageUrl = ''
				this.dialogFormVisible = false
			},
			edit(data){
			  this.title = '修改电影信息'
			  this.dialogFormVisible = true
			  this.userInfo = data
			  this.userInfo.userUpdate = true
				this.userInfo.deleted = 0
				this.imageUrl = this.userInfo.imgUrl
				this.userInfo.labels = []
			  this.userInfo.statueTmp = this.userInfo.status == 'ACTIVE' ? true : false
			  this.userInfo.roleTmp = this.userInfo.role == 0 ? '普通客户' : ''
				console.log(this.userInfo)
			},
			add(){
			  this.userInfo = {
			    userUpdate: false,
					deleted : 0,
					labels: [],
			  }
			  this.title = '添加电影'
			  this.dialogFormVisible = true
			},
			handleAvatarSuccess(res, file) {
				if(res.code == 0){
					this.userInfo.imgUrl = res.data.fileUrl
				}
			  this.imageUrl = URL.createObjectURL(file.raw)
      },
			beforeAvatarUpload(file) {
				this.uploadData.fileName = file.name
      },
	  },
		mounted() {
			this.uploadUrl = this.$API.UPLOADURL
			this.loadData()
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
	.el-date-editor{
		margin-left: 0rem;
	}
	.block {
	  background-color: #FFFFFF;
	  padding: 0.9375rem 0rem;
	}
	.el-checkbox.is-bordered+.el-checkbox.is-bordered {
		margin-left: 0rem;
	}
	.avatar-uploader .el-upload {
	  border: 1px dashed #d9d9d9;
	  border-radius: 6px;
	  cursor: pointer;
	  position: relative;
	  overflow: hidden;
	}
	.avatar-uploader .el-upload:hover {
	  border-color: #409EFF;
	}
	.avatar-uploader-icon {
	  font-size: 28px;
	  color: #8c939d;
	  width: 178px;
	  height: 178px;
	  line-height: 178px;
	  text-align: center;
	}
	.avatar {
	  width: 178px;
	  height: 178px;
	  display: block;
	}
</style>