var editableConfigName;

 $(window).on('load',function(){
 $("#ide-runMenu").on("zmenubeforeshow", callback);
 
 function callback(){
    if(currentActiveFile() == 'javaEditor'){
       $("#ide-runMenu").zmenu("setMenuItemsAttribute", ["#runFile"], "disabled", false);
    } else{
        $("#ide-runMenu").zmenu("setMenuItemsAttribute", ["#runFile"], "disabled", true);
    }
 }
 
 $('#ide-configMoreAction').zmenu({
		beforehide: function (event, data) {
		   console.log($(data.forElement).closest('.zc-manageConfigItem'));
		   $(data.forElement).closest('.zc-manageConfigItem').removeClass('zc-configItemActive'); 
		}
	});
}) 

$(document).ready(function () {
  
   if($('#zc-manageConfigList .zc-manageConfigItem').length === 0){
      $('#zc-manageConfigList').closest('.zc-runConfig').addClass('zc-manageConfigEmpty');
   }
   
   $('#configCreate-Btn').zsplitbutton({
      'updateButtonOnMenuItemClick' : false,
      arrowSVGIconId: "svg-menuDownArrow-icon14",
      splitbuttonAttributes: {
         class: "zc-btn zc-btn-small zc-gradient"
      },
   });
 
	$('#configCreate-menu').zmenu({
		animation: {
			open: {
				className: "animate-fadedown"
			}
		},
		itemclick: function (event, data) {
		   if($(data.menuitem).attr('data-id') == "configCreateRun-Btn"){
		      configCreationRun($('#configCreate-Btn').find('.zbutton__text'));
		   }
		   
		    if($(data.menuitem).attr('data-id') == "configSaveRun-Btn"){
		       configSaveRun($('#configSave-Btn').find('.zbutton__text'));
		    }
		   
		    if($(data.menuitem).attr('data-id') == "configCreateDebug-Btn"){
		      configCreateDebug($('#configCreate-Btn').find('.zbutton__text'));
		   }
		   
		   if($(data.menuitem).attr('data-id') == "configSaveDebug-Btn"){
		       configSaveDebug($('#configSave-Btn').find('.zbutton__text'));
		    }
		}
	});
	
   $('#manageConfigSave-btn').zsplitbutton({
       'updateButtonOnMenuItemClick' : false,
       arrowSVGIconId: "svg-menuDownArrow-icon14",
       splitbuttonAttributes: {
        class: "zc-btn zc-btn-small zc-gradient"
      },
    });
   
	$('#manageConfigSave-menu').zmenu({
		animation: {
			open: {
				className: "animate-fadedown"
			}
		},
		itemclick: function (event, data) {
		   if(data.data.id == "manageConfigDebug-btn"){
		      manageConfigDebug($('#manageConfigSave-btn').find('.zbutton__text'));
		   }
		    if(data.data.id == "manageConfigRun-btn"){
		      manageConfigRun($('#manageConfigSave-btn').find('.zbutton__text'));
		   }
		}
	});

   $("#zc-ide").on("zmenuitemclick", function(event, data) {
   var id = data.data.id;
   var button = $(data.forElement);
   
   // if(id == 'zc-configActionEdit') {
   //    button.removeClass('active');
   //    configEdit(button);
   // } else 
   if(id == 'zc-configActionCopy') {
      button.removeClass('active');
      $('.zc-configItemActive').removeClass('zc-configItemActive'); 
      configDuplicate(button);
   } else if(id == 'zc-configActionDelete') {
      button.removeClass('active');
      $('.zc-configItemActive').removeClass('zc-configItemActive'); 
      configDelete(button);
   }
});

$(document).on('click','#zc-manageConfigList .zc-manageConfigItem',function(){
   configEdit($(this));
});
   
  // Create config flow
  $("#zc-ide").on("click", "#newConfig-btn", function () {
     $('.zc-configEditing').removeClass('zc-configEditing');
    currentListConfiguration.updateList();
     /*-- Reomve Error State --*/
   $('#zc-createConfig-template .zc-error').removeClass('zc-error');
   $('#zc-createConfig-template').find('.zc-inputHelpText').removeClass('zc-hide');
   $('#zc-createConfig-template').find('.zc-errorText').hide();
     
    $('.zc-createConfigWrap').removeClass('zc-hide');
    $('.zc-runConfig, .zc-manageConfigWrap').addClass('zc-hide');
    $("#configSave-Btn .zbutton__text").empty().append("Create");
    
    $("#configCreate-menu [data-id='configSaveRun-Btn'] .zmenu__text").empty().append("Create and Run");
    $("#configCreate-menu [data-id='configSaveDebug-Btn'] .zmenu__text").empty().append("Create and Debug");
    
    $("#configSave-Btn").attr('id', 'configCreate-Btn');
    
   $("#configCreate-menu [data-id='configSaveRun-Btn']").attr('data-id', 'configCreateRun-Btn');
   $("#configCreate-menu [data-id='configSaveDebug-Btn']").attr('data-id', 'configCreateDebug-Btn');
   
    $("#zc-langConfig .zc-input").val("");
    $("#zc-customConfig .zc-input").val("");
    $(".zc-backtoManage").empty().append('<span class="icon"><svg class="zc-black"> <use xlink:href="#svg-back-icon"> </use></svg></span> <span>Back</span>');
    
    $.each($('#zc-createConfig-template > div:visible input,#zc-createConfig-template > div:visible  textarea'),function(index,ele){
       $(ele).attr('data-init',$(ele).val());
    });
    
  });

  $("#zc-ide").on("click", "#configTypeLang", function () {
    var _this = $(this);

    if (_this.is(":checked")) {
      $("#zc-langConfig").css("display", "block");
      $("#zc-customConfig").css("display", "none");
    }
  });

  $("#zc-ide").on("click", "#configTypeCustom", function () {
    var _this = $(this);
    if (_this.is(":checked")) {
      $("#zc-langConfig").css("display", "none");
      $("#zc-customConfig").css("display", "block");
    }
  });

  // CREATE CONFIGURATION 
  var getConfigName;

  // Config Save
  $("#zc-ide").on("click", "#configCreate-Btn", function (event) {

    var _this = $(this).find('.zbutton__text'),
      getConfigNamelang = $("#zc-configName").val(),
      getConfigNamebyTerminal = $("#zc-configWithTerminal").val(),
       getConfigNamebyCmd = $("#zc-configWithCmd").val(),

      getConfigNameID,
      iffieldcheck = true;

    if ($('#configTypeLang').is(':checked')) {

      var getConfigName = $("#zc-configName").val(),
        getWarName = $("#zc-warName").val(),
        getConfigLocation = $("#zc-configLocation-tomcat").val();

      if (getConfigName == "" || getConfigName == null) {
         $('#configName-required').text('Configuration Name is required.')
        textfield_show_error('#zc-configName', '#configName-required');
        iffieldcheck = false;
      } else if(/\s/.test(getConfigName)) {
         $('#configName-required').text('Can contain alphabets, numbers, hyphens (-) and underscores (_).')
         textfield_show_error('#zc-configName', '#configName-required');
         iffieldcheck = false;
      }else{
        textfield_hide_error('#zc-configName', '#configName-required');
      }

      if (getWarName == "" || getWarName == null) {
        textfield_show_error('#zc-warName', '#warName-required');
        iffieldcheck = false;
      } else {
        textfield_hide_error('#zc-warName', '#warName-required');
      }
      
      if (getConfigLocation == "" || getConfigLocation == null) {
        textfield_show_error('#zc-configLocation-tomcat', '#terminalconfigLocation-tomcat-required');
        iffieldcheck = false;
      } else {
        textfield_hide_error('#zc-configLocation-tomcat', '#terminalconfigLocation-tomcat-required');
      }

    } else if ($('#configTypeCustom').is(':checked')) {
      var getConfigName = $("#zc-configWithTerminal").val();
      var getConfigCmd = $("#zc-configWithCmd").val();
      var getConfigLocation = $("#zc-configLocation-cmd").val();
      
      if (getConfigName == "" || getConfigName == null) {
      $('#terminalconfigName-require').text('Configuration Name is required.')
        textfield_show_error('#zc-configWithTerminal', '#terminalconfigName-required');
        iffieldcheck = false;
      } else if(/\s/.test(getConfigName)){
          $('#terminalconfigName-require').text('Can contain alphabets, numbers, hyphens (-) and underscores (_).');
        textfield_show_error('#zc-configWithTerminal', '#terminalconfigName-required');
        iffieldcheck = false;
      } else {
        textfield_hide_error('#zc-configWithTerminal', '#terminalconfigName-required');
      }
     
    if (getConfigCmd == "" || getConfigCmd == null) {
        textfield_show_error('#zc-configWithCmd', '#terminalconfigCmd-required');
        iffieldcheck = false;
      } else {
        textfield_hide_error('#zc-configWithCmd', '#terminalconfigCmd-required');
      }
      if (getConfigLocation == "" || getConfigLocation == null) {
        textfield_show_error('#zc-configLocation-cmd', '#terminalconfigLocation-cmd-required');
        iffieldcheck = false;
      } else {
        textfield_hide_error('#zc-configLocation-cmd', '#terminalconfigLocation-cmd-required');
      }
    }

    /* REQUIRED FIELD VALIDATION  FUNCTION */

    if (iffieldcheck == true) {
      
     if( currentListConfiguration.setValToInput() == false){
        return false;
     }
      
      getConfigName = $.trim(getConfigName);
      getConfigNameID = getConfigName.replace(/\s/g, '');

      var newConsoleTab = '<li id="consoleTab-' + getConfigName + '" class="ide-tab tab-active"> <span class="tab-text">' + getConfigName + '</span><span class="tab-close" title="Close"><i class="icon-9"> <svg class="zc-grey"> <use xlink:href="#svg-close-icon"> </use> </svg> </i> </span></li>';

      var newConsoleTabContent = '<div data-id="consoleTab-' + getConfigNameID + '" class="console-tabContent"> <div class="zc-tabcontent"><p>Chat server listening at</p><p>&nbsp;</p> <p>Building SoftTabsize8.java and running SoftTabSize8</p><p><span class="zc-errorText">Error:</span> Could not find or load main class SoftTabSize8</p></div></div>';

      var addtoManageConfig = '<div class="zc-manageConfigItem"><span class="zc-fleft zc-configTitle">' + getConfigName + '</span><span class="zc-fright zc-manageConfigAction"><button class="zc-btn zc-btn-small icon zc-configstart-Btn togglePlay" title="Run"><i class="icon-12">	<svg class="zc-green"><use xlink:href="#svg-debugResume-icon12"> </use></svg></i></button><button class="zc-btn zc-btn-small icon zc-configMore-Btn" title="More" data-menu-id="ide-configMoreAction" data-active-class="active"><i class="icon-12"><svg class="zc-black"> <use xlink:href="#svg-verticalMore-icon"> </use> </svg></i></button></span></div>';
      
      // <button class="zc-btn zc-btn-small icon zc-configEdit-Btn" title="Edit"><i class="icon-12"><svg class="zc-black"> <use xlink:href="#svg-edit-icon"> </use> </svg></i></button> <button class="zc-btn zc-btn-small icon zc-configDuplicate-Btn" title="Make a Copy"><i class="icon-12"><svg class="zc-black"> <use xlink:href="#svg-copyLink-icon"> </use> </svg></i></button><button class="zc-btn zc-btn-small icon zc-configDelete-Btn" title="Delete"><i class="icon-12"><svg class="zc-black"> <use xlink:href="#svg-delete-icon"> </use> </svg></i></button>

      var addtoManageConfigContent = '<div class="zc-createConfig zc-clearfix"><div class="zc-row"><div class="zc-field inline"><label>WAR Name:</label></div><div class="zc-inputField"><div class="zc-inputvalue">Root.war</div></div></div><div class="zc-row"><div class="zc-field inline"><label>JRE Version:</label></div><div class="zc-inputField"><div class="zc-inputvalue">8</div></div></div><div class="zc-row"><div class="zc-field inline"><label> Location to Run:</label></div><div class="zc-inputField"><div class="zc-inputvalue">tomcatProject/webapps/tomcatProject/bin</div></div></div><div class="zc-row"><div class="zc-field inline"><label>Program Arguments:</label></div><div class="zc-inputField"><div class="zc-inputvalue">${container_loc}${selected_resource_path}</div></div></div><div class="zc-row"><div class="zc-field inline"><label>VM Arguments:</label></div><div class="zc-inputField"><div class="zc-inputvalue">-Djava.security.egd=file:/dev/./urandom</div></div></div></div>';

      $("#zc-manageConfigList").prepend(addtoManageConfig);
      addButtonLoading(_this, "Creating");
      setTimeout(function (event) {
      removeButtonLoading(_this, "Save");
        
      $("#configCreate-menu [data-id='configCreateRun-Btn'] .zmenu__text").empty().append("Save and Run");
      $("#configCreate-menu [data-id='configCreateDebug-Btn'] .zmenu__text").empty().append("Save and Debug");
     
      $("#configCreate-Btn").attr('id', 'configSave-Btn');

      $("#configCreate-menu [data-id='configCreateRun-Btn']").attr('data-id', 'configSaveRun-Btn');
      $("#configCreate-menu [data-id='configCreateDebug-Btn']").attr('data-id', 'configSaveDebug-Btn');

        successToast("Configuration created successfully.");
        toast_Position();
        $("#ide-runMenu").zmenu("addMenuItem", { "index": "4", "id": getConfigNameID, "innerHTML": '' + getConfigName + '', "data-item-type": "custom" });
        $("#ide-runOnlyMenu").zmenu("addMenuItem", { "index": "4", "id": getConfigNameID, "innerHTML": '' + getConfigName + '', "data-item-type": "custom" });
        $("#ide-debugOnlyMenu").zmenu("addMenuItem", { "index": "4", "id": getConfigNameID, "innerHTML": '' + getConfigName + '', "data-item-type": "custom" });
        var getMenuItemLength = $("#ide-runMenu li").length - 3;
        $("#consolePane-tabs .ide-tab").removeClass("tab-active");
        $("#consolePane-tabs .ide-tab").removeClass('zc-noTabSeparator');
        $("#consolePane-tabs").prepend(newConsoleTab);
        $("#console-tabContents .console-tabContent").addClass("zc-hide");
        $("#console-tabContents").prepend(newConsoleTabContent);

        /*--- output console select option function starts ----*/

        $("#zc-consolePane-select").zselect("removeOption", getConfigName);

        var selectArray = [{
          label: getConfigName,
          value: getConfigName
        }];

        $("#zc-consolePane-select").zselect("addOption", selectArray, "after");

        $("#zc-consolePane-select").zselect("setValue", getConfigName);

        $('#console-tabContents').find('div[data-id="consoleTab-' + getConfigName + '"]').removeClass('zc-hide').siblings().addClass('zc-hide');

      /* ------------------- ------------------*/

   afterConfigurationCreation();
      
    
       /*--- output console select option function ends ----*/

      }, 1500);

      hideToast();

    }
  });
  
  function afterConfigurationCreation(){
        var getConfigLength = $('.zc-manageConfigItem').length;
         $('.zc-createConfigWrap, .zc-manageConfigWrap').addClass('zc-hide');
         $('.zc-runConfig').removeClass('zc-hide');
         if (getConfigLength == 0) {
            $('#zc-manageConfigList').closest('.zc-runConfig').addClass('zc-manageConfigEmpty');
         } else {
            $('#zc-manageConfigList').closest('.zc-runConfig').removeClass('zc-manageConfigEmpty');
         }
  }
  
  function configCreationRun(_this) {
      var _this = _this,
      getConfigNamelang = $("#zc-configName").val(),
      getConfigNamebyTerminal = $("#zc-configWithTerminal").val(),
      getConfigNamebyCmd = $("#zc-configWithCmd").val(),
      getConfigNameID,
      iffieldcheck = true;

    if ($('#configTypeLang').is(':checked')) {

      var getConfigName = $("#zc-configName").val(),
        getWarName = $("#zc-warName").val(),
        getConfigLocation = $("#zc-configLocation-tomcat").val();

      if (getConfigName == "" || getConfigName == null) {
         $('#configName-required').text('Configuration Name is required.');
         textfield_show_error('#zc-configName', '#configName-required');
         iffieldcheck = false;
      } else if(/\s/.test(getConfigName)){
         $('#configName-required').text('Can contain alphabets, numbers, hyphens (-) and underscores (_).');
         textfield_show_error('#zc-configName', '#configName-required');
         iffieldcheck = false;
      } else {
        textfield_hide_error('#zc-configName', '#configName-required');
      }
 
      if (getWarName == "" || getWarName == null) {
        textfield_show_error('#zc-warName', '#warName-required');
        iffieldcheck = false;
      } else {
        textfield_hide_error('#zc-warName', '#warName-required');
      }
      
      if (getConfigLocation == "" || getConfigLocation == null) {
        textfield_show_error('#zc-configLocation-tomcat', '#terminalconfigLocation-tomcat-required');
        iffieldcheck = false;
      } else {
        textfield_hide_error('#zc-configLocation-tomcat', '#terminalconfigLocation-tomcat-required');
      }

    } else if ($('#configTypeCustom').is(':checked')) {
      var getConfigName = $("#zc-configWithTerminal").val();
      var getConfigCmd = $("#zc-configWithCmd").val();
      var getConfigLocation = $("#zc-configLocation-cmd").val();
      
      if (getConfigName == "" || getConfigName == null) {
         $('#terminalconfigName-required').text('Configuration Name is required.');
        textfield_show_error('#zc-configWithTerminal', '#terminalconfigName-required');
        iffieldcheck = false;
      } else if( /\s/.test(getConfigName)){
         $('#terminalconfigName-required').text('Can contain alphabets, numbers, hyphens (-) and underscores (_).');
          textfield_show_error('#zc-configWithTerminal', '#terminalconfigName-required');
        iffieldcheck = false;
      } else {
        textfield_hide_error('#zc-configWithTerminal', '#terminalconfigName-required');
      }
      
      if (getConfigCmd == "" || getConfigCmd == null) {
        textfield_show_error('#zc-configWithCmd', '#terminalconfigCmd-required');
        iffieldcheck = false;
      } else {
        textfield_hide_error('#zc-configWithCmd', '#terminalconfigCmd-required');
      }
      
       if (getConfigLocation == "" || getConfigLocation == null) {
        textfield_show_error('#zc-configLocation-cmd', '#terminalconfigLocation-cmd-required');
        iffieldcheck = false;
      } else {
        textfield_hide_error('#zc-configLocation-cmd', '#terminalconfigLocation-cmd-required');
      }
    }

    if (iffieldcheck == true) {
      if( currentListConfiguration.setValToInput() == false){
        return false;
     }
      getConfigName = $.trim(getConfigName);
      getConfigNameID = getConfigName.replace(/\s/g, '');

      var newConsoleTab = '<li id="consoleTab-' + getConfigName + '" class="ide-tab tab-active"> <span class="tab-text">' + getConfigName + '</span><span class="tab-close" title="Close"><i class="icon-9"> <svg class="zc-grey"> <use xlink:href="#svg-close-icon"> </use> </svg> </i> </span></li>';

      var newConsoleTabContent = '<div data-id="consoleTab-' + getConfigNameID + '" class="console-tabContent"> <div class="zc-tabcontent"><p>Chat server listening at</p><p>&nbsp;</p> <p>Building SoftTabsize8.java and running SoftTabSize8</p><p><span class="zc-errorText">Error:</span> Could not find or load main class SoftTabSize8</p></div></div>';

      var addtoManageConfig = '<div class="zc-manageConfigItem"><span class="zc-fleft zc-configTitle">' + getConfigName + '</span><span class="zc-fright zc-manageConfigAction"><button class="zc-btn zc-btn-small icon zc-configstart-Btn" title="Stop"><i class="icon-12"> <svg class="zc-red"><use xlink:href="#svg-stop-icon12"> </use></svg></i></button><button class="zc-btn zc-btn-small icon zc-configMore-Btn" title="More" data-menu-id="ide-configMoreAction" data-active-class="active"><i class="icon-12"><svg class="zc-black"> <use xlink:href="#svg-verticalMore-icon"> </use> </svg></i></button></span></div>';

      var addtoManageConfigContent = '<div class="zc-createConfig zc-clearfix"><div class="zc-row"><div class="zc-field inline"><label>WAR Name:</label></div><div class="zc-inputField"><div class="zc-inputvalue">Root.war</div></div></div><div class="zc-row"><div class="zc-field inline"><label>JRE Version:</label></div><div class="zc-inputField"><div class="zc-inputvalue">8</div></div></div><div class="zc-row"><div class="zc-field inline"><label> Location to Run:</label></div><div class="zc-inputField"><div class="zc-inputvalue">tomcatProject/webapps/tomcatProject/bin</div></div></div><div class="zc-row"><div class="zc-field inline"><label>Program Arguments:</label></div><div class="zc-inputField"><div class="zc-inputvalue">${container_loc}${selected_resource_path}</div></div></div><div class="zc-row"><div class="zc-field inline"><label>VM Arguments:</label></div><div class="zc-inputField"><div class="zc-inputvalue">-Djava.security.egd=file:/dev/./urandom</div></div></div></div>';

      $("#zc-manageConfigList").prepend(addtoManageConfig);

      addButtonLoading(_this, "Creating");

      setTimeout(function (event) {
        if ($(".zc-ideContainer").hasClass("show-bottom-pane")) {
          $(".zc-ideContainer").removeClass("minimize-bottom-pane");
          $("#minimize-bottom-pane").addClass("zc-minimize");
        } else {
          $("#minimize-bottom-pane").addClass("zc-minimize");
          $(".zc-ideContainer").addClass("show-bottom-pane");
        }
        //$("#toggle-console").trigger("click");
        removeButtonLoading(_this, "Create");
      $("#configCreate-Btn .zbutton__text").empty().append("Save");
          
      $("#configCreate-menu [data-id='configCreateRun-Btn'] .zmenu__text").empty().append("Save and Run");
      $("#configCreate-menu [data-id='configCreateDebug-Btn'] .zmenu__text").empty().append("Save and Debug");
      
        $("#configCreate-Btn").attr('id', 'configSave-Btn');
      
       $("#configCreate-menu [data-id='configCreateRun-Btn']").attr('data-id', 'configSaveRun-Btn');
      $("#configCreate-menu [data-id='configCreateDebug-Btn']").attr('data-id', 'configSaveDebug-Btn');

        $("#ide-runMenu").zmenu("addMenuItem", { "index": "5", "id": getConfigNameID, "innerHTML": '' + getConfigName + '', "data-item-type": "custom" });
        $("#ide-runOnlyMenu").zmenu("addMenuItem", { "index": "5", "id": getConfigNameID, "innerHTML": '' + getConfigName + '', "data-item-type": "custom" });
        $("#ide-debugOnlyMenu").zmenu("addMenuItem", { "index": "5", "id": getConfigNameID, "innerHTML": '' + getConfigName + '', "data-item-type": "custom" });
        $("#consolePane-tabs .ide-tab").removeClass("tab-active");
        $("#consolePane-tabs .ide-tab").removeClass('zc-noTabSeparator');
        $("#consolePane-tabs").prepend(newConsoleTab);
        $("#console-tabContents .console-tabContent").addClass("zc-hide");
        $("#console-tabContents").prepend(newConsoleTabContent);

         /*--- output console select option function starts ----*/

         $("#zc-consolePane-select").zselect("removeOption", getConfigName);

         var selectArray = [{
           label: getConfigName,
           value: getConfigName
         }];
 
         $("#zc-consolePane-select").zselect("addOption", selectArray, "after");
 
         $("#zc-consolePane-select").zselect("setValue", getConfigName);
 
         $('#console-tabContents').find('div[data-id="consoleTab-' + getConfigName + '"]').removeClass('zc-hide').siblings().addClass('zc-hide');
 
         afterConfigurationCreation();

         consolePane();
         
         $("#console-tabContents").show();
         $('#ide-consoleRun').trigger('click');
         // $("#console-tab").addClass("ide-consoleTab");
         // $(".zc-consolePane").css("display", "block");
         // $("#consoleTab-runFile .tab-text").empty().append(getActiveFileTab);
         // $("#consoleTab-"+getItemId+"").removeClass("zc-hide");
         // $("#consoleTab-"+getItemId+"").trigger("click");
         // $("#zc-consoleTitle").css("display", "none");
         
   
         /*--- output console select option function ends ----*/

      }, 1500);
    }
  }

 function configCreateDebug(_this) {
    var _this = _this,
      getConfigNamelang = $("#zc-configName").val(),
      getConfigNamebyTerminal = $("#zc-configWithTerminal").val(),
      getConfigNamebyCmd = $("#zc-configWithCmd").val(),
      getConfigNameID,
      iffieldcheck = true;

    if ($('#configTypeLang').is(':checked')) {

      var getConfigName = $("#zc-configName").val(),
        getWarName = $("#zc-warName").val(),
        getConfigLocation = $("#zc-configLocation-tomcat").val();

      if (getConfigName == "" || getConfigName == null) {
         $('#configName-required').text('Configuration Name is required.');
         textfield_show_error('#zc-configName', '#configName-required');
         iffieldcheck = false;
      } else if(/\s/.test(getConfigName)){
         $('#configName-required').text('Can contain alphabets, numbers, hyphens (-) and underscores (_).');
         textfield_show_error('#zc-configName', '#configName-required');
         iffieldcheck = false;
      } else {
        textfield_hide_error('#zc-configName', '#configName-required');
      }
      
      if (getWarName == "" || getWarName == null) {
        textfield_show_error('#zc-warName', '#warName-required');
        iffieldcheck = false;
      } else {
        textfield_hide_error('#zc-warName', '#warName-required');
      }
      
      if (getConfigLocation == "" || getConfigLocation == null) {
        textfield_show_error('#zc-configLocation-tomcat', '#terminalconfigLocation-tomcat-required');
        iffieldcheck = false;
      } else {
        textfield_hide_error('#zc-configLocation-tomcat', '#terminalconfigLocation-tomcat-required');
      }

    } else if ($('#configTypeCustom').is(':checked')) {
      var getConfigName = $("#zc-configWithTerminal").val();
       var getConfigCmd = $("#zc-configWithCmd").val(); 
       var getConfigLocation = $("#zc-configLocation-cmd").val();
       
      if (getConfigName == "" || getConfigName == null) {
         $('#terminalconfigName-required').text('Configuration Name is required.');
         textfield_show_error('#zc-configWithTerminal', '#terminalconfigName-required');
         iffieldcheck = false;
      } else if(/\s/.test(getConfigName)){
         $('#terminalconfigName-required').text('Can contain alphabets, numbers, hyphens (-) and underscores (_).');
         textfield_show_error('#zc-configWithTerminal', '#terminalconfigName-required');
         iffieldcheck = false;
      }else  {
        textfield_hide_error('#zc-configWithTerminal', '#terminalconfigName-required');
      }
        
        if (getConfigCmd == "" || getConfigCmd == null) {
        textfield_show_error('#zc-configWithCmd', '#terminalconfigCmd-required');
        iffieldcheck = false;
      } else {
        textfield_hide_error('#zc-configWithCmd', '#terminalconfigCmd-required');
      }
       if (getConfigLocation == "" || getConfigLocation == null) {
        textfield_show_error('#zc-configLocation-cmd', '#terminalconfigLocation-cmd-required');
        iffieldcheck = false;
      } else {
        textfield_hide_error('#zc-configLocation-cmd', '#terminalconfigLocation-cmd-required');
      }
    }

    if (iffieldcheck == true) {
      if( currentListConfiguration.setValToInput() == false){
        return false;
     }
      getConfigName = $.trim(getConfigName);
      getConfigNameID = getConfigName.replace(/\s/g, '');

      var newConsoleTab = '<li id="consoleTab-' + getConfigName + '" class="ide-tab tab-active"> <span class="tab-text">' + getConfigName + '</span><span class="tab-close" title="Close"><i class="icon-9"> <svg class="zc-grey"> <use xlink:href="#svg-close-icon"> </use> </svg> </i> </span></li>';

      var newConsoleTabContent = '<div data-id="consoleTab-' + getConfigNameID + '" class="console-tabContent"> <div class="zc-tabcontent"><p>Chat server listening at</p><p>&nbsp;</p> <p>Building SoftTabsize8.java and running SoftTabSize8</p><p><span class="zc-errorText">Error:</span> Could not find or load main class SoftTabSize8</p></div></div>';

      var addtoManageConfig = '<div class="zc-manageConfigItem"><span class="zc-fleft zc-configTitle">' + getConfigName + '</span><span class="zc-fright zc-manageConfigAction"><button class="zc-btn zc-btn-small icon zc-configstart-Btn" title="Stop"><i class="icon-12"> <svg class="zc-red"><use xlink:href="#svg-stop-icon12"> </use></svg></i></button><button class="zc-btn zc-btn-small icon zc-configMore-Btn" title="More" data-menu-id="ide-configMoreAction" data-active-class="active"><i class="icon-12"><svg class="zc-black"> <use xlink:href="#svg-verticalMore-icon"> </use> </svg></i></button></span></div>';

      var addtoManageConfigContent = '<div class="zc-createConfig zc-clearfix"><div class="zc-row"><div class="zc-field inline"><label>WAR Name:</label></div><div class="zc-inputField"><div class="zc-inputvalue">Root.war</div></div></div><div class="zc-row"><div class="zc-field inline"><label>JRE Version:</label></div><div class="zc-inputField"><div class="zc-inputvalue">8</div></div></div><div class="zc-row"><div class="zc-field inline"><label> Location to Run:</label></div><div class="zc-inputField"><div class="zc-inputvalue">tomcatProject/webapps/tomcatProject/bin</div></div></div><div class="zc-row"><div class="zc-field inline"><label>Program Arguments:</label></div><div class="zc-inputField"><div class="zc-inputvalue">${container_loc}${selected_resource_path}</div></div></div><div class="zc-row"><div class="zc-field inline"><label>VM Arguments:</label></div><div class="zc-inputField"><div class="zc-inputvalue">-Djava.security.egd=file:/dev/./urandom</div></div></div></div>';

      $("#zc-manageConfigList").prepend(addtoManageConfig);

      addButtonLoading(_this, "Creating");

      setTimeout(function (event) {
        if ($(".zc-ideContainer").hasClass("show-bottom-pane")) {
          $(".zc-ideContainer").removeClass("minimize-bottom-pane");
          $("#minimize-bottom-pane").addClass("zc-minimize");
        } else {
          $("#minimize-bottom-pane").addClass("zc-minimize");
          $(".zc-ideContainer").addClass("show-bottom-pane");
        }
        //$("#toggle-console").trigger("click");
        removeButtonLoading(_this, "Create");
       $("#configCreate-Btn .zbutton__text").empty().append("Save");
       
      $("#configCreate-menu [data-id='configCreateRun-Btn'] .zmenu__text").empty().append("Save and Run");
      $("#configCreate-menu [data-id='configCreateDebug-Btn'] .zmenu__text").empty().append("Save and Debug");
      
      $("#configCreate-Btn").attr('id', 'configSave-Btn');
      
      $("#configCreate-menu [data-id='configCreateRun-Btn']").attr('data-id', 'configSaveRun-Btn');
      $("#configCreate-menu [data-id='configCreateDebug-Btn']").attr('data-id', 'configSaveDebug-Btn');
      
        $("#ide-runMenu").zmenu("addMenuItem", { "index": "5", "id": getConfigNameID, "innerHTML": '' + getConfigName + '', "data-item-type": "custom" });
        $("#ide-runOnlyMenu").zmenu("addMenuItem", { "index": "5", "id": getConfigNameID, "innerHTML": '' + getConfigName + '', "data-item-type": "custom" });
        $("#ide-debugOnlyMenu").zmenu("addMenuItem", { "index": "5", "id": getConfigNameID, "innerHTML": '' + getConfigName + '', "data-item-type": "custom" });
        $("#consolePane-tabs .ide-tab").removeClass("tab-active");
        $("#consolePane-tabs .ide-tab").removeClass('zc-noTabSeparator');
        $("#consolePane-tabs").prepend(newConsoleTab);
        $("#console-tabContents .console-tabContent").addClass("zc-hide");
        $("#console-tabContents").prepend(newConsoleTabContent);

         /*--- output console select option function starts ----*/

         $("#zc-consolePane-select").zselect("removeOption", getConfigName);

         var selectArray = [{
           label: getConfigName,
           value: getConfigName
         }];
 
         $("#zc-consolePane-select").zselect("addOption", selectArray, "after");
 
         $("#zc-consolePane-select").zselect("setValue", getConfigName);
 
         $('#console-tabContents').find('div[data-id="consoleTab-' + getConfigName + '"]').removeClass('zc-hide').siblings().addClass('zc-hide');
 
            afterConfigurationCreation();
           
            consolePane();
         
         $("#console-tabContents").show();
         $('#ide-consoleRun').trigger('click');
         
         /*--- output console select option function ends ----*/

      }, 1500);
    }
  }

  $("#zc-ide").on("click", "#configSave-Btn", function (event) {
    var _this = $(this).find('.zbutton__text');
    addButtonLoading(_this, "Saving");
    setTimeout(function (event) {
      removeButtonLoading(_this, "Save");
      successToast("Configuration saved successfully.");
      toast_Position();
    }, 1500);

    hideToast();

  });

  function configSaveRun(_this) {
    var _this = _this;
    addButtonLoading(_this, "Saving");
    setTimeout(function (event) {
      if ($(".zc-ideContainer").hasClass("show-bottom-pane")) {
        $(".zc-ideContainer").removeClass("minimize-bottom-pane");
        $("#minimize-bottom-pane").addClass("zc-minimize");
      } else {
        $("#minimize-bottom-pane").addClass("zc-minimize");
        $(".zc-ideContainer").addClass("show-bottom-pane");
      }
      removeButtonLoading(_this, "Save");
      afterConfigurationCreation();
    }, 1500);
  }

   function configSaveDebug(_this) {
    var _this = _this;
    addButtonLoading(_this, "Saving");
    setTimeout(function (event) {
      if ($(".zc-ideContainer").hasClass("show-bottom-pane")) {
        $(".zc-ideContainer").removeClass("minimize-bottom-pane");
        $("#minimize-bottom-pane").addClass("zc-minimize");
      } else {
        $("#minimize-bottom-pane").addClass("zc-minimize");
        $(".zc-ideContainer").addClass("show-bottom-pane");
      }
      removeButtonLoading(_this, "Save");
      afterConfigurationCreation();
    }, 1500);
  }

 $("#zc-ide").on("click", "#manageConfigSave-btn", function () {
    if( currentListConfiguration.setValToInput() == false){
        return false;
     }
    var _this = $(this).find('.zbutton__text');
    if(_this.text() == 'Save'){
       addButtonLoading(_this, "Saving");
    } else {
       addButtonLoading(_this, "Creating");
    }
    
    setTimeout(function (event) {
       if(_this.text() == 'Save'){
          removeButtonLoading(_this, "Save");
       } else {
          removeButtonLoading(_this, "Create");
       }
      successToast("Configuration saved successfully.");
      toast_Position();
      afterConfigurationCreation();
      
      $('#zc-manageConfigList .zc-configTitle').each(function(i,j){
         if($(j).text() == editableConfigName){
            if(!$(j).siblings('.zc-manageConfigAction').find('.zc-configstart-Btn').hasClass('togglePlay')){
               $(j).siblings('.zc-manageConfigAction').find('.zc-configstart-Btn').trigger('click');
            }
         }
      });
      
    }, 1500);

    hideToast();

  });

   function manageConfigRun(_this) {
   if( currentListConfiguration.setValToInput() == false){
        return false;
     }
    var _this = _this;
    if(_this.text() == 'Save'){
       addButtonLoading(_this, "Saving");
    } else {
       addButtonLoading(_this, "Creating");
    }
    setTimeout(function (event) {
      if(_this.text() == 'Save'){
          removeButtonLoading(_this, "Save");
       } else {
          removeButtonLoading(_this, "Create");
       }
      successToast("Configuration saved successfully.");
      toast_Position();
      if ($(".zc-ideContainer").hasClass("show-bottom-pane")) {
        $(".zc-ideContainer").removeClass("minimize-bottom-pane");
        $("#minimize-bottom-pane").addClass("zc-minimize");
      } else {
        $("#minimize-bottom-pane").addClass("zc-minimize");
        $(".zc-ideContainer").addClass("show-bottom-pane");
      }
      afterConfigurationCreation();
      
      $('#zc-manageConfigList .zc-configTitle').each(function(i,j){
         if($(j).text() == editableConfigName){
            if($(j).siblings('.zc-manageConfigAction').find('.zc-configstart-Btn').hasClass('togglePlay')){
               $(j).siblings('.zc-manageConfigAction').find('.zc-configstart-Btn').trigger('click');
            }
         }
      });
            
      consolePane();
      
      $("#console-tabContents").show();
      $('#ide-consoleRun').trigger('click');
    }, 1500);

    hideToast();
  }

   function manageConfigDebug(_this) {
   if( currentListConfiguration.setValToInput() == false){
        return false;
     }
    var _this = _this;
    if(_this.text() == 'Save'){
       addButtonLoading(_this, "Saving");
    } else {
       addButtonLoading(_this, "Creating");
    }
    setTimeout(function (event) {
       if(_this.text() == 'Save'){
          removeButtonLoading(_this, "Save");
       } else {
          removeButtonLoading(_this, "Create");
       }
      successToast("Configuration saved successfully.");
      toast_Position();
      if ($(".zc-ideContainer").hasClass("show-bottom-pane")) {
        $(".zc-ideContainer").removeClass("minimize-bottom-pane");
        $("#minimize-bottom-pane").addClass("zc-minimize");
      } else {
        $("#minimize-bottom-pane").addClass("zc-minimize");
        $(".zc-ideContainer").addClass("show-bottom-pane");
      }
      afterConfigurationCreation();
      
      $('#zc-manageConfigList .zc-configTitle').each(function(i,j){
         if($(j).text() == editableConfigName){
            if($(j).siblings('.zc-manageConfigAction').find('.zc-configstart-Btn').hasClass('togglePlay')){
               $(j).siblings('.zc-manageConfigAction').find('.zc-configstart-Btn').trigger('click');
            }
         }
      }) 
            
      consolePane();
      
      $("#console-tabContents").show();
      $('#ide-consoleRun').trigger('click');
    }, 1500);

    hideToast();
  }

  $("#zc-ide").on("click", "#zc-backtoManage", function () {
    var getconfigName = $('#zc-configName').val();
    var getConfigLength = $('.zc-manageConfigItem').length;
    $("#tabCloseAlertBtn").attr("id", "closeConfig-btn");
    var inputs = Array.from($('#zc-createConfig-template > div:visible input,#zc-createConfig-template > div:visible  textarea'));
    var checkEmpty = inputs.some(function(ele) {
       return $(ele).val() !== $(ele).attr('data-init');
    });
    
   //  if(checkEmpty){
   //     if($('#manageConfigSave-btn').text() == 'Create' && $('#manageConfigSave-btn').is(':visible')){
   //        checkEmpty = false;
   //     }
   //  }
    
    if (checkEmpty) {
      $("#zc-closeConfigOverlay").addClass('zc-isVisible');
      $("#confirm-closeConfig").addClass("zc-showDialog");
    } else {
       
      if($('#manageConfigSave-btn').text() == 'Create' && $('#manageConfigSave-btn').is(':visible')){
         $('#zc-manageConfigList .zc-manageConfigItem:first').remove();
      }
      
      $('.zc-createConfigWrap, .zc-manageConfigWrap').addClass('zc-hide');
      $('.zc-runConfig').removeClass('zc-hide');
      if (getConfigLength == 0) {
         $('#zc-manageConfigList').closest('.zc-runConfig').addClass('zc-manageConfigEmpty');
      } else {
        $('#zc-manageConfigList').closest('.zc-runConfig').removeClass('zc-manageConfigEmpty');
      }
      
     
      
    }

  });

  // Add Environment Variables
  $(document).on("click", "#zc-envirVariable .zc-envirAdd", function () {
    var newVariable = '<div class="zc-variableWrap"><div class="zc-variableInput"><input type="text" class="zc-input zc-nameInput" placeholder="Name"><input type="text" class="zc-input zc-valueInput" placeholder="Value"></div><button class="zc-btn icon zc-envirAdd" title="Add"><i class="icon"> <svg class="zc-black"> <use xlink:href="#svg-add-icon"></use></svg></i></button>  <button class="zc-btn icon zc-removeVariable zc-hide" title="Remove"><i class="icon"> <svg class="zc-black"> <use xlink:href="#svg-minus-icon"></use></svg></i> </button></div>';
    $(this).next('.zc-removeVariable').removeClass('zc-hide');
    $("#zc-envirVariable .zc-newVarContainer").removeClass("zc-hide");
    $("#zc-envirVariable .zc-newVarContainer").append(newVariable);
    $(this).remove();
  });

  $(document).on("click", "#zc-envirVariableManage .zc-envirAdd", function () {
    var newVariable = '<div class="zc-variableWrap"><div class="zc-variableInput"><input type="text" class="zc-input zc-nameInput" placeholder="Name"><input type="text" class="zc-input zc-valueInput" placeholder="Value"></div><button class="zc-btn icon zc-envirAdd" title="Add"><i class="icon"> <svg class="zc-black"> <use xlink:href="#svg-add-icon"></use></svg></i></button>  <button class="zc-btn icon zc-removeVariable zc-hide" title="Remove"><i class="icon"> <svg class="zc-black"> <use xlink:href="#svg-minus-icon"></use></svg></i> </button></div>';
    $(this).next('.zc-removeVariable').removeClass('zc-hide');
    $("#zc-envirVariableManage .zc-newVarContainer").removeClass("zc-hide");
    $("#zc-envirVariableManage .zc-newVarContainer").append(newVariable);
    $(this).remove();
  });

  $(document).on('click', ".zc-removeVariable", function () {
    $(this).parent('.zc-variableWrap').remove();
  });

  $(document).on('focus', ".zc-manageVariableInput .zc-input", function () {
    $(".zc-manageVariableInput .zc-removeVariableManage").addClass("zc-hide");
    $(this).next('.zc-removeVariableManage').removeClass("zc-hide");
    $(this).parent('td').next("td").find('.zc-removeVariableManage').removeClass("zc-hide");
  });

  $(document).on('click', ".zc-removeVariableManage", function () {
    $(this).parent('td').closest('tr').remove();
    var variableLength = $('.zc-manageVariableInput tbody tr').length;
    console.log(variableLength);
    var resetVariable = '<div class="zc-variableInput"><input type="text" class="zc-input zc-nameInput" placeholder="Name"><input type="text" class="zc-input zc-valueInput" placeholder="Value"></div><button id="addNewVariableManage" class="zc-btn icon zc-envirAdd" title="Add"><i class="icon"><svg class="zc-black"> <use xlink:href="#svg-add-icon"></use></svg></i></button><div class="zc-newVarContainer zc-fleft zc-hide"> </div>';
    if (variableLength == 0) {
      $("#zc-envirVariableManage").empty().append(resetVariable);
    }
  });

  $("#zc-ide").on("click", "#closeConfig-btn", function () {
   if($('#manageConfigSave-btn').text() == 'Create' && $('#manageConfigSave-btn').is(':visible')){
      $('#zc-manageConfigList .zc-manageConfigItem:first').remove();
   }
   $("#zc-closeConfigOverlay").removeClass('zc-isVisible');
   $("#confirm-closeConfig").removeClass("zc-showDialog");
   var getConfigLength = $('.zc-manageConfigItem').length;
   $('.zc-createConfigWrap, .zc-manageConfigWrap').addClass('zc-hide');
   $('.zc-runConfig').removeClass('zc-hide');
   if (getConfigLength == 0) {
      $('#zc-manageConfigList').closest('.zc-runConfig').addClass('zc-manageConfigEmpty');
   } else {
      $('#zc-manageConfigList').closest('.zc-runConfig').removeClass('zc-manageConfigEmpty');
   }
  });

  $("#zc-ide").on("click", "#closeConfig-CancelBtn", function () {
    $("#zc-closeConfigOverlay").removeClass('zc-isVisible');
    $("#confirm-closeConfig").removeClass("zc-showDialog");
  });

  $("#zc-ide").on("click", "#tabCloseAlertBtn", function (event) {
    $("#zc-closeConfigOverlay").removeClass('zc-isVisible');
    $("#confirm-closeConfig").removeClass("zc-showDialog");
    tabClose($(".currentTab"));
  });

  /* RUN CONFIG ALERT DIALOG */
  $(document).on("click","#deleteConfig-btn", function () {
    $("#zc-deleteConfigOverlay").removeClass('zc-isVisible');
    $("#confirm-deleteConfig").removeClass("zc-showDialog");
    $('.selectedConfig').remove();
    var getConfigLength = $('.zc-manageConfigItem').length;
    if (getConfigLength == 0) {
      $('#zc-manageConfigList').closest('.zc-runConfig').addClass('zc-manageConfigEmpty');
    } else {
      $('#zc-manageConfigList').closest('.zc-runConfig').removeClass('zc-manageConfigEmpty');
    }
  });

  $(document).on("click","#deleteConfig-CancelBtn", function () {
    $("#zc-deleteConfigOverlay").removeClass('zc-isVisible');
    $("#confirm-deleteConfig").removeClass("zc-showDialog");
  });
  
   $(document).on("click","#create-config-btn", function () {
    $('.zc-manageConfigWrap, .zc-runConfig, #empty-state-config').addClass('zc-hide');
    $('.zc-createConfigWrap').removeClass('zc-hide');
  });

  $(document).on('click','#ide-consoleRun',function(){
     $('#console-tabContents').show();
  });

   $(document).on('keyup','#zc-editConfig input',function(){
      var inputs = Array.from($('#zc-editConfig input'));
      var change = inputs.some(function(ele){
        return $(ele).val() !== $(ele).attr('data-init'); 
      });
      if(change && $('#manageConfigSave-btn').is(':visible') && $('#manageConfigSave-btn .zbutton__text').text() == 'Save'){
         $('#manageConfigSave-btn').removeClass('disabled').siblings().removeClass('disabled').parent().removeClass('disabled');
      }
   })
   
   
	$(document).on("click", ".zc-configstart-Btn", function (event) {
		var _this = $(this);
		_this.toggleClass("togglePlay");
		if (_this.hasClass("togglePlay")) {
			_this.find("i").empty().append('	<svg class="zc-green"><use xlink:href="#svg-debugResume-icon12"> </use></svg>');
			_this.attr("title", "Run");
		} else {
			_this.find("i").empty().append('	<svg class="zc-red"><use xlink:href="#svg-stop-icon12"> </use></svg>');
			_this.attr("title", "Stop");
		}
		event.stopPropagation();
		$(this).blur();
	});
	
   $(document).on("click", ".zc-configMore-Btn", function (event) {
      $(this).closest('.zc-manageConfigItem').addClass('zc-configItemActive');
	   event.stopPropagation();
	});
	
	$(document).on("mouseover", ".zc-configstart-Btn,.zc-configMore-Btn", function (event){
	   $(this).closest('.zc-manageConfigItem').addClass('zc-configNoHover');
	});
	
	$(document).on("mouseleave", ".zc-configstart-Btn,.zc-configMore-Btn", function (event){
	   $(this).closest('.zc-manageConfigItem').removeClass('zc-configNoHover');
	});

});

