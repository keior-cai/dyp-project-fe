<template>
    <div>
        <div class="container">
					<el-form :model="userInfo" status-icon ref="ruleForm" label-width="100px">
					  <el-form-item label="影院名称">
					    <el-input 
					      v-model="userInfo.info.name" 
					      autocomplete="off" 
								disabled
					      placeholder="请输入电影名称"/>
					  </el-form-item>
					  <el-form-item label="影院地址">
					    <el-input
					      v-model="userInfo.info.address"
								 disabled
					      placeholder="请输标题"/>
					  </el-form-item>
					  <el-form-item label="联系电话">
					    <el-input 
					      placeholder="请输入单价"
					      type="phnoe"
								disabled
					      v-model="userInfo.phone" />
					  </el-form-item>
						<el-form-item label="营业状态">
							<el-select
							  v-model="userInfo.status"
							  placeholder="请选择">
							    <el-option
							      key="ACTIVE"
							      label="营业"
							      :value="'ACTIVE'">
                    营业
							    </el-option>
							    <el-option
							      key="NOT_ACTIVE"
							      label="休息"
							      :value="'NOT_ACTIVE'">
                    休息
							    </el-option>
							  </el-select>
						</el-form-item>
            <el-form-item label="影院介绍">
              <el-input
                type="textarea"
                style="width: 16rem"
                placeholder="请填写影院介绍"
                v-model="userInfo.info.yyInfo"
                maxlength="50"
                show-word-limit
              />
            </el-form-item>
						<el-form-item label="是否开启回调">
              <el-switch
                style="display: block"
                v-model="userInfo.isOpen"
                :active-value='1'
                :inactive-value='0'
                active-color="#13ce66">
              </el-switch>
						</el-form-item>
            <el-form-item label="回调地址">
              <el-input
                :disabled="userInfo.isOpen == 0"
                v-model="userInfo.openUrl"
                placeholder="请输回调地址"/>
						</el-form-item>
            <el-form-item label="启用openapi">
              <el-switch
                style="display: block"
                v-model="openapi"
                @change="change"
                active-color="#13ce66">
              </el-switch>
            </el-form-item>
            <el-form-item label="回调token">
              <el-input
                disabled
                style="display: block"
                v-model="userInfo.token"
                active-color="#13ce66">
              </el-input>
            </el-form-item>
          </el-form>
					<div slot="footer" class="dialog-footer">
					  <el-button type="primary"  :loading="isSubmit" @click="submit">确 定</el-button>
					</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'YYInfo',
        data: function(){
            return {
                defaultSrc: require('../../assets/img/img.jpg'),
                fileList: [],
                imgSrc: '',
                cropImg: '',
                dialogVisible: false,
								userInfo: {
                  info: {
                    name:''
                  }
                },
                yyInfo: '',
                openapi: false,
                isSubmit: false
            }
        },
        methods:{
						loadData () {
							this.$GET(this.$API.ADMIN.AdminUseInfo, {}).then(res => {
								this.userInfo = res.data 
								this.userInfo.info = JSON.parse(this.userInfo.info)
                if(this.userInfo.token){
                  this.openapi = true
                }
							})
						},
						submit () {
              this.isSubmit = true
							let data = JSON.parse(JSON.stringify(this.userInfo))
							data.info = JSON.stringify(data.info)
							this.$POST(this.$API.ADMIN.AdminInsertUpdate, data).then(res => {
								this.$message.success('修改成功')
                this.isSubmit = false
							})
						},
            change(flag){
              if(flag){
                this.$GET(this.$API.ADMIN.AdminCreateToken, {}).then(res=> {
                  this.userInfo.token = res.data
                })
              }else{
                this.userInfo.token = ''
              }
            }
        },
        mounted(){
						this.loadData()
        }
    }
</script>

<style scoped>
    .el-input {
      width: 18.75rem;
    }
    .content-title{
        font-weight: 400;
        line-height: 50px;
        margin: 10px 0;
        font-size: 22px;
        color: #1f2f3d;
    }
    .pre-img{   
        width: 100px;
        height: 100px;
        background: #f8f8f8;
        border: 1px solid #eee;
        border-radius: 5px;
    }
    .crop-demo{
        display: flex;
        align-items: flex-end;
    }
    .crop-demo-btn{
        position: relative;
        width: 100px;
        height: 40px;
        line-height: 40px;
        padding: 0 20px;
        margin-left: 30px;
        background-color: #409eff;
        color: #fff;
        font-size: 14px;
        border-radius: 4px;
        box-sizing: border-box;
    }
    .crop-input{
        position: absolute;
        width: 100px;
        height: 40px;
        left: 0;
        top: 0;
        opacity: 0;
        cursor: pointer;
    }
</style>