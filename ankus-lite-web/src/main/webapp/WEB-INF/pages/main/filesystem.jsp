<%@ page contentType="text/html; charset=UTF-8" language="java" trimDirectiveWhitespaces="true" pageEncoding="UTF-8" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>

<div class="ui-layout-west display_none">
	<div class="form-inline">
		<label class="form_label"><spring:message code="FILESYS_HADOOP_CLUSTER"/> : </label>
		<select class="form-control input-sm" id="_fs_clusterName">			
		</select>
		<button id="_fs_btnRefresh" class="btn btn-primary btn-sm"><spring:message code="COMMON_REFRESH"/></button>
	</div>				
	<div id="_fs_jstreeAjax" style="min-height:400px;"></div>
	<div>
		<button id="_fs_btnRemaining" class="btn btn-danger btn-sm" style="float:left;"><spring:message code="FILESYS_REMAINING_DISK_SPACE"/></button>
		<div id="_fs_remainingProgress" style="width:140px; float:left; margin-left:5px; height:30px;"></div>
	</div>				
</div>
<div class="ui-layout-center display_none">
	<div>
		<button id="_fs_btnCopy" class="btn btn-info btn-xs browser_button"><spring:message code="COMMON_COPY"/></button>
		<button id="_fs_btnMove" class="btn btn-info btn-xs browser_button"><spring:message code="COMMON_MOVE"/></button>
		<button id="_fs_btnRename" class="btn btn-info btn-xs browser_button"><spring:message code="COMMON_RENAME"/></button>
		<button id="_fs_btnDelete" class="btn btn-info btn-xs browser_button"><spring:message code="COMMON_DELETE"/></button>
		<button id="_fs_btnUpload" class="btn btn-info btn-xs browser_button"><spring:message code="COMMON_UPLOAD"/></button>
		<button id="_fs_btnDownload" class="btn btn-info btn-xs browser_button"><spring:message code="COMMON_DOWNLOAD"/></button>
		<button id="_fs_btnPreview" class="btn btn-info btn-xs browser_button"><spring:message code="COMMON_PREVIEW"/></button>
	</div>
	<table id="_fs_grid"></table>
</div>
<div id="_fs_remainingModal" class="modal fade" role="dialog">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<h4 class="modal-title">HDFS <spring:message code="COMMON_INFO"/></h4>
			</div>
			<div class="modal-body">
				<dl class="dl-horizontal"><dt>HDFS URL:</dt><dd id="_fs_hdfsUrl"></dd></dl>
				<hr />
				<dl class="dl-horizontal"><dt><spring:message code="FILESYS_REMAINING_DISK_SPACE"/>(%):</dt><dd id="_fs_remainingP"></dd></dl>
				<hr />
				<dl class="dl-horizontal"><dt><spring:message code="FILESYS_TOTAL_DISK_SPACE"/>:</dt><dd id="_fs_capacity"></dd></dl>
				<dl class="dl-horizontal"><dt><spring:message code="FILESYS_DISK_USE_RATE"/>:</dt><dd id="_fs_used"></dd></dl>
				<dl class="dl-horizontal"><dt><spring:message code="FILESYS_REMAINING_DISK_SPACE"/>:</dt><dd id="_fs_remaining"></dd></dl>
				<hr />
				<dl class="dl-horizontal"><dt><spring:message code="FILESYS_LIVE_NODE"/>:</dt><dd id="_fs_liveNodes"></dd></dl>
				<dl class="dl-horizontal"><dt><spring:message code="FILESYS_DEAD_NODE"/>:</dt><dd id="_fs_deadNodes"></dd></dl>
				<hr />
				<dl class="dl-horizontal"><dt><spring:message code="FILESYS_MISSING_BLOCK"/>:</dt><dd id="_fs_missingBlocks"></dd></dl>
				<dl class="dl-horizontal"><dt><spring:message code="FILESYS_CORRUPT_BLOCK"/>:</dt><dd id="_fs_corruptBlocks"></dd></dl>
				<hr />
				<dl class="dl-horizontal"><dt><spring:message code="FILESYS_REPLICATION"/>:</dt><dd id="_fs_replication"></dd></dl>
				<dl class="dl-horizontal"><dt><spring:message code="FILESYS_BLOCK_SIZE"/>:</dt><dd id="_fs_blockSize"></dd></dl>
			</div>
			<div class="modal-footer">
				<button class="btn btn-default" data-dismiss="modal"><spring:message code="COMMON_CLOSE"/></button>
			</div>
		</div>
	</div>
