package C45;

import java.io.Serializable;

public class Link implements Serializable{

	private int 	mid;	// 속성 값(기호 속성일 경우 속성 값 / 수치 속성일 경우 0: <= , 1: <)
	private String	mLinkName;
	private int 	mNodeID;
	
	public Link(int id, String linkName, int nodeID) {
		this.mid = id;
		this.mLinkName = linkName;
		this.mNodeID = nodeID;
	}
	
	public String getLinkName(){
		return this.mLinkName;
	}
	
	public int getNodeID(){
		return this.mNodeID;
	}
	
	/**
	 * 기호 속성일 경우: 속성 값
	 * 수치 속성일 경우: 0이면 <= , 1이면  <)
	 * @return 링크ID
	 */
	public int getLinkID(){
		return this.mid;
	}

}
