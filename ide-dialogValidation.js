//DIALOG INPUT RESET (GENERAL)
var dialogInputReset = function (dialogID) {
	dialogID = $("#" + dialogID + "");
	
	dialogID.find(".zc-input").each(function(){
	 $(this).val($(this).attr('value'));
	});
	
	dialogID.find("textarea").val("");
	dialogID.find(".zc-input").removeClass("zc-error");
	dialogID.find("textarea").removeClass("zc-error");
	dialogID.find(".zc-input").removeClass("zc-errorCheck");
	dialogID.find("textarea").removeClass("zc-errorCheck");

	dialogID.find(".zc-inputHelpText").css("display", "block");
	dialogID.find(".zc-invalidError").css("display", "none");
	dialogID.find(".zc-errorText").css("display", "none");
	
	if(dialogID.find("*:visible[tabindex='1']").length){
	 if(dialogID.find("*:visible[tabindex='1']").attr('value') !== ''){
	  dialogID.find("*:visible[tabindex='1']").select();
	 }
	}
	else{
	 if(dialogID.find(".zc-input:first").attr('value')!== ''){
	  dialogID.find(".zc-input:first").select();
	 }
	}

}

// RegEx formats
var mailFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var fileNameFormat = /^[0-9A-Za-z_.-]+$/;

// Matching valus for input fields
var matchUserName = 'admin';
var matchPassword = '1234';

// DIALOG FIELD VALIDATION (GENERAL)

var dialogFieldValidate = function (dialogID, btnId, btnLoadingText, successMsg, viewAction) {

	var requiredFieldCheck = [".zc-input:not('.zc-optionalField')", "textarea"], btnText = $('#' + btnId + '').text(), errorCount;

	// Required field  check

	$.each(requiredFieldCheck, function (index, val) {
		$("#" + dialogID + " " + val).each(function () {

			var _this = $(this), inputVal = _this.val();
	 _this.addClass('zc-errorCheck');
   validateEachField(inputVal,_this);
		
		});
	});
	

	// If all field values are entered do this action

	errorCount = $('#' + dialogID + ' .zc-error:visible').size();
	
	if(viewAction !== undefined){
	 var otherConditon = viewAction();
	}
	else{
	 var otherConditon = true;
	}

	
	if (errorCount == 0 && otherConditon ) {
		$('#' + btnId + '').addClass('zc-loading');
		$('#' + btnId + '').empty().append('<span class="zc-loader grey-loader"> </span>' + btnLoadingText + '');
		setTimeout(function () {
			//BUTTON LOADING STATE
			$('#' + btnId + '').removeClass('zc-loading');
			$('#' + btnId + '').empty().append(btnText);
			$('#' + dialogID + '').zdialog('close');
			//SHOW TOAST MESSAGE
			$('#SuccesMsg .zc-toast-text').empty().append(successMsg);
			$('#SuccesMsg').addClass('show-toast-message');
			toast_Position();
		}, 1000);

		//HIDE TOAST MESAGE
		setTimeout(function () {
			$('#SuccesMsg').removeClass('show-toast-message');
		}, 3500);

	}
	else{
	 $('#' + dialogID + ' .zc-error:first').focus();
	}


}

/*------------------------------------------------------------------------------------------------------------------*/

$(document).on('keyup', '.zc-errorCheck', function () {
	var _this = $(this), inputVal = _this.val();

validateEachField(inputVal,_this);
	
})

/*------------------------------------------------------------------------------------------------------------------*/

function validateEachField(inputVal,_this){
	
	 
	 if ((inputVal == "") || (inputVal == null)) {
		_this.addClass('zc-error');
		_this.parent('.zc-fieldInput').find('.zc-errorText').css('display', 'block');
		_this.parent('.zc-fieldInput').find('.zc-inputHelpText').css('display', 'none');
		_this.parent('.zc-fieldInput').find('.zc-invalidError').css('display', 'none');
	} else if (_this.attr('data-type') == 'email') {
				inputValidation(_this, mailFormat, 'Invalid mail format.');
			}
			else if (_this.attr('data-type') == 'username') {
				inputValidation(_this, mailFormat, 'File name invalid.');
			}
			else if(_this.attr('data-type') == 'password'){
			 inputValidation(_this, fileNameFormat, 'File name invalid.');
			} 
			else {
		_this.removeClass('zc-error');
		_this.parent('.zc-fieldInput').find('.zc-errorText').css('display', 'none');
		_this.parent('.zc-fieldInput').find('.zc-inputHelpText').css('display', 'block');
	}
	}

