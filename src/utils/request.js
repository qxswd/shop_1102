import axios from "axios"
import qs from "qs"
import {errorAlert} from "./alert"
import store from "../store/index"
import router from "../router/index"

//设置基础路径
const baseUrl = "/api"
// 请求拦截中设置请求头
axios.interceptors.request.use(config=>{
    console.group("本次请求的路径为" + config.url);
    if(config.url != baseUrl + "/api/userlogin"){
        config.headers.authorization = store.state.user.token
    }
    console.log(config);
    return config
})
//设置一个响应拦截
axios.interceptors.response.use(res=>{
    console.group("本次响应路径为:" + res.config.url)
    if(res.data.code !==200){
        if(res.data.code == 403){
            router.push("/login")
        }
        errorAlert(res.data.msg)
        return;
    }
    console.log(res);
    return res;
})

//添加菜单
export const addMenu = (data)=>{
    return axios({
        method:"post",
        url:baseUrl+"/api/menuadd",
        data:qs.stringify(data)

    })
}
// 菜单列表
// params
export const getMenu = (params)=>{
    return axios({
        method:"get",
        url:baseUrl+"/api/menulist",
        params
    })
}
// 获取一条菜单
export const oneMenu  = (params)=>{
    return axios({
        method:"get",
        url:baseUrl+"/api/menuinfo",
        params
    })
}
// 修改菜单
export const updateMenu = (data)=>{
    return axios({
        method:"post",
        url:baseUrl+"/api/menuedit",
        data:qs.stringify(data)
    })
}

// 删除菜单
export const delMenu = (data)=>{
    return axios({
      method:'post',
      url:baseUrl+'/api/menudelete',
      data:qs.stringify(data)
    })
  }

// 添加角色
export const addRole = (data)=>{
    return axios({
        method:"post",
        url:baseUrl+"/api/roleadd",
        data:qs.stringify(data)
    })
}
// 角色列表
export const getRole = (params)=>{
    return axios({
        methods:"get",
        url:baseUrl+"/api/rolelist",
        params
    })
}
  //获取一条角色

export const oneRole = (params)=>{
    return axios({
        method:"get",
        url:baseUrl+"/api/roleinfo",
        params
    })
}

//角色修改
export const updateRole = (data)=>{
    return axios({
        method:"post",
        url:baseUrl + "/api/roleedit",
        data:qs.stringify(data)
    })
}


//角色删除
export const delRole = (data)=>{
    return axios({
        method:"post",
        url:baseUrl+"/api/roledelete",
        data:qs.stringify(data)
    })
}

// 管理员添加
export const  addManager = (data)=>{
    return axios({
        method:"post",
        url:baseUrl+"/api/useradd",
        data:qs.stringify(data)
    })
}


// 获取管理员列表
export const getManager = (params)=>{
    return axios({
      method:'get',
      url:baseUrl+'/api/userlist',
      params,
    })
  }
  
  // 获取管理员总数
  export const managerCount = ()=>{
    return axios({
      method:'get',
      url:baseUrl+'/api/usercount',
    })
  }

  //获取一条管理员
  export const oneManager = (params)=>{
      return axios({
          method:"get",
          url:baseUrl+"/api/userinfo",
          params
      })
  }
// 修改管理员
export const updateManager = (data)=>{
    return axios({
        method:"post",
        url:baseUrl+"/api/useredit",
        data:qs.stringify(data)
    })
}

// 删除管理员
export const delManager =(data)=>{
    return axios({
        method:"post",
        url:baseUrl+"/api/userdelete",
        data:qs.stringify(data)
    })
}

//登陆管理
export const  requestLogin =(data)=>{
    return axios({
        method:"post",
        url:baseUrl+"/api/userlogin",
        data:qs.stringify(data)
    })
}

//商品分类添加
export const  addCate =(data)=>{
    var form = new FormData()
    for(let i in data){
        form.append(i,data[i])
    }
    return axios({
        method:"post",
        url:baseUrl+"/api/cateadd",
        data:form
    })
}

//商品分类列表
export const getCate = (params)=>{
    return axios({
        method:"get",
        url:baseUrl + "/api/catelist",
        params
    })
}
//分类详情获取
export const oneCate = (params)=>{
    return axios({
        method:"get",
        url:baseUrl + "/api/cateinfo",
        params
    })
}


//修改商品分类

export const updateCate  = (data)=>{
    var form = new FormData()
    for(let i in data){
        form.append(i,data[i])
    }
    return axios({
        method:"post",
        url:baseUrl +"/api/cateedit",
        data:form
    })
}

//删除商品分类
export const delCate =(data)=>{
    return axios({
        method:"post",
        url:baseUrl+"/api/catedelete",
        data:qs.stringify(data)
    })
}


