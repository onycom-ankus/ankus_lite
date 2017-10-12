package com.ankus.model.monitoring;

import java.io.Serializable;

public class DiskInfo implements Serializable{
	public String path; // 마운트 경로
	public long size;	// 디스크용량 (byte)
	public long free;	// 디스크남은용량(byte)
	
}
