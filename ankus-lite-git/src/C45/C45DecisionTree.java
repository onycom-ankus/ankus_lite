package C45;

import java.io.Serializable;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.Hashtable;
import java.util.List;

import CorePackage.Attribute;
import CorePackage.Instance;
import CorePackage.Instances;

public class C45DecisionTree implements Serializable{

	private Instances		mInstances	= null;		// 학습데이터
	private Tree 			mDecisionTree = null;	// 학습된 의사결정트리
	
	private int				mTestFoldIndex;	// 테스트에 사용할 학습데이터의 폴드 인덱스
	private int				mNodeID;
	
	private float			mMinNumData;	// 최소 데이터 개수
	private float			mMaxPurity;		// 최대 순도
	
	private boolean[]		mUsable;
	
	private float[]			mLikeH;			// 각 클래스별 likelihood 값 저장
	private String			mPredicClass;	// 예측 클래스
	private String			mRuleCond;		// 예측한 원인(규칙의 조건)
	
	private static DecimalFormat	mDecimalFormat = null;
	
	/**
	 * 생성자
	 * @param inputData 	입력 데이터 (클래스 속성이 설정된 Instances)
	 */
	public C45DecisionTree(Instances inputData) {
		mDecimalFormat = new DecimalFormat("######.##");
		this.mInstances = inputData;
		this.mLikeH = new float [this.mInstances.getAttributeObjs().get(mInstances.getClassAttributeIndex()).getNumNominalValues()]; 
		this.mMinNumData = 4.0f;
		this.mMaxPurity = 0.92f;
	}

	/**
	 * 학습데이터로 의사결정트리 생성 함수
	 */
	public void buildClassifier(){
		
		this.mDecisionTree = new Tree();
		this.mNodeID = 0;
		
		//환경변수 (종료조건)
		System.out.println("최소데이터 개수:\t"+this.mMinNumData);
		System.out.println("최대순도:\t"+this.mMaxPurity);
		
		List<Integer> subData = new ArrayList<Integer> ();
		for(int i=0 ; i<this.mInstances.getNumData() ; i++){
			subData.add(this.mInstances.getInstance(i).getID());
		}
		
		this.mUsable = new boolean[this.mInstances.getNumAttributes("all")];
		for(int i=0 ; i<this.mInstances.getNumAttributes("all") ; i++){		
			this.mUsable[i] = (this.mInstances.getClassAttributeIndex() == i) ? false : true;
		}
		
		makeNode(this.mInstances,this.mTestFoldIndex,subData);
	}
	

	/**
	 * 노드 객체를 생성하는 재귀함수
	 * 종료조건은 노드에 포함된 데이터 개수가 죄소데이터개수보다 작을 때, 또는 노드의 순도가 최대순도보다 클 때
	 * @param instances	전체데이터 객체
	 * @param testFoldIndex	테스트로 사용할 데이터 폴드 인덱스
	 * @param subData	노드에 할당될 데이터 인덱스 집합
	 */
	private void makeNode(Instances instances, int testFoldIndex, List<Integer> subData) {
		
		Node node = new Node(this.mNodeID, instances, testFoldIndex, subData);
		
		System.out.println("===> 노드의 ID: " + this.mNodeID + ", 할당된 데이터 개수: " + subData.size());
		
		if(node.getNumInstances() < this.mMinNumData){	
			// 종료조건 1: 노드에 할당된 데이터가 최소데이터개수보다 적을 경우
			this.mDecisionTree.addNode(this.mNodeID, node);
			
			System.out.println("노드에 할당된 데이터가 최소데이터개수보다 작아서 단말노드된 경우, 노드ID: "+this.mNodeID);
			System.out.println(node.toStringInfo(instances));
			
		}else if(this.mMaxPurity < node.getPurity()){
			// 종료조건 2: 노드에 할당된 데이터의 순도가 최대순도보다 클 경우
			this.mDecisionTree.addNode(this.mNodeID, node);
			
			System.out.println("노드의 순도가 최대순도보다 큰 경우, 노드ID: "+this.mNodeID);
			System.out.println(node.toStringInfo(instances));
			
		}else{
			
			Link link;
			
			// 자식노드 생성
			this.mDecisionTree.addNode(this.mNodeID, node);
			
			// 자식노드를 생성하기 위해 선택된 속성 인덱스
			int selectIndex = node.selectAttributeID(instances,this.mUsable,subData);
			
			Attribute attribute = this.mInstances.getAttributeObjs().get(selectIndex);
			
			node.setNodeName(attribute.getAttributeName());
			node.constructChildrenNodesObj();
			
			System.out.println("노드 이름: "+node.getNodeName()+"("+selectIndex+")");

			if(attribute.getAttributeType().equalsIgnoreCase("nominal")){
				// 기호속성
				this.mUsable[selectIndex] = false;
				List<Integer>[] subSet = new ArrayList[attribute.getNumNominalValues()];
				
				for(int i=0 ; i<attribute.getNumNominalValues() ; i++){
					subSet[i] = new ArrayList<Integer>();
				}
				
				for(int k=0 ; k<node.getNumInstances() ; k++){
					subSet[(int)instances.getInstance(node.getInstanceID(k)).getValue(selectIndex)].add(node.getInstanceID(k));
				}
				
				for(int i=0 ; i<attribute.getNumNominalValues() ; i++){
					System.out.println("\t 링크: "+attribute.getNominalValueName(i));
					this.mNodeID++;
					link = new Link(i,attribute.getNominalValueName(i),this.mNodeID);				
					node.setChild(i, link);
					makeNode(instances,testFoldIndex,subSet[i]);
				}
			}else{
				// 수치속성
				List<Integer>[] subSet = new ArrayList[2];
				int dataID;
				
				for(int i=0 ; i<2 ; i++){
					subSet[i] = new ArrayList<Integer> ();
				}
				
				for(int k=0 ; k<node.getNumInstances() ; k++){
					dataID = node.getInstanceID(k);
					if(instances.getInstance(dataID).getValue(selectIndex) <= node.getBreakPoint(selectIndex)){
						subSet[0].add(node.getInstanceID(k));
					}else{
						subSet[1].add(node.getInstanceID(k));
					}
				}
					
				String strTemp;
				
				this.mNodeID++;
				strTemp = "<= "+ String.valueOf(mDecimalFormat.format(node.getBreakPoint(selectIndex)));
				link = new Link(0,strTemp,this.mNodeID);
				node.setChild(0, link);
				
				System.out.println("\t 링크: "+node.getChildrenLinkName(0));
				makeNode(instances,testFoldIndex,subSet[0]);
				
				this.mNodeID++;
				strTemp = String.valueOf(mDecimalFormat.format(node.getBreakPoint(selectIndex)))+" <";
				link = new Link(1,strTemp,this.mNodeID);
				node.setChild(1, link);
				
				System.out.println("\t 링크: "+node.getChildrenLinkName(1));
				makeNode(instances,testFoldIndex,subSet[1]);
			}
			
		}
	}