/*------------------------------------------------------------------------------------------------------------------*/

function inputValidation(_this, _format, _message) {
 
 if(_this.attr('data-match') == 'email'){
  
  
 }  else if(_this.attr('data-match') == 'username'){
   if (_this.val() == 'admin') {
		_this.removeClass('zc-error');
		_this.parent('.zc-fieldInput').find('.zc-errorText').css('display', 'none');
		_this.parent('.zc-fieldInput').find('.zc-inputHelpText').css('display', 'block');
		_this.parent('.zc-fieldInput').find('.zc-invalidError').css('display', 'none');
	}
	else {
		_this.addClass('zc-error');
		_this.parent('.zc-fieldInput').find('.zc-errorText').css('display', 'none');
		_this.parent('.zc-fieldInput').find('.zc-inputHelpText').css('display', 'none');
		if (_this.parent('.zc-fieldInput').find('.zc-invalidError').length == 0) {
			_this.parent('.zc-fieldInput').append('<div class="zc-invalidError" style="display:block">' + _message + '</div>');
		}
		_this.parent('.zc-fieldInput').find('.zc-invalidError').css('display', 'block');
	}
 } else if(_this.attr('data-match') == 'password'){
 
 }
 else{
  if (_format.test(String(_this.val()).toLowerCase())) {
		_this.removeClass('zc-error');
		_this.parent('.zc-fieldInput').find('.zc-errorText').css('display', 'none');
		_this.parent('.zc-fieldInput').find('.zc-inputHelpText').css('display', 'block');
		_this.parent('.zc-fieldInput').find('.zc-invalidError').css('display', 'none');
	}
	else {
		_this.addClass('zc-error');
		_this.parent('.zc-fieldInput').find('.zc-errorText').css('display', 'none');
		_this.parent('.zc-fieldInput').find('.zc-inputHelpText').css('display', 'none');
		if (_this.parent('.zc-fieldInput').find('.zc-invalidError').length == 0) {
			_this.parent('.zc-fieldInput').append('<div class="zc-invalidError" style="display:block">' + _message + '</div>');
		}
		_this.parent('.zc-fieldInput').find('.zc-invalidError').css('display', 'block');
	}
	
 }
 

}

/*------- push and pull validation ---------*/

var pushPullValidation = function (dialogID, btnId, btnLoadingText, successMsg, viewAction) {


var requiredFieldCheck = [".zc-input", "textarea"], btnText = $('#' + btnId + '').text(), errorCount;

	// Required field  check

	$.each(requiredFieldCheck, function (index, val) {
		$("#" + dialogID + " " + val).each(function () {
			var _this = $(this), inputVal = _this.val();
	 // _this.addClass('zc-errorCheck1');
   validateEachPushPullField(inputVal,_this);
		});
	});
	
	// If all field values are entered do this action
requireCount = $('#' + dialogID + ' .zc-error:visible').size();
	errorCount = $('#' + dialogID + ' .zc-errorFiled:visible').size();
	if(requireCount == 0){
	if (errorCount == 0) {
	  $('#' + dialogID +' #pullAlertBanner').addClass('zc-hide');
		$('#' + btnId + '').addClass('zc-loading');
		$('#' + btnId + '').empty().append('<span class="zc-loader grey-loader"> </span>' + btnLoadingText + '');
		setTimeout(function () {
			//BUTTON LOADING STATE
			$('#' + btnId + '').removeClass('zc-loading');
			$('#' + btnId + '').empty().append(btnText);
			$('#' + dialogID + '').zdialog('close');
			//SHOW TOAST MESSAGE
			$('#SuccesMsg .zc-toast-text').empty().append(successMsg);
			$('#SuccesMsg').addClass('show-toast-message');
			toast_Position();
		}, 1000);

		//HIDE TOAST MESAGE
		setTimeout(function () {
			$('#SuccesMsg').removeClass('show-toast-message');
		}, 3500);


	}
	
	else{
	 $('#' + dialogID +' #pullAlertBanner').removeClass('zc-hide');
	}
	
	}


}


