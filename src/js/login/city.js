/**
 * Created by appian on 2016/10/27.
 */

import {submitCityArr} from "../../apis/login.api";
document.addEventListener("touchstart", function () {
}, false);

var V = new Vue({
	el: '#noticeBox',
	data: {
		title: $data.title,
		desc: $data.desc,
		hot: $data.hot,
		choice: $data.choice,
		result: '请选择',
		status: $data.status, //0:尚未选择,1:选择成功
		nextTxt: '下一步',
		resultArr: [],
		hover: -1,
		nextType: 0,
	},
	ready: function () {
		var _this = this;
		new MultiPicker({
			input: 'multi-picker-input',//点击触发插件的input框的id
			container: 'targetDiv',//插件插入的容器id
			jsonData: city,
			callbackFuc (arr) {
				_this.$set('resultArr', arr);
				_this.getResult(arr);
			}
		});
	},
	methods: {
		postSuccess: function () {
			var _this     = this;
			_this.status  = 1;
			_this.title   = '选班成功';
			_this.nextTxt = '知道了';
			$("#next a").on("touchstart", function () {
				wx.ready(function () {
					wx.close();
				});
			});
		},
		next: function () {
			var _this = this;
			if(this.result == '请选择') return;
			submitCityArr( {
				city: _this.resultArr,
			}).then(function(data){
				if (data.errcode == 0) {
					// _this.postSuccess();
					window.location = "qrcode.html";
				} else {
					alert('网络异常');
				}
			});
		},
		getResult: function (arr) {
			this.hover     = -1;
			this.result    = '';
			for ( var i = 0; i < arr.length; i++ ) {
				this.result += arr[i].value + '  ';
			}
		},
		choose: function (obj, idx) {
			this.resultArr = [];
			this.resultArr.push(obj.id);
			this.hover = this.hover == idx ? -1 : idx;
			console.log(this.resultArr);
		}
	},
	watch : {
		result : function(){
			if(this.result == '请选择') {
				this.nextType = 0;
			} else {
				this.nextType = 1;
			}
		}
	}
});