	/**
	 * 분할된 데이터 집합 중 어느 집합을 테스트 데이터로 사용할 것인가 결정하는 함수
	 * @param testfoldIndex	테스트데이터로 사용할 fold 인덱스
	 */
	public void setTestFold(int testfoldIndex) {
		this.mTestFoldIndex = testfoldIndex;
	}

	/**
	 * 입력 데이터 분류 함수
	 * @param inst	입력 데이터
	 */
	public void classify(Instance inst){
		
		Node node = this.mDecisionTree.getNode(0);
		String ruleCond="";
		search(node,inst,ruleCond);
	}
	
	/**
	 * 해당 노드 검색
	 * @param node	현재 노드
	 * @param inst	입력 데이터
	 */
	private void search(Node node, Instance inst, String ruleCond) {
		
		String attributeName = node.getAttributeName();
		Hashtable<Integer,Attribute> attributes = this.mInstances.getAttributeObjs();
		
		if(attributeName.equalsIgnoreCase("NULL")){
			// 단말노드
			int classIndex = this.mInstances.getClassAttributeIndex();
			System.out.println("조건: "+ruleCond);
			this.mRuleCond = ruleCond;
			this.mPredicClass = attributes.get(classIndex).getNominalValueName(node.getMajorityClass());
			this.mLikeH = node.getClassProb();
			System.out.print("단말...	예측 클래스: " + node.getMajorityClass() + ","+attributes.get(classIndex).getNominalValueName(node.getMajorityClass()));
			System.out.println("\t관측클래스: "+inst.getValue(classIndex)+","+attributes.get(classIndex).getNominalValueName(inst.getValue(classIndex)));

		}else{
			// 자식노드
			int attributeID = node.getAttributeID();
			Attribute attribute = attributes.get(attributeID);
			double value = inst.getValue(attributeID);
			Node childNode = null;
			double linkID;
			String valStr;
			
			if(attribute.getAttributeType().equalsIgnoreCase("nominal")){	// 기호적 수성
				valStr = attributes.get(attributeID).getNominalValue(value);
				ruleCond += "("+attributeName+","+valStr+") ";
				System.out.println("==> "+attributeName+","+value+","+valStr);
				
				for(int i=0 ; i<node.getNumChildren() ; i++){
					linkID = node.getChildrenLinkID(i);
					if(linkID == value){
						childNode = mDecisionTree.getNode(node.getChildNodeID(i));
						break;
					}
				}
				
				if(childNode != null){
					search(childNode,inst,ruleCond);
				}else{
					System.err.println("오류: 자식노드가 null 임...");
					System.exit(1);
				}
			}else{	// 수치형 속성

				System.out.println("==> "+attributeName+","+value);
				
				for(int i=0 ; i<2 ; i++){
					linkID = node.getChildrenLinkID(i);
					
					if(linkID == 0.0f){	// <= 70
						valStr = node.getChildrenLinkName((int)linkID).split(" ")[1];
						if(value <= Double.valueOf(valStr)){
							childNode = mDecisionTree.getNode(node.getChildNodeID(i));
							ruleCond += "("+attributeName+", <="+valStr+") ";
							break;							
						}
					}else{	// 70 <
						valStr = node.getChildrenLinkName((int)linkID).split(" ")[0];
						if(Double.valueOf(valStr) < value){
							childNode = mDecisionTree.getNode(node.getChildNodeID(i));
							ruleCond += "("+attributeName+", >"+valStr+") ";
							break;								
						}
					}				
				}
				
				if(childNode != null){
					search(childNode,inst,ruleCond);
				}else{
					System.err.println("오류: 자식노드가 null 임...");
					System.exit(1);
				}				
			}
		}
		
	}

