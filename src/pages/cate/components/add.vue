<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">
        <el-form-item label="上级分类" :label-width="formLabelWidth">
          <el-select v-model="form.pid">
            <el-option label="--请选择--" :value="1000" disabled></el-option>
            <el-option label="顶级分类" :value="1"></el-option>
            <el-option v-for="item in cateList" :key="item.id" :label="item.catename"
              :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类名称" :label-width="formLabelWidth">
          <el-input v-model="form.catename"></el-input>
        </el-form-item>
        <el-form-item label="图片" :label-width="formLabelWidth">
          <!-- <div id="box" >
                <h2>+</h2>
                <img src="" alt="">
                <input type="file">
            </div> -->
          <!-- <div class="box"> -->
            <el-upload
              class="avatar-uploader"
              action="#"
              :show-file-list="false"
              :on-change="changeImg"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          <!-- </div> -->
        </el-form-item>
        <el-form-item label="管理员状态" :label-width="formLabelWidth">
          <el-switch
            v-model="form.status"
            active-color="blue"
            inactive-color="grey"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="confirm" v-if="info.isAdd"
          >确 定</el-button
        >
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { successAlert, warningAlert } from "../../../utils/alert";
import { addCate ,oneCate,updateCate} from "../../../utils/request";

export default {
  props: ["info"],

  data() {
    return {
      imageUrl:"",
      formLabelWidth: "120px",
      form: {
        pid: 1000,
        catename: "",
        img: "",
        status: 1, //1正常 2 禁用
      },
    };
  },
  computed: {
    ...mapGetters({
      "cateList": "cate/cateList",
    }),
  },
  methods: {
    ...mapActions({
      "requestCateList": "cate/cateListActions",
    }),
    changeImg(e){
        if(e.size>2*1024*1024){
            warningAlert("文件大小不能大于2M")
            return
        }
        var egJpg = [".jpg","png","jpeg","gif"]
        var egJpgName = e.name.slice(e.name.lastIndexOf("."));


        if(!egJpg.some(item=>item == egJpgName)){
            warningAlert("文件格式不对")
            return
        }

        //上传正确的文件
        this.imageUrl = URL.createObjectURL(e.raw)
        //将文件放入form.img
        this.form.img = e.raw
    },
    cancel() {
      this.info.show = false;
      this.form = {
        pid: 1000,
        catename: "",
        img: "",
        status: 1, //1正常 2 禁用
      };
      this.imageUrl = ""
    },
    confirm() {
        console.log(this.form);
      addCate(this.form).then(res => {
        successAlert(res.data.msg);
        this.cancel();
        this.requestCateList();
      });
    },
    getDetail(id){
        oneCate({id}).then(res=>{
            this.form = res.data.list;
            this.form.id = id;
              // this.imageUrl = this.$www + this.form.img



            if(this.form.img){
                this.imageUrl = this.$www + this.form.img
                // this.requestCateList()
            }else{
                this.imageUrl = ""
                // this.requestCateList()
            }
            
            
        })
    },
    update(){
      updateCate(this.form).then(res=>{
          console.log(this.form);
        successAlert(res.data.msg)
        this.cancel()
        this.requestCateList()
      })
    }
  },
  mounted() {
    this.requestCateList();
  },
};
</script>

<style>
 /* .box {
  width: 150px;
  height: 150px;
  border: 1px dashed green;
  position: relative;
} */
/*.box h3 {
  width: 100%;
  height: 100%;
  text-align: center;
  line-height: 150px;
}
.box img {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}
.box input {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
} */

.avatar-uploader  .el-upload {
    border: 1px dashed green;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader  .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>