function validateEachPushPullField(inputVal,_this){
	
	 if ((inputVal == "") || (inputVal == null)) {
		_this.addClass('zc-error zc-errorFiled');
		_this.parent('.zc-fieldInput').find('.zc-errorText').css('display', 'block');
		_this.parent('.zc-fieldInput').find('.zc-inputHelpText').css('display', 'none');
		_this.parent('.zc-fieldInput').find('.zc-invalidError').css('display', 'none');
	} else if (_this.attr('data-type') == 'username') {
	 	_this.parent('.zc-fieldInput').find('.zc-errorText').css('display', 'none');
	 if(_this.val() == matchUserName){
	    _this.removeClass('zc-errorFiled zc-error');
	 }
	 else{
	    _this.addClass('zc-errorFiled').removeClass('zc-error');
	 }
			}
			else if (_this.attr('data-type') == 'password') {
			 _this.parent('.zc-fieldInput').find('.zc-errorText').css('display', 'none');
			 if(_this.val() == matchPassword){
	  _this.removeClass('zc-errorFiled zc-error');
	 }
	 else{
	   _this.addClass('zc-errorFiled').removeClass('zc-error');
	 }		
			}

	}

/*------------------------------------------------------------------------------------------------------------------*/

//------  SAVE AS VALIDATION -------//

saveAsValidation = function(){
 
 var input = $('#zc-saveAsDialog').find('.zc-input');
 var fileTree = $('#saveAsExptree');
 
 if(input.val() !== input.attr('value') && (fileTree.find('span').hasClass('fancytree-active'))){
  $('#zc-saveAsAlert').addClass('zc-hide');
  return true;
 }
 else{
  $('#zc-saveAsAlert').removeClass('zc-hide');
  return false;
 }
 
}


