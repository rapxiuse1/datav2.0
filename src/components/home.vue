<template>
  <div class="bg" style="width:100%;height:100%">
    <m-header hover="0"></m-header>
    <div class="content">
      <div class="main1">
        <div class="main1-left">
          <dv-border-box-8 class="box1" :dur="6">
            <div class="title">设备能力概况</div>
            <img class="titlebg" src="@/assets/image/titlebg.png" alt="" />
            <div class="table">
              <div class="box1-1" v-for="(item, index) in sbList" :key="index">
                <div class="title1-1">{{ item.capability }}</div>
                <div class="number">{{ item.count }}</div>
              </div>
            </div>
          </dv-border-box-8>
          <dv-border-box-8 class="box2" :dur="6">
            <div class="title">报警总数(条)</div>
            <img class="titlebg" src="@/assets/image/titlebg.png" alt="" />
            <div class="total">
              <div class="zs">-年度总数(条)</div>
              <div class="number1">{{ this.totalAlerts }}</div>
            </div>
            <div class="chart1" id="echarts1"></div>
          </dv-border-box-8>
        </div>
        <div class="main1-center">
          <dv-border-box-8 class="box3" :dur="6">
            <baidu-map
              class="bm-view"
              :center="center"
              :zoom="zoom"
              @ready="handler"
              :scroll-wheel-zoom="true"
              :mapStyle="mapStyle"
            >
              <bm-marker
                v-for="item in markerList"
                :key="item.id"
                :position="{ lng: item.longtitude, lat: item.latitude }"
                @click="showModal(item.id)"
                :icon="{
                  url: require('../assets/image/marker.png'),
                  size: { width: 47, height: 47 }
                }"
              >
              </bm-marker>
              <!-- 能力marker -->
              <bm-marker
                v-if="nlMarker"
                v-for="item in nlMarker"
                :key="item.id"
                :position="{ lng: item.longtitude, lat: item.latitude }"
                @click="showModal(item.id)"
                :icon="{
                  url: require('../assets/image/marker1.png'),
                  size: { width: 47, height: 47 }
                }"
              >
              </bm-marker>
              <!-- 街道marker -->
              <!-- <bm-marker
                v-if="jdMarker"
                v-for="item in jdMarker"
                :key="item.id"
                :position="{ lng: item.longtitude, lat: item.latitude }"
                @click="showModal(item.id)"
                :icon="{
                  url: require('../assets/image/marker1.png'),
                  size: { width: 47, height: 47 },
                }"
              >
              </bm-marker> -->
            </baidu-map>
            <div class="list">
              <ul>
                <li
                  @click="searchMarker(mapList1[0].name2)"
                  @mouseover="changeImg(1)"
                  @mouseleave="changeImg1(1)"
                >
                  <img v-if="imgShow == 1" :src="imgList2[0]" alt="" />
                  <img v-else :src="imgList1[0]" alt="" />
                  <p>{{ mapList1[0].name1 }}</p>
                </li>
                <li
                  @click="searchMarker(mapList1[1].name2)"
                  @mouseover="changeImg(2)"
                  @mouseleave="changeImg1(2)"
                >
                  <img v-if="imgShow == 11" :src="imgList2[1]" alt="" />
                  <img v-else :src="imgList1[1]" alt="" />
                  <p>{{ mapList1[1].name1 }}</p>
                </li>
                <li
                  @click="searchMarker(mapList1[2].name2)"
                  @mouseover="changeImg(3)"
                  @mouseleave="changeImg1(3)"
                >
                  <img v-if="imgShow == 2" :src="imgList2[2]" alt="" />
                  <img v-else :src="imgList1[2]" alt="" />
                  <p>{{ mapList1[2].name1 }}</p>
                </li>
                <li
                  @click="searchMarker(mapList1[3].name2)"
                  @mouseover="changeImg(4)"
                  @mouseleave="changeImg1(4)"
                >
                  <img v-if="imgShow == 7" :src="imgList2[3]" />
                  <img v-else :src="imgList1[3]" />
                  <p>{{ mapList1[3].name1 }}</p>
                </li>
                <li
                  @click="searchMarker(mapList1[4].name2)"
                  @mouseover="changeImg(5)"
                  @mouseleave="changeImg1(5)"
                >
                  <img v-if="imgShow == 13" :src="imgList2[4]" />
                  <img v-else :src="imgList1[4]" />
                  <p>{{ mapList1[4].name1 }}</p>
                </li>
                <li
                  @click="searchMarker(mapList1[5].name2)"
                  @mouseover="changeImg(6)"
                  @mouseleave="changeImg1(6)"
                >
                  <img v-if="imgShow == 14" :src="imgList2[5]" />
                  <img v-else :src="imgList1[5]" />
                  <p>{{ mapList1[5].name1 }}</p>
                </li>
              </ul>
            </div>
            <div class="list2">
              <ul>
                <li v-for="(item, index) in mapList2" :key="index">
                  <p class="p1">{{ item.name1 }}</p>
                  <p class="p2">{{ item.name2 }}</p>
                </li>
              </ul>
            </div>
            <!-- <div class="modal1" v-if="modal1Show">
              <img
                class="close"
                src="@/assets/image/close.png"
                @click="close(1)"
              />
              <p>灯杆编号：<span>3</span></p>
              <p>灯杆名称：<span>市桥街道智慧灯杆</span></p>
              <p>灯杆位置：<span>市桥街道</span></p>
              <p>灯杆状态：<span>在线</span></p>
            </div> -->
            <div class="modal1" v-if="modal2Show">
              <img
                class="close"
                src="@/assets/image/close.png"
                @click="close(2)"
              />
              <p>
                灯杆编号：<span>{{ this.detailList[0].id }}</span>
              </p>
              <p>
                灯杆名称：<span>{{ this.detailList[0].name }}</span>
              </p>
              <p>
                灯杆位置：<span>{{ this.detailList[0].street_name }}</span>
              </p>
              <p>
                灯杆状态：<span>{{
                  this.detailList[0].fault_status_desc
                }}</span>
              </p>
              <p>
                是否通电：<span>{{ this.detailList[0].is_power }}</span>
              </p>
              <p v-for="(item, index) in this.detailList1" :key="index">
                <span v-if="item.value.indexOf('mp4') == -1"
                  >{{ item.capablities }}:</span
                >
                <span v-if="item.value.indexOf('mp4') == -1">{{
                  item.value
                }}</span>
                <el-button
                  class="play"
                  @click="play(item.value)"
                  v-if="item.capablities == '信息展示'"
                  type="primary"
                  >信息展示</el-button
                >
                <el-button
                  class="play1"
                  @click="play(item.value)"
                  v-if="item.capablities == ('车辆摄像' || '人员摄像')"
                  type="primary"
                  >视频监控</el-button
                >
              </p>
            </div>
            <div class="modal2" v-if="videoShow">
              <img
                class="close"
                src="@/assets/image/close.png"
                @click="close(3)"
              />
              <video :src="videoSrc" autoplay="autoplay" controls></video>
            </div>
          </dv-border-box-8>
        </div>
        <div class="main1-right">
          <dv-border-box-8 class="box4" :dur="6">
            <div class="selectBox">
              <span><i></i></span>
              <el-select
                v-model="value"
                placeholder="请选择"
                style="width: 20%;"
                @change="select(value)"
              >
                <el-option
                  v-for="item in province"
                  :key="item.id"
                  :label="item.short_name"
                  :value="item.code"
                >
                </el-option>
              </el-select>
              <el-select
                v-model="value1"
                placeholder="请选择"
                style="width: 20%;"
                @change="select1(value1)"
              >
                <el-option
                  v-for="item in cities"
                  :key="item.id"
                  :label="item.short_name"
                  :value="item.code"
                >
                </el-option>
              </el-select>
              <el-select
                v-model="value2"
                placeholder="请选择"
                style="width: 20%;"
                @change="select2(value2)"
              >
                <el-option
                  v-for="item in areas"
                  :key="item.id"
                  :label="item.short_name"
                  :value="item.code"
                >
                </el-option>
              </el-select>
            </div>
            <div class="searchBox">
              <el-input placeholder="请输入内容" v-model="keyvalue"> </el-input>
              <el-button type="primary" @click="search(keyvalue)"
                >搜索</el-button
              >
            </div>
            <ul class="streetLi">
              <li
                v-for="(item, index) in streetList"
                :key="index"
                @click="streetSearch(item.code, index)"
              >
                <span :class="{ active: index == idx }">{{ item.name }}</span>
              </li>
            </ul>
          </dv-border-box-8>
          <dv-border-box-8 class="box5" :dur="6">
            <div class="box5-1">
              <div class="box5-1-1">
                <div class="title1">月度维护巡查统计</div>
                <img src="@/assets/image/xc.png" alt="" />
              </div>
              <div class="box5-1-1">
                <div class="number">{{ this.tjList.task_count }}</div>
                <div class="name">任务数</div>
              </div>
              <div class="box5-1-1">
                <div class="number">{{ this.tjList.check_count }}</div>
                <div class="name">巡查数</div>
              </div>
            </div>
            <div class="box5-1">
              <div class="box5-1-1">
                <div class="title1">未处理故障统计</div>
                <img src="@/assets/image/gz.png" alt="" />
              </div>
              <div class="box5-1-1">
                <div class="row">
                  <div class="name2">一级</div>
                  <div class="number2">{{ this.tjList.one_level }}</div>
                </div>
                <div class="row">
                  <div class="name2">二级</div>
                  <div class="number2">{{ this.tjList.two_level }}</div>
                </div>
              </div>
              <div class="box5-1-1">
                <div class="row">
                  <div class="name2">三级</div>
                  <div class="number2">{{ this.tjList.three_level }}</div>
                </div>
                <div class="row">
                  <div class="name2">总数</div>
                  <div class="number2">{{ this.tjList.total_level }}</div>
                </div>
              </div>
            </div>
            <div class="box5-1">
              <div class="box5-1-1">
                <div class="title1">月度故障统计</div>
                <img src="@/assets/image/yd.png" alt="" />
              </div>
              <div class="box5-1-1">
                <div class="number">{{ this.tjList.up_count }}</div>
                <div class="name">上报次数</div>
              </div>
              <div class="box5-1-1">
                <div class="number">{{ this.tjList.solve_count }}</div>
                <div class="name">已处理次数</div>
              </div>
            </div>
          </dv-border-box-8>
        </div>
      </div>
      <div class="main2">
        <dv-border-box-8 class="box6" :dur="6">
          <div class="title">车流量概览(天)</div>
          <img
            class="titlebg"
            style="left: 35%;"
            src="@/assets/image/titlebg.png"
            alt=""
          />
          <div class="chart2" id="echarts2"></div>
        </dv-border-box-8>
        <dv-border-box-8 class="box7" :dur="6">
          <div class="title">检测值</div>
          <img
            class="titlebg"
            style="left: 38%;"
            src="@/assets/image/titlebg.png"
            alt=""
          />
          <div class="table">
            <div class="box7-1">
              <div class="box7-1-1">
                <div class="number" v-if="this.jcListnum[0]">
                  {{ this.jcListnum[0] }}
                </div>
                <div class="number" v-else>0</div>
                <div class="title1-1">{{ this.jcListname[0] }}</div>
              </div>
              <img src="@/assets/image/wd.png" alt="" />
            </div>
            <div class="box7-1">
              <div class="box7-1-1">
                <div class="number" v-if="this.jcListnum[1]">
                  {{ this.jcListnum[1] }}
                </div>
                <div class="number" v-else>0</div>
                <div class="title1-1">{{ this.jcListname[1] }}</div>
              </div>
              <img src="@/assets/image/sd.png" alt="" />
            </div>
            <div class="box7-1">
              <div class="box7-1-1">
                <div class="number" v-if="this.jcListnum[2]">
                  {{ this.jcListnum[2] }}
                </div>
                <div class="number" v-else>0</div>
                <div class="title1-1">{{ this.jcListname[2] }}</div>
              </div>
              <img src="@/assets/image/fs.png" alt="" />
            </div>
            <div class="box7-1">
              <div class="box7-1-1">
                <div class="number" v-if="this.jcListnum[3]">
                  {{ this.jcListnum[3] }}
                </div>
                <div class="number" v-else>0</div>
                <div class="title1-1">{{ this.jcListname[3] }}</div>
              </div>
              <img src="@/assets/image/sj.png" alt="" />
            </div>
            <div class="box7-1">
              <div class="box7-1-1">
                <div class="number" v-if="this.jcListnum[4]">
                  {{ this.jcListnum[4] }}
                </div>
                <div class="number" v-else>0</div>
                <div class="title1-1">{{ this.jcListname[4] }}</div>
              </div>
              <img src="@/assets/image/pm25.png" alt="" />
            </div>
            <div class="box7-1">
              <div class="box7-1-1">
                <div class="number" v-if="this.jcListnum[5]">
                  {{ this.jcListnum[5] }}
                </div>
                <div class="number" v-else>0</div>
                <div class="title1-1">{{ this.jcListname[5] }}</div>
              </div>
              <img src="@/assets/image/pm10.png" alt="" />
            </div>
            <div class="box7-1">
              <div class="box7-1-1">
                <div class="number" v-if="this.jcListnum[6]">
                  {{ this.jcListnum[6] }}
                </div>
                <div class="number" v-else>0</div>
                <div class="title1-1">{{ this.jcListname[6] }}</div>
              </div>
              <img src="@/assets/image/qy.png" alt="" />
            </div>
            <div class="box7-1">
              <div class="box7-1-1">
                <div class="number" v-if="this.jcListnum[7]">
                  {{ this.jcListnum[7] }}
                </div>
                <div class="number" v-else>0</div>
                <div class="title1-1">{{ this.jcListname[7] }}</div>
              </div>
              <img src="@/assets/image/tb.png" alt="" />
            </div>
          </div>
        </dv-border-box-8>
        <dv-border-box-8 class="box8" :dur="6">
          <div class="title">人流量概览(天)</div>
          <img
            class="titlebg"
            style="left: 35%;"
            src="@/assets/image/titlebg.png"
            alt=""
          />
          <div class="chart3" id="echarts3"></div>
        </dv-border-box-8>
      </div>
    </div>
  </div>
