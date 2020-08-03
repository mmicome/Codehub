// declare var $:any;
// function loadJs(url: any, _callback_success: (response: any) => void, _callback_fail: (response: any) => void) {
//   var callback_success = function(response: any) {
//     console.log("load js success...", response);
//   };
//   var callback_fail = function(response: any) {
//     console.log("load js fail...", response);
//   };
//   _callback_success = _callback_success || callback_success;
//   _callback_fail = _callback_fail || callback_fail;
//   $.getScript(url)
//     .done(_callback_success)
//     .fail(_callback_fail);
// }


// function API() {}
//   //加载js的函数
// API.prototype.loadJs = function(url: any, callback: { success?: any; fail?: any; }) {
//   callback = callback || {};
//   loadJs(url, callback.success, callback.fail);
// };

// export default {
//   install(Vue: { prototype: { $api: any; }; }) {
//     Vue.prototype.$api = API;
//   }
// };
// // this.$api.loadJs('url');