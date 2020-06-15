var removeFromLauncher, addToLauncherMenu, panelRightContextMenu, panelLeftContextMenu, panelBottomContextMenu, getDataTabId;
$(document).ready(function (){  

	var windowWidth = $(window).width(),
		windowHeight = $(window).height(),
		getHalfWidth = -(windowWidth/2),
		getHalfHeight = -(windowHeight/2);


	/*---------   MENU ACTION FUNCTION  --------- */
	var more_action = function(_this, menuId, event) {
		event.stopPropagation();

		$(".zc-user-account").css({"opacity":"0", "margin-top":"0px", "visibility":"hidden"}); 

		$(".zc-menu").each(function(index, menu){
			$(menu).zmenu('hide');
		}); 

		$(menuId).zmenu('show',{'target':_this});
		var getOffsetleft = $(menuId).offset().left,
			getOffsetleft = getOffsetleft- 100,
			getOffsetTop  = $(menuId).offset().top;
		$(menuId).css({"top":getOffsetTop, "opacity":"1", "margin-top":"5px"}); 

		$(".zc-more, .zc-btn").removeClass("active");
		$(".zc-more, .zc-btn").removeClass("active");
		_this.addClass("active");
		$("#ide-toolbar-actions").addClass("hover-activated"); 
	}


	/*------------ Toggle Menu bar -------------*/

	$("#zc-hideMenubar").on("click", function() {
		$('body').toggleClass("zc-hideMenubar");
		if($("body").hasClass('zc-hideMenubar')) {
			$("#zc-hideMenubar").attr("title", "Show Menu Bar");
		} else {
			$("#zc-hideMenubar").attr("title", "Hide Menu Bar");
			$("body").removeClass("zc-toggleNoToolbar");
		}
	});

	$("body").on("mousemove", function(e){
		var parentOffset = $(this).parent().offset(); 
		var relY = e.pageY - parentOffset.top;
		if(!($("body").hasClass('zc-distractFree'))) {
			if(!($("body").hasClass('zc-hideToolbar'))) {

				if(relY <= 10) {
					$("body").addClass("zc-toggleMenubar");
				} 

				if(relY >= 100) {

					if((!($(".zmenubar__item").hasClass('is-selected'))) && (!($(".ide-menu .zc-btn").hasClass('active'))) && (!($(".zc-profileMenu").hasClass('zc-showProfileMenu')))) {
						$("body").removeClass("zc-toggleMenubar");
					}
				}
			}
			else if($("body").hasClass('zc-hideMenubar'))  {
				if(relY <= 10) {
					$("body").removeClass("zc-toggleMenubar");
					$("body").addClass("zc-toggleNoToolbar");
				} 

				if(relY >= 100) {
					if((!($(".zmenubar__item").hasClass('is-selected'))) && (!($(".ide-menu .zc-btn").hasClass('active'))) && (!($(".zc-profileMenu").hasClass('zc-showProfileMenu')))) {
						$("body").removeClass("zc-toggleMenubar");
						$("body").removeClass("zc-toggleNoToolbar");
					} 
				}
			}
		}

		//	$("body").addClass("zc-toggleMenubar");
	});




	/* ---------  FOLDER TREE TOGGLE  -----------*/  
	$(document).on("click", "#toggle-foldertree", function() {
		$(".zc-ideContainer").toggleClass("hide-left-pane"); 
		$(this).toggleClass("active");
		$(this).blur();
		var triggerInMenu = $("#showFolderTree");
		triggerInMenu.toggleClass("hideTree");
		if(triggerInMenu.hasClass("hideTree")) {
			triggerInMenu.find('.zmenu__text').empty().append('Show Explorer');
			$(this).find("span").attr("title", "Show Explorer");
		} else {
			triggerInMenu.find('.zmenu__text').empty().append('Hide Explorer');
			$(this).find("span").attr("title", "Hide Explorer");
		}
	});





	/* ---------  CUSTOM PANE ( CO-DEVELOPERS, OUTLINE, COMMENTS, DEBUGGER ) SHOW AND HIDE FUNCTION  -----------*/  
	var customPane = function(getPaneId, getCurrentTab) {

		if($(".zc-ideContainer").hasClass("show-collab-pane")){
			$(".pane-content").css({"left":"0", "display":"none"});
			getPaneId.css({"left":"-420px", "display":"block"});
		} else {

			$(".pane-content").css({"left":"0", "display":"none"});
			getPaneId.css("display","block");
			setTimeout(function() {
				$(".zc-ideContainer").addClass("show-collab-pane");
				getPaneId.css("left","-420px");
			}, 100);
		}

		if(getCurrentTab.hasClass('active')){
			$(".pane-content").css({"left":"0"}); 
			setTimeout(function() {
				$(".pane-content").css({"display":"none"});
			}, 300);
			$(".zc-ideContainer").removeClass("show-collab-pane"); 
			getCurrentTab.removeClass('active');
			getCurrentTab.prev().removeClass("active-before");
			getCurrentTab.next().removeClass("active-after");

		} else {
			$("#custom-pane ul li").removeClass("active active-before active-after");
			getCurrentTab.addClass('active');
			getCurrentTab.prev().addClass("active-before");
			getCurrentTab.next().addClass("active-after");

		}

	}

	/*
	$("#custom-pane ul li").on('click', function() {
		var _this = $(this);
		$("#toggle-collab").find("a").attr("title","Co-developers");
		$("#custom-comments").find("a").attr("title","Comments");
		$("#custom-outline").find("a").attr("title","Outline");
		$("#custom-debug").find("a").attr("title","Debugger");

		if(_this.is("#toggle-collab")){
			var setPaneId = $("#co-developer-pane");
			customPane(setPaneId, _this);
			if(_this.hasClass("active")){
				_this.find("a").attr("title","Close");
			} else {
				_this.find("a").attr("title","Co-developers");
			}

		}

		else if(_this.is("#custom-comments")){
			var setPaneId = $("#comment-pane");
			customPane(setPaneId, _this);
			setTimeout(function() {
				$("#custom-comments").find(".zc-notifiy-circle").remove();
			}, 800);
			if(_this.hasClass("active")){
				_this.find("a").attr("title","Close");
				$(".ide-tab-wrap .ide-tab").removeClass("tab-active");
				$("#comment-tab").addClass("tab-active");
				$(".zc-editorTabContent").addClass("zc-hide");
				$("#commentEditor-template").removeClass("zc-hide");
				setTimeout(function() {
					$(".zc-cmt-feed, .cmt-pane-action").removeClass("zc-hide");
				},200);
			} else {
				_this.find("a").attr("title","Comments");
			}

		}

		else if(_this.is("#custom-outline")){
			var setPaneId = $("#outline-pane");
			customPane(setPaneId, _this);
			if(_this.hasClass("active")){
				_this.find("a").attr("title","Close");
			} else {
				_this.find("a").attr("title","Outline");
			}
		} 

		else if(_this.is("#custom-debug")){
			var setPaneId = $("#debug-pane");
			customPane(setPaneId, _this);
			if(_this.hasClass("active")){
				_this.find("a").attr("title","Close");
			} else {
				_this.find("a").attr("title","Debugger");
			}
		}

		else if(_this.is("#custom-search")){
			var setPaneId = $("#search-pane");
			customPane(setPaneId, _this);
			setTimeout(function() {
				$("#my-content-search-right").focus();
			}, 200);
			if(_this.hasClass("active")){
				_this.find("a").attr("title","Close");
			} else {
				_this.find("a").attr("title","Content Search");
			}

		}

		else if(_this.is("#findFilesResult")){
			var setPaneId = $("#findResult-pane");
			customPane(setPaneId, _this);
			if(_this.hasClass("active")){
				_this.find("a").attr("title","Close");
			} else {
				_this.find("a").attr("title","Search Results");
			}

		}

	});

*/

	/*-- Console Pane --*/  

	var consoletabSelect = function(currentTab) {
		var getCurrentTabContent = currentTab.attr("id");
		$("#consolePane-tabs .ide-tab").removeClass("tab-active");
		$("#consolePane-tabs .ide-tab").removeClass('zc-noTabSeparator');
		currentTab.addClass("tab-active");
		currentTab.prevAll(':visible:first').addClass('zc-noTabSeparator');
		$("#console-tabContents .console-tabContent").addClass("zc-hide");
		$("#console-tabContents .console-tabContent[data-id ="+getCurrentTabContent+"]").removeClass("zc-hide");
	}

	$(document).on("click", "#consolePane-tabs .ide-tab", function(event){
		var target = $(event.target),
			_this = $(this);
		if((!target.closest(".tab-close").length)) {
			consoletabSelect(_this);
		}
	});

	var consoleTabClose = function(_this) {
		var getParentId = _this.parent('.ide-tab').attr('id'),
			getParentId = $.trim(getParentId),
			getTabCount = $("#consolePane-tabs .ide-tab:visible").length;
		if((getTabCount > 1)) {
			$("#consolePane-tabs").removeClass("zc-hide");
         $('.zc-consoleHeader').removeClass('zc-hide');
			$("#consolePane-tabs .ide-tab").removeClass("tab-active");
			if(_this.parent('.ide-tab').next().is('.ide-tab:visible')) {
				_this.parent('.ide-tab').next('.ide-tab').addClass("tab-active");
			} 
			else if(_this.parent('.ide-tab').prev().is('.ide-tab:visible'))  {
				_this.parent('.ide-tab').prev('.ide-tab').addClass("tab-active");

			} else {
				_this.parent('.ide-tab').prevUntil(':visible').prev('.ide-tab').addClass("tab-active");
			}
			_this.parent('.ide-tab').addClass("zc-hide");

			var getcurrentActiveTab =  $('#consolePane-tabs .tab-active').attr('id'),
				getcurrentActiveTab = $.trim(getcurrentActiveTab);
			$("#console-tabContents .console-tabContent").addClass("zc-hide");
			$("#console-tabContents .console-tabContent[data-id ="+getcurrentActiveTab+"]").removeClass("zc-hide");

		} else {
			$("#consolePane-tabs .ide-tab").addClass("zc-hide");
			$(".console-tabContent").addClass("zc-hide");
			$('.zc-consoleHeader').addClass('zc-hide');
		} 

	}

	$(document).on("click", "#consolePane-tabs .ide-tab .tab-close", function(event){
		event.stopPropagation();
		consoleTabClose ($(this));
	});


	$('#close-bottom-pane').on("click", function() {
		$(".zc-ideContainer").removeClass("show-bottom-pane minimize-bottom-pane minimize-cs-pane");
		$("#minimize-cs-pane").toggleClass("zc-minimize");
	});

	$("#minimize-bottom-pane").on("click", function() {
		$(this).blur();
		if($(".zc-ideContainer").hasClass("show-cs-pane")) {
			$(".zc-ideContainer").toggleClass("minimize-cs-pane"); 
			$("#minimize-cs-pane").toggleClass("zc-minimize");
		}
		$(".zc-ideContainer").toggleClass("minimize-bottom-pane");
		$(this).toggleClass("zc-minimize");
	});

	/* CONSOLE PLAY AND STOP BUTTON */

	$(".stop-process").on("click", ".toggle-stop", function(){
		$("#ide-play-stop").removeClass("toggle-stop");		
		$("#ide-play-stop").addClass("toggle-play");	
		$("#ide-play-stop").empty().append('<i class="icon"> <span class="play-icon"> </span> </i> Run');
	});

	$(".stop-process").on("click", ".toggle-play", function(){
		$("#ide-play-stop").removeClass("toggle-play");		
		$("#ide-play-stop").addClass("toggle-stop");	
		$("#ide-play-stop").empty().append('<i class="icon-10"> <span class="stop-icon"> </span> </i> Stop');
	});





	/* ---------  Terminal Pane TOGGLE  -----------*/  
	var tabCount = 1;
	$('#close-terminal').on("click", function() {
		$(".zc-ideContainer").removeClass("show-terminal-pane resize-terminal-pane minimize-terminal-pane"); 
		$(".terminal-tabs .terminal-tab").remove();
		$(".terminal-tabs .more-tab").remove();
		$("#more-terminal ul li").remove();
		$("#terminal-pane").css({"width":"670px", "height":"500px"});
		tabCount=1;
	});

	$('#resize-terminal').on("click", function() {
		$(this).blur();
		$(".zc-ideContainer").toggleClass("resize-terminal-pane"); 
		if($(".zc-ideContainer").hasClass('minimize-terminal-pane')) {
			$(".zc-ideContainer").removeClass('minimize-terminal-pane');
		} 
		$(this).toggleClass("terminal-resize");

		if($(this).hasClass("terminal-resize")) {
			$(".zc-ideContainer").addClass("resize-terminal-pane"); 
			$('.resize-terminal-pane .terminal-pane').css({'width': windowWidth, 'height': windowHeight, 'margin-left': getHalfWidth, 'margin-top': getHalfHeight});
			$('#minimize-terminal').prop('title', 'Minimize');
			$('#resize-terminal').prop('title', 'Exit Full Screen');	
		} else {
			$(".zc-ideContainer").removeClass("resize-terminal-pane"); 
			$('.terminal-pane').css({'width': '670px', 'height': '500px', 'margin': '0'});
			$('#minimize-terminal').prop('title', 'Minimize');
			$('#resize-terminal').prop('title', 'Full Screen');
		}

	});

	$('#minimize-terminal, .terminal-title').on("click", function() {
		$(this).blur();
		$(".zc-ideContainer").toggleClass("minimize-terminal-pane"); 
		$(".zc-ideContainer").removeClass('resize-terminal-pane');
		if($('#resize-terminal').hasClass("terminal-resize")) {
			$(".zc-ideContainer").addClass('resize-terminal-pane');
			$('.resize-terminal-pane .terminal-pane').css({'width': windowWidth, 'height': windowHeight, 'margin-left': getHalfWidth, 'margin-top': getHalfHeight});
			$('#minimize-terminal').prop('title', 'Minimize');
		}  else {
			$(".zc-ideContainer").removeClass('resize-terminal-pane');
			$('.terminal-pane').css({'width': '670px', 'height': '500px', 'margin': '0'});
			$('#minimize-terminal').prop('title', 'Minimize');
		}
		if($('.zc-ideContainer').hasClass("minimize-terminal-pane")) {
			$('#minimize-terminal').prop('title', 'Maximize');
			$(".zc-ideContainer").removeClass('resize-terminal-pane');
			$('.terminal-pane').css({'width': '300px', 'height': '28px', 'margin': '0'});
		} 

	});

	/* TERMINAL TABS INTERACTION */

	$("#add-new-terminal").on("click", function() {
		var getOuterWidth = $("#zc-terminal-template .terminal-title-bar").width(),
			getOuterWidth = getOuterWidth - 100;
		var getTabcount  =  $("#zc-terminal-template .terminal-tabs").width();
		var getMorecount =  $(".more-tab").length;

		if(getTabcount >= getOuterWidth) {
			if(getMorecount == 0) {
				$(".terminal-tabs").append('<button  data-menu-id="ide-moreTerminal" data-active-class="active" class="zc-btn zc-btn-small icon more-tab" title="More"><i class="icon-12"> <svg class="zc-black"> <use xlink:href="#svg-verticalMore-icon"> </use> </svg> </i></button>');
			}
			$("#ide-moreTerminal").zmenu("addMenuItem",{"label":"Terminal-"+ tabCount +""});

		} else {
			$(".terminal-tabs").append('<span class="terminal-tab"><span class="tab-text"> Terminal-'+ tabCount +' </span>  <span id="terminal-close" class="tab-close"><i  title="Close" class="icon-9"><svg class="zc-grey"> <use xlink:href="#svg-close-icon"> </use> </svg>  </i>  </span>');
			$('.terminal-tab').removeClass('active');
			$(".terminal-tabs .terminal-tab:last-child").addClass('active');
		}
		tabCount++;
	});

	$("#zc-addTerminalTab").on("click", function() {
		$(".terminal-title-bar").removeClass("zc-hideTitleBar");
		$("#terminal-tab").addClass("zc-hasTerminalTab");
		$(this).hide();
		$("#add-new-terminal").trigger("click");
	});

	$(".terminal-tabs").on("click", ".terminal-tab", function() {
		$('.terminal-tab').removeClass('active');
		$(this).addClass("active");
	});

	$("#ide-moreTerminal").on("click", "li", function() {
		var getTabtext = $(this).find(".zmenu__text").text();
		var getLastTabText = $('.terminal-tabs .active').find('.tab-text').text();
		var getCurrentText = $(this).text();
		$(this).remove();	

		setTimeout(function() {
			$(".terminal-tabs .terminal-tab:last").remove();
			$('<span class="terminal-tab active dynamic-tab"><span class="tab-text">' + getTabtext + '</span>  <span id="terminal-close" class="tab-close"><i title="Close" class="icon-9 dynamic"><svg class="zc-grey"> <use xlink:href="#svg-close-icon"> </use> </svg>  </i></span>').insertBefore('.terminal-tabs .more-tab');
			$("#ide-moreTerminal").zmenu("addMenuItem",{"label":getLastTabText});
		},150);
	});

	$(".terminal-tabs").on("click", "#terminal-more-tab", function(event) {
		event.preventDefault();
		event.stopPropagation();
		$("#more-terminal").fadeIn();
		$(this).addClass("active");
	});

	/* REMOVE TERMINAL TAB */

	$(".terminal-tabs").on ("click", "#terminal-close", function(event) {
		event.preventDefault();
		event.stopPropagation();
		//FIND TOTAL TAB LENGTH
		var getTabCount = $(".terminal-tabs .terminal-tab").length,
			getMoreTabcount =  $(".terminal-more-list ul li").length,
			totalTabCount = getTabCount + getMoreTabcount;
		var getListFirstTabText = $('#more-terminal ul li:first-child').find('.tab-text').text();

		//
		if(getTabCount <= 4) {
			if (getMoreTabcount > 1){
				$('<span class="terminal-tab"><span class="tab-text"> '+getListFirstTabText+'</span>  <span class="tab-close" id="terminal-close"> <i  title="Close" class="icon-9"><svg class="zc-grey"> <use xlink:href="#svg-close-icon"> </use> </svg>  </i></span>').insertBefore('.terminal-tabs .more-tab');
				$('.terminal-more-list ul li').first().remove();
			}  else if(getMoreTabcount == 1) {
				$('<span class="terminal-tab"> <span class="tab-text"> '+getListFirstTabText+' </span>  <span id="terminal-close" class="tab-close"> <i  title="Close" class="icon-9"><svg class="zc-grey"> <use xlink:href="#svg-close-icon"> </use> </svg>  </i></span>').insertBefore('.terminal-tabs .more-tab');
				$("#terminal-more-tab").remove();
				$('.terminal-more-list ul').empty();
				$("#more-terminal").hide();

			}
		}

		if(getTabCount <= 1){
			$(".zc-ideContainer").removeClass("show-terminal-pane resize-terminal-pane minimize-terminal-pane"); 
			$(".terminal-tabs .terminal-tab").remove();
			$(".terminal-tabs .more-tab").remove();
			$("#more-terminal ul li").remove();
			$("#zc-addTerminalTab").show();
			$(".terminal-title-bar").addClass("zc-hideTitleBar");
			$("#terminal-tab").removeClass("zc-hasTerminalTab");
			tabCount=1;
		} 	else if(getTabCount >= 1){
			$('.terminal-tab').removeClass('active');
			if(totalTabCount <= 4) {
				$(this).parent(".terminal-tab").prev(".terminal-tab").addClass("active");
			} else {
				$(this).parent(".terminal-tab").next(".terminal-tab").addClass("active");
			}

		}

		$(this).parent(".terminal-tab").remove();


	});

	$(".right-pane, .left-pane, .header").on("click", function() {
		if($(".zc-ideContainer").hasClass("show-terminal-pane")) {
			$(".zc-ideContainer").addClass("minimize-terminal-pane");
			$('.terminal-pane').css({'width': '300px', 'height': '28px', 'margin': '0'});
		}
	});

	/* ---------  OPEN FILE TAB SORTING  --------- */
	$( "#ide-tab-sortable" ).sortable({
	   scroll:false,
	   appendTo: document.body,   
	   zIndex: 10000,
	   helper: 'clone',
	   placeholder: "sortable-placeholder",
	   cursor: "grabbing",
	   cursorAt: { top: 28 },
	    sort: function(e) {
      if((window.innerHeight/2) < e.pageY){
       
      }
    }
	});

	/* ---------  EDITOR HIDE DEFAULT BROWSER CONTEXTUAL MENU  --------- */
	$('#folder-explorer, #editor, .ide-tab').bind('contextmenu', function(e) {
		return false;
	}); 

	/* ---------  EDITOR RIGHT CLICK CONTEXTUAL MENU  --------- */
	//    $("#zc-code-editor").bind('contextmenu',function(event){
	//      event.preventDefault();
	//      $(".zc-menu").each(function(index, menu){
	//        $(menu).zmenu('hide');
	//      });
	//      $("#ide-run").zmenu('show',{"target":$(this),"position":"after-pointer","event":event});
	//    });

	//    /* ---------  FOLDER RIGHT CLICK CONTEXTUAL MENU  --------- */
	//    $("#folder-explorer").bind('contextmenu',function(event){
	//      event.preventDefault();
	//      $(".zc-menu").each(function(index, menu){
	//        $(menu).zmenu('hide');
	//      });
	//      $("#ide-share").zmenu('show',{"target":$(this),"position":"after-pointer","event":event});
	//    });

	/* ---------  USER PROFILE MENU  --------- */
	$(".ide-user-info").on("click", function (event) {
		event.stopPropagation();
		event.preventDefault();
		$(".ide-user-account").toggleClass("shrink");
	})

	$("#zc-user-menu").on("click", function (event) {
		event.stopPropagation();
		event.preventDefault();
		$('.zmenu').hide();
		$(".zc-profileMenu").toggleClass("zc-showProfileMenu");
		$('.zc-profileOverlay').toggleClass("zc-showProfileOverlay");
	});

	$(".zc-profileOverlay").on("click", function(){
		$(".zc-profileMenu").toggleClass("zc-showProfileMenu");
		$('.zc-profileOverlay').toggleClass("zc-showProfileOverlay");
	});

	$(document).on("click", "#ide-profileClose-tab, #tourStart", function(){
		$(".zc-profileMenu").toggleClass("zc-showProfileMenu");
		$('.zc-profileOverlay').toggleClass("zc-showProfileOverlay");
		
	});
	
	$("#tourStart").on("mousedown", function(){
        console.log("started");
        $("#menubar").css("width", "400px");
	});
	
	
	                 
	
	$(document).on("click", ".zc-setting-info #my-portals", function(event){
		event.stopPropagation();
		event.preventDefault();
		$(".zc-user-menu").addClass('show-sub-nav');
	});

	$(".zc-user-subnav .menu-header").on("click", function(event){
		event.stopPropagation();
		event.preventDefault();
	});

	$("#back-to-info .zc-list-icon").on("click", function(event){
		event.stopPropagation();
		event.preventDefault();
		$(".zc-user-menu").removeClass('show-sub-nav');
	});

	$(".zc-user-subnav").on("click", 'li:not("#back-to-info")', function(){
		$(".zc-user-subnav li").find('.zc-list-icon').removeClass('zc-tick-icon');
		$(this).find('.zc-list-icon').addClass('zc-tick-icon');
	});

	//	$('#useraccount-help-icon').mouseenter( function() {
	//		var useraccountHelp  = $('#useraccount-help-icon').offset(),
	//			useraccountHelpTop = useraccountHelp.top,
	//			useraccountHelpLeft = useraccountHelp.left;  
	//		$("#zc-useraccount-help").delay(100).stop(true, false).fadeIn();
	//		$("#zc-useraccount-help").css({'top':useraccountHelpTop+25, 'left':useraccountHelpLeft-220});
	//	}).mouseleave(function() {
	//		$("#zc-useraccount-help").delay(100).stop(true, false).fadeOut('fast');
	//	});


	//APPEND CHOOSEN SELECT ARROW 
	$(".chosen-container-single .chosen-single div b").append('<svg> <use xlink:href="#svg-selectarrow-icon"> </use> </svg>');

	//------------------------- NOTIFICATION ---------------------------//
	$(".zc-notifi-pane .zc-notifyItem").on("click", function(){
		$(this).removeClass("notify-unread");
	});

	//------------------------- EDIT PREVIEW URL ---------------------------//

	$("#zc-nice-url").on("click", function() {
		$("#edit-url-help").addClass("zc-hide");
		$(".edit-preview-url").removeClass("zc-hide");
	});

	$("#zc-updatepre-share").on("click", function() {
		var getInputlink = $(".preview-link-wrap  #zc-link").val();
		$(".edit-preview-url").addClass("zc-hide");
		$(".updated-url").removeClass("zc-hide");
		$(".updated-url").append('Your nice URL	<span class="zc-font-bold"> '+getInputlink+'.code.zoholabs.com  </span> updated successfully.');
	});

	$("#zc-cancelpre-share").on("click", function() {
		$("#edit-url-help").removeClass("zc-hide");
		$(".edit-preview-url").addClass("zc-hide");
	});

	$(".dismiss-bar").on("click", function() {
		$(".zc-announcement-bar").addClass("zc-hide");
	});




	//-------------------------------- DIALOG OF IDE -------------------------//

	//    $("#zc-ide").on("click", "#hide-user-presence", function() {
	//      $(".user-presence-wrap").toggle();
	//      $("#hide-user-presence").toggleClass('show-user');
	//      if($(this).hasClass("show-user")){
	//        $("#hide-user-presence .zmenu__text").empty().append("Show User Presence");
	//      } else {
	//        $("#hide-user-presence .zmenu__text").empty().append("Hide User Presence");
	//      }
	//    });



	//---------------------------------------------------------------------------------//


	//---------------------------------------------------------------------------------//

	//
	//	var show_dialog = function(getdialogId) {
	//		if(getdialogId.is("#zc-project-share")) {
	//			$("#zc-overlay-white").addClass("show-dialog");
	//		} else {
	//			$("#zc-overlay-black").addClass("show-dialog");
	//		} 
	//		getdialogId.addClass("show-dialog");
	//	}

	//	var hide_dialog  = function() {
	//		$(".zc-overlay").removeClass("show-dialog")
	//		$(".zc-dialog").removeClass("show-dialog");
	//	}





	/*------------------------------------------------------------------------------------------------------------------
											  CONTEXTUAL MENU 
						  ---------------------------------------------------------------------------------------------------------------------*/ 	


	$(".fancytree-folder").on("contextmenu",function(event){
		event.preventDefault();
		$(".zmenu").zmenu("hide");
		var getParent = $(this).parent("li").attr("id");
		if(getParent == "projExp__5") {
			$("#contextLibrary").zmenu({
				 appendTo: ".zc-ideContainer"
			});
			$("#contextLibrary").zmenu("show",{"event":event});
		} else {
			$("#contextMenuFolder").zmenu({
				appendTo: ".zc-ideContainer"
			});
			$("#contextMenuFolder").zmenu("show",{"event":event});
		}
	});


	$(".fancytree-folder.fancytree-level-1").on("contextmenu",function(event){
		event.preventDefault();
		$(".zmenu").zmenu("hide");
		$("#projectcontextMenu").zmenu({
			 appendTo: ".zc-ideContainer"
		});
		$("#projectcontextMenu").zmenu("show",{"event":event});
	});


	$(".fancytree-ico-c").on("contextmenu",function(event){
		event.preventDefault();
		$(".zmenu").zmenu("hide"); 
		$("#contextMenuContent").zmenu({
			 appendTo: ".zc-ideContainer"
		});
		$("#contextMenuContent").zmenu("show",{"event":event});
	});

	$("#editor,#htmlEditor,#cssEditor,#javaEditor").on("contextmenu",function(event){
		event.preventDefault();
		var selectionRange = editor.getSelectionRange(); 
		var startLine = selectionRange.start.row;
		var endLine = selectionRange.end.row;
		var content = editor.session.getTextRange(selectionRange);
		$(".zmenu").zmenu("hide");
		if((content == "") || (content == null)) {
			$("#contexteditorMenu").zmenu({
				appendTo: ".zc-ideContainer"
			});
			$("#contexteditorMenu").zmenu("show",{"event":event});
		} else {
			$("#contexteditorSelectMenu").zmenu({
				appendTo: "body"
			});
			$("#contexteditorSelectMenu").zmenu("show",{"event":event});
		}
		
		return false;

	});


	//      $("#folder-explorer, #editor, .fancytree-ico-c, .fancytree-folder, .fancytree-folder.fancytree-level-1").on("click",function(event){
	//        event.preventDefault();
	//        $(".zmenu").zmenu("hide");
	//      });


	$("#ide-tab-sortable .ide-tab").on("contextmenu",function(event){
		event.preventDefault();
		$(".zmenu").zmenu("hide");
		$("#contexttabMenu").zmenu();
		$("#contexttabMenu").zmenu("show",{"event":event});
	});
	  
	  
/*	panelRightContextMenu = function() {
    $(".zc-panelRight .zc-tab").on("contextmenu", function(event){
  		event.preventDefault();
  		event.stopPropagation();
  		
  		 $(".zc-panel").removeClass("zc-currentPanel");
       $(this).parent(".zc-tabs").parent('.zc-panel').addClass("zc-currentPanel");
  		
  		$(".zc-panel .zc-tabs .zc-tab").removeClass("currentTabLauncher");
		  $(this).addClass("currentTabLauncher");
  		
  		if($(this).hasClass("zc-keepLauncherStatus")) {
    		 $(".zc-rightPanelAddTo").css("display","block");
    		 $(".zc-rightPanelRemoveFrom").css("display","none");
  		} else {
  		   $(".zc-rightPanelRemoveFrom").css("display","block");
  		   $(".zc-rightPanelAddTo").css("display","none");
  		}
  		
  		$(".zmenu").zmenu("hide");
  		$("#ide-RightMoveToMenu").zmenu();
  		$("#ide-RightMoveToMenu").zmenu("show",{"event":event});
  	});
	
	}
	
	panelRightContextMenu();*/
	
/*	panelLeftContextMenu = function() {
  	$(".zc-panelLeft .zc-tab").on("contextmenu", function(event){
  		event.preventDefault();
  		event.stopPropagation();
  		
  		 $(".zc-panel").removeClass("zc-currentPanel");
       $(this).parent(".zc-tabs").parent('.zc-panel').addClass("zc-currentPanel");
  		
  		$(".zc-panel .zc-tabs .zc-tab").removeClass("currentTabLauncher");
		  $(this).addClass("currentTabLauncher");
  		
  		if($(this).hasClass("zc-keepLauncherStatus")) {
    		 $(".zc-leftPanelAddTo").css("display","block");
    		 $(".zc-leftPanelRemoveFrom").css("display","none");
  		} else {
  		   $(".zc-leftPanelRemoveFrom").css("display","block");
  		   $(".zc-leftPanelAddTo").css("display","none");
  		}
  		
  		$(".zmenu").zmenu("hide");
  		$("#ide-LeftMoveToMenu").zmenu();
  		$("#ide-LeftMoveToMenu").zmenu("show",{"event":event});
  	});
	}
	
	panelLeftContextMenu();*/
	
	/*panelBottomContextMenu = function() {
  	$(".zc-panelX .zc-tab").on("contextmenu", function(event){
  		event.preventDefault();
  		event.stopPropagation();
  		
  		 $(".zc-panel").removeClass("zc-currentPanel");
       $(this).parent(".zc-tabs").parent('.zc-panel').addClass("zc-currentPanel");
  		
  		$(".zc-panel .zc-tabs .zc-tab").removeClass("currentTabLauncher");
		  $(this).addClass("currentTabLauncher");
  		
  		if($(this).hasClass("zc-keepLauncherStatus")) {
    		 $(".zc-bottomPanelAddTo").css("display","block");
    		 $(".zc-bottomPanelRemoveFrom").css("display","none");
  		} else {
  		   $(".zc-bottomPanelRemoveFrom").css("display","block");
  		   $(".zc-bottomPanelAddTo").css("display","none");
  		}
  		
  		
  		$(".zmenu").zmenu("hide");
  		$("#ide-BottomMoveToMenu").zmenu();
  		$("#ide-BottomMoveToMenu").zmenu("show",{"event":event});
  	});
	}
	
  panelBottomContextMenu();
	*/
  /* RIGHT PANEL TABS CONTEXTUAL MENU */
  /*	$(".zc-panelRight .zc-tabs").on("contextmenu", function(event){
  	   event.preventDefault();
  	   event.stopPropagation();
  		
  	   $(".zc-panel").removeClass("zc-currentPanel");
       $(this).parent('.zc-panel').addClass("zc-currentPanel");
		
	   $(".zc-panel .zc-tabs").removeClass("zc-currentTabs");
	   $(this).addClass("zc-currentTabs");	
  		
  	   $(".zmenu").zmenu("hide");
  	   $("#ide-tabStyleContext").zmenu();
  	   $("#ide-tabStyleContext").zmenu("show",{"event":event});
  	});*/
	
  /* LEFT PANEL TABS CONTEXTUAL MENU */
  	/*$(".zc-panelLeft .zc-tabs").on("contextmenu", function(event){
  	   event.preventDefault();
  	   event.stopPropagation();
  		
  	   $(".zc-panel").removeClass("zc-currentPanel");
       $(this).parent('.zc-panel').addClass("zc-currentPanel");
		
	   $(".zc-panel .zc-tabs").removeClass("zc-currentTabs");
	   $(this).addClass("zc-currentTabs");	
  		
  	   $(".zmenu").zmenu("hide");
  	   $("#ide-leftTabStyleContext").zmenu();
  	   $("#ide-leftTabStyleContext").zmenu("show",{"event":event});
  	});	*/
	
	 /* BOTTOM PANEL TABS CONTEXTUAL MENU */
 /* 	$(".zc-panelX .zc-tabs").on("contextmenu", function(event){
  	   event.preventDefault();
  	   event.stopPropagation();
  		
  	   $(".zc-panel").removeClass("zc-currentPanel");
       $(this).parent('.zc-panel').addClass("zc-currentPanel");
		
	   $(".zc-panel .zc-tabs").removeClass("zc-currentTabs");
	   $(this).addClass("zc-currentTabs");	
  		
  	   $(".zmenu").zmenu("hide");
  	   $("#ide-bottomTabStyleContext").zmenu();
  	   $("#ide-bottomTabStyleContext").zmenu("show",{"event":event});
  	});	*/
  	
  	/* LEFT QUICK LAUNCHER BAR CONTENT MENU */
   $("#custom-paneLeft").on("contextmenu", function(event){
    	   event.preventDefault();
    	   event.stopPropagation();
    	   $(".zmenu").zmenu("hide");
    	   $("#ide-leftQuickLauchBar").zmenu();
    	   $("#ide-leftQuickLauchBar").zmenu("show",{"event":event});
    	});
    	
    	/* RIGHT QUICK LAUNCHER BAR CONTENT MENU */
	   $("#custom-pane").on("contextmenu", function(event){
    	   event.preventDefault();
    	   event.stopPropagation();
    	   $(".zmenu").zmenu("hide");
    	   $("#ide-rightQuickLauchBar").zmenu();
    	   $("#ide-rightQuickLauchBar").zmenu("show",{"event":event});
    	});
    	
    	/* RIGHT QUICK LAUNCHER BAR CONTENT MENU  */
     $(".zc-statusBar").on("contextmenu", function(event){
    	   event.preventDefault();
    	   event.stopPropagation();
    	   $(".zmenu").zmenu("hide");
    	   $("#ide-statusBar").zmenu();
    	   $("#ide-statusBar").zmenu("show",{"event":event});
    	});
    	
    	
  removeFromLauncherMenu = function() {
    	$(".quickAccessGroup li").not(".zc-keepLauncherStatus").on("contextmenu", function(event){
  	
  		event.preventDefault();
  		event.stopPropagation();
  		
  		// if($(this).hasClass("zc-keepLauncherStatus")) {
    // 		 $(".zc-rightPanelAddTo").css("display","block");
  		// } else {
  		//   $(".zc-rightPanelAddTo").css("display","none");
  		// }
    
  		$(".quickAccessGroup li").removeClass("currentLauncher");
		  $(this).addClass("currentLauncher");
		  
		   getDataTabId = $(".currentLauncher").attr("data-tab");
		  
  		$(".zmenu").zmenu("hide");
  		$("#ide-quickAccessContext").zmenu();
  		$("#ide-quickAccessContext").zmenu("show",{"event":event});
  		
  	});
  }
  
  removeFromLauncherMenu();

  addToLauncherMenu = function() {
    $(".quickAccessGroup li.zc-keepLauncherStatus").on("contextmenu.keepLaunch", function(event){
		event.preventDefault();
		event.stopPropagation();
		
		// 	if($(this).hasClass("zc-keepLauncherStatus")) {
  //   		 $(".zc-rightPanelAddTo").css("display","block");
  // 		} else {
  // 		   $(".zc-rightPanelAddTo").css("display","none");
  // 		}
		
	  $(".quickAccessGroup li").removeClass("currentLauncher");
		$(this).addClass("currentLauncher");
		
		getDataTabId = $(".currentLauncher").attr("data-tab");
		
  	$(".zmenu").zmenu("hide");
		$("#ide-quickAccessKeepLauncherContext").zmenu();
	  $("#ide-quickAccessKeepLauncherContext").zmenu("show",{"event":event});
	});
  }

  addToLauncherMenu();

	
	$(".zc-ideToolbar").on("contextmenu",function(event){
		event.preventDefault();
		event.stopPropagation()
		var target = $(event.target);
		if((!target.closest(".zc-ideTools").length)) {
			
			$("#contexttoolMenu").zmenu();
			$("#contexttoolMenu").zmenu("show",{"event":event});
			
		}
	});



	/*------------------------------------------------------------------------------------------------------------
																  IMAGE PREVIEW
							---------------------------------------------------------------------------------------------------------------*/ 
	var ideImagePreview = function () {
		var getimgContainerWidth = $("#zc-imagePreview-wrap").width(),
			getimgContainerHeight = $("#zc-imagePreview-wrap").height(),
			setMaxWidth = getimgContainerWidth -250,
			setMaxHeight = getimgContainerHeight - 250,
			getimgWidth = $("#zc-imagePreview-wrap img").width(),
			getimgHeight = $("#zc-imagePreview-wrap img").height(),
			getimgTopPos = (getimgContainerHeight - getimgHeight)/2,
			getimgTopPos = getimgTopPos - 80;
		getimgLeftPos = (getimgContainerWidth - getimgHeight)/2,
			getimgLeftPos = getimgLeftPos-80;

		if(getimgWidth > setMaxWidth)  {
			var getRatio = setMaxWidth / getimgWidth,
				setCurrentHeight = getimgHeight * getRatio,
				setCurrentWidth = getimgWidth * getRatio,
				setimgTopPos = (getimgContainerHeight - setCurrentHeight)/2,
				setimgTopPos = getimgTopPos - 80,
				setimgLeftPos = (getimgContainerWidth - setCurrentWidth)/2,
				setimgLeftPos = setimgLeftPos;
			$("#zc-imagePreview-wrap .zc-imagePreview").css({"width": setMaxWidth, "height": setCurrentHeight, "margin-top": setimgTopPos, "margin-left": setimgLeftPos});

		} else if(getimgHeight > setMaxHeight) {
			var getRatio = setMaxHeight / getimgHeight,
				setCurrentHeight = getimgHeight * getRatio,
				setCurrentWidth = getimgWidth * getRatio,
				setimgTopPos = (getimgContainerHeight - setCurrentHeight)/2,
				setimgTopPos = getimgTopPos - 80,
				setimgLeftPos = (getimgContainerWidth - setCurrentWidth)/2;
			setimgLeftPos = setimgLeftPos;
			$("#zc-imagePreview-wrap .zc-imagePreview").css({"width": setCurrentWidth, "height": setMaxHeight, "margin-top": setimgTopPos, "margin-left": setimgLeftPos});

		} else {
			$("#zc-imagePreview-wrap .zc-imagePreview").css({"width":getimgWidth, "height":getimgHeight, "margin-top": getimgTopPos, "margin-left": getimgLeftPos});
		}

	}


	/*--------------- TAB SELECTION -----------------*/
	var tabSelect = function(currentTab, currentTabContent) {
		$(".zc-hSplit-top .ide-tab-wrap .ide-tab").removeClass("tab-active");
		$(".zc-hSplit-top .ide-tab-wrap .ide-tab").removeClass('zc-noTabSeparator');
		currentTab.addClass("tab-active");
		currentTab.prevAll(':visible:first').addClass('zc-noTabSeparator');
		$(".zc-hSplit-top  .zc-editorTabContent").addClass("zc-hide");
		currentTabContent.removeClass("zc-hide");
		
		$('#ide-tab-sortable').find('li').removeClass('zc-tabBorderLast');
      $('#ide-tab-sortable').find('li:visible:last').addClass('zc-tabBorderLast');
	}

	var tabSelectBottom = function(currentTab, currentTabContent) {
		$(".zc-hSplit-bottom .ide-tab-wrap .ide-tab").removeClass("tab-active");
		$(".zc-hSplit-bottom .ide-tab-wrap .ide-tab").removeClass('zc-noTabSeparator');
		currentTab.addClass("tab-active");
		currentTab.prevAll(':visible:first').addClass('zc-noTabSeparator');
		$(".zc-hSplit-bottom .zc-editorTabContent").addClass("zc-hide");
		currentTabContent.removeClass("zc-hide");
	}
	
	
	  
	//JS FILE
	$(document).on("click", "#application-tab", function(event){
		var target = $(event.target),
			_this = $(this),
			getTabContent = $("#zc-code-editor");
			editor.session.setMode("ace/mode/javascript");
			editor.getSession().setValue(jsFile);

		if((!target.closest(".tab-close").length))
		{
			tabSelect(_this, getTabContent);
			$("#projExptree .fancytree-node").removeClass("fancytree-active fancytree-focused");
			$("#projExp__9 .fancytree-node").addClass("fancytree-active");
		}
	});
	
	$(document).on("click", "#coderunFile-tab", function(event){
		var target = $(event.target),
			_this = $(this),
			getTabContent = $("#zc-code-editor");
			editor.session.setMode("ace/mode/javascript");
			editor.getSession().setValue(jsFile);

		if((!target.closest(".tab-close").length))
		{
			tabSelect(_this, getTabContent);
			$("#projExptree .fancytree-node").removeClass("fancytree-active fancytree-focused");
			$("#projExp__9 .fancytree-node").addClass("fancytree-active");
		}
	});
	
	//HTML FILE
	$(document).on("click", "#htmlFile-tab", function(event){
		var target = $(event.target),
			_this = $(this),
			getTabContent = $("#zc-html-editor");
			htmlEditor.session.setMode("ace/mode/html");
			htmlEditor.getSession().setValue(htmlFile);
		
		if((!target.closest(".tab-close").length))
		{
			tabSelect(_this, getTabContent);
		}
	});
	
		$(document).on("click", "#notesFile-tab", function(event){
		var target = $(event.target),
			_this = $(this),
			getTabContent = $("#zc-html-editor");
			htmlEditor.session.setMode("ace/mode/html");
			htmlEditor.getSession().setValue(htmlFile);
		
		if((!target.closest(".tab-close").length))
		{
			tabSelect(_this, getTabContent);
		}
	});
	
	$(document).on("click", "#userinfoFile-tab", function(event){
		var target = $(event.target),
			_this = $(this),
			getTabContent = $("#zc-html-editor");
			htmlEditor.session.setMode("ace/mode/html");
			htmlEditor.getSession().setValue(htmlFile);
		
		if((!target.closest(".tab-close").length))
		{
			tabSelect(_this, getTabContent);
		}
	});
	
	//CSS FILE
	$(document).on("click", "#cssFile-tab", function(event){
		var target = $(event.target),
			_this = $(this),
			getTabContent = $("#zc-css-editor");
			cssEditor.session.setMode("ace/mode/css");
			cssEditor.getSession().setValue(cssFile);
		if((!target.closest(".tab-close").length))
		{
			tabSelect(_this, getTabContent);
		}
	});
	
	$(document).on("click", "#styleFile-tab", function(event){
		var target = $(event.target),
			_this = $(this),
			getTabContent = $("#zc-css-editor");
			cssEditor.session.setMode("ace/mode/css");
			cssEditor.getSession().setValue(cssFile);
		if((!target.closest(".tab-close").length))
		{
			tabSelect(_this, getTabContent);
		}
	});
	
	$(document).on("click", "#editorFile-tab", function(event){
		var target = $(event.target),
			_this = $(this),
			getTabContent = $("#zc-css-editor");
			cssEditor.session.setMode("ace/mode/css");
			cssEditor.getSession().setValue(cssFile);
		if((!target.closest(".tab-close").length))
		{
			tabSelect(_this, getTabContent);
		}
	});
	
	
	
	//JAVA FILE
	$(document).on("click", "#javaFile-tab", function(event){
		var target = $(event.target),
			_this = $(this),
			getTabContent = $("#zc-java-editor");
			javaEditor.session.setMode("ace/mode/java");
			javaEditor.getSession().setValue(javaFile);
		if((!target.closest(".tab-close").length))
		{
			tabSelect(_this, getTabContent);
		}
	});
	
	$(document).on("click", "#carduiFile-tab", function(event){
		var target = $(event.target),
			_this = $(this),
			getTabContent = $("#zc-java-editor");
			javaEditor.session.setMode("ace/mode/java");
			javaEditor.getSession().setValue(javaFile);
		if((!target.closest(".tab-close").length))
		{
			tabSelect(_this, getTabContent);
		}
	});
	
	
	
	
	$("#application-tab").trigger("click");
	

	$("#gettingStarted-tab").on("click", function(event){
		var target = $(event.target),
			_this = $(this),
			getTabContent = $("#zc-readme-container");
		if((!target.closest(".tab-close").length))
		{
			tabSelect(_this, getTabContent);
			$("#projExptree .fancytree-node").removeClass("fancytree-active fancytree-focused");
			$("#projExp__8 .fancytree-node").addClass("fancytree-active");
		}

	});

	$("#findReplace-tab").on("click", function(event){
		var target = $(event.target),
			_this = $(this),
			getTabContent = $("#zc-findReplace-container");
		if((!target.closest(".tab-close").length))
		{
			tabSelect(_this, getTabContent);
		}
	});

	$("#fontFile-tab").on("click", function(event){
		var target = $(event.target),
			_this = $(this),
			getTabContent = $("#zc-fontFile-container");
		if((!target.closest(".tab-close").length))
		{
			tabSelect(_this, getTabContent);
		}
	});

	$(document).on("click", "#console-tab", function(event){
		var target = $(event.target),
			_this = $(this),
			getTabContent = $("#zc-console-template");
		if((!target.closest(".tab-close").length))
		{
			tabSelectBottom(_this, getTabContent);
		}
	});

	$(document).on("click", "#problems-tab", function(event){
		var target = $(event.target),
			_this = $(this),
			getTabContent = $("#zc-problems-template");
		if((!target.closest(".tab-close").length))
		{
			tabSelectBottom(_this, getTabContent);
		}
	});

	$("#comment-tab").on("click", function(event){
		var target = $(event.target),
			_this = $(this),
			getTabContent = $("#commentEditor-template");
		if((!target.closest(".tab-close").length))
		{
			tabSelect(_this, getTabContent);
		}
	});


	$("#editor-tab").on("click", function(event){
		var target = $(event.target),
			_this = $(this),
			getTabContent = $("#zc-editorFile-container");
		if((!target.closest(".tab-close").length))
		{
			tabSelect(_this, getTabContent);
		}
	});

	$("#main-tab").on("click", function(){
		var _this = $(this),
			getTabContent = $("#zc-mainFile-container");
		tabSelect(_this, getTabContent);
	});

	$("#manage-tab").on("click", function(){
		var _this = $(this),
			getTabContent = $("#zc-manageFile-container");
		tabSelect(_this, getTabContent);
	});

	$("#report-tab").on("click", function(){
		var _this = $(this),
			getTabContent = $("#zc-reportFile-container");
		tabSelect(_this, getTabContent);
	});

	$("#findResult-tab").on("click", function(){
		var _this = $(this),
			getTabContent = $("#zc-findResult-container");
		tabSelect(_this, getTabContent);
	});

	$("#imgPreview-tab").on("click", function(event){
		var target = $(event.target),
			_this = $(this),
			getTabContent = $("#zc-imagePreview-wrap");
		if((!target.closest(".tab-close").length))
		{
			tabSelect(_this, getTabContent);
		}
// 		ideImagePreview ();
	});

	$(document).on("click", "#newConfig-tab", function(){
		var _this = $(this),
			getTabContent = $("#zc-createConfig-template");
		tabSelect(_this, getTabContent);
	});

	$(document).on("click", "#manageConfig-tab", function(){
		var _this = $(this),
			getTabContent = $("#zc-manageConfig-template");
		tabSelect(_this, getTabContent);
	});

	$(document).on("click", "#terminal-tab", function(){
		var _this = $(this),
			getTabContent = $("#zc-terminal-template");
		tabSelect(_this, getTabContent);
	});

	/*--------------- TAB SELECTION CLOSE Horizontal SPLIT TOP -----------------*/

	var tabClose = function(_this){
		var getParentId = _this.parent('.ide-tab').attr('id'),
			getParentId = $.trim(getParentId),
			getTabCount = $(".zc-hSplit-top .ide-tab:visible").length;

		if(_this.parent('.ide-tab').hasClass("tab-active")) {

			if(_this.parent('.ide-tab').next().is('.ide-tab:visible')) {
				_this.parent('.ide-tab').next('.ide-tab').addClass("tab-active");
			} else if(_this.parent('.ide-tab').prev().is('.ide-tab:visible'))  {
				_this.parent('.ide-tab').prev('.ide-tab').addClass("tab-active");
			} else {
				_this.parent('.ide-tab').prevUntil(':visible').prev('.ide-tab').addClass("tab-active");
			}
			_this.parent('.ide-tab').removeClass("tab-active");
			_this.parent('.ide-tab').css('display','none');
		}
		else {
			_this.parent('.ide-tab').removeClass("tab-active");
			_this.parent('.ide-tab').css('display','none');
		}

		var getcurrentActiveTab =  $('.zc-hSplit-top .ide-tabs .tab-active').attr('id'),
			getcurrentActiveTab = $.trim(getcurrentActiveTab);


		$(".zc-hSplit-top .zc-editorTabContent").addClass("zc-hide");
		

		if(getcurrentActiveTab == "application-tab") {
			$("#zc-code-editor").removeClass("zc-hide");
		} else if(getcurrentActiveTab == "imgPreview-tab") {
			$("#zc-imagePreview-wrap").removeClass("zc-hide");  
		} else if(getcurrentActiveTab == "findReplace-tab") {
			$("#zc-findReplace-container").removeClass("zc-hide");  
		} else if(getcurrentActiveTab == "gettingStarted-tab") {
			$("#zc-readme-container").removeClass("zc-hide");  
		} else if(getcurrentActiveTab == "fontFile-tab") {
			$("#zc-fontFile-container").removeClass("zc-hide");  
		} else if(getcurrentActiveTab == "comment-tab") {
			$("#zc-commentEditor").removeClass("zc-hide");  
		} else if(getcurrentActiveTab == "newConfig-tab") {
			$("#zc-createConfig-template").removeClass("zc-hide");  
		} else if(getcurrentActiveTab == "manageConfig-tab") {
			$("#zc-manageConfig-template").removeClass("zc-hide");  
		} 

		if(getTabCount <= 1) {
			$(".zc-hSplit-top .ide-tab-wrap").addClass("zc-hide");
			$(".zc-hSplit-top  .zc-editorTabContent").css("top", "0");
			$(".zc-hSplit-top  .zc-editorTabContent").addClass("zc-hide");
			$('.ide-moreFileTab').css('display','none');
			contentChange();
		} else {
			$(".zc-hSplit-top .ide-tab-wrap").removeClass("zc-hide");
			$(".zc-hSplit-top  .zc-editorTabContent").css("top", "32px");
		}

	}
	
	
	$(document).on("click", ".zc-hSplit-top .ide-tab-wrap .ide-tab .tab-close", function(event){
		event.stopPropagation();
		tabClose ($(this));
	});
	
	/*--------------- TAB SELECTION CLOSE Horizontal SPLIT BOTTOM -----------------*/
	
	var tabCloseBottom = function(_this){
		var getParentId = _this.parent('.ide-tab').attr('id'),
			getParentId = $.trim(getParentId),
			getTabCount = $(".zc-hSplit-bottom .ide-tab:visible").length;

		if(_this.parent('.ide-tab').hasClass("tab-active")) {

			if(_this.parent('.ide-tab').next().is('.ide-tab:visible')) {
				_this.parent('.ide-tab').next('.ide-tab').addClass("tab-active");
			} else if(_this.parent('.ide-tab').prev().is('.ide-tab:visible'))  {
				_this.parent('.ide-tab').prev('.ide-tab').addClass("tab-active");
			} else {
				_this.parent('.ide-tab').prevUntil(':visible').prev('.ide-tab').addClass("tab-active");
			}
			_this.parent('.ide-tab').removeClass("tab-active");
			_this.parent('.ide-tab').remove();
		}
		else {
			_this.parent('.ide-tab').removeClass("tab-active");
			_this.parent('.ide-tab').remove();
		}

		var getcurrentActiveTab =  $('.zc-hSplit-bottom .ide-tabs .tab-active').attr('id'),
			getcurrentActiveTab = $.trim(getcurrentActiveTab);


		$(".zc-hSplit-bottom .zc-editorTabContent").addClass("zc-hide");

		if(getcurrentActiveTab == "console-tab") {
			$("#zc-console-template").removeClass("zc-hide");  
		} else if(getcurrentActiveTab == "problems-tab") {
			$("#zc-problems-template").removeClass("zc-hide");  
		} 
		console.log(getTabCount);
		if(getTabCount <= 1) {
			$(".zc-hSplit-bottom .ide-tab-wrap").addClass("zc-hide");
			$(".zc-hSplit-bottom .zc-editorTabContent").css("top", "0");
			$(".zc-hSplit-bottom .zc-editorTabContent").addClass("zc-hide");
			$("body").removeClass("zc-showSplitBottom");
		} else {
			$(".zc-hSplit-bottom .ide-tab-wrap").removeClass("zc-hide");
			$(".zc-hSplit-bottom .zc-editorTabContent").css("top", "28px");
		}

	}
	
	
	$(document).on("click", ".zc-hSplit-bottom .ide-tab-wrap .ide-tab .tab-close", function(event){
		event.stopPropagation();
		tabCloseBottom ($(this));
	});
	
	
	
	
	

	/*------------------- IDE TIPS CONTENT CHANGE ----------------*/

	var contentChange = function() {
		setTimeout(function() { 
			$("#zc-ideTipsContent .zc-notes-text p").fadeOut(function() {
				$("#zc-ideTipsContent .zc-notes-text p").html('You can quickly Open Files, using <span class="zc-font-bold">Command + Shift + R</span>');
				$("#zc-ideTipsContent .zc-notes-text p").fadeIn('slow'); 
			});
		}, 2000);

		setTimeout(function() { 
			$("#zc-ideTipsContent .zc-notes-text p").fadeOut(function() {
				$("#zc-ideTipsContent .zc-notes-text p").html('You can toggle File Explorer, using <span class="zc-font-bold">Alt + E</span>');
				$("#zc-ideTipsContent .zc-notes-text p").fadeIn('slow'); 
			});
		}, 4000);

		setTimeout(function() { 
			$("#zc-ideTipsContent .zc-notes-text p").fadeOut(function() {
				$("#zc-ideTipsContent .zc-notes-text p").html('You can  quickly open Terminal, using <span class="zc-font-bold">Alt + T</span>');
				$("#zc-ideTipsContent .zc-notes-text p").fadeIn('slow'); 
			});
		}, 6000);

		setTimeout(function() { 
			$("#zc-ideTipsContent .zc-notes-text p").fadeOut(function() {
				$("#zc-ideTipsContent .zc-notes-text p").html('You can toggle Fullscreen Mode, using <span class="zc-font-bold">Ctrl + Command + F</span>');
				$("#zc-ideTipsContent .zc-notes-text p").fadeIn('slow'); 
			});
		}, 8000);

		//      
		//             setTimeout(function() { 
		//              $("#zc-ideTipsContent .zc-notes-text p").html('Some Text will come here');
		//              $("#zc-ideTipsContent .zc-notes-text p").fadeIn('slow'); 
		//            }, 2500);

	}


	$(document).on("click", ".newUserView #zc-readmetxtTab", function(){
		$(this).parent("#gettingStarted-tab").remove();
		$(".ide-tab-wrap").remove();
		$("#zc-readme-container").addClass("zc-hide");
		$("#zc-emptyView-container").removeClass("zc-hide");
		$("#zc-emptyView-container").addClass("zc-newUserView");
		contentChange();
	});

	$(document).on("click", ".ideUser #application-tab .tab-close", function(){
		$(this).parent("#gettingStarted-tab").remove();
		$(".ide-tab-wrap").hide();
		$("#zc-code-editor").addClass("zc-hide");
		$("#zc-emptyView-container").removeClass("zc-hide");
		contentChange();
		$("#projExp__8 .fancytree-node").removeClass("fancytree-active");
	});


	/*------------------------- BACK TO TAB FROM EMPTY VIEW ---------------------------------*/

	$("#zc-emptyView-container .zc-table tr").on("click", function(){
		//              var tabHTML =  '<ul id="ide-tab-sortable" class="ide-tabs">\
		//<li id="application-tab" class="ide-tab tab-active">\
		//<span class="tab-unsaved"> </span>\
		//<span class="tab-text">application.js </span>\
		//<span class="tab-close" title="Close">\
		//<i class="icon-9">\
		//<svg class="zc-grey"> <use  xlink:href="#svg-close-icon"> </use> </svg>\
		//</i>\
		//</span>\
		//</li>'
		$(".ide-tab-wrap").removeClass("zc-hide");
		$(".ide-tab-wrap").show();
		//      $(".ide-tab-wrap").append(tabHTML);
		$("#application-tab").css("display", "flex");
		$("#application-tab").addClass("tab-active");
		$("#zc-emptyView-container").addClass("zc-hide");
		$("#zc-code-editor").removeClass("zc-hide");
		$("#projExp__8 .fancytree-node").removeClass("fancytree-active");
		$(".zc-editorTabContent").css("top", "28px");
		
		
		/*-- when click empty state table to add the list to file tab and more file list --*/
		$('.ide-moreFileTab').css('display','block');
		
	 $('.ide-moreFileList').append('	<li class="ide-moreFileItem moreFile-unSave" data-title-class-name="tooltipNowrap" data-target-id="application-tab" title="Document Management System/application.js">\
       <span class="ide-moreFileName">application.js</span>\
       <span class="ide-moreTabClose" title="Close"><i class="icon-10"><svg class="zc-grey"> <use xlink:href="#svg-close-icon"> </use> </svg></i></span>\
       </li>');
       
  /*-- when click empty state table to add the list to file tab and more file list --*/

	});

	// OUTLINE SEARCH 

	$("#outline-search").on("keyup", function(){
		var getInputVal = $("#outline-search").val();
		if(getInputVal == "no") {
			$("#outline").addClass("zc-hide");
			$("#empty-no-outline").removeClass("zc-hide");
		} else {
			$("#outline").removeClass("zc-hide");
			$("#empty-no-outline").addClass("zc-hide");
		}
	});





	/*-------------------------------------------------------------------------------------------------------
																   FEEDBACK FORM
				  -------------------------------------------------------------------------------------------------------*/ 
	$("#zc-feedbackForm").on("click", function(){
		ZComponents.setI18NKeys('zfeedback',{
			'minimize.label':'Minimize',	//No i18n
			'maximize.label':'Maximize',	//No i18n
			'cancel.label':'Cancel',	//No i18n
			'send.label':'Send',	//No i18n
			'resend.label':'Resend',	//No i18n
			'feedback.label':'Feedback',	//No i18n
			'criticality.label':'Criticality',//No i18n
			'howcritical.label':'How critical is your feedback?',	//No i18n
			"normal.label" : "None",	//No i18n
			"low.label" : "Just FYI", 	//No i18n
			"medium.label" : "Nothing urgent, can wait", 	//No i18n
			"high.label" : "Emergency",	//No i18n
			'subject.label':'Subject',	//No i18n
			'comments.label':'Your Comments...',	//No i18n
			'attachfile.label':'Attach File',	//No i18n
			'screengrab.label':'Grab Screen',	//No i18n
			'sending.label':'Sending...',//No i18n
			'thankyou.label':'Thank you',	//No i18n
			'writesome.label':'Please write something...',	//No i18n
			'invalidsizemessage.label':'File size exceeds the maximum allowed attachments limit of {0}.',	//No i18n
			'removefile.label':'Remove',//No i18n
			'sendrequest.label':'Send Your Request',//No i18n
			'description.label':'Description',	//No i18n
			'howcriticalrequest.label':'How critical is your request?',	//No i18n
			'cancelfeedback.label':'Do you want to cancel this feedback?',	//No i18n
			'cancelrequest.label':'Do you want to cancel this request?',	//No i18n
			'alertmessage.label':'Press "OK" to proceed. "Cancel" to stay.',//No i18n
			'screenshot.label':'Screenshot',//No i18n
			'unknownerror.label':'Sending failed due to an unknown error',//No i18n
			'close.label':'Close',	//No I18N
			'viruspresent.label':'Virus found',//No i18n
			'collapse.label':'Collapse',//No i18n
			'expand.label':'Expand',//No i18n
			'attachments.label':'Attachments',//No i18n
			'tip.label':'Tip',//No i18n
			'usekeyboardshortcuts.label':'To grab the screen directly from the application window, use the below keyboard shortcuts',//No i18n
			'capturefullscreen.label':'Capture full screen',//No i18n
			'capturepartofscreen.label':'Capture part of the screen',//No i18n
			'unknownerrortext.label':'Unknown error',//No i18n
			'virusdetected.label':'Virus detected in the attached file. Please remove it.',//No i18n
			'virusdetectedinfile.label':'Virus detected in {0}. Please remove it.',//No i18n
			'unknownerrorinfile.label':'Unable to attach {0} due to an unknown error.',//No i18n
			'multiplefileserror.label':"{0} file(s) failed to upload. Please refer below for the reasons.",//No i18n
			'fileuploadinprogress.label':'File upload is in progress. Please send after it is complete.',	//No i18n
			'multiplefilesuploadinprogress.label':'Uploading {0} files. Please send after they are complete.'	//No i18n
		});
		ZFeedback.open({'formType':'feedback'});
		Screengrabber.init();
	});

	/*-------------------------------------------------------------------------------------------------------
				   DARK THEME
			  -------------------------------------------------------------------------------------------------------*/ 

	/*-- COMMENT PANE --*/

	//	  $("#zc-ide").on("click", ".zc-cmtStatus", function(){
	//		  var getParent = $(this).parent('.cmt-list');
	//		  if(getParent.hasClass('cmt-unread')){
	//		     $(this).parent('.cmt-list').removeClass('cmt-unread');
	//			  alert("yes");
	//		  } else {
	//			 getParent.addClass('cmt-unread');
	//			  alert("no");
	//		  }
	//	  });
	//	




	$("#zc-fullScreenMode").off('click').on("click", function(){
		var timer;
		if(IsFullScreenCurrently()) {
			GoOutFullscreen()
			$(this).find("i").html('<svg class="zc-grey"> <use xlink:href="#svg-fullScreenSm-icon12"> </use> </svg>');
			$(this).attr('title', 'Full Screen Mode'); 
		} else {
			GoInFullscreen($("#fullScreen").get(0));
			$(this).find("i").html('<svg class="zc-grey"> <use xlink:href="#svg-exitfullScreenSm-icon"> </use> </svg>');
			$(this).attr('title', 'Exit Full Screen Mode');
		}
	});

	$("#zc-distractFreeMode").off('click').on("click", function(){
		$("#zc-ide").toggleClass("zc-distractFree");
		$("body").addClass("zc-showStatusPane");
		$("body").addClass("zc-hideChatBar")
		if($("#zc-ide").hasClass("zc-distractFree")) {
			infoToast('Press "esc" to exit distraction free mode');
			$("#infoMsg").addClass("zc-distractMsg");
			setTimeout(function() {
				$("#infoMsg").removeClass("show-toast-message");
				$("#infoMsg").removeClass("zc-distractMsg");
			}, 2500);
		} 
	});



	$("#zc-terminalToolBtn").on("click", function(){
		terminalPane();
	});

	$("#zc-consoleToolBtn").on("click", function(){
		$("body").addClass("zc-showSplitBottom");
		consolePane();
		if(!($("#consolePane-tabs li").hasClass("tab-active"))) {
			$("#console-tabContents").css("display", "none");
			$("#console-tab").removeClass("ide-consoleTab");
			$(".zc-consolePane").css("display", "none");
		} else {
			$("#console-tab").addClass("ide-consoleTab");
			$(".zc-consolePane").css("display", "block");
		}
	});

//	$("#zc-problemsToolBtn").on("click", function(){
//		$("#zc-fileIssues").trigger("click");
//	});

	$("#zc-shareBtn").on("click", function(){
		shareDialog();
	});

	$("#zc-findToolBtn").on("click", function(){
		findOnlyPane();
	});

	$("#zc-findProjectToolBtn").on("click", function(){
		findFilesPane();
	});

	$(document).on("click", "#zc-fileIssues", function(){
		$("#quickAccessProblem").trigger("click");
	});

	//	$("#zc-statusBarClose").on("click", function(){
	//		$("body").removeClass("zc-showStatusPane");
	//	});

	$(document).on("click", "#zc-toggleChatBar", function(){
		var _this = $(this);
		$("body").toggleClass("zc-hideChatBar");

		if($("body").hasClass("zc-hideChatBar")) {
			_this.attr("title", "Show Cliq Bar");
			$("#showCliqBar").zmenu("setAttribute", "checked", "checked");
		} else {
			_this.attr("title", "Hide Cliq Bar");
			$("#showCliqBar").zmenu("setAttribute", "checked","");
			
		}
		
	});
	
	$(document).on("click", "#zc-closeBottomSplit", function(){
		$("body").removeClass("zc-showSplitBottom");
	});

	
	$(document).on("click", "#zc-copyFilePath", function(){
		successToast("Copied file link.");
		hideToast();
	});
	
	
	/* Outline Panels */
  $( "#zc-outlineToggle").on("click", function(){
      if ($(this).hasClass('zc-outlineExpand')) {
        $(this).removeClass('zc-outlineExpand').attr('title', 'Collapse All').find('svg use').attr('xlink:href',"#svg-collapseAll-icon");
      } else {
        $(this).addClass('zc-outlineExpand').attr('title','Expand All').find('svg use').attr('xlink:href',"#svg-expandAll-icon");
      }
  });


	


	/*-------------------------------------------------------------------------------------------------------------------
						 DOCUMENT CLICK 
			  ------------------------------------------------------------------------------------------------------------------*/ 
	$(document).on("click", function(){    
		$(".zc-btn").blur();
		$(".ide-menu, #zc-user-menu").removeClass("active");
		setTimeout(function() {
			$(".zc-user-menu").removeClass('show-sub-nav');
		}, 300);
		//$(".zmenu").zmenu("hide");

		$(".zc-notifi, .zc-user-account").removeClass("zc-show-menu");
		//$(".zc-user-account").css({"opacity":"0", "margin-top":"0px", "visibility":"hidden"}); 
		$("#more-terminal").hide();
		$("#terminal-more-tab").removeClass("active");
	});

});