function configRunLocationSelection() {
   
   if($('#zc-configLocation-tomcat').is(':visible')) {
      $('#zc-configLocation-tomcat').val('tomcatProject/webapps/tomcatProject/bin');
   }
   if($('#zc-configLocation-cmd').is(':visible')) {
      $('#zc-configLocation-cmd').val('tomcatProject/webapps/tomcatProject/bin');      
   }
}

function configEdit(_this) {
   $('#manageConfigSave-btn').addClass('disabled').siblings().addClass('disabled').parent().addClass('disabled');
    _this.addClass('zc-configEditing').siblings().removeClass('zc-configEditing');
    currentListConfiguration.updateList();
    $('.zc-manageConfigWrap').removeClass('zc-hide');
    $('#zc-manageConfigName').focus();
    $('.zc-runConfig, .zc-createConfigWrap').addClass('zc-hide');
   //  $(".zc-backtoManage").empty().append('<span class="icon"><svg class="zc-black"> <use xlink:href="#svg-back-icon"> </use></svg></span> <span>Back</span>');
    var configTitle = _this.find('.zc-configTitle').text();
    editableConfigName = configTitle;
    $("#zc-manageConfigName").val(configTitle);
    
    $('#manageConfigSave-btn .zbutton__text').text('Save');
       $('#manageConfigSave-menu li[data-id="manageConfigDebug-btn"] .zmenu__text').text('Save and Debug');
    $('#manageConfigSave-menu li[data-id="manageConfigRun-btn"] .zmenu__text').text('Save and Run');
    
     $.each($('#zc-createConfig-template > div:visible input,#zc-createConfig-template > div:visible  textarea'),function(index,ele){
       $(ele).attr('data-init',$(ele).val());
    });
     $('#zc-editConfig .zc-configWrapTitle h2').text('Edit Configuration');
  }

