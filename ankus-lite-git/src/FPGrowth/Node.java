package FPGrowth;

import java.util.ArrayList;

public class Node {
	public int id;
	
	public String item;
	public int support;
	
	public boolean isLeaf;
	public boolean isRoot;
	
	public ArrayList<Node> childNodes; 
	public int linkNodeId;
	public int parentNodeId;
	public int sideNodeId;
	
	public Node(){
		isLeaf = false;
		isRoot = false;
		
		childNodes = new ArrayList<Node>();
		support = 1;
	}
}
