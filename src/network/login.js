import { request } from './request'
// 相当于这里写各组件页方法，直接then调用
// 登录接口
export function loginMethod(name,pwd){
    return request({
        method:'post',
        url:'/manage/goLogin.json',
        data:{
            loginName:name,
            pwd:pwd
        }
    });
}
// 退出接口
export function quitMethod(){
    return request({
        method:'post',
        url:'/exit',
        data:{
        }
    });
}
// 当前用户信息（菜单、菜单权限，用户信息）
export function currentUserInfoMethod(token){
    return request({
        method:'post',
        url:'/sys/getCurrentUserInfo.json',
        data:{
            _token_iben:token
        }
    });
}