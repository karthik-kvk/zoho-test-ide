var aceEditorHeightUpdate, editor, htmlEditor, javaEditor, getTheme = "",
	getSelectedFont = "",
	getFontSize = "",
	getCommentStyle = "",
	localSyntaxTheme, localSelectedFont, localFontSize, localCommentStyle, initProjectExplorer, loadProjects, panelStates, setPanelStates;

var editorThemes = {
	'white': ['crimson_editor', 'dawn', 'eclipse', 'xcode'],
	'grey': ['ambiance', 'gruvbox', 'idle_fingers', 'monokai', 'tomorrow_night_eighties']
};


$(document).ready(function () {

	// EDITOR OPENING STATE
	$("#application-tab").addClass("tab-active");
	$("#gettingStarted-tab, #findReplace-tab").css("display", "none");

	// Editor Panel  Maintain User State 
	window.addEventListener("beforeunload", function (e) {

		var editorContainer = $(".zc-ideContainer");
		var leftPanelState,
			rightPanelState,
			bottomPanelState;

		// Check for Left Panel States
		if (editorContainer.hasClass('zc-showPanelLeft')) {
			leftPanelState = true;
		} else {
			leftPanelState = false;
		}

		// Check for Right Panel States
		if (editorContainer.hasClass('zc-showPanelRight')) {
			rightPanelState = true;
		} else {
			rightPanelState = false;
		}

		// Check for Bottom Panel States
		if (editorContainer.hasClass('zc-showPanelX')) {
			bottomPanelState = true;
		} else {
			bottomPanelState = false;
		}

		//Store Panel states in a variable to access editor on load
		panelStates = {
			leftPanel: leftPanelState,
			rightPanel: rightPanelState,
			bottomPanel: bottomPanelState
		};

		localStorage.setItem("setPanelStates", JSON.stringify(panelStates));

	});

	/*---- Editor Panel  Maintain User State End Here ----*/
	ace_editor_init();

	//INIT ZMENU 
	ZComponents.init();
	$('#zc-ideMenubar').zmenubar();

	// INIT TOOLTIP
	$("body").ztooltip({
		pointer: false,
	});

	$('#ide-tab-sortable').ztooltip({
		pointer: false,
		showDelay: 2000,
		reshowDelay: 800,
	});

	$(".custom-PaneBottom").ztooltip({
		position: "top",
		showDelay: 600,
		reshowDelay: 800,
	});



	// INIT COLLAPSIABLE PANEL

	function handleExpandCollapse(event) {
		if (event.originalTarget && $(event.originalTarget).closest(".zc-manageConfigAction").length) {
			return false;
		}
	}

	// STATUS BAR COLLAPISBLE PANELS 

	// Debugger Panel collapse
	$("#zc-variablePanelCollapse,#zc-threadPanelCollapse,#zc-breakpointPanelCollapse").zcollapsiblepanel({
		collapseSVGIconId: "svg-arrowRight-icon",
		expandSVGIconId: "svg-arrowRight-icon",
		toggleOnHeaderClick: true,
		isActive: false,
		animation: {
			panelexpand: {
				name: "slideDown",
				duration: 100
			},
			panelcollapse: {
				name: "slideUp",
				duration: 100
			}
		}
	});

	// END STATUS BAR COLLAPISBLE PANELS 
	// TATUS BAR COLLAPISBLE PANELS ON CILCK FOCUS AND ACTIVE STATE

	$('.zc-statusInfoItems li').click(function (event) {
		if (event.target === this) {
			$('.zc-statusInfoItems li').removeClass('has-focus has-active')
			$(this).addClass('has-focus has-active');
		}
	});

	$(document).on('click', function (event) {
		if ($(event.target).closest('li').hasClass('has-focus')) {
			//event.stopPropagation();
		} else {
			$('.zc-statusInfoItems li.has-focus').removeClass('has-focus');
		}
	});

	// Debugger --> Breakpoint active/deactive function
	$('.zc-breakpointItems li .zc-checkbox').click(function () {
		if ($(this).is(':checked')) {
			$(this).closest('li').addClass('breakpoint-active');
		} else {
			$(this).closest('li').removeClass('breakpoint-active');
		}
	});


	/* Debugger */
	if (getViewParam == 'empty') {
		$('#zc-variablePanelCollapse .zc-statusInfoItems').html('<h2 class="zc-emptyConsole">No variables.</h2>');
		$('#zc-threadPanelCollapse .zc-statusInfoItems').html('<h2 class="zc-emptyConsole">No threads.</h2>');
		$('#zc-breakpointPanelCollapse .zc-statusInfoItems').html('<h2 class="zc-emptyConsole">No breakpoints.</h2>');
	}

	//---------------------------------------------------------------//
	$('#myPanel').zcollapsiblepanel({
		collapseSVGIconId: "svg-arrowRight-icon",
		expandSVGIconId: "svg-arrowRight-icon",
	});

	$('#zc-manageAdvanceOption-1').zcollapsiblepanel({
		collapseSVGIconId: "svg-arrowRight-icon",
		expandSVGIconId: "svg-arrowRight-icon"
	});
	$('#zc-manageAdvanceOption').zcollapsiblepanel({
		collapseSVGIconId: "svg-arrowRight-icon",
		expandSVGIconId: "svg-arrowRight-icon"
	});

	$('#manageConfigPanels').zcollapsiblepanel({
		collapseSVGIconId: "svg-arrowRight-icon",
		expandSVGIconId: "svg-arrowRight-icon",
		beforepanelcollapse: handleExpandCollapse,
		beforepanelexpand: handleExpandCollapse
	});

	$(document).on("click", ".zc-configEdit-Btn", function (event) {
		$("#manageConfigPanels").hide();
		$("#zc-editConfig").fadeIn();
	});


	$(document).on("click", "#zc-saveConfig", function (event) {
		var getActiveFileTab = $("#consolePane-tabs").children(".tab-active").find(".tab-text").text();

		var isTabavailable = $("#newConfig-tab").length;
		$("#zc-configName").val("");
		$(".zc-createConfigWrap, .zc-manageConfigWrap").addClass("zc-hide");
		$(".zc-runConfig").removeClass("zc-hide");
		if (!(isTabavailable >= 1)) {
			var appendTab = '<li id="newConfig-tab" class="ide-tab">  <span class="tab-text">Run Configuration</span> <span class="tab-close" title="Close"><i class="icon-9"><svg class="zc-grey"> <use xlink:href="#svg-close-icon"> </use> </svg> </i></span></li>'
			$("#ide-tab-sortable").append(appendTab);
			$(".ide-tab-wrap .ide-tab").removeClass("tab-active");
			$(".ide-tab-wrap .ide-tab").removeClass('zc-noTabSeparator');
			$("#newConfig-tab").css("display", "inline-flex").addClass("tab-active");
			$("#newConfig-tab").prevAll(':visible:first').addClass('zc-noTabSeparator');
			$(".zc-editorTabContent").addClass("zc-hide");
			$("#zc-createConfig-template").removeClass("zc-hide");
		} else {
			$("#newConfig-tab").trigger("click");
		}
		$('.zc-manageConfigWrap').removeClass('zc-hide');
		$('.zc-runConfig, .zc-createConfigWrap').addClass('zc-hide');
		$("#zc-manageConfigName").val(getActiveFileTab).select();
		$("#manageConfigSave-btn").attr("id", "zc-createandsave");
		$("#manageConfigDebug-btn").attr("id", "zc-createandsavedebug");
		$("#manageConfigRun-btn").attr("id", "zc-createandsaverun");
		$(".zc-backtoManage").empty().append('<span class="icon"><svg class="zc-black"> <use xlink:href="#svg-back-icon"> </use></svg></span> <span>Go to Configurations  </span>');
		$("#close-bottom-pane").trigger("click");

		if ($(this).hasClass('zc-openFileConfig')) {
			$("#zc-tomacatFile, #zc-JreFile").css("display", "none");
			$("#zc-javaFile").css("display", "block");
		} else {
			$("#zc-tomacatFile, #zc-JreFile").css("display", "block");
			$("#zc-javaFile").css("display", "none");
		}

	});


	/* CUSTOM SCROLL BAR INIT */

	//	$("#projExptree").zscroll({
	//			showOne: true,
	//			scrollend: function(ev, ui){
	//				console.log(ev.type, ui);
	//			},
	//			//Scroll End Y
	//			scrollyend: function(ev, ui){
	//				console.log(ev.type, ui);
	//			}
	//	});

	//	$(".zc-editorTabContent").zscroll({
	//			showOne: true,
	//			scrollend: function(ev, ui){
	//				console.log(ev.type, ui);
	//			},
	//			//Scroll End Y
	//			scrollyend: function(ev, ui){
	//				console.log(ev.type, ui);
	//			}
	//	});
	//	


	// SPLIT BUTON HOVER

	// SPLIT BUTTON 
	$(".zc-split-btn .zc-btn").on("mouseenter", function () {
		$(this).parent('.zc-split-btn').addClass("on-hover");
	});

	$(".zc-split-btn .zc-btn").on("mouseleave", function () {
		$(this).parent('.zc-split-btn').removeClass("on-hover");
	});

});
// WINDOW ONLOAD 

