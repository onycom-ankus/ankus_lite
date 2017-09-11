package C45;

import java.io.Serializable;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Hashtable;
import java.util.List;

import CorePackage.Attribute;
import CorePackage.Instance;
import CorePackage.Instances;

public class Node implements Serializable{

	private int				mID;								// 노드ID
	private String			mAttributeName = "null";			// 자식노드를 생성하기 위해 선택된 속성명
	private int				mAttributeID;						// 자식노드를 생성하기 위해 선택된 속성ID
	private List<Integer>	mData = null;						// 노드에 할당된 데이터 (메모리 최소한 사용하기 위해 데이터 ID만 저장)
	private	int				mTestFoldIndex;						
	private float[]			mRatioOfClasses;					// 노드에 할당된 데이터의 클래스 분포
	private int				mNumMajorityClassInstances;			// 노드에 할당된 데이터 중 가장 빈도가 많은 클래스의 개수
	private int				mMajorityClass;						// 노드에 할당된 데이터 중에 가장 빈도가 많은 클래스 인데스
	private float			mPurity;							// 노드에 할당된 데이터 중에 가장 빈도가 많은 클래스의 비율(순도)
	private int				mClassIndex;						// 클래스 속성의 ID
	private Hashtable<Integer,Link>		mChildrenNodes;
	private Hashtable<Integer,Float>	mBreakPoint;			// 노드에 할당된 데이터에서 각 수치속성 별로 엔트로피가 가장 낮은 breakPoint 값 저장
	
	private static DecimalFormat	mDecimalFormat = null;
	
	/**
	 * 노드 생성자
	 * @param id	노드 ID
	 * @param instances		전체데이터 객체
	 * @param testFoldIndex	테스트 데이터로 사용할 폴드
	 * @param subData		노드에 할당된 데이터  ID 집합
	 */
	public Node(int id, Instances instances, int testFoldIndex, List<Integer> subData) {
		this.mID = id;
		this.mTestFoldIndex = testFoldIndex;
		this.mData = new ArrayList<Integer>();
		this.mBreakPoint = new Hashtable<Integer,Float> ();
		
		Hashtable<Integer,Attribute> attributes = instances.getAttributeObjs();
		this.mClassIndex = instances.getClassAttributeIndex();
		int numClasses = attributes.get(this.mClassIndex).getNumNominalValues(); 
		this.mRatioOfClasses = new float[numClasses];
		
		for(int i=0 ; i<subData.size() ; i++){
			mData.add(subData.get(i));
			this.mRatioOfClasses[(int)instances.getInstance(subData.get(i)).getValue(this.mClassIndex)]++;
		}
		
		this.mMajorityClass = setMajorityClass();
		
		this.mNumMajorityClassInstances = (int)this.mRatioOfClasses[this.mMajorityClass];
		this.mPurity = (float)this.mRatioOfClasses[this.mMajorityClass]/(float)this.mData.size();
		
		mDecimalFormat = new DecimalFormat("######.#");
	}
	
	/**
	 * 최대빈도 클래스의 개수 반환 함수
	 * @return	최대빈도 클래스의 개수
	 */
	public int getNumMajorityClassInstances(){
		return this.mNumMajorityClassInstances;
	}
	
	/**
	 * 최대빈도 클래스 반환 함수
	 * @return	최대빈도 클래스
	 */
	public int getMajorityClass()
	{
		return this.mMajorityClass;
	}
	
	/**
	 * 가장 빈도수가 많은 클래스 인덱스를 반환하는 함수
	 * 반환 값이 -1인 경우 오류
	 * @return	가장 빈도수가 많은 클래스 인덱스
	 */
	private int setMajorityClass(){
		
		int numClass = this.mRatioOfClasses.length;
		float max = -1*Float.MAX_VALUE;
		int maxIndex = -1;
		
		for(int i=0 ; i<numClass ; i++){
			if(max < this.mRatioOfClasses[i]){
				max = this.mRatioOfClasses[i];
				maxIndex = i;
			}
		}
		
		return maxIndex;
	}

