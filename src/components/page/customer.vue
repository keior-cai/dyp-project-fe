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
            range-separator="-"
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
        <el-button type="primary" plain @click="add()"><i class="el-icon-plus"></i>添加客户</el-button>
        <el-button type="danger" @click="delAll()" plain><i class="el-icon-delete"></i>批删除客户</el-button>
      </div>
		</div>
		<el-table
		  ref="multipleTable"
		  :data="tableData"
			v-loading="loading"
		  tooltip-effect="dark"
      border
		  style="width: 100%; background-color: #FFFFFF;"
			highlight-current-row
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
			  prop="phone"
			  label="手机号码">
			</el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        filter-placement="bottom-end">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.status == 'ACTIVE'  ? 'success' : 'danger'"
              disable-transitions>
              <span v-if="scope.row.status == 'ACTIVE'">正常</span>
              <span v-if="scope.row.status == 'NOT_ACTIVE'">禁用</span>
            </el-tag>
          </template>
      </el-table-column>
		  <el-table-column
		    label="用户类型"
		    show-overflow-tooltip>
        <template slot-scope="scope">
          <el-tag
            :type="'primary'">
            <span v-if="scope.row.role == 0">普通客户</span>
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
            label="上次登录时间"
						width="135"
						show-overflow-tooltip
            sortable>
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{scope.row.updateTime}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="创建时间"
				width="135"
        show-overflow-tooltip>
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{scope.row.createTime}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="ip"
        label="上次登录IP"
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
						  class="item" 
						  effect="dark" 
						  content="电影院信息"
						  placement="right">
						  <el-button 
						    type="success" 
						    icon="el-icon-more"
						    size="mini"
						    @click="info(scope.row)"/>
						</el-tooltip>
            <el-tooltip 
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
      <el-form :model="userInfo" status-icon :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="用户名">
          <el-input 
            v-model="userInfo.userName" 
            autocomplete="off" 
            placeholder="请输入用户名"
            maxlength="20"
            show-word-limit
            :disabled="userInfo.userUpdate"/>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input
            v-model="userInfo.name"
            maxlength="20"
            show-word-limit
            autocomplete="off" 
            placeholder="请输姓名"/>
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input
            v-model="userInfo.phone"
						type="phone"
            autocomplete="off" 
            placeholder="请输手机号码"/>
        </el-form-item>
        <el-form-item label="密码">
          <el-input 
            placeholder="请输入密码"
            type="password"
            v-model="userInfo.password" 
            prop="password"
            :show-password="showPassword" />
        </el-form-item>
        <el-form-item label="用户状态">
            <el-switch v-model="userInfo.statueTmp"/>
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
            callback();
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
        tableData: [],
				tablePageSize: 10,
				tablePageTotal: 0,
        currentPage: 1,
				input: '',
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
				movieInfo: {},
        date : [],
        ids : [],
				infoDialog: false,
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
        },
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end]);
            }
          }, 
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }, 
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        }
      }
    },
    methods: {
      loadData(startTime = '', endTime = '') {
				this.loading = true
        if(this.date) {
          startTime = this.date[0] ? this.date[0] + ' 00:00:00' : ''
          endTime = this.date[1] ? this.date[1] + ' 23:59:59' : ''
        }
        this.$GET(this.$API.ADMIN.AdminLoadCustomer, {
            page : this.page,
            size : this.tablePageSize, 
            userName : this.input, 
            startTime : startTime,
            endTime : endTime,
            status : this.status
          })
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
        this.title = '修改客户信息'
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
        this.title = '添加客户'
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
      submit(){
        this.$refs.ruleForm.validate(res => {
          if(res) {
            const data = {
              id : this.userInfo.id,
              status: this.userInfo.statueTmp ? 'ACTIVE' : 'NOT_ACTIVE',
              deleted : 0,
              role : 0,
              userName : this.userInfo.userName,
              name : this.userInfo.name,
              password : this.userInfo.password,
							phone: this.userInfo.phone
            }
            this.$POST(this.$API.ADMIN.AdminInsertUpdate, data)
            .then(res => {
               this.$message.success('修改成功')
               this.loadData()
               this.dialogFormVisible = false
            })
          }
        })
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
