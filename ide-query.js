	var showViewTemplate;
	
	/* Split URL and add Query Params based on our needs. It will split "?" we can set query param after that */
    var setQueryParam = function (getUrl, getQuerParam, getSplitParam) {
    	var currentUrlSplit = getUrl.split(getSplitParam);

    	var currentStateObj = {
    		Title: "Zoho IDE",
    		Url: currentUrlSplit[0] + getQuerParam
    	};
    
    	window.history.pushState(currentStateObj, currentStateObj.Title, currentStateObj.Url);
    	
    	/* Get view Param  and load the respective view*/
    	getThemeParam  = getUrlParam('theme');
        getViewParam   = getUrlParam('view');
    }
    
    /* Get Case From URL */
    var getUrlParam = function (field, PassUrl) {
    	var href = PassUrl ? PassUrl : window.location.href;
    	var reg = new RegExp('[?&]' + field + '=([^&#]*)', 'i');
    	var string = reg.exec(href);
    	return string ? string[1] : null;
    }
    
        
 
    /* Reload the page on while access from  window back or forward and history state */
    $(window).on('popstate', function () {
    	location.reload(true);
    });
    

    /* Set view template based on query param */
    showViewTemplate = function (getViewParam, getThemeParam) {
        switch (getThemeParam) {
            case "empty":
    			emptyView();
			    break;
			default:
			    template = "";    
        }
    }
    
    
    /* IF URL Accessed on load if REPO Template is not empty */
    getThemeParam  = getUrlParam('theme');
    getViewParam   = getUrlParam('view');

    if (getViewParam != null || getViewParam != "") {
    	showViewTemplate(getThemeParam, getViewParam);
    }
    
    
    /*---------------------------- Usecase --------------------------------*/

    $("#usecaseList").on("click", function () {
        $("#usecase-template").addClass("zc-showUsecase");
        $(".zc-usecaseOverlay").addClass("zc-showUsecaseOverlay");
    });

    //Close Usecase List
    function closeUsecase() {
        $("#usecase-template").removeClass("zc-showUsecase");
        $(".zc-usecaseOverlay").removeClass("zc-showUsecaseOverlay");
    }

    $("#usecase-template").on("click", "#closeUsecaseList, .zc-usecaseOverlay", function () {
        closeUsecase();
    });
    
    $(".zc-usecaseOverlay").on("click", function () {
        closeUsecase();
    });

    // Use case list selection
    $("#usecase-template").on("click", " .zc-caseMenuList li a", function (event) {
        event.preventDefault();
        $("#usecase-template .zc-caseMenuList li").find("a").removeClass("active");
        $(this).addClass("active");
        closeUsecase();
    });
    
    
    
    
    /*-------------------------- Case Related Function ---------------------------*/
    
    var setEmptyChatMessage, setEmptyCommentMessage;
    
    /* Show Empty View */
	function emptyView() {
	   
        $("#usecaseList").show();
        
        // To hide statusbar collabrator indication
        $('#zc-activeCollabUsers').hide();
        
        $('.zc-notifi-count, .zc-newItemIndication, .zc-cmtNotifybadgeOnly').hide();

	    /*----------------- Empty Chat Message ----------------- */
        $("#zc-groupChatPane .ui-zcollaborator-content .ui-zcollab-newmsgbanner").hide();
        $("#zc-collabTabContent > div").hide();
        
        setEmptyChatMessage = '<div class="zc-empty-state">\
                                    <div class="zc-empty-image empty-codevelopers"></div>\
									<div class="zc-empty-content">\
									<h2>You haven\'t shared this project yet.</h2>\
                                    <p>Share this project and chat with your collaborators here.</p>\
                                    <div class="zc-btn-wrap">\
                                    <button class="zc-btn zc-gradient zc-btn-small">Share</button>\
									</div>\
									</div>\
                                    </div>';
        // Append Message                            
        $("#zc-collabTabContent").append(setEmptyChatMessage);                            
        
        
        /*----------------- Empty Comments Message  ----------------- */
        $('#imgPreview-tab').trigger('click'); 
        
        
        /*----------------- Empty Changes Message  ----------------- */
        $("#zc-commitTabContent > div").hide();
        
        var setEmptyChangesMessage = '<div class="zc-empty-state empty-comment">\
										<div class="zc-empty-image empty-noComment"></div>\
										<div class="zc-empty-content">\
										<h2>Changes Under Construction</h2>\
										<div>\
                                        </div>';
                                        
        // Append Message                            
        $("#zc-commitTabContent").append(setEmptyChangesMessage); 
        
        
        /*----------------- Empty Console Message  ----------------- */

        $("#zc-outputTabContent > div").hide();
        
        var setEmptyConsoleMessage = '<div class="zc-empty-state">\
									<div class="zc-empty-image empty-console"></div>\
									<div class="zc-empty-content">\
									<h2>No configurations.</h2>\
									<div>\
                                    </div>';
                                        
        // Append Message                            
        $("#zc-outputTabContent").append(setEmptyConsoleMessage); 
        
        
        /*----------------- Empty Problem Message  ----------------- */

        $("#zc-problemsTabContent > div").hide();
        
        var setEmptyProblemsMessage = '<div class="zc-empty-state">\
									<div class="zc-empty-image empty-problem"></div>\
									<div class="zc-empty-content">\
                                    <h2>There are no problems.</h2>\
									<p>Errors and warnings in your source code will be displayed here.</p>\
									</div>\
                                    </div>';
                                        
        // Append Message                            
        $("#zc-problemsTabContent").append(setEmptyProblemsMessage); 
        
         
        
        
        /*----------------- Empty Notifications ---------------------*/
        
        
        
    
	} 
	
	/*--------------------- Show Empty View Based on Cases -------------------*/
    
    /* After Shared the project */
    $("#zc-afterShareProject").on("click", function() {
        
        var setEmptyGroupchatMessage = '<div class="zc-empty-state">\
										<div class="zc-empty-image empty-nochatmessage"></div>\
										<div class="zc-empty-content">\
                                        <h2>You don’t have any messages.</h2>\
										<p>Start chatting with people in this project.</p>\
										</div>\
                                        </div>';
                            
        $("#zc-collabTabContent > div").show();
        
        $("#zc-collabTabContent > .zc-empty-state").hide();
        
        $("#co-developer-pane #empty-state-collab").hide();
        
        $("#zc-groupChatPane .ui-zcollaborator-content > div").hide();
        
        $("#zc-groupChatPane > div, .ui-zcollab-newmsgbanner").hide();
        
        $("#zc-groupChatPane .ui-zcollaborator-chatbase, #zc-groupChatPane .ui-zcollaborator-chat").show();
         
        // $("#zc-groupChatPane .ui-zcollaborator-content > div").hide();
         
        $("#zc-groupChatPane .ui-zcollaborator-content").append(setEmptyGroupchatMessage);
        
        $("#quickAccessCollab").trigger("click");

        
    });
    
    /* Before Shared the project */
    $("#zc-beforeShareProject").on("click", function() {
        $("#zc-collabTabContent > div").hide();
        // Append Message                            
        $("#zc-collabTabContent .zc-empty-state").show();  
        $("#quickAccessCollab").trigger("click");
    });
    
    /* No comments added */
    $("#zc-noCommentsAdded").on("click", function() {
        $("#quickAccessComments").trigger("click");
        $('#ide_popover_component_modulecss').trigger('click');
        $('#zc-commentTabContent .zc-panelHeader').hide();
    });
    
    /* No comments added for the current file. */
    $("#zc-noCommentsCurrentFile").on("click", function() {
        
       var setEmptyCommentCurrentFileMessage = setEmptyCommentMessage;

        $("#quickAccessComments").trigger("click");
            $("#zc-commentTabContent > div").show();
            $("#zc-commentTabContent > .zc-empty-state, #zc-commentTabContent > #zc-projCommentContent").hide();
            $("#ide-greyThemecss").trigger("click");

    });
    
    /* Not able to added a comment for the file.*/
    $("#zc-commentRestrict").on("click", function() {
        
       var setEmptyCommentRestrictFileMessage = setEmptyCommentMessage;
       
        $("#quickAccessComments").trigger("click");
        $("#zc-commentTabContent > div").show();
        $("#zc-commentTabContent > .zc-empty-state, #zc-commentTabContent > #zc-projCommentContent").hide();
      //  $("#imgPreview-tab").trigger("click");
		var isTabavailable  = $("#newConfig-tab").length;
		$("#zc-configName").val("");
		$(".zc-createConfigWrap, .zc-manageConfigWrap").addClass("zc-hide");
		$(".zc-runConfig").removeClass("zc-hide");
		if(!(isTabavailable >= 1)) {
			var appendTab = '<li id="newConfig-tab" class="ide-tab">  <span class="tab-text">Manage Configurations</span> <span class="tab-close" title="Close"><i class="icon-9"><svg class="zc-grey"> <use xlink:href="#svg-close-icon"> </use> </svg> </i></span><span class="zc-tabBottomCurve"></span><span class="zc-tabSeparators"></span></li>'
			$("#ide-tab-sortable").append(appendTab);
			$(".ide-tab-wrap .ide-tab").removeClass("tab-active");
			$(".ide-tab-wrap .ide-tab").removeClass('zc-noTabSeparator');
			$("#newConfig-tab").css("display","inline-flex").addClass("tab-active");
			$("#newConfig-tab").prevAll(':visible:first').addClass('zc-noTabSeparator');
			$(".zc-editorTabContent").addClass("zc-hide");
			$("#zc-createConfig-template").removeClass("zc-hide");
			
			$('#ide-tab-sortable').find('li').removeClass('zc-tabBorderFirst zc-tabBorderLast');
         $('#ide-tab-sortable').find('li:visible:first').addClass('zc-tabBorderFirst');
         $('#ide-tab-sortable').find('li:visible:last').addClass('zc-tabBorderLast');
		} 
			$("#newConfig-tab").trigger("click");
    });
    
   /* Non support format comment */
   $('#zc-commentsForBinaryFile').on("click", function(){
      $('#quickAccessComments').trigger('click');
      $('#imgPreview-tab').trigger('click');
   });
    
    /* No Outline added */
   $('#zc-outlineEmpty').on("click", function() {
      $('#quickAccessOutline').trigger('click');
      $('#mainjava').trigger('click');
   });
   
    /* No Outline added */
   $('#zc-notSupportEmpty').on("click", function() {
      $('#quickAccessOutline').trigger('click');
      $('#application-tab').trigger('click');
   });
   
   
   
    /* Non support format outline */
   $('#zc-outlineNonSupport').on("click", function(){
      $('#quickAccessOutline').trigger('click');
      $('#imgPreview-tab').trigger('click');
   });
   
   
    /* Not Outline able to added */
   $('#zc-outlineRestrict').on("click", function(){
      $('#quickAccessOutline').trigger('click');
		var isTabavailable  = $("#newConfig-tab").length;
		$("#zc-configName").val("");
		$(".zc-createConfigWrap, .zc-manageConfigWrap").addClass("zc-hide");
		$(".zc-runConfig").removeClass("zc-hide");
		if(!(isTabavailable >= 1)) {
			var appendTab = '<li id="newConfig-tab" class="ide-tab">  <span class="tab-text">Manage Configurations</span> <span class="tab-close" title="Close"><i class="icon-9"><svg class="zc-grey"> <use xlink:href="#svg-close-icon"> </use> </svg> </i></span><span class="zc-tabBottomCurve"></span><span class="zc-tabSeparators"></span></li>'
			$("#ide-tab-sortable").append(appendTab);
			$(".ide-tab-wrap .ide-tab").removeClass("tab-active");
			$(".ide-tab-wrap .ide-tab").removeClass('zc-noTabSeparator');
			$("#newConfig-tab").css("display","inline-flex").addClass("tab-active");
			$("#newConfig-tab").prevAll(':visible:first').addClass('zc-noTabSeparator');
			$(".zc-editorTabContent").addClass("zc-hide");
			$("#zc-createConfig-template").removeClass("zc-hide");
		} 
			$("#newConfig-tab").trigger("click");
   });
    
    /* No console running */
    $("#zc-noConsoleRunning").on("click", function() { 
        $("#zc-outputTabContent > div").hide();
        $("#zc-outputTabContent .zc-empty-state").show(); 
        $("#quickAccessConsole").trigger("click");
        
    });
    
    /* No configuration created*/
    $("#zc-noConfigurationCreated").on("click", function() { 
        $("#zc-outputTabContent > div").hide();
        $("zc-console-template > div").hide();
        
        $("#zc-console-template").show();
        $("#zc-console-template .zc-consoleHeader").show();
        
        $("#console-tabContents").removeClass('zc-hide');
        $("#console-tabContents > div").hide(); 
        
         var setEmptyConsoleMessage = '<div class="zc-empty-state">\
									<div class="zc-empty-image no-running-console"></div>\
									<div class="zc-empty-content">\
									<h2>None of your configurations are running now.</h2>\
									</div>\
									</div>';
									
   
         $("#console-tabContents").append(setEmptyConsoleMessage); 
         $("#quickAccessConsole").trigger("click");
    });

    
    
    
    
    
	
	
	$(document).ready(function (){  
	

	    
	    
	    
	    
	    
	    

	// GET QUERY STRING FROM URL
	var queries = {};
	$.each(document.location.search.substr(1).split('&'),function(c,q){
		var i = q.split('=');
        if(i[0].length !== 0){
          queries[i[0].toString()] = i[1].toString();
        } 
	});
		
    
  
    
    
    
    

		// SHOW THE CONTENT BASED ON PAGE 
		/* SHOW CONTENT SEARCH IN RIGHT PANE */
		if(queries.page == "rightpane") {
			$("#custom-search a").removeClass("zc-hide");
			$("#cs-in-bottom").remove();
			$("#findResult-pane").remove();
		} 

		/* SHOW CONTENT SEARCH IN BOTTOM PANE */
		else if (queries.page == "bottompane") {
			setTimeout(function() {
				$("#ide-content-search").removeClass("zc-hide");
				$("#search-pane").remove();
				$("#findResult-pane").remove();
			},200);
		}


		/* SHOW Find IN FILES RESULT IN RIGHT PANE */
		else if (queries.page == "findFiles") {
			setTimeout(function() {
				$("#ide-content-search").addClass("zc-hide");
				$("#cs-in-bottom, #search-pane, #custom-search").remove();
				$("#zc-findinFiles").find(".zc-btn").attr("id","zc-findResultBtn");
			},200);
		}

		/* SHOW COMMENTS */
		else if (queries.page == "comments") {
			$("#zc-code-editor").hide();
			$("#commentEditor-template").show();
			setTimeout(function() {
				$(".zc-cmt-feed, .cmt-pane-action").removeClass("zc-hide");
			},200);
		}

		/* SHOW EMPTY STATES */
		else if (queries.page == "emptyStates") {
			$("#ide-notification-list .zc-notifi-count, #zc-outlineWrap").addClass("zc-hide");
			$(".comment-notifiy, #ui-zcollaborator-wrapper, #collab-more-btn, .zc-notifi-pane ul").hide();
			setTimeout(function() {
				$("#empty-state-comment, #empty-state-outline, #empty-state-collab, .zc-notifi-pane .zc-empty-state").removeClass("zc-hide");
			},100);
		}

		/* SHOW NO CO-DEVELOPERS ( WHILE REMOVE CO-DEVELOPERS) */
		else if (queries.page == "noDevelopers") {
			$(".ui-zcollaborator-list, #collab-more-btn").hide();
			setTimeout(function() {
				$("#empty-state-nocollab").css("display","block");
			},200);
		} 

		/* SHOW EMPTY CHAT MESSAGE */
		else if (queries.page == "noMessage") {
			$("#chat, #collab-more-btn").hide();
			setTimeout(function() {
				$(".zcollab-emptystate").css("display","block");
			},200);
		}  

		/* SHOW READ ONLY VIEW*/
		else if (queries.page == "readonly") {
			setTimeout(function() {
				$(".ide-rw-view").addClass("zc-hide");
				$(".ide-ro-view").removeClass("zc-hide");
			},100);
		}

		/* New User Empty VIEW */
		else if (queries.page == "emptyViewNewUser") {
			setTimeout(function() {
				$("#ide-tab-sortable .ide-tab").hide();
				$("#gettingStarted-tab").css("display", "inline-block");
				$("#ide-tab-sortable").addClass("newUserView");
			},100);
		}

		/* Second Time User Empty VIEW */
		else if (queries.page == "emptyView") {
			setTimeout(function() {
				$("#ide-tab-sortable .ide-tab").hide();
				$("#application-tab").css("display", "inline-block");
				$("#application-tab").addClass("tab-active");
				$(".zc-editorTabContent").addClass("zc-hide");
				$("#zc-code-editor").removeClass("zc-hide");
				$("#ide-tab-sortable").addClass("ideUser");
			},100);
		}


		/* PUSH CHANGES */
		else if(queries.page == "fileUpdate"){
			setTimeout(function() {
				$("#PushButton").prop("id", "pushFilesIssues");
				$("#PullButton").prop("id", "pullFilesSuccess");
			},100);
		}


		/* PULL ERROR */
		else if(queries.page == "fileConflict"){
			setTimeout(function() {
				$("#PushButton").prop("id", "pushFilesIssues");
				$("#pullChanges-btn").prop("id", "pullChangesError");
				$("#PullButton").prop("id", "pullFilesError");
			},100);
		}

		/* DARK THEME */
		else if(queries.page == "darkTheme"){
			$("#zc-ide").addClass("zc-darkTheme");
			var editor = ace.edit("editor");
			editor.setTheme("ace/theme/tomorrow_night_bright");
			$("#ide-tab-sortable li").removeClass("tab-active");
			$("#ide-tab-sortable li").removeClass('zc-noTabSeparator');
			$("#application-tab").addClass("tab-active");
			$("#application-tab").prevAll(':visible:first').addClass('zc-noTabSeparator');
			$("#zc-readme-container").addClass("zc-hide");
			$("#zc-code-editor").removeClass("zc-hide");
			$("#gettingStarted-tab, #imgPreview-tab, #fontFile-tab").css("display", "none");
			$(".cmt-list").append('<span class="zc-cmtStatus"></span>');
			$(".cmt-list").find('.zc-cmtStatus').attr("title", "Mark as Read");
			$(".cmt-unread").find('.zc-cmtStatus').attr("title", "Mark as Unread");
		}
		
		/* DARK THEME + EDITOR PREFERENCE OPTIONS */
		else if(queries.page == "preferenceOption1"){
			$("#zc-ide").addClass("zc-darkTheme");
			var editor = ace.edit("editor");
			editor.setTheme("ace/theme/tomorrow_night_bright");
			$("#ide-tab-sortable li").removeClass("tab-active");
			$("#ide-tab-sortable li").removeClass('zc-noTabSeparator');
			$("#application-tab").addClass("tab-active");
			$("#application-tab").prevAll(':visible:first').addClass('zc-noTabSeparator');
			$("#zc-readme-container").addClass("zc-hide");
			$("#zc-code-editor").removeClass("zc-hide");
			$("#gettingStarted-tab, #imgPreview-tab, #fontFile-tab").css("display", "none");
			
			$("#zc-editorCancelBtn, #zc-editorPrefApplyBtn, #zc-editorPrefResetBtn").remove();
			$("#close-editorPref-dialog").attr("id", "close-editorPref-dialog-1");
			$("#ide-editorPrefDialog .zc-dialog-actions").append('<button id="zc-editorPrefApplyCloseBtn" class="zc-btn zc-gradient">Apply & Close</button>');
			$("#ide-editorPrefDialog .zc-dialog-actions").append('<button id="zc-editorApplyonlyBtn-1" class="zc-btn zc-gradient">Apply</button>');
			$("#ide-editorPrefDialog .zc-dialog-actions").append('<button id="zc-editorCancelBtn-1" class="zc-btn zc-secondary">Cancel</button>');
			$("#ide-editorPrefDialog .zc-dialog-actions").append('<button id="zc-editorPrefResetBtn-1" class="zc-btn zc-fright">Reset to Default</button>');
			$("#ide-editorPrefDialog .zc-dialog-actions").hide();
			$(".zc-editorPref-dialog .zc-dialog-content").css("bottom","0");
		}
		
		else if(queries.page == "preferenceOption2"){
			$("#zc-ide").addClass("zc-darkTheme");
			var editor = ace.edit("editor");
			editor.setTheme("ace/theme/tomorrow_night_bright");
			$("#ide-tab-sortable li").removeClass("tab-active");
			$("#ide-tab-sortable li").removeClass('zc-noTabSeparator');
			$("#application-tab").addClass("tab-active");
			$("#application-tab").prevAll(':visible:first').addClass('zc-noTabSeparator');
			$("#zc-readme-container").addClass("zc-hide");
			$("#zc-code-editor").removeClass("zc-hide");
			$("#gettingStarted-tab, #imgPreview-tab, #fontFile-tab").css("display", "none");
			$("#zc-editorCancelBtn").remove();
			$("#zc-editorPrefApplyBtn").empty().append('OK');
			$("#ide-editorPrefDialog .zc-dialog-actions").append('<button id="zc-editorCancelBtn-2" class="zc-btn zc-secondary">Cancel</button>');
			$("#close-editorPref-dialog").attr("id", "close-editorPref-dialog-2");
		}
		
		/* SOLARIZED THEME */
		else if(queries.page == "solarized"){
			$("#zc-ide").addClass("zc-solarized");
			var editor = ace.edit("editor");
			editor.setTheme("ace/theme/solarized_dark");
			$("#ide-tab-sortable li").removeClass("tab-active");
			$("#ide-tab-sortable li").removeClass('zc-noTabSeparator');
			$("#application-tab").addClass("tab-active");
			$("#application-tab").prevAll(':visible:first').addClass('zc-noTabSeparator');
			$("#zc-readme-container").addClass("zc-hide");
			$("#zc-code-editor").removeClass("zc-hide");
			$("#gettingStarted-tab, #imgPreview-tab, #fontFile-tab").css("display", "none");
		}
		
		/* GREY THEME */
		else if(queries.page == "greyTheme" || getThemeParam == "greyTheme" ){
			$("#zc-ide").addClass("zc-greyTheme");
			
// 			var editor = ace.edit("editor");
// 			editor.setTheme("ace/theme/idle_fingers");
// 			editor.setTheme("ace/theme/tomorrow_night_bright");
			
			$("#zc-editorThemeBtns .zc-themeBox").removeClass("selected");
			$("#zc-darkThemeBtn").trigger("click");
			$("#zc-darkThemeBtn").addClass("selected");
			$("#ide-tab-sortable li").removeClass("tab-active");
			$("#ide-tab-sortable li").removeClass('zc-noTabSeparator');
			$("#application-tab").addClass("tab-active");
			$("#application-tab").prevAll(':visible:first').addClass('zc-noTabSeparator');
			$("#zc-readme-container").addClass("zc-hide");
			$("#zc-code-editor").removeClass("zc-hide");
			$("#gettingStarted-tab, #imgPreview-tab, #fontFile-tab").css("display", "none");
			$(".cmt-list").append('<span class="zc-cmtStatus"></span>');
			$(".cmt-list").find('.zc-cmtStatus').attr("title", "Mark as Read");
			$(".cmt-unread").find('.zc-cmtStatus').attr("title", "Mark as Unread");
		}

		/* ELSE SHOW */
		else  {

		}

	});