	/**
	 * 노드에 할당된 데이터 개수 반환 함수
	 * @return	노드에 할당된 데이터 개수
	 */
	public float getNumInstances() {
		return (float)this.mData.size();
	}

	/**
	 * 노드에 할당된 데이터 집합의 순도 바환 함수
	 * @return	노드에 할당된 데이터 집합의 순도
	 */
	public float getPurity() {
		return this.mPurity;
	}

	/**
	 * Information Gain이 가장 큰 속성을 자식노드를 생성하기 위한 속성으로 선택
	 * @param instances	전체데이터 객체
	 * @param usable	속성사용여부
	 * @param subData	노드에 포함된 부분데이터 집합
	 * @return	자식노드를 생성하기 위한 속성ID
	 */
	public int selectAttributeID(Instances instances, boolean[] usable, List<Integer> subData) {
	
		int numAttribute = instances.getNumAttributes("all");
		int classIndex = this.mClassIndex;
		
		
		double maxGain = -1*Double.MIN_VALUE;
		double gain;
		int selectIndex = -1;
		
		for(int i=0 ; i<numAttribute ; i++){
			
			if(!usable[i]){
				continue;
			}
			
			gain = getGain(i,classIndex,instances,subData);
			
			if(maxGain < gain){
				maxGain = gain;
				selectIndex = i;
			}
		}
		
		this.mAttributeID = selectIndex;
		
		return selectIndex;	
	}

	/**
	 * Information Gain 계산 함수
	 * @param cIndex	자식 노드들을 생성하기 위해 선택된 속성 인덱스
	 * @param classIndex	클래스로 설정된 속성 인덱스
	 * @param instances	전체데이터 객체
	 * @param subData	노드에 포함된 부분데이터
	 * @return	Information Gain 값
	 */
	private double getGain(int cIndex, int classIndex, Instances instances, List<Integer> subData) {
		
		float infoGain;
		float pEntropy = getEntropy(classIndex,instances,subData);
		float cEntropy = 0.0f;
		Attribute attribute = instances.getAttributeObjs().get(cIndex);

		if(attribute.getAttributeType().contentEquals("nominal")){
			// 기호적 속성일 경우
			for(int i=0 ; i<attribute.getNumNominalValues() ; i++){
				cEntropy += getEntropy(cIndex,i,classIndex,instances, subData);
			}
			
		}else{
			// 수치적 속성일 경우	
			ArrayList<Float> values = new ArrayList<Float> ();
			int numData = subData.size();
			int dataID;
			
			for(int i=0 ; i<numData ; i++){
				dataID = subData.get(i);
				values.add((float)instances.getInstance(dataID).getValue(cIndex));
			}
			
			Collections.sort(values);
			
			float breakPoint;
			float minEntropy = Float.MAX_VALUE;
			float minBreakPoint = -1.0f;
			
			for(int i=0 ; i<(values.size()-1); i++){
				//breakPoint = values.get(i)+((values.get(i+1)-values.get(i))/2.0f);
				breakPoint = values.get(i);
				cEntropy = 0.0f;
				
				for(int k=0 ; k<2 ; k++){
					cEntropy += getEntropy(cIndex,breakPoint,k,classIndex,instances, subData);
				}
				
				if(cEntropy < minEntropy){
					minEntropy = cEntropy;
					minBreakPoint = breakPoint;
				}
			}
			this.mBreakPoint.put(cIndex, minBreakPoint);
			cEntropy = minEntropy;
		}
		
		infoGain = pEntropy - cEntropy;
		
		return infoGain;
	}
	