function configDuplicate(_this) {
   $('#manageConfigSave-btn').removeClass('disabled').siblings().removeClass('disabled').parent().removeClass('disabled');
    var duplicateConfig = _this.closest('.zc-manageConfigItem').html();
    
    $("#zc-manageConfigList").prepend('<div class="zc-manageConfigItem duplicateConfig">' + duplicateConfig + '</div>');
    $("#zc-manageConfigList").find('.zc-configDuplicate-Btn').attr('title','Make a Copy');
    var getdupName = $("#zc-manageConfigList").find('.duplicateConfig').children('.zc-configTitle').text();
    
    $("#zc-manageConfigList").find('.duplicateConfig').children('.zc-configTitle').empty().append("copy_of_" + getdupName);
    $("#zc-manageConfigList").find('.duplicateConfig').addClass('zc-configEditing').siblings().removeClass('zc-configEditing');
    
    $("#zc-manageConfigList .zc-manageConfigItem:first").addClass('zc-configEditing').siblings().removeClass('zc-configEditing');
    
     currentListConfiguration.updateList();
     
    $('.zc-manageConfigWrap').removeClass('zc-hide');
    $('#zc-manageConfigName').focus();
    $('.zc-runConfig, .zc-createConfigWrap').addClass('zc-hide');
    var configTitle = $("#zc-manageConfigList .zc-manageConfigItem:first").find('.zc-configTitle').text();
    editableConfigName = configTitle;
    $("#zc-manageConfigName").val(configTitle);

     $.each($('#zc-createConfig-template > div:visible input,#zc-createConfig-template > div:visible  textarea'),function(index,ele){
       $(ele).attr('data-init',$(ele).val());
    });
    
    $('#manageConfigSave-btn .zbutton__text').text('Create');
    $('#manageConfigSave-menu li[data-id="manageConfigDebug-btn"] .zmenu__text').text('Create and Debug');
    $('#manageConfigSave-menu li[data-id="manageConfigRun-btn"] .zmenu__text').text('Create and Run');
    $('#zc-editConfig .zc-configWrapTitle h2').text('Make a Copy');
    
    setTimeout(function () {
      $('#zc-editConfig .zc-configWrapTitle h2').text('Make a Copy');
      $("#zc-manageConfigList .zc-manageConfigItem").removeClass('duplicateConfig');
    }, 600);
  }
  
