import { getSpecsList, specsCount } from "../../utils/request"

 const state={
    specsList:[],
    size:2,// 每页两条
    page:1, //当前页码
    count:0, //总的记录数
}

 const mutations = {
    changeSpecsList(state,arr){
        state.specsList = arr
    },
    changeCount(state,num){
        state.count = num
    },
    changePage(state,page){
        state.page = page
    }
}
 const actions = {
    specsListActions(context){

        var params = {
            size : context.state.size,
            page : context.state.page
        }
        getSpecsList(params).then(res=>{

            ////////////////////////////
            if((res.data.list == null || res.data.list.length == 0) && context.state.page > 1){
                var p = context.state.page -1;
                context.commit('changePage',p);
                // 自调
                context.dispatch('specsListActions');
                return;
                    }
                context.commit("changeSpecsList",res.data.list)
                })
    },
    countActions(context){
        specsCount().then(res=>{
            context.commit("changeCount",res.data.list[0].total)
        })
    },
    pageActions(context,page){
        context.commit("changePage",page)
    }
}
const getters ={
    specsList(state){
        return state.specsList
    },
    count(state){
        return state.count
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced:true
}