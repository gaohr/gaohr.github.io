---
title: An implementation for solution of transformation parameters of big rotation
  angle's 3D coordinate
comments: yes
date: "2013-07-26 17:00:00"
output: html_document
layout: post
tag:
- Matlab
- Math
category: Research
---

<script type="text/javascript" src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=default"></script>



Code Download
======

<i class="fa fa-download fa-2x" aria-hidden="true"></i>

1. [Matlab Code](http://zhulj-blog.oss-cn-beijing.aliyuncs.com/3d-coord-transform-matlab/TLS_CoorTrans.zip)
2. [Test data](http://zhulj-blog.oss-cn-beijing.aliyuncs.com/3d-coord-transform-matlab/test_data.zip)

适用于任意角度的三维坐标转换7参数解算方法
======

由空间三维坐标转换过程可得其转换模型：

$$\left[ \begin{array}{l}
{X_T}\\
{Y_T}\\
{Z_T}
\end{array} \right] = \left[ \begin{array}{l}
\Delta X\\
\Delta Y\\
\Delta Z
\end{array} \right] + kR\left[ \begin{array}{l}
{X_S}\\
{Y_S}\\
{Z_S}
\end{array} \right]   (1)$$

<!-- more -->

(1)式中\\(\left[ \begin{array}{l}
{X_T}&{Y_T}&{Z_T}
\end{array} \right]^T\\)为目标坐标系下的坐标,\\(\left[ \begin{array}{l}
{X_S}&{Y_S}&{Z_S}
\end{array} \right]^T\\)为原坐标系下的坐标,\\(\left[ {\begin{array}{1}
{\Delta X}&{\Delta Y}&{\Delta Z}
\end{array}} \right]^T\\)为平移因子,\\({k}\\)为尺度变化参数,\\({R}\\)为坐标旋转矩阵.
对于\\({R}\\),具体地,先绕\\({Z}\\)轴旋转\\(\theta \\),得到旋转矩阵\\({R_1}\\),再将坐标系绕新的\\({X}\\)轴旋转\\(\varphi \\)得到\\({R_2}\\),最后再绕新的\\({Y}\\)轴旋转\\(\psi \\)得到\\({R_3}\\),于是得到\\({R}\\)如(2)式[^ref1].

$$R = \left[ {\begin{array}{*{20}{c}}
{\cos \theta \cos \psi  - \sin \psi \sin \varphi \sin \theta }&{\sin \theta \cos \psi  + \sin \psi \sin \varphi \cos \theta }&{ - \sin \psi \cos \varphi }\\
{ - \cos \varphi \sin \theta }&{\cos \varphi \cos \theta }&{\sin \varphi }\\
{\sin \psi \cos \theta  + \cos \psi \sin \varphi \sin \theta }&{\sin \theta \sin \psi  - \cos \psi \sin \varphi \cos \theta }&{\cos \psi \cos \varphi }
\end{array}} \right]  (2)$$

将(1)式在7参数初始值\\(\Delta {X^0}\\)、\\(\Delta {Y^0}\\)、\\(\Delta {Z^0}\\)、\\({\theta ^0}\\)、\\({\varphi ^0}\\)、\\({\psi ^0}\\)、\\({k^0}\\)处按泰勒级数(函数\\(f(x)\\)在\\(x=x_0\\)处的泰勒公式如(3)式)展开,只保留一阶项,通过迭代计算控制舍入误差,如(4)式.


$$\left\{ \begin{array}{l}
f(x) = f({x_0}) + f'({x_0})(x - {x_0}) + \frac{f''({x_0})}{2!}{(x - {x_0})^2} + \cdots  +  \frac{f^{(n)}({x_0})}{n!}{(x - {x_0})^n}\\
{R_n}(x) = \frac{f^{(n + 1)}({x_0} + \theta x)}{(n + 1)!}{(x - {x_0})^{n + 1}},0 < \theta  < 1
\end{array} \right.   (3)$$

$$\left[ \begin{array}{l}
{X_T}\\
{Y_T}\\
{Z_T}
\end{array} \right] = \left[ \begin{array}{l}
\Delta {X^0}\\
\Delta {Y^0}\\
\Delta {Z^0}
\end{array} \right] + {k^0}{R^0}\left[ \begin{array}{l}
{X_S}\\
{Y_S}\\
{Z_S}
\end{array} \right] + \left[ \begin{array}{l}
d\Delta X\\
d\Delta Y\\
d\Delta Z
\end{array} \right] + {R^0}\left[ \begin{array}{l}
{X_S}\\
{Y_S}\\
{Z_S}
\end{array} \right]dk + {k^0}dR\left[ \begin{array}{l}
{X_S}\\
{Y_S}\\
{Z_S}
\end{array} \right]   (4)$$

对(4)式进行变换,可得：

$$A = R'x - l   (5)$$

其中,

$$A =\left[ \begin{array}{l}
{X_T}&{Y_T}&{Z_T}
\end{array} \right]^T$$

$${R'} = {\left[ \begin{array}{1}
\begin{array}{1}
1&0&0\\
0&1&0\\
0&0&1
\end{array}&{kM}&{R}\left[ \begin{array}{l}
{X_S}\\
{Y_S}\\
{Z_S}
\end{array} \right]
\end{array} \right]}$$


$$x = {\left[ {\begin{array}{*{20}{c}}
{d\Delta X}&{d\Delta Y}&{d\Delta Z}&{d\theta }&{d\varphi }&{d\psi }&{dk}
\end{array}} \right]^T}$$

$$l =  - \left[ \begin{array}{l}
\Delta {X^0}\\
\Delta {Y^0}\\
\Delta {Z^0}
\end{array} \right] - {k^0}{R^0}\left[ \begin{array}{l}
{X_S}\\
{Y_S}\\
{Z_S}
\end{array} \right]$$

$$M = \left[ {\begin{array}{*{20}{c}}
\begin{array}{l}
\cos \psi ({Y_s}\cos \theta  - {X_s}\sin \theta )\\
 - \sin \psi \sin \varphi ({X_s}\cos \theta  + {Y_s}\sin \theta )
\end{array}&\begin{array}{l}
\sin \psi \cos \varphi ({Y_s}\cos \theta  - {X_s}\sin \theta )\\
 + {Z_s}\sin \psi \sin \varphi 
\end{array}&\begin{array}{l}
 - \sin \psi ({X_s}\cos \theta  + {Y_s}\sin \theta )\\
 - \cos \psi \sin \varphi ({X_s}\sin \theta  - {Y_s}\cos \theta )\\
 - {Z_s}\cos \psi \cos \varphi 
\end{array}\\
{ - \cos \varphi ({X_s}\cos \theta  + {Y_s}\sin \theta )}&\begin{array}{l}
\sin \varphi ({X_s}\sin \theta  - {Y_s}\cos \theta )\\
 + {Z_s}\cos \varphi 
\end{array}&0\\
\begin{array}{l}
\sin \psi ({Y_s}\cos \theta  - {X_s}\sin \theta )\\
 + \cos \psi \sin \varphi ({X_s}\cos \theta  + {Y_s}\sin \theta )
\end{array}&\begin{array}{l}
\cos \psi \cos \varphi ({X_s}\sin \theta  - {Y_s}\cos \theta )\\
 - {Z_s}\cos \psi \sin \theta 
\end{array}&\begin{array}{l}
\cos \psi ({X_s}\cos \theta  + {Y_s}\sin \theta ) - {Z_s}\sin \psi \cos \varphi \\
 - \sin \psi \sin \varphi ({X_s}\sin \theta  - {Y_s}\cos \theta )
\end{array}
\end{array}} \right]  $$

由(5)式可得\\(x\\)估值((7)式)及误差方程((8)式):

$$x = {(R{'^T}R')^{ - 1}}(R{'^T}(A + l))  (7)$$
	
$$V = R'x - (l + A)	(8)$$

此时\\(x\\)为7参数的改正数,利用3个及以上个公共点坐标,通过最小二乘迭代计算即可解算参数的最优估值.

精度评定可用单位权中误差((9)式).

$$\sigma = \sqrt { \frac { {V^{T}}PV}{f} } (9)$$

其中,\\(p\\)为权重矩阵,\\(f\\)为自由度,此时\\(f=3n-7\\),\\(n\\)为公共点个数.

迭代计算过程为:

- 1) 给定7参数初值,如:\\({x_0} = [\begin{array}{*{20}{c}}
0&0&0&0&0&0&1\end{array}]^T\\);

- 2) 将初值代入(7)式计算得到\\({x_0}\\)的变化量\\(x\\),检查变化量是否小于给定限差(如平移参数小于1,旋转参数小于\\(4.8\*10^{-9}\\)(即0.001秒),\\(k\\)小于\\(1.0\*10^{-7}\\)),符合则结束计算,否则令\\({x_0}^{L + 1} = {x_0}^L + {x^{L + 1}}\\),其中\\(L\\)为迭代计算次数;

- 3)重复步骤1、2;

- 4)据(8)(9)式计算单位权中误差.


Reference
======
[^ref1]: 姚宜斌,黄承猛,李程春,等. 一种适用于大角度的三维坐标转换参数求解算法[J]. 武汉大学学报: 信息科学版. 2012,37(3):253-256.