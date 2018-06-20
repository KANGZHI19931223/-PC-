$(function () {

	// 1 给登录按钮添加点击事件
	$('#loginBtn').on('click', function () {

		// 2 获取表单数据
		var result = $('#loginForm').serializeToJson();

		$.ajax({

			url: `${baseUrl.url}/employee/employeeLogin`,

			data: result,

			type: 'post',

			success: function (msg) {

				if (msg.success) {
					// 登录成功 页面跳转
					location.href = 'user.html';

				} else {
					// 登录失败提示信息
					alert(msg.message);

				}

			}
		})

	})

})