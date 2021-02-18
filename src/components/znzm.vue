<template>
  <div class="bg" style="width:100%;height:100%">
    <m-header hover="1"></m-header>
    <div class="content">
      <div class="left">
        <div class="box1">
          <div class="selectBox1">
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
          <div class="searchBox1">
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
              <el-switch
                v-model="item.status"
                @change="turnOn(item.smartlamp_id_list, item.status)"
              ></el-switch>
              <span class="num">{{ item.smartlamp_count }}</span>
              <img src="@/assets/image/jdicon.png" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div class="center">
        <div class="box2">
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
              v-if="item.fault_status_desc == '正常'"
              :key="item.id"
              :position="{ lng: item.longtitude, lat: item.latitude }"
              @click="showModal(item.id)"
              :icon="{
                url: require('../assets/image/marker.png'),
                size: { width: 47, height: 47 }
              }"
            >
            </bm-marker>
            <bm-marker
              v-for="item in markerList"
              v-if="item.fault_status_desc == '灭灯故障'"
              :key="item.id"
              :position="{ lng: item.longtitude, lat: item.latitude }"
              @click="showModal(item.id)"
              :icon="{
                url: require('../assets/image/marker2.png'),
                size: { width: 47, height: 47 }
              }"
            >
            </bm-marker>
            <bm-marker
              v-for="item in markerList"
              v-if="item.fault_status_desc == '其他故障'"
              :key="item.id"
              :position="{ lng: item.longtitude, lat: item.latitude }"
              @click="showModal(item.id)"
              :icon="{
                url: require('../assets/image/marker3.png'),
                size: { width: 47, height: 47 }
              }"
            >
            </bm-marker>
            <bm-marker
              v-for="item in markerList"
              v-if="item.fault_status_desc == '供电故障'"
              :key="item.id"
              :position="{ lng: item.longtitude, lat: item.latitude }"
              @click="showModal(item.id)"
              :icon="{
                url: require('../assets/image/marker1.png'),
                size: { width: 47, height: 47 }
              }"
            >
            </bm-marker>

            <bm-marker
              v-for="item in markerList1"
              v-if="item.fault_status_desc == '正常'"
              :key="item.id"
              :position="{ lng: item.longtitude, lat: item.latitude }"
              @click="showModal(item.id)"
              :icon="{
                url: require('../assets/image/marker.png'),
                size: { width: 47, height: 47 }
              }"
            >
            </bm-marker>
            <bm-marker
              v-for="item in markerList1"
              v-if="item.fault_status_desc == '灭灯故障'"
              :key="item.id"
              :position="{ lng: item.longtitude, lat: item.latitude }"
              @click="showModal(item.id)"
              :icon="{
                url: require('../assets/image/marker2.png'),
                size: { width: 47, height: 47 }
              }"
            >
            </bm-marker>
            <bm-marker
              v-for="item in markerList1"
              v-if="item.fault_status_desc == '其他故障'"
              :key="item.id"
              :position="{ lng: item.longtitude, lat: item.latitude }"
              @click="showModal(item.id)"
              :icon="{
                url: require('../assets/image/marker3.png'),
                size: { width: 47, height: 47 }
              }"
            >
            </bm-marker>
            <bm-marker
              v-for="item in markerList1"
              v-if="item.fault_status_desc == '供电故障'"
              :key="item.id"
              :position="{ lng: item.longtitude, lat: item.latitude }"
              @click="showModal(item.id)"
              :icon="{
                url: require('../assets/image/marker1.png'),
                size: { width: 47, height: 47 }
              }"
            >
            </bm-marker>
          </baidu-map>
          <div class="modal" v-if="modalShow">
            <img
              class="close"
              src="@/assets/image/close.png"
              @click="close(1)"
            />
            <div class="modal1-1">
              <p>
                灯杆编号：<span>{{ this.detailList.id }}</span>
              </p>
              <p>
                灯杆名称：<span>{{ this.detailList.name }}</span>
              </p>
              <p>
                灯杆位置：<span>{{ this.detailList.street_name }}</span>
              </p>
              <p>
                灯杆状态：<span>{{ this.detailList.fault_status_desc }}</span>
              </p>
              <p>
                当前功率：<span>{{ this.detailList.now_power }}</span>
              </p>
              <p>
                设计功率：<span>{{ this.detailList.design_power }}</span>
              </p>
              <p>
                当前用电：<span>{{ this.detailList.pused_today }}</span>
              </p>
              <p>
                昨日用电：<span>{{ this.detailList.pused_lastday }}</span>
              </p>
              <p v-if="this.detailList.is_power">是否通电：<span>是</span></p>
              <p v-else>是否通电：<span>否</span></p>
              <el-switch
                v-model="this.detailList.is_power"
                @change="turnOn1()"
              ></el-switch>
            </div>
          </div>
          <div class="modal1-2" v-show="modal2Show">
            <img
              class="close"
              src="@/assets/image/close.png"
              @click="close(2)"
            />
            <p>{{ this.resMsg }}</p>
          </div>
        </div>
        <div class="box3">
          <div class="title">事件推送</div>
          <img class="titlebg" src="@/assets/image/titlebg.png" alt="" />
          <ul>
            <li v-for="(item, index) in sjList" :key="index">
              <span class="span1">{{ item.rule_id }}</span>
              <span class="span2">{{ item.smartlamp_name }}</span>
              <span class="span3">{{ item.rule_description }}</span>
              <span class="span4">{{ item.event_description }}</span>
              <span class="span5">{{ item.create_time }}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="right">
        <div class="box4">
          <div class="title">实时故障</div>
          <img
            class="titlebg"
            style="left: 30%;"
            src="@/assets/image/titlebg.png"
            alt=""
          />
          <div class="box4-1">
            <p class="p1">供电故障</p>
            <img src="@/assets/image/gz1.png" alt="" />
            <p class="p2">{{ this.gzList.power_error_count }}</p>
          </div>
          <div class="box4-1">
            <p class="p1">灭灯故障</p>
            <img src="@/assets/image/gz1.png" alt="" />
            <p class="p2" style="color: #f7f7f7;">
              {{ this.gzList.light_error_count }}
            </p>
          </div>
          <div class="box4-1">
            <p class="p1">其他故障</p>
            <img src="@/assets/image/gz1.png" alt="" />
            <p class="p2" style="color: #ff0000;">
              {{ this.gzList.other_error_count }}
            </p>
          </div>
        </div>
        <div class="box5">
          <div class="title">实时功率</div>
          <img
            class="titlebg"
            style="left: 30%;"
            src="@/assets/image/titlebg.png"
            alt=""
          />
          <div class="box5-1">
            <div class="p1">{{ this.gzList.now_power }}<span>W</span></div>
            <div class="p2">当前功率(KW)</div>
          </div>
          <div class="staright"></div>
          <div class="box5-1">
            <div class="p1">{{ this.gzList.design_power }}<span>W</span></div>
            <div class="p2">设计功率(KW)</div>
          </div>
          <div id="echarts1"></div>
        </div>
        <div class="box6">
          <div class="title">实时用电</div>
          <img
            class="titlebg"
            style="left: 30%;"
            src="@/assets/image/titlebg.png"
            alt=""
          />
          <div id="echarts2"></div>
          <div id="echarts3"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MHeader from "@/components/header/header.vue";
