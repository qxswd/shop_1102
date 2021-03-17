<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <el-menu
          default-active="/index"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          router
        >
          <el-menu-item index="/index/home">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>

          <template v-for="item in user.menus">
            <el-submenu :index="item.title" :key="item.id" v-if="item.children">
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{ item.title }}</span>
              </template>
              <el-menu-item
                v-for="i in item.children"
                :key="i.id"
                :index="'/index/' + i.url"
                >{{ i.title }}</el-menu-item
              >
            </el-submenu>
            <el-menu-item v-else :key="item.id" :index="'/index/' + item.url">{{
              item.title
            }}</el-menu-item>
          </template>

          <!-- <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span>系统设置</span>
            </template> -->
          <!-- <el-menu-item index="/index/menu">菜单管理</el-menu-item>
            <el-menu-item index="/index/role">角色管理</el-menu-item>
            <el-menu-item index="/index/manager">管理员管理</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-goods"></i>
              <span>商品分类</span>
            </template>
            <el-menu-item index="/index/spec">商品规格</el-menu-item>
            <el-menu-item index="/index/goods">商品管理</el-menu-item>
            <el-menu-item index="/index/member">会员管理</el-menu-item>
            <el-menu-item index="/index/banner">轮播图管理</el-menu-item>
            <el-menu-item index="/index/seckill">秒杀活动</el-menu-item>
          </el-submenu> -->
        </el-menu>
      </el-aside>
      <el-container>
        <el-header height="80px">
          {{ user.username }}
          <el-button @click="outLogin" type="primary">退出</el-button>
        </el-header>

        <el-main>
          <!-- 二级路由 -->
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/index' }"
              >首页</el-breadcrumb-item
            >
            <el-breadcrumb-item>{{ this.$route.name }}</el-breadcrumb-item>
          </el-breadcrumb>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      user: "user",
    }),
  },
  methods: {
    ...mapActions({
      requestUser: "userActions",
    }),
    outLogin() {
      this.requestUser(null);
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
  text-align: right;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
  height: 100vh;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  /* text-align: center; */
}
</style>