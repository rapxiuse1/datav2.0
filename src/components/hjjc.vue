<template>
  <div class="bg" style="width:100%;height:100%">
    <m-header hover="2"></m-header>
    <div class="content">
      <div class="left">
        <div class="box1">
          <div class="selectBox2">
            <span><i></i></span>
            <el-select
              v-model="value"
              placeholder="请选择"
              style="width: 25%;"
              @change="select(value)"
            >
              <el-option
                v-for="item in province"
                :key="item.id"
                :label="item.name"
                :value="item.code"
              >
              </el-option>
            </el-select>
            <el-select
              v-model="value1"
              placeholder="请选择"
              style="width: 25%;"
              @change="select1(value1)"
            >
              <el-option
                v-for="item in cities"
                :key="item.id"
                :label="item.name"
                :value="item.code"
              >
              </el-option>
            </el-select>
            <el-select
              v-model="value2"
              placeholder="请选择"
              style="width: 25%;"
              @change="select2(value2)"
            >
              <el-option
                v-for="item in areas"
                :key="item.id"
                :label="item.name"
                :value="item.code"
              >
              </el-option>
            </el-select>
          </div>
          <div class="searchBox2">
            <el-input placeholder="搜索地址" v-model="keyvalue"> </el-input>
            <el-button type="primary" @click="search(keyvalue)">搜索</el-button>
          </div>
          <div class="jdAll">
            <div
              class="jd"
              v-for="(item, index) in jdList"
              :key="index"
              @click="streetSearch(item.code)"
            >
              <span class="name">{{ item.name }}</span>
              <span class="num">{{ item.num }}</span>
              <img src="@/assets/image/jdicon.png" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div class="center">
        <div class="box2">
          <div class="title">监测值</div>
          <img
            class="titlebg"
            style="left: 36%;"
            src="@/assets/image/titlebg.png"
            alt=""
          />
          <div class="box2-1">
            <div class="box2-1-1">
              <p class="p1" v-if="this.jcList[0].number">
                {{ this.jcList[0].number }}
              </p>
              <p class="p1" v-else>0</p>
              <div class="staright"></div>
              <p class="p2">{{ this.jcList[0].name }}</p>
            </div>
            <img src="@/assets/image/wd.png" alt="" />
          </div>
          <div class="box2-1">
            <div class="box2-1-1">
              <p class="p1" v-if="this.jcList[1].number">
                {{ this.jcList[1].number }}
              </p>
              <p class="p1" v-else>0</p>
              <div class="staright"></div>
              <p class="p2">{{ this.jcList[1].name }}</p>
            </div>
            <img src="@/assets/image/sd.png" alt="" />
          </div>
          <div class="box2-1">
            <div class="box2-1-1">
              <p class="p1" v-if="this.jcList[2].number">
                {{ this.jcList[2].number }}
              </p>
              <p class="p1" v-else>0</p>
              <div class="staright"></div>
              <p class="p2">{{ this.jcList[2].name }}</p>
            </div>
            <img src="@/assets/image/gzqd.png" alt="" />
          </div>
          <div class="box2-1">
            <div class="box2-1-1">
              <p class="p1" v-if="this.jcList[3].number">
                {{ this.jcList[3].number }}
              </p>
              <p class="p1" v-else>0</p>
              <div class="staright"></div>
              <p class="p2">{{ this.jcList[3].name }}</p>
            </div>
            <img src="@/assets/image/fs.png" alt="" />
          </div>
          <div class="box2-1">
            <div class="box2-1-1">
              <p class="p1" v-if="this.jcList[4].number">
                {{ this.jcList[4].number }}
              </p>
              <p class="p1" v-else>0</p>
              <div class="staright"></div>
              <p class="p2">{{ this.jcList[4].name }}</p>
            </div>
            <img src="@/assets/image/fsqd.png" alt="" />
          </div>
          <div class="box2-1">
            <div class="box2-1-1">
              <p class="p1" v-if="this.jcList[5].number">
                {{ this.jcList[5].number }}
              </p>
              <p class="p1" v-else>0</p>
              <div class="staright"></div>
              <p class="p2">{{ this.jcList[5].name }}</p>
            </div>
            <img src="@/assets/image/kqsd.png" alt="" />
          </div>
        </div>
        <div class="box3">
          <div class="title">PM指数</div>
          <img
            class="titlebg"
            style="left: 36%;"
            src="@/assets/image/titlebg.png"
            alt=""
          />
          <div id="echarts1"></div>
          <div id="echarts2"></div>
        </div>
        <div class="box4">
          <div class="title">空气清新指数</div>
          <img
            class="titlebg"
            style="left: 36%;"
            src="@/assets/image/titlebg.png"
            alt=""
          />
          <div id="echarts3"></div>
          <div class="date">{{ date }}</div>
          <img class="qxd" src="@/assets/image/qxd.png" alt="" />
          <div class="tips">差</div>
          <div class="tips1">接近海拔3500高度</div>
        </div>
      </div>
      <div class="right">
        <div class="box5">
          <div class="date1">{{ this.date1 }}</div>
          <div class="date2">{{ this.date2 }}</div>
          <img class="weatherImg" :src="this.weatherImg" alt="" />
          <div class="temp">
            <p style="margin-top: 0;">
              当前温度: <span>{{ this.now.temp }}°C</span>
            </p>
            <p>
              体感温度: <span>{{ this.now.feels_like }}°C</span>
            </p>
            <p>
              相对湿度: <span>{{ this.now.rh }}%</span>
            </p>
          </div>
          <div class="temp1">
            <p style="margin-top: 0;">{{ this.now.text }}</p>
            <p>
              <span>{{ this.now.wind_dir }}</span>
              <span>{{ this.now.wind_class }}</span>
            </p>
          </div>
          <div class="tqList">
            <div class="dayList" v-for="(item, index) in tqList" :key="index">
              <div class="day">
                <p>{{ item.week }}</p>
                <p>{{ item.date }}</p>
                <p><img :src="item.text_day_icon" alt="" /></p>
                <p>{{ item.text_day }}</p>
                <p>{{ item.high }}°C</p>
              </div>
              <div class="night">
                <p>{{ item.low }}°C</p>
                <p><img img :src="item.text_night_icon" alt="" /></p>
                <p>{{ item.text_night }}</p>
                <p>{{ item.wd_day }}</p>
                <p>{{ item.wc_night }}</p>
              </div>
            </div>
          </div>
          <div id="echarts5"></div>
        </div>
        <div class="box6">
          <div class="title">PM动态监测图</div>
          <img
            class="titlebg"
            style="left: 39%;"
            src="@/assets/image/titlebg.png"
            alt=""
          />
          <div id="echarts4"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MHeader from "@/components/header/header.vue";
