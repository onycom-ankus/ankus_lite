package CorePackage;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.io.Serializable;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Hashtable;
import java.util.List;
import java.util.Set;

/**
 * 입력데이터 집합 클래스
 * @author onycom 빅데이터사업부 빅데이터분석컬설팅팀 류정우
 */
public class Instances implements Serializable{
	
	private Hashtable<Integer,Attribute> mAttributes = null;			// 속성 집합
	private Hashtable<Integer,Instance>	 mInstances = null;				// 데이터 집합
	private String						 mClassAttributeName;			// 클래스 속성명
	private int							 mClassAttributeIndex = -1;		// 클래스 속성 인덱스
	
	private Hashtable<Integer, List<Integer>> mFolds = new Hashtable<Integer, List<Integer>>();	// 분할된 데이터 집합, 집합의 원소는 데이터 인덱스
	
	private DecimalFormat	  	  		 mDecimalFormat = null;
	
	/**
	 * 생성자
	 */
	public Instances(){
		this.mAttributes = new Hashtable<Integer,Attribute>();
		this.mInstances  = new Hashtable<Integer,Instance> ();
		
		this.mFolds = new Hashtable<Integer, List<Integer>>();
		
		mDecimalFormat = new DecimalFormat("######.####");
	}

	/**
	 * csv 파일로부터 데이터 로딩하여 전역변수 m_instances에 저장
	 * @param filePath	데이터 파일
	 * @throws IOException
	 */
	public void LoadingFromCSVFile(String filePath) throws IOException {
		
		BufferedReader reader = new BufferedReader(new FileReader(filePath));
		
		String s;
		String[] token;
		double[] datum;
		double[] nominal_value_count = new double [getNumAttributes("all")];
		int countData = 0;
		
		Hashtable<String,Double> nominal_value_set = new Hashtable<String,Double> ();

		while((s = reader.readLine()) != null){
			token = s.split(",");
			
			datum = new double [token.length];
			
			if(datum.length != mAttributes.size()){
				System.out.println("오류: 속성 헤더 파일의 속성 개수와 데이터 파일의 속성 개수 불일치...");
				System.out.println("속성해더파일: "+mAttributes.size()+", 데이터 파일: "+datum.length);
				System.exit(1);
			}
			
			for(int i=0 ; i<token.length ; i++){
				if(mAttributes.get(i).getAttributeType().equalsIgnoreCase("nominal")){
					if(!nominal_value_set.containsKey(token[i])){
						nominal_value_set.put(token[i], nominal_value_count[i]);
						mAttributes.get(i).addNominalValue(nominal_value_count[i], token[i]);
						nominal_value_count[i]++;
					}
					datum[i] = nominal_value_set.get(token[i]);
				}else{
					datum[i] = Double.parseDouble(token[i]);
				}
			}
			
			this.mInstances.put(countData, new Instance(countData,datum));
			countData++;
		}	
	}

	/**
	 * 속성정보 추가 함수
	 * @param id 아이디
	 * @param name	속성명
	 * @param type	속성유형
	 */
	public void addAttribute(int id, String name, String type) {
		
		if(this.mAttributes == null){
			System.out.println("오류; Attribute 객체가 생성되지 않았음");
			System.exit(1);
		}
		
		Attribute attribute = new Attribute(id, name, type);
		
		this.mAttributes.put(id, attribute);
	}

	/**
	 * type이 "all"인  경우에는 전체 속성 개수가 반환 (클래스 속성 포함)
	 *       "numeric"의 경우에는 수치속성 개수 반환
	 *       "nominal"의 경우에는 기호속성 개수 반환
	 * @param type	속성유형
	 * @return	입력된 속성유형에 해당되는 속성개수
	 */
	public int getNumAttributes(String type) {

		int freq = 0;
		
		if(type.equalsIgnoreCase("all")){
			return this.mAttributes.size();
		}else{
			for(int key : this.mAttributes.keySet()){			
				if(this.mAttributes.get(key).getAttributeType().equalsIgnoreCase(type)){
					freq++;
				}
			}
		}
		return freq;		
	}

	/**
	 * Attribute 객체에 저장된 정보 출력
	 * @return	Attribute 정보 출력
	 */
	public String toStringAttributes() {
		String str="";
		
		Set<Integer> keys = mAttributes.keySet();
		List<Integer> Lkeys = new ArrayList<Integer>(keys);
		Collections.sort(Lkeys);
		
		for(int key : Lkeys){
			str += key+"\t";
			str += mAttributes.get(key).getAttributeID()+"\t";
			str += mAttributes.get(key).getAttributeName()+"\t";
			str += mAttributes.get(key).getAttributeType()+"\n";
		}
		return str;
	}

