---
layout: post
title: "Automatically write Calibrated parameters by SWAT-CUP (model.in) back to SWAT Access database (.mdb)"
category: [SWAT]
tag: [SWAT, Python]
date: 2016-03-27 15:00:00
comments: true
---

* TOC
{:toc}


# 1 Requirement analysis

[ArcSWAT](http://swat.tamu.edu/software/arcswat/ "ArcSWAT") and [QSWAT](http://swat.tamu.edu/software/qswat/ "QSWAT") is the most two popular user interface for SWAT model users. [SWAT-CUP](http://swat.tamu.edu/software/swat-cup/ "SWAT-CUP") has been widespreadly used to calibrate SWAT model which coupled SUFI2, PSO, GLUE, ParaSol, and MCMC procedures.

Most users like to work with user-friendly interfaces (i.e., ArcSWAT and QSWAT, with [SWATEditor](http://swat.tamu.edu/software/arcswat/swateditor/ "SWATEditor") inside) other than original SWAT input and output files (i.e., the **TxtInOut** folder). Because the latter has a large number of files and is not easy to handle.

So, when the calibration is done by SWAT-CUP, users have a desire to write the calibrated parameters back to SWAT database (i.e., `<project name>.mdb`), such as subjects in Google group, [Copy Calibrated parameters back to Arc SWAT model?](https://groups.google.com/forum/#!topic/swat-cup/ouqJUPbeqUw "subject-1") and [Write back the parameters in arc swat?](https://groups.google.com/forum/#!topic/swat-cup/SRyTyrM6C0A "subject-2")

Usually, we have two methods to accomplish this requirement.

<!-- more -->

## **1.1 Manual calibration in SWATEditor**

After the basis SWAT model is built, users may manual calibrate their model by modifying parameters using Manual Calibration Helper in SWATEditor (such as Fig.1 and Fig.2).

![Fig.1-manual-calibration-helper](http://zhulj-blog.oss-cn-beijing.aliyuncs.com/swatcup-2-swat-database%2F1-manual-calibration-helper.jpg)

**Fig.1 Manual calibration Helper in SWATEditor**

![Fig.2-manual-calibration-helper2](http://zhulj-blog.oss-cn-beijing.aliyuncs.com/swatcup-2-swat-database%2F2-manual-calibration-helper2.jpg)

**Fig.2 Parameter selection and modification GUI in SWATEditor**

Besides the easy to learn and convenient, however, there are some drawbacks of this method:

+ parameters are selected and may not sufficient for your model, e.g., `OV_N.hru` is not listed.
+ parameters of specific soil layer is not capable to modified, e.g., `Sol_K` means `Sol_K` of all soil layers will be updated.
+ the modified value may excess the absolutely value range which is defined in `Absolute_SWAT_Values.txt`. This is the probably reason that why the output of SWAT-CUP is different from the ArcSWAT or QSWAT after manually update the calibrated parameters.
+ manually operation is **tedious** and **error-prone**.

## **1.2 Manually update the Access database**

In order to overcome some of the drawbacks in the former method, users can use some simple SQL sentences to update the SWAT database manually.

The usual steps is as follows:

+ Open `<project name>.mdb` with Access
+ Built a new query layout (see Fig.3 in details) (the Access used is Chinese version, please find the corresponding buttons in your computer)
+ Type the SQL sentences and press run to update the table (see Fig.4).

<img src="http://zhulj-blog.oss-cn-beijing.aliyuncs.com/swatcup-2-swat-database%2F3-manual-update-access-database.jpg" width="800">
**Fig.3 Build a new query layout in Access**

<img src="http://zhulj-blog.oss-cn-beijing.aliyuncs.com/swatcup-2-swat-database%2F4-type-sql-sentences-and-run.jpg" width="800">
**Fig.4 Tyep SQL sentences and run update**

Obviously, some advantage can be highlighted, such as:

+ all parameters in SWAT can be customized.
+ complex conditions can be implemented by using `where` keyword.
+ a series of sentences can be run at a time for a single table, such as `hru`, `sol`, etc.

By contrast, some drawbacks are also exposed:

+ users should be familiar with the basic SQL grammar.
+ this method is more error-prone and all operation should be careful!

## **1.3 Can it be automated?**

After reviewing the common used methods above, the essential tips used to write the calibrated parameters back to SWAT database can be drawn as follows:

+ the calibrated parameters is concluded in a single file named `model.in`
+ each item in `model.in` has the same scheme, `x__<parname>.<ext>__<hydrogrp>__<soltext>__<landuse>__<subbsn>__<slope>` and can be convert as SQL update sentence
+ each parameter has a absolutely value range that defined in `Absolute_SWAT_Values.txt`

Therefore, if we,

+ read `model.in` and analysis each calibrated parameter item
+ construct the corresponding SQL update sentence
+ connect to Access database and run these SQL sentences

it will be automated!

# 2 Implementation

## **2.1 Overview**

This automatic program is written in `python` and requires `pyodbc` package.

## **2.2 Functions**

### 2.2.1 paraIdentifier class

Followed the "Parameterization in SWAT-CUP" in `SWAT-CUP manual.pdf`, I designed a class to manage the calibrated parameter scheme.

***BE CAUTION:***
Currently, only fundamental function is implemented, **Specification of Management Parameters**, **Specification of Crop Parameters**, **Specification of Pesticide Parameters**, and **Specification of Precipitation and Temperature Parameters** are not considered!

If your SWAT model need to update `fert.dat`, `pest.dat`, `plant.dat`, `septwq.dat`, `til.dat`, and `urban.dat`, it is highly recommended that copy these modified files in SWAT-CUP to your `TxtInOut` folder directly!

```python
class paraIdentifier:
    ### the parameter identifier format proposed by SWAT-CUP
    ### x__<parname>.<ext>__<hydrogrp>__<soltext>__<landuse>__<subbsn>__<slope>
    def __init__(self):
        self.name      = ''    ### SWAT parameter name as it appears in the Absolute_SWAT_Values.txt
        self.ext       = ''    ### SWAT file extention code or table name in SWAT database, e.g., sol, hru, rte, etc.
        self.hydrogrp  = []    ### (Optional) soil hydrological group ('A', 'B', 'C', or 'D')
        self.soltext   = []    ### (Optional) soil texture
        self.landuse   = []    ### (Optional) landuse
        self.subbsn    = []    ### (Optional) subbasin number(s)
        self.slope     = []    ### (Optional) slope, e.g., '0-20'
        self.indent    = ''    ### identifier code, v means replaced, a means added, r means multiplied.
        self.value     = 9999  ###
        self.lyr       = []    ### (Optional) soil layer number(s), e.g., 1,2,4-6 means 1,2,4,5,6
```

### 2.2.2 Workflow functions

Corresponding to the essential tips in section 1.3, I designed four function:

+ ReadModelIn() -> read `model.in`
+ ReadAbsoluteVal() -> read `Absolute_SWAT_Values.txt`
+ ConstructSQLs() -> Construct SQL update sentences
+ UpdateSWATDatabase() -> Run SQLs

## **2.3 Download and Execution**

<i class="fa fa-download fa-2x" aria-hidden="true"></i>The script can be forked and downloaded at [Github-crazyzlj-python](https://github.com/crazyzlj/Python/blob/master/SWAT_post_process/Update_SWAT_mdb_from_SWAT_CUP.py).

To run the script, you should have:

+ python 2.X (x86 version)
+ pyodbc ([whl](http://www.lfd.uci.edu/~gohlke/pythonlibs/#pyodbc "pyodbc-whl-file"))

***Usage:***

+ Get `model.in` from SWAT-CUP or manually create it. Here is an example:

```c
// .bsn
v__SPCON.bsn	0.003
// .chm
v__SOL_NO3(1).chm	27
// .gw
v__ALPHA_BF.gw	0.95
// .hru
r__OV_N.hru	-0.40
r__SLSUBBSN.hru__________40.0-9999	0.60
// .mgt1
r__BIOMIX.mgt	-0.13
// .pnd
r__PND_VOL.pnd	-0.15
// .rte
v__CH_ERODMO().rte	0.1
// .sol
r__SOL_K(1).sol	0.95
// .swq
r__RS4.swq	0.08
// .wwq
r__AI1.wwq	0.06
```

+ put `Update_SWAT_mdb_from_SWAT_CUP.py`,  `Absolute_SWAT_Values.txt`, and `model.in` into the folder of SWAT, i.e., the same folder with  `<project name>.mdb` (such as Fig. 5)

![files-list](http://zhulj-blog.oss-cn-beijing.aliyuncs.com/swatcup-2-swat-database%2F5-files-list.jpg)

**Fig.5 Files list**

+ open `Update_SWAT_mdb_from_SWAT_CUP.py` and assign your project name to `SWAT_PROJ_NAME` in line 277, such as
 
```python
SWAT_PROJ_NAME = 'zts2'
```

+ Run the python script. Fig.6 is the example output of one updated parameters. There are three SQLs to finish the update, one for relative or replace change, and the other two for absolutely range examination.
![Fig.6-output](http://zhulj-blog.oss-cn-beijing.aliyuncs.com/swatcup-2-swat-database%2F6-execution-windows.jpg)

**Fig.6 Example output of one updated parameter**

# 3 Conclusion

Currently, I just accomplished the basic function of writing calibrated parameters from SWAT-CUP back to SWAT database. Obviously, this first beta version is  incomplete and imperfect. 

**Any advises or bugs will be greatly welcome!**


> 版权声明：本文为博主原创文章，未经博主允许不得转载。如需转载，请联系[zlj@lreis.ac.cn](zlj@lreis.ac.cn)，或在博文下留言，谢谢！
> 
> All rights reserved: It's not allowed to use this post in any form include reproduce and modify without the origional author's permission. If any need, please contact [zlj@lreis.ac.cn](zlj@lreis.ac.cn). Thank you!



