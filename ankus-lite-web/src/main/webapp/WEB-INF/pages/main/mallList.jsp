<%@ page contentType="text/html; charset=UTF-8" language="java" trimDirectiveWhitespaces="true" pageEncoding="UTF-8" %>
<style>
.datepicker {
	z-index : 1100 !important;
}
</style>
<div class="ui-layout-center">
	<div class="form-inline" style="margin-bottom:10px;">
		<div class="forms">
			<label class="form_label">일자 : </label>
			<input type="text" id="_ml_searchFrom" class="form-control" />
			<input type="text" id="_ml_searchTo" class="form-control"/>	
			<select class="form-control" id="_ml_searchShopng_knd" style="padding-left:10px;">
				<option value="">구분</option>
				<!-- option value="elevenst">11번가</option-->
				<option value="gmarket">G마켓</option>	
				<!-- option value="auction">옥션</option-->						
			</select>	
			<label class="form_label" style="padding-left:10px;">구매평 : </label>		
			<input type="text" id="_ml_searchReview" class="form-control"/>
			<button class="btn btn-default" id="_ml_btnSearch">조회</button>
		</div>
	</div>	
	<table id="_ml_grid"></table>
	<div id="_ml_pager"></div>
</div>

<div id="_ml_Modal" class="modal fade" role="dialog">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<h4 class="modal-title">쇼핑몰 자료조회 상세보기</h4>
			</div>
			<div class="modal-body">
				<div class="form-horizontal">
					<div class="form-group">
						<label for="_ml_purch_de" class="col-sm-2 control-label">구매일자</label>
						<div class="col-sm-10">
							<input type="text" class="form-control" id="_ml_purch_de" disabled="disabled"/>
						</div>
					</div>						
					<div class="form-group">
						<label for="_ml_goods_nm" class="col-sm-2 control-label">상품명</label>
						<div class="col-sm-10">
							<input type="text" class="form-control" id="_ml_goods_nm" disabled="disabled"/>
						</div>
					</div>
					<div class="form-group">
						<label for="_ml_goods_review" class="col-sm-2 control-label">구매평</label>
						<div class="col-sm-10">
							<textarea rows="" cols="" class="form-control" id="_ml_goods_review" style="height:250px;" disabled="disabled"></textarea>
						</div>
					</div>		
					<div class="form-group">
						<label for="_ml_goods_url" class="col-sm-2 control-label">상품URL</label>
						<div class="col-sm-10">
							<input rows="" cols="" class="form-control" id="_ml_goods_url" disabled="disabled"></input>
						</div>
					</div>			
					<div class="form-group">
						<label for="_ml_seler_nm" class="col-sm-2 control-label">판매자</label>
						<div class="col-sm-10">
							<input rows="" cols="" class="form-control" id="_ml_seler_nm" disabled="disabled"></input>
						</div>
					</div>
					<div class="form-group">
						<label for="_ml_tel_no" class="col-sm-2 control-label">연락처</label>
						<div class="col-sm-10">
							<input rows="" cols="" class="form-control" id="_ml_tel_no" disabled="disabled"></input>
						</div>
					</div>													
				</div>
			</div>
			<div class="modal-footer">						
				<button class="btn btn-default" id="_ml_btnCancel">확인</button>
			</div>
		</div>
	</div>
</div>

