// 验证管理员是否登录
$.ajax({

	url: `${baseUrl.url}/employee/checkRootLogin`,

	type: 'get',
	// 将ajax请求改成同步请求
	async: false,

	success: function (msg) {

		if (msg.error) {

			location.href = 'login.html';

		}

	}

})

$(function () {

	var page = 1;

	var pagesize = 5;

	var totalpage = 0;

	// 1 请求数据渲染页面
	getdata ();

	// 2 完成分页功能
	$('#prevBtn').on('click', function () {

		page--;

		if (page < 1) {

			alert('这已经是第一页了');

			page = 1;

			return;

		}

		getdata ();

	})

	$('#nextBtn').on('click', function () {

		page++;

		if (page > totalpage) {

			alert('这已经是最后一页了');

			page = totalpage;

			return;

		}

		getdata ();

	})

	// 3 完成添加新分类的功能

	// (1) 先完成商品分类下拉列表
	$.ajax({

		url: `${baseUrl.url}/category/queryTopCategoryPaging`,

		data: {

			page: 1,

			pageSize: 1111111

		},

		type: 'get',

		success: function (msg) {

			var html = template('firstCategoryList', msg);

			$('#firstCategorySelectList').html(html);

		}

	})

	// (2) 完成上传图片功能
	var brandLogo = '';
	// 文件上传第三步 插件调用
	$('#fileUpload').fileupload({
	    dataType: 'json',
	    done: function (e, data) {
	    	console.log(data);
	    	// 存储图片地址
	    	brandLogo = data._response.result.picAddr;
	    	// 拼接图片url
	    	var imgUrl= baseUrl.url + data._response.result.picAddr;
	    	// 将图片渲染到页面中
	     	$("#imgPreview").attr("src",imgUrl);
	    }
	});

	//  (3) 点击保存完成添加
	$('#save').on('click', function () {

		// 获取新分类名称
		var brandName = $('#brandName').val();

		// 获取以及分类id
		var categoryId = $('#firstCategorySelectList').val();

		var hot = 1;

		$.ajax({

			url: `${baseUrl.url}/category/addSecondCategory`,

			data: {

				brandName,

				categoryId,

				brandLogo,

				hot

			},

			type: 'post',

			success: function (msg) {

				if (msg.success) {

					location.reload();

				} else {

					alert(msg.message);

				}

			}

		})

	})



	// 封装请求数据的函数
	function getdata () {

		$.ajax({

			url: `${baseUrl.url}/category/querySecondCategoryPaging`,

			data: {

				page: page,

				pageSize: pagesize

			},

			type: 'get',

			success: function (msg) {

				// 请求成功 渲染页面
				var html = template('secondCategoryList', {
					list: msg,
					url: baseUrl.url
				});

				$('#secondCategoryBox').html(html);

				totalpage = Math.ceil(msg.total / pagesize);

			}

		})

	}

})