<%@ page contentType="text/html; charset=UTF-8" language="java" trimDirectiveWhitespaces="true" pageEncoding="UTF-8" %>
<style>
.datepicker {
	z-index : 1100 !important;
}
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
	<h4 class="title" style="border:1px;">쇼핑몰자료조회</h4>
	<div class="greyRule"><hr/></div>
	<div class="form-inline" style="margin-bottom:10px;">
		<div class="forms">
			<label class="form_label">일자 : </label>
			<input type="text" id="_ml_searchFrom" class="form-control" />
			<input type="text" id="_ml_searchTo" class="form-control"/>	
			<select class="form-control" id="_ml_searchType" style="padding-left:10px;">				
				<option value="brand">브랜드</option>	
				<option value="goods_nm">상품명</option>
			</select>
			<input type="text" id="_ml_searchItem" class="form-control"/>
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
						<label for="_ml_shopng_knd" class="col-sm-2 control-label">쇼핑몰</label>
						<div class="col-sm-10">
							<input type="text" class="form-control" id="_ml_shopng_knd" disabled="disabled"/>
						</div>
					</div>
					<div class="form-group">
						<label for="_ml_brand" class="col-sm-2 control-label">브랜드</label>
						<div class="col-sm-4">
							<input type="text" class="form-control" id="_ml_brand" disabled="disabled"/>
						</div>
						<label for="_ml_item" class="col-sm-2 control-label">아이템</label>
						<div class="col-sm-4">
							<input type="text" class="form-control" id="_ml_item" disabled="disabled"/>
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
							<input class="form-control" id="_ml_goods_url" disabled="disabled"></input>
						</div>
					</div>
					<div class="form-group">
						<label for="_ml_recommand" class="col-sm-2 control-label">추천</label>
						<div class="col-sm-4">
							<input class="form-control" id="_ml_recommand" disabled="disabled"></input>
						</div>
						<label for="_ml_delivery" class="col-sm-2 control-label">배송</label>
						<div class="col-sm-4">
							<input class="form-control" id="_ml_delivery" disabled="disabled"></input>
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

