//将电话号码中间的几位数隐藏显示
export function starPhone(phoneNum){
	let str =  String(phoneNum),
	strLen = str.slice(-8,-4);
	return str.replace(strLen,"****");
 }
// 获取地址栏参数
 export function getUrlKey(name,url){
　　return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(url) || [, ""])[1].replace(/\+/g, '%20')) || null

}