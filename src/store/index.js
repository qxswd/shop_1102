import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)

import {state,mutations,getters} from "./mutations"
import actions from "./actions"
import menu from "./modules/menu"
import role from "./modules/role"
import manager from "./modules/manager"
import cate from "./modules/cate"




const store = new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
    modules:{
        menu,
        role,
        manager,
        cate
    }
})

export default store
