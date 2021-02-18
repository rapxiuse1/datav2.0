<template>
  <div class="header">
    <div class="left">
      <ul>
        <li
          v-for="(nav, index) in navList"
          :key="index"
          :class="hover == index ? 'active' : ''"
          @click="go(index)"
        >
          {{ nav }}
        </li>
      </ul>
    </div>
    <div class="center">
      <h2>智慧城市 - 大数据可视化</h2>
      <dv-decoration-5
        class="dv"
        style="width: 360px; height: 36px; color: red;"
      />
    </div>
    <div class="right">
      <div id="weather-v2-plugin-simple"></div>
      <em>|</em>
      <div class="date">{{ date }}</div>
      <em style="margin-left: 0;">|</em>
      <div class="admin">
        <img src="@/assets/image/admin.png" alt="" />
        <a @click="selectShow = !selectShow">超级管理员</a>
      </div>
      <div class="select" v-if="selectShow">
        <ul>
          <li><a href="http://tiot.jiu98.cn">设备管理</a></li>
          <!-- <li>退出登录</li> -->
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["hover"],
  data() {
    return {
      navList: ["首页", "智能照明", "环境监测", "智能安防", "信息展示"],
      date: "",
      selectShow: false
    };
  },
  created() {
    setInterval(() => {
      this.showTime();
    }, 1000);
  },
  mounted() {
    //天气插件
    window.WIDGET = {
      CONFIG: {
        modules: "01234",
        background: 5,
        tmpColor: "50E3C2",
        tmpSize: 16,
        cityColor: "50E3C2",
        citySize: 16,
        aqiSize: 16,
        weatherIconSize: 24,
        alertIconSize: 18,
        padding: "10px 10px 10px 10px",
        shadow: "1",
        language: "auto",
        borderRadius: 5,
        fixed: "true",
        vertical: "middle",
        horizontal: "center",
        right: "500",
        top: "15",
        key: "58Ki3eBEiA",
        zIndex: "999"
      }
    };
    (function(d) {
      var s = d.createElement("script");
      s.src =
        "https://apip.weatherdt.com/simple/static/js/weather-simple-common.js?v=2.0";
      var sn = d.getElementsByTagName("script")[0];
      sn.parentNode.insertBefore(s, sn);
    })(document);
    //时间
  },
  methods: {
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
    go(index) {
      this.hover = index;
      switch (index) {
        case 0:
          this.$router.push("home");
          break;
        case 1:
          this.$router.push("znzm");
          break;
        case 2:
          this.$router.push("hjjc");
          break;
        case 3:
          this.$router.push("znaf");
          break;
        case 4:
          this.$router.push("xxzs");
          break;
      }
    }
  }
};
</script>

<style scoped>
.header {
  width: 100%;
  height: 80px;
  position: relative;
  background: url("../../assets/image/header-bg1.png");
  background-position: 50%;
  background-size: cover;
  display: flex;
  color: #fff;
}
.left {
  flex: 1;
}
.left ul {
  line-height: 42px;
  padding: 0;
  margin: 5px 0 0 14px;
}
.left ul li {
  cursor: pointer;
  text-align: center;
  font-size: 18px;
  display: inline-block;
  width: 74px;
  height: 51px;
  padding-top: 11px;
  margin-right: 20px;
}
.center {
  color: #d4f5ff;
  font-size: 18px;
  line-height: 55px;
  text-align: center;
  flex: 1;
}
.right {
  flex: 1;
}
.right em {
  margin-left: 165px;
  display: inline-block;
  vertical-align: middle;
  font-size: 20px;
  color: rgba(80, 227, 194, 1);
}
.date {
  display: inline-block;
  padding: 0 20px;
  vertical-align: middle;
  font-size: 18px;
  color: rgba(80, 227, 194, 1);
  height: 75px;
  line-height: 75px;
}
.admin {
  vertical-align: middle;
  display: inline-block;
  height: 75px;
  line-height: 75px;
  padding: 0 20px;
  color: rgba(80, 227, 194, 1);
  font-size: 18px;
}
.admin img {
  vertical-align: middle;
  width: 30px;
  height: 30px;
}
.dv {
  position: absolute;
  left: 50%;
  top: 36px;
  transform: translateX(-50%);
}
polyline {
  fill: transparent;
  stroke-width: 3;
  stroke: rgb(0, 193, 243);
}
polyline {
  fill: transparent;
  stroke-width: 2;
  stroke: rgb(240, 188, 133);
}
.active {
  color: #ffcd06;
}
.select {
  position: absolute;
  right: 100px;
  top: 70px;
  z-index: 999;
}
.select ul {
  background: rgba(9, 47, 66, 1) !important;
  border: 1px solid #00b3ed !important;
}
.select ul li {
  cursor: pointer;
  font-size: 16px;
  width: 100px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  color: #fff;
}
.select ul li a {
  color: #fff;
}
.select ul li:hover {
  background-color: #00b3ed !important;
}
</style>
<style>
#weather-view-he {
  opacity: 0;
}
</style>