/*------------------------------------------------------------------------------------------------------------------*/
$(document).ready(function () {

	//REPLACE FILE DIALOG 

	// $(document).on("click", "#replaceFile-btn", function () {

	// 	$("#repUploadNewImage-dialog").addClass("zc-showDialog");
	// 	$("#zc-repUploadNewVersion").addClass("zc-isVisible");

	// 	dialogInputReset("repUploadNewImage-dialog");

	// });


	// //REPLACE FILE VIEW ACTION
	// var replaceFileAction = function () {

	// }


	// $(document).on("click", "#uploadImageBtn", function() {

	// 	//	dialogFieldValidate ('dialog-ID', 'button-Id', 'button Loading-Text', 'Toast Message', viewRelatedFunction() );

	// 	dialogFieldValidate ( 'zc-newFileDialog', 'uploadImageBtn', 'Replacing', 'Replaced successfully.', replaceFileAction );

	// });


	// $(document).on("click", "#cancelImageBtn", function() {

	// 	hide_dialog();

	// });






})





	/*---------------------------------------------- Pull FILES -------------------------------------------------------------------------------------*/

	// $("#zc-ide").on("click", "#zc-pullUpdatesDialogSubmit", function(){

	// 	var getusernameInput = $("#pull-usernameinput").val(),
	// 		getpasswordInput = $("#pull-passwordinput").val(),
	// 		iffieldcheck = true;

	// 	/* REQUIRED FIELD VALIDATION  FUNCTION  */
	// /*	if(getusernameInput == "" || getusernameInput == null) {
	// 		textfield_show_error('#pull-usernameinput', '#pull-usernameReq');
	// 		iffieldcheck = false;
	// 	} else {
	// 		textfield_hide_error('#pull-usernameinput', '#pull-usernameReq');
	// 	} 

	// 	if(getpasswordInput == "" || getpasswordInput == null) {
	// 		textfield_show_error('#pull-passwordinput', '#pull-passwordReq');
	// 		iffieldcheck = false;
	// 	} else {
	// 		textfield_hide_error('#pull-passwordinput', '#pull-passwordReq');
	// 	} */

	// 	if(getusernameInput == "admin" && getpasswordInput == "1234") {

	// 	} else if(getusernameInput == "" && getpasswordInput == "") {
	// 	/*	textfield_show_error('#pull-usernameinput', '#pull-usernameReq');
	// 		textfield_show_error('#pull-passwordinput', '#pull-passwordReq');*/
	// 		$("#pushAlertBanner").addClass("zc-hide");
	// 		iffieldcheck = false;
	// 	} else if(getusernameInput == ""){
	// 	/*	textfield_show_error('#pull-usernameinput', '#pull-usernameReq');
	// 		textfield_hide_error('#pull-passwordinput', '#pull-passwordReq');*/
	// 		$("#pullAlertBanner").addClass("zc-hide");
	// 		iffieldcheck = false;
	// 	} else if(getpasswordInput == "") {
	// 	/*	textfield_show_error('#pull-passwordinput', '#push-passwordReq');
	// 		textfield_hide_error('#push-usernameinput', '#push-usernameReq');*/
	// 		$("#pullAlertBanner").addClass("zc-hide");
	// 		iffieldcheck = false;
	// 	} else if(getusernameInput!="admin" || getpasswordInput!="1234"){
	// 		$("#pullAlertBanner").removeClass("zc-hide");
	// 		iffieldcheck=false;
	// 	} 

	// 	if( iffieldcheck == true) {
	// 		$("#pullAlertBanner").addClass("zc-hide");
	// 		$(this).addClass("zc-loading");
	// 		$(this).empty().append('<span class="zc-loader"> </span> Pulling');
	// 		$("#ide-pullFile-dialog").find(".zc-action-overlay").addClass("show-action-overlay");
	// 		$(this).blur();

	// 		setTimeout(function() {
	// 			$("#pull-succes-msg .zc-toast-text").empty().append("There is no update in the working branch. So, the files are up to date.");
	// 			$("#pull-succes-msg").addClass("show-toast-message");
	// 			hide_dialog();
	// 			toast_Position();
	// 		}, 2500);
	// 		//        setTimeout(function() {
	// 		//          $("#pull-succes-msg").removeClass("show-toast-message");
	// 		//        },5500);
	// 	}
	// });


	// $("#zc-ide").on("click", "#pull-succes-msg .zc-closeBtn", function(){
	// 	$("#pull-succes-msg").removeClass("show-toast-message");
	// });


	// $("#zc-ide").on("click", "#pullFilesSuccess", function(){

	// 	var getusernameInput = $("#pull-usernameinput").val(),
	// 		getpasswordInput = $("#pull-passwordinput").val(),
	// 		iffieldcheck = true;

	// 	/* REQUIRED FIELD VALIDATION  FUNCTION  */
	// 	if(getusernameInput == "" || getusernameInput == null) {
	// 		textfield_show_error('#pull-usernameinput', '#pull-usernameReq');
	// 		iffieldcheck = false;
	// 	} else {
	// 		textfield_hide_error('#pull-usernameinput', '#pull-usernameReq');
	// 	} 

	// 	if(getpasswordInput == "" || getpasswordInput == null) {
	// 		textfield_show_error('#pull-passwordinput', '#pull-passwordReq');
	// 		iffieldcheck = false;
	// 	} else {
	// 		textfield_hide_error('#pull-passwordinput', '#pull-passwordReq');
	// 	} 

	// 	if(getusernameInput == "admin" && getpasswordInput == "1234") {
	// 		iffieldcheck = true;
	// 	} 
	// 	else if(getusernameInput == "" && getpasswordInput == "") {
	// 		textfield_show_error('#pull-usernameinput', '#pull-usernameReq');
	// 		textfield_show_error('#pull-passwordinput', '#pull-passwordReq');
	// 		$("#pushAlertBanner").addClass("zc-hide");
	// 		iffieldcheck = false;
	// 	} else if(getusernameInput == ""){
	// 		textfield_show_error('#pull-usernameinput', '#pull-usernameReq');
	// 		textfield_hide_error('#pull-passwordinput', '#pull-passwordReq');
	// 		$("#pullAlertBanner").addClass("zc-hide");
	// 		iffieldcheck = false;
	// 	} else if(getpasswordInput == "") {
	// 		textfield_show_error('#pull-passwordinput', '#push-passwordReq');
	// 		textfield_hide_error('#push-usernameinput', '#push-usernameReq');
	// 		$("#pullAlertBanner").addClass("zc-hide");
	// 		iffieldcheck = false;
	// 	} else if(getusernameInput!="admin" || getpasswordInput!="1234"){
	// 		$("#pullAlertBanner").removeClass("zc-hide");
	// 		iffieldcheck=false;
	// 	} 

	// 	if( iffieldcheck == true) {
	// 		$("#pullAlertBanner").addClass("zc-hide");
	// 		$(this).addClass("zc-loading");
	// 		$(this).empty().append('<span class="zc-loader"> </span> Pulling');
	// 		$("#ide-pullFile-dialog").find(".zc-action-overlay").addClass("show-action-overlay");
	// 		$(this).blur();
	// 		setTimeout(function() {

	// 			$("#pull-succesUpdate-msg .zc-toast-text").empty().append("Pulled the latest updates successfully.");
	// 			$("#pull-succesUpdate-msg").addClass("show-toast-message");
	// 			hide_dialog();
	// 			toast_Position();
	// 		}, 2500);
	// 		setTimeout(function() {
	// 			$("#pull-succesUpdate-msg").removeClass("show-toast-message");
	// 		},5500);
	// 	}
	// });

	// $("#zc-ide").on("click", "#pullFilesError", function(){
	// 	var getusernameInput = $("#pull-usernameinput").val(),
	// 		getpasswordInput = $("#pull-passwordinput").val(),
	// 		iffieldcheck = true;

	// 	/* REQUIRED FIELD VALIDATION  FUNCTION  */
	// 	if(getusernameInput == "" || getusernameInput == null) {
	// 		textfield_show_error('#pull-usernameinput', '#pull-usernameReq');
	// 		iffieldcheck = false;
	// 	} else {
	// 		textfield_hide_error('#pull-usernameinput', '#pull-usernameReq');
	// 	} 

	// 	if(getpasswordInput == "" || getpasswordInput == null) {
	// 		textfield_show_error('#pull-passwordinput', '#pull-passwordReq');
	// 		iffieldcheck = false;
	// 	} else {
	// 		textfield_hide_error('#pull-passwordinput', '#pull-passwordReq');
	// 	} 

	// 	if(getusernameInput == "admin" && getpasswordInput == "1234") {
	// 		iffieldcheck = true;
	// 	} 
	// 	else if(getusernameInput == "" && getpasswordInput == "") {
	// 		textfield_show_error('#pull-usernameinput', '#pull-usernameReq');
	// 		textfield_show_error('#pull-passwordinput', '#pull-passwordReq');
	// 		$("#pushAlertBanner").addClass("zc-hide");
	// 		iffieldcheck = false;
	// 	} else if(getusernameInput == ""){
	// 		textfield_show_error('#pull-usernameinput', '#pull-usernameReq');
	// 		textfield_hide_error('#pull-passwordinput', '#pull-passwordReq');
	// 		$("#pullAlertBanner").addClass("zc-hide");
	// 		iffieldcheck = false;
	// 	} else if(getpasswordInput == "") {
	// 		textfield_show_error('#pull-passwordinput', '#push-passwordReq');
	// 		textfield_hide_error('#push-usernameinput', '#push-usernameReq');
	// 		$("#pullAlertBanner").addClass("zc-hide");
	// 		iffieldcheck = false;
	// 	} else if(getusernameInput!="admin" || getpasswordInput!="1234"){
	// 		$("#pullAlertBanner").removeClass("zc-hide");
	// 		iffieldcheck=false;
	// 	} 

	// 	if( iffieldcheck == true) {
	// 		$("#pullAlertBanner").addClass("zc-hide");
	// 		$(this).addClass("zc-loading");
	// 		$(this).empty().append('<span class="zc-loader"> </span> Pulling');
	// 		$("#ide-pullFile-dialog").find(".zc-action-overlay").addClass("show-action-overlay");
	// 		$(this).blur();
	// 		setTimeout(function() {
	// 			hide_dialog();
	// 			var dialogId = $("#confirm-pullError");
	// 			show_dialog(dialogId);
	// 		}, 2500);
	// 		setTimeout(function() {
	// 			$("#pull-succes-msg").removeClass("show-toast-message");
	// 		},5500);
	// 	}
	// });


	// $("#zc-ide").on("click", "#pull-close-Btn,  #cancelPullButton", function(){
	// 	hide_dialog();
	// });


