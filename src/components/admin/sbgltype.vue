<template>
  <dv-full-screen-container class="bg">
    <el-container class="contain">
      <el-header class="header">
        <div class="title">后台管理</div>
        <div class="title1" @click="goHome">大屏数据展示</div>
      </el-header>
      <el-container>
        <el-aside class="aside">
          <el-col :span="24">
            <el-menu
              default-active="1-2"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
            >
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-receiving"></i>
                  <span>设备/设备分类管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="1-1" @click="go(1)"
                    >设备管理</el-menu-item
                  >
                  <el-menu-item index="1-2">设备分类管理</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="2">
                <template slot="title">
                  <i class="el-icon-reading"></i>
                  <span>规则/规则分类管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="2-1" @click="go(2)"
                    >规则管理</el-menu-item
                  >
                  <el-menu-item index="2-2" @click="go(3)"
                    >规则分类管理</el-menu-item
                  >
                </el-menu-item-group>
              </el-submenu>
              <el-menu-item index="3" @click="go(4)">
                <i class="el-icon-s-opportunity"></i>
                <span slot="title">灯杆管理</span>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-aside>
        <el-main class="main">
          <p class="type">设备分类管理</p>
          <el-button class="button1" type="primary" @click="add()"
            >新增</el-button
          >
          <el-button class="button2" type="primary" @click="delSc()"
            >批量删除</el-button
          >
          <div class="table1">
            <el-table
              ref="multipleTable1"
              :data="tableData"
              tooltip-effect="dark"
              style="width: 100%;height:100%"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="120" align="center">
              </el-table-column>
              <el-table-column
                prop="device_type_name"
                label="设备分类名称"
                align="center"
                width="300"
              >
              </el-table-column>
              <el-table-column
                prop="id"
                label="设备id"
                align="center"
                width="300"
              >
              </el-table-column>
              <el-table-column
                prop="create_time"
                label="设备创建时间"
                align="center"
                width="200"
              >
              </el-table-column>
              <el-table-column
                prop="update_time"
                label="设备更新时间"
                align="center"
                width="200"
              >
              </el-table-column>
              <el-table-column label="操作" align="center" width="200">
                <template slot-scope="scope">
                  <el-button
                    @click.native.prevent="handleClick(scope.$index, scope.row)"
                    type="text"
                    size="small"
                    >查看</el-button
                  >
                  <el-button
                    type="text"
                    size="small"
                    @click.native.prevent="modify(scope.$index, scope.row)"
                    >修改</el-button
                  >
                  <el-button
                    type="text"
                    size="small"
                    @click.native.prevent="deleteRow(scope.$index, tableData)"
                    >删除</el-button
                  >
                </template>
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
          <div class="modal" v-show="modalShow">
            <img
              class="close"
              src="@/assets/image/close1.png"
              @click="close(1)"
            />
            <p style="margin-top: 50px; margin-bottom: 30px;">确认删除</p>
            <el-button size="small" type="primary" @click="confirm"
              >确认</el-button
            >
            <el-button size="small" type="primary" @click="close(1)"
              >取消</el-button
            >
          </div>
          <div class="modal1-1" v-show="modal1Show">
            <img
              class="close"
              src="@/assets/image/close1.png"
              @click="close(2)"
            />
            <p>{{ this.resMsg }}</p>
          </div>
          <div class="modal1-2" v-show="modal2Show">
            <img
              class="close"
              src="@/assets/image/close1.png"
              @click="close(3)"
            />
            <div class="row" style="margin-top:0">
              设备分类名称:<el-input
                v-model="device_type_name"
                placeholder="请输入设备分类名称"
              ></el-input>
            </div>
            <el-button
              size="large"
              class="addBtn"
              type="primary"
              @click="confirmAdd"
              >确定</el-button
            >
          </div>
          <div class="modal1-3" v-show="modal3Show">
            <img
              class="close"
              src="@/assets/image/close1.png"
              @click="close(4)"
            />
            <p>设备类型名称:{{ this.sbMessage.device_type_name }}</p>
            <p>设备id:{{ this.sbMessage.id }}</p>
            <p>设备创建时间:{{ this.sbMessage.create_time }}</p>
            <p>设备更新时间:{{ this.sbMessage.update_time }}</p>
          </div>
          <div class="modal1-2" v-show="modal4Show">
            <img
              class="close"
              src="@/assets/image/close1.png"
              @click="close(5)"
            />
            <div class="row" style="margin-top:0">
              设备分类名称:<el-input
                v-model="device_type_name1"
                placeholder="请输入设备名称"
              ></el-input>
            </div>
            <div class="row">
              设备分类id:<el-input
                v-model="device_type_id1"
                placeholder="请输入设备分类id"
              ></el-input>
            </div>
            <el-button
              size="large"
              class="addBtn"
              type="primary"
              @click="confirmAdd1"
              >确定</el-button
            >
          </div>
        </el-main>
      </el-container>
    </el-container>
    <div class="cover" v-show="coverShow"></div>
  </dv-full-screen-container>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      multipleSelection: [],
      sbArray: [], //设备id集合
      index: "",
      rows: "",
      pages: 0, //分页页数
      resMsg: "",
      device_type_name: "",
      device_type_name1: "",
      device_type_id1: "",
      sbMessage: "",
      modalShow: false,
      modal1Show: false,
      modal2Show: false,
      modal3Show: false,
      modal4Show: false,
      coverShow: false
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    goHome() {
      this.$router.push("/");
    },
    go(n) {
      if (n == 1) {
        this.$router.push("/sbgl");
      }
      if (n == 2) {
        this.$router.push("/gzgl");
      }
      if (n == 3) {
        this.$router.push("/gzgltype");
      }
      if (n == 4) {
        this.$router.push("/light");
      }
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    initData() {
      let code = "api/v1/device_type?page=1&per_page=10";
      this.$axios({
        url: code,
        method: "get",
        params: {}
      }).then(res => {
        this.tableData = res.data.data.device_type_list;
        this.pages = res.data.data.pages;
      });
    },
    //表格多选
    handleSelectionChange(val) {
      this.sbArray = [];
      this.multipleSelection = val;
      for (let i = 0; i < this.multipleSelection.length; i++) {
        this.sbArray.push(this.multipleSelection[i].id);
      }
      this.sbArray = [...new Set(this.sbArray)]; //id去重
    },
    handleClick(index, row) {
      let code = "api/v1/device_type/detail?id=" + row.id;
      this.$axios({
        url: code,
        method: "get",
        params: {}
      }).then(res => {
        this.sbMessage = res.data.data;
        this.modal3Show = true;
        this.coverShow = true;
      });
    },
    modify(index, row) {
      let code = "api/v1/device_type/detail?id=" + row.id;
      this.$axios({
        url: code,
        method: "get",
        params: {}
      }).then(res => {
        this.sbMessage = res.data.data;
        this.device_type_name1 = this.sbMessage.device_type_name;
        this.device_type_id1 = this.sbMessage.id;
        this.modal4Show = true;
        this.coverShow = true;
      });
    },
    deleteRow(index, rows) {
      this.sbArray = rows[index].id;
      this.index = index;
      this.rows = rows;
      this.modalShow = true;
      //rows.splice(index, 1);
    },
    confirm() {
      this.rows.splice(this.index, 1);
      this.modalShow = false;
      let code = "api/v1/device_type/del";
      let data = [];
      data.push(this.sbArray);
      data = JSON.stringify(data);
      this.$axios({
        url: code,
        method: "post",
        params: { arrays: data },
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }).then(res => {
        if (res.status == 200) {
          this.resMsg = res.data.msg;
          this.modal1Show = true;
          this.initData();
        }
      });
    },
    delSc() {
      let code = "api/v1/device_type/del";
      let data = JSON.stringify(this.sbArray);
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
          this.modal1Show = true;
          this.initData();
        }
      });
    },
    add() {
      this.coverShow = true;
      this.modal2Show = true;
    },
    confirmAdd() {
      //let ps = new FormData();
      let device_type_name = this.device_type_name;
      let code = "api/v1/device_type/add";
      this.$axios({
        url: code,
        method: "post",
        params: { device_type_name: device_type_name },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        if (res.status == 200) {
          this.resMsg = res.data.msg;
          this.modal1Show = true;
          this.initData();
        }
      });
    },
    confirmAdd1() {
      let ps = new FormData();
      let device_type_name = this.device_type_name1;
      let id = this.device_type_id1;
      let code = "api/v1/device_type/edit?id=" + id;
      ps.append("device_type_name", device_type_name);
      this.$axios({
        url: code,
        method: "post",
        //params: { device_type_name: device_type_name },
        data: ps,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        if (res.status == 200) {
          this.resMsg = res.data.msg;
          this.modal1Show = true;
          this.initData();
        }
      });
    },
    handleCurrentChange(val) {
      let code = "api/v1/device_type?page=" + val + "&per_page=10";
      this.$axios({
        url: code,
        method: "get",
        params: {}
      }).then(res => {
        this.tableData = res.data.data.device_type_list;
      });
    },
    prePage(val) {
      let code = "api/v1/device_type?page=" + val - 1 + "&per_page=10";
      this.$axios({
        url: code,
        method: "get",
        params: {}
      }).then(res => {
        this.tableData = res.data.data.device_type_list;
      });
    },
    nextPage(val) {
      let code = "api/v1/device_type?page=" + val + 1 + "&per_page=10";
      this.$axios({
        url: code,
        method: "get",
        params: {}
      }).then(res => {
        this.tableData = res.data.data.device_type_list;
      });
    },
    close(n) {
      if (n == 1) {
        this.modalShow = false;
        return;
      }
      if (n == 2) {
        this.modal1Show = false;
        return;
      }
      if (n == 3) {
        this.modal2Show = false;
        this.coverShow = false;
        return;
      }
      if (n == 4) {
        this.modal3Show = false;
        this.coverShow = false;
        return;
      }
      if (n == 5) {
        this.modal4Show = false;
        this.coverShow = false;
        return;
      }
    }
  }
};
</script>

