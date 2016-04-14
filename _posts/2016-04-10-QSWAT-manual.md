---
layout: post
title: "Building SWAT model of a humid watershed in China using QSWAT"
category: [SWAT]
tag: [SWAT, manual]
date: 2016-04-11 20:00:00
comments: true
---

* TOC
{:toc}

# 利用QSWAT进行SWAT建模————以中国南方湿润区小流域为例
--------------

# 1 写在前面

由于ArcGIS的广泛使用，ArcSWAT顺理成章成为SWAT建模者的首选，但相信很多人和我一样，使用ArcSWAT（尤其指适配ArcGIS 10.x版本的）时，经常遇到莫名其妙的COM组件错误（如图1），无从查错，只能一遍遍重来……重来……重来……

![Fig1ArcSWAT-common-error](http://zhulj-blog.oss-cn-beijing.aliyuncs.com/QSWAT-manual%2F1-ArcSWAT-common-error.jpg)

**图1. ArcSWAT常见错误提示，无从下手**

随着开源GIS软件的蓬勃发展，GRASS、QGIS等优秀软件日臻完善，基于这些软件的第三方插件亦愈加丰富。QSWAT就是这样一款足以替代ArcGIS进行SWAT参数准备及模型构建的用户界面插件。

本文将从数据准备到软件操作，再到模型运行介绍利用QSWAT进行SWAT建模的过程，希望能够起到SWAT零基础入门的效果。

<!-- more -->

P.S.1 写这篇博客时，我也是第一次真正构建、运行、率定SWAT模型，遇到了很多问题，感谢Google SWAT/SWAT-CUP Group以及其他网上博客的帮助。

P.S.2 官方使用手册永远是最好的资料，在进行QSWAT学习过程中，详细翻阅了多个手册，包括：ArcSWAT2012 User Guide **[1]**, SWAT 2012 Input/Output Documentation **[2]**, SWAT Theory 2009 **[3]**, SWAT Editor 2012 **[4]**, QSWAT manual **[5]**, SWAT-CUP manual **[6]**等。

```
[1] Winchell, M., Srinivasan, R., Diluzio, J., Arnold, J.G., 2013. ArcSWAT Interface for SWAT 2012, User's Guide.
[2] Arnold, J.G., Kiniry, J.R., Srinivasan, R., Williams, J.R., Haney, E.B., Neitsch, S.L., 2013. SWAT 2012 Input/Output Documentation. Texas Water Resources Institute.
[3] Neitsch, S.L., Arnold, J.G., Kiniry, J.R., Williams, J.R., 2011. Soil and Water Assessment Tool Theoretical Documentation, Version 2009. Texas A&M University System, College Station, Texas, USA.
[4] Winchell, M.,Srinivasan, 2012. SWAT Editor for SWAT 2012 Documentation. Texas Water Resources Institute.
[5] Dile, Y.H., Srinivasan, R., George C., 2016. QGIS Interface for SWAT (QSWAT).
[6] Abbaspour, K.C., 2015. SWAT-CUP: SWAT calibration and uncertainty programs - A User Manual. Eawag.
```

# 2 QSWAT安装

按照QSWAT官网的安装教程，按照如下顺序依次安装即可：

```
1. QGIS-OSGeo4W-2.6.1-1-Setup-x86.exe
2. SwatEditorInstall.msi
3. QSWATinstall1.3.exe
```

完成之后，打开QGIS，依次，即可在菜单栏看到QSWAT图标。

> Plugins -> Manage and Install Plugins -> Installed -> QSWAT

## 2.1 MPI配置

QSWAT中利用[TauDEM](http://hydrology.usu.edu/taudem/taudem5/)进行地形参数提取（填洼、流向、汇流、河网提取、流域划分等），TauDEM的运行需要MPI并行环境。

推荐安装微软的MPI实现： [Microsoft HPC 2012 MS-MPI](https://www.microsoft.com/en-us/download/details.aspx?id=36045)，默认安装路径为`C:\Program Files\Microsoft HPC Pack 2012`。

> QSWAT -> QSWAT Parameters

进行MPI路径设置，如图2。

![fig2.MSMPI-Path](http://zhulj-blog.oss-cn-beijing.aliyuncs.com/QSWAT-manual%2F2-msmpi-path-config.jpg)

**图2. QSWAT中MPI路径设置**

此时，如果运行QSWAT调用TauDEM，会出现下列错误提示：

```
------------------- TauDEM command: -------------------
C:/Program Files/Microsoft HPC Pack 2012/Bin\mpiexec.exe -n 8 C:\SWAT\SWATEditor\TauDEM5Bin\PitRemove -z G:\data_m\qswatTutorial\zts\Source\dem_zts_burned.tif -fel G:\data_m\qswatTutorial\zts\Source\dem_ztsfel.tif
Fatal protocol error: check version between Mpiexec.exe, Msmpi.dll, and Smpd.exe.
*** Problem with TauDEM PitRemove: please examine output above. ***
```

+ **问题原因**： QSWAT调用的是SWATEditor 2012安装时自动安装的TauDEM，而TauDEM的运行需要MPI并行环境支持，由于我们安装的版本是`MS HPC Pack 2012`，与SWATEditor自带的`msmpi.dll`不匹配，导致出错。

+ **解决办法**：将`C:\SWAT\SWATEditor\TauDEM5Bin\msmpi.dll`删掉即可！

# 3 数据预处理

SWAT建模最重要的也是最基础的便是数据预处理，作为一个综合的、长时段连续模拟、具有一定物理机理的半分布式流域过程模型，SWAT可以进行水文、侵蚀、污染物、植被生长等模拟，相应地，需要准备相关地形、土地利用、土壤理化属性、农田管理措施（如耕作模式）等数据，在此基础上，按照SWAT模型的要求进行格式整理，这便是**SWAT建模数据预处理**。

## 3.1 空间数据准备

### 3.1.1 DEM
数字高程模型（DEM）自然不必多说，万里长征第一步，就是准备好比流域范围稍大的适当分辨率DEM。

### 3.1.2 土地利用
土地利用图，来源多种多样，可以遥感目视解译，也可地形图数字化，但是重要的一步是按照SWAT内置数据库对土地利用进行重新编码。SWAT内置数据库（`QSWATRef2012.mdb`，可在安装目录找到，也可在新建工程目录下找到）中有3张表可作为`Landuse`编码参考，分别是`CDL_lu`、`nlcd_lu`、`nlcd2001_lu`。需要准备：

+ 1.栅格或矢量土地利用图（编码可随意，也可按照上述3张表中编码）

+ 2.土地利用查找表(.csv)，内容类似：

```
Value,Landuse
1,AGRL
18,WATR
104,URLD
6,FRST
```

### 3.1.3 土壤

与土地利用数据准备类似，土壤数据也需进行重编码和准备查找表。值得一提的是，SWAT内置了美国土壤数据库，并不符合中国土壤情况，因此，我们需要自建土壤数据库。

+ 1.从`QSWATRef2012.
+ 
+ 
+ 
+ `中将`usersol`表导出为`usersol.xlsx`；

+ 2.编辑`usersol.xlsx`：将研究区土壤类型（如`Heishatu`、`Xiaofenshatu`等）追加至表中；

+ 3.补充土壤类型对应的理化性质，参数可查地方土壤志，也可采样获得，不再赘述；

+ 4.将编辑好的`usersol.xlsx`导入`QSWATRef2012.mdb`中，并覆盖原表(如下图)，否则在`4.2 HRU划分`中会出现找不到土壤类型定义的错误（如图3）。

![](http://zhulj-blog.oss-cn-beijing.aliyuncs.com/QSWAT-manual%2F4.1-import-soil-database.jpg)

具体操作步骤为，一定注意，**不要主键！**<i class="fa fa-exclamation-triangle fa-2x"></i>

> Access -> 外部数据 -> Excel -> 将数据导入当前数据库的新表中 -> 连着3个下一步 -> 不要主键 -> usersol -> 确定

![fig3-soil-undefined](http://zhulj-blog.oss-cn-beijing.aliyuncs.com/QSWAT-manual%2F4.0-soil-undefined.jpg)

**图3. 土壤类型未定义错误提示**

+ 5.土壤数据查找表(.csv)，内容类似：

```
Value,Name
1,Heishatu
2,Xiaofenshatu
3,Huangshatu
```

### 3.1.5 坑塘 (Optional)
坑塘或水库模拟可根据研究区实际情况取舍。坑塘数据的准备最好是在**子流域划分**之后进行，因为坑塘在SWAT是集总式表达，并没有空间位置，而是每个子流域一套参数。放在这里因为同属通过数据预处理获得模型参数。

要获取的坑塘物理参数主要有`PND_FR`、`PND_PSA`、`PND_PVOL`、`PND_ESA`、`PND_EVOL`、`PND_VOL`，通过GIS分析我们可以得到`PND_FR`，进而其余面积、容积参数可求。

下面主要介绍如何计算`PND_FR`。

<i class="fa fa-download fa-2x" aria-hidden="true"></i>所用python脚本托管在[Github](https://github.com/crazyzlj/Python/blob/master/Util/pond_preprocess.py "python-pond_preprocess-by-ZhuLJ")上。

> PND_FR: Fraction of subbasin area that drains into ponds. 

<i class="fa fa-exclamation-triangle fa-2x"></i>读者可以在`4.1 模型参数编辑`之后回到这里进行坑塘数据提取！

+ 1.从土地利用中提取坑塘，并转换为与DEM分辨率、空间范围（Extent）均一致的栅格，如图4(a)；

+ 2.为避免影响后续upstream area的计算，从pond中剔除stream栅格，如图4(b)；

+ 3.调用TauDEM工具[DinfUpDependence](http://hydrology.usu.edu/taudem/taudem5/help53/DInfinityUpslopeDependence.html "DinfUpDependence")计算pond的upstream area，得到的栅格值域为[0,1]；

+ 4.设置阈值（如0.9），大于该阈值的栅格认为是能够汇入坑塘的；

+ 5.利用子流域范围划分上述栅格并计算面积，与子流域面积之比，即为`PND_FR`，如图4(c)。

<img src="http://zhulj-blog.oss-cn-beijing.aliyuncs.com/QSWAT-manual%2F12-pond-fr-preprocess.jpg" width="800">
**图4. 坑塘物理数据预处理**


## 3.2 气象数据准备
降水是地表水过程的主要水来源，对模型构建起到至关重要的作用。

气象数据的准备包括逐日降水、逐日最高/最低气温，当然如果资料丰富，也可准备逐日相对湿度、太阳辐射等数据；以及气象站点逐月数据（温度、相对湿度、太阳辐射等等）。

具体数据格式，在相关参考文献中都有详解，这里不再赘述。

我准备的数据包括：

```
pcpfork.txt 	降水站点信息（站名、经纬度、高程等）
pcp_LYQ.txt 	降水站降水数据（该文件名应在pcpfork.txt中有定义）
tempfork.txt	温度站点信息
temp_LYQ.txt	温度站温度数据
WGEN_LYQ.xlsx	气象站逐月数据（Excel中应包含WGEN_user数据表）
```


## 3.3 管理措施准备
管理措施数据直接影响对非点源污染的模拟。

因此，需要结合研究区实际情况，进行管理措施数据的整理：

+ 1.从`QSWATRef2012.mdb`中将`OpSchedules`表导出为`OpSchedules.xlsx`;

+ 2.编辑`OpSchedules.xlsx`：新增一种管理模式，如南方水旱轮作`AGRL_zts`,可以按照绝对日期设置耕地、施肥、播种、灌溉、收获，但是一般推荐使用积温进行设置，即`Heat unit scheduling`, 值得注意的是：

<i class="fa fa-exclamation-triangle fa-2x"></i> 当HRU没有任何作物生长时，积温比例为全年的，而当播种操作完整之后，一直到作物收获，积温比例为该作物生长期内的积温与作物生长所需总积温之比！

+ 3.编辑完成之后，导入`QSWATRef2012.mdb`，并覆盖原表，待用。

## 3.4 观测资料整理（径流、泥沙、污染物等）

观测资料的整理需要做的就是与降水逐日对比，发现并剔除异常值：因为，降水和径流、泥沙的趋势是大致一致的。

# 4 利用QSWAT建模
准备好所有数据之后，便可以运行QSWAT建模了。点击新建工程，指定保存路径后，开始向导式建模（图5）。

![fig5-new-project](http://zhulj-blog.oss-cn-beijing.aliyuncs.com/QSWAT-manual%2F3-new-project.jpg)

**图5. 新建QSWAT工程**

## 4.1 子流域划分

具体步骤如图6所示，不再文字赘述！

![watershed-delineation](http://zhulj-blog.oss-cn-beijing.aliyuncs.com/QSWAT-manual%2F4-delineation-watershed.jpg)

**图6. 子流域划分步骤**

## 4.2 HRUs划分

具体步骤如图7所示，不再文字赘述！

![hru-delineation](http://zhulj-blog.oss-cn-beijing.aliyuncs.com/QSWAT-manual%2F5-create-hrus2.jpg)

**图7. HRU划分步骤**

## 4.3 模型参数编辑
通过以上2个步骤，QSWAT为SWAT的运行准备好了基本的空间参数，接下来，对SWAT数据库进行编辑，交给SWATEditor啦（`Step 3 Edit Input and Run SWAT`）。

点击Setp3之后，打开SWAT Editor软件界面，首先点击“Connect to Database”建立与Access数据库的连接.

### 4.3.1 气象数据导入
> Write Input Tables -> Weather Stations

按照`3.2 气象数据`准备情况，依次设置`Weather Generator Data`、`Rainfall Data`、`Temperature Data`，如图8。

![climate-database](http://zhulj-blog.oss-cn-beijing.aliyuncs.com/QSWAT-manual%2F6-edit-database-climate.jpg)

**图8. 气象数据导入**

随后:

> Write Input Tables -> Write SWAT Input Tables, Select All -> Create Tables

这样便将之前所有的数据预处理操作写入了SWAT数据库，即`<project name>.mdb`，如`zts.mdb`。

### 4.3.2 坑塘数据(optional)

如果进行了`3.1.5 Pond (Optional)`步骤，则在这里应该将坑塘数据更新：
两种方式：

+ 1.直接使用SWAT Editor逐个子流域进行编辑

> Edit SWAT Input -> Subbasin Data -> Pond (.pnd) -> Select subbasin ID -> OK -> Edit Values -> Save Edits -> Exit

+ 2.另一种方法与`3.1.3 Soil`中的操作类似，即从`<project name>.mdb`中导出`pnd`表至`pnd.xlsx`,编辑之后，重新导入数据库并覆盖原表。

### 4.3.3 管理措施数据
管理措施数据由于需要对不同种类的HRU设置，数据库中生成对应HRU数量的记录，不便于自动操作，因此，采用手工设置的方法。

+ 1.打开管理措施设置界面

> Edit SWAT Input -> Subbasin Data -> Management (.mgt)

![edit-management](http://zhulj-blog.oss-cn-beijing.aliyuncs.com/QSWAT-manual%2F6-edit-database-Management.jpg)

**图9. 打开管理数据边界界面**

+ 2.选取某一类HRU，比如这里我选择了所有土地利用为`AGRL`的HRU，打开设置窗口之后，按照图9所示的步骤依次操作，即可完成该类HRU管理措施的配置。

<img src="http://zhulj-blog.oss-cn-beijing.aliyuncs.com/QSWAT-manual%2F6-edit-database-Management4.jpg" width="800">

**图10. 设置管理数据**

## 4.4 设置及运行模型

到此为止，我们已经基本完成了模型构建的工作，下面开始首次运行模型。

+ 1.从SWAT数据库中读取并写入所有运行所需文件（即`TxtInOut`文件夹）

> Edit SWAT Input -> Re-Write SWAT Input Files

如图11所示，这样，SWAT Editor便将SWAT运行所需的所有文件从`<project name>.mdb`数据库导出至`<project path>\Scenarios\Default\TxtInOut`中。

![rewrite-swat-files](http://zhulj-blog.oss-cn-beijing.aliyuncs.com/QSWAT-manual%2F7-rewrite-swat-input-files.jpg)

**图11. 写入SWAT运行所需所有文件**

<i class="fa fa-key fa-2x"  aria-hidden="true"></i> SWAT的运行的全部所需数据全在该文件夹下！

+ 2.运行模型

> SWAT Simulation -> Run SWAT

图12所示为SWAT运行前设置界面，设置模拟起止日期、SWAT版本、输出选项（Daily）等之后，点击`Setup SWAT Run` -> `Run SWAT`之后，便可看到图13所示的运行窗口。

![run-swat](http://zhulj-blog.oss-cn-beijing.aliyuncs.com/QSWAT-manual%2F8-prepare-and-run-swat.jpg)

**图12. 设置并运行SWAT**

![swat-running](http://zhulj-blog.oss-cn-beijing.aliyuncs.com/QSWAT-manual%2F9-wait-swat-running.jpg)

**图13. SWAT运行窗口**

## 4.5 模型结果可视化

模型运行结束之后，需要查看径流、泥沙等模拟与实测值的差异，以便分析原因，进行参数调整。

+ 1.将河道结果（.rch）写入输出数据库，便于读取、分析

> SWAT Simulation -> Read SWAT Output

结果数据库文件为`<project path>\Scenarios\Default\TablesOut\SWATOutput.mdb`

+ 2.在QSWAT界面打开`Setp 4 Visualise`，参照图14进行设置，即可得到图15所示的流域出口实测与模拟径流结果。
 
通过图14的流量过程线，最直观的分析结论为：

+ **洪峰流量过大**

+ **基流过高**

而此时模型默认的参数下Nash系数为0.15，需要针对产流、地下水、蒸散发等过程参数进行调参，将另行文介绍。

![save-plot](http://zhulj-blog.oss-cn-beijing.aliyuncs.com/QSWAT-manual%2F10-save-plot.jpg)

**图14. SWAT输出可视化窗口设置**

<img src="http://zhulj-blog.oss-cn-beijing.aliyuncs.com/QSWAT-manual%2F11-flow-plot-Analysis.jpg" width="800">

**图15. 实测与径流模拟结果**

# 5 常见错误

## 5.1 Python相关
+ Python访问受限，解决方案：以管理员方式运行QGIS即可

![permission-denied](http://zhulj-blog.oss-cn-beijing.aliyuncs.com/QSWAT-manual%2Ferror-permission-denied.jpg)

**图16. Python访问受限错误**

# 6 总结
流域是多过程复杂交互的系统，流域模型是对其进行简化的物理、数学表达，对流域基础空间数据、管理数据等尽可能准确的认识，是得到较好模拟结果的前提和保证。

本文从中国南方湿润区小流域的实际情况出发，比通常步骤多加了坑塘数据的设置，使得完全默认参数下的径流模拟已趋于合理。

接下来，通过简单几个手工调参，便可达到较好结果，随后，利用SWAT-CUP进行自动调参，得到更优参数。


> 版权声明：本文为博主原创文章，未经博主允许不得转载。如需转载，请联系[zlj@lreis.ac.cn](zlj@lreis.ac.cn)，或在博文下留言，谢谢！
>
> All rights reserved: It's not allowed to use this post in any form include reproduce and modify without the origional author's permission. If any need, please contact [zlj@lreis.ac.cn](zlj@lreis.ac.cn). Thank you!