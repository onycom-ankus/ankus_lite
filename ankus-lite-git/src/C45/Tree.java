package C45;

import java.io.Serializable;
import java.util.Hashtable;

public class Tree implements Serializable{
	
	private	Hashtable<Integer,Node> mTreeModel = null;
	
	/**
	 * 생성자
	 */
	public Tree(){
		this.mTreeModel = new Hashtable<Integer, Node>();
	}

	public void addNode(int nodeID, Node node) {
		this.mTreeModel.put(nodeID, node);
	}

	public Node getNode(int nodeID) {
		return this.mTreeModel.get(nodeID);
	}

	public int getNumNodes() {
		return this.mTreeModel.size();
	}
	
}
