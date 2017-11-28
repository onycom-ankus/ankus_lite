<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
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
	<h4 class="title" style="border:1px;">내부데이터관리</h4>
	<div class="greyRule"><hr/></div>
	<div class="form-inline" style="margin-bottom:10px;">
		<div class="forms">		
			<button class="btn btn-default" id="_dm_btnDel">삭제</button>						
		</div>
	</div>
	<div class="form-inline" style="margin-bottom:10px;">
		<div class="forms">
			<label class="form_label">데이터 저장소 : </label>
			<select id="_dm_data_nm" class="form-control">
			</select>
			<button class="btn btn-default" id="_dm_btnSearch">조회</button>
		</div>
	</div>
	<table id="_dm_grid"></table>
	<div id="_dm_pager"></div>
</div>