</template>

<script>
import Charts from "@jiaminghi/charts";
import MHeader from "@/components/header/header.vue";
export default {
  data() {
    return {
      center: { lng: 0, lat: 0 },
      zoom: 12,
      mapStyle: {
        //自定义地图样式
        styleJson: [
          {
            featureType: "land",
            elementType: "geometry",
            stylers: {
              color: "#242f3eff"
            }
          },
          {
            featureType: "manmade",
            elementType: "geometry",
            stylers: {
              color: "#242f3eff"
            }
          },
          {
            featureType: "water",
            elementType: "geometry",
            stylers: {
              color: "#17263cff"
            }
          },
          {
            featureType: "road",
            elementType: "geometry.fill",
            stylers: {
              color: "#9e7d60ff"
            }
          },
          {
            featureType: "road",
            elementType: "geometry.stroke",
            stylers: {
              color: "#554631ff"
            }
          },
          {
            featureType: "districtlabel",
            elementType: "labels.text.fill",
            stylers: {
              color: "#d69563ff"
            }
          },
          {
            featureType: "districtlabel",
            elementType: "labels.text.stroke",
            stylers: {
              color: "#17263cff",
              weight: "3"
            }
          },
          {
            featureType: "poilabel",
            elementType: "labels.text.fill",
            stylers: {
              color: "#d69563ff"
            }
          },
          {
            featureType: "poilabel",
            elementType: "labels.text.stroke",
            stylers: {
              color: "#17263cff",
              weight: "3"
            }
          },
          {
            featureType: "subway",
            elementType: "geometry",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "railway",
            elementType: "geometry",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "poilabel",
            elementType: "labels.icon",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "subwaylabel",
            elementType: "labels",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "subwaylabel",
            elementType: "labels.icon",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "tertiarywaysign",
            elementType: "labels",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "tertiarywaysign",
            elementType: "labels.icon",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "provincialwaysign",
            elementType: "labels.icon",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "provincialwaysign",
            elementType: "labels",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "nationalwaysign",
            elementType: "labels.icon",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "nationalwaysign",
            elementType: "labels",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "highwaysign",
            elementType: "labels.icon",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "highwaysign",
            elementType: "labels",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "green",
            elementType: "geometry",
            stylers: {
              color: "#263b3eff"
            }
          },
          {
            featureType: "nationalwaysign",
            elementType: "labels.text.fill",
            stylers: {
              color: "#d0021bff"
            }
          },
          {
            featureType: "nationalwaysign",
            elementType: "labels.text.stroke",
            stylers: {
              color: "#ffffffff"
            }
          },
          {
            featureType: "city",
            elementType: "labels",
            stylers: {
              visibility: "on"
            }
          },
          {
            featureType: "city",
            elementType: "labels.icon",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "city",
            elementType: "labels.text.fill",
            stylers: {
              color: "#d69563ff"
            }
          },
          {
            featureType: "city",
            elementType: "labels.text.stroke",
            stylers: {
              color: "#17263cff"
            }
          },
          {
            featureType: "water",
            elementType: "labels.text.fill",
            stylers: {
              color: "#d69563ff"
            }
          },
          {
            featureType: "water",
            elementType: "labels.text.stroke",
            stylers: {
              color: "#242f3eff"
            }
          },
          {
            featureType: "local",
            elementType: "geometry.fill",
            stylers: {
              color: "#38414eff"
            }
          },
          {
            featureType: "local",
            elementType: "geometry.stroke",
            stylers: {
              color: "#ffffff00"
            }
          },
          {
            featureType: "fourlevelway",
            elementType: "geometry.fill",
            stylers: {
              color: "#38414eff"
            }
          },
          {
            featureType: "fourlevelway",
            elementType: "geometry.stroke",
            stylers: {
              color: "#ffffff00"
            }
          },
          {
            featureType: "tertiaryway",
            elementType: "geometry.fill",
            stylers: {
              color: "#38414eff"
            }
          },
          {
            featureType: "tertiaryway",
            elementType: "geometry.stroke",
            stylers: {
              color: "#ffffff00"
            }
          },
          {
            featureType: "tertiaryway",
            elementType: "labels.text.fill",
            stylers: {
              color: "#759879ff"
            }
          },
          {
            featureType: "fourlevelway",
            elementType: "labels.text.fill",
            stylers: {
              color: "#759879ff"
            }
          },
          {
            featureType: "highway",
            elementType: "labels.text.fill",
            stylers: {
              color: "#759879ff"
            }
          },
          {
            featureType: "highway",
            elementType: "geometry.fill",
            stylers: {
              color: "#9e7d60ff"
            }
          },
          {
            featureType: "highway",
            elementType: "geometry.stroke",
            stylers: {
              color: "#554631ff"
            }
          },
          {
            featureType: "provincialway",
            elementType: "geometry.fill",
            stylers: {
              color: "#9e7d60ff"
            }
          },
          {
            featureType: "provincialway",
            elementType: "geometry.stroke",
            stylers: {
              color: "#554631ff"
            }
          },
          {
            featureType: "tertiaryway",
            elementType: "labels.text.stroke",
            stylers: {
              color: "#1a2e1cff"
            }
          },
          {
            featureType: "fourlevelway",
            elementType: "labels.text.stroke",
            stylers: {
              color: "#1a2e1cff"
            }
          },
          {
            featureType: "highway",
            elementType: "labels.text.stroke",
            stylers: {
              color: "#1a2e1cff"
            }
          },
          {
            featureType: "nationalway",
            elementType: "labels.text.stroke",
            stylers: {
              color: "#1a2e1cff"
            }
          },
          {
            featureType: "nationalway",
            elementType: "labels.text.fill",
            stylers: {
              color: "#759879ff"
            }
          },
          {
            featureType: "nationalway",
            elementType: "geometry.fill",
            stylers: {
              color: "#9e7d60ff"
            }
          },
          {
            featureType: "nationalway",
            elementType: "geometry.stroke",
            stylers: {
              color: "#554631ff"
            }
          },
          {
            featureType: "cityhighway",
            elementType: "geometry.fill",
            stylers: {
              color: "#9e7d60ff"
            }
          },
          {
            featureType: "cityhighway",
            elementType: "geometry.stroke",
            stylers: {
              color: "#554631ff"
            }
          },
          {
            featureType: "arterial",
            elementType: "geometry.fill",
            stylers: {
              color: "#9e7d60ff"
            }
          },
          {
            featureType: "arterial",
            elementType: "geometry.stroke",
            stylers: {
              color: "#554631fa"
            }
          },
          {
            featureType: "medicallabel",
            elementType: "labels",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "medicallabel",
            elementType: "labels.icon",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "entertainmentlabel",
            elementType: "labels",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "entertainmentlabel",
            elementType: "labels.icon",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "estatelabel",
            elementType: "labels",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "estatelabel",
            elementType: "labels.icon",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "businesstowerlabel",
            elementType: "labels",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "businesstowerlabel",
            elementType: "labels.icon",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "companylabel",
            elementType: "labels",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "companylabel",
            elementType: "labels.icon",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "governmentlabel",
            elementType: "labels",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "governmentlabel",
            elementType: "labels.icon",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "restaurantlabel",
            elementType: "labels",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "restaurantlabel",
            elementType: "labels.icon",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "hotellabel",
            elementType: "labels",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "hotellabel",
            elementType: "labels.icon",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "shoppinglabel",
            elementType: "labels",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "shoppinglabel",
            elementType: "labels.icon",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "lifeservicelabel",
            elementType: "labels",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "lifeservicelabel",
            elementType: "labels.icon",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "carservicelabel",
            elementType: "labels",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "carservicelabel",
            elementType: "labels.icon",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "financelabel",
            elementType: "labels",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "financelabel",
            elementType: "labels.icon",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "otherlabel",
            elementType: "labels",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "otherlabel",
            elementType: "labels.icon",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "airportlabel",
            elementType: "labels",
            stylers: {
              visibility: "on"
            }
          },
          {
            featureType: "airportlabel",
            elementType: "labels.text.fill",
            stylers: {
              color: "#d69563ff"
            }
          },
          {
            featureType: "airportlabel",
            elementType: "labels.text.stroke",
            stylers: {
              color: "#17263cff"
            }
          },
          {
            featureType: "airportlabel",
            elementType: "labels.icon",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "highway",
            stylers: {
              level: "6",
              curZoomRegionId: "0",
              curZoomRegion: "6-10"
            }
          },
          {
            featureType: "highway",
            stylers: {
              level: "7",
              curZoomRegionId: "0",
              curZoomRegion: "6-10"
            }
          },
          {
            featureType: "highway",
            stylers: {
              level: "8",
              curZoomRegionId: "0",
              curZoomRegion: "6-10"
            }
          },
          {
            featureType: "highway",
            stylers: {
              level: "9",
              curZoomRegionId: "0",
              curZoomRegion: "6-10"
            }
          },
          {
            featureType: "highway",
            stylers: {
              level: "10",
              curZoomRegionId: "0",
              curZoomRegion: "6-10"
            }
          },
          {
            featureType: "highway",
            elementType: "geometry",
            stylers: {
              visibility: "off",
              level: "6",
              curZoomRegionId: "0",
              curZoomRegion: "6-10"
            }
          },
          {
            featureType: "highway",
            elementType: "geometry",
            stylers: {
              visibility: "off",
              level: "7",
              curZoomRegionId: "0",
              curZoomRegion: "6-10"
            }
          },
          {
            featureType: "highway",
            elementType: "geometry",
            stylers: {
              visibility: "off",
              level: "8",
              curZoomRegionId: "0",
              curZoomRegion: "6-10"
            }
          },
          {
            featureType: "highway",
            elementType: "geometry",
            stylers: {
              visibility: "off",
              level: "9",
              curZoomRegionId: "0",
              curZoomRegion: "6-10"
            }
          },
          {
            featureType: "highway",
            elementType: "geometry",
            stylers: {
              visibility: "off",
              level: "10",
              curZoomRegionId: "0",
              curZoomRegion: "6-10"
            }
          },
          {
            featureType: "nationalway",
            stylers: {
              level: "6",
              curZoomRegionId: "0",
              curZoomRegion: "6-10"
            }
          },
          {
            featureType: "nationalway",
            stylers: {
              level: "7",
              curZoomRegionId: "0",
              curZoomRegion: "6-10"
            }
          },
          {
            featureType: "nationalway",
            stylers: {
              level: "8",
              curZoomRegionId: "0",
              curZoomRegion: "6-10"
            }
          },
          {
            featureType: "nationalway",
            stylers: {
              level: "9",
              curZoomRegionId: "0",
              curZoomRegion: "6-10"
            }
          },
          {
            featureType: "nationalway",
            stylers: {
              level: "10",
              curZoomRegionId: "0",
              curZoomRegion: "6-10"
            }
          },
          {
            featureType: "nationalway",
            elementType: "geometry",
            stylers: {
              visibility: "off",
              level: "6",
              curZoomRegionId: "0",
              curZoomRegion: "6-10"
            }
          },
          {
            featureType: "nationalway",
            elementType: "geometry",
            stylers: {
              visibility: "off",
              level: "7",
              curZoomRegionId: "0",
              curZoomRegion: "6-10"
            }
          },
          {
            featureType: "nationalway",
            elementType: "geometry",
            stylers: {
              visibility: "off",
              level: "8",
              curZoomRegionId: "0",
              curZoomRegion: "6-10"
            }
          },
          {
            featureType: "nationalway",
            elementType: "geometry",
            stylers: {
              visibility: "off",
              level: "9",
              curZoomRegionId: "0",
              curZoomRegion: "6-10"
            }
          },
          {
            featureType: "nationalway",
            elementType: "geometry",
            stylers: {
              visibility: "off",
              level: "10",
              curZoomRegionId: "0",
              curZoomRegion: "6-10"
            }
          },
          {
            featureType: "nationalway",
            elementType: "labels",
            stylers: {
              visibility: "off",
              level: "6",
              curZoomRegionId: "0",
              curZoomRegion: "6-10"
            }
          },
          {
            featureType: "nationalway",
            elementType: "labels",
            stylers: {
              visibility: "off",
              level: "7",
              curZoomRegionId: "0",
              curZoomRegion: "6-10"
            }
          },
          {
            featureType: "nationalway",
            elementType: "labels",
            stylers: {
              visibility: "off",
              level: "8",
              curZoomRegionId: "0",
              curZoomRegion: "6-10"
            }
          },
          {
            featureType: "nationalway",
            elementType: "labels",
            stylers: {
              visibility: "off",
              level: "9",
              curZoomRegionId: "0",
              curZoomRegion: "6-10"
            }
          },
          {
            featureType: "nationalway",
            elementType: "labels",
            stylers: {
              visibility: "off",
              level: "10",
              curZoomRegionId: "0",
              curZoomRegion: "6-10"
            }
          },
          {
            featureType: "highway",
            elementType: "labels",
            stylers: {
              visibility: "off",
              level: "6",
              curZoomRegionId: "0",
              curZoomRegion: "6-10"
            }
          },
          {
            featureType: "highway",
            elementType: "labels",
            stylers: {
              visibility: "off",
              level: "7",
              curZoomRegionId: "0",
              curZoomRegion: "6-10"
            }
          },
          {
            featureType: "highway",
            elementType: "labels",
            stylers: {
              visibility: "off",
              level: "8",
              curZoomRegionId: "0",
              curZoomRegion: "6-10"
            }
          },
          {
            featureType: "highway",
            elementType: "labels",
            stylers: {
              visibility: "off",
              level: "9",
              curZoomRegionId: "0",
              curZoomRegion: "6-10"
            }
          },
          {
            featureType: "highway",
            elementType: "labels",
            stylers: {
              visibility: "off",
              level: "10",
              curZoomRegionId: "0",
              curZoomRegion: "6-10"
            }
          },
          {
            featureType: "provincialway",
            stylers: {
              level: "8",
              curZoomRegionId: "0",
              curZoomRegion: "8-9"
            }
          },
          {
            featureType: "provincialway",
            stylers: {
              level: "9",
              curZoomRegionId: "0",
              curZoomRegion: "8-9"
            }
          },
          {
            featureType: "provincialway",
            elementType: "geometry",
            stylers: {
              visibility: "off",
              level: "8",
              curZoomRegionId: "0",
              curZoomRegion: "8-9"
            }
          },
          {
            featureType: "provincialway",
            elementType: "geometry",
            stylers: {
              visibility: "off",
              level: "9",
              curZoomRegionId: "0",
              curZoomRegion: "8-9"
            }
          },
          {
            featureType: "provincialway",
            elementType: "labels",
            stylers: {
              visibility: "off",
              level: "8",
              curZoomRegionId: "0",
              curZoomRegion: "8-9"
            }
          },
          {
            featureType: "provincialway",
            elementType: "labels",
            stylers: {
              visibility: "off",
              level: "9",
              curZoomRegionId: "0",
              curZoomRegion: "8-9"
            }
          },
          {
            featureType: "cityhighway",
            stylers: {
              level: "6",
              curZoomRegionId: "0",
              curZoomRegion: "6-10"
            }
          },
          {
            featureType: "cityhighway",
            stylers: {
              level: "7",
              curZoomRegionId: "0",
              curZoomRegion: "6-10"
            }
          },
          {
            featureType: "cityhighway",
            stylers: {
              level: "8",
              curZoomRegionId: "0",
              curZoomRegion: "6-10"
            }
          },
          {
            featureType: "cityhighway",
            stylers: {
              level: "9",
              curZoomRegionId: "0",
              curZoomRegion: "6-10"
            }
          },
          {
            featureType: "cityhighway",
            stylers: {
              level: "10",
              curZoomRegionId: "0",
              curZoomRegion: "6-10"
            }
          },
          {
            featureType: "cityhighway",
            elementType: "geometry",
            stylers: {
              visibility: "off",
              level: "6",
              curZoomRegionId: "0",
              curZoomRegion: "6-10"
            }
          },
          {
            featureType: "cityhighway",
            elementType: "geometry",
            stylers: {
              visibility: "off",
              level: "7",
              curZoomRegionId: "0",
              curZoomRegion: "6-10"
            }
          },
          {
            featureType: "cityhighway",
            elementType: "geometry",
            stylers: {
              visibility: "off",
              level: "8",
              curZoomRegionId: "0",
              curZoomRegion: "6-10"
            }
          },
          {
            featureType: "cityhighway",
            elementType: "geometry",
            stylers: {
              visibility: "off",
              level: "9",
              curZoomRegionId: "0",
              curZoomRegion: "6-10"
            }
          },
          {
            featureType: "cityhighway",
            elementType: "geometry",
            stylers: {
              visibility: "off",
              level: "10",
              curZoomRegionId: "0",
              curZoomRegion: "6-10"
            }
          },
          {
            featureType: "cityhighway",
            elementType: "labels",
            stylers: {
              visibility: "off",
              level: "6",
              curZoomRegionId: "0",
              curZoomRegion: "6-10"
            }
          },
          {
            featureType: "cityhighway",
            elementType: "labels",
            stylers: {
              visibility: "off",
              level: "7",
              curZoomRegionId: "0",
              curZoomRegion: "6-10"
            }
          },
          {
            featureType: "cityhighway",
            elementType: "labels",
            stylers: {
              visibility: "off",
              level: "8",
              curZoomRegionId: "0",
              curZoomRegion: "6-10"
            }
          },
          {
            featureType: "cityhighway",
            elementType: "labels",
            stylers: {
              visibility: "off",
              level: "9",
              curZoomRegionId: "0",
              curZoomRegion: "6-10"
            }
          },
          {
            featureType: "cityhighway",
            elementType: "labels",
            stylers: {
              visibility: "off",
              level: "10",
              curZoomRegionId: "0",
              curZoomRegion: "6-10"
            }
          },
          {
            featureType: "arterial",
            stylers: {
              level: "9",
              curZoomRegionId: "0",
              curZoomRegion: "9-10"
            }
          },
          {
            featureType: "arterial",
            stylers: {
              level: "10",
              curZoomRegionId: "0",
              curZoomRegion: "9-10"
            }
          },
          {
            featureType: "arterial",
            elementType: "geometry",
            stylers: {
              visibility: "off",
              level: "9",
              curZoomRegionId: "0",
              curZoomRegion: "9-10"
            }
          },
          {
            featureType: "arterial",
            elementType: "geometry",
            stylers: {
              visibility: "off",
              level: "10",
              curZoomRegionId: "0",
              curZoomRegion: "9-10"
            }
          },
          {
            featureType: "arterial",
            elementType: "labels",
            stylers: {
              visibility: "off",
              level: "9",
              curZoomRegionId: "0",
              curZoomRegion: "9-10"
            }
          },
          {
            featureType: "arterial",
            elementType: "labels",
            stylers: {
              visibility: "off",
              level: "10",
              curZoomRegionId: "0",
              curZoomRegion: "9-10"
            }
          },
          {
            featureType: "building",
            elementType: "geometry.topfill",
            stylers: {
              color: "#2a3341ff"
            }
          },
          {
            featureType: "building",
            elementType: "geometry.sidefill",
            stylers: {
              color: "#313b4cff"
            }
          },
          {
            featureType: "building",
            elementType: "geometry.stroke",
            stylers: {
              color: "#1a212eff"
            }
          },
          {
            featureType: "road",
            elementType: "labels.text.fill",
            stylers: {
              color: "#759879ff"
            }
          },
          {
            featureType: "road",
            elementType: "labels.text.stroke",
            stylers: {
              color: "#1a2e1cff"
            }
          },
          {
            featureType: "provincialway",
            elementType: "labels.text.fill",
            stylers: {
              color: "#759879ff"
            }
          },
          {
            featureType: "cityhighway",
            elementType: "labels.text.fill",
            stylers: {
              color: "#759879ff"
            }
          },
          {
            featureType: "arterial",
            elementType: "labels.text.fill",
            stylers: {
              color: "#759879ff"
            }
          },
          {
            featureType: "provincialway",
            elementType: "labels.text.stroke",
            stylers: {
              color: "#1a2e1cff"
            }
          },
          {
            featureType: "cityhighway",
            elementType: "labels.text.stroke",
            stylers: {
              color: "#1a2e1cff"
            }
          },
          {
            featureType: "arterial",
            elementType: "labels.text.stroke",
            stylers: {
              color: "#1a2e1cff"
            }
          },
          {
            featureType: "local",
            elementType: "labels",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "manmade",
            elementType: "labels.text.fill",
            stylers: {
              color: "#d69563ff"
            }
          },
          {
            featureType: "manmade",
            elementType: "labels.text.stroke",
            stylers: {
              color: "#17263cff"
            }
          },
          {
            featureType: "subwaystation",
            elementType: "geometry",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "transportationlabel",
            elementType: "labels.icon",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "transportationlabel",
            elementType: "labels",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "estate",
            elementType: "geometry",
            stylers: {
              color: "#2a3341ff"
            }
          }
        ]
      },
      sbList: [],
      jcList: [],
      bjList: [],
      totalAlerts: "",
      jcListnum: [],
      jcListname: [],
      mapList1: [],
      mapList2: [],
      imgList1: [
        require("../assets/image/zm2.png"),
        require("../assets/image/jk2.png"),
        require("../assets/image/sd2.png"),
        require("../assets/image/sj2.png"),
        require("../assets/image/bj2.png"),
        require("../assets/image/xx2.png")
      ],
      imgList2: [
        require("../assets/image/zm1.png"),
        require("../assets/image/jk1.png"),
        require("../assets/image/sd1.png"),
        require("../assets/image/sj1.png"),
        require("../assets/image/bj1.png"),
        require("../assets/image/xx1.png")
      ],
      imgShow: "",
      imgShow1: true,
      imgShow2: true,
      imgShow3: true,
      imgShow4: true,
      imgShow5: true,
      imgShow6: true,
      status: false,
      statusCode: "",
      province: [],
      value: "广东",
      cities: [],
      value1: "广州",
      areas: [],
      value2: "番禺",
      keyvalue: "",
      streetList: [],
      carList: [],
      personList: [],
      tjList: [],
      markerList: [],
      detailList: [],
      detailList1: [],
      modal1Show: false,
      modal2Show: false,
      nlMarker: [], //根据能力查询marker
      jdMarker: [], //根据街道查询marker
      videoSrc: "",
      videoShow: false,
      areaCode: "",
      mTime1: "",
      mTime2: "",
      idx: ""
    };
  },
  created() {},
  mounted() {
    this.initData(440113007); //初始化表格数据
    this.initArea(); //初始化省市级数据
    this.select(440000); //初始化广州联动
    this.select1(440100);
    this.select2(440113);
    this.initMarker(); //初始化地图标点数据
    setTimeout(() => {
      this.init();
    }, 500);
  },
  methods: {
    handler({ Bmap, map }) {
      //初始化地图数据
      // var point = new BMap.Point(113.3721, 22.9531);
      // map.centerAndZoom(point, 15);
      this.center.lng = 113.3721;
      this.center.lat = 22.9531;
      this.zoom = 15;
    },
    init() {
      setTimeout(() => {
        this.initCharts1();
        this.initCharts2();
        this.initCharts3();
      }, 500);
    },
    initCharts1() {
      let myChart1 = this.$echarts.init(document.getElementById("echarts1"));
      let name = [];
      let data = [];
      let percent = [];
      for (let i = 0; i < this.bjList.length; i++) {
        name.push(this.bjList[i].type);
        data.push(this.bjList[i].num);
        percent.push(this.bjList[i].percent);
      }
      let max = Math.max(...data);
      function contains(arrays, obj) {
        let i = arrays.length;
        while (i--) {
          if (arrays[i] === obj) {
            return i;
          }
        }
        return false;
      }
      myChart1.setOption({
        color: ["#3D91F7", "#61BE67"],
        tooltip: {
          textStyle: {
            fontSize: 14
          },
          formatter: function() {
            var html = "";
            for (var i = 0; i < data.length; i++) {
              html += name[i] + " : " + data[i] + "<br>";
            }
            return html;
          }
        },
        radar: {
          // shape: 'circle',
          radius: "68%",
          center: ["50%", "50%"],
          triggerEvent: true,
          name: {
            textStyle: {
              color: "rgba(0, 195, 243)",
              fontSize: "16",
              borderRadius: 3,
              padding: [3, 5],
              align: "center",
              rich: {
                a: {
                  fontSize: "16",
                  align: "center",
                  padding: [6, 0, 0, 0]
                },
                b: {
                  fontSize: "16",
                  align: "center",
                  padding: [-110, 0, 0, 0]
                }
              }
            },

            formatter: function(params, index) {
              var i = contains(name, params);
              var percent1 = percent[i];
              if (i === 0) {
                return " {b|" + params + "  " + percent1 + "%}";
              }
              return "{a|" + percent1 + "%}\n" + params;
            }
          },
          nameGap: "70",
          indicator: [
            {
              name: name[0],
              max: max
            },
            {
              name: name[1],
              max: max
            },
            {
              name: name[2],
              max: max
            },
            {
              name: name[3],
              max: max
            },
            {
              name: name[4],
              max: max
            }
          ],
          splitArea: {
            areaStyle: {
              color: "transparent"
            }
          },
          // axisLabel:{//展示刻度
          //     show: true
          // },
          axisLine: {
            //指向外圈文本的分隔线样式
            lineStyle: {
              color: "rgba(38,124,170,1)",
              width: 1
            }
          },
          splitLine: {
            lineStyle: {
              width: 1,
              color: "rgba(38,124,170,1)",
              shadowBlur: 20,
              shadowColor: "rgba(255,255,255,1)"
            }
          },
          splitNumber: 4
        },
        series: [
          {
            name: "",
            type: "radar",
            //areaStyle: {normal: {}},
            areaStyle: {
              normal: {
                color: "rgba(255,255,0,.8)"
              }
            },
            symbolSize: 0,
            lineStyle: {
              normal: {
                color: "rgba(255,255,0, 1)",
                width: 1
              }
            },
            data: [
              {
                value: data
              }
            ]
          }
        ]
      });
    },
    initCharts2() {
      let myChart2 = this.$echarts.init(document.getElementById("echarts2"));
      let time = [];
      let num = [];
      for (let i = 0; i < this.carList.length; i++) {
        time.push(this.carList[i].time);
        num.push(this.carList[i].count);
      }
      myChart2.setOption({
        tooltip: {
          trigger: "axis",
          backgroundColor: "rgba(0,0,0,0.5)",
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
                    color: "#d9efff"
                  },
                  {
                    offset: 0.5,
                    color: "#48b3FF"
                  },
                  {
                    offset: 1,
                    color: "#d9efff"
                  }
                ],
                global: false
              }
            }
          }
        },
        grid: {
          top: "5%",
          left: "8%",
          right: "3%",
          bottom: "8%"
          // containLabel: true
        },
        xAxis: [
          {
            type: "category",
            color: "rgba(1,160,205)",
            axisLine: {
              show: true
            },
            axisLabel: {
              color: "rgba(1,160,205)"
            },
            splitLine: {
              // show: true
            },
            axisTick: {
              show: false
            },
            // boundaryGap: true,
            data: time
          }
        ],

        yAxis: [
          {
            type: "value",
            //min: 0,
            //max: 1000,
            splitNumber: 4,
            splitLine: {
              show: true
            },
            axisLine: {
              show: false
            },
            axisLabel: {
              show: true,
              // margin: 20,
              textStyle: {
                color: "rgba(1,160,205)"
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              lineStyle: {
                color: "rgba(255,255,255,1)",
                type: "dashed"
              }
            }
          }
        ],
        series: [
          {
            name: "",
            type: "line",
            smooth: true, //是否平滑
            showAllSymbol: true,
            symbol: "circle",
            symbolSize: 8,
            lineStyle: {
              normal: {
                color: "#48B3FF"
              }
            },
            label: {
              show: false,
              position: "top",
              textStyle: {
                color: "#48B3FF"
              }
            },

            itemStyle: {
              color: "#FFF",
              borderColor: "#48B3FF",
              borderWidth: 2
            },
            tooltip: {
              show: true
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
                      color: "rgba(2,103,223,1)"
                    },
                    {
                      offset: 1,
                      color: "rgba(2,103,223,0.2)"
                    }
                  ],
                  false
                ),
                shadowColor: "rgba(195,230,255,0.1)",
                shadowBlur: 20
              }
            },
            data: num
          }
        ]
      });
      //轮播tooltip
      let index = 0; //播放所在下标
      this.mTime1 = setInterval(function() {
        myChart2.dispatchAction({
          type: "showTip",
          seriesIndex: 0,
          dataIndex: index
        });
        index++;
        if (index > time.length) {
          index = 0;
        }
      }, 1000);
    },
    initCharts3() {
      let myChart3 = this.$echarts.init(document.getElementById("echarts3"));
      let time = [];
      let count = [];
      for (let i = 0; i < this.carList.length; i++) {
        time.push(this.carList[i].time);
        count.push(this.carList[i].count);
      }
      myChart3.setOption({
        tooltip: {
          trigger: "axis",
          backgroundColor: "rgba(0,0,0,0.5)",
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
                    color: "#d9efff"
                  },
                  {
                    offset: 0.5,
                    color: "#48b3FF"
                  },
                  {
                    offset: 1,
                    color: "#d9efff"
                  }
                ],
                global: false
              }
            }
          }
        },
        xAxis: {
          data: time,
          axisLabel: {
            color: "rgba(1,160,205)"
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          }
        },
        yAxis: {
          axisLabel: {
            color: "rgba(1,160,205)"
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          }
        },
        series: [
          {
            data: count,
            type: "bar",
            itemStyle: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "rgba(	127,255,170,1)" },
                { offset: 0.7, color: "rgba(	127,255,170,1)" },
                { offset: 1, color: "rgba(	127,255,170,0.7)" }
              ])
            },
            emphasis: {
              itemStyle: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "rgba(	127,255,170,1)" },
                  { offset: 0.7, color: "rgba(	127,255,170,1)" },
                  { offset: 1, color: "rgba(	127,255,170,0.7)" }
                ])
              }
            }
          }
        ]
      });
      //轮播tooltip
      let index = 0; //播放所在下标
      this.mTime2 = setInterval(function() {
        myChart3.dispatchAction({
          type: "showTip",
          seriesIndex: 0,
          dataIndex: index
        });
        index++;
        if (index > time.length) {
          index = 0;
        }
      }, 1000);
    },
    initData(n) {
      //设备能力
      this.$axios({
        url: "api/v1/index/capablities",
        method: "get",
        params: {}
      }).then(res => {
        this.sbList = res.data.data.sb_List;
      });
      //报警总数
      this.$axios({
        url: "api/v1/index/alarm/statistics",
        method: "get",
        params: {}
      }).then(res => {
        this.bjList = res.data.data.list;
        this.totalAlerts = res.data.data.totalAlerts;
      });
      //地图上方数据
      this.$axios({
        url: "api/v1/index/count",
        method: "get",
        params: {}
      }).then(res => {
        this.mapList2 = res.data.data.count_list;
      });
      //车流量概览
      this.$axios({
        url: "api/v1/index/vehicle/statistics?street_code=" + n,
        method: "get",
        params: {}
      }).then(res => {
        this.carList = res.data.data.vehicle_statistics_list;
      });
      //人流量概览
      this.$axios({
        url: "api/v1/index/population_statistics?street_code=" + n,
        method: "get",
        params: {}
      }).then(res => {
        this.personList = res.data.data.population_statistics_list;
      });
      //检测值
      this.$axios({
        url: "api/v1/index/smartlamp/capablities/count?street_code=" + n,
        method: "get",
        params: {}
      }).then(res => {
        this.jcListnum = [];
        this.jcListname = [];
        let list = res.data.data.count_list;
        for (let i = 0; i < list.length; i++) {
          this.jcListnum.push(list[i].number);
          this.jcListname.push(list[i].name);
        }
      });
      //警报数值列表 （月度维护巡查统计）
      this.$axios({
        url: "api/v1/index/maintance",
        method: "get",
        params: {}
      }).then(res => {
        this.tjList = res.data.data;
      });
      //地图能力列表
      this.$axios({
        url: "api/v1/index/capablities/list",
        method: "get",
        params: {}
      }).then(res => {
        this.mapList1 = res.data.data.capablities_list;
      });
    },
    initArea() {
      //获取省级地名
      this.$axios({
        url: "api/v1/index/area?code=000000",
        method: "get",
        params: {}
      }).then(res => {
        this.province = res.data.data.area_list;
      });
    },
    initMarker() {
      //初始化地图标点数据
      this.$axios({
        url: "api/v1/index/smartlamp",
        method: "get",
        params: {}
      }).then(res => {
        this.markerList = res.data.data.smartlamp_list;
      });
    },
    select(value) {
      let code = "api/v1/index/area?code=" + value;
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
      let code = "api/v1/index/area?code=" + value1;
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
      let code = "api/v1/index/area?code=" + value2;
      //获取街道名
      this.$axios({
        url: code,
        method: "get",
        params: {}
      }).then(res => {
        this.streetList = res.data.data.area_list;
      });
    },
    search(n) {
      debugger;
      let code = "api/v1/index/area?code=" + this.areaCode;
      //精确查找街道名
      this.$axios({
        url: code,
        method: "get",
        params: { keyword: n }
      }).then(res => {
        if (res.status == 200) {
          this.streetList = res.data.data.area_list;
        } else {
          alert(res.data.msg);
        }
      });
    },
    searchMarker(n) {
      this.status = !this.status;
      if (this.statusCode == n) {
        this.imgShow = false;
        this.nlMarker = [];
        this.statusCode = "";
      } else {
        this.statusCode = n;
        this.imgShow = n;
        let code = "api/v1/index/smartlamp/capablities?capablities_id=" + n;
        //根据能力查询灯杆
        this.$axios({
          url: code,
          method: "get",
          params: {}
        }).then(res => {
          this.nlMarker = res.data.data.smartlamp_list;
        });
      }
    },
    streetSearch(n, index) {
      this.idx = index;
      let code = "api/v1/index/smartlamp/street?street_code=" + n;
      //根据街道查询灯杆
      this.$axios({
        url: code,
        method: "get",
        params: {}
      }).then(res => {
        this.markerList = res.data.data.smartlamp_list;
        this.center.lng = this.markerList[0].longtitude;
        this.center.lat = this.markerList[0].latitude;
        this.zoom = 17;
      });
      //根据街道查询图表数据
      this.initData(n);
    },
    showModal(n) {
      this.$axios({
        url: "api/v1/index/smartlamp/detail?smartlamp_id=" + n,
        method: "get",
        params: {}
      }).then(res => {
        this.detailList = res.data.data.smartlamp_detail;
        this.detailList1 = this.detailList[0].device_capablities_list;
        this.modal2Show = true;
        return;
      });
    },
    close(n) {
      if (n == 1) {
        this.modal1Show = false;
        return;
      }
      if (n == 2) {
        this.modal2Show = false;
        return;
      }
      if (n == 3) {
        this.videoShow = false;
        return;
      }
    },
    changeImg(n) {
      if (!this.statusCode) {
        if (n == 1) {
          this.imgShow = 1;
          return;
        }
        if (n == 2) {
          this.imgShow = 11;
          return;
        }
        if (n == 3) {
          this.imgShow = 2;
          return;
        }
        if (n == 4) {
          this.imgShow = 7;
          return;
        }
        if (n == 5) {
          this.imgShow = 13;
          return;
        }
        if (n == 6) {
          this.imgShow = 14;
          return;
        }
      }
    },
    changeImg1(n) {
      if (!this.statusCode) {
        this.imgShow = "";
      }
    },
    play(n) {
      this.videoSrc = n;
      this.videoShow = true;
    }
  },
  components: {
    MHeader
  },
  watch: {
    carList: function() {
      clearInterval(this.mTime1);
      clearInterval(this.mTime2);
      this.initCharts1();
      this.initCharts2();
      this.initCharts3();
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
  width: 99.5%;
}
.main1 {
  overflow: hidden;
  height: 631px;
}
.main2 {
  margin: 0 -5px;
  overflow: hidden;
  height: 365px;
}
.main1-left {
  float: left;
  width: 25.4%;
}
.main1-center {
  float: left;
  width: 50%;
}
.main1-right {
  float: left;
  width: 22.8%;
}
.main1-left,
.main1-center,
.main1-right {
  padding: 0 5px;
}
.box1 {
  width: 100%;
  height: 192px;
  /* background-color: rgba(0, 125, 214, 0.2); */
  border: 1px solid #083a5e;
  background: url("../assets/image/box1bg.png") no-repeat;
  background-size: 100%;
}
.table {
  margin: 10px;
  display: flex;
  flex-wrap: wrap;
}
.box1-1 {
  margin-left: 10px;
  width: 22%;
  height: 50px;
  color: #fff;
  border: 1px solid #409eff;
  text-align: center;
  margin-top: 10px;
  border-radius: 4px;
  cursor: pointer;
  box-sizing: border-box;
}
.box1-1:hover {
  background-color: #409eff;
  border: 1px solid #fff;
  color: #073d6c;
}
.box7-1 {
  margin-top: 15px;
  width: 25%;
  text-align: center;
}
.box7-1-1 {
  padding: 5px;
  background-color: rgba(9, 73, 122);
  margin-left: 20px;
}
.box7-1 img {
  margin-top: 10px;
  margin-left: 20px;
  width: 80px;
  height: 80px;
}
.box7-1 .title1-1 {
  color: rgba(0, 195, 243);
  font-size: 12px;
}
.box7-1 .number {
  font-size: 22px;
  color: #ffcd06;
  font-family: "LEDFont";
  /* border-bottom: 1px solid #00c3f3; */
}
.box1-1 .title1-1 {
  font-size: 14px;
  color: #fff;
}
.titlebg {
  left: 32%;
  top: 0;
  position: absolute;
}
.box1-1 .number {
  height: 35px;
  line-height: 35px;
  font-size: 22px;
  color: #ffcd06;
  font-family: "LEDFont";
}
.box2 {
  margin-top: 10px;
  width: 100%;
  height: 419px;
  background-color: rgba(0, 125, 214, 0.2);
  border: 1px solid #083a5e;
}
.box3 {
  position: relative;
  width: 100%;
  height: 621px;
  background-color: rgba(0, 125, 214, 0.2);
  border: 1px solid #083a5e;
}
.bm-view {
  padding: 5px;
  height: 621px;
}
.box4 {
  position: relative;
  width: 100%;
  height: 284px;
  background-color: rgba(0, 125, 214, 0.2);
  border: 1px solid #083a5e;
}
.box5 {
  margin-top: 10px;
  width: 100%;
  height: 327px;
  background-color: rgba(0, 125, 214, 0.2);
  border: 1px solid #083a5e;
}
.box5-1 {
  vertical-align: middle;
  margin-top: 20px;
  width: 30%;
  height: 90%;
  border: 0.5px solid #409eff;
  display: inline-block;
  margin-left: 10px;
}
.box5-1-1 {
  margin-top: 15px;
  text-align: center;
}
.box5-1-1 .title1 {
  font-size: 14px;
  color: #fff;
}
.box5-1-1 img {
  margin-top: 5px;
  width: 68px;
  height: 68px;
}
.box5-1-1 .number {
  font-size: 22px;
  color: #ffcd06;
  font-family: "LEDFont";
}
.box5-1-1 .name {
  font-size: 18px;
  color: rgba(0, 195, 243);
  font-family: "LEDFont";
}
.box5-1-1 .row {
  height: 30px;
  line-height: 30px;
}
.box5-1-1 .number2 {
  margin-right: 20px;
  float: right;
  font-size: 18px;
  color: #ffcd06;
  font-family: "LEDFont";
}
.box5-1-1 .name2 {
  margin-left: 20px;
  float: left;
  font-size: 14px;
  color: rgba(0, 195, 243);
}
.box6 {
  float: left;
  width: 31.2%;
  background-color: rgba(0, 125, 214, 0.2);
  border: 1px solid #083a5e;
}
.box7 {
  float: left;
  width: 37.6%;
  background-color: rgba(0, 125, 214, 0.2);
  border: 1px solid #083a5e;
}
.box8 {
  float: left;
  width: 30.2%;
  background-color: rgba(0, 125, 214, 0.2);
  border: 1px solid #083a5e;
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
.total {
  background-color: rgba(9, 78, 129);
  height: 30px;
}
.zs {
  float: left;
  margin-left: 20px;
  color: rgba(0, 193, 243);
  font-size: 16px;
  line-height: 30px;
  letter-spacing: 5px;
}
.number1 {
  float: right;
  margin-right: 20px;
  color: rgba(255, 205, 6);
  font-size: 20px;
  line-height: 30px;
  font-family: "LEDFont";
}
.chart1 {
  margin-top: 10px;
  width: 457px;
  height: 337px;
}
.chart2 {
  width: 575px;
  height: 300px;
}
.chart3 {
  width: 605px;
  height: 356px;
}
.selectBox {
  position: absolute;
  top: 10px;
  left: 0px;
  z-index: 2;
}
.selectBox span {
  color: #00b3ed;
  font-size: 13px;
}
.selectBox i {
  width: 5px;
  height: 5px;
  background-color: #00b3ed;
  display: inline-block;
  margin: 2px 10px;
}
.el-select {
  margin-right: 10px;
}
.searchBox {
  position: relative;
  top: 50px;
  left: 0;
  width: 100%;
  z-index: 2;
  padding: 0 20px;
}
.streetLi {
  height: 187px;
  text-align: left;
  padding-left: 23px;
  position: relative;
  top: 45px;
  z-index: 2;
  list-style: none;
  overflow-y: auto;
}
.streetLi li {
  width: 25%;
  display: inline-block;
}
.streetLi li span {
  display: inline-block;
  width: 80%;
  height: 32px;
  line-height: 32px;
  color: #fff;
  border: 1px solid #409eff;
  text-align: center;
  margin-top: 10px;
  border-radius: 4px;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.streetLi li span:hover {
  background-color: #409eff;
  border: 1px solid #fff;
  color: #073d6c;
}
.active {
  background-color: #409eff;
  border: 1px solid #fff;
  color: #073d6c;
}
.streetLi::-webkit-scrollbar {
  text-align: center;
  height: 70%;
  width: 10px;
  background: rgba(4, 54, 91);
}
.streetLi::-webkit-scrollbar-thumb {
  background: rgba(0, 221, 243);
  width: 8px;
  height: 10%;
  -webkit-border-radius: 8px;
}
.modal1::-webkit-scrollbar {
  text-align: center;
  width: 10px;
  background: rgba(4, 54, 91);
}
.modal1::-webkit-scrollbar-thumb {
  background: rgba(0, 221, 243);
  width: 8px;
  height: 10%;
  -webkit-border-radius: 8px;
}
.list {
  padding: 0 60px 10px;
  position: absolute;
  left: 50%;
  bottom: 0;
  font-size: 0;
  text-align: center;
  white-space: nowrap;
  transform: translateX(-50%);
  background: url(../assets/image/mapbg.png) center bottom -21px no-repeat;
  background-size: 100% 112px;
  z-index: 999;
}
.list li {
  text-align: center;
  font-size: 13px;
  color: #fff;
  font-weight: 400;
  padding: 3px 20px 0;
  display: inline-block;
  vertical-align: middle;
  position: relative;
}
.list2 {
  position: absolute;
  left: 12px;
  top: 11px;
  z-index: 3;
  text-align: center;
}
.list2 li {
  margin-right: 9px;
  float: left;
  width: 166px;
  height: 58px;
  background: url("../assets/image/list2bg.png") no-repeat;
  background-size: 100%;
  position: relative;
  overflow: hidden;
}
.list2 .p1 {
  font-size: 16px;
  color: #00e4ff;
  font-weight: 400;
}
.list2 .p2 {
  font-size: 22px;
  color: #ffcd06;
  line-height: 1.2;
  font-family: "LEDFont";
  position: absolute;
  bottom: 3px;
  left: 33px;
  width: 100px;
  overflow: hidden;
}
.modal1 {
  padding: 30px;
  top: 50px;
  right: 36px;
  position: absolute;
  width: 201px;
  /* height: 500px; */
  overflow-y: auto;
  background: rgba(8, 56, 103, 0.6);
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  opacity: 1;
}
.modal1 p {
  margin-top: 8px;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(221, 243, 255, 1);
  opacity: 1;
}
.close {
  position: absolute;
  top: 5px;
  right: 6px;
  z-index: 999;
}
.play {
  position: absolute;
  right: 2%;
  top: 80%;
}
.play1 {
  position: absolute;
  right: 2%;
  top: 70%;
}
.modal2 {
  padding: 10px;
  top: 100px;
  right: 96px;
  width: 460px;
  height: 380px;
  position: absolute;
  background: rgba(8, 56, 103, 0.6);
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  opacity: 1;
}
.modal2 video {
  width: 440px;
  height: 360px;
  border: 0;
  outline: none;
}
</style>
<style>
.selectBox .el-input--small .el-input__inner {
  padding: 0 10px;
  background-color: transparent;
  border: 1px solid #0961a0;
  color: #00b3ed;
}
/* .el-select-dropdown {
  background: rgba(9, 47, 66, 0.5) !important;
  border: 1px solid #00b3ed !important;
  color: #fff !important;
} */
/* .el-select-dropdown__item.hover {
  background-color: #00b3ed;
}
.el-select-dropdown__item {
  color: #fff;
} */
.searchBox .el-input {
  width: 65%;
}
.searchBox .el-input__inner {
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  height: 40px;
  line-height: 40px;
}
.searchBox .el-button {
  margin: 0 0 0 32px;
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
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;
}
</style>
