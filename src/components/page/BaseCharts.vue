<template>
    <div>
        <div class="container">
            <div class="schart-box">
                <div class="content-title">订单数量</div>
                <schart class="schart" canvasId="bar" ref="chart" :data="data1" type="bar" :options="options1"></schart>
            </div>
            <div class="schart-box">
            <div class="content-title">交易额</div>
            <schart class="schart" canvasId="line" ref="chart1" :data="data1" type="line" :options="options2"></schart>
            </div>
            <div class="schart-box">
            <div class="content-title">下单用户类型</div>
            <schart class="schart" canvasId="pie" ref="chart2" :data="data2" type="pie" :options="options3"></schart>
            </div>
            <div class="schart-box">
            <div class="content-title">电影</div>
            <schart class="schart" canvasId="ring" ref="chart3" :data="data2" type="ring" :options="options4"></schart>
            </div>
        </div>
    </div>
</template>

<script>
    import Schart from 'vue-schart';
    export default {
        name: 'basecharts',
        components: {
            Schart
        },
        data() {
          return {
            data1:[
            ],
            data2 : [
            ],
            options1: {
                title: '某商店近年营业总额',
                autoWidth: true,   // 设置宽高自适应
                showValue: false,
                bgColor: '#F9EFCC',
                fillColor: '#00887C',
                contentColor: 'rgba(46,199,201,0.3)',
                yEqual: 7
            },
            options2: {
                title: '某商店近年营业总额',
                bgColor: '#D5E4EB',
                titleColor: '#00887C',
                fillColor: 'red',
                contentColor: 'rgba(46,199,201,0.3)'
            },
            options3: {
                title: '某商店各商品年度销量',
                bgColor: '#829dca',
                titleColor: '#ffffff',
                legendColor: '#ffffff',
                radius: 120
            },
            options4: {
                title: '某商店各商品年度销量',
                bgColor: '#829daa',
                titleColor: '#ffffff',
                legendColor: '#ffffff',
                radius: 120,
                innerRadius:80
            },
          }
       },
			methods:{
				getCharts(){
					this.$GET(this.$API.ADMIN.OrderStatics, {}).then(res => {
            if(res.data != null) {
             this.$set(this, 'data1', res.data)
            }else {
              this.$set(this, 'data1', [])
            }
					})
				}
			},
			mounted() {
				this.getCharts()
			}
    }
</script>

<style scoped>
.schart-box{
    display: inline-block;
    margin: 20px;
}
    .schart{
        width: 500px;
        height: 400px;
    }
    .content-title{
        clear: both;
        font-weight: 400;
        line-height: 50px;
        margin: 10px 0;
        font-size: 22px;
        color: #1f2f3d;
    }
    
</style>