export default {
  data() {
    return {
      date: "",
      date1: "",
      date2: "",
      province: [],
      value: "广东",
      cities: [],
      value1: "广州",
      areas: [],
      value2: "番禺",
      input: "",
      jdList: [],
      jcList: [],
      tqList: [],
      location: [],
      now: [],
      weatherImg: "",
      keyvalue: "",
      weeks: [],
      weeksHight: [],
      weeksLow: [],
      pm1: "",
      pm2: "",
      areaCode: ""
    };
  },
  created() {
    setTimeout(() => {
      this.initCharts1(); //初始化图表
      this.initCharts2();
      this.initCharts3();
      this.initCharts4();
    }, 1500);
  },
  mounted() {
    this.initArea();
    this.select(440000); //初始化广州联动
    this.select1(440100);
    this.select2(440113);
    this.initweather(440113007);
    this.initData(440113007);
    this.showTime1();
    this.showTime2();
    setInterval(() => {
      this.showTime();
      this.showTime1();
    }, 1000);
  },
  methods: {
    initArea() {
      //获取省级地名
      this.$axios({
        url: "api/v1/environment/area?code=000000",
        method: "get",
        params: {}
      }).then(res => {
        this.province = res.data.data.area_list;
      });
    },
    initData(n) {
      let code =
        "api/v1/environment/smartlamp/capablities/count?street_code=" + n;
      //获取属性值
      this.$axios({
        url: code,
        method: "get",
        params: {}
      }).then(res => {
        this.jcList = res.data.data.count_list;
        this.pm1 = res.data.data.pm10_t_v_list;
        this.pm2 = res.data.data.pm25_t_v_list;
      });
    },
    initweather(n) {
      let code = "api/v1/environment/weather?street_code=" + n;
      //获取天气数据
      this.$axios({
        url: code,
        method: "get",
        params: {}
      }).then(res => {
        this.weeks = [];
        this.weeksHight = [];
        this.weeksLow = [];
        this.tqList = res.data.data.forecasts;
        for (let i = 0; i < this.tqList.length; i++) {
          this.weeks.push(this.tqList[i].week);
          this.weeksHight.push(this.tqList[i].high);
          this.weeksLow.push(this.tqList[i].low);
        }
        this.location = res.data.data.location;
        this.now = res.data.data.now;
        this.weatherImg = this.now.text_icon;
      });
    },
    select(value) {
      let code = "api/v1/environment/area?code=" + value;
      //获取市级地名
      this.$axios({
        url: code,
        method: "get",
        params: {}
      }).then(res => {
        this.cities = res.data.data.area_list;
      });
    },
    select1(value1) {
      let code = "api/v1/environment/area?code=" + value1;
      //获取区级地名
      this.$axios({
        url: code,
        method: "get",
        params: {}
      }).then(res => {
        this.areas = res.data.data.area_list;
      });
    },
    select2(value2) {
      this.areaCode = value2;
      let code = "api/v1/environment/area?code=" + value2;
      //获取街道名
      this.$axios({
        url: code,
        method: "get",
        params: {}
      }).then(res => {
        this.jdList = res.data.data.area_list;
      });
    },
    streetSearch(n) {
      this.initData(n);
      this.initweather(n);
    },
    search(n) {
      let code = "api/v1/environment/area?code=" + this.areaCode;
      //精确查找街道名
      this.$axios({
        url: code,
        method: "get",
        params: { keyword: n }
      }).then(res => {
        if (res.status == 200) {
          this.jdList = res.data.data.area_list;
        } else {
          alert(res.data.msg);
        }
      });
    },
    showTime() {
      var d = new Date();
      var year = d.getFullYear();
      var month = d.getMonth() + 1;
      var day = d.getDate();
      var hour = d.getHours();
      var minute = d.getMinutes();
      var second = d.getSeconds();
      this.date =
        year +
        "-" +
        month +
        "-" +
        day +
        " " +
        hour +
        (minute < 10 ? ":0" : ":") +
        minute +
        (second < 10 ? ":0" : ":") +
        second;
    },
    showTime1() {
      var d = new Date();
      var year = d.getFullYear();
      var month = d.getMonth() + 1;
      var day = d.getDate();
      var hour = d.getHours();
      var minute = d.getMinutes();
      var second = d.getSeconds();
      this.date1 =
        year +
        "-" +
        month +
        "-" +
        day +
        " " +
        hour +
        (minute < 10 ? ":0" : ":") +
        minute +
        (second < 10 ? ":0" : ":") +
        second;
    },
    showTime2() {
      this.date2 = new Date().toDateString();
    },
    initCharts1() {
      let myChart1 = this.$echarts.init(document.getElementById("echarts1"));
      let value = 55.33;
      let title = "ug/m³";
      let int = this.jcList[6].number;
      let int1 = this.jcList[7].number;
      myChart1.setOption({
        title: {
          text: "{a|" + int + "}{c|" + title + "}",
          x: "center",
          y: "center",
          textStyle: {
            rich: {
              a: {
                fontSize: 24,
                color: "#29EEF3"
              },
              c: {
                fontSize: 18,
                color: "#29EEF3",
                padding: [5, 0]
              }
            }
          }
        },
        series: [
          {
            type: "gauge",
            radius: "60%",
            clockwise: false,
            startAngle: "90",
            endAngle: "-269.9999",
            splitNumber: 25,
            detail: {
              offsetCenter: [0, -20],
              formatter: " "
            },
            pointer: {
              show: false
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: [
                  [0, "#2CFAFC"],
                  [52 / 100, "#1DE2A4"],
                  [1, "rgba(32,187,252,0.15)"]
                ],
                width: 30
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: true,
              length: 32,
              lineStyle: {
                color: "#051F54",
                width: 6
              }
            },
            axisLabel: {
              show: false
            }
          },
          {
            type: "pie",
            name: "内层细圆环",
            radius: ["43%", "45%"],
            hoverAnimation: false,
            clockWise: false,
            itemStyle: {
              normal: {
                color: "#0C355E"
              }
            },
            label: {
              show: false
            },
            data: [100]
          },
          {
            type: "pie",
            name: "内层环",
            radius: [0, "43%"],
            hoverAnimation: false,
            clockWise: false,
            itemStyle: {
              normal: {
                color: "#02163F"
              }
            },
            label: {
              show: false
            },
            data: [100]
          }
        ]
      });
      let myChart2 = this.$echarts.init(document.getElementById("echarts2"));
      myChart2.setOption({
        title: {
          text: "{a|" + int1 + "}{c|" + title + "}",
          x: "center",
          y: "center",
          textStyle: {
            rich: {
              a: {
                fontSize: 24,
                color: "#29EEF3"
              },
              c: {
                fontSize: 18,
                color: "#29EEF3",
                padding: [5, 0]
              }
            }
          }
        },
        series: [
          {
            type: "gauge",
            radius: "60%",
            clockwise: false,
            startAngle: "90",
            endAngle: "-269.9999",
            splitNumber: 25,
            detail: {
              offsetCenter: [0, -20],
              formatter: " "
            },
            pointer: {
              show: false
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: [
                  [0, "#2CFAFC"],
                  [52 / 100, "#1DE2A4"],
                  [1, "rgba(32,187,252,0.15)"]
                ],
                width: 30
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: true,
              length: 32,
              lineStyle: {
                color: "#051F54",
                width: 6
              }
            },
            axisLabel: {
              show: false
            }
          },
          {
            type: "pie",
            name: "内层细圆环",
            radius: ["43%", "45%"],
            hoverAnimation: false,
            clockWise: false,
            itemStyle: {
              normal: {
                color: "#0C355E"
              }
            },
            label: {
              show: false
            },
            data: [100]
          },
          {
            type: "pie",
            name: "内层环",
            radius: [0, "43%"],
            hoverAnimation: false,
            clockWise: false,
            itemStyle: {
              normal: {
                color: "#02163F"
              }
            },
            label: {
              show: false
            },
            data: [100]
          }
        ]
      });
    },
    initCharts2() {
      let myChart3 = this.$echarts.init(document.getElementById("echarts3"));
      let dataArr = [
        {
          value: 460,
          name: "空气清新指数"
        }
      ];
      let color = new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
        {
          offset: 0,
          color: "#5CF9FE" // 0% 处的颜色
        },
        {
          offset: 0.17,
          color: "#468EFD" // 100% 处的颜色
        },
        {
          offset: 0.9,
          color: "#468EFD" // 100% 处的颜色
        },
        {
          offset: 1,
          color: "#5CF9FE" // 100% 处的颜色
        }
      ]);
      let colorSet = [
        [0.91, color],
        [1, "#15337C"]
      ];
      let rich = {
        white: {
          fontSize: 20,
          color: "#fff",
          fontWeight: "500",
          padding: [-80, 0, 0, 10]
        },
        bule: {
          fontSize: 25,
          fontFamily: "DINBold",
          color: "#fff",
          fontWeight: "700",
          padding: [-80, 0, 0, 0]
        },
        radius: {
          width: 350,
          height: 80,
          // lineHeight:80,
          fontSize: 18,
          color: "#fff",
          borderRadius: 5,
          textAlign: "center"
        },
        size: {
          height: 400,
          padding: [-200, 0, 0, 0]
        }
      };
      myChart3.setOption({
        tooltip: {
          formatter: "{a} <br/>{b} : {c}%"
        },

        series: [
          {
            //内圆
            type: "pie",
            radius: "85%",
            center: ["50%", "50%"],
            z: 0,
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.RadialGradient(
                  0.5,
                  0.5,
                  1,
                  [
                    {
                      offset: 0,
                      color: "rgba(17,24,43,0)"
                    },
                    {
                      offset: 0.5,
                      // color: '#1E2B57'
                      color: "rgba(28,42,91,.6)"
                    },
                    {
                      offset: 1,
                      color: "#141C33"
                      // color:'rgba(17,24,43,0)'
                    }
                  ],
                  false
                ),
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                }
              }
            },
            hoverAnimation: false,
            label: {
              show: false
            },
            tooltip: {
              show: false
            },
            data: [100]
          },
          {
            type: "gauge",
            name: "外层辅助",
            radius: "74%",
            startAngle: "225",
            endAngle: "-45",
            splitNumber: "100",
            pointer: {
              show: false
            },
            detail: {
              show: false
            },
            data: [
              {
                value: 1
              }
            ],
            // data: [{value: 1, name: 90}],
            title: {
              show: true,
              offsetCenter: [0, 30],
              textStyle: {
                color: "#fff",
                fontStyle: "normal",
                fontWeight: "normal",
                fontFamily: "微软雅黑",
                fontSize: 30
              }
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: [[1, "#00FFFF"]],
                width: 2,
                opacity: 1
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: true,
              length: 20,
              lineStyle: {
                color: "#051932",
                width: 0,
                type: "solid"
              }
            },
            axisLabel: {
              show: false
            }
          },
          {
            type: "gauge",
            radius: "70%",
            startAngle: "225",
            endAngle: "-45",
            pointer: {
              show: false
            },
            detail: {
              formatter: function(value) {
                let num = Math.round(value);
                return (
                  "{bule|" +
                  num +
                  "}{white|PPM}" +
                  "{size|" +
                  "}\n{radius|空气清新指数}"
                );
              },
              rich: rich,
              offsetCenter: ["0%", "0%"]
            },
            data: dataArr,
            title: {
              show: false
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: colorSet,
                width: 25,
                // shadowBlur: 15,
                // shadowColor: '#B0C4DE',
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                opacity: 1
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false,
              length: 25,
              lineStyle: {
                color: "#00377a",
                width: 2,
                type: "solid"
              }
            },
            axisLabel: {
              show: false
            }
          },
          {
            name: "灰色内圈", //刻度背景
            type: "gauge",
            z: 2,
            radius: "60%",
            startAngle: "225",
            endAngle: "-45",
            //center: ["50%", "75%"], //整体的位置设置
            axisLine: {
              // 坐标轴线
              lineStyle: {
                // 属性lineStyle控制线条样式
                color: [[1, "#018DFF"]],
                width: 2,
                opacity: 1 //刻度背景宽度
              }
            },
            splitLine: {
              show: false
            },
            // data: [{
            //     show: false,
            //     value: '80'
            // }], //作用不清楚
            axisLabel: {
              show: false
            },
            pointer: {
              show: false
            },
            axisTick: {
              show: false
            },
            detail: {
              show: 0
            }
          },
          {
            name: "白色圈刻度",
            type: "gauge",
            radius: "60%",
            startAngle: 225, //刻度起始
            endAngle: -45, //刻度结束
            z: 4,
            axisTick: {
              show: false
            },
            splitLine: {
              length: 16, //刻度节点线长度
              lineStyle: {
                width: 2,
                color: "rgba(1,244,255, 0.9)"
              } //刻度节点线
            },
            axisLabel: {
              color: "rgba(255,255,255,0)",
              fontSize: 12
            }, //刻度节点文字颜色
            pointer: {
              show: false
            },
            axisLine: {
              lineStyle: {
                opacity: 0
              }
            },
            detail: {
              show: false
            },
            data: [
              {
                value: 0,
                name: ""
              }
            ]
          },
          {
            //内圆
            type: "pie",
            radius: "56%",
            center: ["50%", "50%"],
            z: 1,
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.RadialGradient(
                  0.5,
                  0.5,
                  0.8,
                  [
                    {
                      offset: 0,
                      color: "#4978EC"
                    },
                    {
                      offset: 0.5,
                      color: "#1E2B57"
                    },
                    {
                      offset: 1,
                      color: "#141F3D"
                    }
                  ],
                  false
                ),
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                }
              }
            },
            hoverAnimation: false,
            label: {
              show: false
            },
            tooltip: {
              show: false
            },
            data: [100]
          }
        ]
      });
    },
    initCharts3() {
      let myChart4 = this.$echarts.init(document.getElementById("echarts4"));
      let time = [];
      let value = [];
      let value1 = [];
      for (let i = 0; i < this.pm1.length; i++) {
        time.push(this.pm1[i].time);
        value.push(this.pm1[i].value.main);
      }
      for (let i = 0; i < this.pm2.length; i++) {
        value1.push(this.pm2[i].value.main);
      }
      myChart4.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            lineStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgba(0, 255, 233,0)"
                  },
                  {
                    offset: 0.5,
                    color: "rgba(255, 255, 255,1)"
                  },
                  {
                    offset: 1,
                    color: "rgba(0, 255, 233,0)"
                  }
                ],
                global: false
              }
            }
          }
        },
        grid: {
          top: "15%",
          left: "5%",
          right: "5%",
          bottom: "15%"
          // containLabel: true
        },
        xAxis: [
          {
            type: "category",
            axisLine: {
              show: false
            },
            splitArea: {
              // show: true,
              color: "#f00",
              lineStyle: {
                color: "#f00"
              }
            },
            axisLabel: {
              color: "#fff"
            },
            splitLine: {
              show: false
            },
            boundaryGap: false,
            data: time
          }
        ],
        yAxis: [
          {
            type: "value",
            min: 0,
            // max: 140,
            splitNumber: 4,
            splitLine: {
              show: true,
              lineStyle: {
                color: "rgba(255,255,255,0.1)"
              }
            },
            axisLine: {
              show: false
            },
            axisLabel: {
              show: false,
              margin: 20,
              textStyle: {
                color: "#d1e6eb"
              }
            },
            axisTick: {
              show: false
            }
          }
        ],
        series: [
          {
            name: "注册总量",
            type: "line",
            // smooth: true, //是否平滑
            showAllSymbol: true,
            // symbol: 'image://./static/images/guang-circle.png',
            symbol: "circle",
            symbolSize: 15,
            lineStyle: {
              normal: {
                color: "#6c50f3",
                shadowColor: "rgba(0, 0, 0, .3)",
                shadowBlur: 0,
                shadowOffsetY: 5,
                shadowOffsetX: 5
              }
            },
            label: {
              show: true,
              position: "top",
              textStyle: {
                color: "#6c50f3"
              }
            },
            itemStyle: {
              color: "#6c50f3",
              borderColor: "#fff",
              borderWidth: 3,
              shadowColor: "rgba(0, 0, 0, .3)",
              shadowBlur: 0,
              shadowOffsetY: 2,
              shadowOffsetX: 2
            },
            tooltip: {
              show: false
            },
            areaStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "rgba(108,80,243,0.3)"
                    },
                    {
                      offset: 1,
                      color: "rgba(108,80,243,0)"
                    }
                  ],
                  false
                ),
                shadowColor: "rgba(108,80,243, 0.9)",
                shadowBlur: 20
              }
            },
            data: value
          },
          {
            name: "注册总量",
            type: "line",
            // smooth: true, //是否平滑
            showAllSymbol: true,
            // symbol: 'image://./static/images/guang-circle.png',
            symbol: "circle",
            symbolSize: 15,
            lineStyle: {
              normal: {
                color: "#00ca95",
                shadowColor: "rgba(0, 0, 0, .3)",
                shadowBlur: 0,
                shadowOffsetY: 5,
                shadowOffsetX: 5
              }
            },
            label: {
              show: true,
              position: "top",
              textStyle: {
                color: "#00ca95"
              }
            },

            itemStyle: {
              color: "#00ca95",
              borderColor: "#fff",
              borderWidth: 3,
              shadowColor: "rgba(0, 0, 0, .3)",
              shadowBlur: 0,
              shadowOffsetY: 2,
              shadowOffsetX: 2
            },
            tooltip: {
              show: false
            },
            areaStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "rgba(0,202,149,0.3)"
                    },
                    {
                      offset: 1,
                      color: "rgba(0,202,149,0)"
                    }
                  ],
                  false
                ),
                shadowColor: "rgba(0,202,149, 0.9)",
                shadowBlur: 20
              }
            },
            data: value1
          }
        ]
      });
    },
    initCharts4() {
      let myChart5 = this.$echarts.init(document.getElementById("echarts5"));
      myChart5.setOption({
        tooltip: {
          trigger: "axis"
        },
        xAxis: {
          show: false,
          type: "category",
          boundaryGap: false,
          data: this.weeks,
          axisLine: {
            //y轴
            show: false
          },
          axisTick: {
            length: 30,
            //y轴刻度线
            show: false
          },
          splitLine: {
            //网格线
            show: false
          }
        },
        yAxis: {
          show: false,
          //type: "value",
          axisLine: {
            //y轴
            show: false
          },
          axisTick: {
            //y轴刻度线
            show: false
          },
          splitLine: {
            //网格线
            show: false
          }
        },
        series: [
          {
            name: "最高气温",
            type: "line",
            lineStyle: {
              normal: {
                width: 5,
                color: "rgba(20, 148, 225)"
              }
            },
            data: this.weeksHight
          },
          {
            name: "最低气温",
            type: "line",
            lineStyle: {
              normal: {
                width: 5,
                color: "rgba(20, 148, 225)"
              }
            },
            data: this.weeksLow
          }
        ]
      });
    }
  },
  components: {
    MHeader
  },
  watch: {
    jcList: function() {
      this.initCharts1();
      this.initCharts2();
      this.initCharts3();
      this.initCharts4();
    }
  }
};
</script>