</div>
<div id="_fs_infoModal" class="modal fade" role="dialog">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<h4 class="modal-title"><spring:message code="FILESYS_DIRECTORY_INFO"/></h4>
			</div>
			<div class="modal-body">
				<h5><spring:message code="FILESYS_BASE_INFO"/></h5>
				<dl class="dl-horizontal"><dt><spring:message code="COMMON_NAME"/>:</dt><dd id="_fs_infoName"></dd></dl>
				<dl class="dl-horizontal"><dt><spring:message code="COMMON_PATH"/>:</dt><dd id="_fs_infoPath"></dd></dl>
				<dl class="dl-horizontal">
					<dt><spring:message code="COMMON_TYPE"/>:</dt>
					<dd>
						<label class="radio-inline"><input type="radio" name="_fs_infoIsFile" id="_fs_infoIsFile"><spring:message code="COMMON_FILE"/></label>
						<label class="radio-inline"><input type="radio" name="_fs_infoIsFile" id="_fs_infoIsDirectory"><spring:message code="COMMON_DIRECTORY"/></label>
					</dd>
				</dl>
				<dl class="dl-horizontal"><dt><spring:message code="FILESYS_TOTAL_SIZE"/>:</dt><dd id="_fs_infoLength"></dd></dl>
				<dl class="dl-horizontal"><dt><spring:message code="COMMON_UPDT_DTTM"/>:</dt><dd id="_fs_infoModification"></dd></dl>
				<hr />
				<h5><spring:message code="FILESYS_ACCESS_AUTH"/></h5>
				<dl class="dl-horizontal">
					<dt><spring:message code="FILESYS_OWNER"/>:</dt>
					<dd>
						<label class="checkbox-inline"><input type="checkbox" id="_fs_infoOwnerRead"><spring:message code="COMMON_READ"/></label>
						<label class="checkbox-inline"><input type="checkbox" id="_fs_infoOwnerWrite"><spring:message code="COMMON_WRITE"/></label>
						<label class="checkbox-inline"><input type="checkbox" id="_fs_infoOwnerExecute"><spring:message code="COMMON_EXCUTION"/></label>
					</dd>
				</dl>
				<dl class="dl-horizontal">
					<dt><spring:message code="FILESYS_GOUP"/>:</dt>
					<dd>
						<label class="checkbox-inline"><input type="checkbox" id="_fs_infoGroupRead"><spring:message code="COMMON_READ"/></label>
						<label class="checkbox-inline"><input type="checkbox" id="_fs_infoGroupWrite"><spring:message code="COMMON_WRITE"/></label>
						<label class="checkbox-inline"><input type="checkbox" id="_fs_infoGroupExecute"><spring:message code="COMMON_EXCUTION"/></label>
					</dd>
				</dl>
				<dl class="dl-horizontal">
					<dt><spring:message code="FILESYS_ETC"/>:</dt>
					<dd>
						<label class="checkbox-inline"><input type="checkbox" id="_fs_infoOtherRead"><spring:message code="COMMON_READ"/></label>
						<label class="checkbox-inline"><input type="checkbox" id="_fs_infoOtherWrite"><spring:message code="COMMON_WRITE"/></label>
						<label class="checkbox-inline"><input type="checkbox" id="_fs_infoOtherExecute"><spring:message code="COMMON_EXCUTION"/></label>
					</dd>
				</dl>
				<hr />
				<h5><spring:message code="FILESYS_SPACE_USE_INFO"/></h5>
				<dl class="dl-horizontal"><dt><spring:message code="COMMON_READ"/>:</dt><dd id="_fs_infoBlockSize"></dd></dl>
				<dl class="dl-horizontal"><dt><spring:message code="FILESYS_DISK_QUOTA"/>:</dt><dd id="_fs_infoSpaceQuota"></dd></dl>
				<dl class="dl-horizontal"><dt><spring:message code="FILESYS_DISK_USE_RATE"/>:</dt><dd id="_fs_infoSpaceConsumed"></dd></dl>
				<dl class="dl-horizontal"><dt><spring:message code="FILESYS_REPLICATION_COUNT"/>:</dt><dd id="_fs_infoReplication"></dd></dl>
				<dl class="dl-horizontal"><dt><spring:message code="FILESYS_DIRECTORY_COUNT"/>:</dt><dd id="_fs_infoDirectoryCount"></dd></dl>
				<dl class="dl-horizontal"><dt><spring:message code="FILESYS_DIRECTORY_QUOTA"/>:</dt><dd id="_fs_infoQuota"></dd></dl>
				<dl class="dl-horizontal"><dt><spring:message code="FILESYS_FILE_COUNT"/>:</dt><dd id="_fs_infoFileCount"></dd></dl>
			</div>
			<div class="modal-footer">
				<button class="btn btn-default" data-dismiss="modal"><spring:message code="COMMON_CLOSE"/></button>
			</div>
		</div>
	</div>
</div>
<div id="_fs_createModal" class="modal fade" role="dialog">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<h4 class="modal-title"><spring:message code="FILESYS_CREATE_DIRECTORY"/></h4>
			</div>
			<div class="modal-body">
				<div class="form-group">
					<label for="_fs_createInput"><spring:message code="FILESYS_CREATE_DIRECTORY_MSG"/></label>
					<input type="text" class="form-control" id="_fs_createInput" />
				</div>
			</div>
			<div class="modal-footer">
				<button class="btn btn-default" id="_fs_createSubmit"><spring:message code="COMMON_YES"/></button>
				<button class="btn btn-default" id="_fs_createCancel"><spring:message code="COMMON_NO"/></button>
			</div>
		</div>
	</div>
