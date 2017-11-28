<%@ page contentType="text/html; charset=UTF-8" language="java" trimDirectiveWhitespaces="true" pageEncoding="UTF-8" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<style type="text/css">
#_mc_createModal .form-group label {
	width: 127px;
}
</style>
<div id="_mc_createModal" class="modal fade" role="dialog">
	<div class="modal-dialog" style="width:471px;">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<h4 class="modal-title">모델 설정</h4>
			</div>
			<div class="modal-body"  style="overflow-y:scroll;height:600px;">
				<div class="form-horizontal" id="_mc_model">
				</div>
				<div class="modal-footer">
					<button class="btn btn-default" id="_mc_btnSubmit">수정</button>
					<button class="btn btn-default" id="_mc_btnCancel">취소</button>
				</div>
			</div>
		</div>
	</div>
</div>

