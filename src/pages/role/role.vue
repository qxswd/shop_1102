<template>
  <div>
      <el-button type="primary" @click="add">添加</el-button>
      <v-add :info="info" ref="add"></v-add>
      <v-list @edit="edit"></v-list>

  </div>
</template>

<script>
import vAdd from "./components/add"
import vList from "./components/list"

export default {
    data(){
        return{
            info:{
                show:false,
                title:"",
                isAdd:true

            }
        }
    },
    methods:{
        add(){
            this.info.show = true;
            this.info.title = "角色添加"
            this.info.isAdd = true
        },
        edit(id){
            this.info.show = true;
            this.info.title = "角色编辑"
            this.info.isAdd = false;
            this.$refs.add.getDetail(id)
        }
    },
    components:{
        vAdd,
       vList
    }
}
</script>

<style>
.el-button{
    margin: 10px;
}
</style>