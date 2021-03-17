<template>
  <el-dialog :title="info.title" :visible.sync="info.show">
    <el-form :model="form" :label-width="formLabelWidth">
      <el-form-item label="角色名称" :label-width="formLabelWidth">
        <el-input v-model="form.rolename" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item  label="角色权限" :label-width="formLabelWidth">
        <el-tree :data="data"  show-checkbox node-key="id" :props="defaultProps" :default-checked-keys="defaultKey" ref="tree">
        </el-tree>
        <el-switch
          v-model="form.status"
          :active-value="1"
          :inactive-value="0"
          active-color="#13ce66"
          inactive-color="#ff4949"
        >
        </el-switch>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button @click="confirm" type="primary" v-if="info.isAdd">确 定</el-button>
      <el-button @click="update" type="primary" v-else>修 改</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { successAlert } from '../../../utils/alert';
import {addRole,oneRole, updateRole} from "../../../utils/request"
export default {
  props: ["info"],
  data() {
    return {
      value: true,
      form: {
        name: "",
        menus:"",
        status:1
      },
      formLabelWidth: "120px",
        defaultKey:[],
      defaultProps: {
        children: "children",
        label: "title",
      },
    };
  },
  computed: {
    ...mapGetters({
      "data": "menu/menuList",
    }),
  },
  methods: {
    ...mapActions({
      "requestmenuList": "menu/menuListActions",
      "requestroleList": "role/roleListActions",

    }),
    cancel(){
        this.info.show = false;
        // console.log(this.form.menus);
        this.form = {
            name:"",
            menus:"",
            status:1,
        }
        // console.log(this.$refs.tree);
        // 点击取消取消复选框
        this.defaultKey = this.$refs.tree.setCheckedKeys([])

    },
    confirm(){
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
        addRole(this.form).then(res=>{
            successAlert(res.data.msg)
            this.cancel()
            this.requestroleList();
        })
    },
    getDetail(id){
        oneRole({id:id}).then(res=>{
          this.form = res.data.list;
          this.form.id = id;
          this.defaultKey = JSON.parse(this.form.menus)
          // console.log(res);
        })
    },
    update(){
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys())
      updateRole(this.form).then(res=>{
        successAlert(res.data.msg),
        this.cancel(),
        this.requestroleList()
      })
    }
  },
  mounted() {
    this.requestmenuList();
  },
};
</script>

<style>
</style>