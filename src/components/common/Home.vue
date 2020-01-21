<template>
    <div class="wrapper">
        <v-head></v-head>
        <v-sidebar :NavItem="items"></v-sidebar>
        <div class="content-box" :class="{'content-collapse':collapse}">
            <v-tags></v-tags>
            <div class="content">
                <transition name="move" mode="out-in">
                    <keep-alive :include="tagsList">
                        <router-view></router-view>
                    </keep-alive>
                </transition>
                <el-backtop target=".content"></el-backtop>
            </div>
        </div>
    </div>
</template>

<script>
import vHead from './Header.vue';
import vSidebar from './Sidebar.vue';
import vTags from './Tags.vue';
import bus from './bus';
export default {
    data() {
        return {
            tagsList: [],
            collapse: false,
            items: []
        }
    },
    components: {
        vHead,
        vSidebar,
        vTags
    },
    created() {
        bus.$on('collapse-content', msg => {
            this.collapse = msg
        })
        const userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
        if (userInfo.role == 1) {
          this.items = [
            {
                icon: 'el-icon-lx-home',
                index: 'SupperAdmin',
                title: '控制台'
            },
            {
                icon: 'el-icon-user-solid',
                index: 'WechatCustomer',
                title: '用户管理'
            },
            {
                icon: 'el-icon-s-custom',
                index: 'customer',
                title: '客户管理'
            },
            {
                icon: 'el-icon-s-tools',
                index: 'tabs',
                title: '系统设置',
            		subs: [
            			{
            				index: 'vip',
            				title: '邮件配置'
            			},
                  {
            				index: 'vip',
            				title: '短信配置'
            			},
            			{
            			    icon: 'el-icon-s-tools',
            			    index: 'Setting',
            			    title: '系统设置'
            			}
            		]
            }
          ]
        }else {
          this.items = [
                {
                    icon: 'el-icon-lx-home',
                    index: 'dashboard',
                    title: '控制台'
                },
                {
                    icon: 'el-icon-lx-copy',
                    index: 'tabs',
                    title: '客户管理',
										subs: [
											{
												index: 'vip',
												title: 'VIP管理'
											},
											{
												index: 'customer',
												title: '客户管理'
											},
										]
                },
								{
								    icon: 'el-icon-lx-copy',
								    index: 'order',
								    title: '订单管理'
								},
                {
                    icon: 'el-icon-lx-calendar',
                    index: '3',
                    title: '影院管理',
                    subs: [
                        {
                            index: 'space',
                            title: '场地管理'
                        },
                        {
                            index: '3-2',
                            title: '电影管理',
                            subs: [
                                {
                                    index: 'movie',
                                    title: '电影管理'
                                },
                                // {
                                //     index: 'markdown',
                                //     title: '电影库存管理'
                                // },
                                {
                                    index: 'markdown',
                                    title: '电影排场'
                                }
                            ]
                        },
                        {
                            index: 'upload',
                            title: '影院信息'
                        }
                    ]
                },
								{
									icon: 'el-icon-pie-chart',
									index: 'statics',
									title: '数据统计',
									subs: [
										{
											index: 'userStatics',
											title: '用户统计',
										},
										{
											index: 'orderStatics',
											title: '电影统计',
										},
										{
										    icon: 'el-icon-pie-chart',
										    index: 'charts',
										    title: 'schart图表'
										}
									]
								},
                {
                    icon: 'el-icon-lx-warn',
                    index: '7',
                    title: '权限管理'
                }
            ]
        }
        
        // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
        bus.$on('tags', msg => {
            let arr = [];
            for (let i = 0, len = msg.length; i < len; i++) {
                msg[i].name && arr.push(msg[i].name)
            }
            this.tagsList = arr
        })
    }
};
</script>