function configDelete(_this) {
    $('.zc-manageConfigItem').removeClass('selectedConfig');
    _this.parent('.zc-manageConfigAction').closest('.zc-manageConfigItem').addClass("selectedConfig");
    $("#zc-deleteConfigOverlay").addClass('zc-isVisible');
    $("#confirm-deleteConfig").addClass("zc-showDialog");
  }

var currentListConfiguration = (function() {
   
   var arrayList = [];
   
   var updateList = function() {
      var list = Array.from($('#zc-manageConfigList .zc-manageConfigItem:not(.zc-configEditing)'));
      arrayList = list.map(function(ele){ return $(ele).find('.zc-configTitle').text(); });
   };
   
   var getVal = function() {
      return arrayList;
   }
   
   var setValToInput = function() {
      
      if($('#zc-editConfig').is(':visible')){
         var getConfigName = $("#zc-manageConfigName").val();
       var getWarName = $("#zc-tomacatFile input").val(); 
       var getConfigLocation = $("#zc-configLocation3").val();
       
      if (getConfigName == "" || getConfigName == null) {
         $('#manageconfigName-required').text('Configuration Name is required.');
         textfield_show_error('#zc-manageConfigName', '#manageconfigName-required');
         iffieldcheck = false;
      } else if(/\s/.test(getConfigName)){
         $('#manageconfigName-required').text('Can contain alphabets, numbers, hyphens (-) and underscores (_).');
         textfield_show_error('#zc-manageConfigName', '#manageconfigName-required');
         iffieldcheck = false;
      } else {
        textfield_hide_error('#zc-manageConfigName', '#manageconfigName-required');
      }
 
      if (getWarName == "" || getWarName == null) {
        textfield_show_error('#zc-tomacatFile input', '#manageConfigEditWar-required');
        iffieldcheck = false;
      } else {
        textfield_hide_error('#zc-tomacatFile input', '#manageConfigEditWar-required');
      }
      
      if (getConfigLocation == "" || getConfigLocation == null) {
        textfield_show_error('#zc-configLocation3', '#editconfigLocation-tomcat-required');
        iffieldcheck = false;
      } else {
        textfield_hide_error('#zc-configLocation3', '#editconfigLocation-tomcat-required');
      }
      
      if($('#zc-editConfig').find('.zc-errorText:visible').length > 0){
         $('#zc-editConfig').find('.zc-errorText:first').focus();
         return false;
      }
      
      }

      if($('#zc-manageConfigName').is(':visible')) { var currentVal =  $('#zc-manageConfigName').val(); }
      if($('#zc-configName').is(':visible')) { currentVal =  $('#zc-configName').val(); }
      if(arrayList.includes(currentVal)){
         errorToast("Configuration with the same name already exists.");
         toast_Position();
         hideErrorToast();
         return false;
      } else {
         $('.zc-configEditing').find('.zc-configTitle').text(currentVal);
      }
   }
   
   return {
      updateList : updateList,
      getter : getVal,
      setValToInput : setValToInput
   }
})();
