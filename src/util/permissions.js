
const hasPermission = userPermission => {
    // 当前按钮列表，我是用本地缓存存储
    let btnPermissionList = JSON.parse(localStorage.getItem('requestPaths'))
    // 是否在权限数组里面
    let status = btnPermissionList.includes(userPermission)
    // console.log(status)
    return status
}

export {hasPermission}