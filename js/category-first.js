$(function () {

	var page = 1;

	var pagesize = 5;

	var totalpage = 0;

	// 1 页面加载发送ajax请求
	getdata ();

	// 2 上一页和下一页功能实现
	$('#prev').on('click', function () {

		page--;

		if (page < 1) {

			alert('这已经是第一页了');

			page = 1;

			return;

		}

		getdata ();

	})

	$('#next').on('click', function () {

		page++;

		if (page > totalpage) {

			alert('这已经是最后一页了');

			page = totalpage;

			return;

		}

		getdata ();

	})

	// 3 完成添加一级分类功能
	$('#addFirstCategory').on('click', function () {

		// 获取输入的数据
		var value = $('#newFirstCategory').val();

		if (!$.trim(value)) {

			alert('请输入一级分类名称');

			return;

		}

		// 发送ajax请求
		$.ajax({

			url: `${baseUrl.url}/category/addTopCategory`,

			data: {

				categoryName: value

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

	// 请求数据
	function getdata () {

		$.ajax({

			url: `${baseUrl.url}/category/queryTopCategoryPaging`,

			data: {

				page: page,

				pageSize: pagesize

			},

			type: 'get',

			success:function (msg) {	

				if (msg.error) {

					location.href = 'login.html';
					// console.log(msg)

				} else {

					var html = template('listTpl', msg);

					$('#listBox').html(html);

				}

				// 计算总页数
				totalpage = Math.ceil(msg.total / pagesize);

			}

		})

	}

})

