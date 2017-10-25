package com.ankus.model.monitoring;

import java.io.Serializable;
import java.util.ArrayList;

public class HealthInfo implements Serializable{
	// local info => ex)웹서버...
	public int corecnt; 					// 코어갯수
	public double cpuload; 				// cpu 사용량(0.0~1.0, <0 일경우 - 미측정)
	public long totalmemory; 				// 전체 메모리(byte)
	public long freememory; 				// 남은 메모리(byte)
	public ArrayList<DiskInfo> disks; 		// 디스크 정보

	public HadoopInfo hadoopclusterinfo; 	// 하둡정보
	
}
