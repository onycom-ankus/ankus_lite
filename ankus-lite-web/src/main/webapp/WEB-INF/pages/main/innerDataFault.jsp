<%@ page contentType="text/html; charset=UTF-8" language="java" trimDirectiveWhitespaces="true" pageEncoding="UTF-8" %>
<style>
.greyRule { 
background: #CECECE; 
width: 1280px; 
height: 1px; 
padding: 0;
margin-bottom:10px;
} 
.greyRule hr { 
display: none; 
} 
</style>
<div class="ui-layout-center">
	<h4 class="title" style="border:1px;">내부데이터불량원인</h4>
	<div class="greyRule"><hr/></div>
	<div class="form-inline" style="margin-bottom:10px;">
		<div class="forms">
			<label class="form_label">일자 : </label>
			<input type="text" id="_idf_searchFrom" class="form-control" />
			<input type="text" id="_idf_searchTo" class="form-control"/>				
			<select class="form-control" id="_idf_searchType">
				<option value="제품명" selected="selected">제품명</option>
				<option value="제품코드">제품코드</option>						
			</select>			
			<input type="text" id="_idf_searchItem" class="form-control" />
			<button class="btn btn-default" id="_idf_btnSearch">조회</button>
		</div>
	</div>
	<button id="_idf_btnCreate" class="btn btn-info btn-xs browser_button">등록</button>
	<button id="_idf_btnDelete" class="btn btn-info btn-xs browser_button">삭제</button>
	<button id="_idf_btnExcel" class="btn btn-info btn-xs browser_button">엑셀</button>
	<table id="_idf_grid"></table>
	<div id="_idf_pager"></div>
</div>

<div id="_idf_createModal" class="modal fade" role="dialog">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<h4 class="modal-title" id="_idf_title">내부데이터 불량원인 등록</h4>
			</div>
			<div class="modal-body" style="overflow-y:scroll;height:600px;">
				<div class="form-horizontal">
					<div class="form-group">
						<input type="hidden" class="form-control" id="_idf_seq"/>
						<label for="_idf_date" class="col-sm-2 control-label">일자</label>
						<div class="col-sm-10">
							<input type="text" class="form-control" id="_idf_date"/>
						</div>
					</div>
					<div class="form-group">
						<label for="_idf_prdt_cd" class="col-sm-2 control-label">제품코드</label>
						<div class="col-sm-10">
							<input type="text" class="form-control" id="_idf_prdt_cd"/>
						</div>
					</div>					
					<div class="form-group">
						<label for="_idf_prdt_nm" class="col-sm-2 control-label">제품명</label>
						<div class="col-sm-10">
							<input type="text" class="form-control" id="_idf_prdt_nm"/>
						</div>
					</div>
					<div class="form-group">
						<label for="_idf_imp_prdt_stat" class="col-sm-2 control-label" style="font-size:0.9em;">수입제품<br/>여부</label>
						<div class="col-sm-10">
							<input type="text" class="form-control" id="_idf_imp_prdt_stat"/>
						</div>
					</div>
					<div class="form-group">
						<label for="_idf_brand" class="col-sm-2 control-label">브랜드</label>
						<div class="col-sm-10">
							<input type="text" class="form-control" id="_idf_brand"/>
						</div>
					</div>
					<div class="form-group">
						<label for="_idf_item" class="col-sm-2 control-label">품목</label>
						<div class="col-sm-10">
							<input type="text" class="form-control" id="_idf_item"/>
						</div>
					</div>
					<div class="form-group">
						<label for="_idf_std" class="col-sm-2 control-label">규격</label>
						<div class="col-sm-10">
							<input type="text" class="form-control" id="_idf_std"/>
						</div>
					</div>
					<div class="form-group">
						<label for="_idf_pack" class="col-sm-2 control-label">포장</label>
						<div class="col-sm-10">
							<input type="text" class="form-control" id="_idf_pack"/>
						</div>
					</div>
					<div class="form-group">
						<label for="_idf_ddc" class="col-sm-2 control-label" style="font-size:0.9em;">지정유통처</label>
						<div class="col-sm-10">
							<input type="text" class="form-control" id="_idf_ddc"/>
						</div>
					</div>
					<div class="form-group">
						<label for="_idf_sale_type" class="col-sm-2 control-label">판매형태</label>
						<div class="col-sm-10">
							<input type="text" class="form-control" id="_idf_sale_type"/>
						</div>
					</div>
					<div class="form-group">
						<label for="_idf_dpsl_cnt" class="col-sm-2 control-label">폐기수량</label>
						<div class="col-sm-10">
							<input type="text" class="form-control" id="_idf_dpsl_cnt"/>
						</div>
					</div>	
					<div class="form-group">
						<label for="_idf_ocrc" class="col-sm-2 control-label">발생지역</label>
						<div class="col-sm-10">
							<input type="text" class="form-control" id="_idf_ocrc"/>
						</div>
					</div>	
					<div class="form-group">
						<label for="_idf_bad_item" class="col-sm-2 control-label">불량항목</label>
						<div class="col-sm-10">
							<input type="text" class="form-control" id="_idf_bad_item"/>
						</div>
					</div>
					<div class="form-group">
						<label for="_idf_bad_kwrd" class="col-sm-2 control-label" style="font-size:0.9em;">불량키워드</label>
						<div class="col-sm-10">
							<input type="text" class="form-control" id="_idf_bad_kwrd"/>
						</div>
					</div>	
					<div class="form-group">
						<label for="_idf_bad_ctnt" class="col-sm-2 control-label">불량내용</label>
						<div class="col-sm-10">
							<textarea class="form-control" id="_idf_bad_ctnt" style="height:250px;"></textarea>
						</div>
					</div>
				</div>				
			</div>
			<div class="modal-footer">
				<button class="btn btn-default" id="_idf_btnSave">등록</button>
				<button class="btn btn-default" id="_idf_btnCancel">취소</button>
			</div>
		</div>
	</div>
</div>
<div id="_idf_excelModal" class="modal fade" role="dialog">
<div class="modal-dialog">
		<div class="modal-content">
			<form id="_idf_form" enctype="multipart/form-data">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal">&times;</button>
					<h4 class="modal-title" id="_idf_title">CSV파일 등록</h4>
				</div>
				<div class="modal-body">
					<div class="form-horizontal">
						<div class="form-group">						
							<label for="_idf_excelImport" class="col-sm-3 control-label" style="font-size: 0.9em;">파일선택</label>
							<div class="col-sm-7">
								<input type="file" class="form-control" name="file" id="_idf_file" style="display: none;"/>
								<input type="text" class="form-control" id="_idf_fileView" readonly="readonly"/>
							</div>
							<div class="col-sm-2" style="margin-left: -25px;">
								<button class="btn btn-default" id="_idf_btnFindFile">찾기</button>
							</div>
						</div>
					</div>				
				</div>
				<div class="modal-footer">
					<button class="btn btn-default" id="_idf_btnExcelSave">저장</button>
					<button class="btn btn-default" id="_idf_btnExcelCancel">취소</button>
				</div>
			</form>
		</div>
	</div>
</div>

