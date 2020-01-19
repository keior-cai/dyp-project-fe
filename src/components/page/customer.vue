<template>
  <div>
		<div class="table-header">
			 <el-button type="primary" plain @click="add()"><i class="el-icon-plus"></i>添加客户</el-button>
       <el-button type="danger" plain><i class="el-icon-delete"></i>批删除客户</el-button>
		</div>
		<el-table
		  ref="multipleTable"
		  :data="tableData"
		  tooltip-effect="dark"
      border
		  style="width: 100%; background-color: #FFFFFF;"
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
        prop="status"
        label="状态"
        :filters="[{ text: '正常', value: 0 }, { text: '禁用', value: 1 }]"
        :filter-method="filterTag"
        filter-placement="bottom-end">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.status == 0  ? 'success' : 'danger'"
              disable-transitions>
              <span v-if="scope.row.status == 0">正常</span>
              <span v-if="scope.row.status == 1">禁用</span>
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
            sortable>
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{scope.row.updateTime}}</span>
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
        prop="ip"
        label="上次登录IP"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        label="操作"
        fixed="right"
        highlight-current-row
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
              content="删除"
              placement="right">
              <el-button 
                type="danger" 
                icon="el-icon-delete"
                size="mini"
                @click="del(scope.row)"/>
            </el-tooltip>
            <el-tooltip
              class="item" 
              effect="dark" 
              content="激活"  
              placement="right">
              <el-button 
                v-if="scope.row.status == 1"
                type="primary" 
                size="mini"
                icon="el-icon-s-promotion"
                @click="play(scope.row)"/>
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
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input 
            v-model="userInfo.userName" 
            autocomplete="off" 
            placeholder="请输入用户名"
            maxlength="20"
            show-word-limit
            :disabled="userInfo.userName"/>
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input
            v-model="userInfo.name"
            maxlength="20"
            show-word-limit
            autocomplete="off" 
            placeholder="请输姓名"/>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input 
            placeholder="请输入密码"
            type="password"
            v-model="userInfo.password" 
            prop="password"
            :show-password="showPassword" />
        </el-form-item>
        <el-form-item 
          label="确认密码" 
          :label-width="formLabelWidth">
          <el-input 
            placeholder="请再次输入密码" 
            type="password"
            prop="password2"
            v-model="userInfo.password2" 
            :show-password="showPassword"/>
        </el-form-item>
        <el-form-item label="用户状态">
            <el-switch v-model="userInfo.status"/>
        </el-form-item>
        <el-form-item label="用户类型">
            <el-select v-model="userInfo.role" placeholder="请选择">
                <el-option key="普通客户" label="普通客户" value="0"></el-option>
            </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
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
				input3: '',
        multipleSelection: [],
        page : 1,
        dialogFormVisible: false,
        showPassword: true,
        userInfo: {
          name : '',
          userName: '',
          password: '',
          password2: ''
          
        },
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
        this.$GET(this.$API.ADMIN.AdminLoadCustomer, {page : this.page, size : this.tablePageSize})
        .then(res => {
          this.tablePageTotal = res.data.total
          this.tableData = res.data.details
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
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
			handleSizeChange(val) {
			  this.loadData(this.page, this.tablePageSize)
			},
			handleCurrentChange(val) {
				this.page = val
        this.loadData(val, tablePageSize)
      },
      edit(data){
        this.title = '修改客户信息'
        this.dialogFormVisible = true
        this.userInfo = data
      },
      add(){
        this.title = '添加客户'
        this.dialogFormVisible = true
      },
      del(data) {
        this.userInfo = data
      },
      play(data){
        
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
  .table-header {
    background-color: #FFFFFF;
    padding: 0.9375rem 0.625rem;
    text-align: right;
  }
  .block {
    background-color: #FFFFFF;
    padding: 0.9375rem 0rem;
  }
</style>
