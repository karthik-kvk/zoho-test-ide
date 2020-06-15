//QUICK ACCESS PANEL
var getPaneTabId, rightPanelAvailablity, leftPanelAvailablity, bottomPanelAvailablity, getHelper, setHelper, getHelperOffset;
$(document).ready(function() {

	//FUNCTIONS START HERE

	/* Check panel width and get the overall tab width in the panel and compare it. If there 
				 is a space available for new tab put it as it else truncate the tabs to fit the new tab */
	var checkPanelWidthOnMenuClick = function() {
		/* Get droppanel width */
		var dropPanelTotalTabWidth = 0,
			getdropPanelWidth = 	$(".dropPanel").outerWidth(true) - 70,
			getdropPanelTabCount =  $(".dropPanel").find('.zc-tab:visible').length - 1;

		/* Get outer width of the all tabs in dropPanel */
		$(".dropPanel .zc-tab:visible").each(function(index) {
		  if($(this).find('.zc-iconText').get(0) !== undefined){
		  dropPanelTotalTabWidth  += parseInt( ($(this).find('.zc-iconText').get(0).scrollWidth + 24 ), 10);
		 }
		 
		});

	

		if(dropPanelTotalTabWidth >= getdropPanelWidth) {
		 
			getdropPanelWidth = getdropPanelWidth - ($(".dropPanel").find('.zc-tab.active .zc-iconText').get(0).scrollWidth + 24 );
			
			var setDropTabWidth = getdropPanelWidth / getdropPanelTabCount;
			
			if(setDropTabWidth < 65 ){
				if($(".dropPanel").hasClass('zc-textOnlyTab')) {
					$(".dropPanel").addClass("zc-textOnlyTruncate");
					$(".dropPanel").find('.zc-tab').css("width", setDropTabWidth - 14);
					$(".dropPanel").find('.zc-tab').addClass("zc-tabTruncate");
				} else {
					$(".dropPanel").addClass("zc-textOnlyTruncate");
					$(".dropPanel").find('.zc-tab').css("width", setDropTabWidth - 14);
					$(".dropPanel").find('.zc-tab').addClass("zc-tabTruncate");	  
				}

			} else {
				$(".dropPanel").addClass("zc-textOnlyTruncate");
				$(".dropPanel").find('.zc-tab').css("width", setDropTabWidth - 14);
				$(".dropPanel").find('.zc-tab').addClass("zc-tabTruncate");
			}

		} else {
			$(".dropPanel").removeClass("zc-textOnlyTruncate");
			$(".dropPanel").find('.zc-tab').css("width", "auto");
			$(".dropPanel").find('.zc-tab').removeClass("zc-tabTruncate");
		}
		
	
		$('.dropPanel').find('.zc-tab.active').css("width", ($('.dropPanel').find('.zc-tab.active .zc-iconText').get(0).scrollWidth + 10 )).removeClass("zc-tabTruncate");	



   //the same drag and drop perform in single panel the function cannot be run 
   // if drag and drop perform in different panels the function will run
   if(!($('.currentActivePanel').find('.ui-droppable').hasClass('dropPanel')) ){
    
   	/* Get draggable width */
   		var dragPanelTotalTabWidth = 0,
   			getdragPanelWidth = 	$(".currentActivePanel .zc-tabs").outerWidth(true) - 70,
   			getdragPanelTabCount =  $(".currentActivePanel .zc-tabs").find('.zc-tab:visible').length;
  
   
   		/* Get outer width of the all tabs in dropPanel */
   		$(".currentActivePanel .zc-tabs .zc-tab:visible").each(function(index) {
   		 
   		 if($(this).find('.zc-iconText').get(0) !== undefined){
   		  dropPanelTotalTabWidth  += parseInt( ($(this).find('.zc-iconText').get(0).scrollWidth + 24 ), 10);
   		 }
   		 
   			//dragPanelTotalTabWidth  += parseInt($(this).outerWidth(true), 10);
   			
   		});
   
   		if(dragPanelTotalTabWidth >= getdragPanelWidth) {
   		 
   			var setDragTabWidth = getdragPanelWidth / getdragPanelTabCount;
   			
   			if(setDragTabWidth < 65 ){
   				if( $(".currentActivePanel .zc-tabs").hasClass('zc-textOnlyTab')) {
   					$(".currentActivePanel .zc-tabs").addClass("zc-textOnlyTruncate");
   					$(".currentActivePanel .zc-tabs").find('.zc-tab').css("width", setDragTabWidth - 14);
   					$(".currentActivePanel .zc-tabs").find('.zc-tab').addClass("zc-tabTruncate");
   				} else {
   					$(".currentActivePanel .zc-tabs").addClass("zc-textOnlyTruncate");
   					$(".currentActivePanel .zc-tabs").find('.zc-tab').css("width", setDragTabWidth - 14);
   					$(".currentActivePanel .zc-tabs").find('.zc-tab').addClass("zc-tabTruncate");
   				}
   
   			} else {
   				$(".currentActivePanel .zc-tabs").addClass("zc-textOnlyTruncate");
   				$(".currentActivePanel .zc-tabs").find('.zc-tab').css("width", setDragTabWidth - 14);
   				$(".currentActivePanel .zc-tabs").find('.zc-tab').addClass("zc-tabTruncate");
   			}
   
   		} else {
   			$(".currentActivePanel .zc-tabs").removeClass("zc-textOnlyTruncate");
   			$(".currentActivePanel .zc-tabs").find('.zc-tab').css("width", "auto");
   			$(".currentActivePanel .zc-tabs").find('.zc-tab').removeClass("zc-tabTruncate");
   		}
   
   }

	

	}  


	/* Check the panel width and over all tab width which the tab contains. It can be used only on
				quick access panel click and panel More Action ( Text only and Icon and Text ) */		
	var checkPanelWidthOnQuickPanelClick = function(panel) {
	 
		/* Get activepanel width */
		var activePanelTotalTabWidth = 0,
		
			getActivePanelWidth = 	$(panel).innerWidth() - 70,
			
			// dockpanel function multiple tab click the outerWidth not working
   //the above line will not measure the exact length so change outerwidth to innerwidth  
			//getActivePanelWidth = 	$(panel).get(0).offsetWidth - 60,
			
			getActivePanelTabCount =  $(panel).find('.zc-tab:visible').length - 1;
			
		

		/* First reset the panel tab width to auto and then calculate the outer width */
		//$(panel).find('.zc-tabs').removeClass("zc-iconOnlyTruncate");
		//$(""+panel+" .zc-tab").removeClass("zc-tabTruncate");
		//$(""+panel+" .zc-tab").css("width", "auto");


		/* Get outer width of the all tabs in dropPanel */
		$(""+panel+" .zc-tab:visible").each(function(index) {
		 
		 if($(this).find('.zc-iconText').get(0) !== undefined){
		  activePanelTotalTabWidth  += parseInt( ($(this).find('.zc-iconText').get(0).scrollWidth + 24 ), 10);
		 }
		 
		//	activePanelTotalTabWidth  += parseInt($(this).outerWidth(true), 10);
			
		});
		

		if(activePanelTotalTabWidth >= getActivePanelWidth) {
			
			// getActivePanelWidth = getActivePanelWidth -  $(panel).find('.zc-tab.active').outerWidth(true);
			getActivePanelWidth = getActivePanelWidth - ($(panel).find('.zc-tab.active .zc-iconText').get(0).scrollWidth + 24 );
			
			var setActivePanelTabWidth = getActivePanelWidth / getActivePanelTabCount;

			if(setActivePanelTabWidth < 65 ){
				if($(""+panel+" .zc-tabs").hasClass("zc-textOnlyTab")) {
					$(""+panel+" .zc-tabs").addClass("zc-textOnlyTruncate");
					$(""+panel+" .zc-tabs").find('.zc-tab').css("width", setActivePanelTabWidth - 14 );
					$(""+panel+" .zc-tabs").find('.zc-tab').addClass("zc-tabTruncate");
				} else {
					$(""+panel+" .zc-tabs").addClass("zc-textOnlyTruncate");
					$(""+panel+" .zc-tabs").find('.zc-tab').css("width", setActivePanelTabWidth - 14 );
					$(""+panel+" .zc-tabs").find('.zc-tab').addClass("zc-tabTruncate");
				}
			} else {
				$(""+panel+" .zc-tabs").addClass("zc-textOnlyTruncate");
				$(""+panel+" .zc-tabs").find('.zc-tab').css("width", setActivePanelTabWidth - 14 );
				$(""+panel+" .zc-tabs").find('.zc-tab').addClass("zc-tabTruncate");
			}
			// 	$(panel).find('.zc-tab').css("width", setActivePanelTabWidth);
			// 	$(panel).find('.zc-tab').addClass("zc-tabTruncate");
		} else {
			$(""+panel+" .zc-tabs").addClass("zc-textOnlyTruncate");
			$(panel).find('.zc-tab').css("width", "auto");
			$(panel).find('.zc-tab').removeClass("zc-tabTruncate");
		}
		
	//	$(panel).find('.zc-tab.active').css("width", "auto").removeClass("zc-tabTruncate");	
		$(panel).find('.zc-tab.active').css("width", ($(panel).find('.zc-tab.active .zc-iconText').get(0).scrollWidth + 10 )).removeClass("zc-tabTruncate");	


	}


	/* This function can be used in sortble stop. Once sorting in completed if there is no tab in panel 
				 then close that panel */
	var panelClose = function() {

		if($(".zc-panelX .zc-tab:visible").length < 1) {
			$(".zc-ideContainer").removeClass("zc-showPanelX");
		} 

		if($(".zc-panelRight .zc-tab:visible").length < 1) {
			$(".zc-ideContainer").removeClass("zc-showPanelRight");
		} 

		if($(".zc-panelLeft .zc-tab:visible").length < 1) {
			$(".zc-ideContainer").removeClass("zc-showPanelLeft");
		} 

		$( ".zc-undockPanel" ).each( function(){
			var getUndockPanelID = $(this).attr("id")
			if($("#"+getUndockPanelID+" .zc-tab:visible").length < 1) {
				$("#"+getUndockPanelID).css("display", "none");
			}

		});

	} 


	/* This function can be used for when user click icon button on quickaccess panel it will
					open the corrsponding panel and tab. It will check the corresponding tab in all the panels */
	var quickAccessTabSwitch = function(activeTab) {

		var base_container, getActivePanel, getActiveTabContent;

		base_container = $(".zc-ideContainer");
		getActivePanel = $("#"+activeTab+"").parent(".zc-tabs").parent(".zc-panel");

		// SET TAB ACTIVE
		$("#"+activeTab+"").parent(".zc-tabs").find(".zc-tab").removeClass("active");
		$("#"+activeTab+"").addClass("active").css("display", "inline-flex");

		// SET TAB CONTENT ACTIVE
		getActiveTabContent = $("#"+activeTab+"").attr("data-tab");
		$("#"+activeTab+"").parent(".zc-tabs").next(".zc-tabContentContainer").find(".zc-tabContent").css("display", "none");
		$("#"+getActiveTabContent+"").show();


		if(getActivePanel.hasClass('zc-panelRight')) {

			if(!(base_container.hasClass("zc-showPanelRight"))) {
				$(".zc-ideContainer").addClass("zc-showPanelRight");
			}

			checkPanelWidthOnQuickPanelClick(".zc-panelRight");

		} else if(getActivePanel.hasClass("zc-panelLeft")) {

			if(!(base_container.hasClass("zc-showPanelLeft"))) {
				$(".zc-ideContainer").addClass("zc-showPanelLeft");
			}

			checkPanelWidthOnQuickPanelClick(".zc-panelLeft");

		} else if(getActivePanel.hasClass("zc-panelX")) {

			if(!(base_container.hasClass("zc-showPanelX"))) {
				$(".zc-ideContainer").addClass("zc-showPanelX");
			}

			checkPanelWidthOnQuickPanelClick(".zc-panelX");

		} else if(getActivePanel.hasClass("zc-undockPanel")) {

			var getUndockPanelID = $("#"+activeTab+"").closest(".zc-undockPanel").attr('id');
			if($("#"+getUndockPanelID+":visible").length < 1) {
				$("#"+getUndockPanelID).css("display", "block");
			}

			checkPanelWidthOnQuickPanelClick(".zc-undockPanel");

		} 

		//		panelRightContextMenu();  
		//		panelLeftContextMenu();
		//		panelBottomContextMenu();
		//		panelUndockContextMenu();

	}


	// Close Panel when user choose remove from launcher
	var quickAccessTabRemove = function(activeTab) {
		$("#"+activeTab+"").remove();
	}


	var panelQuickLaunchCommitBtn = '<li id="quickAccessCommit" class="" data-tab="commitTab">\
<button class="zc-btn icon" title="Changes">\
<i class="icon"> <svg class="zc-changesIcon"> <use xlink:href="#svg-changes-icon"> </use> </svg> </i>\
</button>\
</li>';


	var panelQuickLaunchCollabBtn = '<li id="quickAccessCollab" class="" data-tab="collabTab">\
<button class="zc-btn icon" title="Co-developers">\
<i class="icon"> <svg class="zc-codevelopIcon"> <use xlink:href="#svg-collab-icon"> </use> </svg> </i>\
</button>\
</li>';


	var panelQuickLaunchChatBtn = '<li id="quickAccessChat" class="" data-tab="chatTab">\
<button class="zc-btn icon" title="Group Chat">\
<i class="icon"> <svg class="zc-cIcon"> <use xlink:href="#svg-chat-icon"> </use> </svg> </i>\
</button>\
</li>';


	var panelQuickLaunchCommentBtn = '<li id="quickAccessComments" class="" data-tab="commentTab">\
<button class="zc-btn icon" title="Comments">\
<i class="icon"> <svg class="zc-commentIcon"> <use xlink:href="#svg-comment-icon"> </use> </svg> </i>\
</button>\
</li>';


	var panelQuickLaunchOutlineBtn = '<li id="quickAccessOutline" class="" data-tab="outlineTab">\
<button class="zc-btn icon" title="Outline">\
<i class="icon"> <svg class="zc-outlineIcon"> <use xlink:href="#svg-outline-icon"> </use> </svg> </i>\
</button>\
</li>';


	var panelQuickLaunchDebugBtn = '<li id="quickAccessDebug" class="" data-tab="debugTab">\
<button class="zc-btn icon" title="Debugger">\
<i class="icon"> <svg class="zc-debugIcon"> <use xlink:href="#svg-debug-icon"> </use> </svg> </i>\
</button>\
</li>';

	var panelQuickLaunchExplorerBtn  = '<li id="quickAccessExplorer" class="" data-tab="explorerTab">\
<button class="zc-btn icon" title="Explorer">\
<i class="icon"> <svg class="zc-outlineIcon"> <use xlink:href="#svg-tree-icon"> </use> </svg> </i>\
</button>\
</li>';


	var panelQuickLaunchConsoleBtn = '<li id="quickAccessConsole" class="" data-tab="consoleTab">\
<button class="zc-btn icon" title="Output Console">\
<i class="icon"> <svg class="zc-consoleIcon"> <use xlink:href="#svg-console-icon"> </use> </svg> </i>\
</button>\
</li>';

	var panelQuickLaunchProblemBtn = '<li id="quickAccessProblem" class="" data-tab="problemsTab">\
<button class="zc-btn icon" title="Problems">\
<i class="icon"> <svg class="zc-ProblemsIcon"> <use xlink:href="#svg-problems-icon"> </use> </svg> </i>\
</button>\
</li>';

	var panelQuickLaunchSearchBtn = '<li id="quickAccessSearch" class="" data-tab="searchTab">\
<button class="zc-btn icon" title="Search">\
<i class="icon"> <svg class="zc-searchIcon"> <use xlink:href="#svg-search-icon"> </use> </svg> </i>\
</button>\
</li>';	



	//	setHelper =  function(getHelper) {
	//                return $('<div class="zc-panel>\
	//						 <div class="zc-tabs">'+getHelper+'</div>\
	//						 <div class="zc-tabContentContainer">\
	//						 <div id="zc-outlineTabContent" class="zc-tabContent" style="display: block;">\
	//							<h2>Outline content will apper here.</h2>\
	//						 </div>\
	//						 </div>\
	//						 </div>');
	//            }



	/*------------------------- FUNCTION END HERE ---------------------------*/


	/* Panel tabs sortable */
	var sortableFunction = function() {
		var dropped,
			titleDrop,
			titleChange,
			getTabCount, setTabWidth, getPanelLeftTabWidth = 0, setPanelLeftTabWidth, getDropPanelTotalTabWidth, getActivePanelTotalTabWidth, getActivePanelWidth, getActivePanelTabCount, setActivePanelTabWidth, getActiveTab, getActiveTabContent, getScreenWidth, setPanelPosition, setNewPanelPosition, setNewPanelEndPosition, newPanel, getSortableTabId, getSortableTabData, getSortableTabQuickData, getSortableTabTitle, tabPanel_Droppable, getNewPanelTabCount, getQuickAccessTab, getActiveDropPanel, getQuickAccessTabContainer; 
		//.zc-ideContainer 

		//			cancel: '',
		//			scroll: false,
		//			tolerance: "intersect",
		//			connectWith: ".quickAccessSort",
		//			placeholder: "sortable-placeholder",
		//			helper: "clone",
		//			appendTo: document.body,
		//			zIndex: 9999,
		//			cursor: "grabbing",
		//			cursorAt: { top: 22 },

		$( ".zc-tabs" ).sortable({
			//			helper: "clone",
			helper:  function(e, ui) {
				//Helper Clone;
				getHelper = ui.prop('outerHTML');
				getHelperContentId = ui.attr("data-tab");
				getHelperContent = $("#"+getHelperContentId).prop('outerHTML');
				return $('<div class="zc-panelClone" style="opacity:0">\
<div class="zc-draggableHeader ui-draggable-handle"></div>\
<div class="zc-tabs">'+getHelper+'\
<div class="zc-panelAction">\
<button class="zc-btn zc-btn-small icon zc-panelClose" title="Close Panel Group">\
<i class="icon-9">\
<svg> <use xlink:href="#svg-close-icon"> </use> </svg>\
</i>\
</button>\
</div>\
</div>\
<div class="zc-tabContentContainer">'+getHelperContent+'</div>\
</div>');
			},
			cancel:'',
			appendTo: document.body,
			refreshPositions: true,
			//	placeholder: "sortable-placeholder",
			tolerance: "pointer",
			scroll: false,
			scrollSpeed: 4,
			items: ".zc-tab",
			zIndex: 100000,
			cursor: "grabbing",
			cursorAt: { top: 24 },
			axis: "x",
			//connectWith: ".zc-tabSort",
			start: function( event, ui ) {
			 

				bottomPanelAvailablity = false, rightPanelAvailablity = false, leftPanelAvailablity = false;


				$(".right-pane").addClass("skipFunction");

				$(".zc-tabs").removeClass("zc-tabDropped");

				/* Check right panel open or not when sort begins */
				if($(".zc-ideContainer").hasClass("zc-showPanelRight")) {
					rightPanelAvailablity = true;
				}

				/* Check Left panel open or not when sort begins */
				if($(".zc-ideContainer").hasClass("zc-showPanelLeft")) {
					leftPanelAvailablity = true;
				}

				/* Check Bottom panel open or not when sort begins */
				if($(".zc-ideContainer").hasClass("zc-showPanelX")) {
					bottomPanelAvailablity = true;
				}


				$("body").addClass("sortingStart");
				ui.item.addClass("zc-sortableTab");
				//getHelper = $(".zc-sortableTab").prop('outerHTML');
				//setHelper(getHelper);
				$('.zc-panel').removeClass("currentActivePanel");
				ui.item.parent('.zc-tabs').parent('.zc-panel').addClass("currentActivePanel");
				$(".zc-panel .zc-tabs .zc-tab").removeClass('zc-currentActiveTab');
				ui.item.addClass('zc-currentActiveTab');
				$(".zc-sortableTab").next(".zc-tab").addClass("active");
				getHelperOffset = $(".currentActivePanel .zc-tabs").offset().top;


			},
			sort: function( event, ui ) {

				getScreenHeight = $(window).height();
				setPanelPosition = getScreenHeight - 200;

				newPanel = '<div class="zc-panel zc-newPanel">\
<div id="" class="zc-tabs zc-tabSort zc-tabConnect">\
<div class="zc-panelAction">\
<button class="zc-btn zc-btn-small icon zc-panelMoreAction" data-menu-id="right-panelActionMenu" data-active-class="active" title="">\
<i class="icon-12">\
<svg> <use xlink:href="#svg-panelPref-icon"> </use> </svg>\
</i>\
</button>\
\
<button id="zc-closePanelNew" class="zc-btn zc-btn-small icon zc-closePanel" title="Close">\
<i class="icon-10">\
<svg> <use xlink:href="#svg-close-icon"> </use> </svg>\
</i>\
</button>\
</div>\
</div>\
<div class="zc-tabContentContainer">\
</div>\
</div>';

				getSortableTab = $(".zc-tabs").find('.zc-sortableTab').html();
				getSortableTabId = $(".zc-tabs").find('.zc-sortableTab').attr("id");
				getSortableTabData = $(".zc-tabs").find('.zc-sortableTab').attr("data-tab");
				getSortableTabQuickData = $(".zc-tabs").find('.zc-sortableTab').attr("data-quick");
				getSortableTabTitle = $(".zc-tabs").find('.zc-sortableTab').find(".zc-iconText").text();
				getSortableTabContent = $("#"+getSortableTabData+"").prop('outerHTML');
				setNewTab = '<span id="'+getSortableTabId+'" data-tab="'+getSortableTabData+'" data-quick="'+getSortableTabQuickData+'" class="zc-tab active" title="'+getSortableTabTitle+'">'+ getSortableTab +'</span>';
				getNewPanelTabCount = $(".zc-panelX").find(".zc-tab:visible").length;
				getScreenHeight = $(window).height();
				setPanelPosition = getScreenHeight - 200;

			}, 
			stop: function( event, ui ) {
			 
			/*$('#ide-commentdropdown').zselect({
 "arrowSVGIconId": "svg-selectarrow-icon",
 beforefocus : function(){ return false; }
   });*/

				var getUiSortableIndex = ui.item.index();

				$("body").removeClass("sortingStart");
				$(".right-pane").css("z-index", "9");

				/* Set active tab */
				getActiveTab = $(".dropPanel").find('.active').attr("id");
				getActiveTabContent = $("#"+getActiveTab+"").attr("data-tab");

				/* Set active tab content */
				$("#"+getActiveTab+"").parent(".zc-tabs").next(".zc-tabContentContainer").find(".zc-tabContent").css("display", "none");
				$("#"+getActiveTabContent+"").show();
				getActiveContentHtml = $("#"+getActiveTabContent+"").prop('outerHTML');

				$(".dropPanel").next('.zc-tabContentContainer').append(getActiveContentHtml);
				$(".currentActivePanel .zc-tabContentContainer").find("#"+getActiveTabContent+"").remove();

				/* Reint project explorer */  
				if(getActiveTab == "explorerTab") {
					initProjectExplorer();
					loadProjects();
					$("#projExptree").fancytree("getRootNode").visit(function (node) {
						node.setExpanded(true);
					});
				}
				

				
				/*Check panel width and get the overall tab width for Truncation */
				checkPanelWidthOnMenuClick();

				/* On sorting stop close the panel which have no tabs in that */
				panelClose();


				/* Move quick launcher icon to corresponding launcher based on the location dropped */

				var getDroppedPanel = $(".dropPanel").parent(".zc-panel"),
					getQuickLauncherIconID = $("#"+getActiveTab+"").attr("data-quick"),
					getQuickLauncherContent = $("#"+getQuickLauncherIconID+"").prop('outerHTML');
				$("#"+getQuickLauncherIconID+"").remove();

				if(getDroppedPanel.hasClass("zc-panelLeft")) {
					$(".custom-paneLeft").find(".quickAccessSortList").append(getQuickLauncherContent);
				}

				if(getDroppedPanel.hasClass("zc-panelRight")) {
					$(".custom-paneRight").find(".quickAccessSortList").append(getQuickLauncherContent);
				}

				if(getDroppedPanel.hasClass("zc-panelX")) {
					$(".custom-PaneBottom").find(".quickAccessSortList").append(getQuickLauncherContent);
				}

				$("#"+getQuickLauncherId).closest("li").siblings("li").removeClass("active");
				$("#"+getQuickLauncherId).closest("li").addClass("active");
				

				// If there is no tab in the bottom Panel and if we drop a tab into that it will trigger
				if($(".zc-ideContainer").hasClass("zc-showPanelXPartial") || $(".zc-ideContainer").hasClass("zc-newPanelX")) {
					$(".zc-ideContainer").removeClass("zc-showPanelX");
					$(".zc-ideContainer").removeClass("zc-newPanelX");
					$(".zc-ideContainer").removeClass("zc-showPanelXPartial");
				}

				if($(".zc-ideContainer").hasClass("zc-showPanelRightPartial") || $(".zc-ideContainer").hasClass("zc-newPanelRight")) {
					$(".zc-ideContainer").removeClass("zc-showPanelRight");
					$(".zc-ideContainer").removeClass("zc-newPanelRight");
					$(".zc-ideContainer").removeClass("zc-showPanelRightPartial");
				}

				if($(".zc-ideContainer").hasClass("zc-showPanelLeftPartial") || $(".zc-ideContainer").hasClass("zc-newPanelLeft")) {
					$(".zc-ideContainer").removeClass("zc-showPanelLeft");
					$(".zc-ideContainer").removeClass("zc-newPanelLeft");
					$(".zc-ideContainer").removeClass("zc-showPanelLeftPartial");
				}



				/* ReCall the Panel Tab Contextual menu function after sorting completed */	
				//				panelRightContextMenu();  
				//				panelLeftContextMenu();
				//				panelBottomContextMenu();
				//				panelUndockContextMenu();

			},
			deactivate: function( event, ui ) {

				$(".right-pane").css("z-index", "9");
				$(".zc-panelRight").css("z-index", "0");
				ui.item.removeClass("zc-sortableTab");

			}
		});
	}


	// Init Sortable
	sortableFunction();


	/* Mouse move can be used to show the bottom panel if mouse move bottom ( Particular Position)
				 based on screen size  show bottom panel*/
	var mouseMoveTimeOut = null;
	$(document).mousemove(function(event){

		var getNewPanelTabCount = $(".zc-panelX").find(".zc-tab:visible").length,
			getRightPanelTabCount = $(".zc-panelRight").find(".zc-tab:visible").length,
			getLeftPanelTabCount = $(".zc-panelLeft").find(".zc-tab:visible").length,
			getScreenHeight = $(window).height(),
			getScreenWidth = $(window).width(),
			setPanelPosition = getScreenHeight - 100,
			setRightPanelPosition = getScreenWidth - 100;

		var rightPanelOffsetTop = $(".zc-panelRight").offset().top,
			rightPanelOffsetLimit = rightPanelOffsetTop + 48,
			bottomPanelOffsetTop = $(".zc-panelX").offset().top,
			bottomPanelOffsetLimit = bottomPanelOffsetTop + 48;

		
		if($(".currentActivePanel").hasClass("zc-panelX")) {

			if((event.pageY < bottomPanelOffsetTop) || (event.pageY > bottomPanelOffsetLimit)) {
				$( ".zc-tabs" ).sortable({
					axis: ""
				});
				$("body").removeClass("zc-removehelperPanel");
			}   else {
				$( ".zc-tabs" ).sortable({
					axis: "x"
				});
				$("body").addClass("zc-removehelperPanel");
				$(".zc-panelClone").css("top", getHelperOffset-1);
				$(".zc-panelClone").css("opacity", "1");
			}
		}  

		if($(".currentActivePanel").hasClass("zc-panelLeft")) {

			if((event.pageY < rightPanelOffsetTop) || (event.pageY > rightPanelOffsetLimit)) {
				$( ".zc-tabs" ).sortable({
					axis: ""
				});
				$("body").removeClass("zc-removehelperPanel");
			}   else {

				if(event.pageX > 1480) {
					$("body").removeClass("zc-removehelperPanel");
				} else {
					$( ".zc-tabs" ).sortable({
						axis: "x"
					});
					$("body").addClass("zc-removehelperPanel");
					$(".zc-panelClone").css("top", getHelperOffset-1);
					$(".zc-panelClone").css("opacity", "1");
				}


			}
		} 

		if($(".currentActivePanel").hasClass("zc-panelRight")) {

			if((event.pageY < rightPanelOffsetTop) || (event.pageY > rightPanelOffsetLimit)) {
				$( ".zc-tabs" ).sortable({
					axis: ""
				});
				$("body").removeClass("zc-removehelperPanel");
			}   else {
				if(event.pageX < 500) {
					$("body").removeClass("zc-removehelperPanel");
				} else {
					$( ".zc-tabs" ).sortable({
						axis: "x"
					});
					$("body").addClass("zc-removehelperPanel");
					$(".zc-panelClone").css("top", getHelperOffset-1);
					$(".zc-panelClone").css("opacity", "1");
				}

			}
		}

		if($(".currentActivePanel").hasClass("zc-undockPanel")) {
			var currentPanelOffsetTop = $(".currentActivePanel").offset().top,
				currentPanelOffsetLimit = currentPanelOffsetTop + 48;
			console.log(event.pageY);
			console.log("UndockTOP:"+ currentPanelOffsetTop);

			if((event.pageY < currentPanelOffsetTop) || (event.pageY > currentPanelOffsetLimit)) {
				$( ".zc-tabs" ).sortable({
					axis: ""
				});
				$("body").removeClass("zc-removehelperPanel");
			}   else {
				$( ".zc-tabs" ).sortable({
					axis: "x"
				});
				$("body").addClass("zc-removehelperPanel");
				$(".zc-panelClone").css("top", getHelperOffset-1);
				$(".zc-panelClone").css("opacity", "1");
			}
		}


		/* Clear Timeout */
		clearTimeout(mouseMoveTimeOut);

		/* Refresh the sortable positon which can be used to find hidden DOM position */
		$( ".zc-tabs" ).sortable("refreshPositions");

		if($("body").hasClass("sortingStart")) {

			mouseMoveTimeOut = setTimeout(function() {		
				/* Check for Bottom Panel */
				if(!($('.zc-ideContainer').hasClass('zc-showPanelX'))) {
					if(event.pageY > setPanelPosition) {
						console.log("class");
						if(getNewPanelTabCount >= 1) {
							$(".zc-ideContainer").addClass("zc-showPanelX zc-showPanelXPartial");	
						} else {
							$(".zc-ideContainer").addClass("zc-newPanelX");
						}
					} 
				} 

				/* Check for Right Panel */
				if(!($('.zc-ideContainer').hasClass('zc-showPanelRight'))) {
					if(event.pageX > setRightPanelPosition) {
						console.log(event.pageX);
						console.log(setRightPanelPosition);
						console.log("RightPanel")
						if(getRightPanelTabCount >= 1) {
							$(".zc-ideContainer").addClass("zc-showPanelRight zc-showPanelRightPartial");	
						} else {
							$(".zc-ideContainer").addClass("zc-newPanelRight");
						}
					}
				}

				/* Check for Left Panel */
				if(!($('.zc-ideContainer').hasClass('zc-showPanelLeft'))) {
					if(event.pageX < 100) {
						console.log(event.pageX);
						if(getLeftPanelTabCount >= 1) {
							$(".zc-ideContainer").addClass("zc-showPanelLeft zc-showPanelLeftPartial");	
						} else {
							$(".zc-ideContainer").addClass("zc-newPanelLeft");
						}
					}
				}

			}, 50);

		}
	});



	// Droppable tabs function
	tabPanel_Droppable = function() {


		/* If Tab is dropped in the tab area */
		var tabDroppable = function() {
			$( ".zc-tabs" ).droppable({

				accept: ".zc-tab",
				greedy: true,
				tolerance: "pointer",

				over: function( event, ui ) {
					var dropped = $(this),
						droppedPanel = dropped.parent(".zc-panel");

					$(".sortable-placeholder").css("opacity", "1");
					$('.zc-panel .zc-tabs').removeClass("dropPanel");
					$(this).addClass("dropPanel");
					if(!(droppedPanel).hasClass('currentActivePanel')) {
						$(".zc-panelClone").addClass("partialClone");
					}  else {
						$(".zc-panelClone").removeClass("partialClone");
					}
				},

				drop: function( event, ui ) {
		
					var dropped = $(this),
						droppedPanel = dropped.parent(".zc-panel"),
						setDropPosition = dropped.find(".sortable-placeholder");
					dropped.find('.zc-tab').removeClass("active");
					$('.zc-sortableTab').addClass("active");



					if(!(droppedPanel).hasClass('currentActivePanel')) {
						/* Tab Which dropped here will be moved to tabs */
						getSortableTab = $(".zc-tabs").find('.zc-sortableTab').html();
						getSortableTabId = $(".zc-tabs").find('.zc-sortableTab').attr("id");
						getSortableTabData = $(".zc-tabs").find('.zc-sortableTab').attr("data-tab");
						getSortableTabQuickData = $(".zc-tabs").find('.zc-sortableTab').attr("data-quick");
						getSortableTabTitle = $(".zc-tabs").find('.zc-sortableTab').find(".zc-iconText").text();
						getSortableTabContent = $("#"+getSortableTabData+"").prop('outerHTML');

						setNewTab = '<span id="'+getSortableTabId+'" data-tab="'+getSortableTabData+'" data-quick="'+getSortableTabQuickData+'" class="zc-tab zc-currentActiveTab active" title="'+getSortableTabTitle+'">'+ getSortableTab +'</span>';

						$(setNewTab).insertAfter(setDropPosition);

						// Active Prev or next tab based on the tab avaliable

						var nextTabCountInCurrentActivePanel = $(".currentActivePanel .zc-sortableTab").nextAll(".zc-tab:visible").length;

						if(nextTabCountInCurrentActivePanel < 1) {
							$(".currentActivePanel .zc-sortableTab").prevAll(".zc-tab:visible").not( ".ui-sortable-placeholder" ).last(".zc-tab").trigger("mousedown");
						} else {
							$(".currentActivePanel .zc-sortableTab").nextAll(".zc-tab:visible").not( ".ui-sortable-placeholder" ).first(".zc-tab").trigger("mousedown");
						}

						$(".currentActivePanel .zc-sortableTab").remove();

						$(".zc-tabs .sortable-placeholder").remove();

						$(".dropPanel").addClass("zc-tabDropped");


					}
    
     
					$(".dropPanel").find(".zc-tab").removeClass("zc-sortableTab");

					//					$(".zc-panel .zc-tabs").removeClass("dropPanel");

					/* ReCall the Panel Tab Contextual menu function after sorting completed */	
					//				panelRightContextMenu();  
					//				panelLeftContextMenu();
					//				panelBottomContextMenu();
					//				panelUndockContextMenu();

				}
			});
		}
		tabDroppable();
		/* If tab is dropped in the panel area */ 
		var panelDroppable = function() {
			$( ".zc-panel" ).droppable({
				accept: ".zc-tab",
				greedy: true,
				tolerance: "pointer",

				over: function( event, ui ) {
					$(".sortable-placeholder").css("opacity", "0");
					$(this).addClass("zc-droppableHelper");
					$('.zc-panel .zc-tabs').removeClass("dropPanel");
					$(this).find(".zc-tabs").addClass("dropPanel");
				},

				out: function( event, ui ) {
					$(this).removeClass("zc-droppableHelper");
				},

				drop: function( event, ui ) {
				 
			
					$(".right-pane").addClass("skipFunction");

					$(this).removeClass("zc-droppableHelper");

					dropped = $(this).find(".zc-tabs");
					dropped.find('.zc-tab').removeClass("active");
					$('.zc-sortableTab').addClass("active");


					/* Tab Which dropped here will be moved to tabs */
					getSortableTab = $(".zc-tabs").find('.zc-sortableTab').html();
					getSortableTabId = $(".zc-tabs").find('.zc-sortableTab').attr("id");
					getSortableTabData = $(".zc-tabs").find('.zc-sortableTab').attr("data-tab");
					getSortableTabQuickData = $(".zc-tabs").find('.zc-sortableTab').attr("data-quick");
					getSortableTabTitle = $(".zc-tabs").find('.zc-sortableTab').find(".zc-iconText").text();
					getSortableTabContent = $("#"+getSortableTabData+"").prop('outerHTML');

					setNewTab = '<span id="'+getSortableTabId+'" data-tab="'+getSortableTabData+'" data-quick="'+getSortableTabQuickData+'" class="zc-tab zc-currentActiveTab active" title="'+getSortableTabTitle+'">'+ getSortableTab +'</span>';

					dropped.append(setNewTab);

					// Active Prev or next tab based on the tab avaliable

					var nextTabCountInCurrentActivePanel = $(".currentActivePanel .zc-sortableTab").nextAll(".zc-tab:visible").length;

					if(nextTabCountInCurrentActivePanel < 1) {
						$(".currentActivePanel .zc-sortableTab").prevAll(".zc-tab:visible").not( ".ui-sortable-placeholder" ).last(".zc-tab").trigger("mousedown");
					} else {
						$(".currentActivePanel .zc-sortableTab").nextAll(".zc-tab:visible").not( ".ui-sortable-placeholder" ).first(".zc-tab").trigger("mousedown");
					}


					$(".currentActivePanel .zc-sortableTab").remove();

					$(".dropPanel").find(".zc-tab").removeClass("zc-sortableTab");

					$(".dropPanel").addClass("zc-tabDropped");

					
					var getPanelLength, launcherIcon ="";

					getPanelLength = $("#"+getSortableTabQuickData+":visible").length;

					if(getPanelLength < 1) {

						$("#"+getSortableTabQuickData+"").remove();


						if(getSortableTabQuickData == "quickAccessCollab") {
							launcherIcon = panelQuickLaunchCollabBtn;
						} else if(getSortableTabQuickData == "quickAccessChat") {
							launcherIcon = panelQuickLaunchChatBtn;
						} else if(getSortableTabQuickData == "quickAccessComments") {
							launcherIcon = panelQuickLaunchCommentBtn;
						} else if(getSortableTabQuickData == "quickAccessOutline") {
							launcherIcon = panelQuickLaunchOutlineBtn;
						} else if(getSortableTabQuickData == "quickAccessExplorer") {
							launcherIcon = panelQuickLaunchExplorerBtn;
						} else if(getSortableTabQuickData == "quickAccessCommit") {
							launcherIcon = panelQuickLaunchCommitBtn;
						} else if(getSortableTabQuickData == "quickAccessSearch") {
							launcherIcon = panelQuickLaunchSearchBtn;
						} else if(getSortableTabQuickData == "quickAccessDebug") {
							launcherIcon = panelQuickLaunchDebugBtn;
						} else if(getSortableTabQuickData == "quickAccessConsole") {
							launcherIcon = panelQuickLaunchConsoleBtn;
						}  else if(getSortableTabQuickData == "quickAccessProblem") {
							launcherIcon = panelQuickLaunchProblemBtn;
						}

					}

					// If there is no tab in the bottom Panel and if we drop a tab into that it will trigger
					if($(event.target).hasClass("zc-panelX")) {

						if(launcherIcon != "") {
							$(".quickAccessBottom").append(launcherIcon);
							$("#"+getSortableTabQuickData+"").css("display", "block");

						}

						$(".zc-ideContainer").addClass("zc-showPanelX");
						$(".zc-ideContainer").removeClass("zc-newPanelX");
						$(".zc-ideContainer").removeClass("zc-showPanelXPartial");
					} else { 

						if(bottomPanelAvailablity == false) {
							$(".zc-ideContainer").removeClass("zc-showPanelX");
							$(".zc-ideContainer").removeClass("zc-newPanelX");
							$(".zc-ideContainer").removeClass("zc-showPanelXPartial")
						}

					}

					// If there is no tab in the right Panel and if we drop a tab into that it will trigger
					if($(event.target).hasClass("zc-panelRight")) {

						if(launcherIcon != "") {
							$(".quickAccessRight").append(launcherIcon);
							$("#"+getSortableTabQuickData+"").css("display", "block");
						}

						$(".zc-ideContainer").addClass("zc-showPanelRight");
						$(".zc-ideContainer").removeClass("zc-newPanelRight");
						$(".zc-ideContainer").removeClass("zc-showPanelRightPartial");

					}  else {
						if(rightPanelAvailablity == false) {				
							$(".zc-ideContainer").removeClass("zc-showPanelRight");
							$(".zc-ideContainer").removeClass("zc-newPanelRight");
							$(".zc-ideContainer").removeClass("zc-showPanelRightPartial");
						}
					}


					// If there is no tab in the LEft Panel and if we drop a tab into that it will trigger
					if($(event.target).hasClass("zc-panelLeft")) {
					
						if(launcherIcon != "") {
							$(".quickAccessLeft").append(launcherIcon);
							$("#"+getSortableTabQuickData+"").css("display", "block");
						}

						$(".zc-ideContainer").addClass("zc-showPanelLeft");
						$(".zc-ideContainer").removeClass("zc-newPanelLeft");
						$(".zc-ideContainer").removeClass("zc-showPanelLeftPartial");
					}  else {
						if(leftPanelAvailablity == false) {
							$(".zc-ideContainer").removeClass("zc-showPanelLeft");
							$(".zc-ideContainer").removeClass("zc-newPanelLeft");
							$(".zc-ideContainer").removeClass("zc-showPanelLeftPartial");
						}
					}


					/* ReCall the Panel Tab Contextual menu function after sorting completed */	
					//					panelRightContextMenu();  
					//					panelLeftContextMenu();
					//					panelBottomContextMenu();
					//					panelUndockContextMenu()

				}

			});
		}
		panelDroppable();

		/* Increase Undockable count */

		var undockId = 0, undockedPanel;

		/* If tab is  dropped in the editor area */
		$( ".right-pane" ).droppable({
			accept: ".zc-tab",
			greedy: false,
			tolerance: "fit",
	
			drop: function( event, ui ) {
    
				console.log("dropped in right pane");
				console.log($(event.target));
				undockId = undockId + 1;

				undockedPanel = "undockble-"+undockId+"";

				console.log(undockedPanel);
				// This is Temp

				if($(".right-pane").hasClass("skipFunction")) {
					console.log("drop is skipped for right pane");
				} else {
					console.log("dropped");

					var getWindowHeight = $(window).height(),
						getDroppedPositionX = event.pageX + 100,
						getDroppedPositionY = event.pageY - 80,
						setPanelHeight = (getWindowHeight - event.pageY) - 20;


					console.log(event.pageY);
					console.log(getWindowHeight);


					/* Create undockpanel */
					var createUndockPanel = '<div id='+ undockedPanel +' class="zc-panel zc-undockPanel" style="top:'+getDroppedPositionY+'px; left:'+getDroppedPositionX+'px; height:550px;">\
<div class="zc-draggableHeader"></div>\
<div id="" class="zc-tabs zc-tabSort zc-tabConnect zc-tabsdraggable ">\
<span class="zc-dropPosHelper"></span>\
<div class="zc-panelAction">\
<button class="zc-btn zc-btn-small icon zc-panelClose" title="Close Panel Group">\
<i class="icon-9">\
<svg> <use xlink:href="#svg-close-icon"> </use> </svg>\
</i>\
</button>\
</div>\
</div>\
<div class="zc-tabContentContainer"></div>\
</div>';

					$(".zc-ideContainer").append(createUndockPanel);

					panelDroppable();

					dropped = $("#"+undockedPanel).find(".zc-tabs");
					dropped.find('.zc-tab').removeClass("active");
					$('.zc-sortableTab').addClass("active");
					$("#"+undockedPanel).find(".zc-tabs").addClass("droppable");

					/* Tab Which dropped here will be moved to tabs */
					getSortableTab = $(".zc-tabs").find('.zc-sortableTab').html();
					getSortableTabId = $(".zc-tabs").find('.zc-sortableTab').attr("id");
					getSortableTabData = $(".zc-tabs").find('.zc-sortableTab').attr("data-tab");
					getSortableTabQuickData = $(".zc-tabs").find('.zc-sortableTab').attr("data-quick");
					getSortableTabTitle = $(".zc-tabs").find('.zc-sortableTab').find(".zc-iconText").text();
					getSortableTabContent = $("#"+getSortableTabData+"").prop('outerHTML');

					setNewTab = '<span id="'+getSortableTabId+'" data-tab="'+getSortableTabData+'" data-quick="'+getSortableTabQuickData+'" class="zc-tab zc-currentActiveTab active" title="'+getSortableTabTitle+'">'+ getSortableTab +'</span>';

					$("#"+undockedPanel).css("display", "block");

					$("#"+undockedPanel).find('.zc-tabContentContainer').append(getSortableTabContent);

					/* Set active tab content */
					$("#"+undockedPanel).find(".zc-tabContent").css("display", "none");
					$("#"+undockedPanel).find("#"+getSortableTabData+"").css("display", "block");
					$(".currentActivePanel .zc-tabContentContainer").find("#"+getSortableTabData+"").remove();

					$("#"+undockedPanel).find(".zc-tabs").append(setNewTab);



					// Active Prev or next tab based on the tab avaliable
					
					var nextTabCountInCurrentActivePanel = $(".currentActivePanel .zc-sortableTab").nextAll(".zc-tab:visible").length;

					if(nextTabCountInCurrentActivePanel < 1) {
						$(".currentActivePanel .zc-sortableTab").prevAll(".zc-tab:visible").not( ".ui-sortable-placeholder, .sortable-placeholder" ).last(".zc-tab").trigger("mousedown");
					} else {
						$(".currentActivePanel .zc-sortableTab").nextAll(".zc-tab:visible").not( ".ui-sortable-placeholder, .sortable-placeholder" ).first(".zc-tab").trigger("mousedown");
					}


					$(".currentActivePanel .zc-sortableTab").remove();
					$(".dropPanel").find(".zc-tab").removeClass("zc-sortableTab");
					$("#"+undockedPanel).find('.zc-tabs').removeClass("dropPanel");

					/* Remove icon from launcher if its undockable */
					$("#"+getSortableTabQuickData).remove();

					console.log(getSortableTabId);
					/* Reint project explorer */  
					if(getSortableTabId == "explorerTab") {

						initProjectExplorer();
						loadProjects();
						$("#projExptree").fancytree("getRootNode").visit(function (node) {
							node.setExpanded(true);
						});
						$(".fancytree-level-1 .fancytree-title").empty().append("Document Mangement System");
					}

					checkPanelWidthOnQuickPanelClick(".zc-undockPanel");

					tabDroppable();

					sortableFunction();

				}

				/* Recall the undock panel drag and resize */
				undockDradResize();



				/* ReCall the Panel Tab Contextual menu function after sorting completed */	
				//				panelRightContextMenu();  
				//				panelLeftContextMenu();
				//				panelBottomContextMenu();
				//				panelUndockContextMenu();
			}
		});
	}

	//Init Tab & Panel  Droppable
	tabPanel_Droppable();



	// Dock panel Draggagable and Resizable
	var undockDradResize = function() {
		$( ".zc-undockPanel" ).draggable({
			handle: ".zc-draggableHeader, .zc-tabsdraggable",
			cancel: ".zc-tab, .zc-panelClose",
			containment: "#zc-ide",
			scroll: false,
			start: function( event, ui ) {
				$(".zc-undockPanel").css("z-index","99");
				$(this).css("z-index","9999");
			},
			stop: function( event, ui ) {
				$(".zc-undockPanel").css("z-index","1000");
				$(this).css("z-index","9999");
			}
		}).resizable({
			minWidth: 380,
			resize: function(event, ui) {
				checkPanelWidthOnQuickPanelClick(".zc-undockPanel");		
			}
		});
	}
	undockDradResize();

	// Quick launcher sortable function
	launcher_sortable = function() {

		$( ".quickAccessSortList" ).sortable({
			cancel: '',
			scroll: false,
			tolerance: "intersect",
			connectWith: ".quickAccessSort",
			//placeholder: "sortable-placeholder",
			helper: "clone",
			appendTo: document.body,
			zIndex: 9999,
			cursor: "grabbing",
			cursorAt: { top: 22 },
			start: function( event, ui ) {
				$(ui.helper).addClass("launcherIcon-helper");
				$('.quickAccessGroup').removeClass("currentQuickLaunch");
				ui.item.parent('.quickAccessGroup').addClass("currentQuickLaunch");
			},
			stop: function( event, ui ) {
				var getSortableId = ui.item.attr("id"),
					getUiSortableIndex = ui.item.index(),
					getGroupClass = $("#"+getSortableId+"").parent(".quickAccessGroup"),
					getPanelTab = $("[data-quick="+getSortableId+"]").prop('outerHTML'),
					getTabContentId = $("[data-quick="+getSortableId+"]").attr("data-tab"),
					getPanelTabContent = $("#"+getTabContentId+"").prop('outerHTML');
				console.log(getGroupClass);
				console.log(getUiSortableIndex);

				//REMOVE THE MOVED TAB AND ITS CONTENT
				$("[data-quick="+getSortableId+"]").remove();
				$("#"+getTabContentId+"").remove();
				


				//Tab Active when launcher moved from one panel to other panel

				if($(".currentQuickLaunch").closest('.custom-pane').hasClass('custom-paneRight')) {
					$(".zc-panelRight .zc-tabs .zc-tab").eq(0).trigger("click");
				} else if($(".currentQuickLaunch").closest('.custom-pane').hasClass('custom-paneLeft')) {
					$(".zc-panelLeft .zc-tabs .zc-tab").eq(0).trigger("click");
				} else if($(".currentQuickLaunch").closest('.custom-paneBar').hasClass('custom-PaneBottom')) {
					$(".zc-panelX .zc-tabs .zc-tab").eq(0).trigger("click");
				}




				//Append the moved the laucher Panel and panel tab content 

				if(getGroupClass.hasClass('quickAccessLeft')) {

					var appendBeforeAction = $(".zc-panelLeft").find('.zc-tabs').find('.zc-panelAction');

					/* Ordering of the tab based on positon of the quick launcher bar */
					if(getUiSortableIndex == 0) {
						$(".zc-panelLeft .zc-tabs").prepend(getPanelTab);
					} else {
						$(".zc-panelLeft .zc-tab:nth-child("+getUiSortableIndex+")").after(getPanelTab);
					}

					checkPanelWidthOnQuickPanelClick(".zc-panelLeft");

					// To mave active of the dropped launcher tab

					//$(".zc-panelLeft .zc-tab").removeClass("active");
					$(".zc-panelLeft").find("[data-quick='" + getSortableId + "']").removeClass("active");
					$(".zc-panelLeft").find('.zc-tabContentContainer').append(getPanelTabContent);

					var getTabContent  = $(".zc-panelLeft").find("[data-quick='" + getSortableId + "']").attr("data-tab");

					//	$(".zc-panelLeft .zc-tabContent").css("display", "none");

					$("#"+getTabContentId+"").css("display", "none");
				}

				else if (getGroupClass.hasClass('quickAccessRight')) {

					var appendBeforeAction = $(".zc-panelRight").find('.zc-tabs').find('.zc-panelAction');

					/* Ordering of the tab based on positon of the quick launcher bar */
					if(getUiSortableIndex == 0) {
						$(".zc-panelRight .zc-tabs").prepend(getPanelTab);
					} else {
						$(".zc-panelRight .zc-tab:nth-child("+getUiSortableIndex+")").after(getPanelTab);
					}

					checkPanelWidthOnQuickPanelClick(".zc-panelRight");

					// To mave active of the dropped launcher tab
					//$(".zc-panelRight .zc-tab").removeClass("active");
					$(".zc-panelRight").find("[data-quick='" + getSortableId + "']").removeClass("active");
					$(".zc-panelRight").find('.zc-tabContentContainer').append(getPanelTabContent);

					var getTabContent  = $(".zc-panelRight").find("[data-quick='" + getSortableId + "']").attr("data-tab");

					// $(".zc-panelRight .zc-tabContent").css("display", "none");

					$("#"+getTabContentId+"").css("display", "none");

				}

				else if (getGroupClass.hasClass('quickAccessBottom')) {

					var appendBeforeAction = $(".zc-panelX").find('.zc-tabs').find('.zc-panelAction');

					/* Ordering of the tab based on positon of the quick launcher bar */
					if(getUiSortableIndex == 0) {
						$(".zc-panelX .zc-tabs").prepend(getPanelTab);
					} else {
						$(".zc-panelX .zc-tab:nth-child("+getUiSortableIndex+")").after(getPanelTab);
					}

					checkPanelWidthOnQuickPanelClick(".zc-panelX");
					// To mave active of the dropped launcher tab
					//$(".zc-panelX .zc-tab").removeClass("active");
					$(".zc-panelX").find("[data-quick='" + getSortableId + "']").removeClass("active");
					$(".zc-panelX").find('.zc-tabContentContainer').append(getPanelTabContent);

					var getTabContent  = $(".zc-panelX").find("[data-quick='" + getSortableId + "']").attr("data-tab");

					//	$(".zc-panelX .zc-tabContent").css("display", "none");

					$("#"+getTabContentId+"").css("display", "none");

				}

				panelClose();

				/* Reint project explorer */  
				if(getTabContentId == "zc-explorerTabContent") {
					initProjectExplorer();
					loadProjects();
					$("#projExptree").fancytree("getRootNode").visit(function (node) {
						node.setExpanded(true);
					});
				}



			}

		}).disableSelection();

	}

	//Init  Quick launcher sortable
	launcher_sortable();


	// Quick access icon button click
	$(document).on("click", ".zc-quickAccessBar li", function() {

		var _this = $(this);

		_this.siblings("li").removeClass("active");
		_this.addClass("active");

		if(_this.is("#quickAccessCollab")) {

			quickAccessTabSwitch("collabTab");

		} else if(_this.is("#quickAccessChat")) {

			quickAccessTabSwitch("chatTab");

		} else if(_this.is("#quickAccessComments")) {

			quickAccessTabSwitch("commentTab");

		}  else if(_this.is("#quickAccessOutline")) {

			quickAccessTabSwitch("outlineTab");

		} else if(_this.is("#quickAccessDebug")) {

			quickAccessTabSwitch("debugTab");

		} else if(_this.is("#quickAccessConsole")) {

			quickAccessTabSwitch("consoleTab");

		} else if(_this.is("#quickAccessProblem")) {

			quickAccessTabSwitch("problemsTab");

		} else if(_this.is("#quickAccessExplorer")) {

			quickAccessTabSwitch("explorerTab");

		} else if(_this.is("#quickAccessCommit")) {

			quickAccessTabSwitch("commitTab");

		} else if(_this.is("#quickAccessSearch")) {

			quickAccessTabSwitch("searchTab");

		}
	});


	// Panel tab click
	$(document).on("mousedown",".zc-panel .zc-tabs .zc-tab", function() {

		var _this = $(this), getActiveTabPanel, getActiveTab, getActiveTabContent, getCurrentPanel;
		
		
		getCurrentPanel = _this.closest(".zc-panel");
		console.log(getCurrentPanel);
		getActiveTabPanel = _this.parent(".zc-tabs");
		getActiveTabPanel.find(".zc-tab").removeClass("active");
		_this.addClass("active");

		getActiveTab = _this.attr("id");
		getActiveTabContent = $("#"+getActiveTab+"").attr("data-tab");
		getQuickLauncherId = $("#"+getActiveTab+"").attr("data-quick");

		$("#"+getActiveTab+"").parent(".zc-tabs").next(".zc-tabContentContainer").find(".zc-tabContent").hide();
		$("#"+getActiveTabContent+"").show();

		$("#"+getQuickLauncherId).closest("li").siblings("li").removeClass("active");
		$("#"+getQuickLauncherId).closest("li").addClass("active");
		
		if(getCurrentPanel.hasClass('zc-panelRight')) {
			checkPanelWidthOnQuickPanelClick(".zc-panelRight");

		} else if(getCurrentPanel.hasClass("zc-panelLeft")) {
			checkPanelWidthOnQuickPanelClick(".zc-panelLeft");

		} else if(getCurrentPanel.hasClass("zc-panelX")) {

			checkPanelWidthOnQuickPanelClick(".zc-panelX");

		} else if(getCurrentPanel.hasClass("zc-undockPanel")) {
		 
	
		 	checkPanelWidthOnQuickPanelClick(".zc-undockPanel");
	

		} 
		
	});


	// Panel tab close
	$(document).on("click", ".zc-panel .tab-close i", function(event) {

		event.stopPropagation();

		var _this = $(this),
			parentTab = _this.parent(".tab-close").parent(".zc-tab"),
			nextTabCount = _this.parent(".tab-close").parent(".zc-tab").nextAll(".zc-tab:visible").length,
			getTabId = parentTab.attr('id');

		// Add as current active panel if click close		
		$('.zc-panel').removeClass("currentActivePanel");
		_this.closest(".zc-tabs").parent(".zc-panel").addClass("currentActivePanel");

		/* This check can be used to trigger prev or next tab on current tab close. 
						If next available then trigger next else trigger prev */

		if(parentTab.hasClass("active")) {

			if(nextTabCount < 1) {
				_this.parent(".tab-close").parent(".zc-tab").prev(".zc-tab").trigger("click");
			} else {
				_this.parent(".tab-close").parent(".zc-tab").next(".zc-tab").trigger("click");
			}

			parentTab.css("display", "none");			

		} else {
			parentTab.css("display", "none");

		}

		// Remove from launcher if this close tab launcher button is (not keep in launcher) 
		if($('[data-tab='+getTabId+']').hasClass('zc-keepLauncherStatus')) {
			$('[data-tab='+getTabId+']').remove();
		}

		checkPanelWidthOnMenuClick();  

		panelClose();

	});


	// Panel settings button click
	$(document).on("click", ".zc-panelMoreAction", function() {
		var _this = $(this);

		$(".zc-panel .zc-tabs").removeClass("zc-currentTabs");
		_this.parent('.zc-panelAction').parent('.zc-tabs').addClass("zc-currentTabs");

		$(".zc-panel").removeClass("zc-currentPanel");
		$(".zc-currentTabs").parent('.zc-panel').addClass("zc-currentPanel");

	});


	// Panel Close 
	$(document).on("click", ".zc-panelClose", function() {

		var getTabPanel = $(this).closest(".zc-panel");



		if(getTabPanel.hasClass("zc-panelRight")) {

			$(".zc-ideContainer").removeClass("zc-showPanelRight");

			$(".quickAccessRight li").removeClass("active");

		} else if(getTabPanel.hasClass("zc-panelLeft")) {

			$(".zc-ideContainer").removeClass("zc-showPanelLeft");

			$(".quickAccessLeft li").removeClass("active");

		} else if(getTabPanel.hasClass("zc-panelX")) {

			$(".zc-ideContainer").removeClass("zc-showPanelX");
			$(".quickAccessBottom li").removeClass("active");

		} else if(getTabPanel.hasClass("zc-undockPanel")) {
			var getUndockPanelID = $(this).closest(".zc-undockPanel").attr('id');
			$("#"+getUndockPanelID).css("display", "none");
		}  

	});

	// Panel settings menu click
	$("#zc-ide").on("zmenuitemclick", function(event, data) {
		var _this = data.menuitem,
			getItemId = _this.attr('id'),
			target = $(event.originalTarget),
			getMenuText = _this.find(".zmenu__text").text();
		console.log(getItemId);
		console.log(_this[0].classList[0]);



		if(getMenuText == "Icon Only"){
			$(".zc-currentTabs").removeClass("zc-textOnlyTab zc-iconTextTab");
			$(".zc-currentTabs").addClass("zc-iconOnlyTab");
			$(".zc-currentTabs").find(".zc-tab").css("width", "auto");
			$(".zc-currentTabs").find(".zc-tab").removeClass("zc-tabTruncate");
			$(".zc-currentTabs").removeClass("zc-iconOnlyTruncate");

			if($(".zc-currentPanel").hasClass("zc-panelLeft")) {
				$("#ide-leftTabStyle").zmenu("setMenuItemsAttribute", ["#leftMenuIconOnly"], "checked", true);
				$("#ide-leftTabStyleContext").zmenu("setMenuItemsAttribute", ["#leftContextMenuIconOnly"], "checked", true);
			} else if($(".zc-currentPanel").hasClass("zc-panelRight")) {
				$("#ide-tabStyle").zmenu("setMenuItemsAttribute", ["#rightMenuIconOnly"], "checked", true);
				$("#ide-tabStyleContext").zmenu("setMenuItemsAttribute", ["#rightContextMenuIconOnly"], "checked", true);
			} else if($(".zc-currentPanel").hasClass("zc-panelX")) {
				$("#ide-bottomTabStyle").zmenu("setMenuItemsAttribute", ["#bottomMenuIconOnly"], "checked", true);
				$("#ide-bottomTabStyleContext").zmenu("setMenuItemsAttribute", ["#bottomContextMenuIconOnly"], "checked", true);
			}


		}

		else if(getMenuText == "Text Only"){
			$(".zc-currentTabs").removeClass("zc-iconOnlyTab zc-iconTextTab");
			$(".zc-currentTabs").addClass("zc-textOnlyTab");
			checkPanelWidthOnQuickPanelClick('.zc-currentPanel');

			if($(".zc-currentPanel").hasClass("zc-panelLeft")) {
				$("#ide-leftTabStyle").zmenu("setMenuItemsAttribute", ["#leftMenuTextOnly"], "checked", true);
				$("#ide-leftTabStyleContext").zmenu("setMenuItemsAttribute", ["#leftContextMenuTextOnly"], "checked", true);
			} else if($(".zc-currentPanel").hasClass("zc-panelRight")) {
				$("#ide-tabStyle").zmenu("setMenuItemsAttribute", ["#rightMenuTextOnly"], "checked", true);
				$("#ide-tabStyleContext").zmenu("setMenuItemsAttribute", ["#rightContextMenuTextOnly"], "checked", true);
			} else if($(".zc-currentPanel").hasClass("zc-panelX")) {
				$("#ide-bottomTabStyle").zmenu("setMenuItemsAttribute", ["#bottomMenuTextOnly"], "checked", true);
				$("#ide-bottomTabStyleContext").zmenu("setMenuItemsAttribute", ["#bottomContextMenuTextOnly"], "checked", true);
			}
		}

		else if(getMenuText == "Icon and Text"){
			$(".zc-currentTabs").removeClass("zc-iconOnlyTab zc-textOnlyTab");
			$(".zc-currentTabs").addClass("zc-iconTextTab");
			checkPanelWidthOnQuickPanelClick('.zc-currentPanel');

			if($(".zc-currentPanel").hasClass("zc-panelLeft")) {
				$("#ide-leftTabStyle").zmenu("setMenuItemsAttribute", ["#leftMenuIconText"], "checked", true);
				$("#ide-leftTabStyleContext").zmenu("setMenuItemsAttribute", ["#leftContextMenuIconText"], "checked", true);
			} else if($(".zc-currentPanel").hasClass("zc-panelRight")) {
				$("#ide-tabStyle").zmenu("setMenuItemsAttribute", ["#rightMenuIconText"], "checked", true);
				$("#ide-tabStyleContext").zmenu("setMenuItemsAttribute", ["#rightContextMenuIconText"], "checked", true);
			} else if($(".zc-currentPanel").hasClass("zc-panelX")) {
				$("#ide-bottomTabStyle").zmenu("setMenuItemsAttribute", ["#bottomMenuIconText"], "checked", true);
				$("#ide-bottomTabStyleContext").zmenu("setMenuItemsAttribute", ["#bottomContextMenuIconText"], "checked", true);
			}
		}

		else if(getMenuText == "Keep in Launcher"){
			$(".zc-quickAccessBar li.currentLauncher").removeClass("zc-keepLauncherStatus");	
			$(".zc-quickAccessBar li.currentLauncher").off(".keepLaunch");
			//	removeFromLauncherMenu();
			var getTab = $(".currentLauncher").attr("data-tab");
			$("#"+getTab+"").removeClass("zc-keepLauncherStatus");

		} 
		

		
		//--//

		else if($.trim(_this[0].classList[0]) == "zc-quickLaunchRemove"){

			var getTab = $(".currentLauncher").attr("data-tab"),
				getTabLength = $("#"+getTab+":visible").length;

			if(getTabLength == 1){
				$(".currentLauncher").addClass("zc-keepLauncherStatus");
				//addToLauncherMenu();
			} else {
				$(".zc-quickAccessBar li.currentLauncher").css("display", "none");
			}

			$("#"+getTab+"").addClass("zc-keepLauncherStatus");
		} 


		else if($.trim(_this[0].classList[1]) == "zc-addTabLauncher") {
			getTabId = $(".currentTabLauncher").attr('id');

			$(".zc-quickAccessBar li.currentLauncher").off(".keepLaunch");
			$(".currentTabLauncher").removeClass('zc-keepLauncherStatus');


			if(getTabId == "commitTab") {

				var getPanelLength = $("#quickAccessCommit:visible").length;
				if(getPanelLength >= 1) {
					$('[data-tab='+getTabId+']').removeClass("zc-keepLauncherStatus");
				} else {
					$(".quickAccessSortList").append(panelQuickLaunchCommitBtn);
				}

			} else if(getTabId == "collabTab") {

				var getPanelLength = $("#quickAccessCollab:visible").length;
				if(getPanelLength >= 1) {
					$('[data-tab='+getTabId+']').removeClass("zc-keepLauncherStatus");
				} else {
					$(".quickAccessSortList").append(panelQuickLaunchCollabBtn);
				}

			} else if(getTabId == "chatTab") {

				var getPanelLength = $("#quickAccessChat:visible").length;
				if(getPanelLength >= 1) {
					$('[data-tab='+getTabId+']').removeClass("zc-keepLauncherStatus");
				} else {
					$(".quickAccessSortList").append(panelQuickLaunchChatBtn);
				}	


			} else if(getTabId == "commentTab") {

				var getPanelLength = $("#quickAccessComments:visible").length;
				if(getPanelLength >= 1) {
					$('[data-tab='+getTabId+']').removeClass("zc-keepLauncherStatus");
				} else {
					$(".quickAccessSortList").append(panelQuickLaunchCommentBtn);
				}	

			} else if(getTabId == "outlineTab") {

				var getPanelLength = $("#quickAccessOutline:visible").length;
				if(getPanelLength >= 1) {
					$('[data-tab='+getTabId+']').removeClass("zc-keepLauncherStatus");
				} else {
					$(".quickAccessSortList").append(panelQuickLaunchOutlineBtn);
				}	


			} else if(getTabId == "debugTab") {

				var getPanelLength = $("#quickAccessDebug:visible").length;
				if(getPanelLength >= 1) {
					$('[data-tab='+getTabId+']').removeClass("zc-keepLauncherStatus");
				} else {
					$(".quickAccessSortList").append(panelQuickLaunchDebugBtn);
				}	


			} else if(getTabId == "explorerTab") {

				var getPanelLength = $("#quickAccessExplorer:visible").length;
				if(getPanelLength >= 1) {
					$('[data-tab='+getTabId+']').removeClass("zc-keepLauncherStatus");
				} else {
					$(".quickAccessSortList").append(panelQuickLaunchExplorerBtn);
				}	

			} else if(getTabId == "consoleTab") {

				var getPanelLength = $("#quickAccessConsole:visible").length;
				if(getPanelLength >= 1) {
					$('[data-tab='+getTabId+']').removeClass("zc-keepLauncherStatus");
				} else {
					$(".quickAccessSortList").append(panelQuickLaunchConsoleBtn);
				}	

			} else if(getTabId == "problemsTab") {

				var getPanelLength = $("#quickAccessProblem:visible").length;
				if(getPanelLength >= 1) {
					$('[data-tab='+getTabId+']').removeClass("zc-keepLauncherStatus");
				} else {
					$(".quickAccessSortList").append(panelQuickLaunchProblemBtn);
				}	

			} else if(getTabId == "searchTab") {

				var getPanelLength = $("#quickAccessSearch:visible").length;
				if(getPanelLength >= 1) {
					$('[data-tab='+getTabId+']').removeClass("zc-keepLauncherStatus");
				} else {
					$(".quickAccessSortList").append(panelQuickLaunchSearchBtn);
				}	

			}

			//	removeFromLauncherMenu();
		}

		else if($.trim(_this[0].classList[1]) == "zc-removeTabLancher") {
			console.log($('[data-tab='+getTabId+']'));
			var getTabId = $(".currentTabLauncher").attr('id');
			$('[data-tab='+getTabId+']').hide();
			$(".currentTabLauncher").addClass("zc-keepLauncherStatus");
			//addToLauncherMenu();
			// $(".currentTabLauncher").removeClass('zc-keepLauncherStatus');
		}

		else if($.trim(_this[0].classList[0]) == "zc-closeTab") {

			var getTabId = $(".currentTabLauncher").attr("id");

			$(".currentTabLauncher .tab-close i").trigger("click");
			checkPanelWidthOnQuickPanelClick('.zc-currentPanel');

			// Remove from launcher if this close tab launcher button is (not keep in launcher) 
			if($('[data-tab='+getTabId+']').hasClass('zc-keepLauncherStatus')) {
				$('[data-tab='+getTabId+']').remove();
			}

		}

		else if(_this.is("#savedLauncher-CloseBtn")) {

			var getTabId = $(".currentTabLauncher").attr("id");

			$(".currentTabLauncher").hide();
			checkPanelWidthOnQuickPanelClick('.zc-currentPanel');

			// Close from launcher. This launcher is saved so close tab panel only not launcher
			$("#"+getDataTabId+" .tab-close i").trigger("click");

		}

		else if(_this.is("#unsavedLauncher-CloseBtn")) {

			var getTabId = $(".currentTabLauncher").attr("id");

			$(".currentTabLauncher").hide();
			checkPanelWidthOnQuickPanelClick('.zc-currentPanel');

			// Close from launcher. This launcher is unsaved so close tab panel as well as the launcher button
			$("#"+getDataTabId+" .tab-close i").trigger("click");

			$(".currentTabLauncher").remove();

		} else if(_this.is("#rightContextClosePanel")) {
			$(".zc-ideContainer").removeClass("zc-showPanelRight");		
		}

		else if(_this.is("#leftContextClosePanel")) {
			$(".zc-ideContainer").removeClass("zc-showPanelLeft");		
		}

		else if(_this.is("#bottomContextClosePanel")) {
			$(".zc-ideContainer").removeClass("zc-showPanelX");		
		}


	});


	/* HIDE AND SHOW THE TITLE ON HOVER */


	$(document).on("mouseenter", ".zc-tabs .zc-tab", function(){

		var getParentClass = $(this).parent('.zc-tabs');

		if(!getParentClass.hasClass('zc-iconOnlyTab')) {
			// Get the current title
			var title = $(this).attr("title");

			// Set it as Temp Title
			$(this).attr("temp_title", title);

			// Set the title to Empty
			$(this).attr("title","");

			$(".zc-tabs .zc-tab").removeClass("tabHovered");
			$(this).addClass("tabHovered");

			$(".zc-tabs .sortable-placeholder").remove();
			$('<span class="sortable-placeholder"></span>').insertAfter(".tabHovered");
		}

		if($(this).closest(".zc-panel").hasClass("currentActivePanel")) {
			$("body").addClass("zc-removehelperPanel");
		} else {
			$("body").removeClass("zc-removehelperPanel");
		}

	});

	$(document).on("mouseleave", ".zc-tabs .zc-tab", function(){

		// Retrieve title from the temporary attr
		var title = $(this).attr("temp_title");

		// Set the title 
		$(this).attr("title", title);

	});

	$(document).on("mouseenter", ".zc-tabs .zc-tabTruncate", function(){

		// Retrieve title from the temporary attr
		var title = $(this).attr("temp_title");

		// Set the title 
		$(this).attr("title", title);

	});

	$(document).on("mouseenter", ".zc-iconOnlyTruncate .zc-tab", function(){

		// Retrieve title from the temporary attr
		var title = $(this).attr("temp_title");

		// Set the title 
		$(this).attr("title", title);

	});

	$(document).on("mouseenter", ".zc-iconOnlyTab .zc-tab", function(){

		// Retrieve title from the temporary attr
		var title = $(this).attr("title");

		// Set the title 
		$(this).attr("title", title);

	});



	// Add and Remove SkipFunction for right panel
	$(document).on("mouseenter", ".zc-panel", function(){
		$(".right-pane").addClass("skipFunction");
		$(".zc-panelClone").css({"opacity":"0.5"});
	});

	$(document).on("mouseleave", ".zc-panel", function(){
		$(".right-pane").removeClass("skipFunction");
		$(".zc-panelClone").css({"opacity":"1"});
	});


	$(document).on("click", ".zc-undockPanel", function() {
		$(".zc-undockPanel").css("z-index","99");
		$(this).css("z-index","9999");
	});




});