<style scoped>
.bg {
  background: url("../assets/image/body-bg1.jpg") no-repeat;
  background-size: 100%;
}
.content {
  margin: 20px;
  width: 98.9%;
}
.left {
  float: left;
  width: 19%;
}
.center {
  margin-left: 20px;
  float: left;
  width: 33.2%;
}
.right {
  margin-left: 20px;
  float: left;
  width: 44%;
}
.title {
  padding: 0 40px;
  margin-bottom: 10px;
  font-size: 16px;
  color: #00c3f3;
  line-height: 29px;
  background: linear-gradient(0deg, #a4ebff, #d4f5ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
  overflow: hidden;
}
.titlebg {
  left: 41.5%;
  top: 0;
  position: absolute;
}
.box1 {
  width: 100%;
  height: 936px;
  position: relative;
  background: rgba(6, 83, 157, 0.3);
  border: 1px solid rgba(28, 82, 144, 1);
  opacity: 1;
}
.box2 {
  position: relative;
  width: 100%;
  height: 200px;
  background: rgba(6, 83, 157, 0.3);
  opacity: 1;
}
.box3 {
  position: relative;
  margin-top: 23px;
  width: 100%;
  height: 304px;
  background: rgba(6, 83, 157, 0.32);
  opacity: 1;
}
.box4 {
  position: relative;
  margin-top: 23px;
  width: 100%;
  height: 388px;
  background: rgba(6, 83, 157, 0.3);
  opacity: 1;
}

.selectBox2 {
  position: absolute;
  top: 10px;
  left: 0px;
  z-index: 2;
}
.selectBox2 span {
  color: #00b3ed;
  font-size: 13px;
}
.selectBox2 i {
  width: 5px;
  height: 5px;
  background-color: #00b3ed;
  display: inline-block;
  margin: 2px 10px;
}
.el-select {
  margin-right: 15px;
}
.searchBox2 {
  position: relative;
  top: 60px;
  left: 0;
  width: 100%;
  z-index: 2;
  padding: 0 20px;
}
.jdAll {
  margin-left: 15px;
  margin-top: 80px;
  width: 334px;
  height: 800px;
  overflow: auto;
  background: rgba(16, 68, 113, 0.61);
  opacity: 1;
  border-radius: 3px;
}
.jd {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-left: 19px;
  margin-top: 10px;
  width: 297px;
  height: 32px;
  line-height: 32px;
  background: rgba(18, 99, 148, 0);
  border: 1px solid rgba(18, 99, 148, 1);
  opacity: 1;
  border-radius: 5px;
}
.jd span {
  margin-left: 18px;
  font-size: 14px;
  font-family: Segoe UI;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  opacity: 1;
}
.jd .name {
  margin-right: auto;
}
.jd .num {
  margin-right: 10px;
}
.jd img {
  width: 22px;
  height: 22px;
}
.jd:hover {
  background-color: #409eff;
  border: 1px solid #fff;
  color: #073d6c;
}
/* 滚动条样式 */
.jdAll::-webkit-scrollbar {
  text-align: center;
  height: 100%;
  width: 10px;
  background: rgba(4, 54, 91);
}
/*滚动条里面小方块*/
.jdAll::-webkit-scrollbar-thumb {
  background: rgba(19, 117, 146);
  width: 5px;
  height: 30%;
  -webkit-border-radius: 15px;
}
#echarts1,
#echarts2 {
  margin-left: 30px;
  display: inline-block;
  width: 257px;
  height: 260px;
}
#echarts3 {
  width: 300px;
  height: 300px;
}
#echarts4 {
  width: 98%;
  margin: 1%;
  height: 339px;
}
#echarts5 {
  position: absolute;
  top: 150px;
  right: 0px;
  width: 610px;
  height: 339px;
}
.date {
  font-size: 18px;
  width: 300px;
  text-align: center;
  color: rgba(255, 255, 255, 1);
}
.qxd {
  position: absolute;
  top: 53px;
  right: 142px;
  width: 65px;
  height: 326px;
}
.tips {
  position: absolute;
  top: 196px;
  right: 217px;
  background: rgba(255, 255, 255, 1);
  opacity: 1;
  border-radius: 3px;
  width: 50px;
  height: 18px;
  text-align: center;
  line-height: 18px;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(255, 0, 0, 1);
  opacity: 1;
}
.tips::after {
  color: rgba(255, 255, 255, 1);
  position: absolute;
  top: 1px;
  left: 50px;
  content: "";
  width: 0;
  height: 0;
  vertical-align: middle;
  border-top: 8px solid transparent;
  border-bottom: 8px solid transparent;
  border-left: 8px solid;
}
.tips1 {
  text-align: center;
  width: 31px;
  height: 147px;
  font-size: 16px;
  position: absolute;
  top: 225px;
  right: 46px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(249, 249, 249, 1);
  opacity: 1;
}
.box2-1 {
  margin-left: 5px;
  vertical-align: middle;
  text-align: center;
  display: inline-block;
  width: 15%;
}
.box2-1-1 {
  padding-top: 10px;
  padding-bottom: 10px;
  text-align: center;
  background: rgba(9, 73, 122, 0.51);
}
.box2-1-1 .p1 {
  font-size: 18px;
  font-family: "LEDFont";
  font-weight: 400;
  color: rgba(255, 205, 6, 1);
  opacity: 1;
}
.staright {
  margin-top: 10px;
  margin: 0 auto;
  width: 13px;
  height: 2px;
  background: rgba(0, 193, 243, 1);
  opacity: 1;
}
.box2-1-1 .p2 {
  margin-top: 10px;
  font-size: 13px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(0, 193, 243, 1);
  opacity: 1;
}
.box2-1 img {
  margin-top: 10px;
  width: 61px;
  height: 60px;
}
.box5 {
  position: relative;
  height: 523px;
  width: 100%;
  background: rgba(6, 83, 157, 0.31);
  border-radius: 25px;
}
.date1 {
  position: absolute;
  top: 11px;
  left: 48px;
  font-size: 15px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  line-height: 28px;
  color: rgba(255, 255, 255, 1);
  opacity: 1;
}
.date2 {
  width: 160px;
  position: absolute;
  top: 50px;
  left: 46px;
  font-size: 40px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(212, 212, 212, 1);
  opacity: 1;
}
.weatherImg {
  position: absolute;
  top: 205px;
  left: 101px;
  width: 75px;
  height: 57px;
}
.temp {
  position: absolute;
  top: 269px;
  left: 41px;
  font-size: 28px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(212, 212, 212, 1);
  opacity: 1;
}
.temp p {
  margin-top: 20px;
}
.temp1 {
  text-align: center;
  position: absolute;
  top: 441px;
  left: 71px;
  font-size: 23px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(212, 212, 212, 1);
  opacity: 1;
}
.temp1 p {
  margin-top: 15px;
}
.tqList {
  float: right;
  margin-right: 20px;
}
.dayList {
  vertical-align: top;
  display: inline-block;
  margin-left: 10px;
  position: relative;
  width: 110px;
  text-align: center;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(212, 212, 212, 1);
  opacity: 1;
}
.dayList img {
  width: 40px;
  height: 40px;
}
.dayList p {
  margin-top: 10px;
}
.night {
  margin-top: 140px;
}
/* .day {
  position: absolute;
  top: 0;
}
.night {
  position: absolute;
  bottom: 0;
} */
.box6 {
  position: relative;
  margin-top: 25px;
  width: 100%;
  height: 388px;
  background: rgba(6, 83, 157, 0.32);
  opacity: 1;
}
</style>

<style>
.selectBox2 .el-input--small .el-input__inner {
  padding: 0 10px;
  background-color: transparent;
  border: 1px solid #0961a0;
  color: #00b3ed;
}
.searchBox2 .el-input {
  width: 65%;
}
.searchBox2 .el-input__inner {
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  height: 30px;
  line-height: 30px;
}
.searchBox2 .el-button {
  margin: 0 0 0 20px;
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  color: #dcdfe6;
  background-color: #409eff;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: 0;
  transition: 0.1s;
  font-weight: 500;
  font-size: 12px;
  border-radius: 4px;
}
</style>