<style scoped>
.bg {
  background: #fff;
}
.contain {
  width: 100%;
  height: 100%;
}
.header {
  background: rgba(32, 160, 255);
  position: relative;
  width: 100%;
  height: 60px !important;
  line-height: 60px;
}
.aside {
  border-right: 1px solid rgb(204, 163, 163);
}
.type {
  font-size: 24px;
  font-weight: 500;
  color: rgb(22, 24, 24);
  position: absolute;
  left: 27%;
}
.title {
  float: left;
  font-size: 20px;
  color: #fff;
  margin-left: 20px;
}
.title1 {
  cursor: pointer;
  float: right;
  font-size: 20px;
  color: #fff;
  margin-right: 20px;
}
.table1 {
  margin-top: 40px;
  border: 1px solid #dfe6ec;
  color: #1f2d3d;
}
.page {
  float: right;
  right: 70px;
}
.modal {
  z-index: 1001;
  text-align: center;
  position: absolute;
  top: 47%;
  left: 42%;
  width: 239px;
  height: 181px;
  background: rgba(8, 56, 103, 1);
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  opacity: 1;
}
.modal p {
  margin-top: 74px;
  font-size: 23px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(221, 243, 255, 1);
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
  background: rgba(8, 56, 103, 1);
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
.close {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 32px;
  height: 32px;
}
.modal1-2 {
  z-index: 1000;
  position: absolute;
  top: 30%;
  left: 50%;
  width: 600px;
  height: 400px;
  padding: 30px;
  background: #fff;
  border-radius: 2px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  opacity: 1;
  font-family: Microsoft YaHei;
  font-weight: 400;
  font-size: 16px;
  color: #48576a;
}
.modal1-3 {
  z-index: 999;
  padding: 30px;
  top: 30%;
  right: 40%;
  position: absolute;
  width: 300px;
  overflow-y: auto;
  background: rgba(221, 243, 255, 1);
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  opacity: 1;
}
.modal1-3 p {
  margin-top: 8px;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #1f2d3d;
  opacity: 1;
}
.row {
  margin-top: 30px;
}
.addBtn {
  float: right;
  right: 30px;
  margin-top: 20px;
}
</style>
<style>
.table1 .el-table,
.table1 .el-table th,
.table1 .el-table tr {
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 500;
}
.table1 .el-table tr:hover {
  color: #00b3ed;
}
</style>