$(function(){
   /* Ace editor Gutter hover function */
$(document).on('mouseover mouseenter','.ace_error',function(){
   console.log('wefwfwfewef');
   $(this).closest('.ace_gutter').parent().find('.ace_tooltip').addClass('ace_errorTooltip').removeClass('ace_warningTooltip ace_infoTooltip');
});

$(document).on('mouseover mouseenter','.ace_warning',function(){
   $(this).closest('.ace_gutter').parent().find('.ace_tooltip').addClass('ace_warningTooltip').removeClass('ace_errorTooltip ace_infoTooltip');
});

$(document).on('mouseover mouseenter','.ace_info',function(){
   $(this).closest('.ace_gutter').parent().find('.ace_tooltip').addClass('ace_infoTooltip').removeClass('ace_errorTooltip ace_warningTooltip')
});
})


$(function(){
   $('#zc-fileHistorySearchBtn').on('click',function(){
      $('#zc-versionHistoryFind').show();
      setTimeout(function(){
         $('#zc-versionHistoryFind').addClass('show-findReplacePane');
         $('#zc-versionHistoryFind').siblings('.zc-codePreview').animate({
            'padding-top': 55
         },250);
      },10);
   })
   
   $('#zc-fileHistoryfindPaneClose').on('click',function(){
      $('#zc-versionHistoryFind').removeClass('show-findReplacePane');
      $('#zc-versionHistoryFind').siblings('.zc-codePreview').animate({
            'padding-top': 5
         },250);
      setTimeout(function(){
         $('#zc-versionHistoryFind').hide();
      },90);
   })
})


 






