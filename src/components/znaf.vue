<template>
  <div class="bg" style="width:100%;height:100%">
    <m-header hover="3"></m-header>
    <div class="content">
      <div class="left">
        <div class="box1">
          <div class="selectBox3">
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
          <div class="searchBox3">
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
          </baidu-map>
          <div class="modal1" v-if="modal1Show">
            <img
              class="close"
              src="@/assets/image/close.png"
              @click="close(1)"
            />
            <p v-for="(item, index) in this.detailList" :key="index">
              <span
                ><el-button
                  class="play"
                  @click="play(item.value)"
                  v-if="item.capablities == '车辆摄像'"
                  type="primary"
                  >车辆摄像</el-button
                ></span
              >
              <span>
                <el-button
                  class="play1"
                  @click="play(item.value)"
                  v-if="item.capablities == '人员摄像'"
                  type="primary"
                  >人员摄像</el-button
                >
              </span>
            </p>
          </div>
          <div class="modal2" v-if="videoShow">
            <img
              class="close"
              src="@/assets/image/close.png"
              @click="close(2)"
            />
            <video
              :src="videoSrc"
              autoplay="autoplay"
              width="100%"
              height="100%"
              controls
            ></video>
          </div>
        </div>
        <div class="box3">
          <div class="title">人员管理</div>
          <img
            class="titlebg"
            style="left: 41.5%;"
            src="@/assets/image/titlebg.png"
            alt=""
          />
          <div class="box3-1">
            <div
              class="box3-1-1"
              v-for="(item, index) in errorList"
              :key="index"
            >
              <img :src="item.img" alt="" />
              <p>
                <span class="span1"
                  >姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名:</span
                ><span class="span2">{{ item.name }}</span>
              </p>
              <p>
                <span class="span1">人员类型:</span
                ><span class="span2">{{ item.type }}</span>
              </p>
              <p>
                <span class="span1">身份证号:</span
                ><span class="span3">{{ item.num }}</span>
              </p>
              <p>
                <span class="span1">识别时间:</span
                ><span class="span2">{{ item.time }}</span>
              </p>
            </div>
            <div class="title1">
              <p>嫌疑人监测</p>
            </div>
          </div>
          <div class="staright2"></div>
          <div class="box3-1" style="margin-left: 10px;">
            <div class="title1 title2">
              <p>人员聚集监测</p>
            </div>
            <div
              class="box3-1-1"
              v-for="(item1, index) in normalList"
              :key="index"
            >
              <img :src="item1.img" alt="" />
              <p>
                <span class="span1"
                  >姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名:</span
                ><span class="span2">{{ item1.name }}</span>
              </p>
              <p>
                <span class="span1">人员类型:</span
                ><span class="span2">{{ item1.type }}</span>
              </p>
              <p>
                <span class="span1">身份证号:</span
                ><span class="span3">{{ item1.num }}</span>
              </p>
              <p>
                <span class="span1">识别时间:</span
                ><span class="span2">{{ item1.time }}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="box4" style="margin-top: 0;">
          <div class="title">车辆管理</div>
          <img class="titlebg" src="@/assets/image/titlebg.png" />
          <div class="box4-1-1" v-for="(item, index) in carList" :key="index">
            <img :src="item.img" alt="" />
            <p>
              <span class="span1">车&nbsp;&nbsp;牌&nbsp;&nbsp;号:</span
              ><span class="span2">{{ item.car_num }}</span>
            </p>
            <p>
              <span class="span1">车牌类型:</span
              ><span class="span2">{{ item.type }}</span>
            </p>
            <p>
              <span class="span1">监控位置:</span
              ><span class="span2">{{ item.address }}</span>
            </p>
            <p>
              <span class="span1">监控时间:</span
              ><span class="span2">{{ item.time }}</span>
            </p>
          </div>
        </div>
        <div class="box4">
          <div class="title">车辆事件推送</div>
          <img class="titlebg" src="@/assets/image/titlebg.png" />
          <div class="box4-1">
            <div class="row1" v-for="(item, index) in clList" :key="index">
              <span class="span1">{{ item.security_type }}</span>
              <span class="span2">{{ item.create_time }}</span>
              <span class="span3">{{ item.security_description }}</span>
            </div>
          </div>
        </div>
        <div class="box4">
          <div class="title">人员事件推送</div>
          <img class="titlebg" src="@/assets/image/titlebg.png" />
          <div class="box4-1">
            <div class="row1" v-for="(item, index) in ryList" :key="index">
              <span class="span1">{{ item.security_type }}</span>
              <span class="span2">{{ item.create_time }}</span>
              <span class="span3">{{ item.security_description }}</span>
            </div>
          </div>
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
      province: [],
      value: "广东",
      cities: [],
      value1: "广州",
      areas: [],
      value2: "番禺",
      keyvalue: "",
      jdList: [],
      markerList: [],
      modal1Show: false,
      detailList: [],
      videoSrc: "",
      videoShow: false,
      carList: [],
      errorList: [],
      normalList: [],
      clList: [],
      ryList: [],
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
      areaCode: ""
    };
  },
  mounted() {
    this.initArea();
    this.select(440000); //初始化广州联动
    this.select1(440100);
    this.select2(440113);
    this.initMarker(); //初始化地图标点数据
    this.initCar(440113007); //初始化车辆管理
    this.initPerson(440113007); //初始化人员管理
    this.initEvent(440113007); //初始化事件推送
  },
  methods: {
    initArea() {
      //获取省级地名
      this.$axios({
        url: "api/v1/security/area?code=000000",
        method: "get",
        params: {}
      }).then(res => {
        this.province = res.data.data.area_list;
      });
    },
    select(value) {
      let code = "api/v1/security/area?code=" + value;
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
      let code = "api/v1/security/area?code=" + value1;
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
      let code = "api/v1/security/area?code=" + value2;
      //获取街道名
      this.$axios({
        url: code,
        method: "get",
        params: {}
      }).then(res => {
        this.jdList = res.data.data.area_list;
      });
    },
    search(n) {
      let code = "api/v1/security/area?code=" + this.areaCode;
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
    handler({ Bmap, map }) {
      //初始化地图数据
      // var point = new BMap.Point(113.3721, 22.9531);
      // map.centerAndZoom(point, 15);
      this.center.lng = 113.3721;
      this.center.lat = 22.9531;
      this.zoom = 15;
    },
    initMarker() {
      //初始化地图标点数据
      this.$axios({
        url: "api/v1/security/smartlamps",
        method: "get",
        params: {}
      }).then(res => {
        this.markerList = res.data.data.smartlamp_list;
        console.log(this.markerList);
      });
    },
    initCar(n) {
      let code = "api/v1/security/cars?street_code=" + n;
      //初始化车辆管理
      this.$axios({
        url: code,
        method: "get",
        params: {}
      }).then(res => {
        this.carList = res.data.data.car_info_list;
      });
    },
    initPerson(n) {
      let code = "api/v1/security/people?street_code=" + n;
      //初始化人员管理
      this.$axios({
        url: code,
        method: "get",
        params: {}
      }).then(res => {
        this.errorList = res.data.data.people_error_info_list;
        this.normalList = res.data.data.people_normal_info_list;
      });
    },
    initEvent(n) {
      let code = "api/v1/security/event?street_code=" + n;
      //初始化人员管理
      this.$axios({
        url: code,
        method: "get",
        params: {}
      }).then(res => {
        this.clList = res.data.data.security_event_car_list;
        this.ryList = res.data.data.security_event_people_list;
      });
    },
    streetSearch(n) {
      let code = "api/v1/security/smartlamp/street?street_code=" + n;
      this.zoom = 17;
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
      //根据街道查询车辆管理
      this.initCar(n);
      //根据街道查询人员管理
      this.initPerson(n);
      //根据街道查询事件推送
      this.initEvent(n);
      this.modal1Show = false;
      this.videoShow = false;
    },
    showModal(n) {
      this.$axios({
        url: "api/v1/security/smartlamp/detail?smartlamp_id=" + n,
        method: "get",
        params: {}
      }).then(res => {
        let data = res.data.data.smartlamp_detail;
        this.detailList = data[0].device_capablities_list;
        this.modal1Show = true;
        return;
      });
    },
    close(n) {
      if (n == 1) {
        this.modal1Show = false;
      }
      if (n == 2) {
        this.videoShow = false;
      }
    },
    play(n) {
      this.videoSrc = n;
      this.videoShow = true;
    }
  },
  components: {
    MHeader
  }
};
</script>

