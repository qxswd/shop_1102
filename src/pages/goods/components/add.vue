<template>
  <div>
      <el-dialog :title="info.title" :visible.sync="info.show" @opened="opened">
        <el-form :model="form">
           <el-form-item label="一级分类" :label-width="formLabelWidth">
            <el-select v-model="form.first_cateid" @change="changecate(false)">
              <el-option label="--请选择--" value="-1" disabled></el-option>
              <el-option v-for="item in cateList" :key="item.id" :label="item.catename" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="二级分类" :label-width="formLabelWidth">
            <el-select v-model="form.second_cateid" >
              <el-option label="--请选择--" value="-1" disabled></el-option>
              <el-option v-for="item in secondCate" :key="item.id" :label="item.catename" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品名称" :label-width="formLabelWidth">
            <el-input v-model="form.goodsname" ></el-input>
          </el-form-item>
          <el-form-item label="商品价格" :label-width="formLabelWidth">
            <el-input v-model="form.price" ></el-input>
          </el-form-item>
          <el-form-item label="市场价格" :label-width="formLabelWidth">
            <el-input v-model="form.market_price" ></el-input>
          </el-form-item>
          <el-form-item label="图片" :label-width="formLabelWidth">
            <el-upload class="avatar-uploader" action="#" :show-file-list="false" :on-change="changeImg" >
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          <!-- </div> -->
        </el-form-item>

          <el-form-item label="商品规格" :label-width="formLabelWidth">
            <el-select v-model="form.specsid" @change="changeSpecs(false)">
              <el-option label="--请选择--" value="" disabled></el-option>
              <el-option v-for="item in specsList" :key="item.id" :label="item.specsname" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="规格属性" :label-width="formLabelWidth">
            <el-select v-model="form.specsattr" multiple>
              <el-option label="--请选择--" value="" disabled></el-option>
              <el-option v-for="item,index in secondSpecs" :key="index" :label="item" :value="item"></el-option>
            </el-select>
           </el-form-item>
          <el-form-item label="是否新品" :label-width="formLabelWidth">
              <el-radio v-model="form.isnew" :label="1">是</el-radio>
              <el-radio v-model="form.isnew" :label="2">否</el-radio>
          </el-form-item>
          <el-form-item label="是否热卖" :label-width="formLabelWidth">
              <el-radio v-model="form.ishot" :label="1">是</el-radio>
              <el-radio v-model="form.ishot" :label="2">否</el-radio>
          </el-form-item>
        <el-form-item label="管理员状态" :label-width="formLabelWidth">
              <el-switch v-model="form.status" active-color="blue" inactive-color="grey" :active-value="1" :inactive-value="2" >
              </el-switch>
        </el-form-item>
        <el-form-item label="描述" :label-width="formLabelWidth">
          <div id="box"></div>
        </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="confirm" v-if="info.isAdd">确 定</el-button>
          <el-button type="primary" @click="update" v-else>修 改</el-button>
        </div>
      </el-dialog>
  </div>
</template>

<script>
import E from 'wangeditor'
import { mapActions, mapGetters } from 'vuex'
import { successAlert, warningAlert } from '../../../utils/alert'
import { addGoods ,oneGoods,updateGoods} from '../../../utils/request'

export default {
    data(){
        return{
            imageUrl:"",   //要显示的地址
            formLabelWidth:"120px",
            secondCate:[],
            secondSpecs:[],
            editor:"",
            form:{
                first_cateid:'',
                second_cateid:'',
                goodsname:'',
                price:'',
                market_price:'',
                img:'',
                description:'',
                specsid:'',
                specsattr:[],
                isnew:1,
                ishot:1,
                status:1
            }
        }
    },
    computed:{
        ...mapGetters({
            "cateList":"cate/cateList",
            "specsList":"specs/specsList",
            "goodsList":"goods/goodsList"
        })
    },
    methods:{
        ...mapActions({
            "requestCateList":"cate/cateListActions",
            "requestSpecsList":"specs/specsListActions",
            "requestGoodsList":"goods/goodsListActions"
            // "requestSpecsList1":"specs/specsListActions1"
        }),
        opened(){
            this.editor = new E('#box')
            this.editor.create()
            this.editor.txt.html(this.form.description)
        },
        changecate(bool){
            if(!bool){
                this.form.second_cateid = ""
            }
            // console.log(this.form.first_cateid);
            var index = this.cateList.findIndex(item=>item.id == this.form.first_cateid)
            this.secondCate = this.cateList[index].children
            // console.log(this.secondCate[0].id);
            // console.log(this.secondCate[0].catename);
        },
        changeImg(e){
          // console.log(e);
          if(e.size > 2*1024*1024){
            warningAlert("上传文件大小不能超过2M")
            return
          }
          var endEgjpg = [".jpg",".gif",".jpeg",".png"]
          var endEgjpgName = e.name.slice(e.name.lastIndexOf("."))
          if(!endEgjpg.some(item=>item == endEgjpgName)){
            warningAlert("上传文件格式不正确")
            return
          }
          this.imageUrl = URL.createObjectURL(e.raw)
          this.form.img = e.raw;
        },
        changeSpecs(){
          // console.log(this.specsList[0])
          var index = this.specsList.findIndex(item=>item.id == this.form.specsid)

          // console.log(this.specsList[0])

          this.secondSpecs = this.specsList[index].attrs
          // console.log(this.secondSpecs);
        },

        cancel(){
          this.info.show = false
          this.form = {
            first_cateid:'',
            second_cateid:'',
            goodsname:'',
            price:'',
            market_price:'',
            img:'',
            description:'',
            specsid:'',
            specsattr:[],
            isnew:1,
            ishot:1,
            status:1
          }
          this.imageUrl = ""
        },
        confirm(){
          //描述信息处理
        this.form.description = this.editor.txt.html()
          addGoods(this.form).then(res=>{
            successAlert(res.data.msg);
            this.cancel()
            this.requestGoodsList(this.info.value)
          })

        },
        getDetail(id){
          oneGoods({id}).then(res=>{
            this.form = res.data.list;
            this.form.id = id;

            //获取二级分类
            this.changecate(true)
            this.imageUrl = this.$www + this.form.img;
            //获取规格属性
            this.changeSpecs(true);
            this.form.specsattr = this.form.specsattr.split(",")
          })
        },
        update(){
          this.form.description = this.editor.txt.html();
          updateGoods(this.form).then(res=>{
            // console.log(res);
            successAlert(res.data.msg);
            this.cancel();
            // this.requestGoodsList()
          })
        }
    },
    mounted(){
        this.requestCateList()
        this.requestSpecsList(false)
    }

}
</script>

<style scoped>
  .avatar-uploader{
    border: 1px dashed greenyellow;
    width: 150px;
    height: 150px;
  }
  .el-icon-plus{
    width: 150px;
    height: 150px;
    line-height: 150px;
  }
  .avatar{
    width: 100%;
    height: 100%;
  }
  
</style>