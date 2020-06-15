  /*--- FIND AND REPLACE PANE ---*/

  $(document).ready(function(){

    // FIND INPUT TEXT KEYUP
    $("#find-text").on("keyup", function() {
      var getInputValue = $("#find-text").val(),
          getInputValue = $.trim(getInputValue),
          getInputValue = getInputValue.length;
      if (!(getInputValue > 0)) {
        $("#zc-find-replace-pane .find-count").css("display", "none");
        $("#zc-findNavBtn .zc-btn, #zc-findBtn").attr('disabled', true);
        $("#zc-findNavBtn .zc-btn, #zc-findBtn").addClass('disabled');
      } else {
        $("#zc-find-replace-pane .find-count").css("display", "inline-block");
        $("#zc-findNavBtn .zc-btn, #zc-findBtn").removeAttr('disabled');
        $("#zc-findNavBtn .zc-btn, #zc-findBtn").removeClass('disabled');
      }
    });

    // ENABLE REPLACE OPTION 
    $(document).on("click", "#enableReplaceOption", function(){
      if($(this).is(":checked"))
      {
        $("#zc-replaceOnly").show(0, function(){
          $(this).addClass("show-replaceWrap");
        });
        $("#zc-replace-input").focus();
      } else {
        $("#zc-replaceOnly").removeClass("show-replaceWrap");
      }
    });

    // FIND PANE CLOSE 
    $(document).on("click", "#zc-findPaneClose", function(event) {
      $("#zc-find-replace-pane").removeClass("show-findReplacePane");
      setTimeout(function(){
        $("#zc-find-replace-pane").hide();
      }, 200);
      $(".zc-editorTabContent").css("top", "32px"); 
    });

    // REPLACE INPUT KEYUP
    $(document).on("keyup", "#zc-replace-input", function() {
      var getInputValue = $("#zc-replace-input").val(),
          getInputValue = $.trim(getInputValue),
          getInputValue = getInputValue.length;
      if (!(getInputValue > 0)) {
        $("#zc-replaceOnly .zc-btn").attr("disabled", true);
        $("#zc-replaceOnly .zc-btn").addClass("disabled");
      } else {
        $("#zc-replaceOnly .zc-btn").removeAttr('disabled');
        $("#zc-replaceOnly .zc-btn").removeClass('disabled');
      }
    });

    //REPLACE BUTTON CLICK ON SINGLE FILE
    var replaceSingleFile = function(getReplaceableText){
      $("#findSearchResult .replaceableText-cursorPos").empty().append(getReplaceableText);
      $("#findSearchResult .replaceableText-cursorPos").addClass("textReplaced");
      $("#findSearchResult .textReplaced").removeClass("replaceableText-cursorPos replaceableText-isVisible");
      $("#findReplace-tab .tab-unsaved").remove();
      $("#findReplace-tab").prepend('<span class="tab-unsaved"> </span>');
    }

    // REPLACE BUTTON CLICK 
    $(document).on("click", "#zc-replaceBtn", function(){
      console.log("yes");
      var getReplaceableText = $("#zc-replace-input").val(),
          getReplaceableText = $.trim(getReplaceableText),
          replaceableText1  = $("#replaceableText-1"),
          replaceableText2  = $("#replaceableText-2"),
          replaceableText3  = $("#replaceableText-3"),
          replaceableText4  = $("#replaceableText-4"),
          replaceableText5  = $("#replaceableText-5");
      if(!(replaceableText1.hasClass('textReplaced'))){
        replaceSingleFile(getReplaceableText);
        $("#replaceableText-2").addClass('replaceableText-cursorPos');
        $(".zc-find-wrap .find-count").empty().append('1 of 4');
      } else if(!(replaceableText2.hasClass('textReplaced'))){
        replaceSingleFile(getReplaceableText);
        $("#replaceableText-3").addClass('replaceableText-cursorPos');
        $(".zc-find-wrap .find-count").empty().append('1 of 3');
      } else if(!(replaceableText3.hasClass('textReplaced'))){
        replaceSingleFile(getReplaceableText);
        $("#replaceableText-4").addClass('replaceableText-cursorPos');
        $(".zc-find-wrap .find-count").empty().append('1 of 2');
      } else if(!(replaceableText4.hasClass('textReplaced'))){
        replaceSingleFile(getReplaceableText);
        $("#replaceableText-5").addClass('replaceableText-cursorPos');
        $(".zc-find-wrap .find-count").empty().append('1 of 1');
      } else {
        replaceSingleFile(getReplaceableText);
        $(".zc-find-wrap .find-count").empty().append('No Results');
        $("#find-text").css("border-color","#ca533a");
        setTimeout(function() {
          $("#replace-succes-msg").addClass("show-toast-message");
          toast_Position();
        },400);
        setTimeout(function() {
          $("#replace-succes-msg").removeClass("show-toast-message");
          toast_Position();
        },3500);
      }
    });

    // REPLACE ALL BUTTON CLICK 
    $(document).on("click", "#zc-replaceAllBtn", function(){
      var getReplaceableText = $("#zc-replace-input").val(),
          getReplaceableText = $.trim(getReplaceableText);
      $("#findSearchResult .replaceableText").removeClass("replaceableText-isVisible replaceableText-cursorPos");
      $("#findSearchResult .replaceableText").empty().append(getReplaceableText);
      $(".zc-find-wrap .find-count").empty().append('No Results');
      $("#find-text").css("border-color","#ca533a");
      setTimeout(function() {
        $("#replace-succes-msg").addClass("show-toast-message");
        toast_Position();
      },400);
      setTimeout(function() {
        $("#replace-succes-msg").removeClass("show-toast-message");
        toast_Position();
      },3500);
    });

  });