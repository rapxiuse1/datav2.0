<template>
  <div class="bg" style="width:100%;height:100%">
    <m-header hover="4"></m-header>
    <div class="content">
      <div class="left">
        <div class="box1">
          <div class="selectBox4">
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
          <div class="searchBox4">
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
              <el-button size="mini" type="primary" @click="puton(item.code)"
                >投放</el-button
              >
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
          <div class="modal" v-show="modal8Show">
            <img
              class="close"
              src="@/assets/image/close.png"
              @click="close(8)"
            />
            <div class="modal4-1">
              <p>
                灯杆编号：<span>{{ this.detailList.id }}</span>
              </p>
              <p>
                灯杆名称：<span>{{ this.detailList.name }}</span>
              </p>
              <p>
                灯杆位置：<span>{{ this.detailList.street_name }}</span>
              </p>
              <p v-for="(item, index) in this.detailList1" :key="index">
                <el-button
                  class="play"
                  size="small"
                  @click="play(item.addata)"
                  v-if="item.ad_type_name == '警示广告'"
                  type="success"
                  >警示广告</el-button
                >
                <el-button
                  size="small"
                  class="play"
                  @click="play(item.addata)"
                  v-if="item.ad_type_name == '公益广告'"
                  type="success"
                  >公益广告</el-button
                >
                <el-button
                  size="small"
                  class="play"
                  @click="play(item.addata)"
                  v-if="item.ad_type_name == '商业广告'"
                  type="success"
                  >商业广告</el-button
                >
              </p>
            </div>
            <div class="button">
              <!-- <el-button size="large" type="primary" round>查看</el-button> -->
              <el-button
                type="primary"
                class="puton"
                size="medium"
                @click="puton2()"
                >点击投放<i class="el-icon-s-promotion el-icon--right"></i
              ></el-button>
            </div>
          </div>
          <div class="modal2-1" v-if="videoShow">
            <img
              class="close1"
              src="@/assets/image/close.png"
              @click="close(9)"
            />
            <video
              :src="videoSrc"
              width="100%"
              height="100%"
              autoplay="autoplay"
              controls
            ></video>
          </div>
          <div class="modal1" v-show="modal1Show">
            <img
              class="close"
              src="@/assets/image/close.png"
              @click="close(1)"
            />
            <el-button class="button1" type="primary" @click="puton1()"
              >确定</el-button
            >
            <div class="search">
              <img src="@/assets/image/search.png" @click="searchSc()" />
              <input type="text" placeholder="输入关键字搜索" v-model="keysc" />
            </div>
            <div class="table">
              <el-table
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 92%;"
                @selection-change="handleSelectionChange"
              >
                <el-table-column type="selection" width="60" align="center">
                </el-table-column>
                <el-table-column
                  prop="adname"
                  label="素材名称"
                  align="center"
                  width="490"
                >
                </el-table-column>
                <el-table-column
                  prop="ad_type"
                  label="广告类型"
                  align="center"
                  width="152"
                >
                </el-table-column>
              </el-table>
            </div>
            <el-pagination
              class="page"
              layout="prev, pager, next"
              @prev-click="prePage"
              @next-click="nextPage"
              @current-change="handleCurrentChange"
              :page-count="this.pages"
            >
            </el-pagination>
          </div>
          <div class="modal1-1" v-show="modal2Show">
            <img
              class="close"
              src="@/assets/image/close.png"
              @click="close(2)"
            />
            <p>{{ this.resMsg }}</p>
          </div>
          <div class="modal2" v-show="modal3Show">
            <img
              class="close"
              src="@/assets/image/close.png"
              @click="close(3)"
            />
            <el-button class="button1" type="primary" @click="add(1)"
              >新增</el-button
            >
            <el-button class="button2" type="primary" @click="delSc()"
              >删除</el-button
            >
            <div class="search">
              <img src="@/assets/image/search.png" @click="searchSc1()" />
              <input
                type="text"
                placeholder="输入关键字搜索"
                v-model="keysc1"
              />
            </div>
            <div class="table">
              <el-table
                ref="multipleTable1"
                :data="tableData1"
                tooltip-effect="dark"
                style="width: 92%;"
                @selection-change="handleSelectionChange1"
              >
                <el-table-column type="selection" width="60" align="center">
                </el-table-column>
                <el-table-column
                  prop="adname"
                  label="素材名称"
                  align="center"
                  width="400"
                >
                </el-table-column>
                <el-table-column
                  prop="ad_type"
                  label="广告类型"
                  align="center"
                  width="102"
                >
                </el-table-column>
                <el-table-column label="操作" align="center" width="140">
                  <template slot-scope="scope">
                    <el-button
                      @click.native.prevent="
                        handleClick(scope.$index, scope.row)
                      "
                      type="text"
                      size="small"
                      >查看</el-button
                    >
                    <el-button
                      type="text"
                      size="small"
                      @click.native.prevent="modify(scope.$index, tableData1)"
                      >修改</el-button
                    >
                    <el-button
                      type="text"
                      size="small"
                      @click.native.prevent="
                        deleteRow(scope.$index, tableData1)
                      "
                      >删除</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <el-pagination
              class="page"
              layout="prev, pager, next"
              @prev-click="prePage1"
              @next-click="nextPage1"
              @current-change="handleCurrentChange1"
              :page-count="this.pages"
            >
            </el-pagination>
          </div>
          <div class="modal3" v-show="modal4Show">
            <img
              class="close"
              src="@/assets/image/close.png"
              @click="close(4)"
            />
            <div class="modal3-1">
              <div class="row">
                名称:<el-input
                  v-model="scname"
                  placeholder="请输入内容"
                ></el-input>
              </div>
              <div class="row">
                类型:<el-select v-model="sctype" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.label"
                    :label="item.label"
                    :value="item.label"
                  >
                  </el-option>
                </el-select>
              </div>
              <div class="row">
                视频:
                <div class="modal3-2">
                  <el-upload
                    class="upload"
                    :before-upload="beforeUpload"
                    :on-success="handleChange"
                    action="#"
                  >
                    <el-button size="small" type="primary">选择视频</el-button>
                  </el-upload>
                  <p>{{ this.file.name }}</p>
                </div>
              </div>
              <div class="row">
                封面:
                <div class="modal3-2">
                  <el-upload
                    class="upload"
                    :on-success="handleChange2"
                    :before-upload="beforeUpload2"
                    action="#"
                  >
                    <el-button size="small" type="primary">选择图片</el-button>
                  </el-upload>
                  <p>{{ this.file1.name }}</p>
                </div>
              </div>
            </div>
            <el-button size="large" class="up" type="primary" @click="addSc"
              >确定</el-button
            >
          </div>
          <div class="modal3" v-show="modal5Show">
            <img
              class="close"
              src="@/assets/image/close.png"
              @click="close(5)"
            />
            <div class="modal3-1">
              <div class="row">
                名称:<el-input
                  v-model="scname"
                  placeholder="请输入内容"
                ></el-input>
              </div>
              <div class="row">
                类型:<el-select v-model="sctype" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.label"
                    :label="item.label"
                    :value="item.label"
                  >
                  </el-option>
                </el-select>
              </div>
              <div class="row">
                视频:
                <div class="modal3-2">
                  <el-upload
                    class="upload"
                    :on-success="handleChange1"
                    :before-upload="beforeUpload1"
                    action="#"
                  >
                    <el-button size="small" type="primary">选择视频</el-button>
                  </el-upload>
                  <p>{{ this.file.name }}</p>
                </div>
              </div>
              <div class="row">
                封面:
                <div class="modal3-2">
                  <el-upload
                    class="upload"
                    :on-success="handleChange3"
                    :before-upload="beforeUpload3"
                    action="#"
                  >
                    <el-button size="small" type="primary">选择图片</el-button>
                  </el-upload>
                  <p>{{ this.file1.name }}</p>
                </div>
              </div>
            </div>
            <el-button size="large" class="up" type="primary" @click="changeSc"
              >确定</el-button
            >
          </div>
          <div class="modal1-1" v-show="modal6Show">
            <img
              class="close"
              src="@/assets/image/close.png"
              @click="close(6)"
            />
            <p style="margin-top: 50px; margin-bottom: 30px;">确认删除</p>
            <el-button size="small" type="primary" @click="confirm"
              >确认</el-button
            >
            <el-button size="small" type="primary" @click="close(6)"
              >取消</el-button
            >
          </div>
        </div>
      </div>
      <div class="right">
        <div class="box3">
          <div class="title">素材信息</div>
          <img class="titlebg" src="@/assets/image/titlebg.png" alt="" />
          <div class="sc" @click="fixsc()">
            素材管理>>
          </div>
          <div class="box3-1">
            <img
              :src="item.img"
              v-for="(item, index) in scList"
              :key="index"
              @click="play(item.addata)"
            />
          </div>
        </div>
        <div class="box3">
          <div class="title">投放统计</div>
          <img class="titlebg" src="@/assets/image/titlebg.png" alt="" />
          <div class="box3-2">
            <p class="p1">公益广告</p>
            <img src="@/assets/image/gygg.png" alt="" />
            <p class="p2">{{ this.tjList.gongyiad }}</p>
          </div>
          <div class="box3-2">
            <p class="p1">警示广告</p>
            <img src="@/assets/image/jsgg.png" alt="" />
            <p class="p2" style="color: rgba(125, 223, 90, 1);">
              {{ this.tjList.jingshiad }}
            </p>
          </div>
          <div class="box3-2">
            <p class="p1">商业广告</p>
            <img src="@/assets/image/sygg.png" alt="" />
            <p class="p2" style="color: rgba(6, 113, 193, 1);">
              {{ this.tjList.shangyead }}
            </p>
          </div>
        </div>
        <div class="box3">
          <div class="title">投放分析</div>
          <img class="titlebg" src="@/assets/image/titlebg.png" alt="" />
          <div id="echarts1"></div>
        </div>
      </div>
      <div class="cover" v-show="coverShow"></div>
    </div>
  </div>
