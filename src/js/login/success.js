/**
 * Created by appian on 2016/10/31.
 */
document.addEventListener("touchstart", function () {}, false);

var notice = Vue.component("notice", {
	template: "#noticeTpl",
	data: function () {
		return {
			data: $data,
			swapDetail: $data.swapDetail,
			iconOn: false,
		}
	},
	ready: function () {
		var _this = this;
		setTimeout(function(){
			_this.iconOn = true;
		},0)
	},
	methods : {
		closeWindows : function(){
			WeixinJSBridge.call('closeWindow');
		}
	}
});
var V = new Vue({
	el: "html",
	data: {
	},
	methods: {}
});