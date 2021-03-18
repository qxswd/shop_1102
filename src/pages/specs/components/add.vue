<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.show">
        <el-form :model="form">
            <el-form-item label="规格名称" :label-width="formLabelWidth">
                <el-input v-model="form.specsname"></el-input>
            </el-form-item>
            <el-form-item v-for="(item,index) in attrsArr" :key="index" label="规格属性" :label-width="formLabelWidth">
            <el-col :span="16">
              <el-input v-model="item.value"></el-input>
            </el-col>
            <el-button type="primary" v-if="index==0" @click="addAttr" >添加规格属性</el-button>
            <el-button type="danger" v-else @click="delAttr(index)">删除</el-button>
          </el-form-item>
          <el-form-item label="规格状态" :label-width="formLabelWidth">
              <el-switch
                  v-model="form.status"
                  active-color="blue"
                  inactive-color="grey" :active-value="1" :inactive-value="2">
                </el-switch>
           </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="confirm" v-if="info.isAdd"> 确 定</el-button>
          <el-button type="primary" @click="update" v-else>修 改</el-button>
        </div>
    </el-dialog>

  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { successAlert , warningAlert} from '../../../utils/alert';
import { addSpecs, oneSpecs, updataSpecs } from '../../../utils/request';
export default {
    props:["info"],
    data(){
        return{
            attrsArr:[{value:""}],
            formLabelWidth:"120px",
            form:{
                specsname:"",
                attrs:"",
                status:1
            },
        }
    },
    methods:{
        ...mapActions({
            "requestSpecsList":"specs/specsListActions"
        }),
        addAttr(){
            // 处理规格属性
            if(!this.attrsArr[0].value ==""){
                this.attrsArr.push({value:this.attrsArr[0].value})
                this.attrsArr[0].value = "";
            }else{
                warningAlert("规格属性值不能为空");
                return;
            } ;
        },
        delAttr(index){

            this.attrsArr.splice(index,1)
            },
        cancel(){
            this.info.show = false;
            this.form = {
            specsname:'',
            attrs:'',
            status:1,
            };
            this.attrsArr = [{value:''}];//规格属性值
         },
        confirm(){
            // this.attrsArr.unshift()

                // attrsArr.splice(1,attrsArr.length-1)
            this.form.attrs = this.attrsArr.splice(1,this.attrsArr.length-1).map(item=>item.value).join(',');

            addSpecs(this.form).then(res=>{
                console.log(res);
                successAlert(res.data.msg)
            });
            this.cancel();
            this.attrsArr.push({value:""});
            this.requestSpecsList()
            this.requestSpecsList()


        },
        getDetail(id){
            oneSpecs({id}).then(res=>{
                // console.log(res);
                this.form = res.data.list[0];
                this.form.id = id;
                console.log(this.form.attrs);
                var arr = this.form.attrs.split(",");
                this.attrsArr = [];
                for(let i in arr){
                    this.attrsArr.push({value:arr[i]})
                }
                this.attrsArr.splice(0,0,{value:''})

                
            })
        },
        update(){
           
            //处理规格属性
            if(this.attrsArr.some(item=>item.value !== "")){
                warningAlert("规格属性值不能为空o")
                return
            }

            //////  && this.attrsArr[0].value == ""
            this.form.attrs = this.attrsArr.splice(1,this.attrsArr.length-1).map(item=>item.value).join(',');
            // this.form.attrs = this.attrsArr.map(item=>item.value).join(",")
            updataSpecs(this.form).then(res=>{
                successAlert(res.data.msg)
                this.cancel();
                this.questSpecsList()
            })
        }
    }
};
</script>

<style>
</style>