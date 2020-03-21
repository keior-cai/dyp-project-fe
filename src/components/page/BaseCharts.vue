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
<!--            <div class="schart-box">
            <div class="content-title">下单用户类型</div>
            <schart class="schart" canvasId="pie" ref="chart2" :data="data2" type="pie" :options="options3"></schart>
            </div>
            <div class="schart-box">
            <div class="content-title">电影</div>
            <schart class="schart" canvasId="ring" ref="chart3" :data="data2" type="ring" :options="options4"></schart>
            </div> -->
        </div>
    </div>
</template>

<script>
    import Schart from 'vue-schart'
    import moment from 'moment/moment'
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
                title: '近7天交易订单数量',
                autoWidth: true,
                showValue: false,
                bgColor: '#F9EFCC',
                fillColor: '#00887C',
                contentColor: 'rgba(46,199,201,0.3)',
                yEqual: 7
            },
            options2: {
                title: '近7天交易额',
                bgColor: '#D5E4EB',
                titleColor: '#00887C',
                fillColor: 'red',
                contentColor: 'rgba(46,199,201,0.3)'
            },
            options3: {
                title: '近7天下单用户类型',
                bgColor: '#829dca',
                titleColor: '#ffffff',
                legendColor: '#ffffff',
                radius: 120
            },
            options4: {
                title: '近7天电影销售',
                bgColor: '#829daa',
                titleColor: '#ffffff',
                legendColor: '#ffffff',
                radius: 120,
                innerRadius:80
            },
          }
       },
			methods:{
        formatTime(time, format = 'YYYY.MM.DD HH:mm:ss') {
          if(time == null) {
            return "1970.01.01"
          }
          return moment(time).format(format)
        },
				getCharts(){
					this.$GET(this.$API.ADMIN.AdminGetIndexCharts, {}).then(res => {
						let list = res.data
						for(let i = 0; i < list.length; i++){
							let obj = list[i]
							this.$set(this.data1, i, {'name': this.formatTime(obj.time, 'DD'), 'value': obj.count})
							this.$set(this.data2, i, {'name': this.formatTime(obj.time, 'DD'), 'value': obj.total})
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