$(window).load(function () {

	// ZOHOCOMPONETS
	ZComponents.init();

	// TREE COMPONENTS
	var treeObj = ["fileExptree", "folderExptree", "uploadExptree", "saveAsExptree", "manageConfigBrowseTree"];

	$.each(treeObj, function (index, value) {
		console.log("#" + value + "");
		$("#" + value + "").fancytree({
			activeVisible: true,
			selectMode: 1,     // 1:single, 2:multi, 3:multi-hier
			clickFolderMode: 4,   // 1:activate, 2:expand, 3:activate and expand, 4:activate (dblclick expands)
			generateIds: true,
			idPrefix: "fileExp_",
			source: [],
			autoScroll: true,
			keyboard: true,
			extensions: ["wide"],
			lazyLoad: function (event, data) {
				data.result = [
					{ "title": "webapps", "folder": true, "svgIcon": "ideFolder", "lazy": true },
					{ "title": "resources", "folder": true, "svgIcon": "ideFolder", "lazy": true },
					{ "title": "customer_resource", "folder": true, "svgIcon": "ideFolder", "lazy": true },
					{ "title": "resources1", "folder": true, "svgIcon": "ideFolder", "lazy": true },

				];
			}
		});

	});


	// NEW FILE TREE
	function loadfileProjects() {
		var projObject = { "branch": "V1", "repotype": "git", "projectType": "java", "behindCount": "2", "aheadCount": "5" };
		rootaddChildren("fileExptree", { "title": "Document Mangement System", "folder": true, "lazy": true, "svgIcon": "ideFolder", "refKey": projObject });
	}

	loadfileProjects();

	// NEW FOLDER TREE
	function loadfolderProjects() {
		var projObject = { "branch": "V1", "repotype": "git", "projectType": "java", "behindCount": "2", "aheadCount": "5" };
		rootaddChildren("folderExptree", { "title": "Document Mangement System", "folder": true, "lazy": true, "svgIcon": "ideFolder", "refKey": projObject });
	}

	loadfolderProjects();

	// UPLOAD FILES
	function loaduploadProjects() {
		var projObject = { "branch": "V1", "repotype": "git", "projectType": "java", "behindCount": "2", "aheadCount": "5" };
		rootaddChildren("uploadExptree", { "title": "Document Mangement System", "folder": true, "lazy": true, "svgIcon": "ideFolder", "refKey": projObject });
	}

	loaduploadProjects();

	// UPLOAD FILES
	function loadConfigBrowseFiles() {
		var projObject = { "branch": "V1", "repotype": "git", "projectType": "java", "behindCount": "2", "aheadCount": "5" };
		rootaddChildren("manageConfigBrowseTree", { "title": "Document Mangement System", "folder": true, "lazy": true, "svgIcon": "ideFolder", "refKey": projObject });
	}

	loadConfigBrowseFiles();


	// SAVE AS TREE
	function loadSaveAsProjects() {
		var projObject = { "branch": "V1", "repotype": "git", "projectType": "java", "behindCount": "2", "aheadCount": "5" };
		rootaddChildren("saveAsExptree", { "title": "Document Mangement System", "folder": true, "lazy": true, "svgIcon": "ideFolder", "refKey": projObject });

		$("#saveAsExptree").fancytree("getRootNode").visit(function (node) {
			node.setExpanded(true);
		});

	}

	loadSaveAsProjects();

	// TOKEN FIELD
	$("#sharedUserName").ztokenfield({
		dataMapping: {
			"value": "email",
			"text": "name",
			"itemIdentifier": "name",
			"informativeText": "email",
			"image": "imageURL"
		},
		placeholder: "Enter name or email address",
		dataSource: {
			"URL": "../json/data.json",
			"type": "GET",
			"dataType": "json",
			success: function (data, params) {
				return {
					"results": data
				}
			}
		},
		isResponseFiltered: false,
		tokens: {
			contentType: "image-text",

		},
		dataValidation: true,
		dropdownList: {
			contentType: "image-text-desc",
			width: 428,
			highlightKeyword: true,
			showNoResultsMessage: true
		},
		search: {
			by: "name",
		},

		"messages": {
			"noResults": "No results found for #query#"
		},

		className: "container"
	});

	//HTML Preview button add and remove function
	$(document).on('click', '#ide-tab-sortable li', function () {
		var _this = $(this);
		setTimeout(function () {
			if ($('.zc-editorTabContent:visible pre').css('background-color') !== undefined) {
				var colorCode = $('.zc-editorTabContent:visible pre').css('background-color').split('(')[1].split(',')[0];
				var previewClass;
				if (colorCode > 150) {
					previewClass = "previewBtnWhite";
				}
				else {
					previewClass = "previewBtnBlack";
				}
				if (_this.text().split('.').pop().trim() == 'html') {
					$('.zc-hSplit-top').append('<button class="zc-btn icon-labeled zc-htmlPreview ' + previewClass + '" id="menubar_preview" title="Preview File">\
      		<i class="icon"><svg class="zc-darkYellow"><use xlink:href="#svg-preview-icon"></use></svg></i>\
         </button>');
				}
				else {
					$('.zc-hSplit-top .zc-htmlPreview').remove();
				}
			} else {
				$('.zc-hSplit-top .zc-htmlPreview').remove();
			}
		}, 10);

	})

	/* Get panel states and load the panel based on this condition below */
	var getPanelState = JSON.parse(localStorage.getItem("setPanelStates"));
	console.log(getPanelState);

	//Check the panel states and open/close the panel based on the conditons.  
	if (getPanelState.leftPanel == true) {
		$(".zc-ideContainer").addClass('zc-showPanelLeft');
	} else {
		$(".zc-ideContainer").removeClass('zc-showPanelLeft');
	}

	if (getPanelState.rightPanel == true) {
		$(".zc-ideContainer").addClass('zc-showPanelRight');
		$("#quickAccessCollab").trigger("click");
	} else {
		$(".zc-ideContainer").removeClass('zc-showPanelRight');
	}

	if (getPanelState.bottomPanel == true) {
		$(".zc-ideContainer").addClass('zc-showPanelX');
	} else {
		$(".zc-ideContainer").removeClass('zc-showPanelX');
	}
	/* Panel State Load End here */


	/* Keyboard shorcut change update it will be loaded once */


	//Remove Page Loader 
	setTimeout(function () {
		$("#zc-loader-overlay").removeClass('zc-isVisible');

		var getKeyboardUpdate = localStorage.getItem("setKeyboardUpdate");
		if (getKeyboardUpdate != "true") {
			$("#zc-keyboardShortcutUpdate").addClass("zc-isVisible");
			$("#confirm-keyboardShortcutUpdate").addClass("zc-showDialog");
		}

	}, 2000);


	// END OF WINDOW ONLOAD

});









