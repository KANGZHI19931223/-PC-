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

	// 1 发送ajax请求 获取用户数据
	$.ajax({

		url: `${baseUrl.url}/user/queryUser`,

		data: {

			page: 1,

			pageSize: 100

		},

		type: 'get',

		success: function (msg) {

			var html = template('userInfTpl', msg);

			$('#userInfBox').append(html);

		}

	})
	
	// 2 给禁用和启用按钮添加点击事件
	$('.table').on('click', '.btn', function () {
		// 获取点击按钮上的自定义属性data-isdelete 和 data-id
		var status = $(this).data('isdelete');

		var id = $(this).data('id');

		// 发送ajax请求
		$.ajax({

			url: `${baseUrl.url}/user/updateUser`,

			data: {

				id: id,

				isDelete: status == 1 ? 0 : 1

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

})