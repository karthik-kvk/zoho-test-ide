$(window).load(function () {

    initPopover = function (popoverArray) {

        $.each(popoverArray, function (index, list) {

            //popover option
            $(list.popoverId).zpopover({
                forElement: $(list.targetId),
                title: list.title,
                width: list.width,
                height: list.height,
                  margin: {
                     top: list.topMargin
                  },
                wrapAroundKeyboardNavigation: true,
                open: function () {
                    $(list.targetId).addClass('active');
                    if (list.open !== undefined) {
                        list.open()
                    }
                },
                close: function () {
                    $(list.targetId).removeClass('active');
                    $('.ide-moreFileList li').removeClass('onFocus');
                },
                beforeopen: list.beforeopen,
                className: list.className,
                animation: {
                    open: {
                        className: "animate-fadedown"
                    }
                }
            });

            //toggle event for target
            ZComponents.addOpenListener("popover", [{
                element: $(list.popoverId),
                options: {
                    popOn: list.popOn || "click",
                    forElement: $(list.targetId)
                }
            }]);

        });

    }


    //popover array
    popoverArray = [{
     title: 'Opened Files',
     targetId: '#ide-moreFileTabBtn',
     popoverId: '#ide-moreFileTab-popover',
     className: "ide-moreFilePopover",
     width: 320,
   },
   {
     targetId: '#ide-notification-list',
     title: 'Notifications',
     popoverId: '#zc-idenotification-popover',
     open: notificationBeforeOpen,
     width: 400,
     topMargin: -8
   },
   {
     title: 'Filter by User',
     targetId: '#ide-fileCmtFilter',
     popoverId: '#ide-cmtFileUserFilter',
     width: 400
   },
   {
     title: 'Filter by',
     targetId: '#ide-projCmtFilter',
     popoverId: '#ide-cmtProjUserFilter',
     width: 400
   },
   {
     title: 'Filter by',
     targetId: '#ide-outline-filter',
     popoverId: '#ide-outline-filter-popover',
     width: 300
   },
   {
     targetId: '#zc-sCutScopeTitleNote',
     popoverId: '#ide-keyboardShortcutScopeNote',
     popOn: 'mouseover',
     width: 380,
   },
   {
     targetId: '#zc-sCutKeyboardModeNote',
     popoverId: '#ide-sCutKeyboardModeNote',
     popOn: 'mouseover',
     width: 380,
   },
   {
     targetId: '#zc-activeCollabUsers',
     popoverId: '#ide-showActiveCollbList',
     //content: getPopCollab,
     popOn: 'click',
     width: 380,
   }
    ];


    initPopover(popoverArray);





});