import "echarts-liquidfill";
export default {
  data() {
    return {
      province: [],
      value: "广东",
      cities: [],
      value1: "广州",
      areas: [],
      value2: "番禺",
      input: "",
      jdList: [],
      keyvalue: "",
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
      markerList: [],
      markerList1: [],
      sjList: [],
      gzList: [],
      modalShow: false,
      modal2Show: false,
      areaCode: "",
      resMsg: "",
      isOn: false
    };
  },
  mounted() {
    this.initArea();
    this.initMarker();
    this.select(440000); //初始化广州联动
    this.select1(440100);
    this.select2(440113);
    this.initData(440113007);
    setTimeout(() => {
      this.initCharts(); //初始化图表
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
    initArea() {
      //获取省级地名
      this.$axios({
        url: "api/v1/smartlight/area?code=000000",
        method: "get",
        params: {}
      }).then(res => {
        this.province = res.data.data.area_list;
      });
    },
    initMarker() {
      //初始化地图标点数据
      this.$axios({
        url: "api/v1/smartlight/smartlamps",
        method: "get",
        params: {}
      }).then(res => {
        this.markerList = res.data.data.smartlamp_list;
      });
    },
    initData(n) {
      let code = "api/v1/smartlight/power?street_code=" + n;
      let code1 = "api/v1/smartlight/event?street_code=" + n;
      //获取图表数据
      this.$axios({
        url: code,
        method: "get",
        params: {}
      }).then(res => {
        this.gzList = res.data.data;
      });
      //获取事件推送
      this.$axios({
        url: code1,
        method: "get",
        params: {}
      }).then(res => {
        this.sjList = res.data.data.smartlamp_event_list;
      });
    },
    initCharts() {
      let myChart1 = this.$echarts.init(document.getElementById("echarts1"));
      let color = ["#af00a9", "#ffb800", "#00ed03"];

      let precent = this.gzList.power_per;
      myChart1.setOption({
        backgroundColor: "rgba(12,61,118,0.1)",
        series: [
          {
            name: "",
            type: "gauge",
            splitNumber: 10, //刻度数量
            min: 0,
            max: 100,
            radius: "80%", //图表尺寸
            center: ["50%", "50%"],
            axisLine: {
              show: true,
              lineStyle: {
                width: 0,
                shadowBlur: 0,
                color: [[1, "#fff"]]
              }
            },
            axisTick: {
              show: true,
              lineStyle: {
                color: "auto",
                width: 2
              },
              length: 20,
              splitNumber: 5
            },
            splitLine: {
              show: true,
              length: 22,
              lineStyle: {
                color: "auto"
              }
            },
            axisLabel: {
              show: false
            },
            pointer: {
              //仪表盘指针
              show: 0
            },
            detail: {
              show: 0
            }
          },
          {
            //name: data[0],
            type: "gauge",
            splitNumber: 10, //刻度数量
            min: 0,
            max: 100,
            radius: "80%", //图表尺寸
            center: ["50%", "50%"],
            axisLine: {
              show: true,
              lineStyle: {
                width: 0,
                shadowBlur: 0,
                color: [
                  [0.05, "#cf3"],
                  [0.1, "#9f3"],
                  [0.15, "#6f3"],
                  [0.2, "#3f3"],
                  [0.25, "#3f6"],
                  [0.3, "#3f9"],
                  [0.35, "#3fc"],
                  [0.4, "#3ff"],
                  [0.45, "#3cf"],
                  [0.5, "#39f"],
                  [0.55, "#36f"],
                  [0.6, "#33f"],
                  [0.65, "#63f"],
                  [0.7, "#93f"],
                  [0.75, "#c3f"],
                  [0.8, "#f3f"],
                  [0.85, "#f3c"],
                  [0.9, "#f39"],
                  [0.95, "#f36"],
                  [1, "#fff"]
                ]
              }
            },
            axisTick: {
              show: true,
              lineStyle: {
                color: "auto",
                width: 2
              },
              length: 20,
              splitNumber: 5
            },
            splitLine: {
              show: true,
              length: 22,
              lineStyle: {
                color: "auto"
              }
            },
            axisLabel: {
              show: false
            },
            pointer: {
              //仪表盘指针
              show: 0,
              length: "70%",
              width: 2
            },
            detail: {
              borderColor: "#fff",
              shadowColor: "#fff", //默认透明
              shadowBlur: 2,
              offsetCenter: [0, "0%"], // x, y，单位px
              textStyle: {
                // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                color: "#fff",
                fontSize: 30
              },
              formatter: "{value}%"
            },
            data: [
              {
                name: "",
                value: precent
              }
            ]
          }
        ]
      });

      let myChart2 = this.$echarts.init(document.getElementById("echarts2"));
      let value = this.gzList.pused_today;
      let value1 = this.gzList.pused_lastday;
      let data1 = [value, value, value];
      myChart2.setOption({
        title: {
          text: value + "kw/h",
          textStyle: {
            fontSize: 20,
            fontFamily: "Microsoft Yahei",
            fontWeight: "normal",
            color: "#bcb8fb",
            rich: {
              a: {
                fontSize: 28
              }
            }
          },
          x: "center",
          y: "35%"
        },
        graphic: [
          {
            type: "group",
            left: "center",
            top: "60%",
            children: [
              {
                type: "text",
                z: 100,
                left: "10",
                top: "middle",
                style: {
                  fill: "#aab2fa",
                  text: "当日用电",
                  font: "20px Microsoft YaHei"
                }
              }
            ]
          }
        ],
        series: [
          {
            type: "liquidFill",
            radius: "80%",
            center: ["50%", "50%"],
            //  shape: 'roundRect',
            data: data1,
            backgroundStyle: {
              color: {
                type: "linear",
                x: 1,
                y: 0,
                x2: 0.5,
                y2: 1,
                colorStops: [
                  {
                    offset: 1,
                    color: "rgba(68, 145, 253, 0)"
                  },
                  {
                    offset: 0.5,
                    color: "rgba(68, 145, 253, .25)"
                  },
                  {
                    offset: 0,
                    color: "rgba(68, 145, 253, 1)"
                  }
                ],
                globalCoord: false
              }
            },
            outline: {
              borderDistance: 0,
              itemStyle: {
                borderWidth: 20,
                borderColor: {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: "rgba(69, 73, 240, 0)"
                    },
                    {
                      offset: 0.5,
                      color: "rgba(69, 73, 240, .25)"
                    },
                    {
                      offset: 1,
                      color: "rgba(69, 73, 240, 1)"
                    }
                  ],
                  globalCoord: false
                },
                shadowBlur: 10,
                shadowColor: "#000"
              }
            },
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 1,
                  color: "rgba(58, 71, 212, 0)"
                },
                {
                  offset: 0.5,
                  color: "rgba(31, 222, 225, .2)"
                },
                {
                  offset: 0,
                  color: "rgba(31, 222, 225, 1)"
                }
              ],
              globalCoord: false
            },
            label: {
              normal: {
                formatter: ""
              }
            }
          }
        ]
      });

      let myChart3 = this.$echarts.init(document.getElementById("echarts3"));
      myChart3.setOption({
        // backgroundColor: new this.$echarts.graphic.RadialGradient(0.3, 0.3, 0.8, [{
        //     offset: 0,
        //     color: '#431ab8'
        // },
        // {
        //     offset: 1,
        //     color: '#471bba'
        // }]),
        title: {
          text: value1 + "kw/h",
          textStyle: {
            fontSize: 20,
            fontFamily: "Microsoft Yahei",
            fontWeight: "normal",
            color: "#bcb8fb",
            rich: {
              a: {
                fontSize: 28
              }
            }
          },
          x: "center",
          y: "35%"
        },
        graphic: [
          {
            type: "group",
            left: "center",
            top: "60%",
            children: [
              {
                type: "text",
                z: 100,
                left: "10",
                top: "middle",
                style: {
                  fill: "#aab2fa",
                  text: "昨日用电",
                  font: "20px Microsoft YaHei"
                }
              }
            ]
          }
        ],
        series: [
          {
            type: "liquidFill",
            radius: "80%",
            center: ["50%", "50%"],
            //  shape: 'roundRect',
            data: data1,
            backgroundStyle: {
              color: {
                type: "linear",
                x: 1,
                y: 0,
                x2: 0.5,
                y2: 1,
                colorStops: [
                  {
                    offset: 1,
                    color: "rgba(68, 145, 253, 0)"
                  },
                  {
                    offset: 0.5,
                    color: "rgba(68, 145, 253, .25)"
                  },
                  {
                    offset: 0,
                    color: "rgba(68, 145, 253, 1)"
                  }
                ],
                globalCoord: false
              }
            },
            outline: {
              borderDistance: 0,
              itemStyle: {
                borderWidth: 20,
                borderColor: {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: "rgba(69, 73, 240, 0)"
                    },
                    {
                      offset: 0.5,
                      color: "rgba(69, 73, 240, .25)"
                    },
                    {
                      offset: 1,
                      color: "rgba(69, 73, 240, 1)"
                    }
                  ],
                  globalCoord: false
                },
                shadowBlur: 10,
                shadowColor: "#000"
              }
            },
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 1,
                  color: "rgba(58, 71, 212, 0)"
                },
                {
                  offset: 0.5,
                  color: "rgba(31, 222, 225, .2)"
                },
                {
                  offset: 0,
                  color: "rgba(31, 222, 225, 1)"
                }
              ],
              globalCoord: false
            },
            label: {
              normal: {
                formatter: ""
              }
            }
          }
        ]
      });
    },
    select(value) {
      let code = "api/v1/smartlight/area?code=" + value;
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
      let code = "api/v1/smartlight/area?code=" + value1;
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
      let code = "api/v1/smartlight/area?code=" + value2;
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
      this.modalShow = false;
      this.markerList = [];
      let code = "api/v1/smartlight/smartlamp/street?street_code=" + n;
      this.zoom = 17;
      this.initData(n);
      //let code = "api/v1/index/smartlamp/street?street_code=440113007";
      //根据街道查询灯杆
      this.$axios({
        url: code,
        method: "get",
        params: {}
      }).then(res => {
        this.markerList1 = res.data.data.smartlamp_list;
        this.center.lng = this.markerList1[0].longtitude;
        this.center.lat = this.markerList1[0].latitude;
        this.zoom = 17;
      });
    },
    turnOn(n, status) {
      let arrays = JSON.stringify(n);
      if (status == false) {
        //断电
        let code = "api/v1/smartlight/power/stop";
        this.$axios({
          url: code,
          method: "post",
          params: { arrays: arrays },
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }).then(res => {
          if (res.status == 200) {
            this.resMsg = res.data.msg;
            this.modal2Show = true;
            this.coverShow = true;
          }
        });
      } else {
        //通电
        let code = "api/v1/smartlight/power/start";
        this.$axios({
          url: code,
          method: "post",
          params: { arrays: arrays },
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }).then(res => {
          if (res.status == 200) {
            this.resMsg = res.data.msg;
            this.modal2Show = true;
            this.coverShow = true;
          }
        });
      }
    },
    turnOn1() {
      let data = [];
      data.push(this.detailList.id);
      data = JSON.stringify(data);
      if (this.detailList.is_power == true) {
        //断电
        let code = "api/v1/smartlight/power/stop";
        this.$axios({
          url: code,
          method: "post",
          params: { arrays: data },
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }).then(res => {
          if (res.status == 200) {
            this.resMsg = res.data.msg;
            this.detailList.is_power = false;
            this.modal2Show = true;
            this.coverShow = true;
          }
        });
      } else {
        //通电
        let code = "api/v1/smartlight/power/start";
        this.$axios({
          url: code,
          method: "post",
          params: { arrays: data },
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }).then(res => {
          if (res.status == 200) {
            this.resMsg = res.data.msg;
            this.detailList.is_power = true;
            this.modal2Show = true;
            this.coverShow = true;
          }
        });
      }
    },
    search(n) {
      let code = "api/v1/smartlight/area?code=" + this.areaCode;
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
    showModal(n) {
      let id = n;
      this.$axios({
        url: "api/v1/smartlight/smartlamp/detail?smartlamp_id=" + id,
        method: "get",
        params: {}
      }).then(res => {
        this.detailList = res.data.data;
        this.modalShow = true;
      });
    },
    close(n) {
      if (n == 1) {
        this.modalShow = false;
      }
      if (n == 2) {
        this.modal2Show = false;
      }
    }
  },
  components: {
    MHeader
  },
  watch: {
    gzList: function() {
      this.initCharts();
    }
  }
};
</script>

