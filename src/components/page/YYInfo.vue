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
						<el-form-item label="是否开启回调">
              <el-switch
                style="display: block"
                v-model="userInfo.isOpen"
                active-value="0"
                inactive-value="1"
                active-color="#13ce66">
              </el-switch>
						</el-form-item>
            <el-form-item label="回调地址">
              <el-input
                :disabled="userInfo.isOpen == 1"
                v-model="userInfo.openUrl"
                placeholder="请输回调地址"/>
						</el-form-item>
            <el-form-item label="启用openapi">
              <el-switch
                style="display: block"
                v-model="openapi"
                active-value="0"
                inactive-value="1"
                :change="change"
                active-color="#13ce66">
              </el-switch>
            </el-form-item>
					</el-form>
          <el-form-item label="回调token">
              <el-input
                disabled
                style="display: block"
                v-model="userInfo.token"
                active-value="0"
                inactive-value="1"
                active-color="#13ce66">
              </el-input>
            </el-form-item>
          </el-form>
					<div slot="footer" class="dialog-footer">
					  <el-button type="primary" @click="submit">确 定</el-button>
					</div>
        </div>
    </div>
</template>

<script>
    import VueCropper  from 'vue-cropperjs';
    export default {
        name: 'YYInfo',
        data: function(){
            return {
                defaultSrc: require('../../assets/img/img.jpg'),
                fileList: [],
                imgSrc: '',
                cropImg: '',
                dialogVisible: false,
								userInfo: {},
                openapi: false
            }
        },
        components: {
            VueCropper
        },
        methods:{
            setImage(e){
                const file = e.target.files[0];
                if (!file.type.includes('image/')) {
                    return;
                }
                const reader = new FileReader();
                reader.onload = (event) => {
                    this.dialogVisible = true;
                    this.imgSrc = event.target.result;
                    this.$refs.cropper && this.$refs.cropper.replace(event.target.result);
                };
                reader.readAsDataURL(file);
            },
            cropImage () {
                this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
            },
            cancelCrop(){
                this.dialogVisible = false
                this.cropImg = this.defaultSrc
            },
            imageuploaded(res) {
                console.log(res)
            },
            handleError(){
                this.$notify.error({
                    title: '上传失败',
                    message: '图片上传接口上传失败，可更改为自己的服务器接口'
                });
            },
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
							let data = JSON.parse(JSON.stringify(this.userInfo))
							data.info = JSON.stringify(data.info)
							this.$POST(this.$API.ADMIN.AdminInsertUpdate, data).then(res => {
								this.$message.success('修改成功')
							})
						},
            change(flag){
              if(flag){
                this.$GET(this.$API.ADMIN.AdminCreateToken, {}).then(res=> {
                  this.userInfo.token = res.data
                })
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