/*--------- upload files vaildation -----------*/

 
var activeErrorId='no-file-selected';
 
var uploadCond = {
	'no-file-selected': {
		'error': 'Select at least one file to upload.'
	},
	'filesize-exceed-s': {
		'error': 'File size cannot be greater than 10 MB.'
	},
	'filesize-exceed-m': {
		'error': 'Total size of selected files cannot be greater than 10 MB.'
	},
	'file-exist': {
		'errorAlert': 'Unable to upload because a file or folder with the same name already exists.'
	},
	'more-file-exist': {
		'errorAlert': 'Uploaded 5 out of 6 files. Cannot upload "test.java" because a file or folder with the same name already exists.'
	},
	'more-file-exist-1': {
		'errorAlert': 'Uploaded 3 out of 6 files. Cannot upload the below files because a file or folder with the same name already exists.\
					<p>usermgmt.java</p>\
					<p>base.css</p>\
					<p>uicomponents.js</p>'
	},
	'all-files-failed': {
		'errorAlert': 'Unable to upload all files because a file or folder with the same name already exists, respectively.'
	},
	'failed-unknown': {
		'errorAlert': 'Upload failed due to an unknown error. Please retry now or later.'
	},
	'more-failed-unknown': {
		'errorAlert': 'Uploaded 5 out of 6 files. The file "usermgmt.java" failed due to an unknown error.'
	},
	'more-failed-unknown-1': {
		'errorAlert': 'Uploaded 2 out of 5 files. The following files failed due to an unknown error:\
  <p>usermgmt.java</p>\
  <p>base.css</p>\
  <p>uicomponents.js</p>'
	},
	'upload-success-single': {
		'successAlert': 'File uploaded successfully.'
	},
	'upload-success': {
		'successAlert': 'All files uploaded successfully.'
	}
}
  
  
// PROTOTYPE ERROR CASES
	$("#pt-upload-case li").on("click", function() {
		$("#pt-upload-case ul li").removeClass("active");
		$(this).addClass("active");
		activeErrorId = $(this).attr('id');
		
		 var helpText = $('#zc-uploadFilesDialog').find('#uploadHelpText');
   var errorText = $('#zc-uploadFilesDialog').find('#select-upload-error');
   
   helpText.show();
   errorText.hide();
   
   $('#zc-uploadFileErrorAlert').addClass('zc-hide');
	});
	
	
	// CLOSE ERROR ALERT 
 $(document).on('click','#zc-uploadFileErrorClose',function(){
  $('#zc-uploadFileErrorAlert').addClass('zc-hide');
 });
	
	
 // UPLOAD DIALOG FUNCTION
 function uploadFileDialog(dialogID , btnID , btnLoadingText , btnText ){
  
  var contType = Object.keys(uploadCond[activeErrorId])[0];
  
  if(contType == 'error'){
   var helpText = $('#'+dialogID).find('#uploadHelpText');
   var errorText = $('#'+dialogID).find('#select-upload-error');
   
   errorText.text( uploadCond[activeErrorId][contType] );
   
   helpText.hide();
   errorText.show();
   
  }
  
  if(contType == 'errorAlert'){
   
    		$('#' + btnID + '').addClass('zc-loading');
    		$('#' + btnID + '').empty().append('<span class="zc-loader grey-loader"> </span>' + btnLoadingText + '');
    		setTimeout(function () {
    			//BUTTON LOADING STATE
    			$('#' + btnID + '').removeClass('zc-loading');
    			$('#' + btnID + '').empty().append(btnText);
    			//SHOW TOAST MESSAGE
       $('#zc-uploadFileErrorAlert').find('.zc-toast-text').empty().append(uploadCond[activeErrorId][contType]);
       $('#zc-uploadFileErrorAlert').removeClass('zc-hide');
    		}, 1000);
    
  }
  
  if(contType == 'successAlert'){
   
       $('#' + btnID + '').addClass('zc-loading');
       $('#' + btnID + '').empty().append('<span class="zc-loader grey-loader"> </span>' + btnLoadingText + '');
       setTimeout(function () {
       //BUTTON LOADING STATE
       $('#' + btnID + '').removeClass('zc-loading');
       $('#' + btnID + '').empty().append(btnText);
    			$('#' + dialogID + '').zdialog('close');
    			//SHOW TOAST MESSAGE
    			$('#SuccesMsg .zc-toast-text').empty().append(uploadCond[activeErrorId][contType]);
    			$('#SuccesMsg').addClass('show-toast-message');
    			toast_Position();
    		}, 1000);

    		//HIDE TOAST MESAGE
    		setTimeout(function () {
    			$('#SuccesMsg').removeClass('show-toast-message');
    		}, 3500);

	}
   
 }
 
 

















