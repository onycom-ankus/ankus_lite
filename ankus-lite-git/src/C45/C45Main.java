package C45;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.util.Hashtable;
import java.util.List;

import CorePackage.Attribute;
import CorePackage.Instance;
import CorePackage.Instances;

public class C45Main {

	private static Instances	mInstances = null;
	
	public static void main(String[] args) throws IOException {
		
		C45DecisionTree dtModel = null;
		
		
		mInstances = new Instances();
		
		// 1.속성유형 설정
		//LoadingFromAttributeFile("D:/workspace/DataSets/weather_header.txt");
		//LoadingFromAttributeFile("D:/workspace/DataSets/weather_header_mix.txt");
		LoadingFromAttributeFile("D:/workspace/DataSets/iris_header.txt");
		
		// 2.입력데이터 불러오기
		//mInstances.LoadingFromCSVFile("D:/workspace/DataSets/weather_nominal.csv");
		//mInstances.LoadingFromCSVFile("D:/workspace/DataSets/weather_mix.csv");
		mInstances.LoadingFromCSVFile("D:/workspace/DataSets/iris.txt");
		
		System.out.println("===========================================");
		System.out.println("데이터 개수: "+mInstances.getNumData());
		System.out.println(mInstances.toStringData("index"));
		System.out.println(mInstances.toStringData("name"));
				
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
		dtModel = new C45DecisionTree(mInstances);		
		
		dtModel.setTestFold(0);		// 테스트데이터로 사용할 fold 인덱스 설정
		dtModel.buildClassifier();  // 의사결정트리 생성
		// 생성된 트리 출력
		dtModel.toStringTree();

		// 테스트 데이터에 대한 분류
		for(int i=0; i<mInstances.getNumData() ; i++){
			dtModel.classify(mInstances.getInstance(i));
			// 예측 클래스 반환
			System.out.println("********* "+dtModel.getPredicClass());
			// 각 클래스의 likelihood 반환
			dtModel.getClassLikehood();
			System.out.println("********* "+dtModel.toStringClassLikehood());
			// 규칙 조건절 반환
			System.out.println("********* "+dtModel.getRuleCond());
		}
		
		// 모델 객체화
      try {
          FileOutputStream model = new FileOutputStream("D:/workspace/model/model.dt");
          ObjectOutputStream out = new ObjectOutputStream(model);
          //객체 저장하기 전에 저장된 학습데이터를 삭제
          dtModel.deleteInstances();
          out.writeObject(dtModel);
          out.close();
          model.close();
          System.out.println("모델 객체화: 객체 파일 저장 위치  D:/workspace/model/model.dt");
       }catch(IOException i) {
          i.printStackTrace();
       }
      
      dtModel = null;
      if(dtModel == null){
    	  System.out.println("dtModel 변수는  null");
      }else{
    	  System.out.println("dtModel 변수는  null이 아님...");
      }
      
      try {
          FileInputStream fileIn = new FileInputStream("D:/workspace/model/model.dt");
          ObjectInputStream in = new ObjectInputStream(fileIn);
          dtModel = (C45DecisionTree) in.readObject();
          in.close();
          fileIn.close();
       }catch(IOException i) {
          i.printStackTrace();
          return;
       }catch(ClassNotFoundException c) {
          System.out.println("Employee class not found");
          c.printStackTrace();
          return;
       }     
      
      if(dtModel == null){
    	  System.out.println("dtModel 변수는  null");
      }else{
    	  System.out.println("dtModel 변수는  null이 아님...");
    	  dtModel.toStringTree();
      }     
		
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
