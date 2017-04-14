# -*- coding: utf-8 -*-
## Calculate TVDI

import os
import math
from osgeo import gdal
import numpy
from util import *
from main import *

## 计算TVDI
def tvdi(dataDir, ndviMin, ndviMax):
    abcd = edge(ndviMin, ndviMax)
    a = abcd[0][0]
    b = abcd[0][1]
    c = abcd[1][0]
    d = abcd[1][1]
    print "干边拟合：y = %.3fx + %.3f，r2 = %.3f" % (a, b, abcd[0][2] * abcd[0][2])
    print "湿边拟合：y = %.3fx + %.3f，r2 = %.3f" % (c, d, abcd[1][2] * abcd[1][2])
    TVDI = numpy.zeros((nRows, nCols))
    for m in range(nRows):
        for n in range (nCols):
            TVDI[m][n] = ((abcd[0][0] * NDVI[m][n] + abcd[0][1]) - LST[m][n]) / ((abcd[0][0] * NDVI[m][n] + abcd[0][1]) - (abcd[1][0] * NDVI[m][n] + abcd[1][1]))
            if(TVDI[m][n] > 9999 or TVDI[m][n] < -9999):
                TVDI[m][n] = 0.
    outputPath = dataDir + os.sep + outputfile
    WriteGTiffFile(outputPath, nRows, nCols, TVDI, geotrans, srs, -999, gdal.GDT_Float32)
    print "Calculate TVDI finished!\nSave as '%s'\n" % outputPath

## 计算干边和湿边
def edge(ndviMin, ndviMax):
    print "nRows = %d, nCols = %d" % (nRows, nCols)
    edgeArr = [[] for i in range(99)]
    for i in range(nRows):
        for j in range (nCols):
            if(NDVI[i][j] > 0 and NDVI[i][j] < 1):
                k = str(NDVI[i][j])[2:4]
                if(LST[i][j] > -9999 and LST[i][j] < 9999):
                    edgeArr[int(k)].append(LST[i][j])
        
    ## 排序，寻找干边湿边
    eMax = []
    ndviSort = []
    eMin = []
    for n in range(len(edgeArr)):
        edgeArr[n] = numpy.sort(edgeArr[n])
        if(len(edgeArr[n]) > 1):
            eMax.append(edgeArr[n][len(edgeArr[n]) - 1])
            eMin.append(edgeArr[n][0])
            ndviSort.append(float(n) / 100.)
            print "%s, %s, %s" % (eMax[n], eMin[n], ndviSort[n])
    nMax = int(ndviMax * 100)
    nMin = int(ndviMin * 100)
    if(nMax > len(ndviSort)):
        nMax = len(ndviSort) - 1
    fiteMax = eMax[nMin:nMax]
    fiteMin = eMin[nMin:nMax]
    fitndviSort = ndviSort[nMin:nMax]
    fitMax = linefit(fitndviSort, fiteMax)
    fitMin = linefit(fitndviSort, fiteMin)
    return [fitMax, fitMin]

## 线性拟合，返回系数，截距和相关系数值
def linefit(x , y):
    N = float(len(x))
    sx, sy, sxx, syy, sxy = 0, 0, 0, 0, 0
    for i in range(0,int(N)):
        sx += x[i]
        sy += y[i]
        sxx += x[i] * x[i]
        syy += y[i] * y[i]
        sxy += x[i] * y[i]
    a = (sy * sx / N - sxy) / ( sx * sx / N - sxx)
    b = (sy - a*sx)/N
    r = abs(sy * sx / N - sxy) / math.sqrt((sxx - sx * sx / N) * (syy - sy * sy / N))
    return [a, b, r]



if __name__ == "__main__":
    ## 定义文件路径
    dataDir = r'#文件夹路径#'

    ## 输入文件
    NDVIfile = r'NDVI.tif'
    LSTfile = r'LST.tif'

    ## 设置有效NDVI
    ndviMax = 0.8
    ndviMin = 0.2

    ## 输出文件
    outputfile = 'TVDI.tif'

    ## 读取栅格数据
    NDVIpath = dataDir + os.sep + NDVIfile
    NDVI = ReadRaster(NDVIpath).data
    LSTpath = dataDir + os.sep + LSTfile
    LST = ReadRaster(LSTpath).data
    nCols = ReadRaster(NDVIpath).nCols
    nRows = ReadRaster(NDVIpath).nRows
    geotrans = ReadRaster(NDVIpath).geotrans
    srs = ReadRaster(NDVIpath).srs
	
    ## 计算TVDI
    tvdi(dataDir, ndviMin, ndviMax)
    print "Finished!"

