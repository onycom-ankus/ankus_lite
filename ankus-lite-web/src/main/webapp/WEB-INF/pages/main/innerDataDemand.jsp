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
	<h4 class="title" style="border:1px;">내부데이터수요예측</h4>
	<div class="greyRule"><hr/></div>
	<div class="form-inline" style="margin-bottom:10px;">
		<div class="forms">
			<label class="form_label">일자 : </label>
			<input type="text" id="_idd_searchFrom" class="form-control" />
			<input type="text" id="_idd_searchTo" class="form-control"/>				
			<select class="form-control" id="_idd_searchType">
				<option value="제품명" selected="selected">제품명</option>
				<option value="제품코드">제품코드</option>						
			</select>			
			<input type="text" id="_idd_searchItem" class="form-control" />
			<button class="btn btn-default" id="_idd_btnSearch">조회</button>
		</div>
	</div>
	<button id="_idd_btnCreate" class="btn btn-info btn-xs browser_button">등록</button>
	<button id="_idd_btnDelete" class="btn btn-info btn-xs browser_button">삭제</button>
	<button id="_idd_btnExcel" class="btn btn-info btn-xs browser_button">엑셀</button>
	<table id="_idd_grid"></table>
	<div id="_idd_pager"></div>
</div>

<div id="_idd_createModal" class="modal fade" role="dialog">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<h4 class="modal-title" id="_idd_title">내부데이터 수요예측 등록</h4>
			</div>
			<div class="modal-body" style="overflow-y:scroll;height:600px;">
				<div class="form-horizontal">
					<div class="form-group">
						<label for="_idd_date" class="col-sm-2 control-label">일자</label>
						<div class="col-sm-10">
							<input type="text" class="form-control" id="_idd_date"/>
						</div>
						
					</div>
					<div class="form-group">
						<label for="_idd_prdt_cd" class="col-sm-2 control-label">제품코드</label>
						<div class="col-sm-10">
							<input type="text" class="form-control" id="_idd_prdt_cd"/>
						</div>
					</div>					
					<div class="form-group">
						<label for="_idd_prdt_nm" class="col-sm-2 control-label">제품명</label>
						<div class="col-sm-10">
							<input type="text" class="form-control" id="_idd_prdt_nm"/>
						</div>
					</div>
					<div class="form-group">
						<label for="_idd_imp_prdt_stat" class="col-sm-2 control-label" style="font-size:0.9em;">수입제품<br/>여부</label>
						<div class="col-sm-10">
							<input type="text" class="form-control" id="_idd_imp_prdt_stat"/>
						</div>
					</div>
					<div class="form-group">
						<label for="_idd_brand" class="col-sm-2 control-label">브랜드</label>
						<div class="col-sm-10">
							<input type="text" class="form-control" id="_idd_brand"/>
						</div>
					</div>
					<div class="form-group">
						<label for="_idd_item" class="col-sm-2 control-label">품목</label>
						<div class="col-sm-10">
							<input type="text" class="form-control" id="_idd_item"/>
						</div>
					</div>
					<div class="form-group">
						<label for="_idd_std" class="col-sm-2 control-label">규격</label>
						<div class="col-sm-10">
							<input type="text" class="form-control" id="_idd_std"/>
						</div>
					</div>
					<div class="form-group">
						<label for="_idd_pack" class="col-sm-2 control-label">포장</label>
						<div class="col-sm-10">
							<input type="text" class="form-control" id="_idd_pack"/>
						</div>
					</div>
					<div class="form-group">
						<label for="_idd_ddc" class="col-sm-2 control-label" style="font-size:0.9em;">지정유통처</label>
						<div class="col-sm-10">
							<input type="text" class="form-control" id="_idd_ddc"/>
						</div>
					</div>
					<div class="form-group">
						<label for="_idd_sale_type" class="col-sm-2 control-label">판매형태</label>
						<div class="col-sm-10">
							<input type="text" class="form-control" id="_idd_sale_type"/>
						</div>
					</div>
					
					<div class="form-group" style="font-size:0.9em;">
						<label for="_idd_sale_cnt" class="col-sm-2 control-label">판매수량</label>
						<div class="col-sm-2">
							<input type="text" class="form-control" id="_idd_sale_cnt"/>
						</div>							
						<label for="_idd_supply_cnt" class="col-sm-2 control-label">공급수량</label>
						<div class="col-sm-2">
							<input type="text" class="form-control" id="_idd_supply_cnt"/>
						</div>
						<label for="_idd_sale_on_mkt_cnt" class="col-sm-2 control-label">온라인<br/>오픈마켓</label>
						<div class="col-sm-2">
							<input type="text" class="form-control" id="_idd_sale_on_mkt_cnt"/>
						</div>
					</div>
					<div class="form-group" style="font-size:0.9em;">
						<label for="_idd_sale_on_home_cnt" class="col-sm-2 control-label">온라인<br/>홈쇼핑</label>
						<div class="col-sm-2">
							<input type="text" class="form-control" id="_idd_sale_on_home_cnt"/>
						</div>
						<label for="_idd_sale_on_bmkt_cnt" class="col-sm-2 control-label">온라인<br/>대형마트</label>
						<div class="col-sm-2">
							<input type="text" class="form-control" id="_idd_sale_on_bmkt_cnt"/>
						</div>
						<label for="_idd_sale_on_dpt_cnt" class="col-sm-2 control-label">온라인<br/>백화점</label>
						<div class="col-sm-2">
							<input type="text" class="form-control" id="_idd_sale_on_dpt_cnt"/>
						</div>
					</div>
					<div class="form-group" style="font-size:0.9em;">
						<label for="_idd_sale_on_mall_cnt" class="col-sm-2 control-label">온라인<br/>자사몰</label>
						<div class="col-sm-2">
							<input type="text" class="form-control" id="_idd_sale_on_mall_cnt"/>
						</div>
						<label for="_idd_sale_on_etc_cnt" class="col-sm-2 control-label">온라인<br/>기타</label>
						<div class="col-sm-2">
							<input type="text" class="form-control" id="_idd_sale_on_etc_cnt"/>
						</div>	
						<label for="_idd_sale_off_mkt_cnt" class="col-sm-2 control-label">오프라인<br/>슈퍼</label>
						<div class="col-sm-2">
							<input type="text" class="form-control" id="_idd_sale_off_mkt_cnt"/>
						</div>						
					</div>
					<div class="form-group" style="font-size:0.9em;">
						<label for="_idd_sale_off_24mkt_cnt" class="col-sm-2 control-label">오프라인<br/>편의점</label>
						<div class="col-sm-2">
							<input type="text" class="form-control" id="_idd_sale_off_24mkt_cnt"/>
						</div>	
						<label for="_idd_sale_off_rmkt_cnt" class="col-sm-2 control-label">오프라인<br/>휴게소</label>
						<div class="col-sm-2">
							<input type="text" class="form-control" id="_idd_sale_off_rmkt_cnt"/>
						</div>
						<label for="_idd_sale_off_md_cnt" class="col-sm-2 control-label">오프라인<br/>군납</label>
						<div class="col-sm-2">
							<input type="text" class="form-control" id="_idd_sale_off_md_cnt"/>
						</div>
					</div>
					<div class="form-group" style="font-size:0.9em;">							
						<label for="_idd_sale_off_bmkt_cnt" class="col-sm-2 control-label">오프라인<br/>대형마트</label>
						<div class="col-sm-2">
							<input type="text" class="form-control" id="_idd_sale_off_bmkt_cnt"/>
						</div>
						<label for="_idd_sale_off_rt_cnt" class="col-sm-2 control-label">오프라인<br/>레스토랑</label>
						<div class="col-sm-2">
							<input type="text" class="form-control" id="_idd_sale_off_rt_cnt"/>
						</div>	
						<label for="_idd_sale_off_dpt_cnt" class="col-sm-2 control-label">오프라인<br/>백화점</label>
						<div class="col-sm-2">
							<input type="text" class="form-control" id="_idd_sale_off_dpt_cnt"/>
						</div>						
					</div>
					<div class="form-group" style="font-size:0.9em;">
						<label for="_idd_sale_off_etc_cnt" class="col-sm-2 control-label">오프라인<br/>기타</label>
						<div class="col-sm-2">
							<input type="text" class="form-control" id="_idd_sale_off_etc_cnt"/>
						</div>
						<label for="_idd_sale_etc_emp_cnt" class="col-sm-2 control-label">유통기타<br/>직원구매</label>
						<div class="col-sm-2">
							<input type="text" class="form-control" id="_idd_sale_etc_emp_cnt"/>
						</div>
						<label for="_idd_sale_etc_agcy_cnt" class="col-sm-2 control-label">유통기타<br/>대리점</label>
						<div class="col-sm-2">
							<input type="text" class="form-control" id="_idd_sale_etc_agcy_cnt"/>
						</div>	
					</div>
					<div class="form-group" style="font-size:0.9em;">
						<label for="_idd_sale_etc_deal_cnt" class="col-sm-2 control-label">유통기타<br/>특약점</label>
						<div class="col-sm-2">
							<input type="text" class="form-control" id="_idd_sale_etc_deal_cnt"/>
						</div>
						<label for="_idd_sale_etc_imp_cnt" class="col-sm-2 control-label">유통기타<br/>해외수출</label>
						<div class="col-sm-2">
							<input type="text" class="form-control" id="_idd_sale_etc_imp_cnt"/>
						</div>
					</div>
				</div>				
			</div>
			<div class="modal-footer">
				<button class="btn btn-default" id="_idd_btnSave">등록</button>
				<button class="btn btn-default" id="_idd_btnCancel">취소</button>
			</div>
		</div>
	</div>
</div>
<div id="_idd_excelModal" class="modal fade" role="dialog">
<div class="modal-dialog">
		<div class="modal-content">
			<form id="_idd_form" enctype="multipart/form-data">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal">&times;</button>
					<h4 class="modal-title" id="_idd_title">CSV파일 등록</h4>
				</div>
				<div class="modal-body">
					<div class="form-horizontal">
						<div class="form-group">						
							<label for="_idd_excelImport" class="col-sm-3 control-label" style="font-size: 0.9em;">파일선택</label>
							<div class="col-sm-7">
								<input type="file" class="form-control" name="file" id="_idd_file" style="display: none;"/>
								<input type="text" class="form-control" id="_idd_fileView" readonly="readonly"/>
							</div>
							<div class="col-sm-2" style="margin-left: -25px;">
								<button class="btn btn-default" id="_idd_btnFindFile">찾기</button>
							</div>
						</div>
					</div>				
				</div>
				<div class="modal-footer">
					<button class="btn btn-default" id="_idd_btnExcelSave">저장</button>
					<button class="btn btn-default" id="_idd_btnExcelCancel">취소</button>
				</div>
			</form>
		</div>
	</div>
</div>
