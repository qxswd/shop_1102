import {getGoods,goodsCount} from "../../utils/request"

const state = {
    goodsList : [],
    size:2, //每页显示的条数
    page:1, //当前页码
    count:0
}
const mutations = {
    changeGoodsList(state,arr){
        state.goodsList = arr
    },
    changeCount(state,num){
        state.count = num
    },
    changePage(state,page){
        state.page = page
    },
}
const actions = {
    goodsListActions(context,value){
        var params = null;
        if(value !== null){
            params = {
                size:context.state.size,
                page:context.state.page
            }
        }
        getGoods(params).then(res=>{
            if((res.data.list == null || res.data.length == 0)&& context.state.page > 1){
                var P = context.state.page - 1;
                context.commit("changePage",P);
                context.dispatch("goodsListActions")
                return;
            }
            context.commit("changeGoodsList",res.data.list)
        })
    },
    countActions(context){
        goodsCount().then(res=>{
            // console.log(res.data.list)
            context.commit("changeCount",res.data.list[0].total)
        })
    },
    pageActions(context,page){
        context.commit("changePage",page)
    }
}


const getters = {
    goodsList(state){
        return state.goodsList
    },
    count(state){
        return state.count
    },
    size(state){
        return state.size
    },
    
}

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced:true,
}