$(function () {
	//zscroll init 
	// $(".zc-editorTabContent").zscroll({
	// 	showOne: true,
	// 	scrollend: function (ev, ui) {
	// 		console.log(ev.type, ui);
	// 	},
	// 	//Scroll End Y
	// 	scrollyend: function (ev, ui) {
	// 		console.log(ev.type, ui);
	// 	}
	// });

	$("#projExptree").zscroll({
		showOne: true,
		scrollend: function (ev, ui) {
			console.log(ev.type, ui);
		},
		//Scroll End Y
		scrollyend: function (ev, ui) {
			console.log(ev.type, ui);
		}
	});

	// //Comments panel
	// $(".zc-cmt-feed").zscroll({
	// 	showOne: true,
	// 	scrollend: function (ev, ui) {
	// 		console.log(ev.type, ui);
	// 	},
	// 	//Scroll End Y
	// 	scrollyend: function (ev, ui) {
	// 		console.log(ev.type, ui);
	// 	}
	// });


	//problems panel
	//  	$("#zc-problemPanelContent").zscroll({
	// 		showOne: true,
	// 		scrollend: function (ev, ui) {
	// 			console.log(ev.type, ui);
	// 		},
	// 		//Scroll End Y
	// 		scrollyend: function (ev, ui) {
	// 			console.log(ev.type, ui);
	// 		}
	// 	});

	//Debgger panel 

});



