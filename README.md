# clock_plugin
原生js的简单时钟小插件
# 使用方法
```
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>clock</title>
	<link rel="stylesheet" href="./lib/clock.css"><!-- 引用css -->
</head>
<body>
	<div class="clock" id="box"></div><!-- html -->
</body>
<script src="./lib/clock.js"></script><!-- 引用js -->
<script>
	window.onload = function(){
		var ele = document.getElementById("box");//获取参数
		// 新建实例
		var clock = new clock(
			//传入容器参数
			ele,
			// 配置参数
			{
				diameter: 200, //直径
				color:['#f4f4f4','#f9f9f9'], //背景颜色数组
				colorChangeTime:3000, //自动变换颜色时间间隔 默认2000
				colorAutoChange:true, //允许自动变换颜色 默认false
				clickable:true, //是否能点击变换颜色 默认false
				showTimePoint:true, //是否显示时间分割点 默认true
				needleColor:["#333","#333","#333"] //指针颜色 默认为“#333” 1为秒钟颜色 2为分针颜色 3为时针颜色
			}
		)
	}
</script>
</html>
```
