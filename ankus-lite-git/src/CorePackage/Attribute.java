package CorePackage;

import java.io.Serializable;
import java.util.Hashtable;
import java.util.List;

/**
 * 입력데이터의 속성 클래스
 * @author onycom  빅데이터사업부 빅데이터분석컬설팅팀 류정우
 * @version ver0.01
 */
public class Attribute implements Serializable{
	
	private int							mID;		// 속성 아이디
	private	String						mName;		// 속성명
	private String						mType;		// 속성 유형 {numeric(수치형), nominal(기호형)}
	private Hashtable<Double,String>	mNominalValues;	// 기호형 속성 값
	private boolean						mIsClass;	// 클래스 속성 여부
	
	/**
	 * 생성자
	 * 속성유형이 nominal인 경우, 속성 값을 저장할 수 있는 전역변수 m_nominal_values 객체 생성
	 * @param id    속성아이디
	 * @param name	속성이름
	 * @param type	속성유형
	 */
	public Attribute(int id, String name, String type) {
		this.mID 	= id;
		this.mName = name;
		this.mType = type;
		
		this.mNominalValues = new Hashtable<Double,String> ();
	}
	
	/**
	 * nominal 속성 값 추가 함수
	 * @param index	속성 값 인덱스
	 * @param value	속성 값
	 */
	public void addNominalValue(double index, String value){
		this.mNominalValues.put(index, value);
	}

	/**
	 * 속성 유형(numeric(수치형), nominal(기호형)) 반환 함수 
	 * @return	속성유형 반환
	 */
	public String getAttributeType() {
		return this.mType;
	}

	/**
	 * 속성ID 반환 함수 (속성ID 부여 기준은 메모리에 불러온 순서)
	 * @return	속성 ID 반환
	 */
	public int getAttributeID() {
		return this.mID;
	}

	/**
	 * 속성이름 반환 함수
	 * @return	속성이름 반환
	 */
	public String getAttributeName() {
		return this.mName;
	}

	/**
	 * 입력된 인덱스를 갖는 기호 속성의 속성 값 반환
	 * @param nominal_value_index	기호 속성 값의 인덱스
	 * @return	해당 인덱스의 속성 값
	 */
	public String getNominalValueName(double nominal_value_index) {
		return this.mNominalValues.get(nominal_value_index);
	}

	/**
	 * @param valIndex	기호 속성 값의 인덱스
	 * @return	해당 인덱스의 기호 속성 값
	 */
	public String getNominalValue(double valIndex) {
		return this.mNominalValues.get(valIndex);
	}

	/**
	 * @return 기호 속성 값의 개수
	 */
	public int getNumNominalValues() {
		return this.mNominalValues.size();
	}

}