</template>

<script>
import MHeader from "@/components/header/header.vue";
import qs from "qs";
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
      markerList1: [],
      detailList: [],
      detailList1: [],
      tjList: [],
      fxList: [],
      fxList2: [],
      fxList3: [],
      fxTime: [],
      value3: true,
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
      imgList: [
        require("../assets/image/scimg.png"),
        require("../assets/image/scimg.png"),
        require("../assets/image/scimg.png"),
        require("../assets/image/scimg.png"),
        require("../assets/image/scimg.png"),
        require("../assets/image/scimg.png"),
        require("../assets/image/scimg.png"),
        require("../assets/image/scimg.png"),
        require("../assets/image/scimg.png")
      ],
      tableData: [],
      pages: 0, //分页页数
      streetCode: "", //投放所需街道id
      scCode: [], //投放素材id数组
      areaCode: "",
      tableData1: [],
      options: [
        {
          value: "选项1",
          label: "公益广告"
        },
        {
          value: "选项2",
          label: "警示广告"
        },
        {
          value: "选项3",
          label: "商业广告"
        }
      ],
      sctype: "",
      sctype1: "",
      scname: "",
      index: "",
      rows: "",
      input: "",
      multipleSelection: [],
      multipleSelection1: [],
      modal1Show: false,
      modal2Show: false,
      modal3Show: false,
      modal4Show: false,
      modal5Show: false,
      modal6Show: false,
      modal7Show: false,
      modal8Show: false,
      coverShow: false,
      file: "",
      file1: "",
      resMsg: "",
      lightid: "",
      videoSrc: "",
      videoShow: false,
      lightType: "",
      keysc: "",
      keysc1: "",
      scList: []
    };
  },
  mounted() {
    this.initArea();
    this.select(440000); //初始化广州联动
    this.select1(440100);
    this.select2(440113);
    this.initMarker(); //初始化地图标点数据
    this.initData(440113007); //初始化图标数据
    this.initSc(); //初始化素材管理
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
    initMarker() {
      //初始化地图标点数据
      this.$axios({
        url: "api/v1/advert/smartlamps",
        method: "get",
        params: {}
      }).then(res => {
        this.markerList = res.data.data.smartlamp_list;
      });
    },
    initData(n) {
      this.$axios({
        url: "api/v1/advert/put/statistical?street_code=" + n,
        method: "get",
        params: {}
      }).then(res => {
        this.fxList = res.data.data.addata_statistical_count;
        this.tjList = res.data.data.statistical_count;
      });
    },
    initSc() {
      let code = "api/v1/advert/list?page=1&per_page=10";
      this.$axios({
        url: code,
        method: "get",
        params: {}
      }).then(res => {
        this.scList = res.data.data.addata_list;
      });
    },
    initArea() {
      //获取省级地名
      this.$axios({
        url: "api/v1/advert/area?code=000000",
        method: "get",
        params: {}
      }).then(res => {
        this.province = res.data.data.area_list;
      });
    },
    select(value) {
      let code = "api/v1/advert/area?code=" + value;
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
      let code = "api/v1/advert/area?code=" + value1;
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
      let code = "api/v1/advert/area?code=" + value2;
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
      let code = "api/v1/advert/area?code=" + this.areaCode;
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
    streetSearch(n) {
      this.initData(n);
      this.markerList = [];
      let code = "api/v1/advert/smartlamp/street?street_code=" + n;
      this.zoom = 17;
      //let code = "api/v1/index/smartlamp/street?street_code=440113007";
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
    },
    initCharts() {
      let myChart1 = this.$echarts.init(document.getElementById("echarts1"));
      //数据
      let fxList1 = this.fxList.gongyiad_list;
      let fxList2 = this.fxList.jingshiad_list;
      let fxList3 = this.fxList.shangyead_list;
      let XName = this.fxList.time_list;
      let data1 = [fxList1, fxList2, fxList3];
      var Line = ["公益广告", "警示广告", "商业广告"];
      var img = [
        "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABRCAYAAABFTSEIAAAACXBIWXMAAAsSAAALEgHS3X78AAAEp0lEQVR42u3cz4sjRRTA8W9Vd3Vn8mMmjj9WQWSRZQ+CsH+B7MnDIgiCd0E8CYJ/gOAIelo8ehUP/gF6WLw5/gMueFP2sIcF0dHd2Z1kknR11fOQZJJJMtlZd03H7HtQpNOTnpn+8Lrm1etmjIig8e/DKoECKqACKqCGAiqgAiqghgIqoAIqoIYCKqACKqCGAiqgAiqghgIqoAJudKTr+osZMNPvBUQBHwHsPF9fB9R0DeHMOQ6T6WOrhEzXBM4swDOL0M6CrArRVoq3t2dGUIb9fTvatg8ZZup1PDBgzPmy98mey6qfzjLz2WaWjEUZKEvGyi9nWyneMOvGIyFQo2Sbg4MUSChpU9IeTTUpJdsEajPZOJeJG5uBZj7rLLduWS5dGm6XNLEELOFUFj54ACJCaychkpDSASK3bwsXL0YgVpWJKwM0iy9Zy8HdGru7jvt3Pbu7w0wES7drTwAbjTHMGCsQcIAnYTC1/wRx0wEnl27JNgZI8HQ6Kc1mQq83RNzaMjPzXqDbjTQaJRFLxIyyMSxAXEkWrhrQzAAmo5HOjCQf7jflILxOkohL+aUPgV4vEGNJo+E5PAy02+UIMEwBxo0CPDP7Dg5SnEtpt1PA0e87XO25FOoh8IYIH2Y5b45RzGAQBiIltZoHxqMcjbksXAVgdc2EQMYzzzdotyeZWKuleULXJtwT4SODfC2QCWR+IF9KnjuX1Xbo99Op7LVE8iXlz0YBTk5SyLEEjo5OLuccEoFUvHfO+reuUPx4zftXAIcx1hdcF+/TvFab4A0Bs0VwqyhpVnkJT89/Q4DDQ0e77YCMwIUsFMeFZD856699URRvX4nxE4A/jbnxXp7v4Zw3ReGNSDHI8wFQjIafuoyn58L/fB6sth/Ybg9fez2TRC6QZcZYvgHsazF+MP7YCyLXcM7gvSXLDGBqYDg+NhwdmSpPoTrAkub0W+f4FSB1fDucIunMHSLpO8WAH0rSy8u+19MBCHB4OHzd2pI+CEUhpigEiN+l6WcdY252jLn5s7Wf472ImPcN8pUl/tEHoV4XWq1Ke4KrLmPsTA3oODpytFoOyJKSyzHyMSIxteWngMW5cSEdDJQUhTdZVgxOz3/+jFJm4+bA2e5JpNU6WZ4Fw99JwnWMKccwpeddP+B7GZTNUPKqybJy0O+Hs1YfMz9swwvpB8fbGDG0GuGkkK7V0hxSmZQpABI8l2z0v3sJf50qpAMJCd2qCulql3LD1lRGQjm7lEsDz0rkxTQOfiPPxUBcuJTbbhss/Y1eyi3NwsmKInmkZsKk5gtPUzNhvp11507CSy/X6XYStpvFudpZw1ZWIOF4Cq6SdtbKbioJyAhRTu3u9yMJXerN+ugvaQQsjcZ8Q3VnZwxlSDhe1lB9GjrSw5b+1avT8+Jw+979nNaOI6U3KpTrWAosxVQmygK4ld8X0ZtK/7eViExD7O1NQPb3T7fsl4/4sBpwYzPwjFbTo95Yl9l9Vd1YN1X/147HebSjary1AHyc5qc+XLQEQx9ve8Kg6xr6hKoCKqACKqCGAiqgAiqghgIqoAIqoIYCKqACKqCGAiqgAiqghgIq4JrHP8fEWV8FMTmOAAAAAElFTkSuQmCC",
        "image://data:image/png;base64,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",
        "image://data:image/png;base64,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",
        "image://data:image/png;base64,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"
      ];
      var color = ["#00f8ff", "#00f15a", "#0696f9", "#dcf776"];

      //数据处理
      var datas = [];
      Line.map((item, index) => {
        datas.push({
          symbolSize: 150,
          symbol: img[index],
          name: item,
          type: "line",
          yAxisIndex: 1,
          data: data1[index],
          itemStyle: {
            normal: {
              borderWidth: 5,
              color: color[index]
            }
          }
        });
      });

      myChart1.setOption({
        grid: {
          left: "10%",
          top: "5%",
          bottom: "10%",
          right: "5%"
        },
        legend: {
          type: "scroll",
          data: Line,
          itemWidth: 18,
          itemHeight: 12,
          textStyle: {
            color: "#00ffff",
            fontSize: 10
          }
        },
        yAxis: [
          {
            type: "value",
            position: "right",
            splitLine: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            }
          },
          {
            type: "value",
            position: "left",
            nameTextStyle: {
              color: "#00FFFF"
            },
            splitLine: {
              lineStyle: {
                type: "dashed",
                color: "rgba(135,140,147,0.8)"
              }
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              formatter: "{value}",
              color: "#fff",
              fontSize: 10
            }
          }
        ],
        xAxis: [
          {
            type: "category",
            axisTick: {
              show: false
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: "#6A989E"
              }
            },
            axisLabel: {
              inside: false,
              textStyle: {
                color: "#fff", // x轴颜色
                fontWeight: "normal",
                fontSize: "10",
                lineHeight: 22
              }
            },
            data: XName
          },
          {
            type: "category",
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            },
            splitArea: {
              show: false
            },
            splitLine: {
              show: false
            }
            //-----
            //data: ["1月", "2月", "3月", "4月", "5月", "6月"],
          }
        ],
        series: datas
      });
    },
    showModal(n) {
      this.lightid = n;
      this.$axios({
        url: "api/v1/advert/smartlamp/detail?smartlamp_id=" + this.lightid,
        method: "get",
        params: {}
      }).then(res => {
        this.detailList = res.data.data;
        this.detailList1 = this.detailList.smartlamp_detail[0].device_capablities_list;
        this.modal8Show = true;
        return;
      });
    },
    puton(n) {
      this.streetCode = n;
      this.lightType = "street";
      //获取所有素材
      let code = "api/v1/advert/list?page=1&per_page=10";
      this.$axios({
        url: code,
        method: "get",
        params: {}
      }).then(res => {
        this.tableData = res.data.data.addata_list;
        this.pages = res.data.data.pages;
      });
      this.modal1Show = true;
    },
    puton1() {
      //街道素材投放
      if (this.lightType == "street") {
        let code = "api/v1/advert/put?street_code=" + this.streetCode;
        let data = JSON.stringify(this.scCode);
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
            this.modal2Show = true;
            this.coverShow = true;
          }
        });
      }
      //单灯杆素材投放
      if (this.lightType == "marker") {
        let code = "api/v1/advert/smartlamp/put?smartlamp_id=" + this.lightid;
        let data = JSON.stringify(this.scCode);
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
            this.modal2Show = true;
            this.coverShow = true;
            //刷新灯杆数据
            this.$axios({
              url:
                "api/v1/advert/smartlamp/detail?smartlamp_id=" + this.lightid,
              method: "get",
              params: {}
            }).then(res => {
              this.detailList = res.data.data;
              this.detailList1 = this.detailList.smartlamp_detail[0].device_capablities_list;
              return;
            });
            return;
          }
        });
      }
    },
    puton2() {
      this.lightType = "marker";
      //获取所有素材
      let code = "api/v1/advert/list?page=1&per_page=10";
      this.$axios({
        url: code,
        method: "get",
        params: {}
      }).then(res => {
        this.tableData = res.data.data.addata_list;
        this.pages = res.data.data.pages;
      });
      this.modal1Show = true;
    },
    fixsc() {
      let code = "api/v1/advert/list?page=1&per_page=10";
      this.$axios({
        url: code,
        method: "get",
        params: {}
      }).then(res => {
        this.tableData1 = res.data.data.addata_list;
        this.pages = res.data.data.pages;
      });
      this.modal3Show = true;
    },
    handleCurrentChange(val) {
      let code = "api/v1/advert/list?page=" + val + "&per_page=10";
      this.$axios({
        url: code,
        method: "get",
        params: {}
      }).then(res => {
        this.tableData = res.data.data.addata_list;
      });
    },
    prePage(val) {
      let code = "api/v1/advert/list?page=" + val - 1 + "&per_page=10";
      this.$axios({
        url: code,
        method: "get",
        params: {}
      }).then(res => {
        this.tableData = res.data.data.addata_list;
      });
    },
    nextPage(val) {
      let code = "api/v1/advert/list?page=" + val + 1 + "&per_page=10";
      this.$axios({
        url: code,
        method: "get",
        params: {}
      }).then(res => {
        this.tableData = res.data.data.addata_list;
      });
    },
    handleCurrentChange1(val) {
      let code = "api/v1/advert/list?page=" + val + "&per_page=10";
      this.$axios({
        url: code,
        method: "get",
        params: {}
      }).then(res => {
        this.tableData1 = res.data.data.addata_list;
        this.pages = res.data.data.pages;
      });
    },
    prePage1(val) {
      let code = "api/v1/advert/list?page=" + val - 1 + "&per_page=10";
      this.$axios({
        url: code,
        method: "get",
        params: {}
      }).then(res => {
        this.tableData1 = res.data.data.addata_list;
        this.pages = res.data.data.pages;
      });
    },
    nextPage1(val) {
      let code = "api/v1/advert/list?page=" + val + 1 + "&per_page=10";
      this.$axios({
        url: code,
        method: "get",
        params: {}
      }).then(res => {
        this.tableData1 = res.data.data.addata_list;
        this.pages = res.data.data.pages;
      });
    },
    add(n) {
      if (n == 1) {
        this.modal4Show = true;
        this.file = "";
        this.file1 = "";
        this.sctype = "";
        this.scname = "";
        this.coverShow = true;
      }
    },
    modify(index, rows) {
      this.file = rows[index].addata;
      this.file1 = rows[index].img;
      this.sctype = rows[index].ad_type;
      this.scname = rows[index].adname;
      this.scCode = rows[index].id;
      this.modal5Show = true;
      this.coverShow = true;
    },
    searchSc() {
      let n = this.keysc;
      let code = "api/v1/advert/list?page=1&per_page=10";
      this.$axios({
        url: code,
        method: "get",
        params: { keyword: n }
      }).then(res => {
        this.tableData = res.data.data.addata_list;
      });
    },
    searchSc1() {
      let n = this.keysc1;
      let code = "api/v1/advert/list?page=1&per_page=10";
      this.$axios({
        url: code,
        method: "get",
        params: { keyword: n }
      }).then(res => {
        this.tableData1 = res.data.data.addata_list;
        this.pages = res.data.data.pages;
      });
    },
    handleClick(index, row) {
      this.play(row.addata);
    },
    deleteRow(index, rows) {
      this.scCode = rows[index].id;
      this.index = index;
      this.rows = rows;
      this.modal6Show = true;
      this.coverShow = true;
      //rows.splice(index, 1);
    },
    confirm() {
      this.rows.splice(this.index, 1);
      this.modal6Show = false;
      this.coverShow = false;
      let code = "api/v1/advert/del";
      let data = [];
      data.push(this.scCode);
      data = JSON.stringify(data);
      //let ps = new FormData();
      //let data = this.scCode;
      //ps.append("arrays", data);
      //let data = JSON.stringify(this.scCode);
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
          this.modal2Show = true;
          this.coverShow = true;
          this.initSc();
        }
      });
    },
    delSc() {
      let code = "api/v1/advert/del";
      let data = JSON.stringify(this.scCode);
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
          this.modal2Show = true;
          this.coverShow = true;
          this.fixsc();
          this.initSc();
        }
      });
    },
    beforeUpload(file) {
      this.file = file;
      return false;
    },
    handleChange(file) {},
    beforeUpload1(file) {
      this.file = file;
      return false;
    },
    handleChange1(file) {},
    beforeUpload2(file) {
      this.file1 = file;
      return false;
    },
    handleChange2(file) {},
    handleChange3(file) {},
    beforeUpload3(file) {
      this.file1 = file;
      return false;
    },
    handleSelectionChange(val) {
      this.scCode = [];
      this.multipleSelection = val;
      for (let i = 0; i < this.multipleSelection.length; i++) {
        this.scCode.push(this.multipleSelection[i].id);
      }
      this.scCode = [...new Set(this.scCode)]; //id去重
    },
    handleSelectionChange1(val) {
      this.scCode = [];
      this.multipleSelection1 = val;
      for (let i = 0; i < this.multipleSelection1.length; i++) {
        this.scCode.push(this.multipleSelection1[i].id);
      }
      this.scCode = [...new Set(this.scCode)]; //id去重
    },
    addSc() {
      debugger;
      let code = "api/v1/advert/addad";
      let ps = new FormData();
      let adname = this.scname;
      let adtype = this.sctype;
      let ad_type_id;
      if (adtype == "公益广告") {
        ad_type_id = 1;
      } else if (adtype == "警示广告") {
        ad_type_id = 2;
      } else {
        ad_type_id = 3;
      }
      ps.append("adname", adname);
      ps.append("addata", this.file);
      ps.append("img", this.file1);
      ps.append("ad_type_id", ad_type_id);
      this.$axios({
        url: code,
        method: "post",
        data: ps,
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }).then(res => {
        if (res.status == 200) {
          this.resMsg = res.data.msg;
          this.modal2Show = true;
          this.fixsc();
          this.initSc();
        }
      });
    },
    changeSc() {
      let id = this.scCode;
      let code = "api/v1/advert/edit?id=" + id;
      let ps = new FormData();
      let adname = this.scname;
      let adtype = this.sctype;
      let ad_type_id;
      if (adtype == "公益广告") {
        ad_type_id = 1;
      } else if (adtype == "警示广告") {
        ad_type_id = 2;
      } else {
        ad_type_id = 3;
      }
      ps.append("adname", adname);
      ps.append("addata", this.file);
      ps.append("img", this.file1);
      ps.append("ad_type_id", ad_type_id);
      this.$axios({
        url: code,
        method: "post",
        data: ps,
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }).then(res => {
        if (res.status == 200) {
          this.resMsg = res.data.msg;
          this.fixsc();
          this.initSc();
          this.modal2Show = true;
        }
      });
    },
    close(n) {
      if (n == 1) {
        this.modal1Show = false;
        this.coverShow = false;
        return;
      }
      if (n == 2) {
        this.modal2Show = false;
        this.coverShow = false;
        return;
      }
      if (n == 3) {
        this.modal3Show = false;
        this.coverShow = false;
        return;
      }
      if (n == 4) {
        this.modal4Show = false;
        this.coverShow = false;
        return;
      }
      if (n == 5) {
        this.modal5Show = false;
        this.coverShow = false;
        return;
      }
      if (n == 6) {
        this.modal6Show = false;
        this.coverShow = false;
        return;
      }
      if (n == 7) {
        this.modal7Show = false;
        this.coverShow = false;
        return;
      }
      if (n == 8) {
        this.modal8Show = false;
        this.coverShow = false;
        return;
      }
      if (n == 9) {
        this.videoShow = false;
        this.coverShow = false;
        return;
      }
    },
    play(n) {
      this.videoSrc = n;
      this.videoShow = true;
      this.coverShow = true;
    }
  },
  components: {
    MHeader
  },
  watch: {
    fxList: function() {
      this.initCharts();
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
  margin: 10px;
  margin-top: 20px;
  width: 99.4%;
}
.left {
  float: left;
  width: 19%;
}
.center {
  margin-left: 20px;
  float: left;
  width: 54.2%;
}
.right {
  margin-left: 20px;
  float: left;
  width: 22.85%;
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
  height: 940px;
  background: rgba(6, 83, 157, 0.3);
  opacity: 1;
}
.box3 {
  position: relative;
  margin-bottom: 20px;
  width: 100%;
  height: 300px;
  background: rgba(6, 83, 157, 0.3);
  opacity: 1;
}
.box3-1 {
  height: 220px;
  text-align: center;
  overflow-y: auto;
  margin-top: 20px;
  margin-left: 20px;
}
.box3-1 video {
  margin-top: 10px;
  width: 97px;
  height: 60px;
  display: inline-block;
  margin-right: 17px;
}
.box3-1 img {
  float: left;
  margin-top: 10px;
  width: 115px;
  height: 60px;
  margin-right: 17px;
}
.box3-2 {
  display: inline-block;
  text-align: center;
  margin-left: 10px;
  width: 29%;
  height: 252px;
  background: rgba(255, 255, 255, 0);
  border: 1px solid rgba(5, 85, 129, 1);
  opacity: 1;
}
.box3-2 .p1 {
  margin-top: 25px;
  font-size: 20px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(221, 243, 255, 1);
  opacity: 1;
}
.box3-2 img {
  margin-top: 15px;
  width: 68px;
  height: 68px;
}
.box3-2 .p2 {
  margin-top: 31px;
  font-size: 56px;
  font-family: "LEDFont";
  font-weight: 400;
  color: rgba(179, 236, 237, 1);
  opacity: 1;
}
.selectBox4 {
  position: absolute;
  top: 10px;
  left: 0px;
  z-index: 2;
}
.selectBox4 span {
  color: #00b3ed;
  font-size: 13px;
}
.selectBox4 i {
  width: 5px;
  height: 5px;
  background-color: #00b3ed;
  display: inline-block;
  margin: 2px 10px;
}
.el-select {
  margin-right: 15px;
}
.searchBox4 {
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
  /* margin-left: 18px; */
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
/* 滚动条样式 */
.jdAll::-webkit-scrollbar,
.box3-1::-webkit-scrollbar {
  text-align: center;
  height: 100%;
  width: 10px;
  background: rgba(4, 54, 91);
}
/*滚动条里面小方块*/
.jdAll::-webkit-scrollbar-thumb,
.box3-1::-webkit-scrollbar-thumb {
  background: rgba(19, 117, 146);
  width: 5px;
  height: 30%;
  -webkit-border-radius: 15px;
}
.jd:hover {
  background-color: #409eff;
  border: 1px solid #fff;
  color: #073d6c;
}
.bm-view {
  padding: 5px;
  height: 935px;
}
.modal {
  top: 291px;
  right: 196px;
  position: absolute;
  width: 291px;
  padding-bottom: 50px;
  /* height: 281px; */
  background: rgba(8, 56, 103, 0.6);
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  opacity: 1;
}
.modal4-1 {
  width: 225px;
  margin: 0 auto;
  margin-top: 33px;
}
.modal4-1 p {
  margin-top: 8px;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(221, 243, 255, 1);
  opacity: 1;
}
.modal1 {
  position: absolute;
  top: 179px;
  left: 115px;
  width: 815px;
  height: 666px;
  background: rgba(8, 56, 103, 0.7);
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  opacity: 1;
}
.modal1-1 {
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
.modal1-1 p {
  margin-top: 74px;
  font-size: 23px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(221, 243, 255, 1);
  opacity: 1;
}
.modal2 {
  position: absolute;
  top: 179px;
  left: 115px;
  width: 815px;
  height: 706px;
  background: rgba(8, 56, 103, 0.7);
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  opacity: 1;
}
.modal2-1 {
  width: 450px;
  height: 380px;
  top: 210px;
  right: 136px;
  position: absolute;
  z-index: 999;
}
.modal2-1 video {
  width: 100%;
  height: 100%;
  border: 0;
  outline: none;
}
.modal3 {
  z-index: 1000;
  position: absolute;
  top: 179px;
  left: 115px;
  width: 815px;
  height: 706px;
  background: rgba(8, 56, 103, 1);
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  opacity: 1;
  font-size: 18px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(221, 243, 255, 1);
}
.modal3-1 {
  margin-top: 46px;
  margin-left: 77px;
}
.row {
  margin-top: 30px;
}
.modal3-2 {
  position: relative;
  vertical-align: top;
  margin-left: 10px;
  display: inline-block;
  width: 595px;
  height: 88px;
  background-color: transparent;
  border: 1px solid #0961a0;
  opacity: 1;
  border-radius: 8px;
}
.modal3-2 p {
  position: absolute;
  height: 50px;
  top: 25%;
  left: 50%;
  margin-left: -50px;
  color: #ffffff;
  font-size: 30px;
}
.upload {
  position: absolute;
  right: 10px;
  top: 10px;
}
.up {
  position: absolute;
  left: 45%;
  bottom: 10%;
}
/* .modal3-1 input {
  margin-left: 15px;
  background: rgba(19, 67, 114, 1);
  width: 595px;
  height: 39px;
  border: 1px solid rgba(38, 103, 166, 1);
  opacity: 1;
  border-radius: 8px;
}
.modal3-1 input::-webkit-input-placeholder {
  padding-left: 15px;
  font-size: 16px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: #969ea1;
  opacity: 1;
}
.modal3 input:focus::-webkit-input-placeholder {
  color: transparent;
} */
.close {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 32px;
  height: 32px;
}
.close1 {
  float: right;
}
.table {
  margin-top: 98px;
  margin-left: 50px;
  height: 439px;
}
.button {
  text-align: center;
  margin-top: 20px;
}
.button1 {
  position: absolute;
  top: 52px;
  left: 62px;
}
.button2 {
  position: absolute;
  top: 52px;
  left: 122px;
}
.search {
  position: absolute;
  top: 47px;
  right: 60px;
}
.search img {
  position: absolute;
  right: 10px;
  top: 10px;
  width: 20px;
  height: 20px;
}
.search input {
  padding-left: 15px;
  width: 339px;
  height: 38px;
  line-height: 38px;
  background: rgba(5, 55, 104, 0.7);
  border: 1px solid rgb(3, 112, 180);
  opacity: 1;
  border-radius: 9px;
  outline: none;
  color: rgba(255, 255, 255, 1);
  font-size: 16px;
}
.search input::-webkit-input-placeholder {
  padding-left: 15px;
  font-size: 16px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  opacity: 1;
}
.search input:focus::-webkit-input-placeholder {
  color: transparent;
  /* input框获取焦点时，清空placeholder transparent是全透明黑色*/
}
.page {
  position: absolute;
  bottom: 2%;
  right: 3%;
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
  left: 29.5%;
  top: 0;
  position: absolute;
}
.sc {
  cursor: pointer;
  top: 12px;
  right: 25px;
  position: absolute;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(195, 241, 255, 1);
  opacity: 1;
  border-bottom: 1px solid rgba(195, 241, 255, 1);
}
#echarts1 {
  width: 421px;
  height: 254px;
}
.play {
  float: left;
  margin-left: 10px;
  margin-top: 8px;
}
.puton {
  position: absolute;
  bottom: -60px;
  left: 30%;
}
</style>
<style>
.selectBox4 .el-input--small .el-input__inner {
  padding: 0 10px;
  background-color: transparent;
  border: 1px solid #0961a0;
  color: #00b3ed;
}
.searchBox4 .el-input {
  width: 65%;
}
.searchBox4 .el-input__inner {
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
.searchBox4 .el-button {
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
.table .el-table,
.table .el-table th,
.table .el-table tr {
  background-color: transparent;
  color: rgba(255, 255, 255, 1);
  font-size: 18px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  border: 1px solid rgba(18, 99, 148, 1);
}
.table .el-table tr:hover {
  color: #00b3ed;
}
.modal3-1 .row .el-input,
.modal3-1 .row .el-select {
  width: 595px;
  height: 39px;
}
.modal3-1 .row .el-input {
  margin-left: 15px;
}
.modal3-1 .row .el-input__suffix {
  top: -4px;
}
.modal3-1 .row .el-input--small .el-input__inner {
  padding: 0 10px;
  background-color: transparent;
  border: 1px solid #0961a0;
  color: #00b3ed;
}
.modal3-1 .row .el-select-dropdown {
  background: rgba(9, 47, 66, 0.5) !important;
  border: 1px solid #00b3ed !important;
  color: #fff !important;
}
.modal3-1 .row .el-select-dropdown__item.hover {
  background-color: #00b3ed;
}
</style>
