<template>
  <div>
    <el-button type="success" @click="add">添加</el-button>
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
      this.info.title = "添加商品规格"
      this.info.isAdd = true
    },
    edit(id){
      this.info.show = true;
      this.info.title = "编辑商品规格"
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

<style scoped>
  .el-button{
    margin-top: 10px;
  }
</style>