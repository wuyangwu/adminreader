<template>
  <div class="zhuye">
    <div class="top" style="">
      <div class="top1" style="margin-top: 15px;width: 100%;font-size: 21px ">
        <img style="width: 40px; height: 35px" src="../../assets/image/tianqi.png" />
        <span style="margin-left: 10px;margin-top: -6px">{{names}}，欢迎使用今天您阅读了吗？后台管理系统</span>
      </div>
      <div class="top2" style="margin-top: 20px;width: 100%;font-size: 16px">
        <img style="width: 30px;height: 25px;margin-left: 5px" src="../../assets/image/clocks.png">
        <span style="margin-left: 18px" >您上次登录的时间：{{createTimes}}</span>
      </div>
    </div>
    <el-divider></el-divider>
    <div class="show clearfix" style="width: 100%">
      <div id="myChart" :style="{width: '1000px', height: '500px'}"></div>
    </div>
  </div>
</template>

<script>

  import { getornonumber } from '../../util/httpAxios'
  export default {
    name: 'zhuye',
    data() {
      return {
        names: 'xxx',
        createTimes: ''
      }
    },
    mounted () {
      this.drawLine()
      this.changesName()
    },
    methods: {
      changesName() {
        var info = JSON.parse(localStorage.getItem('info'))
        this.names = info.username
        const url = `/api/houtai/userlogintime/select/${info.id}`
        getornonumber(url).then(res => {
          this.createTimes = res.createTime
          // console.log(this.createTime)
          this.createTimes = new Date(parseInt(this.createTimes)).toLocaleString().replace(/:\d{1,2}$/, ' ')
        })
      },
      drawLine() {
        // 基于准备好的dom，初始化echarts实例
        const myChart = this.$echarts.init(document.getElementById('myChart'))
        // 绘制图表
        var legendData = []
        var seriesData = []
        var data = []
        var selected = {}
        getornonumber('/api/houtai/book/slect/count/').then(res => {
          data = res
          for (var i = 0; i < data.length; i++) {
            legendData.push(data[i].name)
            seriesData.push({ name: data[i].name, value: data[i].booklistsize })
            selected[data[i].name] = true
          }
          myChart.setOption({
            title: {
              text: '分类图书汇总',
              subtext: '今天你阅读了吗？',
              left: 'center'
            },
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
              type: 'scroll',
              orient: 'vertical',
              right: 10,
              top: 20,
              bottom: 20,
              data: legendData,

              selected: selected
            },
            series: [
              {
                name: '分类标签',
                type: 'pie',
                radius: '55%',
                center: ['30%', '50%'],
                data: seriesData,
                emphasis: {
                  itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]
          })
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/style/gol";
  .zhuye{
    width: 100%;
    height: 100%;
    .top{
      width: 100%;
      height: 100px;
      display: flex;
      flex-direction: column;
      .top1{
        @include UandDCenter;
      }
      .top2{
        @include UandDCenter;
      }
      //@include UandDCenter;
    }
  }
</style>
