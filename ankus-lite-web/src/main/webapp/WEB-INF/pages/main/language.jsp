<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<style type="text/css">
._lang_w300 {
	width: 300px;
}
</style>
<div id="_lang_Modal" class="modal fade" role="dialog">
	<div class="modal-dialog _lang_w300">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<h4 class="modal-title"><spring:message code="LANGUAGE_MODAL_MAIN_TITLE"/></h4>
			</div>
			<div class="modal-body">
				<div class="form-horizontal">
					<input type="hidden" id="_hm_id"/>
					<div class="form-group _stype _stypeR">
						<label class="col-sm-4 control-label" style="font-size: 0.9em;"><spring:message code="LANGUAGE_MODAL_TITLE_SELECT_LANGUAGE"/></label>
						<div class="col-sm-8">
							<select id="_lang_selLang" class="form-control">
								<option value="en">ENGLISH</option>
								<option value="ko">한국어</option>
								<option value="ja">日本</option>
							</select>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button class="btn btn-default" id="_lang_btnSubmit"><spring:message code="COMMON_APPLY"/></button>
					<button class="btn btn-default" id="_lang_btnCancel"><spring:message code="COMMON_CANCEL"/></button>
				</div>	
			</div>
		</div>
	</div>
</div>