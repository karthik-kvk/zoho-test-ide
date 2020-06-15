$(document).ready(function () {
	var setIdeMenu, id = 0;

	//OS BASED MENU SHORTCUT KEYS
	if (navigator.platform.toUpperCase().indexOf('MAC') >= 0) {
		id = 0;
	}
	if (!(navigator.platform.toUpperCase().indexOf('MAC') >= 0)) {
		id = 1;
	}

	$.getJSON('../json/menu.json', function (data) {
		setIdeMenu = '<div id="ide-projectMenu" data-ctype="zmenu" data-content-type="icon-text" data-display-type="standard" data-direction="bottom-left" class="zc-ideMenu zc-ideMenuIcon" style="display:none">\
	<ul>\
	<li id="ide-share-btn" data-icon="#svg-share-icon zc-shareIcon">Share Project...</li>\
	<li id="ide-projectSetting">Project Settings</li>\
	<li id="ide-projectInfo">Project Info</li>\
	<li data-item-type="separator"></li>\
	<li id="ide-openProject">Open Project...</li>\
	<li id="#">Create Project...</li>\
	</ul>\
	</div>\
	\
	<div id="ide-fileMenu" data-ctype="zmenu" data-content-type="icon-text"  data-display-type="standard"  data-direction="bottom-left" class="zc-ideMenu zc-ideMenuIcon" style="display:none">\
	<ul>\
	<li data-icon="#svg-new-icon zc-newIcon" data-menu-id="ide-newMenu"> New </li>\
	<li id="ide-open-file" data-icon="#svg-openproject-icon zc-openFileIcon" data-shortcut-key="'+ data.goToFile[id] + '">Open...</li>\
	<li  data-menu-id="openrecent-submenu">Open Recent</li>\
	<li data-item-type="separator"></li>\
	<li data-icon="#svg-save-icon zc-saveIcon" data-shortcut-key="'+ data.save[id] + '"> Save </li>\
	<li id="ide-saveAs" data-shortcut-key="'+ data.saveAs[id] + '"> Save As... </li>\
	<li> Save All </li>\
	<li data-item-type="separator"></li>\
	<li id="ide-file-rename" class="zc-fileRename">Rename...</li>\
	<li data-item-type="separator"></li>\
	<li id="zc-fileHistory">Version History</li>\
	<li id="ide-file-info" class="zc-fileInfo" data-icon="#svg-projectinfo-icon zc-propIcon">View Info</li>\
	<li data-shortcut-key="'+ data.locateExplorer[id] + '">Show in Explorer</li>\
	</ul>\
	</div>\
	\
	<div id="ide-newMenu" data-ctype="zmenu"  data-content-type="icon-text" style="display:none" class="zc-ideMenuIcon animate-faderight">\
	<ul>\
	<li id="ide-create-files" data-icon="#svg-file-icon zc-newFileIcon" data-shortcut-key="'+ data.newFile[id] + '"> File... </li>\
	<li id="ide-create-class"> Class... </li>\
	<li id="ide-create-interface"> Interface... </li>\
	<li id="ide-create-enum"> Enum... </li>\
	<li id="ide-create-annotation"> Annotation... </li>\
	<li id="ide-create-folder" data-icon="#svg-folder-icon zc-newFolderIcon"> Folder... </li>\
	<li data-item-type="separator"></li>\
	<li id="ide-upload-files" data-icon="#svg-upload-icon zc-uploadFileIcon">  Upload Files... </li>\
	</ul>\
	</div>\
	\
	<div id="ide-editMenu" data-ctype="zmenu" data-content-type="icon-text" data-display-type="standard" data-direction="bottom-left"  class="zc-ideMenu zc-ideMenuIcon" style="display:none">\
	<ul>\
	<li data-icon="#svg-undo-icon zc-undoIcon" data-shortcut-key="'+ data.undo[id] + '">Undo</li>\
	<li data-icon="#svg-redo-icon zc-redoIcon" data-shortcut-key="'+ data.redo[id] + '">Redo</li>\
	<li data-item-type="separator"></li>\
	<li data-icon="#svg-cut-icon zc-cutIcon" data-shortcut-key="'+ data.cut[id] + '">Cut</li>\
	<li data-icon="#svg-copy-icon zc-copyIcon" data-shortcut-key="'+ data.copy[id] + '">Copy</li>\
	<li data-icon="#svg-paste-icon zc-pasteIcon" disabled="true" data-shortcut-key="'+ data.paste[id] + '">Paste</li>\
	<li data-item-type="separator"></li>\
	<li id="zc-findOnly" data-icon="#svg-find-icon zc-findIcon" data-shortcut-key="'+ data.find[id] + '">Find...</li>\
	<li id="zc-find" data-shortcut-key="'+ data.findReplace[id] + '">Find and Replace... </li>\
	<li id="zc-findinFilesMenu" data-icon="#svg-contsearch-icon zc-contentSearchIcon"  data-shortcut-key="'+ data.findFiles[id] + '">Find in Project...</li>\
	<li data-item-type="separator"></li>\
	<li id="ide-goto-line" data-shortcut-key="'+ data.goToLine[id] + '">Go to Line...</li>\
	<li id="ide-definition-menu" data-shortcut-key="'+ data.goToDefinition[id] + '">Go to Definition...</li>\
	<li data-item-type="separator"></li>\
	<li data-icon="#svg-sourceCodeFormate-icon zc-formatIcon" data-shortcut-key="'+ data.formatSource[id] + '">Format Source Code</li>\
	</ul>\
	</div>\
	\
	<div id="ide-viewMenu" data-ctype="zmenu" data-content-type="icon-text" data-display-type="standard" data-radio-icon="#svg-tick-icon zc-black"  data-direction="bottom-left" class="zc-ideMenu zc-ideMenuIcon ide-viewMenu" style="display:none">\
	<ul>\
	<li data-icon="#svg-command-icon zc-terminalIcon"  id="toggle-terminal" data-shortcut-key="'+ data.terminal[id] + '">Terminal</li>\
	<li data-item-type="separator"></li>\
	<li id="" data-menu-id="ide-panel-submenu">Panels</li>\
	<li id="" data-menu-id="ide-splitPane">Layout</li>\
	<li id="" data-menu-id="ide-showHideMenu">Show/Hide</li>\
	<li data-item-type="separator"></li>\
	<li data-item-type="checkbox" data-checked="true" checked  data-shortcut-key="'+ data.wrapLines[id] + '">Wrap Lines</li>\
	<li data-item-type="separator"></li>\
	<li data-item-type="custom" class="zc-nohoverMenuItem zc-screenModeMenu">\
	<span class="zmenu__text">Screen Mode</span>\
	<div  class="zc-btn-set zc-customBtnSet">\
	<button id="zc-fullScreenModeMenu" class="zc-btn icon" title="Full Screen Mode">\
	<i class="icon-14">  <svg class="zc-black"> <use xlink:href="#svg-fullScreenSm-icon14"> </use> </svg> </i>\
	</button>\
	<button id="zc-distractionScreenMode" class="zc-btn icon" title="Distraction Free Mode">\
	<i class="icon-14">  <svg class="zc-black"> <use xlink:href="#svg-distractFreeSm-icon"> </use></svg> </i>\
	</button>\
	<button id="zc-presentationMode" class="zc-btn icon" title="Presentation Mode">\
	<i class="icon-14">  <svg class="zc-black"> <use xlink:href="#svg-presentationSm-icon"> </use></svg> </i>\
	</button>\
	</div>\
	</li>\
	</ul>\
	</div>\
	\
	\
	<div id="ide-panel-submenu" data-ctype="zmenu" data-content-type="icon-text" style="display:none" class="zc-ideMenuIcon animate-faderight">\
	<ul>\
	<li data-icon="#svg-chat-icon zc-groupchatIcon" id="chatPane">Group Chat</li>\
	<li data-icon="#svg-comment-icon zc-commentIcon" id="commentPane" class="commentViewItem">Comments</li>\
	<li data-icon="#svg-outline-icon zc-outlineIcon" id="outlinePane">Outline</li>\
	<li data-item-type="separator"></li>\
	<li data-icon="#svg-debug-icon zc-debugIcon" id="debuggerPane">Debugger</li>\
	<li id="toggle-console" data-icon="#svg-console-icon zc-consoleIcon">Output Console</li>\
	<li id="ide-problems-menu" data-icon="#svg-problems-icon zc-problemIcon">Problems</li>\
	<li data-item-type="separator"></li>\
	<li id="ide-explorer-menu" data-icon="#svg-tree-icon zc-explorerIcon">Explorer</li>\
	<li id="ide-changes-menu" data-icon="#svg-changes-icon zc-changesIcon">Changes</li>\
	<li id="ide-search-menu" data-icon="#svg-contsearch-icon zc-searchIcon">Search Panel</li>\
	</ul>\
	</div>\
	\
	<div id="ide-splitPane" data-ctype="zmenu" data-content-type="icon-text" data-display-type="standard" data-direction="bottom-left" class="zc-ideMenu zc-ideMenuIcon" style="display:none">\
	<ul>\
	<li data-icon="#svg-split1-icon zc-splitIcon">No Split</li>\
	<li data-icon="#svg-split2-icon zc-splitIcon">Two Columns</li>\
	<li data-icon="#svg-split3-icon zc-splitIcon">Two Rows </li>\
	<li data-icon="#svg-split5-icon zc-splitIcon">2x1 Grid</li>\
	<li data-icon="#svg-split4-icon zc-splitIcon">2x2 Grid</li>\
	</ul>\
	</div>\
	\
	<div id="ide-showHideMenu" style="display:none;" data-content-type="icon-text" data-radio-icon="#svg-menuChecked-icon zc-black" data-pointer=true>\
	<ul>\
	<li id="showEditorToolbar" name="showHideUI" data-item-type="checkbox" checked>Toolbar</li>\
	<li id="showStatusbar" name="showHideUI" data-item-type="checkbox" checked>Status Bar</li>\
	<li id="showCliqBar" name="showHideUI" data-item-type="checkbox">Cliq Bar</li>\
	<li data-item-type="separator"></li>\
	<li data-menu-id="ide-showHideLauncherMenu">Quick Access Bar</li>\
	</ul>\
	</div>\
	\
   <div id="ide-showHideLauncherMenu" style="display:none;" data-content-type="icon-text" data-radio-icon="#svg-tick-icon zc-black" data-pointer=true>\
	<ul>\
   <li id="showLeftlauncherBar" name="showHideUI" data-item-type="checkbox" checked>Left</li>\
	<li id="showRightlauncherBar" name="showHideUI" data-item-type="checkbox" checked>Right</li>\
	</ul>\
	</div>\
	\
	<div id="ide-navigateMenu" data-ctype="zmenu" data-content-type="text" data-display-type="standard" data-direction="bottom-left" class="zc-ideMenu zc-ideMenuIcon" style="display:none">\
	<ul>\
	<li id="ide-goto-line" data-shortcut-key="'+ data.goToLine[id] + '">Go to Line...</li>\
	<li id="ide-definition-menu" data-shortcut-key="'+ data.goToDefinition[id] + '">Go to Definition...</li>\
	<li data-item-type="separator" class="zmenu__separator" role="separator"></li>\
	<li>Next Method</li>\
	<li>Previous Method</li>\
	<li data-item-type="separator" class="zmenu__separator" role="separator"></li>\
	<li>Next Problem</li>\
	<li>Previous Problem</li>\
	<li data-item-type="separator" class="zmenu__separator" role="separator"></li>\
	<li data-menu-id="ide-tabs-submenu">Tabs</li>\
	<li data-menu-id="ide-bookmarks-submenu">Bookmarks</li>\
	<li data-menu-id="ide-comments-submenu">Comments</li>\
	</ul>\
	</div>\
	\
	<div id="ide-tabs-submenu" data-ctype="zmenu" data-content-type="text" style="display:none" class="zc-ideMenuIcon">\
	<ul>\
	<li>Back</li>\
	<li>Forward</li>\
	<li data-item-type="separator" class="zmenu__separator" role="separator"></li>\
	<li>First</li>\
	<li>Previous</li>\
	<li>Next</li>\
	<li>Last</li>\
	</ul>\
	</div>\
	\
	<div id="ide-comments-submenu" data-ctype="zmenu" data-content-type="text" style="display:none" class="zc-ideMenuIcon">\
	<ul>\
	<li>Next</li>\
	<li>Previous</li>\
	</ul>\
	</div>\
	\
	\
	<div id="ide-bookmarks-submenu" data-ctype="zmenu" data-content-type="text" style="display:none" class="zc-ideMenuIcon">\
	<ul>\
	<li>Next</li>\
	<li>Previous</li>\
	</ul>\
	</div>\
	\
	<div id="openrecent-submenu" data-ctype="zmenu" data-content-type="icon-text" style="display:none" class="zc-ideMenuIcon">\
	<ul>\
	<li data-icon="#svg-js-icon zc-orange">hovercard.js</li>\
	<li data-icon="#svg-js-icon zc-orange">popover.js</li>\
	<li data-icon="#svg-java-icon zc-grey">master.java</li>\
	</ul>\
	</div>\
	\
	<div id="ide-runMenu" data-ctype="zmenu" data-content-type="text" data-display-type="standard" data-direction="bottom-left" class="zc-ideMenu zc-ideMenuIcon" style="display:none">\
	<ul>\
	<li id="runFile" class="zmenu__item">Run this File</li>\
	<li id="default"  class="zmenu__item">Run this Project</li>\
	<li data-item-type="itemgroup">Configurations</li>\
	<li id="performTest" data-item-type="custom" class="zmenu__item zc-runAni"><span class="zmenu_text">Set_Performance_Test</span> <span class="zc-runAniIcon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><polyline class="zc-pulsePath" points="0.785 8.2 3.476 8.2 5.653 11.903 9.225 4.243 11.728 9.516 15.235 9.516"/></svg></span></li>\
	<li data-item-type="separator" class="zmenu__separator" role="separator"></li>\
	<li data-menu-id="ide-debugMenu">Debug</li>\
	<li data-item-type="separator" class="zmenu__separator" role="separator"></li>\
	<li id="zc-javaConfig">Manage Configurations...</li>\
	</ul>\
	</div>\
	\
	\
	<div id="ide-debugMenu" data-ctype="zmenu" data-content-type="text" data-display-type="standard" style="display:none" class="zc-ideMenuIcon">\
	<ul>\
	<li data-item-type="custom" class="zmenu__item  zmenu__custom" role="menuitem">Debug this File</li>\
	<li data-item-type="custom" class="zmenu__item  zmenu__custom" role="menuitem">Debug this Project</li>\
	<li data-item-type="itemgroup">Configurations</li>\
	<li class="zmenu__item">set performance test</li>\
	<li class="zmenu__item">convert string config</li>\
	</ul>\
	</div>\
	\
	<div id="ide-repositoryMenu" data-ctype="zmenu" data-content-type="icon-text" data-display-type="standard" data-direction="bottom-left" class="zc-ideMenu zc-ideMenuIcon" style="display:none">\
	<ul>\
	<li id="ide-commitFiles-3">Commit All Changes...</li>\
	<li id="ide-pullFiles" data-item-type="custom" class="zc-pullUpdateMenu">\
	<div class="zmenu__iconcontainer">\
	<i class="zmenu__icon">\
	<svg class="zc-pullIcon"><use xlink:href="#svg-pull-icon"></use></svg>\
	</i>\
	</div>\
	<span class="zmenu__text">Pull Updates...</span>\
	<span class="zc-notifi-count">6</span>\
	</li>\
	<li data-icon="#svg-push-icon zc-pushIcon" id="ide-pushFiles">Push Changes...</li>\
	<li data-item-type="separator"></li>\
	<li id="ide-mergeFiles">Merge Branch...</li>\
	<li id="ide-resetChanges">Reset Changes...</li>\
	<li data-item-type="separator"></li>\
	<li id="ide-compareFiles">Compare Changes...</li>\
	<li id="ide-switchBranch">Switch Branch...</li>\
	</ul>\
	</div>\
	\
	<div id="ide-reviewMenu" data-ctype="zmenu" data-content-type="icon-text" data-display-type="standard" data-direction="bottom-left" class="zc-ideMenu zc-ideMenuIcon" style="display:none">\
	<ul>\
	<li data-icon="#svg-addComment-icon zc-addCmtIcon" id="zc-newCmt">Add Comment</li>\
	<li data-item-type="separator"></li>\
	<li id="zc-showAllCmts">Show All Comments Inline</li>\
	<li id="zc-hideAllCmts" hidden>Hide All Comments Inline</li>\
	<li id="zc-highlightCmtLine" data-item-type="checkbox" data-checked="true" checked  data-shortcut-key="">Highlight Commented Lines</li>\
	</ul>\
	</div>\
	\
	<div id="ide-toolsMenu" data-ctype="zmenu" data-content-type="icon-text" data-display-type="standard" data-direction="bottom-left" class="zc-ideMenu zc-ideMenuIcon" style="display:none">\
	<ul>\
	<li data-icon="#svg-debug-icon zc-debugIcon" id="debuggerPane">Debugger</li>\
	<li data-icon="#svg-command-icon zc-terminalIcon"  id="toggle-terminal" data-shortcut-key="'+ data.terminal[id] + '">Terminal</li>\
	<li id="zc-taskManager-menu">Task Manager</li>\
	<li data-item-type="separator"></li>\
	<li data-menu-id="buildSubmenu">Build</li>\
	</ul>\
	</div>\
	\
	<div id="ide-preference" data-ctype="zmenu" data-content-type="text" data-display-type="standard" class="zc-ideMenu zc-ideMenuIcon" style="display:none">\
	<ul>\
	<li id="zc-editorPref">Preferences</li>\
	<li id="ide-keyboradShortcuts">Keyboard Shortcuts</li>\
	<li data-item-type="separator"></li>\
	<li>Project Settings</li>\
	<li data-item-type="separator"></li>\
	<li id="ide-repService">Connected Services</li>\
	<li id="zc-notifiPreference">Email Notifications</li>\
	<li id="zc-projPrev">Edit Preview URL...</li>\
	</ul>\
	</div>\
	\
	<div id="ide-help" data-ctype="zmenu" data-content-type="text" data-display-type="standard" data-direction="bottom-right" class="zc-ideMenu zc-ideMenuIcon" style="display:none">\
	<ul>\
	<li> Help</li>\
	<li> FAQs</li>\
	<li> What&#39s New</li>\
	<li> Take a Tour</li>\
	<li data-item-type="separator"></li>\
	<li> Keyboard Shortcuts</li>\
	<li data-item-type="separator"></li>\
	<li> About Zoho Code </li>\
	<li> Blogs </li>\
	<li data-item-type="separator"></li>\
	<li> Forums </li>\
	<li> Support </li>\
	</ul>\
	</div>\
	\
	<div id="ide-newOnlyMenu" data-ctype="zmenu" data-content-type="icon-text" style="display:none" class="zc-ideMenuIcon animate-fadedown">\
	<ul>\
	<li id="ide-create-files-toolmenu" data-icon="#svg-file-icon zc-green" data-shortcut-key="'+ data.newFile[id] + '"> File... </li>\
	<li id="ide-create-class-toolmenu"> Class... </li>\
	<li id="ide-create-interface-toolmenu"> Interface... </li>\
	<li id="ide-create-enum-toolmenu"> Enum... </li>\
	<li id="ide-create-annotation-toolmenu"> Annotation... </li>\
	<li id="ide-create-folder-toolmenu" data-icon="#svg-folder-icon zc-blue"> Folder... </li>\
	<li data-item-type="separator"></li>\
	<li id="ide-upload-files-toolmenu" data-icon="#svg-upload-icon zc-violet">  Upload Files... </li>\
	</ul>\
	</div>\
	\
	<div id="ide-runOnlyMenu" data-ctype="zmenu" data-content-type="text" data-display-type="standard" data-direction="bottom-left" class="zc-ideMenuIcon  animate-fadedown" style="display:none">\
	<ul>\
	<li id="runFile" class="zmenu__item">Run this File</li>\
	<li id="default"  class="zmenu__item">Run this Project</li>\
	<li data-item-type="itemgroup">Configurations</li>\
	<li id="performTest" class="zmenu__item">Set_Performance_Test</li>\
	</ul>\
	</div>\
	\
	<div id="ide-findMenu" data-ctype="zmenu" data-content-type="text" data-display-type="standard" class="zc-ideMenuIcon  animate-fadedown"  style="display:none">\
	<ul>\
	<li id="findSubmenu" data-icon="#svg-find-icon zc-findIcon" data-shortcut-key="'+ data.find[id] + '">Find...</li>\
	<li id="findReplaceSubmenu" data-shortcut-key="'+ data.findReplace[id] + '">Find and Replace... </li>\
	<li id="FindFilesSubmenu" data-icon="#svg-contsearch-icon zc-contentSearchIcon"  data-shortcut-key="'+ data.findFiles[id] + '">Find in Project...</li>\
	</div>\
	<div id="ide-debugOnlyMenu" data-ctype="zmenu" data-content-type="text" data-display-type="standard" class="zc-ideMenuIcon  animate-fadedown"  style="display:none">\
	<ul>\
	<li id="runFile" data-item-type="custom" class="zmenu__item  zmenu__custom" role="menuitem">Debug this File</li>\
	<li id="default" data-item-type="custom" class="zmenu__item  zmenu__custom" role="menuitem">Debug this Project</li>\
	<li data-item-type="itemgroup">Configurations</li>\
	<li id="performTest" class="zmenu__item">Set_Performance_Test</li>\
	</ul>\
	</div>\
	\
	<div id="ide-previewMenu" data-ctype="zmenu" data-content-type="text" data-display-type="standard" data-direction="bottom-right" style="display:none" class="zc-ideMenuIcon animate-fadedown">\
	<ul>\
	<li class="zmenu__item">Preview in HTTP (8080)</li>\
	<li class="zmenu__item">Preview in HTTPS (8443) </li>\
	<li data-item-type="separator" class="zmenu__separator" role="separator"></li>\
	<li id="zc-projPrev" class="zmenu__item">Edit Preview URL...</li>\
	</ul>\
	</div>\
	\
	<div id="contexttabMenu" data-content-type="text" data-direction="after-pointer" style="display:none" class="zc-ideMenuIcon">\
	<ul>\
	<li data-shortcut-key="'+ data.closeTab[id] + '">Close Tab</li>\
	<li data-shortcut-key="'+ data.closeAllTab[id] + '">Close All Tabs</li>\
	<li>Close Other Tabs</li>\
	</ul>\
	</div>\
	\
	\
	<div id="contexttoolMenu" data-content-type="text" data-direction="after-pointer" style="display:none" class="zc-ideMenuIcon">\
	<ul>\
		<li>Hide Toolbar</li>\
		<li>Customize...</li>\
	</ul>\
	</div>\
	\
	<div id="contexteditorMenu" data-ctype="zmenu" data-content-type="icon-text" data-direction="at-cursor" style="display:none" class="zc-ideMenuIcon">\
	<ul>\
	<li data-icon="#svg-undo-icon zc-undoIcon" data-shortcut-key="'+ data.undo[id] + '">Undo</li>\
	<li data-icon="#svg-redo-icon zc-redoIcon" data-shortcut-key="'+ data.redo[id] + '">Redo</li>\
	<li data-item-type="separator"></li>\
	<li data-icon="#svg-paste-icon zc-pasteIcon" disabled="true" data-shortcut-key="'+ data.paste[id] + '">Paste</li>\
	<li data-item-type="separator"></li>\
	<li> Select Word</li>\
	<li> Select Line</li>\
	<li> Select All</li>\
	<li data-item-type="separator"></li>\
	<li id="zc-addCmtLine" data-icon="#svg-addComment-icon zc-commentIcon"> Add Comment...</li>\
	<li data-item-type="separator"></li>\
	<li id="zc-findOnly" data-icon="#svg-find-icon zc-findIcon" data-shortcut-key="'+ data.find[id] + '">Find...</li>\
	<li id="ide-goto-line" data-shortcut-key="'+ data.goToLine[id] + '">Go to Line...</li>\
	<li id="ide-definition-menu" data-shortcut-key="'+ data.goToDefinition[id] + '">Go to Definition...</li>\
	<li data-item-type="separator"></li>\
	<li data-icon="#svg-sourceCodeFormate-icon zc-formatIcon" data-shortcut-key="'+ data.formatSource[id] + '">Format Source Code</li>\
	</ul>\
	</div>\
	\
	<div id="contexteditorSelectMenu" data-ctype="zmenu" data-content-type="icon-text" data-direction="at-cursor" style="display:none" class="zc-ideMenuIcon">\
	<ul>\
	<li data-icon="#svg-cut-icon zc-cutIcon" data-shortcut-key="'+ data.cut[id] + '">Cut</li>\
	<li data-icon="#svg-copy-icon zc-copyIcon" data-shortcut-key="'+ data.copy[id] + '">Copy</li>\
	<li data-icon="#svg-paste-icon zc-pasteIcon" data-disabled="true" data-shortcut-key="'+ data.paste[id] + '">Paste</li>\
	<li data-item-type="separator"></li>\
	<li id="zc-addCmt" data-icon="#svg-addComment-icon zc-commentIcon"> Add Comment...</li>\
	<li data-item-type="separator"></li>\
	<li id="zc-findOnly" data-icon="#svg-find-icon zc-findIcon" data-shortcut-key="'+ data.find[id] + '">Find...</li>\
	<li data-icon="#svg-contsearch-icon zc-contentSearchIcon" data-shortcut-key="'+ data.findFiles[id] + '">Find in Project...</li>\
	<li id="ide-goto-line" data-shortcut-key="'+ data.goToLine[id] + '">Go to Line...</li>\
	<li id="ide-definition-menu" data-shortcut-key="'+ data.goToDefinition[id] + '">Go to Definition...</li>\
	</ul>\
	</div>\
	\
	<div id="projectcontextMenu" data-ctype="zmenu" data-content-type="icon-text" data-direction="after-pointer" style="display:none" class="zc-ideMenuIcon">\
	<ul>\
	<li data-menu-id="new-menu" data-icon="#svg-new-icon zc-newIcon" data-menu-id="ide-newMenu"> New </li>\
	<li data-item-type="separator"></li>\
	<li data-icon="#svg-copy-icon zc-copyIcon" data-shortcut-key="'+ data.copy[id] + '">Copy</li>\
	<li data-icon="#svg-paste-icon zc-pasteIcon" data-disabled="true" data-shortcut-key="'+ data.paste[id] + '">Paste</li>\
	<li data-item-type="separator"></li>\
	<li data-icon="#svg-upload-icon zc-uploadFileIcon">Upload Files... </li>\
	<li data-icon="#svg-downloadaszip-icon zc-downloadIcon">Download as ZIP file</li>\
	<li data-item-type="separator"></li>\
	<li>Refresh</li>\
	<li data-icon="#svg-run-icon zc-runIcon" data-menu-id="ide-runOnlyMenu">Run</li>\
	<li data-icon="#svg-debug-icon zc-debugIcon" data-menu-id="ide-debugOnlyMenu">Debug</li>\
	<li>Project Settings</li>\
	<li data-item-type="separator"></li>\
	<li data-menu-id="git-menu">Repository</li>\
	<li data-item-type="separator"></li>\
	<li data-icon="#svg-projectinfo-icon zc-propIcon">Project Info</li>\
	</ul>\
	</div>\
	\
	<div id="new-menu" data-ctype="zmenu" data-content-type="icon-text" data-direction="after-pointer" style="display:none" class="zc-ideMenuIcon">\
	<ul>\
	<li data-icon="#svg-file-icon zc-newFileIcon" data-shortcut-key="'+ data.newFile[id] + '">File</li>\
	<li id="ide-create-class-context">Class</li>\
	<li id="ide-create-interface-context">Interface</li>\
	<li id="ide-create-enum-context">Enum</li>\
	<li id="ide-create-annotation-context">Annotation</li>\
	<li id="ide-create-folder-context" data-icon="#svg-folder-icon zc-newFolderIcon">Folder</li>\
	<li data-item-type="separator"></li>\
	<li id="ide-upload-files-context" data-icon="#svg-upload-icon zc-uploadFileIcon">Upload Files... </li>\
	</ul>\
	</div>\
	\
	<div id="git-menu" data-ctype="zmenu" data-content-type="icon-text" data-direction="after-pointer" style="display:none" class="zc-ideMenuIcon">\
	<ul>\
	<li id="ide-commitFiles-3">Commit All Changes...</li>\
	<li id="ide-pullFiles" data-item-type="custom" class="zc-pullUpdateMenu">\
	<div class="zmenu__iconcontainer">\
	<i class="zmenu__icon">\
	<svg class="zc-pullIcon"><use xlink:href="#svg-pull-icon"></use></svg>\
	</i>\
	</div>\
	<span class="zmenu__text">Pull Updates...</span>\
	<span class="zc-notifi-count">6</span>\
	</li>\
	<li data-icon="#svg-push-icon zc-pushIcon" id="ide-pushFiles">Push Changes...</li>\
	<li data-item-type="separator"></li>\
	<li id="ide-mergeFiles">Merge Branch...</li>\
	<li id="ide-resetChanges">Reset Changes...</li>\
	<li data-item-type="separator"></li>\
	<li id="ide-compareFiles">Compare Branch...</li>\
	<li id="ide-switchBranch">Switch Branch...</li>\
	</ul>\
	</div>\
	\
	<div id="contextMenuFolder" data-ctype="zmenu" data-content-type="icon-text" data-direction="after-pointer" style="display:none" class="zc-ideMenuIcon">\
	<ul>\
	<li data-menu-id="new-menu" data-icon="#svg-new-icon zc-newIcon" data-menu-id="ide-newMenu"> New </li>\
	<li data-item-type="separator"></li>\
	<li id="ide-commitFiles-3">Commit Changes...</li>\
	<li data-item-type="separator"></li>\
	<li data-icon="#svg-cut-icon zc-cutIcon" data-shortcut-key="'+ data.cut[id] + '">Cut</li>\
	<li data-icon="#svg-copy-icon zc-copyIcon" data-shortcut-key="'+ data.copy[id] + '">Copy</li>\
	<li data-icon="#svg-paste-icon zc-pasteIcon" disabled="true" data-shortcut-key="'+ data.paste[id] + '">Paste</li>\
	<li>Duplicate</li>\
	<li data-item-type="separator"></li>\
	<li class="zc-folderRename">Rename...</li>\
	<li data-icon="#svg-downloadaszip-icon zc-downloadIcon">Download as ZIP file</li>\
	<li class="zc-folderInfo" data-icon="#svg-projectinfo-icon zc-propIcon">View Info</li>\
	<li data-item-type="separator"></li>\
	<li data-icon="#svg-delete-icon zc-deleteIcon">Delete</li>\
	</ul>\
	</div>\
	\
	<div id="contextLibrary" data-ctype="zmenu" data-content-type="text" data-direction="at-cursor" style="display:none" class="zc-ideMenuIcon">\
	<ul>\
	<li>Add Jar</li>\
	<li>Configure...</li>\
	</ul>\
	</div>\
	<div id="contextMenuContent" data-ctype="zmenu" data-content-type="icon-text" data-direction="after-pointer" style="display:none" class="zc-ideMenuIcon">\
	<ul>\
	<li>Open</li>\
	<li data-item-type="separator"></li>\
	<li id="ide-compareWith">Compare With...</li>\
	<li id="ide-commitFiles-singleFile">Commit Changes...</li>\
	<li data-item-type="separator"></li>\
	<li data-icon="#svg-cut-icon zc-cutIcon" data-shortcut-key="'+ data.cut[id] + '">Cut</li>\
	<li data-icon="#svg-copy-icon zc-copyIcon" data-shortcut-key="'+ data.copy[id] + '">Copy</li>\
	<li>Duplicate</li>\
	<li data-item-type="separator"></li>\
	<li class="zc-fileRename">Rename...</li>\
	<li data-icon="#svg-download-icon zc-downloadIcon">Download</li>\
	<li>Version Histroy</li>\
	<li class="zc-fileInfo" data-icon="#svg-projectinfo-icon zc-propIcon">View Info</li>\
	<li data-item-type="separator"></li>\
	<li data-icon="#svg-delete-icon zc-deleteIcon">Delete</li>\
	</ul>\
	</div>\
	\
	<div id="ide-ro-more" data-ctype="zmenu" data-content-type="text" data-pointer=true style="display:none" class="zc-ideMenuIcon animate-fadedown">\
	<ul>\
	<li id="toggle-terminal" data-shortcut-key="'+ data.terminal[id] + '">Terminal</li>\
	<li> Task Manager </li>\
	<li data-item-type="separator"></li>\
	<li id="ide-preferences"> Preferences </li>\
	</ul>\
	</div>\
	\
	<div id="ide-moreTerminal" data-ctype="zmenu" data-content-type="text" data-pointer=true style="display:none" class="zc-ideMenuIcon animate-fadedown">\
	<ul> </ul>\
	</div>\
	\
	<div id="ide-collab-menu" class="ide-collab-menu" data-ctype="zmenu" data-content-type="text" data-pointer=true style="display:none" class="animate-fadedown">\
	<ul>\
	<li id="zc-notifyCollab"> Notify Collaborators... </li>\
	<li id="hide-user-presence"> Show User Presence  </li>\
	</ul>\
	</div>\
	\
	<div id="cmthigh-submenu" data-ctype="zmenu" data-content-type="icon-text" data-radio-icon="#svg-tick-icon zc-black" data-pointer=true style="display:none">\
	<ul>\
	<li name="cmd-high" data-item-type="radio">All</li>\
	<li name="cmd-high" data-item-type="radio" checked>Resolved</li>\
	<li name="cmd-high" data-item-type="radio">Unresolved</li>\
	</ul>\
	</div>\
	\
	<div id="diffView-action" data-ctype="zmenu" data-content-type="icon-text" data-radio-icon="#svg-tick-icon zc-black" data-pointer=true style="display:none" class="animate-fadedown">\
	<ul>\
	<li data-item-type="checkbox" data-checked="true">Synchronized Scroll</li>\
	<li data-item-type="checkbox" data-checked="true">Show Line Numbers</li>\
	<li data-item-type="checkbox" data-checked="true">Wrapped Navigation </li>\
	<li data-item-type="separator"></li>\
	<li data-item-type="custom" class="zc-themeMenu">\
	<span class="zmenu__text">Theme</span>  <div class="zc-themeToggle">\
	<label class="switch">\
	<input type="checkbox" checked="">\
	<div class="slider round"></div>\
	</label>\
	</div>\
	</li>\
	</ul>\
	</div>\
	\
	<div id="ide-fileHistoryMenu" data-ctype="zmenu" data-pointer=true  style="display:none">\
	<ul>\
	<li id="ide-createnewVersion">Create New File from this Version</li>\
	<li>Get this Version Link</li>\
	<li data-item-type="separator"></li>\
	<li>Download</li>\
	</ul>\
	</div>\
	\
  \
	<div id="ide-LeftMoveToMenu" data-ctype="zmenu" data-content-type="icon-text" data-direction="after-pointer" style="display:none">\
	<ul>\
	<li data-item-type="itemgroup">Move Panel To</li>\
	<li data-icon="#svg-panelRight-icon zc-panelIcon">Right</li>\
	<li data-icon="#svg-panelLeft-icon zc-panelIcon" disabled="true">Left</li>\
	<li data-icon="#svg-panelBottom-icon zc-panelIcon">Bottom</li>\
	<li data-icon="#svg-panelUndock-icon zc-panelIcon">Undock</li>\
	<li data-item-type="separator"></li>\
	<li class="zc-leftPanelAddTo zc-addTabLauncher" id="">Add to Launcher</li>\
	<li class="zc-leftPanelRemoveFrom zc-removeTabLancher" id="">Remove from Launcher</li>\
	<li class="zc-closeTab" id="">Close Panel</li>\
	</ul>\
	</div>\
	\
	\
	<div id="ide-RightMoveToMenu" data-ctype="zmenu" data-content-type="icon-text" data-direction="after-pointer"  style="display:none">\
	<ul>\
	<li data-item-type="itemgroup">Move Panel To</li>\
	<li data-icon="#svg-panelRight-icon zc-panelIcon" disabled="true">Right</li>\
	<li data-icon="#svg-panelLeft-icon zc-panelIcon">Left</li>\
	<li data-icon="#svg-panelBottom-icon zc-panelIcon">Bottom</li>\
	<li data-icon="#svg-panelUndock-icon zc-panelIcon">Undock</li>\
	<li data-item-type="separator"></li>\
	<li class="zc-rightPanelAddTo zc-addTabLauncher" id="">Add to Launcher</li>\
	<li class="zc-rightPanelRemoveFrom zc-removeTabLancher" id="">Remove from Launcher</li>\
	<li  class="zc-closeTab" id="">Close Panel</li>\
	</ul>\
	</div>\
	\
	\
	<div id="ide-BottomMoveToMenu" data-ctype="zmenu" data-content-type="icon-text" data-direction="after-pointer" style="display:none">\
	<ul>\
	<li data-item-type="itemgroup">Move Panel To</li>\
	<li data-icon="#svg-panelRight-icon zc-panelIcon">Right</li>\
	<li data-icon="#svg-panelLeft-icon zc-panelIcon">Left</li>\
	<li data-icon="#svg-panelBottom-icon zc-panelIcon"  disabled="true">Bottom</li>\
	<li data-icon="#svg-panelUndock-icon zc-panelIcon">Undock</li>\
	<li data-item-type="separator"></li>\
	<li class="zc-bottomPanelAddTo zc-addTabLauncher" id="">Add to Launcher</li>\
	<li class="zc-bottomPanelRemoveFrom zc-removeTabLancher" id="">Remove from Launcher</li>\
	<li class="zc-closeTab" id="">Close Panel</li>\
	</ul>\
	</div>\
	\
	\
 <div id="ide-quickAccessContext" data-ctype="zmenu" data-content-type="text" data-direction="after-pointer" style="display:none" >\
	<ul>\
	<li class="zc-quickLaunchRemove">Remove from Launcher</li>\
	<li id="savedLauncher-CloseBtn">Close</li>\
	</ul>\
	</div>\
	\
	\
	 <div id="ide-quickAccessKeepLauncherContext" data-ctype="zmenu" data-content-type="text" data-direction="after-pointer" style="display:none" class="">\
	<ul>\
	<li id="zc-keepInlauncher">Keep in Launcher</li>\
	<li id="unsavedLauncher-CloseBtn">Close</li>\
	</ul>\
	</div>\
	\
	\
	<div id="ide-tabStyle" data-ctype="zmenu" data-content-type="icon-text" data-pointer=true style="display:none" class="animate-fadedown">\
	<ul>\
	<li data-item-type="itemgroup">Tab</li>\
	<li id="rightMenuIconOnly" name="zc-panelTabSetting" data-item-type="radio">Icon Only</li>\
	<li id="rightMenuTextOnly" name="zc-panelTabSetting" data-item-type="radio">Text Only</li>\
	<li id="rightMenuIconText" name="zc-panelTabSetting" data-item-type="radio" checked>Icon and Text</li>\
	</ul>\
	</div>\
	\
	\
	<div id="ide-leftTabStyle" data-ctype="zmenu" data-content-type="icon-text" data-pointer=true style="display:none" class="animate-fadedown">\
	<ul>\
	<li data-item-type="itemgroup">Tab</li>\
	<li id="leftMenuIconOnly" name="zc-panelTabSetting" data-item-type="radio">Icon Only</li>\
	<li id="leftMenuTextOnly" name="zc-panelTabSetting" data-item-type="radio">Text Only</li>\
	<li id="leftMenuIconText" name="zc-panelTabSetting" data-item-type="radio" checked>Icon and Text</li>\
	</ul>\
	</div>\
	\
	\
	<div id="ide-bottomTabStyle" data-ctype="zmenu" data-content-type="icon-text" data-pointer=true style="display:none" class="animate-fadedown">\
	<ul>\
	<li  data-item-type="itemgroup">Tab</li>\
	<li id="bottomMenuIconOnly" name="zc-panelTabSetting" data-item-type="radio">Icon Only</li>\
	<li id="bottomMenuTextOnly" name="zc-panelTabSetting" data-item-type="radio">Text Only</li>\
	<li id="bottomMenuIconText" name="zc-panelTabSetting" data-item-type="radio" checked>Icon and Text</li>\
	</ul>\
	</div>\
	\
	\
	<div id="ide-tabStyleContext" data-ctype="zmenu" data-content-type="icon-text" data-direction="after-pointer"  style="display:none" class="">\
	<ul>\
	<li id="rightContextClosePanel">Close Panel Group</li>\
	</ul>\
	</div>\
	\
	\
	<div id="ide-leftTabStyleContext" data-ctype="zmenu" data-content-type="icon-text" data-direction="after-pointer"  style="display:none" class="">\
	<ul>\
	<li id="leftContextClosePanel">Close Panel Group</li>\
	</ul>\
	</div>\
	\
	\
	<div id="ide-bottomTabStyleContext" data-ctype="zmenu" data-content-type="text" data-direction="after-pointer"  style="display:none" class="">\
	<ul>\
	<li id="bottomContextClosePanel">Close Panel Group</li>\
	</ul>\
	</div>\
	\
	\
	<div id="ide-leftQuickLauchBar" data-ctype="zmenu" data-content-type="text" data-direction="after-pointer"  style="display:none" class="">\
	<ul>\
	<li id="showLeftlauncherBar">Hide This Bar</li>\
	</ul>\
	</div>\
	\
	\
	<div id="ide-rightQuickLauchBar" data-ctype="zmenu" data-content-type="text" data-direction="after-pointer"  style="display:none" class="">\
	<ul>\
	<li id="showRightlauncherBar">Hide This Bar</li>\
	</ul>\
	</div>\
	\
	\
	<div id="ide-statusBar" data-ctype="zmenu" data-content-type="text" data-direction="after-pointer"  style="display:none" class="">\
	<ul>\
	<li id="showStatusbar">Hide Status Bar</li>\
	</ul>\
	</div>\
	\
	\
	<div id="leftPanel-MoreTabs" data-ctype="zmenu" data-content-type="icon-text" data-pointer=true style="display:none" class="animate-fadedown zc-ideMenuIcon">\
	<ul>\
	</ul>\
	</div>\
	\
	\
  <div id="rightPanel-MoreTabs" data-ctype="zmenu" data-content-type="icon-text" data-pointer=true style="display:none" class="animate-fadedown zc-ideMenuIcon">\
	<ul>\
	<li id="zc-Comments" data-icon="#svg-comment-icon zc-commentIcon">Comments</li>\
	<li id="zc-Outline" data-icon="#svg-outline-icon zc-outlineIcon">Outline</li>\
	</ul>\
	</div>\
	\
	\
	<div id="bottomPanel-MoreTabs" data-ctype="zmenu" data-content-type="icon-text" data-pointer=true style="display:none" class="animate-fadedown zc-ideMenuIcon">\
	<ul>\
	</ul>\
	</div>\
	\
	\
	<div id="ide-demo-list" data-ctype="zmenu" data-content-type="text" data-pointer=true style="display:none" class="animate-fadeup">\
	<ul>\
	<li id="ide-file-rename"> File Rename </li>\
	<li id="ide-folder-rename"> Folder Rename </li>\
	<li id="ide-package-rename"> Package Rename </li>\
	<li data-item-type="separator"></li>\
	<li id="ide-file-delete"> Delete File </li>\
	<li id="ide-folder-delete"> Delete Folder </li>\
	<li id="ide-package-delete"> Delete Package </li>\
	<li data-item-type="separator"></li>\
	<li id="ide-file-properties"> File Properties </li>\
	<li id="ide-folder-properties"> Folder Properties </li>\
	<li id="ide-content-search"> Content Search </li>\
	<li id="ide-content-search-right"  class="zc-hide"> Content Search </li>\
	<li data-item-type="separator"></li>\
	<li id="ide-confirm-warning"> Warning Dialog </li>\
	<li id="ide-confirm-error"> Error Dialog </li>\
	<li id="ide-confirm-success"> Success Dialog </li>\
	<li id="ide-confirm-info"> Info Dialog </li>\
	<li data-item-type="separator"></li>\
	<li id="ide-goto-line"> Go to Line Number </li>\
	<li data-item-type="separator"></li>\
	<li id="ide-commitFiles-3"> Commit Files </li>\
	<li id="ide-pushFiles"> Push Files </li>\
	<li id="ide-pullFiles"> Pull Files </li>\
	<li id="ide-mergeFiles"> Merge Files </li>\
	<li id="ide-switchBranch"> Switch Branch </li>\
	</ul>\
	</div>\
	\
	\
	<div id="ide-outline-sort" data-ctype="zmenu" data-content-type="icon-text" data-radio-icon="#svg-tick-icon zc-black" data-pointer=true style="display:none">\
	<ul>\
	<li id="ide-outline-name-sort" name="ideOutlineSort" data-custom=true data-item-type="radio" class="zc-sortMenuItem">\
			<div class="zmenu__iconcontainer"><i class="zmenu__icon"></i></div>\
			<span class="zmenu__text">Name</span>\
			<div id="zc-outlineSort" class="zc-btn-set zc-btnset-tiny zc-edit-btnSet zc-sortBtns">\
				<button id="outlineSort-az" class="zc-btn">A-Z</button>\
				<button id="outlineSort-za" class="zc-btn">Z-A</button>\
			</div>\
		</li>\
	<li name="ideOutlineSort" id="ide-outline-source-sort" data-item-type="radio" checked>Associated Line Number</li>\
	</ul>\
	</div>\
	<div id="ide-keyBoardPrefMoreAction" data-content-type="text" data-pointer=true  style="display:none">\
	<ul>\
	<li id="ide-keyboardPrefEdit">Edit...</li>\
	<li id="ide-keyboardPrefReset">Reset to Default</li>\
	<li id="ide-keyboardPrefClear">Clear Shortcut</li>\
	</ul>\
	</div>\
	\
	\
	<div id="ide-keydoardPrefAction-sort" data-content-type="icon-text" data-radio-icon="#svg-tick-icon zc-black" data-pointer=true style="display:none">\
	<ul>\
	<li name="ide-keyboradPrefSort" data-item-type="radio" checked id="zc-sCutFilterAll">All</li>\
	<li name="ide-keyboradPrefSort" data-item-type="radio" id="zc-sCutFilterCustomized">Customized</li>\
	</ul>\
	</div>\
	\
	\
	<div id="ide-cmtMoreActions" data-content-type="icon-text" data-pointer=true  style="display:none; width:170px;">\
	<ul>\
	<li id="zc-cmtEditMenu" class="zc-cmtEdit" data-icon="#svg-edit-icon zc-cmtMoreMenuIcon">Edit...</li>\
	<li id="zc-cmtDeleteMenu" class="zc-cmtDelete" data-icon="#svg-delete-icon zc-cmtMoreMenuIcon">Delete</li>\
	<li data-item-type="separator"></li>\
	<li data-icon="#svg-copy-icon zc-cmtMoreMenuIcon">Copy Comment URL</li>\
	</ul>\
	</div>\
	\
	\
	<div id="ide-cmtCurrentFileSort" data-content-type="icon-text" data-pointer=true class="zc-secondaryMenu"  style="display:none">\
	<ul>\
	<li data-item-type="itemgroup">Sort by</li>\
	<li name="cmtCurrentFileSort" id="zc-cmtFileOrderNew"  data-item-type="radio">Newest First</li>\
	<li name="cmtCurrentFileSort" id="zc-cmtFileOrderOld"  data-item-type="radio">Oldest First</li>\
	<li name="cmtCurrentFileSort" id="zc-cmtOrderLine"  data-item-type="radio" checked>Associated Line Number</li>\
	</ul>\
	</div>\
	\
	\
	<div id="ide-cmtCurrentProjSort" data-content-type="icon-text" data-pointer=true class="zc-secondaryMenu"  style="display:none">\
	<ul>\
	<li data-item-type="itemgroup">Sort by</li>\
	<li name="cmtCurrentFileSort" id="zc-cmtProjOrderNew"  data-item-type="radio" checked>Newest First</li>\
	<li name="cmtCurrentFileSort" id="zc-cmtProjOrderOld"  data-item-type="radio">Oldest First</li>\
	</ul>\
	</div>\
	\
	\
	<div id="ide-cmtFileLinkMoreAction" data-ctype="zmenu" data-content-type="text" data-direction="at-cursor" style="display:none">\
	<ul>\
	<li>Open</li>\
	<li>Open in New Browser Tab</li>\
	<li data-item-type="separator"></li>\
	<li>Copy File Link</li>\
	<li>Show in Explorer</li>\
	</ul>\
	</div>\
	\
	\
	<div id="ide-configMoreAction" data-content-type="icon-text" data-pointer=true class="animate-fadedown" style="display:none">\
	<ul>\
	<li data-icon="#svg-copyLink-icon zc-configActionCopy" id="zc-configActionCopy">Make a Copy...</li>\
	<li data-item-type="separator"></li>\
	<li data-icon="#svg-delete-icon zc-configActionDelete" id="zc-configActionDelete">Delete</li>\
	</ul>\
	</div>\
	\
	';
	
		$("#menu-template").empty().append(setIdeMenu);

		var showFontSizeSetting = function (event) {
			var data = event.detail;
			$('#zc-fontSizeInput').znumberfield({
				width: 120,
				value: 12,
				"spinButtonsType": "split",
				"spinButtons": "always",
				"suffix": "px",
				"step": 1,
				"clearButton": "none"
			});
		}
		
		$("#ide-showHideLauncherMenu").zmenu( {checkedCheckboxItemSVGIconId: "svg-menuChecked-icon"});
         
      $("#ide-showHideMenu").zmenu( {checkedCheckboxItemSVGIconId: "svg-menuChecked-icon"});

      $("#ide-viewMenu, #ide-reviewMenu").zmenu( {checkedCheckboxItemSVGIconId: "svg-menuChecked-icon"});
      
		$("#ide-viewMenu").on("zmenushow", showFontSizeSetting);


	});



});
