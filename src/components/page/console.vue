<template>
	<div>
		<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
		  <el-submenu index="2" :style="{'float':'right'}">
		    <template slot="title">我的工作台</template>
		    <el-menu-item index="2-1">选项1</el-menu-item>
		    <el-menu-item index="2-2">选项2</el-menu-item>
		    <el-menu-item index="2-3">退出登录</el-menu-item>
		  </el-submenu>
		</el-menu>
		<el-row :gutter="20">
			<el-col :offset="2" :span="10">
				<div style="background: #0000FF; height: '200px';">5555</div>
			</el-col>
			<el-col md="10" :span="10">
				<div style="background: #0000FF;">5555</div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	  export default {
	    data() {
	      return {
	        activeIndex: '1',
	        activeIndex2: '1'
	      }
	    },
	    methods: {
	      handleSelect(key, keyPath) {
	        console.log(key, keyPath);
	      }
	    }
	  }
</script>

<style>
	
</style>
