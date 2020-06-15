var getVersionNo,
	showToastTime = 2500,
	hideToastTime = 5500,
	terminalPane,
	consolePane,
	shareDialog,
	findOnlyPane,
	findFilesPane;
/*----- FULL SCREEN -----*/

function GoInFullscreen(element) {
	if (element.requestFullscreen)
		element.requestFullscreen();
	else if (element.mozRequestFullScreen)
		element.mozRequestFullScreen();
	else if (element.webkitRequestFullscreen)
		element.webkitRequestFullscreen();
	else if (element.msRequestFullscreen)
		element.msRequestFullscreen();
}

function GoOutFullscreen() {
	if (document.exitFullscreen)
		document.exitFullscreen();
	else if (document.mozCancelFullScreen)
		document.mozCancelFullScreen();
	else if (document.webkitExitFullscreen)
		document.webkitExitFullscreen();
	else if (document.msExitFullscreen)
		document.msExitFullscreen();
}

function IsFullScreenCurrently() {
	var full_screen_element = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement || null;
	if (full_screen_element === null)
		return false;
	else
		return true;
}

/* EXIT FULL SCREEN */

if (document.addEventListener) {
	document.addEventListener('webkitfullscreenchange', exitHandler, false);
	document.addEventListener('mozfullscreenchange', exitHandler, false);
	document.addEventListener('fullscreenchange', exitHandler, false);
	document.addEventListener('MSFullscreenChange', exitHandler, false);
}

function exitHandler() {
	if (!document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
		$("#zc-fullScreenMode, #zc-fullScreenModeMenu").find("i").html('<svg class="zc-grey"> <use xlink:href="#svg-fullScreenSm-icon12"> </use> </svg>');
		$("#zc-fullScreenMode, #zc-fullScreenModeMenu").attr('title', 'Full Screen Mode');
		$("#editor").css("font-size", "14px");
	}
}


/*----  DIALOG FUNCTION ----*/

var show_dialog = function (getdialogId) {

	getdialogId.find(".zc-error-msg").addClass("zc-hide");
	getdialogId.find(".zc-error-msg").next('.zc-hide').removeClass("zc-hide");
	getdialogId.find(".zc-input").removeClass("zc-error");
	getdialogId.find(".zc-action-overlay").removeClass("show-action-overlay");
	getdialogId.find(".zc-btn").removeClass("zc-loading");

	if (getdialogId.is("#zc-project-share")) {
		getdialogId.addClass("zc-showDialog")
		$("#zc-overlay-white").addClass("zc-isVisible");
	} else if (getdialogId.is("#ide-compare-dialog")) {
		getdialogId.addClass("zc-showDialog")
		$("#zc-compare-fullscreen").addClass("zc-isVisible");
	} else if (getdialogId.is("#ide-editorPrefDialog")) {
		getdialogId.addClass("zc-showDialog")
		$("#zc-editorPref-fullscreen").addClass("zc-isVisible");
	} else if (getdialogId.is("#ide-notifiPrefDialog")) {
		getdialogId.addClass("zc-showDialog")
		$("#zc-notifiPref-fullscreen").addClass("zc-isVisible");
	} else {
		getdialogId.addClass("zc-showDialog")
		$("#zc-overlay-black").addClass("zc-isVisible");
	}

	if (!((getdialogId.is("#ide-mergeFile-dialog")) || (getdialogId.is("#ide-packagerename-dialog")) || (getdialogId.is("#ide-folderrename-dialog")) || (getdialogId.is("#ide-filerename-dialog")))) {
		setTimeout(function () {
			getdialogId.find(".zc-input:first").val("").focus();
			getdialogId.find(".zc-input").val("");
		}, 100);
	} else if (getdialogId.is("#ide-mergeFile-dialog")) {
		setTimeout(function () {
			$("#zc-mergeBranch-list").next(".chosen-container").addClass("chosen-container-active");
		}, 100);
	} else {
		setTimeout(function () {
			getdialogId.find(".zc-input:first").focus();
		}, 100);
	}


}

var show_commitDialog = function (getdialogId) {
	$(getdialogId).addClass("zc-showDialog");
	$("#zc-commit-fullscreen").addClass("zc-isVisible");
}

var show_runDialog = function (getdialogId) {
	getdialogId.addClass("zc-showDialog");
	$("#zc-run-fullscreen").addClass("zc-isVisible");
}

var hide_dialog = function () {
	$(".zc-overlay").removeClass("zc-isVisible");
	$(".zc-dialog").removeClass("zc-showDialog");
	$(".zc-dialog .zc-action-overlay").removeClass('show-action-overlay');
}

var show_modeless_dialog = function (getdialogId) {
	getdialogId.addClass("zc-showDialog");
	setTimeout(function () {
		getdialogId.find(".zc-input:first").val("").focus();
	}, 100);
}

var hide_modeless_dialog = function (getdialogId) {
	getdialogId.removeClass("zc-showDialog");
}

// SHOW ERROR FOR TEXTBOX VALIDATION
var textfield_show_error = function (field, errormsg) {
	$(field).addClass("zc-error");
	$(field).parent().parent().find('.zc-inputHelpText').addClass("zc-hide");
	$(errormsg).css("display", "block");
}

var textfield_hide_error = function (field, errormsg) {
	$(field).removeClass("zc-error");
	$(errormsg).css("display", "none");
	$(field).parent().parent().find('.zc-inputHelpText').removeClass("zc-hide");
}

var show_Confirmdialog = function (getdialogId) {
	$(".zc-confirm-overlay").addClass("zc-isVisible");
	getdialogId.addClass("zc-showDialog");
	$(".zc-overlay").css("overflow", "hidden");
}

var hide_Confirmdialog = function (getdialogId) {
	$(".zc-confirm-overlay").removeClass("zc-isVisible");
	getdialogId.removeClass("zc-showDialog");
	$(".zc-overlay").css("overflow-y", "auto");
}


//TOAST MESSAGE POSITION 
var toast_Position = function () {
	var toastWidth = $(".show-toast-message").outerWidth();
	toastWidth = -(toastWidth / 2);
	$(".show-toast-message").css("margin-left", toastWidth);
}

// SUCEESS MESSAGE 
var successToast = function (setSuccessMessage) {
	$("#SuccesMsg").find(".zc-toast-text").empty().append(setSuccessMessage);
	$("#SuccesMsg").addClass("show-toast-message");
	toast_Position();
}

var errorToast = function (setSuccessMessage) {
	$("#ErrorMsg").find(".zc-toast-text").empty().append(setSuccessMessage);
	$("#ErrorMsg").addClass("show-toast-message");
	toast_Position();
}

var infoToast = function (setSuccessMessage) {
	$("#infoMsg").find(".zc-toast-text").empty().append(setSuccessMessage);
	$("#infoMsg").addClass("show-toast-message");
	toast_Position();
}

// HIDE TOAST 
var hideToast = function () {
	setTimeout(function () {
		$("#SuccesMsg").removeClass("show-toast-message");
	}, hideToastTime);
}

var hideErrorToast = function () {
	setTimeout(function () {
		$("#ErrorMsg").removeClass("show-toast-message");
	}, hideToastTime);
}

var hideInfoToast = function () {
	setTimeout(function () {
		$("#infoMsg").removeClass("show-toast-message");
	}, hideToastTime);
}

// ADD AND REMOVE BUTTON LOADING
var addButtonLoading = function (getBtnID, getbtnText) {
	getBtnID.blur();
	getBtnID.addClass("zc-loading");
	getBtnID.empty().append('<span class="zc-loader"> </span> ' + getbtnText + '');
}

var removeButtonLoading = function (getBtnID, getbtnText) {
	getBtnID.removeClass("zc-loading");
	getBtnID.empty().append(getbtnText);
}

/*--------------------- CLEAR SEARCH ------------------------*/

var show_clear = function (getInputID, getClearSearchId) {
	var hasSearchText = $(getInputID).val().length;
	if (hasSearchText > 0) {
		$(getClearSearchId).css("display", "block");
	} else {
		$(getClearSearchId).css("display", "none");
	}
}