	/**
	 * 수치형 속성 엔트로피 계산 함수
	 * @param cIndex		선택된 속성 인덱스
	 * @param breakPoint	분할점 값
	 * @param code			왼쪽, 오른쪽 자식노드 표현 (0: 왼쪽 자식노드, 1: 오른쪽 자식노드 표현)
	 * @param classIndex	클래스 속성 인덱스
	 * @param instances		전체 데이터 객체
	 * @param subData		해당 노드에 할당된 데이터 집합
	 * @return	선택된 속성에 대한 엔트로피
	 */
	private float getEntropy(int cIndex, float breakPoint, int code, int classIndex, Instances instances, List<Integer> subData) {
		
		int numData = subData.size();
		int numClass = instances.getAttributeObjs().get(classIndex).getNumNominalValues(); 
		float[] classFreqs = new float[numClass];
		Instance instance;
		int numSubData = 0;
		int dataID;
		
		for(int i=0 ; i<numData ; i++){
			
			dataID = subData.get(i);
			instance = instances.getInstance(dataID);
			
			switch(code){
			case 0:
				if(instance.getValue(cIndex) <= breakPoint){
					classFreqs[(int)instance.getValue(classIndex)]++;
					numSubData++;
				}
				break;
			case 1:
				if(instance.getValue(cIndex) > breakPoint){
					classFreqs[(int)instance.getValue(classIndex)]++;
					numSubData++;
				}				
				break;
			}

		}
		
		float entropy=0.0f;
		float p;
		
		for(int i=0 ; i<numClass ; i++){
			p = classFreqs[i]/(float)numSubData;
			if(p == 0.0){
				entropy += 0.0f;
			}else{
				entropy += (-1.0)*p*(Math.log10(p)/Math.log10(2.0));
			}
		}
		
		return ((float)numSubData/(float)numData)*entropy;			
	}

	/**
	 *  엔트로피 계산 함수
	 * @param cIndex		선택된 속성 인덱스
	 * @param valIndex		해당 속성 값의 인덱스
	 * @param classIndex	클래스 인덱스
	 * @param instances		전체데이터 객체
	 * @param subData		노드에 포함된 부분데이터
	 * @return	
	 */
	private float getEntropy(int cIndex, int valIndex, int classIndex, Instances instances, List<Integer> subData) {
		
		int numData = subData.size();
		int numClass = instances.getAttributeObjs().get(classIndex).getNumNominalValues(); 
		float[] classFreqs = new float[numClass];
		Instance instance;
		int numSubData = 0;
		int dataID;
		
		for(int i=0 ; i<numData ; i++){
			dataID = subData.get(i);
			instance = instances.getInstance(dataID);
			if((int)instance.getValue(cIndex) == valIndex){
				classFreqs[(int)instance.getValue(classIndex)]++;
				numSubData++;
			}
		}
		
		float entropy=0.0f;
		float p;
		
		for(int i=0 ; i<numClass ; i++){
			p = classFreqs[i]/(float)numSubData;
			if(p == 0.0){
				entropy += 0.0f;
			}else{
				entropy += (-1.0)*p*(Math.log10(p)/Math.log10(2.0));
			}
		}
		
		return ((float)numSubData/(float)numData)*entropy;		
	}
	
	/**
	 * 클래스에 대한 엔트로피 계산 함수
	 * @param classIndex	클래스 인덱스
	 * @param instances		전체 데이터 객체
	 * @param subData		노드에 포함된 부분데이터
	 * @return	엔트로피 값
	 */
	private float getEntropy(int classIndex, Instances instances, List<Integer> subData) {
		
		int numData = subData.size();
		int numClass = instances.getAttributeObjs().get(classIndex).getNumNominalValues(); 
		float[] classFreqs = new float[numClass];
		int dataID;
		
		for(int i=0 ; i<numData ; i++){
			dataID = subData.get(i);
			classFreqs[(int)instances.getInstance(dataID).getValue(classIndex)]++;
		}
		
		float entropy=0.0f;
		float p;
		
		for(int i=0 ; i<numClass ; i++){
			p = classFreqs[i]/(float)numData;
			if(p == 0.0){
				entropy += 0.0f;
			}else{
				entropy += (-1.0)*p*(Math.log10(p)/Math.log10(2.0));
			}
		}
		
		return entropy;
	}

	/**
	 * 노드 명 설정 함수
	 * 노드 명은 자식노드를 생성하기 위해 선택된 속성 명으로 설정
	 * @param attributeName	노드 명
	 */
	public void setNodeName(String attributeName) {
		this.mAttributeName = attributeName;	
	}
	
