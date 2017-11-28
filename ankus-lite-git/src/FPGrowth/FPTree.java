package FPGrowth;

import java.util.ArrayList;
import java.util.HashMap;

public class FPTree {
	public int treeSize;
	private Node rootNode;
	private HashMap<Integer, Node> NodeTable;
	private ArrayList<FPHeaderTable> headerTable;
	private int minSup;
	
	public FPTree(int minSup){
		rootNode = new Node();
		rootNode.id = 0;
		rootNode.isRoot = true;
		
		NodeTable = new HashMap<Integer, Node>();
		NodeTable.put(rootNode.id, rootNode);
		
		treeSize = 0;
		
		this.minSup = minSup;
	}
	
	public void setHeaderTable(ArrayList<FPHeaderTable> mHeaderTable){
		this.headerTable = mHeaderTable;
	}
	
	public void addTransaction(Transaction tran){
		int size = tran.transaction.size();
		
		Node parent = rootNode;
		for( int i = 0; i < size; i++){
			parent = addNode(parent, tran.transaction.get(i));
		}
//		System.out.println("added Transaction...");
	}
	
	public Node addNode(Node parent, String item){
		Node present = null;
		
//		System.out.println(parent.item +"\t"+item);
		int cSize = parent.childNodes.size();
		int pNodeId = parent.id;
		int cId = -1;
		
		boolean isChild = false;
		
		for(int i = 0; i < cSize; i++){
			Node cNode = parent.childNodes.get(i);
			if(cNode.item.equals(item)){
				present = cNode;
				isChild = true;
				cId = i;
				break;
			}
		}
		
		if(isChild){
			present.support++;
			parent.childNodes.set(cId, present);
 			NodeTable.put(present.id, present);
 		} else {
 			present = new Node();
 			present.item = item;
 			present.id = NodeTable.size();
 			present.support = 1;
 			present.parentNodeId = pNodeId;
 			
 			//헤더테이블 연결 
 			
 			int nodeSize = NodeTable.size();
 			for(int i = 0; i < headerTable.size(); i++){
 				FPHeaderTable fpt = headerTable.get(i);
 				if(fpt.item.equals(item)){
 					//노드 테이블을 탐색하면서 노드를 따라가서 같으면 브레이크
 					boolean isNext = true;
 					
 					//테이블에서 신규 연결이 아니면 ...
 					if( fpt.NodeId > 0 ){
 						Node tmpNode = null;
 						for(int j = 1; j < nodeSize ; j++){
 							tmpNode = NodeTable.get(j);
 							String tmpItem = tmpNode.item;
 							
 							if(tmpItem.equals(item) && tmpNode.sideNodeId < 0){
 								present.sideNodeId = -1;
 								tmpNode.sideNodeId = present.id;
 								break;
 							}
 						}
 						NodeTable.put(tmpNode.id, tmpNode);
 					} 
 					//테이블에서 연결된 노드가 없으면 ...
 					else {
 						fpt.NodeId  = present.id;
 						present.sideNodeId = -1;
 						
 						headerTable.set(i, fpt);
 						isNext = false;
 					}
 				} 
 			}
// 			System.out.println(present.id+"\t"+present.item);
 			parent.childNodes.add(present);
 			NodeTable.put(present.id, present);
 		} 
		//헤더파일에서의 아이템 연결이 제대로 안되는 것 같음
		
//		System.out.println("");
//		System.out.println("check:\t"+present.item+"\t"+present.support);
//		System.out.println("");
		return present; 
	}
	
	public ArrayList<PatternBase> generateAR(FPHeaderTable tableItem, String baseItem, int conditionSup, double minConf) {
		// TODO Auto-generated method stub
		int id = tableItem.NodeId;
		Node node = null ;
//		System.out.println("id\t"+id);
		
		//조건부 패턴 트리 생성을 위한 조건부 트랜잭션 생성
		ArrayList<PatternBase> subTList = new ArrayList<PatternBase>();
		
		Node conditionNode = NodeTable.get(id);
		//Sytem.out.printprintln(conditionNode.id+"\t"+conditionNode.item+"\t"+conditionNode.parentNodeId+"\t"+conditionNode.support);

		
		while(true){
			node = NodeTable.get(id);
		
			Node pNode = node;
			
			//조건부 패턴 트리 생성
			PatternBase subTran = new PatternBase();
			subTran.confidence = pNode.support;
			while(true){
				Node parantNode = NodeTable.get(pNode.parentNodeId);
				//Sytem.out.printprintln(parantNode.id+"\t"+parantNode.item+"\t"+parantNode.support);
				
				if(pNode.support >= minSup){
					subTran.base.add(pNode.item);
				}
				
				
				
				if(pNode.parentNodeId == 0){
					break;
				}
				
				pNode = parantNode;
			}
			
			subTList.add(subTran);

//			System.out.println("Side:\t"+node.sideNodeId);
			if(node.sideNodeId <= 0 ){
				break;
			}
			id = NodeTable.get(node.sideNodeId).id;
		}
		//연관규칙 생성 
		
//		System.out.println("generate rule");
		
		return subTList;
	}
	
	public void searchTree(FPHeaderTable tableItem, double minConf) {
		// TODO Auto-generated method stub
		int id = tableItem.NodeId;
		Node node = null ;
//		System.out.println("id\t"+id);
		
		//조건부 패턴 트리 생성을 위한 조건부 트랜잭션 생성
		ArrayList<Transaction> subTList = new ArrayList<Transaction>();
		
		Node conditionNode = NodeTable.get(id);
		//Sytem.out.printprintln("Conditional FP-Tree");
		//Sytem.out.printprintln(conditionNode.id+"\t"+conditionNode.item+"\t"+conditionNode.parentNodeId+"\t"+conditionNode.support);
		
		while(true){
			node = NodeTable.get(id);
		
			Node pNode = node;
			
			//조건부 패턴 트리 생성
			Transaction subTran = new Transaction();
			
			int leafSize = node.support;
			while(true){
				Node parantNode = NodeTable.get(pNode.parentNodeId);
				//Sytem.out.printprintln(parantNode.id+"\t"+parantNode.item+"\t"+parantNode.support);

				if(!conditionNode.item.equals(pNode.item)){
					subTran.transaction.add(pNode.item);
				}
				
				if(pNode.parentNodeId == 0){
					//Sytem.out.printprintln("Break:\t"+pNode.item);
					break;
				}
				pNode = parantNode;
			}
			
			//Sytem.out.printprintln(leafSize);
			for(int i = 0; i < leafSize; i++){
				subTList.add(subTran);
			}

//			System.out.println("Side:\t"+node.sideNodeId);
			if(node.sideNodeId <= 0 ){
				break;
			}
			id = NodeTable.get(node.sideNodeId).id;
		}
		
		//연관규칙 추출
		FPGrowth subPGrowth = new FPGrowth(conditionNode.item, tableItem.count, minSup, minConf);
		HashMap<String, ArrayList<PatternBase>> retMap = subPGrowth.buildSubTree(subTList);
		
		//print
	}
}