<style scoped>
.bg {
  background: url("../assets/image/body-bg1.jpg") no-repeat;
  background-size: 100%;
}
.content {
  margin: 12px;
  width: 98.9%;
}
.left {
  float: left;
  width: 19%;
}
.center {
  margin-left: 17px;
  float: left;
  width: 54.3%;
}
.right {
  margin-left: 21px;
  float: left;
  width: 23.7%;
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
  left: 30%;
  top: 0;
  position: absolute;
}
.box1 {
  width: 100%;
  height: 969px;
  position: relative;
  background: rgba(6, 83, 157, 0.3);
  border: 1px solid rgba(28, 82, 144, 1);
  opacity: 1;
}
.box2 {
  position: relative;
  width: 100%;
  height: 641px;
  background: rgba(6, 83, 157, 0.3);
  border: 1px solid rgba(28, 82, 144, 1);
  opacity: 1;
}
.box3 {
  position: relative;
  margin-top: 14px;
  width: 100%;
  height: 312px;
  background: rgba(6, 83, 157, 0.32);
  border: 1px solid rgba(28, 82, 144, 1);
  opacity: 1;
}
.box3-1 {
  width: 49%;
  margin-top: 15px;
  display: inline-block;
}
.box3-1-1 {
  margin-left: 35px;
  display: inline-block;
}
.box3-1-1 img {
  width: 120px;
  height: 114px;
}
.box3-1-1 p {
  margin-top: 5px;
  height: 25px;
  line-height: 25px;
  font-size: 10px;
  font-family: Segoe UI;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  opacity: 1;
}
.box3-1-1 .span2 {
  margin-left: 5px;
}
.box3-1-1 .span3 {
  position: absolute;
}
.title1 {
  float: right;
  padding-top: 30px;
  vertical-align: top;
  width: 78px;
  height: 139px;
  background: rgba(6, 135, 235, 0.09);
  border: 1px solid rgba(38, 103, 166, 1);
  opacity: 1;
  border-radius: 5px;
}
.title2 {
  float: left;
  margin-left: 10px;
}
.title1 p {
  margin: 0 auto;
  width: 15px;
  height: 99px;
  font-size: 15px;
  font-family: Segoe UI;
  font-weight: 400;
  line-height: 20px;
  color: rgba(255, 255, 255, 1);
  opacity: 1;
}
.staright2 {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 1px;
  margin-top: -113px;
  height: 247px;
  background: rgba(5, 85, 129, 1);
  opacity: 1;
}
.box4 {
  position: relative;
  margin-top: 17px;
  width: 100%;
  height: 310px;
  background: rgba(6, 83, 157, 0.32);
  border: 1px solid rgba(28, 82, 144, 1);
  opacity: 1;
}
.box4-1 {
  margin: 10px;
  height: 272px;
  overflow-y: auto;
}
.box4-1 .row1 {
  margin-top: 7px;
  height: 30px;
  line-height: 30px;
  color: #fff;
  font-size: 14px;
  border-bottom: 1px solid rgba(5, 85, 129, 1);
}
.box4-1 .row1 .span1 {
  float: left;
  margin-left: 10px;
}
.box4-1 .row1 .span2 {
  float: left;
  margin-left: 10px;
}
.box4-1 .row1 .span3 {
  float: right;
  margin-right: 10px;
}
.box4-1-1 {
  margin-left: 15px;
  display: inline-block;
}
.box4-1-1 img {
  width: 183px;
  height: 143px;
}
.box4-1-1 p {
  height: 25px;
  line-height: 25px;
  font-size: 10px;
  font-family: Segoe UI;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  opacity: 1;
}
.box4-1-1 .span2 {
  margin-left: 5px;
}
.box4-1::-webkit-scrollbar {
  text-align: center;
  height: 70%;
  width: 10px;
  background: rgba(4, 54, 91);
}
.box4-1::-webkit-scrollbar-thumb {
  background: rgba(0, 221, 243);
  width: 8px;
  height: 10%;
  -webkit-border-radius: 8px;
}
.selectBox3 {
  position: absolute;
  top: 10px;
  left: 0px;
  z-index: 2;
}
.selectBox3 span {
  color: #00b3ed;
  font-size: 13px;
}
.selectBox3 i {
  width: 5px;
  height: 5px;
  background-color: #00b3ed;
  display: inline-block;
  margin: 2px 10px;
}
.el-select {
  margin-right: 15px;
}
.searchBox3 {
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
  height: 840px;
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
.bm-view {
  padding: 5px;
  height: 635px;
}
.modal1 {
  padding: 10px;
  top: 120px;
  right: 36px;
  position: absolute;
  overflow-y: auto;
  background: rgba(8, 56, 103, 0.6);
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  opacity: 1;
}
.modal1 p {
  text-align: center;
  width: 100px;
  height: 80px;
  display: inline-block;
  margin-left: 10px;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(221, 243, 255, 1);
  opacity: 1;
}
.modal1 p span {
  line-height: 80px;
}
.modal2 {
  width: 460px;
  height: 380px;
  top: 210px;
  right: 136px;
  position: absolute;
}
.modal2 video {
  width: 100%;
  height: 100%;
  border: 0;
  outline: none;
}
.close {
  position: absolute;
  top: 0px;
  right: 0px;
  z-index: 999;
}
</style>
<style>
.selectBox3 .el-input--small .el-input__inner {
  padding: 0 10px;
  background-color: transparent;
  border: 1px solid #0961a0;
  color: #00b3ed;
}
.searchBox3 .el-input {
  width: 65%;
}
.searchBox3 .el-input__inner {
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
.searchBox3 .el-button {
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