<style scoped>
.close {
  position: absolute;
  top: 5px;
  right: 6px;
}
.bg {
  background: url("../assets/image/body-bg1.jpg") no-repeat;
  background-size: 100%;
}
.content {
  width: 99.8%;
}
.left {
  float: left;
  width: 20.3%;
}
.center {
  margin-left: 17px;
  float: left;
  width: 54.3%;
}
.right {
  margin-left: 21px;
  float: left;
  width: 22.9%;
}
.box1 {
  width: 100%;
  height: 971px;
  position: relative;
  background: rgba(6, 83, 157, 0.3);
  border: 1px solid rgba(28, 82, 144, 1);
  opacity: 1;
}
.box2 {
  position: relative;
  width: 100%;
  height: 745px;
  background: rgba(6, 83, 157, 0.3);
  border: 1px solid rgba(28, 82, 144, 1);
  opacity: 1;
}
.box3 {
  position: relative;
  margin-top: 18px;
  width: 100%;
  height: 204px;
  background: rgba(6, 83, 157, 0.32);
  border: 1px solid rgba(28, 82, 144, 1);
  opacity: 1;
}
.box4 {
  position: relative;
  width: 100%;
  height: 337px;
  background: rgba(6, 83, 157, 0.3);
  border: 1px solid rgba(28, 82, 144, 1);
  opacity: 1;
}
.box5 {
  position: relative;
  margin-top: 20px;
  width: 100%;
  height: 385px;
  background: rgba(6, 83, 157, 0.3);
  border: 1px solid rgba(28, 82, 144, 1);
  opacity: 1;
}
.box6 {
  position: relative;
  margin-top: 18px;
  width: 100%;
  height: 205px;
  background: rgba(6, 83, 157, 0.3);
  border: 1px solid rgba(28, 82, 144, 1);
  opacity: 1;
}
.selectBox1 {
  position: absolute;
  top: 10px;
  left: 0px;
  z-index: 2;
}
.selectBox1 span {
  color: #00b3ed;
  font-size: 13px;
}
.selectBox1 i {
  width: 5px;
  height: 5px;
  background-color: #00b3ed;
  display: inline-block;
  margin: 2px 10px;
}
.el-select {
  margin-right: 15px;
}
.searchBox1 {
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
  height: 842px;
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
  font-size: 14px;
  font-family: Segoe UI;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  opacity: 1;
}
.jd .name {
  margin-left: 10px;
  margin-right: auto;
}
.jd .num {
  margin-left: 18px;
  width: 20px;
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
.jdAll::-webkit-scrollbar,
.box3 ul::-webkit-scrollbar {
  text-align: center;
  height: 100%;
  width: 10px;
  background: rgba(4, 54, 91);
}
/*滚动条里面小方块*/
.jdAll::-webkit-scrollbar-thumb,
.box3 ul::-webkit-scrollbar-thumb {
  background: rgba(19, 117, 146);
  width: 5px;
  height: 30%;
  -webkit-border-radius: 15px;
}
.bm-view {
  padding: 5px;
  height: 745px;
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
.box3 ul {
  height: 163px;
  overflow: auto;
  margin: 8px 36px 8px 36px;
}
.box3 ul li {
  height: 30px;
  line-height: 30px;
  font-size: 13px;
  font-family: Segoe UI;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  opacity: 1;
  border-bottom: 1px solid rgba(5, 85, 129, 1);
}
.box3 ul li span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
}
.box3 ul li .span1,
.box3 ul li .span2,
.box3 ul li .span3,
.box3 ul li .span4,
.box3 ul li .span5 {
  width: 180px;
}
/* .box3 ul li .span2 {
  width: 136px;
}
.box3 ul li .span3 {
  width: 208px;
}
.box3 ul li .span4 {
  width: 208px;
}
.box3 ul li .span5 {
  width: 121px;
} */
.box4-1 {
  width: 30%;
  height: 285px;
  background: rgba(255, 255, 255, 0);
  border: 1px solid rgba(5, 85, 129, 1);
  opacity: 1;
  display: inline-block;
  margin-left: 8px;
  text-align: center;
}
.box4-1 img {
  margin-top: 32px;
  width: 68px;
  height: 68px;
}
.box4-1 .p1 {
  margin-top: 25px;
  font-size: 20px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(221, 243, 255, 1);
  opacity: 1;
}
.box4-1 .p2 {
  padding-top: 15px;
  margin-top: 25px;
  border-top: 1px solid rgba(5, 85, 129, 1);
  font-size: 70px;
  font-family: "LEDFont";
  font-weight: 400;
  color: rgba(240, 139, 31, 1);
  opacity: 1;
}
.box5-1 {
  text-align: center;
  margin-left: 20px;
  margin-top: 35px;
  width: 180px;
  height: 109px;
  background: rgba(255, 255, 255, 0);
  border: 1px solid rgba(5, 85, 129, 1);
  opacity: 1;
}
.box5-1 .p1 {
  margin-top: 10px;
  font-size: 36px;
  font-family: "LEDFont";
  font-weight: normal;
  line-height: 48px;
  color: rgba(129, 211, 248, 1);
  opacity: 1;
}
.box5-1 span {
  margin-left: 5px;
  font-size: 26px;
  font-family: Segoe UI;
}
.box5-1 .p2 {
  font-size: 20px;
  font-family: Segoe UI;
  font-weight: 400;
  color: rgba(233, 248, 255, 1);
  opacity: 1;
}
.staright {
  margin-left: 10px;
  margin-top: 35px;
  content: "";
  width: 209px;
  height: 1px;
  background: rgba(5, 85, 129, 1);
  opacity: 1;
}
#echarts1 {
  top: 80px;
  right: 0px;
  position: absolute;
  width: 230px;
  height: 230px;
}
#echarts2,
#echarts3 {
  margin-left: 30px;
  display: inline-block;
  width: 162px;
  height: 162px;
}
.modal {
  top: 291px;
  right: 196px;
  position: absolute;
  width: 291px;
  height: 305px;
  background: rgba(8, 56, 103, 0.6);
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  opacity: 1;
}
.modal1-1 {
  width: 225px;
  height: 261px;
  margin: 0 auto;
  margin-top: 33px;
}
.modal1-1 p {
  margin-top: 8px;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(221, 243, 255, 1);
  opacity: 1;
}
.modal1-1 .el-switch {
  position: absolute;
  right: 40px;
  bottom: 20px;
}
.modal1-2 {
  z-index: 1001;
  text-align: center;
  position: absolute;
  top: 47%;
  left: 42%;
  width: 239px;
  height: 181px;
  background: rgba(8, 56, 103, 0.7);
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  opacity: 1;
}
.modal1-2 p {
  margin-top: 74px;
  font-size: 23px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(221, 243, 255, 1);
  opacity: 1;
}
</style>

<style>
.selectBox1 .el-input--small .el-input__inner {
  padding: 0 10px;
  background-color: transparent;
  border: 1px solid #0961a0;
  color: #00b3ed;
}
.searchBox1 .el-input {
  width: 65%;
}
.searchBox1 .el-input__inner {
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
.searchBox1 .el-button {
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