	/**
	 * 불러온 데이터 출력 함수
	 * opt = "index"이면 기호형 값을 인덱스로 출력
	 * opt = "name"이면 기호형 값을 이름으로 출력
	 * @param opt 기호형 값을 인덱스로 출력할 것인지, 이름으로 출력할 것인지 선택
	 * @return	데이터 출력
	 */
	public String toStringData(String opt) {
		
		String str="";
		double nominal_value_index;
		
		for(int key : this.mAttributes.keySet()){
			str += this.mAttributes.get(key).getAttributeName()+"("+key+")"+"\t";
		}
		str += "\n";
		
		for(int i=0 ; i<this.mInstances.size() ; i++){
			
			for(int key : this.mAttributes.keySet()){
				Attribute attribute = this.mAttributes.get(key);
				if(attribute.getAttributeType().equalsIgnoreCase("nominal")){
					nominal_value_index = this.mInstances.get(i).getValue(attribute.getAttributeID());
					if(opt.equalsIgnoreCase("index")){
						str += nominal_value_index + "\t";
					}else{						 
						str += attribute.getNominalValueName(nominal_value_index) + "\t";
					}
				}else{
					str += this.mInstances.get(i).getValue(attribute.getAttributeID()) + "\t";
				}
			}
			str += "\n";
			
		}
		
		return str;
	}

	/**
	 * 데이터 개수 반환 함수
	 * @return	데이터 개수 반환
	 */
	public int getNumData() {
		return this.mInstances.size();
	}

	/**
	 * 선택된 클래스 속성 이름을 가지고 attribute 객체에 해당 속성이 설정된 
	 * index를 전역변수 m_attributeAttributeIndex에 설정
	 * @param name	선택된 클래스 속성 이름
	 */
	public void setClassAttributeName(String name) {
		this.mClassAttributeName = name;
		
		Attribute attribute;
		for(Integer key : this.mAttributes.keySet()){
			attribute = this.mAttributes.get(key);
			if(attribute.getAttributeName().equalsIgnoreCase(name)){
				this.mClassAttributeIndex = key;
				break;
			}
		}
	}
	
	/**
	 * 클래스 속성 이름 반환 함수
	 * @return	클래스 속성 이름 반환
	 */
	public String getClassAttributeName(){
		return this.mClassAttributeName;
	}
	
	/**
	 * 클래스 속성 인덱스 반환 함수
	 * @return	클래스 속성 인덱스 반환
	 */
	public int getClassAttributeIndex(){
		return this.mClassAttributeIndex;
	}

	/**
	 * 클래스 비율에 따라 데이터를 분할하는 함수
	 * @param numFold	분할 개수
	 * @return
	 */
	public void setFolds(int numFold) {
		
		if(this.mClassAttributeIndex == -1){
			System.out.println("오류: 데이터를 분할하기 전에 클래스 속성을 선택해야 함");
			System.exit(1);
		}
		
		Hashtable<String,Double> classFreq = getClassFrequency();				// 각 클래스의 빈도수 계산
		
		Hashtable<String,Double> classRate = new Hashtable<String,Double> ();	// 각 클래스의 비율 계산
		
		for(String key : classFreq.keySet()){
			classRate.put(key, classFreq.get(key)/(double)this.mInstances.size());
		}
		
		System.out.println("===========================================  클래스 비율");
		for(String key : classRate.keySet()){
			System.out.println(key + "\t" + this.mDecimalFormat.format(classRate.get(key)));
		}		
		
		// 전체 데이터를 클래스 별로 분류
		Hashtable<String, List<Integer>> dataInClass = new Hashtable<String,List<Integer>> ();
		String classLabel;
		Instance inst;
		
		for(int key : this.mInstances.keySet()){
			inst = this.mInstances.get(key);
			classLabel = this.mAttributes.get(this.mClassAttributeIndex).getNominalValueName(inst.getValue(this.mClassAttributeIndex));
			if(dataInClass.containsKey(classLabel)){
				dataInClass.get(classLabel).add(key);
			}else{
				dataInClass.put(classLabel, new ArrayList<Integer>());
				dataInClass.get(classLabel).add(key);
			}			
		}
		
		System.out.println("=========================================== dataInClass에 저장된 값 출력");
		String str;
		int dataIndex;
		for(String key : dataInClass.keySet()){
			for(int i=0 ; i<dataInClass.get(key).size(); i++){
				str = key+"\t";
				for(int j=0 ; j<this.mAttributes.size() ; j++){
					dataIndex = dataInClass.get(key).get(i);
					if(this.mAttributes.get(j).getAttributeType().equalsIgnoreCase("nominal")){
						str += this.mAttributes.get(j).getNominalValueName(mInstances.get(dataIndex).getValue(j)) + "\t";
					}else{
						str += mInstances.get(dataIndex).getValue(j) + "\t";
					}
				}
				System.out.println(str);
			}
		}		
		
		int numDataInFold = this.mInstances.size()/numFold;			// 각 폴드에 포함되는 데이터 개수
		
		int maxPerClass;
		
		// 데이터를 폴더에 할당
		for(int i=0 ; i<numFold-1 ; i++){
			for(String key : dataInClass.keySet()){
				maxPerClass = (int)Math.round(numDataInFold * classRate.get(key)); 
							
				for(int j=0 ; j<maxPerClass ; j++){
					if(this.mFolds.containsKey(i)){
						this.mFolds.get(i).add(dataInClass.get(key).get(0));
						this.mFolds.put(i, this.mFolds.get(i));
						dataInClass.get(key).remove(0);
					}else{
						List<Integer> tempInst = new ArrayList<Integer> ();
						tempInst.add(dataInClass.get(key).get(0));
						this.mFolds.put(i, tempInst);
						dataInClass.get(key).remove(0);
					}
				}
			}
		}
		
		// 나머지 데이터는 마지막 폴더에 할당
		for(String key : dataInClass.keySet()){
			maxPerClass = dataInClass.get(key).size(); 
			
			for(int j=0 ; j<maxPerClass ; j++){
				if(this.mFolds.containsKey(numFold-1)){
					this.mFolds.get(numFold-1).add(dataInClass.get(key).get(0));
					this.mFolds.put(numFold-1, this.mFolds.get(numFold-1));
					dataInClass.get(key).remove(0);
				}else{
					List<Integer> tempInst = new ArrayList<Integer> ();
					tempInst.add(dataInClass.get(key).get(0));
					this.mFolds.put(numFold-1, tempInst);
					dataInClass.get(key).remove(0);
				}
			}
		}		
	}

