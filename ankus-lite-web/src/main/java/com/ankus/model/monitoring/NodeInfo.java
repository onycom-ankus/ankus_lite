package com.ankus.model.monitoring;

import java.io.Serializable;
import java.util.ArrayList;

public class NodeInfo implements Serializable{
	public String name; 				// 노드명
	public String ip;					// 노드 ip
	public long capacity;				// 노드 용량(byte)
	public long used;					// 노드 사용량(byte)
	public int corecnt;				// 코어수
	public double cpuload;				// cpu 사용량(0.0~1.0, <0 일경우 - 미측정)
	public long totalmemory;			// 전체 메모리(byte)
	public long freememory;			// 남은 메모리(byte)
	public ArrayList<DiskInfo> disks;	// 디스크 정보
	
}