</div>
<div id="_fs_modifyModal" class="modal fade" role="dialog">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<h4 class="modal-title"><spring:message code="FILESYS_RENAME_DIRECTORY"/></h4>
			</div>
			<div class="modal-body">
				<div class="form-group">
					<label for="_fs_createInput"><spring:message code="FILESYS_RENAME_DIRECTORY_MSG"/></label>
					<input type="text" class="form-control" id="_fs_modifyInput" />
				</div>
			</div>
			<div class="modal-footer">
				<button class="btn btn-default" id="_fs_modifySubmit"><spring:message code="COMMON_YES"/></button>
				<button class="btn btn-default" id="_fs_modifyCancel"><spring:message code="COMMON_NO"/></button>
			</div>
		</div>
	</div>
</div>
<div id="_fs_deleteModal" class="modal fade" role="dialog">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<h4 class="modal-title"><spring:message code="FILESYS_DELETE_DIRECTORY"/></h4>
			</div>
			<div class="modal-body">
				<div class="form-group">
					<label><spring:message code="FILESYS_RENAME_DIRECTORY_MSG"/></label>
				</div>
			</div>
			<div class="modal-footer">
				<button class="btn btn-default" id="_fs_deleteSubmit"><spring:message code="COMMON_YES"/></button>
				<button class="btn btn-default" id="_fs_deleteCancel"><spring:message code="COMMON_NO"/></button>
			</div>
		</div>
	</div>
</div>
<div id="_fs_moveModal" class="modal fade" role="dialog">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<h4 class="modal-title"><spring:message code="FILESYS_FILE_SYSTEM_BROWSER"/></h4>
			</div>
			<div class="modal-body" style="height:450px; overflow-y:scroll;">
				<div id="_fs_moveTree"></div>
			</div>
			<div class="modal-footer">
				<button class="btn btn-default" id="_fs_moveSubmit"><spring:message code="COMMON_CONFIRM"/></button>
				<button class="btn btn-default" id="_fs_moveCancel"><spring:message code="COMMON_CANCEL"/></button>
			</div>
		</div>
	</div>
</div>
<div id="_fs_copyModal" class="modal fade" role="dialog">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<h4 class="modal-title"><spring:message code="FILESYS_FILE_SYSTEM_BROWSER"/></h4>
			</div>
			<div class="modal-body" style="height:450px; overflow-y:scroll;">
				<div id="_fs_copyTree"></div>
			</div>
			<div class="modal-footer">
				<button class="btn btn-default" id="_fs_copySubmit"><spring:message code="COMMON_CONFIRM"/></button>
				<button class="btn btn-default" id="_fs_copyCancel"><spring:message code="COMMON_CANCEL"/></button>
			</div>
		</div>
	</div>
</div>
<div id="_fs_uploadModal" class="modal fade" role="dialog" style="width:1000px;">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>				
				<h4 class="modal-title"><spring:message code="FILESYS_FILE_UPLOAD"/></h4>
			</div>
			<div class="modal-body" style="height:450px; overflow-y:scroll;">
				<div>
					<button id="_fs_btnUploadAction" class="btn btn-info btn-xs browser_button"><spring:message code="COMMON_UPLOAD"/></button>
					<button id="_fs_btnStopAction" class="btn btn-info btn-xs browser_button"><spring:message code="COMMON_STOP"/></button>
					<button id="_fs_btnCancelAction" class="btn btn-info btn-xs browser_button"><spring:message code="COMMON_CANCEL"/></button>
					<button id="_fs_btnResetAction" class="btn btn-info btn-xs browser_button"><spring:message code="COMMON_RESET"/></button>
				</div>
				<div id="_fs_fileUploader"><spring:message code="COMMON_UPLOAD"/></div>
			</div>
			<div class="modal-footer">
				<button class="btn btn-default" id="_fs_fileUploadClose"><spring:message code="COMMON_CLOSE"/></button>
			</div>
		</div>
	</div>
</div>
<div id="_fs_previewModal" class="modal fade" role="dialog" style="width:1000px;">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>				
				<h4 class="modal-title"><spring:message code="FILESYS_FILE_PREVIEW"/></h4>
			</div>
			<div class="modal-body" style="height:450px; overflow-y:auto;">
				<textarea id="_fs_previewArea" rows="" cols="" wrap="off" style="width:100%; height:410px" disabled>
				</textarea>
			</div>
			<div class="modal-footer">
				<button class="btn btn-default" id="_fs_previewClose"><spring:message code="COMMON_CLOSE"/></button>
			</div>
		</div>
	</div>
</div>
<div id="_fs_template" class="display_none">
	<select>
		<option class="_fs_tmpOption"></option>
	</select>
	<img src="/resources/images/common-folder.png" alt="folder" height="16px" class="_fs_folderImage" />
	<img src="/resources/images/common-file.png" alt="file" height="16px" class="_fs_fileImage" />
</div>