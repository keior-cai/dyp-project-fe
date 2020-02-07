<template>
    <div>
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="头像">
											<el-upload
												class="avatar-uploader"
												:action="uploadUrl"
												:show-file-list="false"
												:data="uploadData"
												name="location"
												:on-success="handleAvatarSuccess"
												:before-upload="beforeAvatarUpload"
											>
												<img :size="90" v-if="userInfo.imgUrl" :src="userInfo.imgUrl"></img>
											</el-upload>
										</el-form-item>
										<el-form-item label="密码">
											<el-input 
												auto-complete="off"
												type="password"
												v-model="userInfo.password"
											></el-input>
										</el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">表单提交</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'baseform',
    data() {
        return {
					userInfo: {},
					uploadData: {
						supportType: 'local',
						serveName: 'movie',
						fileName: '',
					},
					uploadUrl: '',
        }
    },
    methods: {
        onSubmit() {
            this.$POST(this.$API.ADMIN.AdminInsertUpdate, this.userInfo).then(res => {
							this.$message.success('修改成功')
						})
        },
				loadData () {
					this.$GET(this.$API.ADMIN.AdminUseInfo, {}).then(res => {
						this.userInfo = res.data
						this.userInfo.imgUrl = this.userInfo.avatar
					})
				},
				handleAvatarSuccess(res, file) {
						if(res.code == 0){
							this.userInfo.avatar = res.data.fileUrl
						}
					  this.userInfo.imgUrl = URL.createObjectURL(file.raw)
				},
				beforeAvatarUpload(file) {
					this.uploadData.fileName = file.name
				},
    },
		mounted() {
			this.loadData()
			this.uploadUrl = this.$API.UPLOADURL
		}
};
</script>