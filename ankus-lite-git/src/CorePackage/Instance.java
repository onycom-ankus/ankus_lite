package CorePackage;

import java.io.Serializable;

/**
 * 입력데이터 클래스
 * @author onycom 빅데이터사업부 빅데이터분석컬설팅팀 류정우
 */
public class Instance implements Serializable{

	private int		 mID;
	private double[] mDatum = null;	// 데이터
	
	/**
	 * 생성자
	 * @param id	인스턴스(데이터) 아이디
	 * @param datum	인스턴스(데이터)
	 */
	public Instance(int id, double[] datum) {
		this.mID = id;
		this.mDatum = new double [datum.length];
		for(int i=0 ; i<datum.length ; i++){
			mDatum[i] = datum[i];
		}
	}

	/**
	 * 입력된 속성 ID의 속성 값 반환 함수
	 * @param attributeID 속성 아이디
	 * @return 해당 속성의 값 
	 */
	public double getValue(int attributeID) {
		return this.mDatum[attributeID];
	}
	
	/**
	 * 인스턴스(데이터) ID 반환 함수
	 * @return 인스턴스(데이터) ID 
	 */
	public int getID(){
		return this.mID;
	}

}
