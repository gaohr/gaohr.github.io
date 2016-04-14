---
layout: post
title: "Python Environment Configuration for GISer"
category: [Python]
tag: [Python, Arcpy, GIS]
date: 2016-03-17 17:00:00
comments: true
---

**1. Arcpy**
======

ArcGIS Desktop 10.3开始安装时必须选择安装Python，好在可通过ArcGIS_BackgroundGP_for_Desktop_103_141996.exe安装支持64位python的arcpy。
这样，装完ArcGIS10.3之后我们就有了32位和64位的Python 2.7.8，分别位于`C:\Python27\ArcGIS10.3`和`C:\Python27\ArcGISx6410.3`。

为了方便使用，我们采用单独安装python（64位或32位），将`C:\Python27\ArcGISx6410.3\Lib\site-packages\DTBGGP64.pth`复制到`C:/Python27x64/Lib/site-packages`下（64位）； 或将`C:\Python27\ArcGIS10.3\Lib\site-packages\Deskt10.3.pth`复制到`C:/Python27x86/Lib/site-packages`下（32位）


<!-- more -->

但是此时如果右键以IDLE打开某py脚本，默认的python仍是ArcGIS自带安装32位版本的，因此需要做如下设置：

	注册表中找到
	HKEY_CLASSES_ROOT\\Python.CompiledFile\\shell\\open\\command\\(default)
	将其value修改为"C:\Python27\ArcGISx6410.3\python.exe" "%1" %*

以及其他注册表项，如下图：

![](http://zhulj-blog.oss-cn-beijing.aliyuncs.com/python-related%2Fpython-configuration.png)


**2. Install easy_install and pip**
======
+ 离线安装pip

	管理员方式运行cmd，cd到setuptools所在目录，输入`python setup.py install`；
	同样，cd到pip所在目录，输入`python setup.py install`
	这样，我们就可以离线安装whl格式的python第三方库啦，下载地址为http://www.lfd.uci.edu/~gohlke/pythonlibs/。
+ 在线安装pip

```python
python get-pip.py
```

**3. Install packages using pip**
======

+ GDAL
通过上述链接，可以下载完整的GDAL打包文件GDAL-1.11.3-cp27-none-win_amd64.whl，管理员方式运行cmd，cd到该文件目录，输入pip install GDAL-1.11.3-cp27-none-win_amd64.whl，提示安装成功即可，输入以下命令验证是否安装成功：
	
```python
>>> python
>>> from osgeo import gdal
>>> from osgeo import ogr
>>> from osgeo import osr
>>> from osgeo import gdal_array
>>> from osgeo import gdalconst
```

+ 其他python库安装

将whl文件(如scipy，numexpr，PyQt4，wxPython（需要wxPython_common），PyGTK，python_dateutil，pytz，matplotlib，pywin32...)下载到某一英文目录下，然后新建.bat文件，输入如下内容，注意修改`PYPATH`路径：

```posh
@echo off
@echo off
echo "Liangjun Zhu, zlj@lreis.ac.cn"
echo "-- Install Python Packages Using Pip..."
echo "-- WHL files downloaded from http://www.lfd.uci.edu/~gohlke/pythonlibs/"
pushd %~dp0
cd %~dp0
:: python path, x86 or x64 versioned python
set PYPATH=C:/python27x86/
set PIPPYTH=%PYPATH%Scripts/
:: COMMENT-1: Install easy_install and pip without network
::%PYPATH%python %~dp0\setuptools-18.2\setup.py install
::%PYPATH%python %~dp0\pip-7.1.2\setup.py install
:: COMMENT-2: Install easy_install and pip without network
::%PYPATH%python get-pip.py
for /f "delims=" %%i in ('dir /s/b "*.whl"') do ( 
echo installing %%~ni ...
%PIPPYTH%pip install %%i 
)
echo "-- All packages installed Succeed!"
pause
```

这样便会自动安装该文件夹下的packages...

**4. PyCharm**
=====
	
非常好用的Python IDE


**5. Common errors**
====

+ TO BE CONTINUE