---
layout: post
title: "Parallel Programming Environment of C++"
category: [C++]
tag: [C++, Parallel Computing, GDAL]
date: 2016-03-17 20:01:00
comments: true
---

# 1. Microsoft Visual Studio 2010 with Microsoft HPC 2012 MS-MPI
（[Download](https://www.microsoft.com/en-us/download/details.aspx?id=36045)）安装`vcredist_x64_2010`和`vcredist_x86_2010`（机器装了`VS2010`则无需安装这两项）、`mpi_x64`，如果是32位机器则装`mpi_x86`，在命令行输入 `mpiexec` 测试是否安装成功

# 2. GDAL
下载并安装`gdal-111-1600-x64-core.msi`
方法一：链接: http://pan.baidu.com/s/1c0saqQW 密码: ggbj
方法二：http://download.gisinternals.com/sdk/downloads/release-1600-x64-gdal-1-11-1-mapserver-6-4-1/gdal-111-1600-x64-core.msi
一路下一步就可以，安装路径在`C:\Program Files\GDAL`下，在环境变量里新建`GDAL_DATA`项，路径设置为`C:\Program Files\GDAL\gdal-data`

<!-- more -->
