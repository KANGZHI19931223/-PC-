$(function(){

	var navLi = $('.navs li')

	navLi.on('click',function(){

		$(this).find('ul').slideToggle();

	});

});

// url地址前缀
var baseUrl = {

	url: 'http://fullstack.net.cn:3000'

}

// 封装解析哈希值的函数
function renderUrl (data) {
	// 获取哈希值
	var url = location.search;
	
	var editUrl = url.slice(1);

	var arr1 = editUrl.split('&');

	for (var i = 0; i < arr1.length; i++) {

		var arr2 = arr1[i].split('=');

		if (arr2[0] == data) {

			return arr2[1];

		}

	}

	return -1;

}

// 扩展$方法(获取表单信息)
$.fn.serializeToJson = function () {
	var formAry = this.serializeArray();
	var result = {};
	formAry.forEach(function (item) {
		result[item.name] = item.value;
	})
	return result;
}

$.ajaxSetup({crossDomain: true, xhrFields: {withCredentials: true}});