	/**
	 * 노드 명 반환 함수
	 * @return	노드 명
	 */
	public String getNodeName(){
		return this.mAttributeName;
	}

	/**
	 * 자식노드의 링크 정보 설정 함수
	 * @param index	링크 ID
	 * @param link	링크 정보가 저장된 객체
	 */
	public void setChild(int index, Link link) {
		this.mChildrenNodes.put(index, link);
	}

	/**
	 * 전체데이터의 아이디 반환 함수
	 * @param index	할당된 데이터의 인덱스
	 * @return 입력 인덱스에 저장된 전체데이터의 아이디 
	 */
	public int getInstanceID(int index) {
		return this.mData.get(index);
	}

	/**
	 * 자식노드(링크) 정보를 저장하기 위한 전역변수 객체 생성
	 * (전역변수: Hashtable<Integer,Link> mChildrenNodes)
	 */
	public void constructChildrenNodesObj() {
		this.mChildrenNodes = new Hashtable<Integer,Link> ();
	}

	/**
	 * 노드의 정보를 출력하는 함수 (단말노드에서 정의할 수 있는 "주요 클래스"와 "순도")
	 * @param instances 전체 데이터 객체
	 * @return	노드 정보 (주요 클래스, 순도)
	 */
	public String toStringInfo(Instances instances) {
		
		Hashtable<Integer,Attribute> attributes = instances.getAttributeObjs();
		StringBuffer str = new StringBuffer();
		str.append("주요 클래스: ");
		str.append(attributes.get(this.mClassIndex).getNominalValueName(this.mMajorityClass));
		str.append(",");
		str.append(this.mMajorityClass);
		str.append(" (순도: ");
		str.append(mDecimalFormat.format(this.mPurity));
		str.append(")");		
		
		return str.toString();
	}

	/**
	 * 해당 수치형 속성에 대한 분할점 반환 함수
	 * @param selectIndex	수치형 속성 인덱스
	 * @return	분할점
	 */
	public double getBreakPoint(int selectIndex) {
		return this.mBreakPoint.get(selectIndex);
	}

	/**
	 * 링크 ID로부터 자식노드의 링크 명 반환 함수
	 * @param linkID	링크 ID
	 * @return	링크 명
	 */
	public String getChildrenLinkName(int linkID) {
		
		return this.mChildrenNodes.get(linkID).getLinkName();
	}
	
	/**
	 * 링크 ID로부터 자식노드의 링크에 대응디는 속성 값 반환
	 * @param linkID	링크ID
	 * @return	대응되는 속성 값 
	 */
	public int getChildrenLinkID(int linkID){
		return this.mChildrenNodes.get(linkID).getLinkID();
	}

	/**
	 * 자식노드를 생성하기 위해 선택된 속셩명
	 * @return	속성명
	 */
	public String getAttributeName() {
		return this.mAttributeName;
	}

	/**
	 * 
	 * @return
	 */
	public int getNumChildren() {
		return this.mChildrenNodes.size();
	}

	/**
	 * 입력된 링크ID에 의해 생성된 자식노드의 ID 반환
	 * @param linkID	링크ID
	 * @return	자식노드 ID
	 */
	public int getChildNodeID(int linkID) {
		return this.mChildrenNodes.get(linkID).getNodeID();
	}

	/**
	 * 노드에서 선택된 속성ID 반환 함수
	 * @return 속성ID
	 */
	public int getAttributeID() {
		return this.mAttributeID;
	}

	/**
	 * 입력된 링크ID의 레이블 반환
	 * @param linkID	링크ID
	 * @return	링크의 레이블
	 */
	public String getLinkInfo(int linkID) {
		return this.mChildrenNodes.get(linkID).getLinkName();
	}

	/**
	 * 클래스의 비율 반환 (각 클래스가 발생할 가능성 반환)
	 * @return	각 클래스의 비율 
	 */
	public float[] getClassProb() {
		return this.mRatioOfClasses;
	}
}