$(document).ready(function () {

	var uploadFileDialog = function () {
		show_dialog($("#ide-file-upload"));
		//RESET 	
		$("#upload-banner-alert").addClass("zc-hide");
		$("#select-upload-error").addClass("zc-hide").empty().append("Select at least one file to upload.");
		$("#upload-file").removeClass("zc-loading disabled");
		$("#upload-file").empty().append('Upload');
		$("#ide-file-upload .zc-action-overlay").removeClass("show-action-overlay");
		$(".selected-files").addClass("zc-hide").empty();
		$("#upload-file").removeClass("id-upload-success id-file-exist-upload id-singleupload-success").addClass("id-upload");
		// PROTOTYPE ERROR CASES 
		setTimeout(function () {
			$("#pt-upload-case").addClass("show-error-case");
			$("#pt-upload-case ul li").removeClass("active");
			$("#pt-upload-case ul").find("#no-file-selected").addClass("active");
		}, 600);
	}

	var commitDialog = function () {
		show_commitDialog($("#ide-commit-dialog-3"));
		$("#ide-commit-dialog-3").removeClass('zc-commitPushDialog');
	}

	var fileHistoryDialog = function () {
		$("#ide-fileHistory-dialog").addClass("zc-showDialog");
		$("#zc-fileHistory-fullscreen").addClass("zc-isVisible");
	}

	var pushDialog = function () {
		show_dialog($("#ide-pushFile-dialog"));
		$("#PushButton, #pushFilesIssues").empty().append('Push');
		$("#pullChanges-btn").empty().append("Pull Updates")
	}

	var pullDialog = function () {
		show_dialog($("#ide-pullFile-dialog"));
		$("#PullButton, #pullFilesSuccess").empty().append('Pull');
	}

	var mergeDialog = function () {
		show_dialog($("#ide-mergeFile-dialog"));
		$("#mergeButton").empty().append('Merge Branch');
	}

	var switchDialog = function () {
		show_dialog($("#ide-switchBranch-dialog"));
		$("#SwitchButton").empty().append('Switch');
	}


	terminalPane = function () {
		var isTabavailable = $("#terminal-tab").length;
		if (!(isTabavailable >= 1)) {
			var appendTab = '<li id="terminal-tab" class="ide-tab ide-terminalTab"><span class="icon ide-configIcon"> <svg class="zc-black"> <use xlink:href="#svg-command-icon"> </use> </svg></span> <span class="tab-text"> Terminal</span> <span class="tab-close" title="Close"><i class="icon-9"><svg class="zc-grey"> <use xlink:href="#svg-close-icon"> </use> </svg> </i></span></li>'
			$("#zc-fileTab .ide-tabs").append(appendTab);
			$(".ide-tab-wrap .ide-tab").removeClass("tab-active");
			$(".ide-tab-wrap .ide-tab").removeClass('zc-noTabSeparator');
			$("#terminal-tab").css("display", "flex").addClass("tab-active");
			$("#terminal-tab").prevAll(':visible:first').addClass('zc-noTabSeparator');
			$(".zc-editorTabContent").addClass("zc-hide");
			$("#zc-terminal-template").removeClass("zc-hide");
		} else {
			$("#terminal-tab").trigger("click");
		}
	}

	shareDialog = function () {
		show_dialog($("#zc-project-share"));
		$("#sharedUserName").ztokenfield('removeAllTokens');
		textfield_hide_error('#sharedUserName-ztokenfield-container', '#add-cd-required');
		$("#manage-cd-list").removeClass("zc-isVisible");
		$(".zc-share-wrap").removeClass("zc-showDialog");
		$("#sharedUserName-ztokenfield-container").addClass("has-focus");
		$("#sharedUserName-container").addClass("has-focus")
		setTimeout(function () {
			$("#sharedUserName-input").focus();
		}, 100);

		//reset
		$("#zc-share-btn").removeClass("zc-loading");
		$('#zc-share-btn').empty().append('Share');
		$(".zc-overlay .zc-dialog-close").removeClass("disabled");
	}

	var findReplacePane = function () {
		$("#zc-find-replace-pane").show(0, function () {
			$(this).addClass("show-findReplacePane");
		});
		$(".zc-editorTabContent").css("top", "78px");
		$("#find-text").val("").focus();
		$("#zc-replace-input").val("");
		$("#enableReplaceOption").prop('checked', false);
		$("#zc-replaceOnly").hide();
		$("#zc-replaceOnly").removeClass("show-replaceWrap");
		$("#findSearchResult .replaceableText").removeClass("textReplaced");
		$("#findSearchResult .replaceableText").empty().append("new");
		$("#zc-findinFiles").hide();
		$(".zc-replaceOption, #zc-replaceOnly, #zc-findNavBtn").show();
		$("#findReplace-tab").trigger("click");
		$("#enableReplaceOption").trigger("click");
		setTimeout(function () {
			$("#find-text").focus();
		}, 100);
	}

	findOnlyPane = function () {
		$("#zc-find-replace-pane").show(0, function () {
			$(this).addClass("show-findReplacePane");
		});
		$(".zc-editorTabContent").css("top", "78px");
		$("#find-text").val("").focus();
		$("#zc-replace-input").val("");
		$("#zc-replaceOnly").hide();
		$("#enableReplaceOption").prop('checked', false);
		$("#zc-replaceOnly").removeClass("show-replaceWrap");
		$("#findSearchResult .replaceableText").removeClass("textReplaced");
		$("#findSearchResult .replaceableText").empty().append("new");
		$("#zc-findinFiles, #zc-replaceOnly").hide();
		$("#zc-findNavBtn").show();
		$("#findReplace-tab").trigger("click");
		setTimeout(function () {
			$("#find-text").focus();
		}, 100);
	}

	findFilesPane = function () {
		$("#zc-find-replace-pane").show(0, function () {
			$(this).addClass("show-findReplacePane");
		});
		$(".zc-editorTabContent").css("top", "78px");
		$(".zc-replaceOption, #zc-replaceOnly, #zc-findNavBtn").hide();
		$("#zc-findinFiles").show();
		$("#zc-findin").focus();
		$(".find-count").remove();
		setTimeout(function () {
			$("#find-text").val("").focus();
		}, 100);
	}

	var contentSearchPane = function () {

		if (!($(".zc-ideContainer").hasClass("show-cs-pane"))) {
			$(".zc-ideContainer").addClass("show-cs-pane");
			$("#minimize-cs-pane").addClass("zc-minimize");
		} else {
			$(".zc-ideContainer").removeClass("minimize-cs-pane");
			$("#minimize-cs-pane").addClass("zc-minimize");
		}

		setTimeout(function () {
			$("#my-content-search").focus();
		}, 200);

	}

	var createConfig = function () {
		var isTabavailable = $("#newConfig-tab").length;
		$("#zc-configName").val("");
		$(".zc-createConfigWrap, .zc-manageConfigWrap").addClass("zc-hide");
		$(".zc-runConfig").removeClass("zc-hide");
		if (!(isTabavailable >= 1)) {
			var appendTab = '<li id="newConfig-tab" class="ide-tab">  <span class="tab-text">Manage Configurations</span> <span class="tab-close" title="Close"><i class="icon-9"><svg class="zc-grey"> <use xlink:href="#svg-close-icon"> </use> </svg> </i></span><span class="zc-tabBottomCurve"></span><span class="zc-tabSeparators"></span></li>'
			$("#ide-tab-sortable").append(appendTab);
			$(".ide-tab-wrap .ide-tab").removeClass("tab-active");
			$(".ide-tab-wrap .ide-tab").removeClass('zc-noTabSeparator');
			$("#newConfig-tab").css("display", "inline-flex").addClass("tab-active");
			$("#newConfig-tab").prevAll(':visible:first').addClass('zc-noTabSeparator');
			$(".zc-editorTabContent").addClass("zc-hide");
			$("#zc-createConfig-template").removeClass("zc-hide");

			$('#ide-tab-sortable').find('li').removeClass('zc-tabBorderLast');
			$('#ide-tab-sortable').find('li:visible:last').addClass('zc-tabBorderLast');
		}
		$("#newConfig-tab").trigger("click");
	}

	var manageConfig = function () {
		var isTabavailable = $("#manageConfig-tab").length;
		if (!(isTabavailable >= 1)) {
			var appendTab = '<li id="manageConfig-tab" class="ide-tab"> <span class="tab-text">Manage Configurations</span> <span class="tab-close" title="Close"><i class="icon-9"><svg class="zc-grey"><use xlink:href="#svg-close-icon"></use></svg></i></span></li>'
			$("#ide-tab-sortable").append(appendTab);
			$(".ide-tab-wrap .ide-tab").removeClass("tab-active");
			$(".ide-tab-wrap .ide-tab").removeClass('zc-noTabSeparator');
			$("#manageConfig-tab").css("display", "flex").addClass("tab-active");
			$("#manageConfig-tab").prevAll(':visible:first').addClass('zc-noTabSeparator');
			$(".zc-editorTabContent").addClass("zc-hide");
			$("#zc-manageConfig-template").removeClass("zc-hide");
		} else {
			$("#manageConfig-tab").trigger("click");
		}
	}

	var hide_userPresenceDialog = function () {
		$(".user-presence-wrap").toggle();
		$("#hide-user-presence").toggleClass('show-user');
		if ($("#hide-user-presence").hasClass("show-user")) {
			$("#hide-user-presence .zmenu__text").empty().append("Hide User Presence");
		} else {
			$("#hide-user-presence .zmenu__text").empty().append("Show User Presence");
		}
	}

	var showCollab = function () {

		var getPanelLength = $("#quickAccessCollab:visible").length;

		if (getPanelLength >= 1) {
			$("#quickAccessCollab").trigger("click");
		} else {
			$(".quickAccessSortList").append(quickLaunchCollabBtn);
			$("#quickAccessCollab").trigger("click");
			addToLauncherMenu();
		}

	}

	var showComment = function () {

		var getPanelLength = $("#quickAccessComments:visible").length;

		if (getPanelLength >= 1) {
			$("#quickAccessComments").trigger("click");
		} else {
			$(".quickAccessSortList").append(quickLaunchCommentBtn);
			$("#quickAccessComments").trigger("click");
			addToLauncherMenu();
		}

	}



	var showOutline = function () {

		var getPanelLength = $("#quickAccessOutline:visible").length;

		if (getPanelLength >= 1) {
			$("#quickAccessOutline").trigger("click");
		} else {
			$(".quickAccessSortList").append(quickLaunchOutlineBtn);
			$("#quickAccessOutline").trigger("click");
			addToLauncherMenu();
		}

	}

	var showDebugger = function () {

		var getPanelLength = $("#quickAccessDebug:visible").length;

		if (getPanelLength >= 1) {
			$("#quickAccessDebug").trigger("click");
		} else {
			$(".quickAccessSortList").append(quickLaunchDebugBtn);
			$("#quickAccessDebug").trigger("click");
			addToLauncherMenu();
		}

	}


	consolePane = function () {

		var getPanelLength = $("#quickAccessConsole:visible").length;

		if (getPanelLength >= 1) {
			$("#quickAccessConsole").trigger("click");
		} else {
			$(".quickAccessSortList").append(quickLaunchConsoleBtn);
			$("#quickAccessConsole").trigger("click");
			addToLauncherMenu();
		}

		$('.zc-consoleHeader').removeClass('zc-hide');

		var isTabavailable = $("#console-tab").length;
		if (!(isTabavailable >= 1)) {
			var appendTab = '<li id="console-tab" class="ide-tab ide-consoleTab ui-sortable-handle tab-active"><span class="icon"> <svg class="zc-consoleIcon"> <use xlink:href="#svg-console-icon"> </use> </svg></span> <span class="tab-text">Console</span><span class="tab-close" title="Close"><i class="icon-9"><svg class="zc-grey"> <use xlink:href="#svg-close-icon"> </use></svg> </i> </span></li>'
			$(".zc-hSplit-bottom .ide-tabs").append(appendTab);
			$(".zc-hSplit-bottom .ide-tab-wrap .ide-tab").removeClass("tab-active");
			$(".zc-hSplit-bottom .ide-tab-wrap .ide-tab").prevAll(':visible:first').removeClass('zc-noTabSeparator');
			$("#console-tab").css("display", "inline-block").addClass("tab-active");
			$("#console-tab").prevAll(':visible:first').addClass('zc-noTabSeparator');
			//	$(".zc-editorTabContent").addClass("zc-hide");
			$("#zc-console-template").removeClass("zc-hide");
		} else {
			$("#console-tab").trigger("click");
		}

	}

	problemsPane = function () {

		var getPanelLength = $("#quickAccessProblem:visible").length;

		if (getPanelLength >= 1) {
			$("#quickAccessProblem").trigger("click");
		} else {
			$(".quickAccessSortList").append(quickLaunchProblemBtn);
			$("#quickAccessProblem").trigger("click");
			addToLauncherMenu();
		}
	}

	explorerPane = function () {

		var getPanelLength = $("#quickAccessExplorer:visible").length;

		if (getPanelLength >= 1) {
			$("#quickAccessExplorer").trigger("click");
		} else {
			$(".quickAccessSortList").append(quickLaunchExplorerBtn);
			$("#quickAccessExplorer").trigger("click");
			addToLauncherMenu();
		}
	}


	changesPane = function () {

		var getPanelLength = $("#quickAccessCommit:visible").length;

		if (getPanelLength >= 1) {
			$("#quickAccessCommit").trigger("click");
		} else {
			$(".quickAccessSortList").append(quickLaunchCommitBtn);
			$("#quickAccessCommit").trigger("click");
			addToLauncherMenu();
		}
	}

	chatPane = function () {

		var getPanelLength = $("#quickAccessChat:visible").length;

		if (getPanelLength >= 1) {
			$("#quickAccessChat").trigger("click");
		} else {
			$(".quickAccessSortList").append(quickLaunchChatBtn);
			$("#quickAccessChat").trigger("click");
			addToLauncherMenu();
		}
	}


	searchPane = function () {

		var getPanelLength = $("#quickAccessSearch:visible").length;

		if (getPanelLength >= 1) {
			$("#quickAccessSearch").trigger("click");
		} else {
			$(".quickAccessSortList").append(quickLaunchSearchBtn);
			$("#quickAccessSearch").trigger("click");
			addToLauncherMenu();
		}
	}


	var toggleToolbar = function (_this) {
		$("#zc-ide").toggleClass("zc-hideToolbar");
		_this.toggleClass("hideToolbar");
		$("body").removeClass("zc-toggleNoToolbar");
		//		if(_this.hasClass("hideToolbar")) {
		//			_this.find('.zmenu__text').empty().append('Show Toolbar');
		//
		//		} else {
		//			_this.find('.zmenu__text').empty().append('Hide Toolbar');
		//
		//		}
	}


	var toggleStatusbar = function (_this) {
		$("#zc-ide").toggleClass("zc-hideStatusbar");
		_this.toggleClass("hideStatusbar");
		//		if(_this.hasClass("hideStatusbar")) {
		//			_this.find('.zmenu__text').empty().append('Show Status Bar');
		//		} else {
		//			_this.find('.zmenu__text').empty().append('Hide Status Bar');
		//		}
		if ($('#zc-ide').hasClass('zc-hideStatusbar')) {
			$('#showStatusbar').removeAttr('checked');
			$('#showStatusbar').find('.zmenu__icon svg').remove();
		}

	}


	var toggleFolderTree = function (_this) {
		$("#toggle-foldertree").toggleClass("active");
		$(".zc-ideContainer").toggleClass("hide-left-pane");
		$("#toggle-foldertree").blur();
		_this.toggleClass("hideTree");
		if (_this.hasClass("hideTree")) {
			_this.find('.zmenu__text').empty().append('Show Explorer');
			$("#toggle-foldertree").find("span").attr("title", "Show Explorer");
		} else {
			_this.find('.zmenu__text').empty().append('Hide Explorer');
			$("#toggle-foldertree").find("span").attr("title", "Hide Explorer");
		}
	}

	var toggleCliqBar = function (_this) {
		$("body").toggleClass("zc-hideChatBar");
		if (!($("body").hasClass("zc-hideChatBar"))) {
			//	_this.find('.zmenu__text').empty().append('Hide Cliq Bar');
			$("#zc-toggleChatBar").attr("title", "Hide Cliq Bar");
		} else {
			//_this.find('.zmenu__text').empty().append('Show Cliq Bar');
			$("#zc-toggleChatBar").attr("title", "Show Cliq Bar");
		}
	}


	var leftLauncherBar = function () {
		$(".zc-ideContainer").toggleClass("zc-hideLeftLauncher");
		if ($('.zc-ideContainer').hasClass('zc-hideLeftLauncher')) {
			$('#showLeftlauncherBar').removeAttr('checked');
			$('#showLeftlauncherBar').find('.zmenu__icon svg').remove();
			$('.zc-statusBar').css('left', '0');
			$('.zc-panelX').css('left', '0');
		}
		else {
			$('.zc-statusBar').css('left', '40px');
			$('.zc-panelX').css('left', '40px');
		}
	}

	var rightLauncherBar = function () {
		$(".zc-ideContainer").toggleClass("zc-hideRightLauncher");
		if ($('.zc-ideContainer').hasClass('zc-hideRightLauncher')) {
			$('#showLeftlauncherBar').removeAttr('checked');
			$('#showRightlauncherBar').find('.zmenu__icon svg').remove();
			$('.zc-statusBar').css('right', '0');
			$('.zc-panelX').css('right', '0');
		}
		else {
			$('.zc-statusBar').css('right', '40px');
			$('.zc-panelX').css('right', '40px');
		}
	}


	/* QUICK LAUNCH COLLAB BUTTON */

	var quickLaunchCollabBtn = '<li id="quickAccessCollab" class="zc-keepLauncherStatus" data-tab="collabTab">\
							<button class="zc-btn icon" title="Co-developers">\
								<i class="icon"> <svg class="zc-codevelopIcon"> <use xlink:href="#svg-collab-icon"> </use> </svg> </i>\
							</button>\
						</li>';


	var quickLaunchChatBtn = '<li id="quickAccessChat" class="zc-keepLauncherStatus" data-tab="chatTab">\
							<button class="zc-btn icon" title="Group Chat">\
								<i class="icon"> <svg class="zc-groupchatIcon"> <use xlink:href="#svg-chat-icon"> </use> </svg> </i>\
							</button>\
						</li>';


	var quickLaunchCommentBtn = '<li id="quickAccessComments" class="zc-keepLauncherStatus" data-tab="commentTab">\
							<button class="zc-btn icon" title="Comments">\
								<i class="icon"> <svg class="zc-commentIcon"> <use xlink:href="#svg-comment-icon"> </use> </svg> </i>\
							</button>\
						</li>';


	var quickLaunchOutlineBtn = '<li id="quickAccessOutline" class="zc-keepLauncherStatus zc-quickAccessOutline" data-tab="outlineTab">\
							<button class="zc-btn icon" title="Outline">\
								<i class="icon"> <svg class="zc-outlineIcon"> <use xlink:href="#svg-outline-icon"> </use> </svg> </i>\
							</button>\
						</li>';


	var quickLaunchDebugBtn = '<li id="quickAccessDebug" class="zc-keepLauncherStatus zc-quickAccessDebug" data-tab="debugTab">\
							<button class="zc-btn icon" title="Debugger">\
								<i class="icon"> <svg class="zc-debugIcon"> <use xlink:href="#svg-debug-icon"> </use> </svg> </i>\
							</button>\
						</li>';

	var quickLaunchExplorerBtn = '<li id="quickAccessExplorer" class="zc-keepLauncherStatus zc-quickAccessExplorer" data-tab="explorerTab">\
							<button class="zc-btn icon" title="Explorer">\
								<i class="icon"> <svg class="zc-explorerIcon"> <use xlink:href="#svg-tree-icon"> </use> </svg> </i>\
							</button>\
						</li>';

	var quickLaunchCommitBtn = '<li id="quickAccessCommit" class="zc-keepLauncherStatus zc-quickAccessCommit" data-tab="commitTab">\
							<button class="zc-btn icon" title="Changes">\
								<i class="icon"> <svg class="zc-changesIcon"> <use xlink:href="#svg-changes-icon"> </use> </svg> </i>\
							</button>\
						</li>';

	var quickLaunchConsoleBtn = '<li id="quickAccessConsole" class="zc-keepLauncherStatus zc-quickAccessConsole" data-tab="consoleTab">\
							<button class="zc-btn icon" title="Output Console">\
								<i class="icon"> <svg class="zc-consoleIcon"> <use xlink:href="#svg-console-icon"> </use> </svg> </i>\
							</button>\
						</li>';

	var quickLaunchProblemBtn = '<li id="quickAccessProblem" class="zc-keepLauncherStatus zc-quickAccessProblems" data-tab="problemsTab">\
							<button class="zc-btn icon" title="Problems">\
								<i class="icon"> <svg class="zc-problemIcon"> <use xlink:href="#svg-problems-icon"> </use> </svg> </i>\
							</button>\
						</li>';

	var quickLaunchSearchBtn = '<li id="quickAccessSearch" class="zc-keepLauncherStatus zc-quickAccessSearch" data-tab="searchTab">\
							<button class="zc-btn icon" title="Search">\
								<i class="icon"> <svg class="zc-searchIcon"> <use xlink:href="#svg-contsearch-icon"> </use> </svg> </i>\
							</button>\
						</li>';




	// ZMENU ITEMS CLICK

	$("#zc-ide").on("zmenuitemclick", function (event, data) {

		var _this = data.menuitem,
			getItemId = _this.attr('id'),
			target = $(event.originalTarget);
		$("#sharedUserName-ztokenfield-menu").hide();
		if (_this.is("#ide-upload-files")) {
			uploadFileDialog();
		} else if (_this.is("#ide-commitFiles-3")) {
			commitDialog();
		} else if (_this.is("#ide-compareFiles")) {
			show_dialog($("#ide-compare-dialog"));
		} else if (_this.is("#toggle-terminal")) {
			terminalPane();
		} else if (_this.is("#ide-share-btn")) {
			shareDialog();
		} else if ((_this.is("#zc-findOnly")) || (_this.is("#findSubmenu"))) {
			findOnlyPane();
		} else if ((_this.is("#zc-find")) || (_this.is("#findReplaceSubmenu"))) {
			findReplacePane();
		} else if ((_this.is("#zc-findinFilesMenu")) || (_this.is("#FindFilesSubmenu"))) {
			findFilesPane();
		} else if (_this.is("#zc-editorPref")) {
			show_dialog($("#ide-editorPrefDialog"));
			$('#zc-syntaxTheme-setting').val(getTheme).trigger("chosen:updated");
			$('#zc-theme-setting').val(getSelectedFont).trigger("chosen:updated");
			$('#zc-fontSize').znumberfield("setValue", getFontSize);

			// Comment Style Popover or inline-block
			if (getCommentStyle == "popoverComments") {
				$('#popoverComments').attr('checked', 'checked');
			} else {
				$('#inlineComments').attr('checked', 'checked');
			}


			//INIT TAB 
			$('#zc-editorPrefTab, #zc-notifiPrefTab').ztabpanel();
		} else if (_this.is("#zc-projPrev")) {
			show_dialog($("#ide-projectPreview-dialog"));
		} else if (_this.is("#ide-goto-line")) {
			show_dialog($("#ide-gotoline-dialog"));
		} else if (_this.is("#ide-confirm-info")) {
			show_dialog($("#confirm-info"));
		} else if (_this.is("#ide-confirm-success")) {
			show_dialog($("#confirm-success"));
		} else if (_this.is("#ide-confirm-error")) {
			show_dialog($("#confirm-error"));
		} else if (_this.is("#ide-confirm-warning")) {
			show_dialog($("#confirm-warning"));
		} else if (_this.is("#ide-content-search")) {
			contentSearchPane();
		} else if ((_this.is("#ide-folder-properties")) || (_this.is(".zc-folderInfo"))) {
			show_dialog($("#ide-folderproperties-dialog"));
		} else if ((_this.is("#ide-file-properties")) || (_this.is(".zc-fileInfo"))) {
			show_dialog($("#ide-fileproperties-dialog"));
		} else if (_this.is("#ide-package-delete")) {
			show_dialog($("#ide-deletepackage-dialog"));
		} else if (_this.is("#ide-folder-delete")) {
			show_dialog($("#ide-deletefolder-dialog"));
		} else if (_this.is("#ide-file-delete")) {
			show_dialog($("#ide-delete-dialog"));
		} else if (_this.is("#ide-package-rename")) {
			show_dialog($("#ide-packagerename-dialog"));
		} else if ((_this.is("#ide-folder-rename")) || (_this.is(".zc-folderRename"))) {
			show_dialog($("#ide-folderrename-dialog"));
		} else if ((_this.is("#ide-file-rename")) || (_this.is(".zc-fileRename"))) {
			show_dialog($("#ide-filerename-dialog"));
		} else if (_this.is("#zc-javaConfig")) {
			createConfig();
		} else if (_this.is("#zc-manageConfig")) {
			manageConfig();
		} else if (_this.is("#hide-user-presence")) {
			hide_userPresenceDialog();
		} else if (_this.is("#zc-fileHistory")) {
			fileHistoryDialog();
		} else if (_this.is("#ide-createnewVersion")) {
			show_dialog($("#ide-file-dialog"));
			setTimeout(function () {
				$("#create-file-input").val("index_" + getVersionNo + ".html");
			}, 300);
		} else if (_this.is("#zc-distractionScreenMode")) {
			$("#zc-ide").addClass("zc-distractFree");
		} else if (_this.is("#zc-presentationMode")) {
			if (IsFullScreenCurrently()) {
				GoOutFullscreen();
				$("#editor").css("font-size", "14px");
			} else {
				GoInFullscreen($("#editor").get(0));
				$("#editor").css("font-size", "20px");
			}
		} else if (_this.is(".zc-screenModeMenu")) {
			if (target.closest("#zc-fullScreenModeMenu").length) {
				if (IsFullScreenCurrently()) {
					GoOutFullscreen()
					$("#zc-fullScreenModeMenu").find("i").html('<svg class="zc-grey"> <use xlink:href="#svg-fullScreenSm-icon12"> </use> </svg>');
					$("#zc-fullScreenModeMenu").attr('title', 'Full Screen Mode');
				} else {
					GoInFullscreen($("#fullScreen").get(0));
					$("#zc-fullScreenModeMenu").find("i").html('<svg class="zc-grey"> <use xlink:href="#svg-exitfullScreenSm-icon"> </use> </svg>');
					$("#zc-fullScreenModeMenu").attr('title', 'Exit Full Screen Mode');
				}
			} else if (target.closest("#zc-distractionScreenMode").length) {
				$("#zc-ide").addClass("zc-distractFree");
				$("body").removeClass("zc-showStatusPane");
				$("body").addClass("zc-hideChatBar")
				if ($("#zc-ide").hasClass("zc-distractFree")) {
					infoToast('Press "esc" to exit distraction free mode');
					$("#infoMsg").addClass("zc-distractMsg");
					setTimeout(function () {
						$("#infoMsg").removeClass("show-toast-message");
						$("#infoMsg").removeClass("zc-distractMsg");
					}, 2500);
				}
			} else if (target.closest("#zc-presentationMode").length) {
				$("#application-tab").trigger("click");
				if (IsFullScreenCurrently()) {
					GoOutFullscreen();
					$("#editor").css("font-size", "14px");
				} else {
					GoInFullscreen($("#editor").get(0));
					$("#editor").css("font-size", "20px");
				}
			} else {
				return false;
			}
		} else if (_this.is("#showEditorToolbar")) {
			toggleToolbar(_this);
		} else if (_this.is("#showStatusbar")) {
			toggleStatusbar(_this);
		} else if (_this.is("#showFolderTree")) {
			toggleFolderTree(_this);
		} else if (_this.is("#showCliqBar")) {
			toggleCliqBar(_this);
		} else if (_this.is("#showLeftlauncherBar")) {
			leftLauncherBar();
		} else if (_this.is("#showRightlauncherBar")) {
			rightLauncherBar();
		} else if (_this.is("#go-to-dashboard")) {
			window.open(
				'../app/index.html',
				'_blank'
			);
		} else if (_this.is("#go-to-rep")) {
			window.open(
				'../app/repositories.html',
				'_blank'
			);
		} else if (_this.is("#ide-repService")) {
			show_dialog($("#ide-repServices-dialog"));
		} else if (_this.is("#zc-notifiPreference")) {
			show_dialog($("#ide-notifiPrefDialog"));
		} else if (_this.is("#zc-taskManager-menu")) {
			show_dialog($("#zc-taskManagerDialog"));
		} else if (_this.is("#ide-resetChanges")) {
			show_dialog($("#ide-resetChangesDialog"));
		} else if (_this.is("#ide-saveAs")) {
			show_dialog($("#ide-saveAsDialog"));
		} else if (_this.is("#ide-commitFiles-singleFile")) {
			show_dialog($("#ide-commitSingleDialog"));
		} else if (_this.is("#ide-compareWith")) {
			show_dialog($("#ide-compareWithDialog"));
		}

		else if (_this.is("#ide-projectSetting")) {
			show_dialog($("#ide-projectSettingDialog"));
		}

		else if (_this.is("#ide-projectInfo")) {
			show_dialog($("#ide-projectInfoDialog"));
		}

		else if (_this.is("#ide-openProject")) {
			show_dialog($("#ide-openProjectDialog"));
		}

		else if (_this.is("#ide-switchProject")) {
			show_dialog($("#ide-switchProjectDialog"));
		}

		else if (_this.is("#runFile")) {
			$("body").addClass("zc-showSplitBottom");
			var getActiveFileTab = $(".zc-hSplit-top .zc-fileTabs").children(".tab-active").find(".tab-text").text();
			consolePane();
			$("#console-tab").addClass("ide-consoleTab");
			$(".zc-consolePane").css("display", "block");
			$("#consoleTab-runFile .tab-text").empty().append(getActiveFileTab);
			$("#consoleTab-" + getItemId + "").removeClass("zc-hide");
			$("#consoleTab-" + getItemId + "").trigger("click");
			$("#zc-consoleTitle").css("display", "none");
			$("#console-tabContents").css("display", "block");

			/*-- output console select option function starts --*/

			$("#zc-consolePane-select").zselect("removeOption", getItemId);

			var selectArrayVal = [{
				label: getActiveFileTab,
				value: getItemId
			}];

			$("#zc-consolePane-select").zselect("addOption", selectArrayVal, "after");

			$("#zc-consolePane-select").zselect("setValue", getItemId);

			$('#console-tabContents').find('div[data-id="consoleTab-' + getItemId + '"]').removeClass('zc-hide').siblings().addClass('zc-hide');

			$('#ide-consoleStop').removeClass('zc-hide');
			$('#ide-consoleRun').addClass('zc-hide');

			setTimeout(function () {
				$('#ide-consoleStop').addClass('zc-hide');
				$('#ide-consoleRun').removeClass('zc-hide');
			}, 2000);

			$("#console-tabContents .console-tabContent").zscroll({
				showOne: true,
				scrollend: function (ev, ui) {
					console.log(ev.type, ui);
				},
				//Scroll End Y
				scrollyend: function (ev, ui) {
					console.log(ev.type, ui);
				}
			});


			/*-- output console select option function ends --*/

		} else if (_this.is("#collabPane")) {
			showCollab();
		} else if (_this.is("#commentPane")) {
			showComment();
		} else if (_this.is("#outlinePane")) {
			showOutline();
		} else if (_this.is("#debuggerPane")) {
			showDebugger();
		} else if (_this.is("#toggle-console")) {
			//   $("#consoleTab").css("display", "block");
			// $("#quickAccessConsole").css("display", "block");
			// $("#quickAccessConsole").trigger("click");
			consolePane();
			// 	if(!($("#consolePane-tabs li").hasClass("tab-active"))) {
			// 		$("#console-tabContents").css("display", "none");
			// 		$("#console-tab").removeClass("ide-consoleTab");
			// 		$(".zc-consolePane").css("display", "none");
			// 	}
		} else if (_this.is("#ide-problems-menu")) {
			problemsPane();
		} else if (_this.is("#ide-explorer-menu")) {
			explorerPane();
		} else if (_this.is("#ide-changes-menu")) {
			changesPane();
		} else if (_this.is("#chatPane")) {
			chatPane();
		} else if (_this.is("#ide-search-menu")) {
			searchPane();
		} else if (_this.is("#zc-notifyCollab")) {
			$("#ide-collab-menu").zmenu("hide");
			openNotifyCollaborator();
		}
		//-- Keyboard Short cut more action click -- //
		else if (_this.is("#ide-keyboardPrefEdit")) {
			editKeyBoardShortCut();
		}
		else if (_this.is("#ide-keyboardPrefReset")) {
			resetKeyBoardShortCut();
		}
		else if (_this.is("#ide-keyboardPrefClear")) {
			clearKeyBoardShortCut();
		}


		else if (_this.is("#" + getItemId + "")) {
			var consoleTabsArray = ['runFile', 'default', 'performTest'];
			if (_this.closest('#ide-runMenu').length || (consoleTabsArray.includes(getItemId)) || _this.closest('#ide-debugOnlyMenu').length) {
				$('.zc-runAniIcon').addClass('animate');
				consolePane();
				$("#console-tab").addClass("ide-consoleTab");
				$(".zc-consolePane").css("display", "block");
				$("#consoleTab-" + getItemId + "").removeClass("zc-hide");
				$("#consoleTab-" + getItemId + "").trigger("click");
				$("#zc-consoleTitle").css("display", "none");
				$("#console-tabContents").css("display", "block");

				/*-- output console select option function starts --*/

				$("#zc-consolePane-select").zselect("removeOption", getItemId);

				var consArrayVal = {
					'default': 'Default Configuration',
					'performTest': 'Set_Performance_Test'
				}

				var otherValArray = [{
					label: consArrayVal[getItemId],
					value: getItemId
				}];

				if (consArrayVal[getItemId] !== undefined) {
					$("#zc-consolePane-select").zselect("addOption", otherValArray, "after");

					$("#zc-consolePane-select").zselect("setValue", getItemId);
					$('#console-tabContents').find('div[data-id="consoleTab-' + getItemId + '"]').removeClass('zc-hide').siblings().addClass('zc-hide');

				}

				$('#ide-consoleStop').removeClass('zc-hide');
				$('#ide-consoleRun').addClass('zc-hide');

				/*-- output console select option function ends --*/
			}
		}
	});


	/*-- output console select oprtion function starts ---*/
	$(function () {

		$(document).on('click', '#ide-consoleRun', function () {

			$('#ide-consoleStop').removeClass('zc-hide');
			$('#ide-consoleRun').addClass('zc-hide');

			setTimeout(function () {
				$('#ide-consoleStop').addClass('zc-hide');
				$('#ide-consoleRun').removeClass('zc-hide');
			}, 2500);

		});

		$(document).on('click', '#ide-consoleStop', function () {

			$('#ide-consoleStop').addClass('zc-hide');
			$('#ide-consoleRun').removeClass('zc-hide');

		})

	})


	/*-- output console select option function ends --*/



	/*------------------------------------------------------------------------------
			CLOSE THE OPEN DIALOG 
	-------------------------------------------------------------------------------*/

	$("#zc-ide").on("click", ".zc-dialog-close, .zc-cancelBtn", function () {
		if ($(this).is("#close-editorPref-dialog")) {
			$("#zc-editorCancelBtn").trigger("click");
		} else if ($(this).is("#ide-newfolder-close")) {
			$("#cancel-newfolder-btn").trigger("click");
		} else {
			$(this).closest(".zc-dialog").removeClass("zc-showDialog");
			$(".zc-confirm-overlay").removeClass("zc-isVisible");
			$(".zc-overlayBlack").removeClass("zc-isVisible");
		}
	});


	/*------------------------------------------------------------------------------
																					  DIALOG DRAGGABLE 
																	  -------------------------------------------------------------------------------*/

	$(".zc-dialog.zc-modaless").draggable({ containment: ".zc-ideContainer", scroll: false, handle: ".zc-dialog-header" });


	/*------------------------------------------------------------------------------
																					 SHARE PROJECTS
																	   -------------------------------------------------------------------------------*/
	$(window).load(function () {
		$(document).on("click", "#ide-share-btn", function () {
			var dialogId = $("#zc-project-share");
			show_dialog(dialogId);
			$("#sharedUserName").ztokenfield('removeTokens');
			textfield_hide_error('#sharedUserName-ztokenfield-container', '#add-cd-required');
			$("#manage-cd-list").removeClass("zc-isVisible");
			$(".zc-share-wrap").removeClass("zc-showDialog");
			$("#sharedUserName-ztokenfield-container").addClass("has-focus");

			//reset
			$("#zc-share-btn").removeClass("zc-loading");
			$('#zc-share-btn').empty().append('Share');
			$(".zc-action-overlay").removeClass('show-action-overlay');
			$(".zc-overlay .zc-dialog-close").removeClass("disabled");
		});
	})



	/*-------------------------------------- SHARE BUTTON CLICK ----------------------------------*/
	$(window).load(function () {
		$('#zc-share-btn').on("click", function () {
			var allTokens = $('#sharedUserName').ztokenfield("getAllValues");
			var ifcheck = true;
			var getEmail,
				getImage,
				getName;
			$.each(allTokens, function (index) {
				getEmail = this.email,
					getImage = this.imageURL,
					getName = this.name;
				$("#manage-cd-list .shared-list-wrap").append('<div class="manage-shared-list">\
<span class="scd-pic"> <img src='+ getImage + '> </span>\
<span class="scd-info">\
<span class="scd-name">	'+ getName + ' </span>\
<span class="scd-mail">'+ getEmail + '</span>\
</span>\
<span class="scd-permission">\
<select id="zc-share-permission-1" class="chosen-select-no-single zc-share-permission-1" style="width:120px;"><option value=""></option>\
<option value="Write" selected="selected">Write</option>\
<option value="Read Only">Read Only</option>\
</select>\
</span>\
<span class="scd-remove zc-fright">\
<button class="zc-btn icon" title="Remove Share">\
<i class="icon-12">\
<svg class="zc-black"> <use xlink:href="#svg-close-icon"> </use> </svg>\
</i>\
</button>\
</span>\
</div>');

				$(".shared-list-wrap-1").append('<div class="shared-user">\
<span class="scd-pic"> <img src='+ getImage + '> </span>\
<span class="scd-info">\
<span class="scd-name">	'+ getName + ' </span>\
</span>\
</div>');

			});

			var config = {
				'.chosen-select': {},
				'.chosen-select-deselect': { allow_single_deselect: true },
				'.chosen-select-no-single': { disable_search_threshold: 10 },
				'.chosen-select-no-results': { no_results_text: 'Oops, nothing found!' },
				'.chosen-select-width': { width: "95%" }
			}
			for (var selector in config) {
				$(selector).chosen(config[selector]);
			}

			$(".scd-permission .chosen-single div b").empty().append('<svg> <use xlink:href="#svg-selectarrow-icon"> </use> </svg>');

			var getPermission = $("#zc-share-permission").chosen().val(),
				getPermission = $.trim(getPermission);

			if (getPermission == "Developer") {
				$(".zc-share-permission-1").val("Developer");
				$('.zc-share-permission-1').trigger("chosen:updated");
			} else if (getPermission == "Reviewer") {
				$(".zc-share-permission-1").val("Reviewer");
				$('.zc-share-permission-1').trigger("chosen:updated");
			}

			if (allTokens <= 0) {
				textfield_show_error('#sharedUserName-ztokenfield-container', '#add-cd-required');
				ifcheck = false;

			} else {
				ifcheck = true;

				textfield_hide_error('#sharedUserName-ztokenfield-container', '#add-cd-required');
				$(".zc-action-overlay").addClass('show-action-overlay');
				$(".zc-overlay .zc-dialog-close").addClass("disabled");

				addButtonLoading($('#zc-share-btn'), "Sharing");

				setTimeout(function () {
					$("#add-codeveloper, .shared-list-wrap-1").removeClass("zc-hide");
					hide_dialog();
					successToast("The project has been shared.");
					removeButtonLoading($('#zc-share-btn'), "Share");
				}, showToastTime);

				hideToast();
			}
		});
	})


	/* ADD TOKEN */

	$("#sharedUserName").on("ztokenfieldtokenadd", function (orgEvent, ui) {
		var allMemberTokens = $('#sharedUserName').ztokenfield("getAllValues");
		if (!(allMemberTokens <= 0)) {
			textfield_hide_error('#sharedUserName-ztokenfield-container', '#add-cd-required');
		} else {
			textfield_show_error('#sharedUserName-ztokenfield-container', '#add-cd-required');
		}
	});

	$("#sharedUserName").on("ztokenfieldtokenremove", function (orgEvent, ui) {
		var allMemberTokens = $('#sharedUserName').ztokenfield("getAllValues");
		if (!(allMemberTokens <= 0)) {
			textfield_hide_error('#sharedUserName-ztokenfield-container', '#add-cd-required');
		} else {
			textfield_show_error('#sharedUserName-ztokenfield-container', '#add-cd-required');
		}
	});


	/*-------------------------------------- MANAGE SHARED USERS  ----------------------------------*/

	$(document).on("click", "#manage-developer", function () {
		$(".zc-share-wrap").addClass("zc-hide-dialog")
		$("#manage-cd-list").addClass("show-dialog");
		$("#manage-back-btn").removeClass("zc-hide")
	});

	$(document).on("click", "#manage-back-btn", function () {
		$(".zc-share-wrap").removeClass("zc-hide-dialog")
		$("#manage-cd-list").removeClass("show-dialog");
		$("#manage-back-btn").addClass("zc-hide")
	});

	/*----------------------- CANCEL SHARE -----------------------------*/
	$(window).load(function () {
		$(document).on("click", "#zc-cancel-share, .zc-delete-close", function () {
			hide_dialog();
			$("#manage-cd-list").removeClass("show-dialog");
			$(".zc-share-wrap").removeClass("zc-hide-dialog");
		});
	})

	/*----------------------- SHARE AFTER TOKEN FIELD -----------------------------*/

	$("#sharedUserName").on('ztokenfieldaftertokenadd', function (orgEvent, ui) {
		textfield_hide_error('#sharedUserName-ztokenfield-container', '#add-cd-required');
	});

	/*----------------------- REMOVE CO-DEVELOPERS -----------------------------*/

	var selectedUser, getIndex;
	$(document).on("click", "#manage-cd-list .scd-remove", function () {

		$("#zc-overlay-white .zc-confirm-overlay").addClass("zc-isVisible");
		$("#remove-share-confirm").addClass("zc-showDialog");
		$(".zc-overlay").css("overflow", "hidden");

		selectedUser = $(this).parent('.manage-shared-list');
		getIndex = selectedUser.index();

		var getUserName = selectedUser.find('.scd-name').text(),
			getUserName = $.trim(getUserName);

		$("#remove-share-confirm").find('.zc-dialog-msg').empty().append('Are you sure you want to remove sharing for <span class="zc-font-bold">' + getUserName + '</span>?');
	});

	/*----------------- CONFIRM DIALOG ---------------*/

	$(document).on("click", "#rs-confirm-yes", function () {
		var dialogId = $("#remove-share-confirm");
		hide_Confirmdialog(dialogId);
		selectedUser.fadeOut("normal", function () {
			selectedUser.remove();
		});
		$('.shared-list-wrap-1 .shared-user').eq(getIndex).remove();
		var getShareCount = $('.shared-list-wrap .manage-shared-list').length;

		if (getShareCount == 1) {
			$("#add-codeveloper").addClass("zc-hide");
			$("#manage-cd-list").removeClass("show-dialog");
			$(".zc-share-wrap").removeClass("zc-hide-dialog");
		}
	});

	$(document).on("click", "#rs-confirm-no", function () {
		var dialogId = $("#remove-share-confirm");
		hide_Confirmdialog(dialogId);
	});


	/*----------------------------------------------------------------------------------------------------
																																	UPLOAD FILE FLOW
		------------------------------------------------------------------------------------------------------*/


	$("#cancel-upload-dialog, #close-upload-dialog").on("click", function () {
		hide_dialog();

		// PROTOTYPE ERROR CASES
		$("#pt-upload-case").removeClass("show-error-case");
	});



	/*---------  NO FILE CHOOSEN CASE ---------*/

	$("#no-file-selected").on("click", function () {
		$("#uploadHelpText").css("display", "block");
		$("#select-upload-error").css("display", "none");
		$("#select-upload-error").addClass("zc-hide").empty().append("Select at least one file to upload.");

		$("#upload-banner-alert").addClass("zc-hide");

		$("#zc-file-upload").removeClass("id-inputfile-1").addClass("id-inputfile");

		$("#upload-file").removeClass("id-file-exist-upload id-upload-success disabled id-singleupload-success").addClass("id-upload");
	});

	/*---------   FILE SIZE EXCEED THE MAXIMUM SIZE ---------*/
	$("#filesize-exceed-s").on("click", function () {
		$("#uploadHelpText").css("display", "block");
		$("#select-upload-error").css("display", "none");
		$("#select-upload-error").addClass("zc-hide").empty().append("File size cannot be greater than 10 MB.");

		$("#upload-banner-alert").addClass("zc-hide");

		$("#zc-file-upload").removeClass("id-inputfile-1").addClass("id-inputfile");

		$("#upload-file").removeClass("id-file-exist-upload id-upload-success disabled id-singleupload-success").addClass("id-upload");
	});


	/*---------   FILE SIZE EXCEED THE MAXIMUM SIZE ---------*/
	$("#filesize-exceed-m").on("click", function () {
		$("#uploadHelpText").css("display", "block");
		$("#select-upload-error").css("display", "none");
		$("#select-upload-error").addClass("zc-hide").empty().append("Total size of selected files cannot be greater than 10 MB.");

		$("#upload-banner-alert").addClass("zc-hide");

		$("#zc-file-upload").removeClass("id-inputfile-1").addClass("id-inputfile");

		$("#upload-file").removeClass("id-file-exist-upload id-upload-success disabled id-singleupload-success").addClass("id-upload");

	});


	/*--------  FILE NAME EXIST -------*/

	$("#file-exist").on("click", function () {
		$("#uploadHelpText").css("display", "block");
		$("#upload-banner-alert").addClass("zc-hide");
		$("#upload-banner-alert .zc-toast-text").empty().append("Unable to upload because a file or folder with the same name already exists.");
		$("#select-upload-error").css("display", "none");
		$("#select-upload-error").addClass("zc-hide");

		$("#upload-file").removeClass("id-upload id-upload-success disabled id-singleupload-success").addClass("id-file-exist-upload");

		$("#zc-file-upload").removeClass("id-inputfile").addClass("id-inputfile-1");

		$("#upload-file").removeClass("id-upload id-upload-success disabled").addClass("id-file-exist-upload");

		$(".selected-files").addClass("zc-hide").empty().append('manageadmin.css');

	});


	/*---- More than one files are selected. Within that one  file name is already exist -----*/

	$("#more-file-exist").on("click", function () {
		$("#uploadHelpText").css("display", "block");

		$("#upload-banner-alert").addClass("zc-hide");

		$("#upload-banner-alert .zc-toast-text").empty().append('Uploaded 5 out of 6 files. Cannot upload "test.java"  because a file or folder with the same name already exists.');

		$("#select-upload-error").css("display", "none");

		$("#select-upload-error").addClass("zc-hide");

		$("#upload-file").removeClass("id-upload id-upload-success disabled id-singleupload-success").addClass("id-file-exist-upload");

		$("#zc-file-upload").removeClass("id-inputfile").addClass("id-inputfile-1");

		$("#upload-file").removeClass("id-upload").addClass("id-file-exist-upload");

		$(".selected-files").addClass("zc-hide").empty().append('6 files selected');

	});


	/*---- More than one files are selected. Within that two or more file name is already exist -----*/

	$("#more-file-exist-1").on("click", function () {

		$("#uploadHelpText").css("display", "block");

		$("#upload-banner-alert").addClass("zc-hide");

		$("#upload-banner-alert .zc-toast-text").empty().append('Uploaded 3 out of 6 files. Cannot upload the below files because a file or folder with the same name already exists. <ul><li> usermgmt.java</li> <li>base.css </li> <li>uicomponents.js </li> </ul>');

		$("#select-upload-error").css("display", "none");

		$("#select-upload-error").addClass("zc-hide");

		$("#upload-file").removeClass("id-upload id-upload-success disabled id-singleupload-success").addClass("id-file-exist-upload");

		$("#zc-file-upload").removeClass("id-inputfile").addClass("id-inputfile-1");

		$("#upload-file").removeClass("id-upload").addClass("id-file-exist-upload");

		$(".selected-files").addClass("zc-hide").empty().append('6 files selected');

	});


	/*-------- All files are failed to import ------------*/

	$("#all-files-failed").on("click", function () {

		$("#uploadHelpText").css("display", "block");

		$("#upload-banner-alert").addClass("zc-hide");

		$("#upload-banner-alert .zc-toast-text").empty().append('Unable to upload all files because a file or folder with the same name already exists, respectively.');

		$("#select-upload-error").css("display", "none");

		$("#select-upload-error").addClass("zc-hide");

		$("#upload-file").removeClass("id-upload id-upload-success disabled id-singleupload-success").addClass("id-file-exist-upload");

		$("#zc-file-upload").removeClass("id-inputfile").addClass("id-inputfile-1");

		$("#upload-file").removeClass("id-upload").addClass("id-file-exist-upload");

		$(".selected-files").addClass("zc-hide").empty().append('6 files selected');
	});


	/*-------- File could not be imported due to unknown error. ------------*/

	$("#failed-unknown").on("click", function () {

		$("#uploadHelpText").css("display", "block");

		$("#upload-banner-alert").addClass("zc-hide");

		$("#upload-banner-alert .zc-toast-text").empty().append('Upload failed due to an unknown error. Please retry now or later.');

		$("#select-upload-error").css("display", "none");

		$("#select-upload-error").addClass("zc-hide");

		$("#upload-file").removeClass("id-upload id-upload-success disabled id-singleupload-success").addClass("id-file-exist-upload");

		$("#zc-file-upload").removeClass("id-inputfile").addClass("id-inputfile-1");

		$("#upload-file").removeClass("id-upload").addClass("id-file-exist-upload");

		$(".selected-files").addClass("zc-hide").empty().append('manageadmin.css');
	});

	/*-------- More than one files are selected. Within that one file could not be imported due to unknown error. ------------*/

	$("#more-failed-unknown").on("click", function () {

		$("#uploadHelpText").css("display", "block");

		$("#upload-banner-alert").addClass("zc-hide");

		$("#upload-banner-alert .zc-toast-text").empty().append('Uploaded 5 out of 6 files. The file "usermgmt.java" failed due to an unknown error.');

		$("#select-upload-error").css("display", "none");

		$("#select-upload-error").addClass("zc-hide");

		$("#upload-file").removeClass("id-upload id-upload-success disabled id-singleupload-success").addClass("id-file-exist-upload");

		$("#zc-file-upload").removeClass("id-inputfile").addClass("id-inputfile-1");

		$("#upload-file").removeClass("id-upload").addClass("id-file-exist-upload");

		$(".selected-files").addClass("zc-hide").empty().append('6 files selected');
	});


	/*-------- More than one files are selected. Within that two or more file could not be imported due to unknown error. ---------*/

	$("#more-failed-unknown-1").on("click", function () {

		$("#uploadHelpText").css("display", "block");

		$("#upload-banner-alert").addClass("zc-hide");

		$("#upload-banner-alert .zc-toast-text").empty().append('Uploaded 2 out of 5 files. The following files failed due to an unknown error: <ul><li> usermgmt.java</li> <li>base.css </li> <li>uicomponents.js </li> </ul>');

		$("#select-upload-error").css("display", "none");

		$("#select-upload-error").addClass("zc-hide");

		$("#upload-file").removeClass("id-upload id-upload-success disabled").addClass("id-file-exist-upload");

		$("#zc-file-upload").removeClass("id-inputfile").addClass("id-inputfile-1");

		$("#upload-file").removeClass("id-upload").addClass("id-file-exist-upload");

		$(".selected-files").addClass("zc-hide").empty().append('6 files selected');
	});


	/*-------------------------------- MULTIPLE FILE UPLOAD SUCCESSFULLY ------------------------------*/

	$("#upload-success").on("click", function () {

		$("#uploadHelpText").css("display", "block");

		$("#upload-banner-alert").addClass("zc-hide");

		$("#select-upload-error").css("display", "none");

		$("#select-upload-error").addClass("zc-hide");

		$("#zc-file-upload").removeClass("id-inputfile").addClass("id-inputfile-1");

		$("#upload-file").removeClass("id-upload disabled id-file-exist-upload id-singleupload-success").addClass("id-upload-success");

		$(".selected-files").addClass("zc-hide").empty().append('6 files selected');

	});



	/*-------------------------------- SINGLE FILE UPLOAD SUCCESSFULLY ------------------------------*/

	$("#upload-success-single").on("click", function () {

		$("#uploadHelpText").css("display", "block");

		$("#upload-banner-alert").addClass("zc-hide");

		$("#select-upload-error").css("display", "none");

		$("#select-upload-error").addClass("zc-hide");

		$("#zc-file-upload").removeClass("id-inputfile").addClass("id-inputfile-1");

		$("#upload-file").removeClass("id-upload disabled id-upload-success id-file-exist-upload").addClass("id-singleupload-success");

		$(".selected-files").addClass("zc-hide").empty().append('6 files selected');

	});

	/*-------------------------------- FILE UPLOAD SUCCESSFULLY ------------------------------*/


	$("#close-toast-alert").on("click", function () {
		$("#upload-banner-alert").addClass("zc-hide");
		$("#upload-file").removeClass("disabled");
		$(".selected-files").empty().addClass("zc-hide");
	});

	$("#ide-file-upload").on("click", ".id-upload", function () {

		$("#select-upload-error").removeClass("zc-hide");
		$("#select-upload-error").css("display", "block");
		$("#upload-banner-alert").addClass("zc-hide");
		$("#uploadHelpText").css("display", "none");
		$(this).blur();
	});

	$("#ide-file-upload").on("click", ".id-file-exist-upload", function () {
		$("#uploadHelpText").css("display", "block");

		$("#select-upload-error").addClass("zc-hide");

		$("#select-upload-error").css("display", "none");

		$("#upload-file").addClass("zc-loading");
		$("#upload-file").empty().append('<span class="zc-loader"> </span> Uploading');
		$("#ide-file-upload .zc-action-overlay").addClass("show-action-overlay");
		$(this).blur();
		setTimeout(function () {
			$("#ide-file-upload .zc-action-overlay").removeClass("show-action-overlay");
			$("#upload-banner-alert").removeClass("zc-hide");
			$("#upload-file").empty().append('Upload');
			$("#upload-file").removeClass("zc-loading");
			$("#upload-file").addClass("disabled");

		}, 2000);
	});



	$("#ide-file-upload").on("click", ".id-upload-success", function () {

		$("#uploadHelpText").css("display", "block");
		$("#ide-file-upload .zc-action-overlay").addClass("show-action-overlay");

		addButtonLoading($('.id-upload-success'), "Uploading");

		setTimeout(function () {
			$("#pt-upload-case").removeClass("show-error-case");
			hide_dialog();
			successToast("All files uploaded successfully.");
			toast_Position();
			removeButtonLoading($('.id-upload-success'), "Upload");
		}, showToastTime);

		hideToast();

	});



	$("#ide-file-upload").on("click", ".id-singleupload-success", function () {

		$("#uploadHelpText").css("display", "block");
		$("#ide-file-upload .zc-action-overlay").addClass("show-action-overlay");

		addButtonLoading($('.id-singleupload-success'), "Uploading");

		setTimeout(function () {
			$("#pt-upload-case").removeClass("show-error-case");
			hide_dialog();
			successToast("File uploaded successfully.");
			toast_Position();
			removeButtonLoading($('.id-singleupload-success'), "Upload");
		}, showToastTime);

		hideToast();

	});



	$(".zc-file-upload").on("change", ".id-inputfile", function () {
		$("#select-upload-error").removeClass("zc-hide");
		$("#select-upload-error").css("display", "block");
		$(".selected-files").addClass("zc-hide");
		$("#uploadHelpText").css("display", "none");
	});

	$(".zc-file-upload").on("change", ".id-inputfile-1", function () {
		$("#select-upload-error").addClass("zc-hide");
		$("#select-upload-error").css("display", "none");
		$(".selected-files").removeClass("zc-hide");
		$("#uploadHelpText").css("display", "block");
	});


	/*------------------------------------------------------------------------------------------------------
																			REPOSITORY SERVICES
													-------------------------------------------------------------------------------------------------------*/

	/* HIDE DIALOG */
	$("#zc-ide").on("click", "#repOkBtn, #repService-close-Btn", function () {
		hide_dialog();
	});

	/*GITHUB CONNECT*/
	$("#zc-ide").on("click", "#githubConnect", function () {
		var _this = $(this);

		_this.toggleClass("zc-connect");
		if (_this.hasClass("zc-connect")) {
			window.open("https://github.com/login/oauth/authorize?state=930604033&client_id=8b231c4035546f1e5055&redirect_uri=https://code.zoho.com/services/connect/github&scope=repo,user:email,write:public_key", "Google", "width=600,height=600");
			_this.empty().append("Disconnect");
			_this.removeClass('zc-gradient').addClass("zc-secondary");
		} else {
			_this.removeClass('zc-secondary').addClass("zc-gradient");
			_this.empty().append("Connect");
		}
	});

	/* Bitbucket Connect */
	$("#zc-ide").on("click", "#bitbucketConnect", function () {
		var _this = $(this);

		_this.toggleClass("zc-connect");
		if (_this.hasClass("zc-connect")) {
			window.open("https://github.com/login/oauth/authorize?state=930604033&client_id=8b231c4035546f1e5055&redirect_uri=https://code.zoho.com/services/connect/github&scope=repo,user:email,write:public_key", "Google", "width=600,height=600");
			_this.removeClass('zc-gradient').addClass("zc-secondary");
			_this.empty().append("Disconnect");
		} else {
			_this.removeClass('zc-secondary').addClass("zc-gradient");
			_this.empty().append("Connect");
		}
	});

	$("#zc-ide").on("click", '#ide-repService', function () {
		show_dialog($("#ide-repServices-dialog"));
		//	$("#ide-profileClose-tab").trigger("click");
	});

	$("#zc-ide").on("click", '#zc-notifiPreference', function () {
		show_dialog($("#ide-notifiPrefDialog"));
		$("#ide-profileClose-tab").trigger("click");
	});


	/*------------------------------------------------------------------------------------------------------
																			NEW DIALOG VALIDATION FUNCTIONS
													--------------------------------------------------------------------------------------------------------*/

	/* REQUIRED FIELD VALIDATION  FUNCTION  */
	var iffieldcheck = true,
		ifoptionalfieldcheck = true;
	var alreadyexistname = ['usermgmt', 'admin', 'base', 'component', 'development'];

	var onfocusout_validate_field = function (getinputId, geterrorId, getrequiredMsg, getformat, getformateMsg, getexistMsg) {
		var reqInputVal = getinputId.val(),
			reqInputVal = $.trim(reqInputVal);

		/* REQUIRED FIELD VALIDATION  FUNCTION  */
		if (reqInputVal == "" || reqInputVal == null) {
			getinputId.addClass("zc-error");
			geterrorId.removeClass("zc-hide");
			geterrorId.next('.zc-hint').addClass("zc-hide");
			geterrorId.empty().append(getrequiredMsg);
			iffieldcheck = false;
		}
		/* FORMATE VALIDATION  FUNCTION  */
		else if (!getformat.test(reqInputVal)) {
			getinputId.addClass("zc-error");
			geterrorId.removeClass("zc-hide");
			geterrorId.next('.zc-hint').addClass("zc-hide");
			geterrorId.empty().append(getformateMsg);
			iffieldcheck = false;
		}
		/* ALREADY EXIST */
		else if ($.inArray(reqInputVal, alreadyexistname) != -1) {
			getinputId.addClass("zc-error")
			geterrorId.removeClass("zc-hide");
			geterrorId.next('.zc-hint').addClass("zc-hide");
			geterrorId.empty().append(getexistMsg);
			iffieldcheck = false;
		} else {
			getinputId.removeClass("zc-error");
			geterrorId.addClass("zc-hide");
			geterrorId.next('.zc-hint').removeClass("zc-hide");
			iffieldcheck = true;
		}
	}

	/* OPTIONAL FIELD VALIDATION  FUNCTION  */
	var onfocusout_validate_optionalfield = function (getinputId, geterrorId, getformat, getformateMsg) {
		var reqInputVal = getinputId.val(),
			reqInputVal = $.trim(reqInputVal);

		if (!getformat.test(reqInputVal)) {
			getinputId.addClass("zc-error");
			geterrorId.removeClass("zc-hide");
			geterrorId.next('.zc-hint').addClass("zc-hide");
			geterrorId.empty().append(getformateMsg);
			ifoptionalfieldcheck = false;
		}
		else {
			getinputId.removeClass("zc-error");
			geterrorId.addClass("zc-hide");
			geterrorId.next('.zc-hint').removeClass("zc-hide");
			ifoptionalfieldcheck = true;
		}
	}

	/* CONTENT SEARCH FIELD VALIDATION  FUNCTION  */
	var onfocusout_validate_required_field = function (getinputId, geterrorId, getrequiredMsg) {
		var reqInputVal = getinputId.val(),
			reqInputVal = $.trim(reqInputVal);

		/* REQUIRED FIELD VALIDATION  FUNCTION  */
		if (reqInputVal == "" || reqInputVal == null) {
			getinputId.addClass("zc-error");
			geterrorId.removeClass("zc-hide");
			geterrorId.next('.zc-hint').addClass("zc-hide");
			geterrorId.empty().append(getrequiredMsg);
			iffieldcheck = false;
		} else {
			getinputId.removeClass("zc-error");
			geterrorId.addClass("zc-hide");
			geterrorId.next('.zc-hint').removeClass("zc-hide");
			iffieldcheck = true;
		}
	}

	/* VALIDATION  FUNCTION ON KEYDOWN */
	var onkeydown_validate_field = function (getinputId, geterrorId, getformat, getformateMsg) {
		var reqInputVal = getinputId.val(),
			reqInputVal = $.trim(reqInputVal);
		//		if(reqInputVal!="" || reqInputVal != null) {
		//			getinputId.removeClass("zc-error");
		//			geterrorId.addClass("zc-hide");
		//			geterrorId.next('.zc-hint').removeClass("zc-hide");
		//		} 
		/* FORMATE VALIDATION  FUNCTION  */

		if (!getformat.test(reqInputVal)) {

			getinputId.addClass("zc-error");
			geterrorId.removeClass("zc-hide");
			geterrorId.next('.zc-hint').addClass("zc-hide");
			geterrorId.empty().append(getformateMsg);
			iffieldcheck = false;
		} else {
			getinputId.removeClass("zc-error");
			geterrorId.addClass("zc-hide");
			geterrorId.next('.zc-hint').removeClass("zc-hide");
			iffieldcheck = true;
		}


	}

	/* SUCCESS FUNCTION */
	var onclick_search_success = function (getinputId, geterrorId, getdialogId, getbuttonId, getsuccessMsg) {
		if (iffieldcheck == true) {
			getbuttonId.addClass("zc-loading");
			getbuttonId.empty().append('<span class="zc-loader"> </span>  Searching');
			getdialogId.find(".zc-action-overlay").addClass("show-action-overlay");
			getbuttonId.blur();
			setTimeout(function () {
				var dialogId = $("#ide-contentsearch-dialog");
				hide_modeless_dialog(dialogId);
				getbuttonId.removeClass("zc-loading");
				getbuttonId.empty().append('Search');
				getdialogId.find(".zc-action-overlay").removeClass("show-action-overlay");
				$("#content-search-btn").empty().append('Search');
				$("#custom-search").trigger('click');
				$("#custom-search").removeClass("zc-hide");
			}, 2500);

		}

	}

	/* RENAME SUCCESS FUNCTION */
	var onclick_rename_success = function (getinputId, geterrorId, getdialogId, getbuttonId, getsuccessMsg) {
		if (iffieldcheck == true) {
			getbuttonId.addClass("zc-loading");
			//getbuttonId.empty().append('<span class="zc-loader"> </span> Creating');
			//getdialogId.find(".zc-action-overlay").addClass("show-action-overlay");
			getbuttonId.blur();
			setTimeout(function () {
				hide_dialog();
				getbuttonId.removeClass("zc-loading");
				//getbuttonId.empty().append('Create');
				getdialogId.find(".zc-action-overlay").removeClass("show-action-overlay");
				$("#ide-succes-msg").addClass("show-toast-message");
				toast_Position();
				$("#ide-succes-msg").find('.zc-toast-text').empty().append(getsuccessMsg);
			}, 200);
			setTimeout(function () {
				$("#ide-succes-msg").removeClass("show-toast-message");
			}, 3500);
		}
	}

	/* SUCCESS FUNCTION FOR CREATING NEW FOLDER IN FILE DIALOG */
	var onclick_newFolder_success = function (getinputId, geterrorId, getdialogId, getbuttonId, getsuccessMsg) {
		if (iffieldcheck == true) {
			getbuttonId.addClass("zc-loading");
			getbuttonId.empty().append('<span class="zc-loader"> </span> Creating');
			getdialogId.find(".zc-action-overlay").addClass("show-action-overlay");
			getbuttonId.blur();
			setTimeout(function () {
				var dialogId = $("#ide-newfolder-dialog");
				hide_Confirmdialog(dialogId);
				getbuttonId.removeClass("zc-loading");
				getbuttonId.empty().append('Create');
				getdialogId.find(".zc-action-overlay").removeClass("show-action-overlay");
				$("#ide-succes-msg").addClass("show-toast-message");
				//toast_Position();
				$("#ide-succes-msg").find('.zc-toast-text').empty().append(getsuccessMsg);
			}, 800);
			setTimeout(function () {
				$("#ide-succes-msg").removeClass("show-toast-message");
			}, 2500);
		}
	}

	/* CLASS SUCCESS FUNCTION */
	var onclick_optional_success = function (getinputId, geterrorId, getdialogId, getbuttonId, getsuccessMsg) {
		if (iffieldcheck == true && ifoptionalfieldcheck == true) {
			getbuttonId.addClass("zc-loading");
			getbuttonId.empty().append('<span class="zc-loader"> </span> Creating');
			getdialogId.find(".zc-action-overlay").addClass("show-action-overlay");
			getbuttonId.blur();
			setTimeout(function () {
				hide_dialog();
				getbuttonId.removeClass("zc-loading");
				getbuttonId.empty().append('Create');
				getdialogId.find(".zc-action-overlay").removeClass("show-action-overlay");
				successToast(getsuccessMsg);
				toast_Position();
			}, showToastTime);
			hideToast();
		}
	}


	/*---------------------------------
																 FOLDER FLOW
													-------------------------------------*/



	/* FOLDER NAME FIELD FOCUSOUT FIELD */
	//	$("#create-folder-input").on("focusout", function() {
	//		var setinputId     = $("#create-folder-input"),
	//			seterrorId     = $("#folder-name-error"),
	//			setFormat      = /^([a-zA-Z0-9\s-_.]{0,100})$/,
	//			setrequiredMsg = "Folder Name is required.",
	//			setformateMsg  = "Folder Name should contain only alphabets, numbers, hyphens (-), underscores (_) and period (.)",
	//			setexistMsg   = "A file or folder already exists with the same name. Enter another name.";
	//		onfocusout_validate_field(setinputId, seterrorId, setrequiredMsg, setFormat, setformateMsg, setexistMsg );
	//	});
	//
	//	/* FOLDER NAME FIELD KEYDOWN FIELD */
	//	$("#create-folder-input").on("keydown", function() {
	//		var setinputId     = $("#create-folder-input"),
	//			seterrorId     = $("#folder-name-error"),
	//			setFormat      = /^([a-zA-Z0-9\s-_.]{0,100})$/,
	//			setformateMsg  = "Folder Name should contain only alphabets, numbers, hyphens (-), underscores (_) and period (.)";
	//		onkeydown_validate_field (setinputId, seterrorId, setFormat, setformateMsg);
	//	});

	$("#zc-ide").on("click", "#create-file-button", function (event) {
		var setinputId = $("#create-file-input").val(),
			_this = $(this),
			setDialogId = $("#ide-file-dialog"),
			setsuccessMsg = "The file has been created.",
			ifcheck = true;
		if ((setinputId == "") || (setinputId == null)) {
			textfield_show_error('#create-file-input', '#create-file-error');
			ifcheck = false;
		} else {
			textfield_hide_error('#create-file-input', '#create-file-error');
		}

		if (ifcheck == true) {
			onclick_success(_this, setDialogId, setsuccessMsg)
		}
	});


	/* CREATE BUTTON CLICK */
	$("#create-folder-button").on("click", function () {
		var setinputId = $("#create-folder-input").val(),
			_this = $(this),
			seterrorId = $("#folder-name-error"),
			setDialogId = $("#ide-folder-dialog"),
			setsuccessMsg = "Folder Created Successfully.",
			ifcheck = true;
		if ((setinputId == "") || (setinputId == null)) {
			textfield_show_error('#create-folder-input', '#folder-name-error');
			ifcheck = false;
		} else {
			textfield_hide_error('#create-folder-input', '#folder-name-error');
		}
		if (ifcheck == true) {
			onclick_success(_this, setDialogId, setsuccessMsg)
		}
	});



	/* FOLDER DIALOG CLOSE */
	$("#cancel-folder-btn, #ide-folder-dialog .zc-dialog-close").on("click", function () {
		hide_dialog();
	});



	/*----------------------------------------------------------------------------------------------------------
																										  FILE FLOW
													----------------------------------------------------------------------------------------------------------*/


	/* FILE NAME FIELD FOCUSOUT FIELD */
	//    $("#create-file-input").on("focusout", function() {
	//      var setinputId        = $("#create-file-input"),
	//          seterrorId        = $("#create-file-error"),
	//          setFormat         = /^([a-zA-Z0-9\s-_.]{0,100})$/,
	//          setrequiredMsg    = "File Name is required.",
	//          setformateMsg     = "File Name should contain only alphabets, numbers, hyphens (-), underscores (_) and period (.)",
	//          setexistMsg       = "A file or folder already exists with the same name. Enter another name.",
	//          getfocusedElement;
	//
	//      setTimeout( function() {
	//        getfocusedElement = document.activeElement.id;
	//        if(getfocusedElement == "create-file-button") {
	//          onfocusout_validate_field(setinputId, seterrorId, setrequiredMsg, setFormat, setformateMsg, setexistMsg);
	//        }
	//      }, 1);
	//
	//
	//
	//    });

	/* FILE NAME FIELD KEYDOWN FIELD */
	//    $("#create-file-input").on("keyup", function(event) {
	//      var setinputId     = $("#create-file-input"),
	//          seterrorId     = $("#create-file-error"),
	//          setFormat      = /^([a-zA-Z0-9\s-_.]{0,100})$/,
	//          setformateMsg  = "Folder Name should contain only alphabets, numbers, hyphens (-), underscores (_) and period (.)"; 
	//      onkeydown_validate_field(setinputId, seterrorId, setFormat, setformateMsg);
	//    });


	/* FILE CREATE SUCCESS MESSAGE */

	var onclick_success = function (getbuttonId, getdialogId, getsuccessMsg) {
		getbuttonId.addClass("zc-loading");
		getbuttonId.empty().append('<span class="zc-loader"> </span> Creating');
		getdialogId.find(".zc-action-overlay").addClass("show-action-overlay");
		getbuttonId.blur();

		setTimeout(function () {
			hide_dialog();
			getbuttonId.removeClass("zc-loading");
			getbuttonId.empty().append('Create');
			getdialogId.find(".zc-action-overlay").removeClass("show-action-overlay");
			successToast(getsuccessMsg);
			toast_Position();
		}, showToastTime);

		hideToast();
	}



	/* CREATE BUTTON CLICK */
	$("#zc-ide").on("click", "#create-file-button", function (event) {
		var setinputId = $("#create-file-input").val(),
			_this = $(this),
			setDialogId = $("#ide-file-dialog"),
			setDialogMsg = "The file has been created.",
			ifcheck = true;
		if ((setinputId == "") || (setinputId == null)) {
			textfield_show_error('#create-file-input', '#create-file-error');
			ifcheck = false;
		} else {
			textfield_hide_error('#create-file-input', '#create-file-error');
		}

		if (ifcheck == true) {
			onclick_success(_this, setDialogId, setDialogMsg)
		}
	});

	/* FILE DIALOG CLOSE */
	$("#cancel-file-btn, #ide-file-dialog .zc-dialog-close").on("click", function () {
		if (!($("#zc-fileHistory-fullscreen").hasClass("zc-isVisible"))) {
			hide_dialog();
		} else {
			$("#zc-overlay-black").removeClass('zc-isVisible');
			$("#ide-file-dialog").removeClass('zc-showDialog');
		}
	});



	/*-------------------------------------------------------------------------------------------------------
																				CREATE NEW FOLDER IN FILE CREATION DIALOG
															 ----------------------------------------------------------------------------------------------------------*/

	/* NEW FOLDER DIALOG OPEN */
	$("#zc-ide").on("click", "#ide-create-newfolder", function () {
		var dialogId = $("#ide-newfolder-dialog");
		show_dialog(dialogId);
		$(".zc-dialog").find(".zc-error-msg").addClass("zc-hide");
		$(".zc-dialog").find(".zc-error-msg").next('.zc-hide').removeClass("zc-hide");
		$(".zc-dialog").find(".zc-input").removeClass("zc-error");
		$("#ide-newfolder-dialog").css("top", "200px");
		$("#create-newfolder-input").val("").focus();
	});

	/* NEW FOLDER NAME FIELD FOCUSOUT FIELD */
	$("#create-newfolder-input").on("focusout", function () {
		var setinputId = $("#create-newfolder-input"),
			seterrorId = $("#newfolder-name-error"),
			setFormat = /^([a-zA-Z0-9\s-_.]{0,100})$/,
			setrequiredMsg = "Folder Name is required.",
			setformateMsg = "Folder Name should contain only alphabets, numbers, hyphens (-), underscores (_) and period (.)",
			setexistMsg = "A file or folder already exists with the same name. Enter another name.";
		onfocusout_validate_field(setinputId, seterrorId, setrequiredMsg, setFormat, setformateMsg, setexistMsg);
	});

	/* NEW FOLDER NAME FIELD KEYDOWN FIELD */
	$("#create-newfolder-input").on("keydown", function () {
		var setinputId = $("#create-newfolder-input"),
			seterrorId = $("#newfolder-name-error");
		onkeydown_validate_field(setinputId, seterrorId);
	});

	/* CREATE NEWFOLDER BUTTON CLICK */
	$("#create-newfolder-button").on("click", function () {
		var setinputId = $("#create-newfolder-input"),
			seterrorId = $("#newfolder-name-error"),
			setdialogId = $("#ide-newfolder-dialog"),
			setbuttonId = $("#create-newfolder-button"),
			setsuccessMsg = "The folder has been created.";
		onclick_newFolder_success(setinputId, seterrorId, setdialogId, setbuttonId, setsuccessMsg);
	});

	/* FOLDER DIALOG CLOSE */
	$("#cancel-newfolder-btn, #ide-newfolder-dialog .zc-dialog-close").on("click", function () {
		var dialogId = $("#ide-newfolder-dialog");
		hide_Confirmdialog(dialogId);
	});



	/*-------------------------------------------------------------------------------------------
																			CLASS FLOW
															--------------------------------------------------------------------------------------------------------*/



	//		/* CLASS NAME FIELD FOCUSOUT FIELD */
	//		$("#create-class-input").on("focusout", function() {
	//			var setinputId     = $("#create-class-input"),
	//				seterrorId     = $("#create-class-error"),
	//				setFormat      = /^([a-zA-Z_]{0,100})$/,
	//				setrequiredMsg = "Class Name is required.",
	//				setformateMsg  = "Class Name should contain only alphabets and underscores (_)",
	//				setexistMsg    = "A file or folder already exists with the same name. Enter another name.";
	//			onfocusout_validate_field(setinputId, seterrorId, setrequiredMsg, setFormat, setformateMsg, setexistMsg);
	//		});
	//
	//		/* CLASS NAME FIELD KEYDOWN FIELD */
	//		$("#create-class-input").on("keydown", function() {
	//			var setinputId = $("#create-class-input"),
	//				seterrorId = $("#create-class-error");
	//			onkeydown_validate_field (setinputId, seterrorId);
	//		});
	//
	//		/* PACKAGE NAME FIELD FOCUSOUT FIELD */
	//		$("#create-package-input").on("focusout", function() {
	//			var setinputId     = $("#create-package-input"),
	//				seterrorId     = $("#create-package-error"),
	//				setFormat      = /^([a-zA-Z_]{0,100})$/,
	//				setformateMsg  = "Package Name should contain only alphabets and underscores (_)";
	//			onfocusout_validate_optionalfield(setinputId, seterrorId, setFormat, setformateMsg);
	//		});

	/* PACKAGE NAME FIELD KEYDOWN FIELD */
	$("#create-package-input").on("keydown", function () {
		var setinputId = $("#create-package-input"),
			seterrorId = $("#create-package-error");
		onkeydown_validate_field(setinputId, seterrorId);
	});



	/* CREATE CLASS BUTTON */
	$("#create-class-button").on("click", function () {
		var setinputId = $("#create-class-input").val(),
			_this = $(this),
			setDialogId = $("#ide-class-dialog"),
			setDialogMsg = "The class has been created.",
			ifcheck = true;
		if ((setinputId == "") || (setinputId == null)) {
			textfield_show_error('#create-class-input', '#create-class-error');
			ifcheck = false;
		} else {
			textfield_hide_error('#create-class-input', '#create-class-error');
		}

		if (ifcheck == true) {
			onclick_success(_this, setDialogId, setDialogMsg)
		}
	});

	/* FILE DIALOG CLOSE */
	$("#cancel-class-btn, #ide-class-dialog .zc-dialog-close").on("click", function () {
		hide_dialog();
	});


	/*-------------------------------------------------
																	INTERFACE FLOW
													--------------------------------------------------*/

	//	/* INTERFACE NAME FIELD FOCUSOUT FIELD */
	//	$("#create-interface-input").on("focusout", function() {
	//		var setinputId     = $("#create-interface-input"),
	//			seterrorId     = $("#create-interface-error"),
	//			setFormat      = /^([a-zA-Z_]{0,100})$/,
	//			setrequiredMsg = "Interface Name is required.",
	//			setformateMsg  = "Interface Name should contain only alphabets and underscores (_)",
	//			setexistMsg    = "A file or folder already exists with the same name. Enter another name.";
	//		onfocusout_validate_field(setinputId, seterrorId, setrequiredMsg, setFormat, setformateMsg, setexistMsg);
	//	});

	//	/* INTERFACE NAME FIELD KEYDOWN FIELD */
	//	$("#create-interface-input").on("keydown", function() {
	//		var setinputId = $("#create-interface-input"),
	//			seterrorId = $("#create-interface-error");
	//		onkeydown_validate_field (setinputId, seterrorId);
	//	});
	//
	//	/* INTERFACE PACKAGE NAME FIELD FOCUSOUT FIELD */
	//	$("#create-interpackage-input").on("focusout", function() {
	//		var setinputId     = $("#create-interpackage-input"),
	//			seterrorId     = $("#create-interpackage-error"),
	//			setFormat      = /^([a-zA-Z_]{0,100})$/,
	//			setformateMsg  = "Package Name should contain only alphabets and underscores (_)";
	//		onfocusout_validate_optionalfield(setinputId, seterrorId, setFormat, setformateMsg);
	//	});
	//

	/* INTERFACE PACKAGE NAME FIELD KEYDOWN FIELD */
	$("#create-interpackage-input").on("keydown", function () {
		var setinputId = $("#create-interpackage-input"),
			seterrorId = $("#create-interpackage-error");
		onkeydown_validate_field(setinputId, seterrorId);
	});



	/* CREATE INTERFACE BUTTON CLICK */
	$("#create-interface-button").on("click", function () {
		var setinputId = $("#create-interface-input").val(),
			_this = $(this),
			setDialogId = $("#ide-interface-dialog"),
			setsuccessMsg = "The interface has been created.",
			ifcheck = true;

		if ((setinputId == "") || (setinputId == null)) {
			textfield_show_error('#create-interface-input', '#create-interface-error');
			ifcheck = false;
		} else {
			textfield_hide_error('#create-interface-input', '#create-interface-error');
		}

		if (ifcheck == true) {
			onclick_success(_this, setDialogId, setsuccessMsg);
		}
	});



	/* FILE DIALOG CLOSE */
	$("#cancel-interface-btn, #ide-interface-dialog .zc-dialog-close").on("click", function () {
		hide_dialog();
	});



	/*-------------------------
															ENUM FLOW
													-------------------------*/

	/* ENUM NAME FIELD FOCUSOUT FIELD */
	//	$("#create-enum-input").on("focusout", function() {
	//		var setinputId     = $("#create-enum-input"),
	//			seterrorId     = $("#create-enum-error"),
	//			setFormat      = /^([a-zA-Z_]{0,100})$/,
	//			setrequiredMsg = "Enum Name is required.",
	//			setformateMsg  = "Enum Name should contain only alphabets and underscores (_)",
	//			setexistMsg    = "A file or folder already exists with the same name. Enter another name.";
	//		onfocusout_validate_field(setinputId, seterrorId, setrequiredMsg, setFormat, setformateMsg, setexistMsg);
	//	});
	//
	//	/* ENUM NAME FIELD KEYDOWN FIELD */
	//	$("#create-enum-input").on("keydown", function() {
	//		var setinputId = $("#create-enum-input"),
	//			seterrorId = $("#create-enum-error");
	//		onkeydown_validate_field (setinputId, seterrorId);
	//	});
	//
	//	/* ENUM PACKAGE NAME FIELD FOCUSOUT FIELD */
	//	$("#create-enumpackage-input").on("focusout", function() {
	//		var setinputId     = $("#create-enumpackage-input"),
	//			seterrorId     = $("#create-enumpackage-error"),
	//			setFormat      = /^([a-zA-Z_]{0,100})$/,
	//			setformateMsg  = "Package Name should contain only alphabets and underscores (_)";
	//		onfocusout_validate_optionalfield(setinputId, seterrorId, setFormat, setformateMsg);
	//	});

	/* ENUM PACKAGE NAME FIELD KEYDOWN FIELD */
	$("#create-enumpackage-input").on("keydown", function () {
		var setinputId = $("#create-enumpackage-input"),
			seterrorId = $("#create-enumpackage-error");
		onkeydown_validate_field(setinputId, seterrorId);
	});



	/* CREATE ENUM BUTTON CLICK */
	$("#create-enum-btn").on("click", function () {
		var setinputId = $("#create-enum-input").val(),
			_this = $(this),
			setDialogId = $("#ide-enum-dialog"),
			setsuccessMsg = "The Enum has been created.",
			seterrorId = $("#create-enum-error"),
			ifcheck = true;

		if ((setinputId == "") || (setinputId == null)) {
			textfield_show_error('#create-enum-input', '#create-enum-error');
			ifcheck = false;
		} else {
			textfield_hide_error('#create-enum-input', '#create-enum-error');
		}

		if (ifcheck == true) {
			onclick_success(_this, setDialogId, setsuccessMsg);
		}
	});



	/* ENUM DIALOG CLOSE */
	$("#cancel-enum-btn, #ide-enum-dialog .zc-dialog-close").on("click", function () {
		hide_dialog();
	});



	/*-----------------------------------
															ANNOTATION FLOW
													-------------------------------------*/


	//	/* ANNOTATION NAME FIELD FOCUSOUT FIELD */
	//	$("#create-annotation-input").on("focusout", function() {
	//		var setinputId     = $("#create-annotation-input"),
	//			seterrorId     = $("#create-annotation-error"),
	//			setFormat      = /^([a-zA-Z_]{0,100})$/,
	//			setrequiredMsg = "Annotation Name is required.",
	//			setformateMsg  = "Annotation Name should contain only alphabets and underscores (_)",
	//			setexistMsg    = "A file or folder already exists with the same name. Enter another name.";
	//		onfocusout_validate_field(setinputId, seterrorId, setrequiredMsg, setFormat, setformateMsg, setexistMsg);
	//	});
	//
	//	/* ANNOTATION NAME FIELD KEYDOWN FIELD */
	//	$("#create-annotation-input").on("keydown", function() {
	//		var setinputId = $("#create-annotation-input"),
	//			seterrorId = $("#create-annotation-error");
	//		onkeydown_validate_field (setinputId, seterrorId);
	//	});
	//
	//	/* ANNOTATION PACKAGE NAME FIELD FOCUSOUT FIELD */
	//	$("#create-annpackage-input").on("focusout", function() {
	//		var setinputId     = $("#create-annpackage-input"),
	//			seterrorId     = $("#create-annpackage-error"),
	//			setFormat      = /^([a-zA-Z_]{0,100})$/,
	//			setformateMsg  = "Package Name should contain only alphabets and underscores (_)";
	//		onfocusout_validate_optionalfield(setinputId, seterrorId, setFormat, setformateMsg);
	//	});

	/* ANNOTATION PACKAGE NAME FIELD KEYDOWN FIELD */
	$("#create-enumpackage-input").on("keydown", function () {
		var setinputId = $("#create-annpackage-input"),
			seterrorId = $("#create-annpackage-error");
		onkeydown_validate_field(setinputId, seterrorId);
	});



	/* CREATE ANNOTATION BUTTON CLICK */
	$("#create-ann-btn").on("click", function () {
		var setinputId = $("#create-annotation-input").val(),
			_this = $(this),
			setDialogId = $("#ide-annotation-dialog"),
			setsuccessMsg = "The annotation has been created.",
			ifcheck = true;

		if ((setinputId == "") || (setinputId == null)) {
			textfield_show_error('#create-annotation-input', '#create-annotation-error');
			ifcheck = false;
		} else {
			textfield_hide_error('#create-annotation-input', '#create-annotation-error');
		}

		if (ifcheck == true) {
			onclick_success(_this, setDialogId, setsuccessMsg);
		}
	});



	/* ANNOTATION DIALOG CLOSE */
	$("#cancel-ann-btn, #ide-annotation-dialog .zc-dialog-close").on("click", function () {
		hide_dialog();
	});


	/*-------------------------------------------------------------------------------------------------------                                                 PUSH FILES
													--------------------------------------------------------------------------------------------------------*/

	//PUSH SUCCESS
	$("#zc-ide").on("click", "#PushButton", function () {
		var getusernameInput = $("#push-usernameinput").val(),
			getpasswordInput = $("#push-passwordinput").val(),
			iffieldcheck = true;

		/* REQUIRED FIELD VALIDATION  FUNCTION  */
		if (getusernameInput == "" || getusernameInput == null) {
			textfield_show_error('#push-usernameinput', '#push-usernameReq');
			iffieldcheck = false;
		} else {
			textfield_hide_error('#push-usernameinput', '#push-usernameReq');
		}

		if (getpasswordInput == "" || getpasswordInput == null) {
			textfield_show_error('#push-passwordinput', '#push-passwordReq');
			iffieldcheck = false;
		} else {
			textfield_hide_error('#push-passwordinput', '#push-passwordReq');
		}

		if (getusernameInput == "admin" && getpasswordInput == "1234") {

		} else if (getusernameInput == "" && getpasswordInput == "") {
			textfield_show_error('#push-usernameinput', '#push-usernameReq');
			textfield_show_error('#push-passwordinput', '#push-passwordReq');
			$("#pushAlertBanner").addClass("zc-hide");
			iffieldcheck = false;
		} else if (getusernameInput == "") {
			textfield_show_error('#push-usernameinput', '#push-usernameReq');
			textfield_hide_error('#push-passwordinput', '#push-passwordReq');
			$("#pushAlertBanner").addClass("zc-hide");
			iffieldcheck = false;
		} else if (getpasswordInput == "") {
			textfield_show_error('#push-passwordinput', '#push-passwordReq');
			textfield_hide_error('#push-usernameinput', '#push-usernameReq');
			$("#pushAlertBanner").addClass("zc-hide");
			iffieldcheck = false;
		} else if (getusernameInput != "admin" || getpasswordInput != "1234") {
			$("#pushAlertBanner").removeClass("zc-hide");
			iffieldcheck = false;
		}

		if (iffieldcheck == true) {
			$("#pushAlertBanner").addClass("zc-hide");
			$("#ide-pushFile-dialog").find(".zc-action-overlay").addClass("show-action-overlay");

			addButtonLoading($('#PushButton'), "Pushing");

			setTimeout(function () {
				hide_dialog();
				successToast("Pushed all the changes successfully.");
				removeButtonLoading($('#PushButton'), "Push");
			}, showToastTime);

			hideToast();
		}
	});





	//Unable to push the files because the target branch contains some updates.
	$("#zc-ide").on("click", "#pushFilesIssues", function () {
		var getusernameInput = $("#push-usernameinput").val(),
			getpasswordInput = $("#push-passwordinput").val(),
			iffieldcheck = true;
		/* REQUIRED FIELD VALIDATION  FUNCTION  */
		if (getusernameInput == "" || getusernameInput == null) {
			textfield_show_error('#push-usernameinput', '#push-usernameReq');
			iffieldcheck = false;
		} else {
			textfield_hide_error('#push-usernameinput', '#push-usernameReq');
		}

		if (getpasswordInput == "" || getpasswordInput == null) {
			textfield_show_error('#push-passwordinput', '#push-passwordReq');
			iffieldcheck = false;
		} else {
			textfield_hide_error('#push-passwordinput', '#push-passwordReq');
		}

		if (getusernameInput == "admin" && getpasswordInput == "1234") {

		} else if (getusernameInput == "" && getpasswordInput == "") {
			textfield_show_error('#push-usernameinput', '#push-usernameReq');
			textfield_show_error('#push-passwordinput', '#push-passwordReq');
			$("#pushAlertBanner").addClass("zc-hide");
			iffieldcheck = false;
		} else if (getusernameInput == "") {
			textfield_show_error('#push-usernameinput', '#push-usernameReq');
			textfield_hide_error('#push-passwordinput', '#push-passwordReq');
			$("#pushAlertBanner").addClass("zc-hide");
			iffieldcheck = false;
		} else if (getpasswordInput == "") {
			textfield_show_error('#push-passwordinput', '#push-passwordReq');
			textfield_hide_error('#push-usernameinput', '#push-usernameReq');
			$("#pushAlertBanner").addClass("zc-hide");
			iffieldcheck = false;
		} else if (getusernameInput != "admin" || getpasswordInput != "1234") {
			$("#pushAlertBanner").removeClass("zc-hide");
			iffieldcheck = false;
		}

		if (iffieldcheck == true) {
			$("#pushAlertBanner").addClass("zc-hide");
			$("#ide-pushFile-dialog").find(".zc-action-overlay").addClass("show-action-overlay");

			addButtonLoading($('#pushFilesIssues'), "Pushing");

			setTimeout(function () {
				$("#cancelPushButton").trigger("click");
				var dialogId = $("#confirm-pullChanges");
				show_dialog(dialogId);
			}, 2500);
		}
	});



	$("#zc-ide").on("click", "#push-close-Btn,  #cancelPushButton", function () {
		hide_dialog();
	});

	$("#zc-ide").on("click", "#pullChanges-btn", function () {
		$(this).addClass("zc-loading");
		$(this).empty().append('<span class="zc-loader"> </span> Pulling');
		$("#afterpull-pushBtn").removeClass("zc-loading");
		$("#afterpull-pushBtn").empty().append('Push');
		$(this).blur();
		setTimeout(function () {
			hide_dialog();
			var dialogId = $("#confirm-pullSuccess");
			show_dialog(dialogId);
		}, 2500);

	});

	$("#zc-ide").on("click", "#laterBtn", function () {
		hide_dialog();
	});

	$("#zc-ide").on("click", "#pullChangesError", function () {
		$(this).addClass("zc-loading");
		$(this).empty().append('<span class="zc-loader"> </span> Pulling');
		$(this).blur();
		setTimeout(function () {
			$("#projExp__6 .fancytree-icon").empty().append('<svg><use xlink:href="#svg-jsUnresolved-icon"></use></svg>');
			$("#projExp__9 .fancytree-icon").empty().append('<svg><use xlink:href="#svg-cssUnresolved-icon"></use></svg>');
			$("#projExp__11 .fancytree-icon").empty().append('<svg><use xlink:href="#svg-javaUnresolved-icon"></use></svg>');
			$("#projExp__17 .fancytree-icon").empty().append('<svg><use xlink:href="#svg-jsonUnresolved-icon"></use></svg>');
			$("#laterBtn").trigger("click");
			var dialogId = $("#confirm-pullError");
			show_dialog(dialogId);
		}, 2500);
	});

	$("#zc-ide").on("click", "#resolvelaterBtn", function () {
		hide_dialog();
		$("#ide-repository").zmenu("addMenuItem", { "label": "5 Conflict Files...", "index": "0", "customAttributes": { "id": "ide-resolve" } });
		$("#ide-repository").zmenu("addMenuItem", { "itemType": "separator", "index": "1" });
	});

	$("#zc-ide").on("click", "#resolveNow-btn", function () {
		var dialogId = $("#ide-resolve-dialog");
		hide_dialog();
		show_commitDialog(dialogId);
		onclick_reset();
	});

	$("#zc-ide").on("click", "#afterpull-laterBtn", function () {
		hide_dialog();
	});

	$("#zc-ide").on("click", "#afterpull-pushBtn", function () {
		$(this).addClass("zc-loading");
		$(this).empty().append('<span class="zc-loader"> </span> Pushing');
		setTimeout(function () {
			$("#push-succes-msg").addClass("show-toast-message");
			hide_dialog();
			toast_Position();
		}, 2500);
		setTimeout(function () {
			$("#push-succes-msg").removeClass("show-toast-message");
		}, 5500);
	});




	/*------------------------------------------------------------------------------------------------------------------                                                 MERGE FILES
																															---------------------------------------------------------------------------------------------------------------------*/


	$("#zc-ide").on("click", "#mergeButton", function () {
		var getMergeBranchInput = $("#zc-mergeBranch-list"),
			iffieldcheck = true;
		if (getMergeBranchInput.prop('selectedIndex') == 0) {
			textfield_show_error("#zc-mergeBranch-list", "#mergebranch-nameReq");
			iffieldcheck = false;
		} else {
			textfield_hide_error("#zc-mergeBranch-list", "#mergebranch-nameReq");
		}

		if (iffieldcheck == true) {
			$(this).addClass("zc-loading");
			$(this).empty().append('<span class="zc-loader"> </span> Merging');
			$("#ide-mergeFile-dialog").find(".zc-action-overlay").addClass("show-action-overlay");
			$(this).blur();
			setTimeout(function () {
				$("#merge-succes-msg").addClass("show-toast-message");
				hide_dialog();
				toast_Position();
			}, 2500);
			setTimeout(function () {
				$("#merge-succes-msg").removeClass("show-toast-message");
			}, 5500);
		}
	});

	$("#zc-mergeBranch-list").on('change', function () {
		var getMergeBranchInput = $("#zc-mergeBranch-list");
		if (getMergeBranchInput.prop('selectedIndex') == 0) {
			textfield_show_error("#zc-mergeBranch-list", "#mergebranch-nameReq");
		} else {
			textfield_hide_error("#zc-mergeBranch-list", "#mergebranch-nameReq");
		}
	});

	$("#zc-ide").on("click", "#merge-close-Btn,  #cancelMergeButton", function () {
		hide_dialog();
	});


	/*------------------------------------------------------------------------------------------------------------------                                                 SWITCH FILES
																															---------------------------------------------------------------------------------------------------------------------*/

	$("#zc-ide").on("click", "#SwitchButton", function () {
		var getSwitchBranchInput = $("#zc-switchBranch-list"),
			iffieldcheck = true;
		if (getSwitchBranchInput.prop('selectedIndex') == 0) {
			textfield_show_error("#zc-switchBranch-list", "#switchbranch-nameReq");
			iffieldcheck = false;
		} else {
			textfield_hide_error("#zc-switchBranch-list", "#switchbranch-nameReq");
		}

		if (iffieldcheck == true) {
			$(this).addClass("zc-loading");
			$(this).empty().append('<span class="zc-loader"> </span> Switching');
			$("#ide-switchBranch-dialog").find(".zc-action-overlay").addClass("show-action-overlay");
			$(this).blur();
			setTimeout(function () {
				$("#switch-succes-msg").addClass("show-toast-message");
				hide_dialog();
				toast_Position();
			}, 2500);
			setTimeout(function () {
				$("#switch-succes-msg").removeClass("show-toast-message");
			}, 5500);
		}
	});

	$("#zc-switchBranch-list").on('change', function () {
		var getSwitchBranchInput = $("#zc-switchBranch-list");
		if (getSwitchBranchInput.prop('selectedIndex') == 0) {
			textfield_show_error("#zc-switchBranch-list", "#switchbranch-nameReq");
		} else {
			textfield_hide_error("#zc-switchBranch-list", "#switchbranch-nameReq");
		}
	});

	$(".zc-comboBoxWrap .chosen-select-no-single").next('.chosen-container-single').css("width", "100%");


	$("#zc-ide").on("click", "#switch-close-Btn,  #cancelSwitchButton", function () {
		hide_dialog();
	});




	/*------------------------------------------------------------------------------------------------------                                                 FIND AND REPLACE
																															---------------------------------------------------------------------------------------------------------*/



	/* FIND AND REPLACE DIALOG OPEN */
	$("#zc-ide").on("click", ".zc-find-replace", function () {
		var dialogId = $("#find-replace-dialog");
		show_modeless_dialog(dialogId)
	});

	/* FIND AND REPLACE DIALOG CLOSE */
	$("#done-fr-btn, #find-replace-dialog .zc-dialog-close").on("click", function () {
		var dialogId = $("#find-replace-dialog");
		hide_modeless_dialog(dialogId)
	});

	$("#zc-replace").click(function () {
		if ($(this).is(":checked")) {
			$("#replace-check").removeClass("zc-hide-replace").addClass("zc-show-replace");
			$("#replace-action-btn").removeClass("zc-hide").addClass("zc-show-replace");
			$("#zc-replace-input").focus();

		} else {
			$("#replace-check").removeClass("zc-show-replace").addClass("zc-hide-replace");
			$("#replace-action-btn").removeClass("zc-show-replace").addClass("zc-hide");
		}
	});


	$("#find-option").on("click", ".zc-btn", function () {
		$(this).toggleClass("active");
	});



	/*------------------------------------------------------------------------------------------------------                                                 FIND AND REPLACE PANE
																								  ---------------------------------------------------------------------------------------------------------*/



	// FIND & REPLACE
	$(document).on("click", "#zc-findReplace", function () {
		$("#zc-find-replace-pane").show();
		$("#zc-replaceOnly").show();
		$("#zc-findinFiles").hide();
		$(".zc-editorTabContent").css("top", "78px");
		$("#zc-findNavBtn").css("display", "inline-block");
		$(".zc-find-wrap .zc-input").attr("id", "find-text");
		$("#find-text").focus();
		var getInputValue = $("#find-text").val(),
			getInputValue = $.trim(getInputValue),
			getInputValue = getInputValue.length;
		if (!(getInputValue > 0)) {
			$("#zc-replaceOnly .zc-btn").attr("disabled", true);
			$("#zc-replaceOnly .zc-btn").addClass("disabled");
		} else {
			$("#zc-replaceOnly .zc-btn").removeAttr("disabled");
			$("#zc-replaceOnly .zc-btn").removeClass("disabled");
		}
	});



	// REPLACE IN FILES 
	$(document).on("click", "#zc-replaceinFiles", function () {
		$("#zc-find-replace-pane").show();
		$("#zc-findinFiles").show();
		$("#zc-replaceOnly").show();
		$("#zc-findBtn, #zc-replaceAllBtn").hide();
		$(".zc-editorTabContent").css("top", "78px");
		$(".zc-find-wrap .zc-input").attr("id", "zc-findin");
		$("#zc-findNavBtn").hide();
		$("#zc-findin").focus();
	});






	$(document).on("keyup", "#zc-findin", function () {
		var getInputValue = $(this).val(),
			getInputValue = $.trim(getInputValue),
			getInputValue = getInputValue.length;
		if (!(getInputValue > 0)) {
			$("#zc-findBtn, #zc-findResultBtn").attr("disabled", true);
			$("#zc-findBtn, #zc-findResultBtn").addClass("disabled");
		} else {
			$("#zc-findBtn, #zc-findResultBtn").removeAttr('disabled');
			$("#zc-findBtn, #zc-findResultBtn").removeClass('disabled');
		}
	});


	$(document).on("click", "#zc-findBtn", function (event) {
		event.stopPropagation();
		$("#zc-find-replace-pane").hide();
		$(".ide-tab").removeClass("tab-active");
		$(".ide-tab").removeClass('zc-noTabSeparator');
		$("#findResult-tab").css("display", "inline-block").addClass("tab-active");
		$("#findResult-tab").prevAll(':visible:first').addClass('zc-noTabSeparator');
		$(".zc-editorTabContent").addClass("zc-hide");
		$("#zc-findResult-container").removeClass("zc-hide");
		$(".zc-editorTabContent").css("top", "36px");
	});

	/*----------------- FIND RESULT PAGE ---------------------*/

	var resultListRedirect = function (currentTab, currentTabContent) {
		$(".ide-tab").removeClass("tab-active");
		$(".ide-tab").removeClass('zc-noTabSeparator');
		currentTab.css("display", "inline-flex").addClass("tab-active");
		currentTab.prevAll(':visible:first').addClass('zc-noTabSeparator');
		$(".zc-editorTabContent").addClass("zc-hide");
		currentTabContent.removeClass("zc-hide");
	}

	$(document).on("click", "#application-tab li", function (event) {
		resultListRedirect($("#application-tab"), $("#zc-code-editor"));
	});

	$(document).on("click", "#result-2-file li", function (event) {
		resultListRedirect($("#editor-tab"), $("#zc-editorFile-container"));
	});

	$(document).on("click", "#result-3-file li", function (event) {
		resultListRedirect($("#main-tab"), $("#zc-mainFile-container"));
	});

	$(document).on("click", "#result-4-file li", function (event) {
		resultListRedirect($("#manage-tab"), $("#zc-manageFile-container"));
	});

	$(document).on("click", "#result-5-file li", function (event) {
		resultListRedirect($("#report-tab"), $("#zc-reportFile-container"));
	});

	/*----------------- FIND RESULT PAGE IN RIGHT PANE ---------------------*/

	$(document).on("click", "#application-tab-right li", function (event) {
		resultListRedirect($("#application-tab"), $("#zc-code-editor"));
	});

	$(document).on("click", "#result-2-file-right li", function (event) {
		resultListRedirect($("#editor-tab"), $("#zc-editorFile-container"));
	});

	$(document).on("click", "#result-3-file-right li", function (event) {
		resultListRedirect($("#main-tab"), $("#zc-mainFile-container"));
	});

	$(document).on("click", "#result-4-file-right li", function (event) {
		resultListRedirect($("#manage-tab"), $("#zc-manageFile-container"));
	});

	$(document).on("click", "#result-5-file-right li", function (event) {
		resultListRedirect($("#report-tab"), $("#zc-reportFile-container"));
	});

	/*----------------------------------------------------------------------------------------------------------------------------
																																										GO TO LINE NUMBER
																															-----------------------------------------------------------------------------------------------------------------------------*/

	/* GO TO LINE NUMBER DIALOG CLOSE */
	$("#goto-line-button, #goto-cancel-btn, #ide-gotoline-dialog .zc-dialog-close").on("click", function () {
		var dialogId = $("#ide-gotoline-dialog");
		hide_dialog(dialogId);
	});


	/*--- FILE RENAME ---*/

	/* FILE NAME FIELD FOCUSOUT FIELD */
	$("#rename-file-input").on("focusout", function () {
		var setinputId = $("#rename-file-input"),
			seterrorId = $("#rename-file-error"),
			setFormat = /^([a-zA-Z0-9\s-_.]{0,100})$/,
			setrequiredMsg = "File Name is required.",
			setformateMsg = "File Name should contain only alphabets, numbers, hyphens (-), underscores (_) and period (.)",
			setexistMsg = "A file or folder already exists with the same name. Enter another name.";
		onfocusout_validate_field(setinputId, seterrorId, setrequiredMsg, setFormat, setformateMsg, setexistMsg);
	});


	/* NEW FILE NAME FIELD KEYDOWN FIELD */
	$("#rename-file-input").on("keydown", function () {
		var setinputId = $("#rename-file-input"),
			seterrorId = $("#rename-file-error");
		onkeydown_validate_field(setinputId, seterrorId);
	});

	/* FILE RENAME  BUTTON CLICK */
	$("#rename-file-button").on("click", function () {
		var setinputId = $("#rename-file-input"),
			seterrorId = $("#rename-file-error"),
			setdialogId = $("#ide-filerename-dialog"),
			setbuttonId = $("#rename-file-button"),
			setsuccessMsg = "The file has been renamed.";
		onclick_rename_success(setinputId, seterrorId, setdialogId, setbuttonId, setsuccessMsg);
	});

	/* FILE RENAME DIALOG CLOSE */
	$("#cancel-filerename-btn, #ide-filerename-dialog .zc-dialog-close").on("click", function () {
		var dialogId = $("#ide-newfolder-dialog");
		hide_dialog(dialogId);
	});



	/*--- FOLDER RENAME ---*/

	/* FOLDER NAME FIELD FOCUSOUT FIELD */
	$("#rename-folder-input").on("focusout", function () {
		var setinputId = $("#rename-folder-input"),
			seterrorId = $("#rename-folder-error"),
			setFormat = /^([a-zA-Z0-9\s-_.]{0,100})$/,
			setrequiredMsg = "Folder Name is required.",
			setformateMsg = "Folder Name should contain only alphabets, numbers, hyphens (-), underscores (_) and period (.)",
			setexistMsg = "A file or folder already exists with the same name. Enter another name.";
		onfocusout_validate_field(setinputId, seterrorId, setrequiredMsg, setFormat, setformateMsg, setexistMsg);
	});


	/* NEW FOLDER NAME FIELD KEYDOWN FIELD */
	$("#rename-folder-input").on("keydown", function () {
		var setinputId = $("#rename-folder-input"),
			seterrorId = $("#rename-folder-error");
		onkeydown_validate_field(setinputId, seterrorId);
	});

	/* FOLDER BUTTON CLICK */
	$("#rename-folder-button").on("click", function () {
		var setinputId = $("#rename-folder-input"),
			seterrorId = $("#rename-folder-error"),
			setdialogId = $("#ide-folderrename-dialog"),
			setbuttonId = $("#rename-folder-button"),
			setsuccessMsg = "The folder has been renamed.";
		onclick_rename_success(setinputId, seterrorId, setdialogId, setbuttonId, setsuccessMsg);
	});

	/* FOLDER  DIALOG CLOSE */
	$("#cancel-folderrename-btn, #ide-folderrename-dialog .zc-dialog-close").on("click", function () {
		var dialogId = $("#ide-folderrename-dialog");
		hide_dialog(dialogId);
	});




	/*---- PACKAGE RENAME ----*/

	$("#rename-package-input").on("focusout", function () {
		var setinputId = $("#rename-package-input"),
			seterrorId = $("#rename-package-error"),
			setFormat = /^([a-zA-Z0-9\s-_.]{0,100})$/,
			setrequiredMsg = "Package Name is required.",
			setformateMsg = "Package Name should contain only alphabets and underscores (_)",
			setexistMsg = "Package Name already exists with the same name. Enter another name.";
		onfocusout_validate_field(setinputId, seterrorId, setrequiredMsg, setFormat, setformateMsg, setexistMsg);
	});

	$("#rename-package-input").on("keydown", function () {
		var setinputId = $("#rename-package-input"),
			seterrorId = $("#rename-package-error");
		onkeydown_validate_field(setinputId, seterrorId);
	});

	/* PACKAGE BUTTON CLICK */
	$("#rename-package-button").on("click", function () {
		var setinputId = $("#rename-package-input"),
			seterrorId = $("#rename-package-error"),
			setdialogId = $("#ide-packagerename-dialog"),
			setbuttonId = $("#rename-package-button"),
			setsuccessMsg = "The package has been renamed.";
		onclick_rename_success(setinputId, seterrorId, setdialogId, setbuttonId, setsuccessMsg);
	});

	/* PACKAGE DIALOG CLOSE */
	$("#cancel-packagerename-btn, #ide-packagerename-dialog .zc-dialog-close").on("click", function () {
		var dialogId = $("#ide-folderrename-dialog");
		hide_dialog(dialogId);
	});

	/*---DELETE FILE----*/

	$("#delete-file-button").on("click", function () {
		var setinputId = "",
			seterrorId = "",
			setdialogId = $("#ide-delete-dialog"),
			setbuttonId = $("#delete-file-button"),
			setsuccessMsg = "A File is permanently deleted.";
		onclick_rename_success(setinputId, seterrorId, setdialogId, setbuttonId, setsuccessMsg);
	});

	$("#cancel-delete-btn, #ide-delete-dialog .zc-dialog-close").on("click", function () {
		var dialogId = $("#ide-folderrename-dialog");
		hide_dialog(dialogId);
	});


	/*--- DELETE FOLDER ---*/

	$("#delete-folder-button").on("click", function () {
		var setinputId = "",
			seterrorId = "",
			setdialogId = $("#ide-deletefolder-dialog"),
			setbuttonId = $("#delete-folder-button"),
			setsuccessMsg = "A Folder is permanently deleted.";
		onclick_rename_success(setinputId, seterrorId, setdialogId, setbuttonId, setsuccessMsg);
	});

	$("#cancel-deletefolder-btn, #ide-deletefolder-dialog .zc-dialog-close").on("click", function () {
		var dialogId = $("#ide-folderrename-dialog");
		hide_dialog(dialogId);
	});


	/*--- DELETE PACKAGE ---*/

	/* PACKAGE BUTTON CLICK */
	$("#delete-package-button").on("click", function () {
		var setinputId = "",
			seterrorId = "",
			setdialogId = $("#ide-deletepackage-dialog"),
			setbuttonId = $("#delete-folder-button"),
			setsuccessMsg = "A Package is permanently deleted.";
		onclick_rename_success(setinputId, seterrorId, setdialogId, setbuttonId, setsuccessMsg);
	});


	/* PACKAGE DIALOG CLOSE */
	$("#cancel-deletepackage-btn, #ide-deletepackage-dialog .zc-dialog-close").on("click", function () {
		var dialogId = $("#ide-folderrename-dialog");
		hide_dialog(dialogId);
	});


	/*--- FILE PROPERTIES ---*/

	$("#cancel-fileprop-btn, #ide-fileproperties-dialog .zc-dialog-close").on("click", function () {
		var dialogId = $("#ide-fileproperties-dialog");
		hide_dialog(dialogId);
	});


	/*--- FOLDER PROPERTIES ---*/

	$("#cancel-folderprop-btn, #ide-folderproperties-dialog .zc-dialog-close").on("click", function () {
		var dialogId = $("#ide-fileproperties-dialog");
		hide_dialog(dialogId);
	});



	/*-------------------------------------------------------------------------------------------------------------------
																																										ALERT DIALOGS
																									 ----------------------------------------------------------------------------------------------------------------*/

	$("#war-file-button, #err-file-button, #suc-file-button, #info-file-button").on("click", function () {
		hide_dialog();
	});


	/*---------------------- TAB SIDEBAR OPEN -----------------------*/

	$(".zc-tabs .sidebar-nav li").on("click", function () {
		$(".zc-tabs .sidebar-nav li").not(this, '.nav-divider', '.has-subnav').removeClass('active');
		$(".zc-tabs .sub-nav > li").removeClass('active');
		if (!($(this).hasClass("active"))) {
			$(this).toggleClass("active");
		} else if ($(this).hasClass("has-subnav")) {
			$(this).toggleClass("active");
		}
	});

	/* FILE RENAME DIALOG CLOSE */
	$("#preferences-ok-button, #cancel-preferences-btn, #ide-preference-dialog .zc-dialog-close").on("click", function () {
		var dialogId = $("#ide-preference-dialog");
		hide_dialog(dialogId);
	});


	/*---------------------------------------------------------------------------------------------------
																																		CONTENT SEARCH
																									  --------------------------------------------------------------------------------------------------------*/

	// $("#zc-ide").on("click", "#ide-content-search-right", function() {
	// 	$("#custom-search").trigger('click');
	// });

	/*---------------------- CLEAR SEARCH ---------------------*/
	// var mydatasearchtime;

	// var show_clear = function(getInputID, getClearSearchId) {
	// 	var hasSearchText = $(getInputID).val().replace(/\s/g, '').length;
	// 	if((hasSearchText < 5) && (hasSearchText > 0)) {
	// 		$(".search-result-msg").empty().append('<span class="zc-loader"> </span>');
	// 		$(".searched-file-list").show();
	// 		$(getClearSearchId).css("display","block");
	// 		$(".search-result-msg").removeClass("zc-hide");

	// 		mydatasearchtime = setTimeout(function() {
	// 			$("#result-1").removeClass("zc-hide");
	// 		},1000);
	// 		mydatasearchtime = setTimeout(function() {
	// 			$("#result-2").removeClass("zc-hide");
	// 		},1300);
	// 		mydatasearchtime = setTimeout(function() {
	// 			$("#result-3").removeClass("zc-hide");
	// 		},1500);
	// 		mydatasearchtime = setTimeout(function() {
	// 			$("#result-4").removeClass("zc-hide");
	// 		},1700);
	// 		mydatasearchtime = setTimeout(function() {
	// 			$("#result-5").removeClass("zc-hide");
	// 		},1900);
	// 		mydatasearchtime = setTimeout(function() {
	// 			$(".search-result-msg").removeClass("zc-hide");
	// 		}, 2000);
	// 		mydatasearchtime = setTimeout(function() {
	// 			$(".search-result-msg").empty().append("Found 32 matches in 5 files");
	// 		}, 4300);
	// 	}   else if ((hasSearchText >= 5 )  && (hasSearchText < 42)) {
	// 		clearTimeout(mydatasearchtime);
	// 		$(".search-result-msg").empty().append("No matches found");
	// 		$(".searched-file-list").hide();
	// 	}  else  {  
	// 		clearTimeout(mydatasearchtime);
	// 		$(".search-result-msg").empty().append("Empty");
	// 		$("#my-content-clear").css("display","none");
	// 		$(".search-result-msg").empty();
	// 		$(".searched-file-list").hide();
	// 	}
	// }

	// $(document).on("keyup", "#my-content-search",function(){
	// 	show_clear("#my-content-search", "#my-content-clear");
	// });

	// $(document).on("click","#my-content-clear", function() {
	// 	$("#my-content-search").val("");
	// 	$(this).css("display","none");
	// 	$(".search-result-msg, .searched-result-wrap").addClass("zc-hide");
	// 	$("#my-content-search").focus();
	// 	$(".search-result-msg").empty().append('<span class="zc-loader"> </span>');
	// });


	/* ---------------- RIGHT PANE ------------------ */
	$(document).on("keyup", "#my-content-search-right", function () {
		show_clear("#my-content-search-right", "#my-content-clear-right");
	});

	$("#my-content-clear-right").on("click", function () {
		$("#my-content-search").val("");
		$(this).css("display", "none");
		$(".search-result-msg, .searched-result-wrap").addClass("zc-hide");
		$("#my-content-search").focus();
		$(".search-result-msg").empty().append('<span class="zc-loader"> </span>');
	});


	/*-------------------- OUTLINE SEARCH ------------------*/

	var outline_clear = function (getInputID, getClearSearchId) {
		var hasSearchText = $(getInputID).val().replace(/\s/g, '').length;
		if (hasSearchText > 0) {
			$(getClearSearchId).css("display", "block");
		} else {
			$(getClearSearchId).css("display", "none");
		}
	}

	$("#outline-search").on("keyup", function () {
		outline_clear("#outline-search", "#outline-clear-search");
	});

	$("#outline-clear-search").on("click", function () {
		$("#outline-search").val("");
		$(this).css("display", "none");
		$("#outline-search").focus();
	});

	/*---------------------- SEARCH RESULT SHOW AND HIDE --------------*/

	$(".file-expander").on("click", function () {
		$(this).parent('.search-file-path').next('.search-file-lines').slideToggle("fast");
		$(this).toggleClass("hide-file-list");
	});

	$(".file-path-text").on("click", function () {
		$(this).parent('.search-file-path').next('.search-file-lines').slideToggle("fast");
		$(this).prev(".file-expander").toggleClass("hide-file-list");

	});

	$(".file-line").on("click", function () {
		$(".search-file-lines .file-line").removeClass("selected");
		$(this).addClass("selected");
		var tabLength = $('#ide-tab-sortable .ide-tab').length;
		var getParentID = $(this).parent().attr('id');
		if (getParentID == "result-2-file") {
			if (tabLength < 4) {
				$(".user-presence-wrap").hide();
				$("#ide-tab-sortable .ide-tab").removeClass("tab-active");
				$("#ide-tab-sortable .ide-tab").removeClass('zc-noTabSeparator');
				$("#ide-tab-sortable").append('<li class="ide-tab tab-active preview-tab"> <span class="tab-text">editor.js </span>\
<span class="tab-close">\
<i class="icon-9"><svg class="zc-grey"> <use  xlink:href="#svg-close-icon"> </use> </svg>\ </i></span></li>');
			}
		}
		else if (getParentID == "result-3-file") {
			$("#ide-tab-sortable .preview-tab").find(".tab-text").empty().append("main.js");
		}
		else if (getParentID == "result-4-file") {
			$("#ide-tab-sortable .preview-tab").find(".tab-text").empty().append("manage.js");
		}
		else if (getParentID == "result-5-file") {
			$("#ide-tab-sortable .preview-tab").find(".tab-text").empty().append("reports.js");
		}
		else {
			$("#ide-tab-sortable .ide-tab:first-child").addClass("tab-active");
			$("#ide-tab-sortable .preview-tab").remove();
		}

	});



	/*---- CONTENT SEARCH IN BOTTOM -----*/



	$("#minimize-cs-pane").on("click", function () {
		if ($(".zc-ideContainer").hasClass("show-bottom-pane")) {
			$(".zc-ideContainer").toggleClass("minimize-cs-pane");
			$("#minimize-cs-pane").toggleClass("zc-minimize");
		}
		$(".zc-ideContainer").toggleClass("minimize-cs-pane");
		$(this).toggleClass("zc-minimize");
	});

	$('#close-cs-pane').on("click", function () {
		$(".zc-ideContainer").removeClass("show-cs-pane minimize-bottom-pane minimize-cs-pane");
		$("#minimize-bottom-pane").toggleClass("zc-minimize");
	});




	$(".zc-btn").on("click", function () {
		$(this).blur();
	});


	/*------------------------------------------------------------------------------------------------------------------                                                 COMMIT FILES
																															---------------------------------------------------------------------------------------------------------------------*/

	/* COMMIT DIALOG OPEN */
	$("#zc-ide").on("click", "#ide-commitFiles", function () {
		var dialogId = $("#ide-commit-dialog");
		show_dialog(dialogId);
		onclick_reset();
	});





	/* COMMIT BUTTON */

	$("#zc-ide").on("click", "#commit-files", function () {
		var getcommitMsg = $("#commitMsgInput").val(),
			iffieldcheck = true;
		if (getcommitMsg == "" || getcommitMsg == null) {
			textfield_show_error('#commitMsgInput', '#commit-msgReq');
			iffieldcheck = false;
		} else {
			textfield_hide_error('#commitMsgInput', '#commit-msgReq');
		}

		if (iffieldcheck == true) {
			$("#ide-succes-msg").removeClass("zc-hide");
			$(this).addClass("zc-loading");
			$(this).empty().append('<span class="zc-loader"> </span> Commiting');
			$("#ide-commit-dialog").find(".zc-action-overlay").addClass("show-action-overlay");
			$(this).blur();
			setTimeout(function () {
				$("#ide-succes-msg").addClass("show-toast-message");
				hide_dialog();
				$("#ide-succes-msg").find('.zc-toast-text').empty().append("The selected files has been committed successfully");
				toast_Position();
			}, 2500);
			setTimeout(function () {
				$("#ide-succes-msg").removeClass("show-toast-message");
				$("#ide-commit-dialog").find(".zc-action-overlay").removeClass("show-action-overlay");
				$("#commit-files").empty().append('Commit');
			}, 5500);
		}

	});


	$("#zc-ide").on("click", "#cancel-commit, #close-commit-dialog", function () {
		hide_dialog();
	});


	$("#zc-commitedFileList .zc-commitFile").on("click", function (event) {
		var target = $(event.target);


		if (!target.closest(".check-wrap").length) {
			$(".zc-diffContainer").fadeIn("slow");
		}

	});


	/*------------------------------------------------------------------------------------------------------------------                                                 COMMIT FILES
													---------------------------------------------------------------------------------------------------------------------*/

	/* COMMIT DIALOG OPEN */
	$("#zc-ide").on("click", "#ide-commitFiles-2", function () {
		var dialogId = $("#ide-commit-dialog-2");
		show_dialog(dialogId);
		onclick_reset();

	});

	/* COMMIT DIALOG OPEN */
	//  $("#zc-ide").on("click", "#ide-commitFiles-2", function() {
	//    var dialogId = $("#ide-commit-dialog-2");
	//    show_commitDialog(dialogId);
	//  });


	/* CHECKBOX INDETERMINATE STATE */
	$("#zc-commitedFileList-2 .zc-grid-row .zc-checkbox").on("change", function () {
		var getTotalCheckbox = $("#zc-commitedFileList-2 .zc-grid-row .zc-checkbox:checked").length;
		if (getTotalCheckbox >= 8) {
			$("#zcommitFiles-opt").prop("checked", true);
			$("#zcommitFiles-opt").removeClass("indeterminate");
		} else {
			$("#zcommitFiles-opt").prop("checked", false);
			$("#zcommitFiles-opt").addClass("indeterminate");
		}
	});

	$("#zcommitFiles-2").on("click", function () {
		var _this = $(this);
		if (_this.is(":checked")) {
			if (_this.hasClass("indeterminate")) {
				$("#zc-commitedFileList-2 .zc-grid-row .zc-checkbox").prop("checked", false);
				_this.prop("checked", false);
				$("#zcommitFiles-opt").removeClass("indeterminate");
			} else {
				$("#zc-commitedFileList-2 .zc-grid-row .zc-checkbox").prop("checked", true);
				_this.prop("checked", true);
				$("#zcommitFiles-opt").removeClass("indeterminate");
			}
		} else {
			$("#zc-commitedFileList-2 .zc-grid-row .zc-checkbox").prop("checked", false);
			_this.prop("checked", false);
		}
	});

	/* COMMIT BUTTON */

	$("#zc-ide").on("click", "#commit-files-2", function () {
		var getcommitMsg = $("#commitMsgInput-2").val(),
			iffieldcheck = true;
		if (getcommitMsg == "" || getcommitMsg == null) {
			textfield_show_error('#commitMsgInput-2', '#commit-msgReq-2');
			iffieldcheck = false;
		} else {
			textfield_hide_error('#commitMsgInput-2', '#commit-msgReq-2');
		}

		if (iffieldcheck == true) {
			$("#ide-succes-msg").removeClass("zc-hide");
			$(this).addClass("zc-loading");
			$(this).empty().append('<span class="zc-loader"> </span> Commiting');
			$("#ide-commit-dialog-2").find(".zc-action-overlay").addClass("show-action-overlay");
			$(this).blur();
			setTimeout(function () {
				$("#ide-succes-msg").addClass("show-toast-message");
				hide_dialog();
				$("#ide-succes-msg").find('.zc-toast-text').empty().append("The selected files has been committed successfully");
				toast_Position();
			}, 2500);
			setTimeout(function () {
				$("#ide-succes-msg").removeClass("show-toast-message");
				$("#ide-commit-dialog-2").find(".zc-action-overlay").removeClass("show-action-overlay");
				$("#commit-files-2").empty().append('Commit');
			}, 5500);
		}

	});


	$("#zc-ide").on("click", "#cancel-commit-2, #close-commit-dialog-2", function () {
		hide_dialog();
	});


	$("#zc-commitedFileList-2 .zc-commitFile").on("click", function (event) {
		var target = $(event.target);


		if (!target.closest(".check-wrap").length) {
			$(".zc-diffContainer").fadeIn("slow");
		}

	});


	/*-----------------------------------------------------------------------------------------------------                                                 COMMIT FILES FULL SCREEN
																			-----------------------------------------------------------------------------------------------------------*/

	$(document).on("click", "#ide-commit-dialog-3 table thead tr", function () {
		$(this).find(".file-listExpander").toggleClass("show-fileList");
		$(this).parent("thead").next("tbody").toggleClass("show-IssueList");
	});

	$(document).on("click", "#ide-commit-dialog-3 .show-IssueList tr", function (event) {
		var target = $(event.target);
		if (!target.closest(".zc-commitFile-chk").length) {
			$("#zc-fileDiffPaneView").show();
			$("#ide-commit-dialog-3 .show-IssueList tr").removeClass("active");
			$(this).addClass("active");
		}
	});


	$(document).on("click", "#zc-fileDiffPaneView-close", function () {
		$("#zc-fileDiffPaneView").hide();
	});


	var commitCount = 0;
	$(document).on("click", "#commit-files-3", function () {
		var iffieldcheck = true;
		var inputText = $("#commitMsgInput").val();

		if ((inputText == "") || (inputText == null)) {
			iffieldcheck = false;
			$("#commitMsgReq").removeClass("zc-hide");
			$("#commitMsgReq").css("display", "block");
			$("#commitMsgInput").addClass("zc-error");

		} else {
			$("#commitMsgReq").css("display", "none");
			$("#commitMsgReq").addClass("zc-hide");
			$("#commitMsgInput").removeClass("zc-error");
		}

		if (iffieldcheck == true) {
			commitCount++;

			if ($('#zc-commitFile-1').is(':checked')) {
				$("#projExp__17 .fancytree-icon").empty().append('<svg class="zc-grey"><use xlink:href="#svg-json-icon"></use></svg>');
			}

			if ($('#zc-commitFile-2').is(':checked')) {
				$("#projExp__18 .fancytree-icon").empty().append('<svg><use xlink:href="#svg-css-icon"></use></svg>');
			}

			if ($('#zc-commitFile-3').is(':checked')) {
				$("#projExp__6 .fancytree-icon").empty().append('<svg><use xlink:href="#svg-js-icon"></use></svg>');
			}

			if ($('#zc-commitFile-5').is(':checked')) {
				$("#projExp__9 .fancytree-icon").empty().append('<svg><use xlink:href="#svg-css-icon"></use></svg>');
			}

			if ($('#zc-commitFile-6').is(':checked')) {
				$("#projExp__11 .fancytree-icon").empty().append('<svg><use xlink:href="#svg-java-icon"></use></svg>');
			}

			if ($('#zc-commitFile-7').is(':checked')) {
				$("#projExp__12 .fancytree-icon").empty().append('<svg><use xlink:href="#svg-js-icon"></use></svg>');
			}

			if ($('#zc-commitFile-8').is(':checked')) {
				$("#projExp__13 .fancytree-icon").empty().append('<svg><use xlink:href="#svg-java-icon"></use></svg>');
			}

			$(this).addClass("zc-loading");
			$(this).empty().append('<span class="zc-loader"> </span> Commiting');

			var addedChecked = $("#zc-addedCommit .zc-checkbox:checked").length,
				modifiedChecked = $("#zc-modifiedCommit .zc-checkbox:checked").length,
				totalChecked = addedChecked + modifiedChecked;
			if ($("#ide-commit-dialog-3").hasClass('zc-commitPushDialog')) {
				setTimeout(function () {
					$("#commit-files-3").removeClass("zc-loading");
					$("#commit-files-3").empty().append('Commit');
					var dialogId = $("#SuccesMsg");
					show_dialog(dialogId);
				}, 2500);
			}
			else {
				setTimeout(function () {
					$("#zc-addedCommit .zc-checkbox:checked").closest("tr").remove();
					var traddedLength = $("#zc-addedCommit tr").length;
					if (!(traddedLength > 1)) {
						$("#zc-addedCommit").remove();
					}
					$("#zc-modifiedCommit .zc-checkbox:checked").closest("tr").remove();
					var trmodifyLength = $("#zc-modifiedCommit tr").length;
					if (!(trmodifyLength > 1)) {
						$("#zc-modifiedCommit").remove();
					}
					var gettotalLength = traddedLength + trmodifyLength;
					if (!(gettotalLength > 2)) {
						$("#close-commit-dialog-2").trigger("click");
						$("#zc-fileDiffPaneView").hide();
						$("#ide-commit-dialog-3 .zc-dialog-actions").remove();
						$("#zc-noCommitFiles").show();
						$("#zc-commitName").parent(".check-wrap").remove();
						$("#ide-commit-dialog-3 .zc-title").empty().append("Commit All Changes");
						//              $("#projExp__1 .fancytree-level-1").append('<span class="zc-notifi-count">'+commitCount+'</span>');
						$("#ide-repository").find("#ide-pushFiles").append('<span class="zc-notifi-count">' + commitCount + '</span>');
					}
					$("#zc-commitName").prop("checked", false);
					$("#commit-files-3").removeClass("zc-loading");
					$("#commit-files-3").empty().append('Commit');
					if ($("#zc-resolvedCommit").hasClass("enableResolved")) {
						$("#projExp__17 .fancytree-icon").empty().append('<svg class="zc-grey"><use xlink:href="#svg-json-icon"></use></svg>');
						$("#projExp__11 .fancytree-icon").empty().append('<svg><use xlink:href="#svg-java-icon"></use></svg>');
						$("#projExp__6 .fancytree-icon").empty().append('<svg><use xlink:href="#svg-js-icon"></use></svg>');
						$("#projExp__9 .fancytree-icon").empty().append('<svg><use xlink:href="#svg-css-icon"></use></svg>');
						$("#projExp__12 .fancytree-icon").empty().append('<svg><use xlink:href="#svg-js-icon"></use></svg>');
						$("#projExp__13 .fancytree-icon").empty().append('<svg><use xlink:href="#svg-java-icon"></use></svg>');
						$("#zc-resolvedCommit").remove();
						$("#SuccesMsg .zc-toast-text").empty().append('Committed 4 files successfully.');
					} else {
						$("#SuccesMsg .zc-toast-text").empty().append('Committed ' + totalChecked + ' files successfully.');
					}
					$("#SuccesMsg").addClass("show-toast-message zc-commit-msg");
					toast_Position();
				}, 2500);
				setTimeout(function () {
					$("#SuccesMsg").removeClass("show-toast-message");
				}, 5500);
				setTimeout(function () {
					$("#SuccesMsg").removeClass("zc-commit-msg");
				}, 6000);
			}
		}
	});

	$(document).on("click", ".zc-commitCancel", function () {
		hide_dialog();
		$("#zc-fileDiffPaneView").hide();
	});



	/*------------------------------------------------------------------------------------------------------------------                                                 COMPARE FILES
																	  --------------------------------------------------------------------------------------------------------------------*/
	$(document).on("click", "#ide-compare-dialog table thead tr", function () {
		$(this).find(".file-listExpander").toggleClass("show-fileList");
		$(this).parent("thead").next("tbody").toggleClass("show-IssueList");
	});

	$(document).on("click", "#ide-compare-dialog .show-IssueList tr", function (event) {
		var target = $(event.target);
		if (!target.closest(".zc-commitFile-chk").length) {
			$("#zc-fileDiffPaneView").show();
			$("#ide-compare-dialog .show-IssueList tr").removeClass("active");
			$(this).addClass("active");
		}
	});

	$(document).on("keyup", "#zc-comparesearchfiles", function () {
		show_clear("#zc-comparesearchfiles", "#clear-comparesearchfiles");
	});

	$(document).on("click", "#clear-comparesearchfiles", function () {
		$("#zc-comparesearchfiles").val("");
		$(this).css("display", "none");
	});


	$(document).on("click", "#compareButton", function () {
		var getCompareToList, getCompareFromList;
		getCompareFromList = $("#zc-compareFrom-list").chosen().val();

		getCompareToList = $("#zc-compareTo-list").chosen().val();

		var getSwitchBranchInput = $("#zc-compareTo-list"),
			iffieldcheck = true;
		if (getSwitchBranchInput.prop('selectedIndex') == 0) {
			$("#zc-compareTo-list").addClass("zc-error");
			$("#compareTo-nameReq").addClass("zc-error-msg");
			$("#compareTo-nameReq").css("display", "inline-block");
			iffieldcheck = false;
		} else {
			$("#zc-compareTo-list").removeClass("zc-error");
			$("#compareTo-nameReq").removeClass("zc-error-msg");
			$("#compareTo-nameReq").addClass("zc-hide");
			$("#compareTo-nameReq").css("display", "none");
		}
		if (iffieldcheck == true) {
			$(this).blur();
			$("#ide-compare-dialog .zc-dialog-content").css("display", "block");
			if (getCompareFromList == getCompareToList) {
				$("#zc-FileListWrap, #zc-noChanges").css("display", "none");
				$("#zc-sameBranch").css("display", "block");
				$("#zc-sameBranch p").empty().append('"' + getCompareFromList + '" and "' + getCompareToList + '" are same.');
			} else if (getCompareToList == "master") {
				$("#zc-FileListWrap, #zc-sameBranch").css("display", "none");
				$("#zc-noChanges").css("display", "block");
			} else {
				$("#zc-FileListWrap").css("display", "block");
				$("#zc-noChanges, #zc-sameBranch").css("display", "none");
			}
		}
	});



	/*
																								  $("#zc-ide").on("click", "#compareButton", function(){
																									  var getCompareBranchInput = $("#zc-compareBranch-list"),
																										  iffieldcheck = true;
																									  if(getCompareBranchInput.prop('selectedIndex') == 0){
																										  textfield_show_error("#zc-compareBranch-list", "#comparebranch-nameReq");
																										  iffieldcheck=false;
																									  } else {
																										  textfield_hide_error("#zc-compareBranch-list", "#comparebranch-nameReq");
																									  }

																									  if( iffieldcheck == true) {
																										  $(this).addClass("zc-loading");
																										  $(this).empty().append('<span class="zc-loader"> </span> Comparing');
																										  $("#ide-compareBranch-dialog").find(".zc-action-overlay").addClass("show-action-overlay");
																										  $(this).blur();
																										  setTimeout(function() {
																											  $("#compare-succes-msg").addClass("show-toast-message");
																											  hide_dialog();
																											  toast_Position();
																										  }, 2500);
																										  setTimeout(function() {
																											  $("#compare-succes-msg").removeClass("show-toast-message");
																										  },5500);
																									  }
																								  });

																								  $("#zc-compareBranch-list").on('change', function(){
																									  var getCompareBranchInput = $("#zc-compareBranch-list");
																									  if(getCompareBranchInput.prop('selectedIndex') == 0){
																										  textfield_show_error("#zc-compareBranch-list", "#comparebranch-nameReq");
																									  } else {
																										  textfield_hide_error("#zc-compareBranch-list", "#comparebranch-nameReq");
																									  }
																								  });

																								  $("#zc-ide").on("click", "#compare-close-Btn,  #cancelCompareButton", function(){
																									  hide_dialog();
																								  });
																						  */


	/*------------------------------------------------------------------------------------------------------
																																	 COMMIT SINGLE FILE
																								  ------------------------------------------------------------------------------------------------------*/
	$("#zc-ide").on("click", "#ide-commitFiles-singleFile", function () {
		var dialogId = $("#ide-commit-dialog-singleFile");
		show_commitDialog(dialogId);
		onclick_reset();
	});

	$("#zc-ide").on("click", "#close-commit-dialog-singleFile", function () {
		hide_dialog();
	});




	/*-------------------------------------------------------------------------------------------------------
																																		RESOLVE NOW
																								  ------------------------------------------------------------------------------------------------------*/

	$(document).on("click", "#ide-resolve", function () {
		var dialogId = $("#ide-resolve-dialog");
		show_commitDialog(dialogId);
	});

	$("#ide-resolve-dialog table thead tr").on("click", function () {
		$(this).find(".file-listExpander").toggleClass("show-fileList");
		$(this).parent("thead").next("tbody").toggleClass("show-IssueList");
	});


	$("#zc-unresolved .show-IssueList tr").on("click", function () {
		$("#zc-fileResolvePaneView").hide();
		$("#zc-fileUnresolvePaneView").show();
		$("#ide-resolve-dialog .show-IssueList tr").removeClass("active");
		$(this).addClass("active");
		//   var zcfilePath = $(this).find('td:last-child').text();
		//  $("#zc-UnresolveFilePath").empty().append(zcfilePath);

		if ($(this).is("#unresolved-1")) {
			$(".zc-fileUnresolve-wrap").fadeOut('400', '', function () {
				setTimeout(function () {
					$("#zc-fileTheme-css").fadeIn();
				}, 400);
			});
		} else if ($(this).is("#unresolved-2")) {
			$(".zc-fileUnresolve-wrap").fadeOut('400', '', function () {
				setTimeout(function () {
					$("#zc-fileApplication-js").fadeIn();
				}, 400);
			});
		} else if ($(this).is("#unresolved-3")) {
			$(".zc-fileUnresolve-wrap").fadeOut('400', '', function () {
				setTimeout(function () {
					$("#zc-fileMaster-java").fadeIn();
				}, 400);
			});
		} else if ($(this).is("#unresolved-4")) {
			$(".zc-fileUnresolve-wrap").fadeOut('400', '', function () {
				setTimeout(function () {
					$("#zc-fileProject-json").fadeIn();
				}, 400);
			});
		}
	});

	$("#zc-ide").on("click", "#zc-resolved .show-IssueList tr", function () {
		$("#zc-fileUnresolvePaneView").hide();
		$("#zc-fileResolvePaneView").show();
		$("#ide-resolve-dialog .show-IssueList tr").removeClass("active");
		$(this).addClass("active");
		var zcfilePath = $(this).find('td:last-child').text();
		$("#zc-resolveFilePath").empty().append(zcfilePath);
	});

	$(".zc-fileDiffPane-close").on("click", function () {
		$("#zc-fileUnresolvePaneView").hide();
	});

	$(".zc-fileDiffPane-close").on("click", function () {
		$("#zc-fileResolvePaneView").hide();
	});



	$(".zc-resolveBtn").on("click", function (event) {
		var unresolvedCount, resolvedCount, getResolvedContent, getCurrentId;
		var currentButton = $(this);
		currentButton.addClass("zc-loading");
		currentButton.empty().append('<span class="zc-loader"> </span> Resolving');
		setTimeout(function () {
			currentButton.removeClass("zc-loading");
			currentButton.empty().append('Resolved');
		}, 2500);

		setTimeout(function () {
			$("#zc-resolveTable tbody tr.active").addClass("resolvedFile");
			getCurrentId = $("#zc-resolveTable tbody tr.active").prop('id');
			$("#zc-resolveTable tbody tr.active").next("tr").trigger("click");

			getResolvedContent = $('#' + getCurrentId).html();
			$("#zc-resolved").css("display", "table");
			$("#zc-resolved tbody").append('<tr>' + getResolvedContent + '</tr>');
			$('#' + getCurrentId).remove();

			unresolvedCount = $("#zc-unresolved .show-IssueList tr").length;
			$("#zc-unresolved thead tr .zc-filePath").empty().append('Unresolved (' + unresolvedCount + ')');

			resolvedCount = $("#zc-resolved .show-IssueList tr").length;
			$("#zc-resolved thead tr .zc-filePath").empty().append('Resolved (' + resolvedCount + ')');

			if (unresolvedCount < 1) {
				$("#zc-unresolved").remove();
				$("#zc-fileUnresolvePaneView").hide();
				var dialogId = $("#confirm-resolvedSuccess");
				show_commitDialog(dialogId);
			}
		}, 3600);
	});

	$("#close-resolve-dialog").on("click", function () {
		hide_dialog();
		$("#zc-fileUnresolvePaneView").hide();
	});

	$("#resolveCommitlaterBtn").on("click", function () {
		hide_dialog();
		$("#close-resolve-dialog").trigger("click");
	});


	$(".zc-disclosureBtn .file-listExpander").on("click", function () {
		$(this).toggleClass('show-fileList');
		$(".zc-disclosureDetail").toggleClass("zc-show");
	});


	/*------------------------------------------------------------------------------------------------------
																														  RESOLVE COMMIT
																								  -----------------------------------------------------------------------------------------------------*/

	$("#resolveCommit-btn").on("click", function () {
		$("#resolveCommitlaterBtn").trigger("click");
		var dialogId = $("#ide-commit-dialog-3");
		show_commitDialog(dialogId);
		$("#zc-addedCommit").remove();
		$("#zc-modifiedCommit").remove();
		$("#zc-resolvedCommit").css("display", "table");
		$("#zc-resolvedCommit").addClass("enableResolved");
		$("#ide-commit-dialog-3 .zc-dialog-header .zc-title").empty().append("Commit All Changes (4)");
		$("#ide-commit-dialog-3").addClass("zc-commitPushDialog");
	});


	/*------------------------------------------------------------------------------------------------------
																															COMMIT AND PUSH
																								  ------------------------------------------------------------------------------------------------*/

	$("#commitandPush-btn").on("click", function () {
		$(this).addClass("zc-loading");
		$(this).empty().append('<span class="zc-loader"> </span> Pushing');
		setTimeout(function () {
			$(".zc-commitCancel").trigger("click");
			$("#push-succes-msg").addClass("show-toast-message");
			hide_dialog();
			toast_Position();
		}, 2500);
		setTimeout(function () {
			$("#push-succes-msg").removeClass("show-toast-message");
		}, 5500);
	});


	$("#commitandPushLater").on("click", function () {
		hide_dialog();
		$(".zc-commitCancel").trigger("click");
	});



	$("#zc-commitsearchfiles").on("keyup", function () {
		show_clear("#zc-commitsearchfiles", "#clear-commitsearchfiles");
	});

	$("#clear-commitsearchfiles").on("click", function () {
		$("#zc-commitsearchfiles").val("");
		$(this).css("display", "none");
	});

	$("#zc-commitsinsearchfiles").on("keyup", function () {
		show_clear("#zc-commitsinsearchfiles", "#clear-commitsinsearchfiles");
	});

	$("#clear-commitsinsearchfiles").on("click", function () {
		$("#zc-commitsinsearchfiles").val("");
		$(this).css("display", "none");
	});


	/*-- EDITOR PREFERENCES DIALOG --*/
	/*-----------------------------------  PREFERENCES  -------------------------------------------*/

	/* FOLDER PROPERTIES DIALOG OPEN */
	$("#zc-ide").on("click", "#ide-preferences", function () {
		var dialogId = $("#ide-preference-dialog");
		show_dialog(dialogId);
	});

	/* Theme Toggle */
	$("#zc-ide").on("click", "#zc-editorThemeBtns .zc-themeBox", function () {
		var _this = $(this);
		$("#zc-editorThemeBtns .zc-themeBox").removeClass("selected");
		_this.addClass("selected");

		if (_this.is("#zc-lightThemeBtn")) {
			$(".zc-themePreview").removeClass("zc-darThemePrev zc-greyThemePrev");
			$("#zc-darkThemeCode").css("display", "none");
			$("#zc-lightThemeCode").css("display", "table");

			//UPDATE SYNTAX THEME SETTING 
			var newOption = $('<option value="crimson_editor" selected>Crimson Editor</option>\
<option value="dawn">Dawn</option>\
<option value="eclipse">Eclipse</option>\
<option value="xcode">Xcode</option>');
			$('#zc-syntaxTheme-setting').empty().append(newOption);
			$('#zc-syntaxTheme-setting').trigger("chosen:updated");

		} else if (_this.is("#zc-darkThemeBtn")) {
			$(".zc-themePreview").removeClass("zc-greyThemePrev");
			$(".zc-themePreview").addClass("zc-darThemePrev");
			$("#zc-darkThemeCode").css("display", "table");
			$("#zc-lightThemeCode").css("display", "none");

			//UPDATE SYNTAX THEME SETTING 
			var newOption = $('<option value="ambiance">Ambiance</option>\
<option value="gruvbox">Gruvbox</option>\
<option value="idle_fingers">Idle Fingers</option>\
<option value="monokai">Monokai</option>\
<option value="tomorrow_night_eighties" selected>Tomorrow Night 80s</option>');

			$('#zc-syntaxTheme-setting').empty().append(newOption);
			$('#zc-syntaxTheme-setting').trigger("chosen:updated");


		} else if (_this.is("#zc-greyThemeBtn")) {
			$(".zc-themePreview").removeClass("zc-darThemePrev");
			$(".zc-themePreview").addClass("zc-greyThemePrev");
			$("#zc-darkThemeCode").css("display", "table");
			$("#zc-lightThemeCode").css("display", "none");

			//UPDATE SYNTAX THEME SETTING 
			var newOption = $('<option value="Solarized Dark" selected>Solarized Dark</option>\
<option value="Mono Industrial">Mono Industrial</option>\
<option value="Cobalt">Cobalt</option>');

			$('#zc-syntaxTheme-setting').empty().append(newOption);
			$('#zc-syntaxTheme-setting').trigger("chosen:updated");
		}
	});



	//UPDATE CHOSEN VALUE ON CLICK
	var newOption = $('<optgroup label="Branches">\
<option value=""></option>\
<option value="Master" selected>Master</option>\
<option value="DATE_BRANCH">DATE_BRANCH</option>\
<option value="DISCUSSION_BRANCH">DISCUSSION_BRANCH</option>\
<option value="FEEDBACK_BRANCH">FEEDBACK_BRANCH</option>\
<option value="LOGIN_BRANCH">LOGIN_BRANCH</option>\
</optgroup>\
<optgroup label="Tags">\
<option value=""></option>\
<option value="ZOHOPEOPLE_2_0">Version 2.1</option>\
<option value="ZOHOPEOPLE_2_0">Date Version 3.1</option>\
<option value="ZOHOPEOPLE_2_0">Discussion List </option>\
<option value="ZOHOPEOPLE_2_0">Crm User List</option>\
</optgroup>\
<optgroup label="Commits">\
<option value="f3166a43175a432d" selected>f3166a43175a432d</option>\</optgroup>');
	$('#zc-repchanges').empty().append(newOption);
	$('#zc-repchanges').trigger("chosen:updated");

	/* Languages Setting */
	$('#zc-lang-setting').on('change', function () {
		var getSelectedLang = $("#zc-lang-setting").chosen().val();
		getSelectedLang = getSelectedLang.toLowerCase();
		$("#zc-langContextSetting .zc-langcontext").hide();
		$("#codeFormattingPreferences .zc-codePreview .zc-table").hide();
		if (getSelectedLang == "java") {
			$("#zc-langContextSetting #zc-javalangSetting").show();
			$("#zc-javaFilePrev").css("display", "table");
		} else if (getSelectedLang == "xml") {
			$("#zc-langContextSetting #zc-xmllangSetting").show();
			$("#zc-xmlFilePrev").css("display", "table");
		} else if (getSelectedLang == "javascript") {
			$("#zc-langContextSetting #zc-jslangSetting").show();
			$("#zc-JsFilePrev").css("display", "table");
		}
	});

	/* Show Line number */
	$("#showLinenumber").on("click", function () {
		var _this = $(this).find("input");
		if (_this.is(':checked')) {

		} else {

		}
	});



	// Show Line Number Check
	$("#zc-ShowLineNumberChk").on("ztoggleswitchchange", function (e, ui) {
		var getLineState = ui.state;
		if (getLineState == true) {
			$(".zc-linenumberWrap").css("display", "block");
			$("#zc-htmlFilePrev .zc-linenumber").css("display", "table-cell");
			$(".zc-IndentGuide").removeClass("zc-posChange");
			$("#zc-htmlFilePrev").css("margin-left", "0px");
		} else {

			$(".zc-linenumberWrap").css("display", "none");
			$("#zc-htmlFilePrev .zc-linenumber").css("display", "none");
			$(".zc-IndentGuide").addClass("zc-posChange");
			$("#zc-htmlFilePrev").css("margin-left", "10px");
		}
	});


	//Show Indent Guides:
	$("#zc-ShowIndentGuideChk").on("ztoggleswitchchange", function (e, ui) {
		var getState = ui.state;
		if ($(".zc-linenumber").is(":visible")) {
			$(".zc-IndentGuide").removeClass("zc-posChange");
		} else {
			$(".zc-IndentGuide").addClass("zc-posChange");
		}

		if (getState == true) {
			$(".zc-IndentGuide").addClass("animate-Indent");

		} else {
			$(".zc-IndentGuide").removeClass("animate-Indent");
		}
	});


	//Highlight Active Line
	$("#zc-highlightActiveChk").on("ztoggleswitchchange", function (e, ui) {
		var getState = ui.state;
		if (getState == true) {
			$("#zc-highlightActive td").addClass("active");
		} else {
			$("#zc-highlightActive td").removeClass("active");
		}
	});


	// Font Setting 
	//		$('#zc-theme-setting').on('change', function(){
	//			var getSelectedFont = $("#zc-theme-setting").chosen().val();
	//			getSelectedFont =  getSelectedFont.toLowerCase();
	//
	//			if(getSelectedFont == "fira code") {
	//				$(".zc-themePreview .zc-codePreview").css("font-family","Fira Code");
	//			} else if(getSelectedFont == "inconsolata") {
	//				$(".zc-themePreview .zc-codePreview").css("font-family","Inconsolata")
	//			} else if(getSelectedFont == "source code pro") {
	//				$(".zc-themePreview .zc-codePreview").css("font-family","Source Code Pro")
	//			} else if(getSelectedFont == "monaco") {
	//				$(".zc-themePreview .zc-codePreview").css("font-family","monacoregular")
	//			} else if(getSelectedFont == "menlo regular") {
	//				$(".zc-themePreview .zc-codePreview").css("font-family","Menlo Regular")
	//			}
	//		});
	//		


	// ON DOCUMENT LOAD DEFAULT ITEMS FOR THEME AND FONT SETTING


	$(document).on("click", "#zc-editorPrefOkBtn", function () {

		/* ACE EDITOR SYNTAX Setting */
		var getSyntaxTheme = $("#zc-syntaxTheme-setting").chosen().val();
		localStorage.setItem("localSyntaxTheme", getSyntaxTheme);

		var getSelectedFont = $("#zc-theme-setting").chosen().val();
		localStorage.setItem("localSelectedFont", getSelectedFont);

		var getFontSize = $("#zc-fontSize").val();
		getFontSize = getFontSize.split(" ").join("");
		localStorage.setItem("localFontSize", getFontSize);

		var getCommentStyle = $("input:radio[name ='commentsStyle']:checked").val();
		console.log(getCommentStyle);
		localStorage.setItem("localCommentStyle", getCommentStyle);

		if ($("#zc-darkThemeBtn").hasClass("selected")) {
			var url = window.location.href;
			url = url.split('app/');
			var greyURL = url[0] + 'app/index.html?page=greyTheme';
			$("body").addClass('zc-greyTheme');
			window.history.pushState('page2', 'Title', greyURL);
			// window.open(greyURL, "_self");
			hide_dialog();
		} else if ($("#zc-lightThemeBtn").hasClass("selected")) {
			var url = window.location.href;
			url = url.split('app/');
			var greyURL = url[0] + 'app/index.html';
			$("body").removeClass('zc-greyTheme');
			window.history.pushState('page2', 'Title', greyURL);
			// window.open(greyURL, "_self");
			// editor.setTheme("ace/theme/");
			hide_dialog();
		} else {
			hide_dialog();
		}


		// refresh for ace editor to call once again
		ace_editor_init();





	});

	$(document).on("click", "#zc-editorPrefApplyBtn", function () {
		$("#zc-editorPrefApplyBtn").addClass("disabled");
	});

	$("#zc-ide").on("click", "#zc-editorCancelBtn", function () {
		if (!($("#zc-editorPrefApplyBtn").hasClass('disabled'))) {
			$("#zc-confirmApplyOverlay").addClass("zc-isVisible");
			$("#confirm-applyTheme").addClass("zc-showDialog");
			$(".zc-overlay").css("overflow", "hidden");
		} else {
			hide_dialog();
		}

	});

	$("#zc-ide").on('change', 'input[name=commentsStyle]', function () {
		$("#zc-editorPrefApplyBtn").removeClass("disabled");
	});


	$(".zc-editPreference .zc-switchWrap").on("ztoggleswitchchange", function (e, ui) {
		$("#zc-editorPrefApplyBtn").removeClass("disabled");
	});

	$(".zc-editPreference .zc-numberField").on("znumberfieldchange", function () {
		$("#zc-editorPrefApplyBtn").removeClass("disabled");
	});

	$(document).on("click", ".zc-editorThemeBtns .zc-themeBox", function () {
		$("#zc-editorPrefApplyBtn").removeClass("disabled");
	});

	$("#zc-ide").on("click", "#zc-confirmCancel", function () {
		var getdialogID = $("#confirm-applyTheme");
		hide_Confirmdialog(getdialogID);
	});

	$("#zc-ide").on("click", "#zc-confirmApply, #zc-confirmDontApply", function () {
		var getdialogID = $("#confirm-applyTheme");
		$("#zc-editorPrefApplyBtn").addClass("disabled");
		hide_Confirmdialog(getdialogID);
		hide_dialog();
	});



	/*--------------- EMAIL NOTIFICATION --------------------*/

	$("#zc-ide").on("click", ".zc-projectItem", function (event) {
		var target = $(event.target);
		//		_this.parent('.zc-projectItem').closest('.zc-projectList').toggleClass("zc-expandContext");
		if (!($(this).parent('.zc-projectList').hasClass('zc-disableProjectNotifi'))) {
			if ((!target.closest(".zc-ProjectSwitch").length)) {
				$(this).closest('.zc-projectList').toggleClass("zc-expandContext");
			}
		}
	});

	//Project Email Notification Switch
	$(".zc-ProjectSwitch .zc-switchWrap").on("ztoggleswitchchange", function (e, ui) {
		var getState = ui.state,
			_this = $(this);
		if (!(getState == true)) {
			_this.parent('.zc-ProjectSwitch').parent('.zc-projectItem').closest('.zc-projectList').addClass("zc-disableProjectNotifi");
			_this.parent('.zc-ProjectSwitch').parent('.zc-projectItem').closest('.zc-projectList').removeClass("zc-expandContext");
		} else {
			_this.parent('.zc-ProjectSwitch').parent('.zc-projectItem').closest('.zc-projectList').removeClass("zc-disableProjectNotifi");
		}
	});


	$(document).on("click", "#zc-mailNotifyokBtn, #zc-mailnotifyCancelBtn, #close-notifiPref", function () {
		hide_dialog();
	});

	/*---------------------------------------------------------------------------------------

																								  ---------------------------------------------------------------------------------------*/



	$("#zc-ide").on("click", "#projPrevCancelBtn, #projPreview-close-Btn", function () {
		hide_dialog();
	});

	/* PREVIEW URL FIELD FOCUSOUT FIELD */
	$("#preview-url").on("focusout", function () {
		var setinputId = $("#preview-url"),
			seterrorId = $("#zc-previewUrl-error"),
			setFormat = /^([a-zA-Z-]{0,100})$/,
			setrequiredMsg = "Preview URL is required.",
			setformateMsg = "Preview URL should contain only alphabets, numbers and hyphens (-).",
			setexistMsg = "<div>This URL name is not available. Try another, or pick one of the following:</div> <ul class='zc-suggestUrl'> <li><a href='#'>document-management</a></li> <li><a href='#'>doc-mgt</a></li> <li><a href='#'>documentmgt</a></li> <li><a href='#'>document-management-1</a></li> </ul>";
		onfocusout_validate_field(setinputId, seterrorId, setrequiredMsg, setFormat, setformateMsg, setexistMsg);
	});

	$("#zc-ide").on("click", ".zc-suggestUrl li a", function () {
		var _this = $(this).text();
		_this = $.trim(_this);
		$("#preview-url").empty().val(_this).focus();
		onclick_reset();
		iffieldcheck == true;

		var getval = $("#preview-url").val();

	});

	$("#projPrevOkBtn").on("click", function () {
		var _this = $(this);
		if (iffieldcheck == true) {
			hide_dialog();
			$("#ide-previewUrl-msg").addClass("show-toast-message");
			toast_Position();
			setTimeout(function () {
				$("#ide-previewUrl-msg").removeClass("show-toast-message");
			}, 3000);
		}
	});


	/* EDITOR PREFERENCE OPTION FOR PROTOTYPE */

	$("#zc-ide").on("click", "#zc-editorPrefApplyCloseBtn", function () {
		hide_dialog();
		$("#ide-editorPrefDialog .zc-dialog-actions").hide();
		$(".zc-editorPref-dialog .zc-dialog-content").css("bottom", "0");
	});

	$("#zc-ide").on("click", "#close-editorPref-dialog-1", function () {
		hide_dialog();
		$("#ide-editorPrefDialog .zc-dialog-actions").hide();
		$(".zc-editorPref-dialog .zc-dialog-content").css("bottom", "0");
	});

	$("#zc-ide").on("click", "#zc-editorApplyonlyBtn-1", function () {
		$("#ide-editorPrefDialog .zc-dialog-actions").hide();
		$(".zc-editorPref-dialog .zc-dialog-content").css("bottom", "0");
	});

	$("#zc-ide").on("click", "#zc-editorCancelBtn-1", function () {
		$("#ide-editorPrefDialog .zc-dialog-actions").hide();
		$(".zc-editorPref-dialog .zc-dialog-content").css("bottom", "0");
	});

	$("#zc-ide").on("click", "#zc-editorPrefResetBtn-1", function () {
		$("#ide-editorPrefDialog .zc-dialog-actions").hide();
		$(".zc-editorPref-dialog .zc-dialog-content").css("bottom", "0");
	});


	$(".zc-editPreference .zc-switchWrap").on("ztoggleswitchchange", function (e, ui) {
		$("#ide-editorPrefDialog .zc-dialog-actions").show();
		$(".zc-editorPref-dialog .zc-dialog-content").css("bottom", "99px");
	});

	$(".zc-editPreference .zc-numberField").on("znumberfieldchange", function () {
		$("#ide-editorPrefDialog .zc-dialog-actions").show();
		$(".zc-editorPref-dialog .zc-dialog-content").css("bottom", "99px");
	});


	/* EDITOR PREFERENCE OPTION 2 */
	$("#zc-ide").on("click", "#zc-editorCancelBtn-2, #close-editorPref-dialog-2", function () {
		hide_dialog();
	});


	/* RUN CONFIG ALERT DIALOG */

	$(document).on("click", ".zc-configDelete-Btn", function () {
		$('.zc-configList').removeClass('selectedConfig');
		$(this).parent('.zc-manageConfigAction').closest('.zc-configList').addClass("selectedConfig");
		$("#zc-deleteConfigOverlay").addClass('zc-isVisible');
		$("#confirm-deleteConfig").addClass("zc-showDialog");
	});

	$("#deleteConfig-btn").on("click", function () {
		$("#zc-deleteConfigOverlay").removeClass('zc-isVisible');
		$("#confirm-deleteConfig").removeClass("zc-showDialog");
		$('.selectedConfig').remove();
		var getConfigLength = $('.zc-configList').length;
		if (getConfigLength == 0) {
			$("#empty-state-config").removeClass('zc-hide');
		} else {
			$("#empty-state-config").addClass('zc-hide');
		}
	});

	$("#deleteConfig-CancelBtn").on("click", function () {
		$("#zc-deleteConfigOverlay").removeClass('zc-isVisible');
		$("#confirm-deleteConfig").removeClass("zc-showDialog");
	});


	//BROWSE LOCATION TO RUN 

	$("#browseLocation-btn").on("click", function () {
		var dialogId = $("#ide-browseLocation-dialog");
		show_dialog(dialogId);
	});


	// BROWSE DIALOG ACTION

	$("#zc-ide").on("click", "#select-browsePath-button", function () {
		hide_dialog();
	});

	$("#zc-ide").on("click", "#cancel-browsePath-btn", function () {
		hide_dialog();
	});


	$("#zc-ide").on("click", "#ide-create-newfolderConfig", function () {
		var dialogId = $("#ide-newfolderConfig-dialog");
		show_Confirmdialog(dialogId);
		$(".zc-dialog").find(".zc-error-msg").addClass("zc-hide");
		$(".zc-dialog").find(".zc-error-msg").next('.zc-hide').removeClass("zc-hide");
		$(".zc-dialog").find(".zc-input").removeClass("zc-error");
		$("#ide-newfolderConfig-dialog").css("top", "200px");
		$("#create-newfolder-input").val("").focus();
	});

	$("#zc-ide").on("click", "#newfolderCreate", function () {
		addButtonLoading($("#newfolderCreate"), "Creating");
		setTimeout(function () {
			removeButtonLoading($("#newfolderCreate"), "Create");
			$("#ide-newfolderConfig-dialog").removeClass('zc-showDialog');
		}, 3000);
	});

	$("#zc-ide").on("click", "#newfolderCancel", function () {
		$("#ide-newfolderConfig-dialog").removeClass('zc-showDialog');
	});

	//	var setIdeMenu = "";
	//	$.getJSON('menu.json', function (data) {
	//			console.log(data);
	//		$.each(data.FileHistoryToday, function (key, val) {
	//			setIdeMenu += '<div>'+val.Date+'</div>';
	//		});
	//		console.log(setIdeMenu);
	//	});


	/* FILE HISTORY DIALOG */

	var fileHistory = "", fileHistoryYesterday = "", fileHistoryJuly21 = "", fileHistoryJuly20 = "";

	$.getJSON('../json/ide.json', function (data) {

		var historyList = 0
		$.each(data.FileHistoryToday, function (key, val) {
			historyList++;
			if (val.id == "12.0") {
				fileHistory += '<div id="History-' + historyList + '" class="zc-verWrap active"><div class="zc-verContainer"><div class="zc-infoContainer"><div class="zc-avatar zc-avatarText">' + val.id + '</div><div class="zc-titleInfo"><div class="zc-primaryContent"><span class="zc-title zc-textTruncate">' + val.Date + '</span><span class="zc-grey-text zc-ml-5">(Latest)</span></div><div class="zc-secondaryContent zc-textTruncate"><span class="zc-userStatus" style="background:' + val.UserStatus + '"></span><span>' + val.User + '</span></div></div></div></div> <button data-menu-id="ide-fileHistoryMenu" data-active-class="active" class="zc-btn zc-btn-small zc-verAction icon"><i class="icon"><svg class="zc-black"> <use xlink:href="#svg-verticalMore-icon"></use></svg></i></button></div>'
			} else {
				fileHistory += '<div id="History-' + historyList + '" class="zc-verWrap"><div class="zc-verContainer"><div class="zc-infoContainer"><div class="zc-avatar zc-avatarText">' + val.id + '</div><div class="zc-titleInfo"><div class="zc-primaryContent"><span class="zc-title zc-textTruncate">' + val.Date + '</span></div><div class="zc-secondaryContent zc-textTruncate"><span class="zc-userStatus" style="background:' + val.UserStatus + '"></span><span>' + val.User + '</span></div></div></div></div> <button data-menu-id="ide-fileHistoryMenu" data-active-class="active" class="zc-btn zc-btn-small zc-verAction icon"><i class="icon"><svg class="zc-black"> <use xlink:href="#svg-verticalMore-icon"></use></svg></i></button></div>'
			}
		});

		$.each(data.FileHistoryYesterday, function (key, val) {
			historyList++;
			fileHistoryYesterday += '<div id="History-' + historyList + '" class="zc-verWrap"><div class="zc-verContainer"><div class="zc-infoContainer"><div class="zc-avatar zc-avatarText">' + val.id + '</div><div class="zc-titleInfo"><div class="zc-primaryContent"><span class="zc-title zc-textTruncate">' + val.Date + '</span></div><div class="zc-secondaryContent zc-textTruncate"><span class="zc-userStatus" style="background:' + val.UserStatus + '"></span><span>' + val.User + '</span></div></div></div></div> <button data-menu-id="ide-fileHistoryMenu" data-active-class="active" class="zc-btn zc-btn-small zc-verAction icon"><i class="icon"><svg class="zc-black"> <use xlink:href="#svg-verticalMore-icon"></use></svg></i></button></div>';
		});

		$.each(data.FileHistoryJuly21, function (key, val) {
			historyList++;
			fileHistoryJuly21 += '<div id="History-' + historyList + '" class="zc-verWrap"><div class="zc-verContainer"><div class="zc-infoContainer"><div class="zc-avatar zc-avatarText">' + val.id + '</div><div class="zc-titleInfo"><div class="zc-primaryContent"><span class="zc-title zc-textTruncate">' + val.Date + '</span></div><div class="zc-secondaryContent zc-textTruncate"><span class="zc-userStatus" style="background:' + val.UserStatus + '"></span><span>' + val.User + '</span></div></div></div></div> <button data-menu-id="ide-fileHistoryMenu" data-active-class="active" class="zc-btn zc-btn-small zc-verAction icon"><i class="icon"><svg class="zc-black"> <use xlink:href="#svg-verticalMore-icon"></use></svg></i></button></div>';
		});

		$.each(data.FileHistoryJuly20, function (key, val) {
			historyList++;

			fileHistoryJuly20 += '<div id="History-' + historyList + '" class="zc-verWrap"><div class="zc-verContainer"><div class="zc-infoContainer"><div class="zc-avatar zc-avatarText">' + val.id + '</div><div class="zc-titleInfo"><div class="zc-primaryContent"><span class="zc-title zc-textTruncate">' + val.Date + '</span></div><div class="zc-secondaryContent zc-textTruncate"><span class="zc-userStatus" style="background:' + val.UserStatus + '"></span><span>' + val.User + '</span></div></div></div></div> <button data-menu-id="ide-fileHistoryMenu" data-active-class="active" class="zc-btn zc-btn-small zc-verAction icon"><i class="icon"><svg class="zc-black"> <use xlink:href="#svg-verticalMore-icon"></use></svg></i></button></div>';

		});

		$("#zc-verJuly20 .zc-verContent").append(fileHistoryJuly20);
		$("#zc-verJuly21 .zc-verContent").append(fileHistoryJuly21);
		$("#zc-verYesterday .zc-verContent").append(fileHistoryYesterday);
		$("#zc-verToday .zc-verContent").append(fileHistory);

	}).error(function () {
		console.log("Error While Loading JSON");
	});


	$("#zc-ide").on("click", ".zc-fileVersion .zc-verWrap", function (event) {
		var target = $(event.target),
			_this = $(this);
		$("#zc-fileHistoryPrev span").removeClass("zc-higlightChanges");
		$(".zc-fileVersion .zc-verWrap").removeClass("active");
		_this.addClass("active");
		if (!target.closest(".zc-verAction").length) {
			if ((_this.is("#History-1")) || (_this.is("#History-7"))) {
				$("#zc-fileHistoryPrev #zc-VerHistoryLine-1").find("span").addClass("zc-higlightChanges");
			} else if ((_this.is("#History-2")) || (_this.is("#History-8"))) {
				$("#zc-fileHistoryPrev #zc-VerHistoryLine-2").find("span").addClass("zc-higlightChanges");
			} else if ((_this.is("#History-3")) || (_this.is("#History-9"))) {
				$("#zc-fileHistoryPrev #zc-VerHistoryLine-3").find("span").addClass("zc-higlightChanges");
			} else if ((_this.is("#History-4")) || (_this.is("#History-10"))) {
				$("#zc-fileHistoryPrev #zc-VerHistoryLine-4").find("span").addClass("zc-higlightChanges");
			} else if ((_this.is("#History-5")) || (_this.is("#History-11"))) {
				$("#zc-fileHistoryPrev #zc-VerHistoryLine-5").find("span").addClass("zc-higlightChanges");
			} else if ((_this.is("#History-6")) || (_this.is("#History-12"))) {
				$("#zc-fileHistoryPrev #zc-VerHistoryLine-6").find("span").addClass("zc-higlightChanges");
			}
		}

	});

	$("#zc-ide").on("click", "#restore-Btn", function () {
		$("#zc-confirmRestoreOverlay").addClass("zc-isVisible");
		$("#confirm-restore").addClass("zc-showDialog");
		$(".zc-overlay").css("overflow", "hidden");
	});

	$("#zc-ide").on("click", "#zc-confirmRestore", function () {
		hide_Confirmdialog($("#confirm-restore"));
		hide_dialog();
	});

	$("#zc-ide").on("click", "#zc-confirmRestoreCancel", function () {
		hide_Confirmdialog($("#confirm-restore"));
	});

	$("#zc-ide").on("click", ".zc-verWrap .zc-verAction", function () {
		getVersionNo = $(this).parent('.zc-verWrap').find('.zc-avatarText').text();
	});


	// 	/* FILE OPEN */

	// 	var setOpenFiles = "";

	// 	$.getJSON('../json/open-file-data.json', function (data) {

	// 		$.each(data.files, function (key, val) {
	// 			var getFileName = val.fileName,
	// 				getFilePath = val.filePath,
	// 				getFileIcon = val.id;

	// 			setOpenFiles += '<li>\
	// <div class="zc-infoContainer">\
	// <div class="zc-titleInfo">\
	// <div class="zc-primaryContent">\
	// <i class="icon zc-mr-8"><svg class="zc-projectAvatarIcon"> <use xlink:href="#'+ getFileIcon + '"> </use> </svg></i>\
	// <span class="zc-title zc-textTruncate">'+ getFileName + '</span>\
	// </div>\
	// <div class="zc-secondaryContent zc-textTruncate">\
	// <span>'+ getFilePath + '</span> \
	// </div>\
	// </div>\
	// </div>\
	// </li>';
	// 		});

	// 		$("#zc-fileOpenDialog .zc-openFileList ul").empty().append(setOpenFiles);
	// 	});

	//====================================//
	// Open dialog functions
	//====================================//
	$(document).on("click", "#zc-fileOpenDialog  .zc-openFileList li", function (e) {
		// if ($('#zc-fileOpenDialog  .zc-openFileList').hasClass('zc-openFileMultiSelection')) {
		// 	$(this).find('.zc-checkbox').trigger('click');
		// } else {
		hide_dialog();
		$("#zc-fileOpenDialog").zdialog("close");
		$("#application-tab").trigger("click");
		$("#openFile-input").val('');
		// }

	});

	$(document).on("click", "#zc-fileOpenDialog  .zc-openFileList li .zc-openFileSelection", function (e) {
		e.stopPropagation();
	});

	$(document).on("change", "#zc-fileOpenDialog  .zc-openFileList li .zc-checkbox", function (e) {
		if ($(this).is(':checked')) {
			$(this).closest('li').addClass('zc-openFileSelected');
		} else {
			$(this).closest('li').removeClass('zc-openFileSelected');
		}

		var checkedFileCount = $('#zc-fileOpenDialog  .zc-openFileList li .zc-checkbox:checked').length;

		if (checkedFileCount == 0) {
			$('#zc-fileOpenDialog  .zc-openFileList').removeClass('zc-openFileMultiSelection');
			$('#zc-openFileDialogOpenBtn').addClass('disabled');
			$('#zc-fileOpenDialog').find('.zc-openFileSelectionCount').remove();
			$('#zc-fileOpenDialog').addClass('zc-hideOpenDialogFooter');
		} else {
			$('#zc-fileOpenDialog  .zc-openFileList').addClass('zc-openFileMultiSelection');
			$('#zc-openFileDialogOpenBtn').removeClass('disabled');
			$('#zc-fileOpenDialog').removeClass('zc-hideOpenDialogFooter');
			if ($('#zc-fileOpenDialog').find('.zc-openFileSelectionCount').length == 0) {
				$('#zc-fileOpenDialog').append('<p class="zc-openFileSelectionCount"><span>' + checkedFileCount + '</span> file' + (checkedFileCount == 1 ? "" : "s") + ' selected</p>');
			} else {
				$('#zc-fileOpenDialog').find('.zc-openFileSelectionCount').html('<span>' + checkedFileCount + '</span> file' + (checkedFileCount == 1 ? "" : "s") + ' selected');

			}

		}
	});

	$(document).on("mouseover", "#zc-fileOpenDialog  .zc-openFileList li .zc-openFileSelection", function () {
		$(this).closest('li').addClass('no-hover').siblings('li').removeClass('no-hover');
	});

	$(document).on("mouseleave", "#zc-fileOpenDialog  .zc-openFileList li .zc-openFileSelection", function () {
		$(this).closest('li').removeClass('no-hover');
	});

	$(document).on("mouseleave", "#zc-fileOpenDialog  .zc-openFileList li .zc-openFileSelection", function () {
		$(this).closest('li').removeClass('no-hover');
	});

	keyboardFunction([['Cmd', 'O']], function () {
		$('#zc-fileOpenDialog').zdialog('open');
		$('#openFile-input').focus();
	});



	/****************************************/

	$(document).on("click", "#zc-goToDefinitionDialog  .zc-openFileList li", function () {
		//hide_dialog();
		$("#zc-goToDefinitionDialog").zdialog("close");
		$("#application-tab").trigger("click");
		$("#definition-input").val('');
	});





	var file_search = function (_this, getInputValueLength, check_fileList, check_fileListCount, show_noResult) {
		if (getInputValueLength > 0) {
			check_fileList.show().filter(function () {
				return $(this).find('.zc-title').text().toLowerCase().indexOf($("#openFile-input").val().toLowerCase()) == -1;
			}).hide();
		} else {
			check_fileList.show();
		}

		gridRowLength = check_fileListCount.find("li:visible").length;

		if (gridRowLength <= 0) {
			show_noResult.css("display", "block");
		} else {
			show_noResult.css("display", "none");
		}
	}

	$(window).load(function () {

		$("#openFile-input").on("keyup click input", function (event) {
			var gridRowLength,
				cardLength,

				_this = $(this),
				getInputValueLength = $(this).val().length,

				check_fileList = $(".zc-openFileList li"),
				check_fileListCount = $(".zc-openFileList ul"),
				show_noResult = $("#zc-nofilesFound");

			file_search(_this, getInputValueLength, check_fileList, check_fileListCount, show_noResult);
		});

		$("#openFile-input").on('keydown', function (e) {
			//press enter key to close the dialog
			if (event.which == 13 || event.keyCode == 13) {
				//hide_dialog();
				$('#zc-fileOpenDialog').zdialog("close");
				$("#application-tab").trigger("click");
				$("#openFile-input").val('');
			}

		});


		listNavigation.navigate('#openFile-input', '#zc-openFileList', 'li', 'onFocus');


		$(document).on('keydown', function (e) {

			//press enter key to close the dialog
			if ((event.which == 13 || event.keyCode == 13) && $('#zc-fileOpenDialog .zc-openFileList li').hasClass('onFocus')) {
				$('#zc-fileOpenDialog').zdialog("close");
				$("#application-tab").trigger("click");
				$("#openFile-input").val('');
			}

		});

	})

	/* -- Select init --*/
	$(window).load(function () {
		$('.zselect').zselect({
			"arrowSVGIconId": "svg-selectarrow-icon",
			// beforefocus : function(){ return false; }
		});
	})



	/* GO TO Definition */

	var setdefinition = "";

	$.getJSON('../json/open-file-data.json', function (data) {

		$.each(data.definition, function (key, val) {
			var getDefinitionName = val.definitionName;
			setdefinition += '<li>\
<div class="zc-infoContainer">\
<div class="zc-titleInfo">\
<div class="zc-primaryContent">\
<span class="zc-title zc-textTruncate">'+ getDefinitionName + '</span>\
</div>\
</div>\
</div>\
</li>';
		});

		$("#zc-goToDefinitionDialog .zc-openFileList ul").empty().append(setdefinition);
	});


	var definition_search = function (_this, getInputValueLength, check_fileList, check_fileListCount, show_noResult) {
		if (getInputValueLength > 0) {
			check_fileList.show().filter(function () {
				return $(this).find('.zc-title').text().toLowerCase().indexOf($("#definition-input").val().toLowerCase()) == -1;
			}).hide();
		} else {
			check_fileList.show();
		}

		gridRowLength = check_fileListCount.find("li:visible").length;

		if (gridRowLength <= 0) {
			show_noResult.css("display", "block");
		} else {
			show_noResult.css("display", "none");
		}
	}

	$(window).load(function () {

		$("#definition-input").on("keyup click input", function (event) {
			var gridRowLength,
				_this = $(this),
				getInputValueLength = $(this).val().length,

				check_fileList = $(".zc-openFileList li"),
				check_fileListCount = $(".zc-openFileList ul"),
				show_noResult = $("#zc-nodefinitionFound");

			definition_search(_this, getInputValueLength, check_fileList, check_fileListCount, show_noResult);
		});


		$("#definition-input").on('keydown', function (e) {
			if (event.which == 13 || event.keyCode == 13) {
				//hide_dialog();
				$("#zc-goToDefinitionDialog").zdialog("close");
				$("#application-tab").trigger("click");
				$("#definition-input").val('');
			}
		});


		/* GO TO LINE */

		$("#line-no-input").on('keydown', function (e) {
			if (event.which == 13 || event.keyCode == 13) {
				//hide_dialog();
				$("#zc-goToLineDialog").zdialog("close");
				$("#application-tab").trigger("click");
				$("#openFile-input").val('');
			}
		});

		/*$("#zc-lineNoinStatus").on("click", function(){
			show_dialog($("#ide-gotoline-dialog"));
		});*/

		$("#line-no-input").on("keydown", function (e) {
			// Allow: backspace, delete, tab, escape, enter and .
			if ($.inArray(e.keyCode, [46, 8, 9, 16, 27, 13, 110, 190]) !== -1 ||
				// Allow: Ctrl/cmd+A
				(e.keyCode == 65 && (e.ctrlKey === true || e.metaKey === true)) ||
				// Allow: Ctrl/cmd+C
				(e.keyCode == 67 && (e.ctrlKey === true || e.metaKey === true)) ||
				// Allow: Ctrl/cmd+X
				(e.keyCode == 88 && (e.ctrlKey === true || e.metaKey === true)) ||
				// Allow: colon
				(e.keyCode == 186 && e.shiftKey === true) ||
				// Allow: home, end, left, right
				(e.keyCode >= 35 && e.keyCode <= 39)) {
				// let it happen, don't do anything
				return;
			}
			// Ensure that it is a number and stop the keypress
			if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
				e.preventDefault();
			}
		});

	})

	/* CREATE FILE USING SPLIT BUTTON */
	$(document).on('click', '#createFileBySplit', function () {
		show_dialog($("#ide-file-dialog"));
	});

	$(document).on('click', '#openFileToolBtn', function () {
		show_dialog($("#ide-openFile-dialog"));
	});



	/*----------- Keyboard Shortcut Changed Update --------------*/

	$(document).on("click", "#keyboardShortcutUpdate", function () {
		var getdialogID = $("#confirm-keyboardShortcutUpdate");
		hide_Confirmdialog(getdialogID);
		setTimeout(function () {
			$("#zc-keyboardUpdateBubble").addClass("zc-showBubble");
			$(".zc-keyboardIcon").css("fill", "#f8722f");
			// $(".zc-keyboardIcon").addClass("keyboardAnimate");
		}, 100);
	});

	$(document).on("click", function () {
		if ($("#zc-keyboardUpdateBubble").hasClass("zc-showBubble")) {
			localStorage.setItem("setKeyboardUpdate", "true");
		}
		$("#zc-keyboardUpdateBubble").removeClass("zc-showBubble");
		$(".zc-keyboardIcon").css("fill", "");
		// $(".zc-keyboardIcon").removeClass("keyboardAnimate");
	});





	/*---- ESCAPE KEY ----*/

	$(document).on('keyup', function (event) {
		if (event.keyCode == 27) {

			//Prevent dialog close when the keyboard short cut edting state
			if ($('.zc-sCutUndo').length) {
				$('.zc-sCutUndo').removeClass('zc-sCutUndo');
				return false;
			}


			if ($("#ide-newfolder-dialog").hasClass("show-dialog")) {
				var dialogId = $("#ide-newfolder-dialog");
				hide_Confirmdialog(dialogId);
				$("#ide-newfolder-dialog").removeClass("show-dialog");
			} else {
				hide_dialog();
				$("#zc-fileDiffPaneView").hide();
				$("#zc-fileUnresolvePaneView").hide();
				$("#zc-fileResolvePaneView").hide();
				$("#zc-ide").removeClass("zc-distractFree");
			}

			if (($("#find-text").is(":focus")) || ($("#zc-replace-input").is(":focus"))) {
				$("#zc-findPaneClose").trigger("click");
			}

			if ($("#zc-explorerTitle").hasClass("zc-showFileSearch")) {
				$("#zc-explorerTitle .zc-input").val("");
				$("#zc-explorerTitle").removeClass("zc-showFileSearch");
			}


		}

	});

});


function openFilePathTruncation() {

	$('.zc-openFileList .zc-secondaryContent > span .zc-openFilePath').each(function () {
		$(this).text($(this).parent().attr('data-title'));
		$(this).parent().removeAttr('title');
		while ($(this).closest('.zc-secondaryContent').innerWidth() < $(this).innerWidth()) {
			var fullText = $(this).text().split('/');
			fullText.shift();
			$(this).text(fullText.join('/'));
			$(this).text('.../' + $(this).text());
			$(this).parent().attr('title', $(this).parent().attr('data-title'));
		}
	})
}