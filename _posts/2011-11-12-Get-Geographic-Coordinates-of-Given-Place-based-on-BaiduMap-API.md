---
layout: post
title: "基于百度地图API获取指定城市地名坐标并生成ESRI Shapefile"
category: [Efficiency]
tag: [JavaScript, Python, Arcpy]
date: 2011-11-12 17:00:00
comments: true
---

Requirement and Design
=====

我们经常会想获取一些地点的经纬度坐标，比如北京市所有三甲医院列表及地址，如果对数据精度要求不高（不在意火星坐标的影响），使用百度地图API提供的返回坐标功能恰巧能满足这个需求。
1. 调用`百度地图JS版API`，查询地点并将得到的经纬度坐标保存成`CSV文件`；
2. 利用`Python`调用`Arcpy`将CSV文件中的经纬度转换成`ESRI Shapefile`。

<!-- more -->

Implementation
=====

- **1.**   程序是2011年11月写的，当时使用的是`百度地图 API JS版 v1.2`，我测试了一下，虽然历经版本迭代更新，这个代码依然可用。图1为运行效果。

![2011-11-12-search-for-coordinates-based-on-baidumap-api.png](http://zhulj-blog.oss-cn-beijing.aliyuncs.com/baidu-API-search-locations/2011-11-12-search-for-coordinates-based-on-baidumap-api.png)

图1 基于百度地图模糊查询地名并返回经纬度坐标

<i class="fa fa-download fa-2x" aria-hidden="true"></i>完整代码如下，[下载](http://zhulj-blog.oss-cn-beijing.aliyuncs.com/baidu-API-search-locations/SearchForLocationCoordinateFromBaiduAPI.html)：


<figure class="lineno-container">
{% highlight js linenos %}
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>Get Geographic Coordinates of Given Place</title>
<meta name="Author" content="Liang-Jun Zhu">
<meta name="Keywords" content="batch,geographic coordinates,fuzzy search">
<meta name="Description" content="Get geographic coordinates of given place based on Baidu Map API.">
<script type="text/javascript" src="http://api.map.baidu.com/api?v=1.2"></script>
</head>
<body>
	<P>搜索城市<input id="txtCity" type="text" value="北京市" /></n>
	<p>地名关键词<input id="txtSearch" type="text" value="中科院地理所" />
	<input type="button" value="生成坐标序列" onclick="search()" /> </n>
	<p>显示结果<textarea id="txtResult" rows="10" cols="30" value="" /></textarea>
<div id="divMap" style="width:400px;height:400px;border:solid 1px gray"></div>
	<script type="text/javascript">
	function $(id){
		return document.getElementById(id);//定义$,以便调用
	}
	var map = new BMap.Map("divMap");//创建地图
	var city=new BMap.LocalSearch(map,{renderOptions:{map:map,autoViewport:true}});
	function search(){
		$("txtResult").value=""//每次生成前清空文本域
		map.clearOverlays(); //清除地图上所有标记
		var c=$("txtCity").value;
		city.search(c);//查找城市
		var s=$("txtSearch").value;
		var ls = new BMap.LocalSearch(c);
		ls.search(s);
		var i=1;
		ls.setSearchCompleteCallback(function(rs){
			if (ls.getStatus() == BMAP_STATUS_SUCCESS){
					for(j=0;j<rs.getCurrentNumPois();j++)
					{
						var poi=rs.getPoi(j);
						map.addOverlay(new BMap.Marker(poi.point)); //如果查询到，则添加红色marker
						$("txtResult").value+= poi.title+":" +poi.point.lng+","+poi.point.lat+'\n';
					}
					if(rs.getPageIndex!=rs.getNumPages())
          {
            ls.gotoPage(i);
            i=i+1;
          }
			}});}
	</script>
</body>
</html>
{% endhighlight %}
</figure>

- **2.** 将坐标点`CSV文件`和以下代码放入同一个文件夹下，设置`CSVName`,`XName`和`YName`后运行即可得到`ESRI Shapefile`。

如果没有安装`ArcGIS`，即`Arcpy`不可用，可以选择调用`GDAL`，在此不再赘述。

<i class="fa fa-download fa-2x" aria-hidden="true"></i> [运行示例点坐标下载](http://zhulj-blog.oss-cn-beijing.aliyuncs.com/baidu-API-search-locations/designed_samples.csv)，[Python脚本下载](http://zhulj-blog.oss-cn-beijing.aliyuncs.com/baidu-API-search-locations/CSV2PtsShp.py)

<figure class="lineno-container">
{% highlight py linenos %}
#! /usr/bin/env python
#coding=utf-8
## Author : Liangjun Zhu
## Email : crazyzlj@gmail.com
## Date : 2015-1-23
## Usage : Convert a .csv filetype points file to a vector shapefile
##         put this .py file in the same folder, input the file name and 
##         x,y column name.
import os,sys
import arcpy
from arcpy import env

def currentPath():
    path = sys.path[0]
    if os.path.isdir(path):
        return path
    elif os.path.isfile(path):
        return os.path.dirname(path)

def CSV2PtsShp(CSVFile,X,Y):
    env.workspace = os.path.dirname(CSVFile)
    PtsShp = os.path.basename(CSVFile)
    PtsShp = PtsShp.split('.')[-2] + ".shp"
    print PtsShp
    try:
        arcpy.MakeXYEventLayer_management(CSVFile,X,Y,"tempLayer","","")
        arcpy.CopyFeatures_management("tempLayer",PtsShp)
    except:
        print arcpy.GetMessages()
        arcpy.AddMessage(arcpy.GetMessages())
    
    print os.path.dirname(CSVFile)
    print "%s Convert to Shp Done!" % CSVFile

if __name__ == '__main__':
    CSVName = "designed_samples.csv"
    XName = "RecommendedX"
    YName = "RecommendedY"
    currFolder = currentPath()
    CSVFile = currFolder + os.sep + CSVName
    CSV2PtsShp(CSVFile,XName,YName)
{% endhighlight %}
</figure>   


> 版权声明：本文为博主原创文章，未经博主允许不得转载。如需转载，请联系[zlj@lreis.ac.cn](zlj@lreis.ac.cn)，或在博文下留言，谢谢！
> 
> All rights reserved: It's not allowed to use this post in any form include reproduce and modify without the origional author's permission. If any need, please contact [zlj@lreis.ac.cn](zlj@lreis.ac.cn). Thank you!