	/**
	 * 각 클래스의 빈도수 반환 함수
	 * @return	각 클래스의 빈도수 반환
	 */
	private Hashtable<String, Double> getClassFrequency() {
		
		Hashtable<String,Double> reVal = new Hashtable<String,Double> ();
		
		int classIndex = this.mClassAttributeIndex;
		double classValIndex;
		String classVal;
		
		for(int i=0 ; i<this.mInstances.size() ; i++){
			
			classValIndex = this.mInstances.get(i).getValue(classIndex);
			classVal = this.mAttributes.get(classIndex).getNominalValue(classValIndex);
			
			if(reVal.containsKey(classVal)){
				reVal.put(classVal, reVal.get(classVal)+1);
			}else{
				reVal.put(classVal, 1.0);
			}
		}
		
		System.out.println("클래스 분포");
		for(String key : reVal.keySet()){
			System.out.println(key + "\t" + reVal.get(key));
		}
		
		return reVal;
	}

	/**
	 * 속성 객체 반환
	 * @return 전역변수 m_attributes 객체 반환
	 */
	public Hashtable<Integer,Attribute> getAttributeObjs() {
		return this.mAttributes;
	}

	/**
	 * 분할된 데이터 집합 출력 함수
	 * 전역변수 m_folds에 저장된 내용 출력 함수
	 */
	public void toStringFolds() {

		if(this.mFolds.size() == 0){
			System.out.print("[오류] 데이터가 분할되지 않았음");
			System.out.println(" ---> getFolds(int) 함수를 사용하여 데이터를 분할해야 함");
			System.exit(1);
		}
		
		String str;
		System.out.println("분할된 데이터 집합의 개수(폴드 개수): " + this.mFolds.size());
		int instIndex;
		
		for(Integer key : this.mFolds.keySet())
		{
			System.out.println(key + "\t" + this.mFolds.get(key).size());
			for(int i=0 ; i<this.mFolds.get(key).size() ; i++){
				str = "";
				instIndex = this.mFolds.get(key).get(i); 
				for(int j=0 ; j<this.mAttributes.size() ; j++){
					if(this.mAttributes.get(j).getAttributeType().equalsIgnoreCase("nominal")){
						str += this.mAttributes.get(j).getNominalValueName(this.mInstances.get(instIndex).getValue(j)) + "\t";
					}else{
						str += this.mInstances.get(instIndex).getValue(j) + "\t";
					}
				}
				System.out.println("===> "+key+" : "+str);
			}
		}		
		
	}

	/**
	 * 지정된 인덱스의 데이터, Instance 객체 반환 함수
	 * @param index	데이터 인덱스
	 * @return	해당 인덱스의 Instance 객체
	 */
	public Instance getInstance(int index) {
		return this.mInstances.get(index);
	}

	/**
	 * 입력데이터가 분할된 개수 반환 함수
	 * 분할된 데이터 집합은 하나의 fold에 저장
	 * @return	fold 개수
	 */
	public int getNumFold() {
		return this.mFolds.size();
	}

	/*
	 * 전역변수 mInstances 객체 삭제
	 */
	public void deleteInstances() {
		this.mInstances.clear();
	}

}