// Sort buttons active state changing function
$(function () {
	$(document).on('click', '.zmenu__item', function (event) {
		if ($(event.target).closest('div').hasClass('zc-sortBtns')) {
			$(event.target).addClass('active');
			$(event.target).siblings().removeClass('active');
		} else {
			$('.zc-sortBtns > .zc-btn').removeClass('active');
		}
	});
});



function ace_editor_init() {

	//INIT ACE EDITOR 
	//localStorage.clear() 
	getTheme = localStorage.getItem("localSyntaxTheme");
	getSelectedFont = localStorage.getItem("localSelectedFont");
	getFontSize = localStorage.getItem("localFontSize");
	getCommentStyle = localStorage.getItem("localCommentStyle");


	var queries = {};

	$.each(document.location.search.substr(1).split('&'), function (c, q) {
		var i = q.split('=');
		if (i[0].length !== 0) {
			queries[i[0].toString()] = i[1].toString();
		}
	});

	if ((getTheme === null) || (getTheme === "")) {
		getTheme = "crimson_editor";
	}

	if (queries.page == "greyTheme" || getThemeParam == "greyTheme") {
		if (!editorThemes.grey.includes(getTheme)) {
			getTheme = editorThemes.grey[0];
		}
	} else {
		if (!editorThemes.white.includes(getTheme)) {
			getTheme = editorThemes.white[0];
		}
	}

	$('#zc-syntaxTheme-setting').val(getTheme).trigger("chosen:updated");

	if ((getSelectedFont === null) || (getSelectedFont === "")) {
		getSelectedFont = "Roboto Mono";
	}

	if ((getFontSize === null) || (getFontSize === "")) {
		getFontSize = "14px";
	}

	// Comment Style Popover or inline-block
	if (getCommentStyle == "popoverComments") {
		$("body").addClass("enablePopComment");
	} else {
		$("body").removeClass("enablePopComment");
	}



	if (getTheme == "ambiance") {
		$("body").addClass("ambianceTheme").removeClass('gruvboxTheme idleTheme monokaiTheme tneTheme crimsonTheme dawnTheme eclipseTheme xcodeTheme');
	} else if (getTheme == "gruvbox") {
		$("body").addClass("gruvboxTheme").removeClass('ambianceTheme idleTheme monokaiTheme tneTheme crimsonTheme dawnTheme eclipseTheme xcodeTheme');
	} else if (getTheme == "idle_fingers") {
		$("body").addClass("idleTheme").removeClass('ambianceTheme gruvboxTheme monokaiTheme tneTheme crimsonTheme dawnTheme eclipseTheme xcodeTheme');
	} else if (getTheme == "monokai") {
		$("body").addClass("monokaiTheme").removeClass('ambianceTheme gruvboxTheme idleTheme tneTheme crimsonTheme dawnTheme eclipseTheme xcodeTheme');
	} else if (getTheme == "tomorrow_night_eighties") {
		$("body").addClass("tneTheme").removeClass('ambianceTheme gruvboxTheme idleTheme monokaiTheme crimsonTheme dawnTheme eclipseTheme xcodeTheme');
	} else if (getTheme == "crimson_editor") {
		$("body").addClass("crimsonTheme").removeClass('ambianceTheme gruvboxTheme idleTheme monokaiTheme tneTheme  dawnTheme eclipseTheme xcodeTheme');
	} else if (getTheme == "dawn") {
		$("body").addClass("dawnTheme").removeClass('ambianceTheme gruvboxTheme idleTheme monokaiTheme tneTheme crimsonTheme  eclipseTheme xcodeTheme');
	} else if (getTheme == "eclipse") {
		$("body").addClass("eclipseTheme").removeClass('ambianceTheme gruvboxTheme idleTheme monokaiTheme tneTheme crimsonTheme dawnTheme  xcodeTheme');
	} else if (getTheme == "xcode") {
		$("body").addClass("xcodeTheme").removeClass('ambianceTheme gruvboxTheme idleTheme monokaiTheme tneTheme crimsonTheme dawnTheme eclipseTheme');
	}

	// JS EDITOR 
	editor = ace.edit("editor");
	editor.setTheme("ace/theme/" + getTheme);
	editor.session.setMode("ace/mode/javascript");

	editor.setDisplayIndentGuides(false);
	editor.session.setUseWrapMode(true); // LINE WRAP MODE
	editor.setOptions({
		//fontFamily: "Inconsolata",
		//fontFamily: "Fira Mono", //Old Version
		//fontFamily: "fira_coderegular",
		//fontFamily: "Source Code Pro",
		//fontFamily: "monacoregular",
		//fontFamily: "Menlo Regular",
		//fontFamily: "Fira Code", 
		//fontFamily: "Menlo, Consolas, Source-Code-Pro, Courier New, Ubuntu Mono, Monospace",
		fontFamily: getSelectedFont,
		fontSize: getFontSize,
		maxLines: 150
	});
	editor.setHighlightGutterLine(false);
	editor.setShowPrintMargin(false);
	editor.setOption("highlightActiveLine", true);
	editor.renderer.setScrollMargin(15, 15);




	// HTML EDITOR 
	htmlEditor = ace.edit("htmlEditor");
	htmlEditor.setTheme("ace/theme/" + getTheme);
	htmlEditor.session.setMode("ace/mode/html");
	htmlEditor.setDisplayIndentGuides(false);
	htmlEditor.session.setUseWrapMode(true); // LINE WRAP MODE
	htmlEditor.setOptions({
		fontFamily: getSelectedFont,
		fontSize: getFontSize,
		maxLines: 150
	});
	htmlEditor.setHighlightGutterLine(false);
	htmlEditor.setShowPrintMargin(false);
	htmlEditor.setOption("highlightActiveLine", true);
	htmlEditor.getSession().setMode("ace/mode/javascript");
	htmlEditor.renderer.setScrollMargin(15, 15);


	// CSS EDITOR 
	cssEditor = ace.edit("cssEditor");
	cssEditor.setTheme("ace/theme/" + getTheme);
	cssEditor.session.setMode("ace/mode/css");
	cssEditor.setDisplayIndentGuides(false);
	cssEditor.session.setUseWrapMode(true); // LINE WRAP MODE
	cssEditor.setOptions({
		fontFamily: getSelectedFont,
		fontSize: getFontSize,
		maxLines: 150
	});
	cssEditor.setHighlightGutterLine(false);
	cssEditor.setShowPrintMargin(false);
	cssEditor.setOption("highlightActiveLine", false);
	cssEditor.getSession().setMode("ace/mode/javascript");
	cssEditor.renderer.setScrollMargin(15, 15);

	// JAVA EDITOR 
	javaEditor = ace.edit("javaEditor");
	javaEditor.setTheme("ace/theme/" + getTheme);
	javaEditor.session.setMode("ace/mode/java");
	javaEditor.setDisplayIndentGuides(false);
	javaEditor.session.setUseWrapMode(true); // LINE WRAP MODE
	javaEditor.setOptions({
		fontFamily: getSelectedFont,
		fontSize: getFontSize,
		maxLines: 150
	});
	javaEditor.setHighlightGutterLine(false);
	javaEditor.setShowPrintMargin(false);
	javaEditor.setOption("highlightActiveLine", true);
	javaEditor.getSession().setMode("ace/mode/javascript");
	javaEditor.renderer.setScrollMargin(15, 15);


}