	/**
	 * 클래스를 예측한 규칙의 조건 반환 함수
	 * @return	클래스를 예측한 규칙의 조건
	 */
	public String getRuleCond() {
		return this.mRuleCond;
	}

	/**
	 * 예측한 클래스 명 반환
	 * @return	예측한 클래스 명
	 */
	public String getPredicClass() {
		return this.mPredicClass;
	}

	/**
	 * 각 클래스의 가능성 계산 함수
	 */
	public void getClassLikehood() {
		
		String str = "";
		String className;
		Attribute classAttribute;
		double sum = 0;
		
		
		for(int i=0 ; i<this.mLikeH.length ; i++){
			sum += this.mLikeH[i];
		}		
		
		for(int i=0 ; i<this.mLikeH.length ; i++){
			this.mLikeH[i] = this.mLikeH[i]/(float)sum;
		}
	}

	/**
	 * 각 클래스의 가능성 출력 함수
	 * @return	각 클래스의 가능성 => 출력 형식: (클래스명, 가능성) .... 
	 */
	public String toStringClassLikehood() {
		String str = "";
		String className;
		Attribute classAttribute;
		double sum = 0;
		
		for(int i=0 ; i<this.mLikeH.length ; i++){
			classAttribute = this.mInstances.getAttributeObjs().get(this.mInstances.getClassAttributeIndex());
			className = classAttribute.getNominalValueName(i);
			str += "("+className+","+this.mLikeH[i]+") ";
		}
		
		return str;
	}

	/**
	 * 모델 생성할 때 사용한 데이터(학습데이터)를 삭제하는 함수
	 */
	public void deleteInstances() {
		this.mInstances.deleteInstances();
	}

	/**
	 * 생성된 트리 출력 함수
	 */
	public void toStringTree() {
		Node node = this.mDecisionTree.getNode(0);
		String ruleCond="";
		path(node,ruleCond);		
	}

	/**
	 * 생성된 트리 출력 재귀함수
	 * @param node	현재 노드
	 * @param ruleCond	루트노드에서부터 현재 노드까지 경로
	 */
	private void path(Node node, String ruleCond) {
		
		String attributeName = node.getAttributeName();
		Hashtable<Integer,Attribute> attributes = this.mInstances.getAttributeObjs();
		
		if(attributeName.equalsIgnoreCase("NULL")){
			// 단말노드
			int classIndex = this.mInstances.getClassAttributeIndex();
			System.out.println(" 조건: "+ruleCond);
//			this.mRuleCond = ruleCond;
//			this.mPredicClass = attributes.get(classIndex).getNominalValueName(node.getMajorityClass());
//			this.mLikeH = node.getClassProb();
			System.out.print(" 단말...	예측 클래스: " + node.getMajorityClass() + ","+attributes.get(classIndex).getNominalValueName(node.getMajorityClass())+"\t");
			System.out.println("총 데이터 개수: "+node.getNumInstances()+" / 최빈 클래스: " + node.getNumMajorityClassInstances());
			this.mLikeH = node.getClassProb();
			System.out.print("각 클래스의 가능성: ");
			for(int i=0 ; i<this.mLikeH.length ; i++){
				System.out.print(attributes.get(classIndex).getNominalValueName(i)+","+this.mDecimalFormat.format(this.mLikeH[i])+"\t");
			}
			System.out.print("\n");

		}else{
			// 자식노드
//			double linkID;
			String linkName;
			Node childNode = null;
			String parents = ruleCond;
			for(int i=0 ; i<node.getNumChildren() ; i++){
//				linkID = node.getChildrenLinkID(i);
				linkName = node.getChildrenLinkName(i);
				
				ruleCond = parents + "("+attributeName+","+linkName+") ";
				childNode = mDecisionTree.getNode(node.getChildNodeID(i));
				path(childNode,ruleCond);
				
			}
			
//			System.out.println(ruleCond);
		}		
	
	}
	

}
