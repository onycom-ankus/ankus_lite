package com.ankus.model.monitoring;

import java.io.Serializable;
import java.util.ArrayList;

public class HadoopInfo implements Serializable{
	// hadoop info
	public String version; 				// 하둡버젼
	public int livenode; 				// live노드수
	public int deadnode; 				// dead노드수
	public int replication; 			// 복제수
	public long blocksize; 			// 블럭크기(byte)
	public long capacity; 				// 하둡용량(byte)
	public long used; 					// 하둡사용량(byte)

	// masternode
	public int corecnt; 				// 코어갯수
	public double cpuload; 			// cpu 사용량(0.0~1.0, <0 일경우 - 미측정)
	public long totalmemory; 			// 전체 메모리(byte)
	public long freememory; 			// 남은 메모리(byte)
	public ArrayList<DiskInfo> disks;	// 디스크 정보

	// datanodes
	public ArrayList<NodeInfo> nodes; 	// 노드정보
	
}
