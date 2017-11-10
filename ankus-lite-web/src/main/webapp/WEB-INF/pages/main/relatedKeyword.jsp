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
	<h4 class="title" style="border:1px;">키워드 연관 분석(사회이슈 및 트렌드 키워드)</h4>
	<div class="greyRule"><hr/></div>
	<div class="form-inline" style="margin-bottom:10px;">	
		<div class="forms">
			<label class="form_label">일자 : </label>
			<select class="form-control" id="_rw_years" class="form-control" style="width:150px;">
				<option value="">년도 선택</option>
			</select>	
			<select class="form-control" id="_rw_terms" class="form-control" style="width:150px;">
				<option value="">기간 선택</option>
			</select>
			<button class="btn btn-default" id="_rw_btnSearch">조회</button>
			<input type="hidden" class="form-control" id="_rw_prdt_strt_dt"/>			
		</div>
	</div>	
	<table id="_rw_grid"></table>
	<div id="_rw_pager"></div>
</div>

<!-- div id="_rw_Modal" class="modal fade" role="dialog">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<h4 class="modal-title">블로그 자료 조회</h4>
			</div>
			<div class="modal-body">
				<div class="form-horizontal">	
					<div class="form-group">
						<label for="_rw_doc_sj" class="col-sm-2 control-label">제목</label>
						<div class="col-sm-10">
							<input type="text" class="form-control" id="_rw_doc_sj" disabled="disabled"/>
						</div>
					</div>
					<div class="form-group">
						<label for="_rw_kwrd_sj" class="col-sm-2 control-label"style="word-break:keep-all;">제목 키워드</label>
						<div class="col-sm-10">
							<input rows="" cols="" class="form-control" id="_rw_kwrd_sj" disabled="disabled"></input>
						</div>
					</div>
					<div class="form-group">
						<label for="_rw_blog_wrter" class="col-sm-2 control-label" style="word-break:keep-all;">작성자  아이디</label>
						<div class="col-sm-10">
							<input rows="" cols="" class="form-control" id="_rw_blog_wrter" disabled="disabled"></input>
						</div>
					</div>
					<div class="form-group">
						<label for="_rw_doc_cret_dt" class="col-sm-2 control-label">작성일</label>
						<div class="col-sm-10">
							<input type="text" class="form-control" id="_rw_doc_cret_dt" disabled="disabled"/>
						</div>
					</div>					
					<div class="form-group">
						<label for="_rw_http_addr" class="col-sm-2 control-label" style="word-break:keep-all;">블로그 주소</label>
						<div class="col-sm-10">
							<input rows="" cols="" class="form-control" id="_rw_http_addr" disabled="disabled"></input>
						</div>
					</div>
					<div class="form-group">
						<label for="_rw_doc_cn" class="col-sm-2 control-label">내용</label>
						<div class="col-sm-10">
							<textarea rows="" cols="" class="form-control" id="_rw_doc_cn" style="height:250px;" disabled="disabled"></textarea>
						</div>
					</div>
					<div class="form-group">
						<label for="_rw_kwrd" class="col-sm-2 control-label" style="word-break:keep-all;">내용 키워드</label>
						<div class="col-sm-10">
							<input rows="" cols="" class="form-control" id="_rw_kwrd" disabled="disabled"></input>
						</div>
					</div>										
				</div>
			</div>
			<div class="modal-footer">						
				<button class="btn btn-default" id="_rw_btnCancel">확인</button>
			</div>
		</div>
	</div>
</div-->

