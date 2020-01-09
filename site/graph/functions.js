// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('main'));

var xstart = parseInt($("#fxstart").val());
var xend = parseInt($("#fxend").val());

var functionArr = [];
var dataArr = [];
var xx = [];
	for (var x = xstart; x < xend; x+=0.005) {
		xx.push(x);
	}
	
var legendData = [];
option = {
    title: {text: '绘制函数', left: 'center'},
    tooltip : {show:true},
    legend: {orient: 'vertical', x: 'right', top: 50, data:legendData},
    toolbox: {feature: {saveAsImage: {}}},
    grid: {show: true, left: '2%', right: '3%', bottom: '2%', containLabel: true, backgroundColor: 'rgba(228, 168, 128, 0.1)'},
    xAxis : [{type : 'category', name: 'x', boundaryGap : false, data : xx}],
    yAxis : [{type : 'value', name: "y"}],
    dataZoom: [{type: 'slider', start: 40, end: 60}, {type: 'inside', start: 0, end: 100}],
    series : []
};
myChart.setOption(option);

$("#add").click(function() {
	// 增加函数
	xstart = parseInt($("#fxstart").val());
	xend = parseInt($("#fxend").val());
	var formula = $("#formula").val();
	var has = false;
	for(n = 0; n < functionArr.length; n++) {
		if(formula == functionArr[n]) {
			has = true;
		}
	}
	if(!has) {
		functionArr.push(formula);
	}
	addfunction();
	//alert(functionArr)
	draw();
})

function addfunction() {
	$("#functionList").empty();
	for(j = 0; j < functionArr.length; j++) {
		var id = getRandomNum()
		$("#functionList").append("<div id='" + id + "' class='functionList'>y=" + functionArr[j] + "<a class='btn btn-mini pull-right' onclick='deletefunction(" + j + ")'>x</a></div>")
	}
}

function deletefunction(n) {
	functionArr.splice(n, 1);
	//alert(n);
	addfunction();
	draw();
}

function draw() {
	for(i = 0; i < functionArr.length; i++) {
		dataArr = [];
		for (var x = xstart; x < xend; x+=0.05) {
			dataArr.push(eval(functionArr[i]));
		}
	
		// 图例
		legendData.push("y=" + functionArr[i]);
	
		// 将data添加至series
		var dataInfo = {} 
		dataInfo.name = 'y=' + functionArr[i];
		dataInfo.type = 'line';
		dataInfo.data = dataArr;
		option.series.push(dataInfo);
	}
	myChart.setOption(option);
}

// 随机id
function getRandomNum(){
	var result = "";
	for(var i = 0; i < 4; i++){
		var ranNum = String.fromCharCode(Math.floor( Math.random() * 26) + "a".charCodeAt(0))
		result += ranNum;
	}
	return result;
}

