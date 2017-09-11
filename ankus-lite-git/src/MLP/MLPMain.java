package MLP;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Hashtable;
import java.util.List;

import CorePackage.Attribute;
import CorePackage.Evaluation;
import CorePackage.Instance;
import CorePackage.Instances;

public class MLPMain {

	private static Instances	mInstances = null;
	
	public static void main(String[] args) throws IOException {
		
		mInstances = new Instances();
		
		// 1.속성유형 설정
//		LoadingFromAttributeFile("DataSets/weather_header.csv");
//		LoadingFromAttributeFile("DataSets/weather_mix_header.csv");
		LoadingFromAttributeFile("DataSets/iris_header.csv");
		
		// 2.입력데이터 불러오기
//		mInstances.LoadingFromCSVFile("DataSets/weather.csv");
//		mInstances.LoadingFromCSVFile("DataSets/weather_mix.csv");
		mInstances.LoadingFromCSVFile("DataSets/iris.csv");
		
		System.out.println("===========================================");
		System.out.println("데이터 개수: "+mInstances.getNumData());
//		System.out.println(mInstances.toStringData("index"));
//		System.out.println(mInstances.toStringData("name"));
				
		// 속성 아이디로 클래스 속성 설정 
//		mInstances.setClassAttributeName("play");
		mInstances.setClassAttributeName("class");		
		
		System.out.println("선택된 클래스 속성명: "+mInstances.getClassAttributeName());
		System.out.println("선택된 클래스 속성 인덱스:  "+mInstances.getClassAttributeIndex());
		
		System.out.println("===========================================");
		
		mInstances.setFolds(1);
		
		System.out.println("=========================================== 분할된 데이터 집합 출력 ");		
		mInstances.toStringFolds();

		System.out.println("===========================================");
		MultilayerPerceptron mlpModel = new MultilayerPerceptron(mInstances);
		//미구
		mlpModel.setTestFold(0);
		
		mlpModel.buildClassifier();
		
		System.out.println("=========================================== 테스트 데이터의 분류 결과 출력");
		
		ArrayList<Double> predictList = new ArrayList<Double>();
		for(int i = 0; i< mInstances.getNumData() ; i++){
			System.out.println("===> "+i+" : "+mInstances.getAttributeObjs().get(mInstances.getClassAttributeIndex()).getNominalValue(mlpModel.classifer(mInstances.getAttributeObjs(), mInstances.getInstance(i))));
//			mlpModel.classifer(mInstances.getAttributeObjs(), mInstances.getInstance(i));
			predictList.add(mlpModel.classifer(mInstances.getAttributeObjs(), mInstances.getInstance(i)));
		}
		
		Evaluation cm = new Evaluation();
		cm.getCMResult(mInstances, predictList);
	}


	/**
	 * 각 속성이름과 유형을 파일로부터 입력받아 attribute 객체에 세팅
	 * @param filePath		파일경로
	 * @throws IOException
	 */
	private static void LoadingFromAttributeFile(String filePath) throws IOException {
		
		BufferedReader reader = new BufferedReader(new FileReader(filePath));
		
		String s;
		String[] token;
		int index=0;
		
		while((s = reader.readLine()) != null){
			token = s.split(",");
			mInstances.addAttribute(index,token[0],token[1]);
			index++;
		}
		
		System.out.println("===========================================");
		System.out.println("속성 개수: "+mInstances.getNumAttributes("all"));
		System.out.println("기호적 속성 개수: "+mInstances.getNumAttributes("nominal"));
		System.out.println("수치적 속성 개수: "+mInstances.getNumAttributes("numeric"));
		System.out.println("속성정보 출력: \n"+mInstances.toStringAttributes());
	}

}
