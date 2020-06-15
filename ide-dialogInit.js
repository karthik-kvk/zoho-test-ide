var initDialog, dialogObj;

$(function () {

	// JSON for Dialog
	dialogObj = [
		//New File
		{
			targetId: ['ide-create-files', 'ide-create-files-toolmenu'],
			dialogId: 'zc-newFileDialog',
			dialogTitle: 'New File',
			button: [{
				'text': 'Create',
				'id': 'zc-newFileDialogSubmit',
				'action': function () {
					dialogFieldValidate('zc-newFileDialog', 'zc-newFileDialogSubmit', 'Creating', 'The file has been created.');
				},
				'customAttributes': {
					'class': "zc-btn zc-btn-small zc-gradient"
				}

			}, {
				'text': 'Cancel',
				'action': 'CLOSE',
				'customAttributes': {
					'class': "zc-btn zc-btn-small zc-secondary"
				}

			},
			{
				'text': 'New Folder',
				'action': function () {
					$('#zc-newFolderSmallDialog').zdialog('open');
					dialogInputReset('zc-newFolderSmallDialog');
				},
				'customAttributes': {
					'class': "zc-btn zc-btn-small zc-secondary zc-marginLeftAuto"
				}

			}]
		},

		// Preview URL
		{
			targetId: 'zc-projPrev',
			dialogId: 'ide-projectPreview-dialog',
			dialogTitle: '<h2>Project Preview URL</h2>\
		<p>Customize this project\'s preview URL as you prefer.</p>',
			button: [{
				'text': 'OK',
				'action': 'CLOSE',
				'customAttributes': {
					'class': "zc-btn zc-btn-small zc-gradient"
				}

			}, {
				'text': 'Cancel',
				'action': 'CLOSE',
				'customAttributes': {
					'class': "zc-btn zc-btn-small zc-secondary"
				}

			}]
		},

		//new file small
		{
			targetId: 'zc-newFileOpen',
			dialogId: 'zc-newFileSmallDialog',
			dialogTitle: 'New File',
			button: [{
				'text': 'Create',
				'id': 'zc-newFileSmallDialogSubmit',
				'action': function () {
					dialogFieldValidate('zc-newFileSmallDialog', 'zc-newFileSmallDialogSubmit', 'Creating', 'The file has been created.');
				},
				'customAttributes': {
					'class': "zc-btn zc-btn-small zc-gradient"
				}

			}, {
				'text': 'Cancel',
				'action': 'CLOSE',
				'customAttributes': {
					'class': "zc-btn zc-btn-small zc-secondary"
				}

			}]
		},

		//New Folder
		{
			targetId: ['ide-create-folder', 'ide-create-folder-toolmenu', 'ide-create-folder-context'],
			dialogId: 'zc-newFolderDialog',
			dialogTitle: 'New Folder',
			button: [{
				'text': 'Create',
				'id': 'zc-newFolderDialogSubmit',
				'action': function () {
					dialogFieldValidate('zc-newFolderDialog', 'zc-newFolderDialogSubmit', 'Creating', 'The folder has been created.');
				},
				'customAttributes': {
					'class': "zc-btn zc-btn-small zc-gradient"
				}

			}, {
				'text': 'Cancel',
				'action': 'CLOSE',
				'customAttributes': {
					'class': "zc-btn zc-btn-small zc-secondary"
				}
			},
			{
				'text': 'New File',
				'id': 'zc-newFileOpen',
				'action': function () {
					$('#zc-newFileSmallDialog').zdialog('open');
				},
				'customAttributes': {
					'class': "zc-btn zc-btn-small zc-secondary zc-marginLeftAuto"
				}
			}]
		},

		//new folder small
		{
			targetId: 'ide-create-folder1',
			dialogId: 'zc-newFolderSmallDialog',
			dialogTitle: 'New Folder',
			button: [{
				'text': 'Create',
				'id': 'zc-newFolderSmallDialogSubmit',
				'action': function () {
					dialogFieldValidate('zc-newFolderSmallDialog', 'zc-newFolderSmallDialogSubmit', 'Creating', 'The folder has been created.');
				},
				'customAttributes': {
					'class': "zc-btn zc-btn-small zc-gradient"
				}

			}, {
				'text': 'Cancel',
				'action': 'CLOSE',
				'customAttributes': {
					'class': "zc-btn zc-btn-small zc-secondary"
				}
			}]
		},

		//New Java Class
		{
			targetId: ['ide-create-class', 'ide-create-class-toolmenu', 'ide-create-class-context'],
			dialogId: 'zc-newJavaClassDialog',
			dialogTitle: 'New Java Class',
			button: [{
				'text': 'Create',
				'id': 'zc-newJavaClassDialogSubmit',
				'action': function () {
					dialogFieldValidate('zc-newJavaClassDialog', 'zc-newJavaClassDialogSubmit', 'Creating', 'The class has been created.');
				},
				'customAttributes': {
					'class': "zc-btn zc-btn-small zc-gradient"
				}

			}, {
				'text': 'Cancel',
				'action': 'CLOSE',
				'customAttributes': {
					'class': "zc-btn zc-btn-small zc-secondary"
				}
			}]
		},

		//New Java Interface
		{
			targetId: ['ide-create-interface', 'ide-create-interface-toolmenu', 'ide-create-interface-context'],
			dialogId: 'zc-newJavaInterfaceDialog',
			dialogTitle: 'New Java Interface',
			button: [{
				'text': 'Create',
				'id': 'zc-newJavaInterfaceDialogSubmit',
				'action': function () {
					dialogFieldValidate('zc-newJavaInterfaceDialog', 'zc-newJavaInterfaceDialogSubmit', 'Creating', 'The interface has been created.');
				},
				'customAttributes': {
					'class': "zc-btn zc-btn-small zc-gradient"
				}
			}, {
				'text': 'Cancel',
				'action': 'CLOSE',
				'customAttributes': {
					'class': "zc-btn zc-btn-small zc-secondary"
				}
			}]
		},

		//New Java Enum
		{
			targetId: ['ide-create-enum', 'ide-create-enum-toolmenu', 'ide-create-enum-context'],
			dialogId: 'zc-newJavaEnumDialog',
			dialogTitle: 'New Java Enum',
			button: [{
				'text': 'Create',
				'id': 'zc-newJavaEnumDialogSubmit',
				'action': function () {
					dialogFieldValidate('zc-newJavaEnumDialog', 'zc-newJavaEnumDialogSubmit', 'Creating', 'The enum has been created.');
				},
				'customAttributes': {
					'class': "zc-btn zc-btn-small zc-gradient"
				}

			}, {
				'text': 'Cancel',
				'action': 'CLOSE',
				'customAttributes': {
					'class': "zc-btn zc-btn-small zc-secondary"
				}
			}]
		},

		//New Java Annotation
		{
			targetId: ['ide-create-annotation', 'ide-create-annotation-toolmenu', 'ide-create-annotation-context'],
			dialogId: 'zc-newJavaAnnotationDialog',
			dialogTitle: 'New Java Annotation',
			button: [{
				'text': 'Create',
				'id': 'zc-newJavaAnnotationDialogSubmit',
				'action': function () {
					dialogFieldValidate('zc-newJavaAnnotationDialog', 'zc-newJavaAnnotationDialogSubmit', 'Creating', 'The annotation has been created.');
				},
				'customAttributes': {
					'class': "zc-btn zc-btn-small zc-gradient"
				}

			}, {
				'text': 'Cancel',
				'action': 'CLOSE',
				'customAttributes': {
					'class': "zc-btn zc-btn-small zc-secondary"
				}
			}]
		},

		//Upload Files
		{
			targetId: ['ide-upload-files', 'ide-upload-files-toolmenu', 'ide-upload-files-context'],
			dialogId: 'zc-uploadFilesDialog',
			dialogTitle: 'Upload Files',
			closeFunction: function () {
				$('#pt-upload-case').removeClass('show-error-case');
			},
			button: [{
				'text': 'Upload',
				'id': 'zc-uploadFilesDialogSubmit',
				'action': function () {
					uploadFileDialog('zc-uploadFilesDialog', 'zc-uploadFilesDialogSubmit', 'Uploading', 'Upload');
				},
				'customAttributes': {
					'class': "zc-btn zc-btn-small zc-gradient"
				}

			}, {
				'text': 'Cancel',
				'action': 'CLOSE',
				'customAttributes': {
					'class': "zc-btn zc-btn-small zc-secondary"
				}
			}]
		},

		//Project Setting
		{
			targetId: 'ide-projectSetting',
			dialogId: 'zc-projectSettingDialog',
			dialogTitle: 'Project Setting',
			button: [{
				'text': 'Cancel',
				'action': 'CLOSE',
				'customAttributes': {
					'class': "zc-btn zc-btn-small zc-secondary"
				}
			}]
		},

		//Project Info
		{
			targetId: 'ide-projectInfo',
			dialogId: 'zc-projectInfoDialog',
			dialogTitle: 'Project Info',
			width: '700px',
		},

		//File info 
		{
			targetId: 'ide-file-info',
			dialogId: 'zc-fileInfoDialog',
			dialogTitle: 'File Info',
			minWidth: 540
		},

		//Rename file
		{
			targetId: 'ide-file-rename',
			dialogId: 'zc-fileRenameDialog',
			dialogTitle: 'Rename',
			button: [{
				'text': 'OK',
				'id': 'zc-fileRenameDialogSubmit',
				'action': function () {
					dialogFieldValidate('zc-fileRenameDialog', 'zc-fileRenameDialogSubmit', 'Renaming', 'The file has been renamed.');
				},
				'customAttributes': {
					'class': "zc-btn zc-btn-small zc-gradient"
				}

			}, {
				'text': 'Cancel',
				'action': 'CLOSE',
				'customAttributes': {
					'class': "zc-btn zc-btn-small zc-secondary"
				}
			}]
		},

		//Go to Line
		{
			targetId: 'ide-goto-line',
			dialogId: 'zc-goToLineDialog',
			overlayClick: true,
			dialogTitle: 'Go to Line',
			dialogClassName: 'zc-diaContBottomSpace'
		},

		//Go to Definition
		{
			targetId: 'ide-definition-menu',
			dialogId: 'zc-goToDefinitionDialog',
			overlayClick: true,
			dialogTitle: 'Go to Definition',
			dialogClassName: 'zc-diaContBottomSpace'
		},

		//File open
		{
			targetId: 'ide-open-file',
			dialogId: 'zc-fileOpenDialog',
			overlayClick: true,
			height: 550,
			dialogTitle: 'Open',
			openFunction: function () {
				$('#openFile-input').val('').trigger('input');
				$('#openFile-input').siblings('.clear-search').trigger('click');
				$('#zc-fileOpenDialog .zc-openFileList li:first').addClass('onFocus');
				openFilePathTruncation();
			},
			closeFunction: function () {
				$('#zc-fileOpenDialog .zc-openFileList li').removeClass('onFocus zc-openFileSelected');
				$('#zc-fileOpenDialog .zc-openFileList li .zc-checkbox').prop('checked', false);
				$('#zc-fileOpenDialog').find('.zc-openFileSelectionCount').remove();
				$('#zc-fileOpenDialog').addClass('zc-hideOpenDialogFooter');
			},
			resizeFunction: function () {
				openFilePathTruncation();
			},
			button: [{
				'text': 'Open',
				'id': 'zc-openFileDialogOpenBtn',
				'action': function () {
					$('#zc-fileOpenDialog  .zc-openFileList li .zc-checkbox').prop('checked', false).change();
					$('#zc-fileOpenDialog').zdialog('close');
				},
				'customAttributes': {
					'class': "zc-btn zc-btn-small zc-gradient disabled"
				}

			}, {
				'text': 'Cancel',
				'action': function () {
					$('#zc-fileOpenDialog  .zc-openFileList li .zc-checkbox').prop('checked', false).change();
					$('#zc-fileOpenDialog').zdialog('close');
				},
				'customAttributes': {
					'class': "zc-btn zc-btn-small zc-secondary"
				}
			}]
		},

		//Open Project
		{
			targetId: 'ide-openProject',
			dialogId: 'zc-openProjectDialog',
			dialogTitle: 'Open Project',
			minWidth: 550,
			width: 600,
			closeFunction: function () {
				$('#zc-openProjContent .zc-table tbody tr').removeClass('onFocus');
			}
		},

		//Switch Project
		{
			targetId: 'ide-switchProject',
			dialogId: 'zc-switchProjectDialog',
			dialogTitle: 'Switch Project',
			minWidth: 700,
			width: 700,
			closeFunction: function () {
				$('#zc-switchProjContent .zc-table tbody tr').removeClass('onFocus');
			}
		},

		//Pull Updates
		{
			targetId: 'ide-pullFiles',
			dialogId: 'zc-pullUpdatesDialog',
			dialogTitle: '<h2>Pull Updates</h2><p>Enter your Git credentials to pull the latest updates.</p>',
			button: [{
				'text': 'Pull',
				'id': 'zc-pullUpdatesDialogSubmit',
				'action': function () {
					pushPullValidation('zc-pullUpdatesDialog', 'zc-pullUpdatesDialogSubmit', 'Pulling', 'There is no update in the working branch. So, the files are up to date.');
				},
				'customAttributes': {
					'class': "zc-btn zc-btn-small zc-gradient"
				}

			}, {
				'text': 'Cancel',
				'action': 'CLOSE',
				'customAttributes': {
					'class': "zc-btn zc-btn-small zc-secondary"
				}
			}]
		},

		//Push All Changes
		{
			targetId: 'ide-pushFiles',
			dialogId: 'zc-pushChangesDialog',
			dialogTitle: '<h2>Push All Changes</h2><p>Enter your Git credentials to pull the latest updates.</p>',
			button: [{
				'text': 'Push',
				'id': 'zc-pushChangesDialogSubmit',
				'action': function () {
					pushPullValidation('zc-pushChangesDialog', 'zc-pushChangesDialogSubmit', 'Pushing', 'Pushed all changes successfully.');
				},
				'customAttributes': {
					'class': "zc-btn zc-btn-small zc-gradient"
				}

			}, {
				'text': 'Cancel',
				'action': 'CLOSE',
				'customAttributes': {
					'class': "zc-btn zc-btn-small zc-secondary"
				}
			}]
		},

		//Merge
		{
			targetId: 'ide-mergeFiles',
			dialogId: 'zc-mergeDialog',
			dialogTitle: 'Merge',
			button: [{
				'text': 'Merge Branch',
				'id': 'zc-mergeDialogSubmit',
				'action': function () {
					dialogFieldValidate('zc-mergeDialog', 'zc-mergeDialogSubmit', 'Merging', 'Files Merged successfully.');
				},
				'customAttributes': {
					'class': "zc-btn zc-btn-small zc-gradient"
				}

			}, {
				'text': 'Cancel',
				'action': 'CLOSE',
				'customAttributes': {
					'class': "zc-btn zc-btn-small zc-secondary"
				}
			}]
		},

		//Reset Changes
		{
			targetId: 'ide-resetChanges',
			dialogId: 'zc-resetChangesDialog',
			dialogTitle: 'Reset Changes',
			button: [{
				'text': 'Cancel',
				'action': 'CLOSE',
				'customAttributes': {
					'class': "zc-btn zc-btn-small zc-secondary"
				}
			}]
		},

		//Switch to other Branch
		{
			targetId: 'ide-switchBranch',
			dialogId: 'zc-switchBranchDialog',
			dialogTitle: '<h2>Switch to other Branch<h2><p>Switch from current branch (master) to other branch.</p>',
			button: [{
				'text': 'Switch',
				'id': 'zc-switchBranchDialogSubmit',
				'action': function () {
					dialogFieldValidate('zc-switchBranchDialog', 'zc-switchBranchDialogSubmit', 'Switching', 'Branch changed successfully.');
				},
				'customAttributes': {
					'class': "zc-btn zc-btn-small zc-gradient"
				}

			}, {
				'text': 'Cancel',
				'action': 'CLOSE',
				'customAttributes': {
					'class': "zc-btn zc-btn-small zc-secondary"
				}
			}]
		},

		//connected Service
		{
			targetId: 'ide-repService',
			dialogClassName: "zc-repServiceDialog",
			dialogId: 'zc-repServiceDialog',
			dialogTitle: 'Repository Services'
		},

		//save as 
		{
			targetId: 'ide-saveAs',
			dialogId: 'zc-saveAsDialog',
			dialogTitle: 'Save As',
			closeFunction: function () {
				$('#zc-saveAsAlert').addClass('zc-hide');
			},
			button: [{
				'text': 'Save',
				'id': 'zc-saveAsDialogSubmit',
				'action': function () {
					dialogFieldValidate('zc-saveAsDialog', 'zc-saveAsDialogSubmit', 'Saving', 'The file has been saved.', saveAsValidation);
				},
				'customAttributes': {
					'class': "zc-btn zc-btn-small zc-gradient"
				}

			}, {
				'text': 'Cancel',
				'action': 'CLOSE',
				'customAttributes': {
					'class': "zc-btn zc-btn-small zc-secondary"
				}

			},
			{
				'text': 'New Folder',
				'action': function () {
					$('#zc-newFileSmallDialog').zdialog('open');
					dialogInputReset('zc-newFileSmallDialog');
				},
				'customAttributes': {
					'class': "zc-btn zc-btn-small zc-secondary zc-marginLeftAuto"
				}

			}]
		},
		// output console ad argument
		{
			targetId: 'ide-consoleArg',
			dialogId: 'zc-opConsoleArgDialog',
			dialogTitle: 'Add Arguments',
			button: [{
				'text': 'Add',
				'id': 'zc-opConsoleArgDialogSubmit',
				'action': function () {
					dialogFieldValidate('zc-opConsoleArgDialog', 'zc-opConsoleArgDialogSubmit', 'Adding', 'Arguments added successfully.');
				},
				'customAttributes': {
					'class': "zc-btn zc-btn-small zc-gradient"
				}

			}, {
				'text': 'Cancel',
				'action': 'CLOSE',
				'customAttributes': {
					'class': "zc-btn zc-btn-small zc-secondary"
				}

			}]
		},
		//KEYBORAD SHORTCUTS
		{
			targetId: 'ide-keyboradShortcuts',
			dialogId: 'zc-keyboardShortcuts',
			dialogTitle: 'Keyboard Shortcuts',
			width: 1200,
			minWidth: 1200,
			height: function () {
				var height = $(window).innerHeight() - 90;
				if (height > 768) {
					height = 768;
				}
				return height;
			},
			openFunction: function () {
				keyboardShortCutInit();
				$('#keyboardShortcut').closest('li').addClass('active');
			},
			closeFunction: function () {
				keyboardShortCutTipsRemove(false);
				$('#keyboardShortcut').closest('li').removeClass('active');
			},
			beforeCloseFunction: function (event) {
				if ($('.zc-onEdit').length) {
					//Esc
					if (event.which == 27) {
						sCutEditingCancel($('.zc-sCutInput'));
					}
					return false;
				}
			}
		},
		//Manage Configuration Browse file
		{
			targetId: ['zc-configLocationBrowse-cmd', 'zc-configLocationBrowse-tomcat'],
			dialogId: 'zc-uploadConfigFilesDialog',
			dialogTitle: 'Location to Run',
			button: [{
				'text': 'Select',
				'id': 'zc-uploadConfigFilesDialogSubmit',
				'action': function (event, data) {
					configRunLocationSelection();
					$('#zc-uploadConfigFilesDialog').zdialog('close');
				},
				'customAttributes': {
					'class': "zc-btn zc-btn-small zc-gradient"
				}

			}, {
				'text': 'Cancel',
				'action': 'CLOSE',
				'customAttributes': {
					'class': "zc-btn zc-btn-small zc-secondary"
				}
			}]
		},
	]

	//init for Dialog
	initDialog = function (dialogObj) {
		$.each(dialogObj, function (index, list) {

			$('#' + list.dialogId).zdialog({
				title: list.dialogTitle,
				buttons: list.button,
				buttonsAlignment: "left",
				resizable: {
					minWidth: list.minWidth || 500,
				},
				className: list.dialogClassName,
				resize :list.resizeFunction,
				width: list.width || "540px",
				height: list.height,
				closeOnOverlayClick: list.overlayClick,
				open: list.openFunction,
				close: list.closeFunction,
				beforeclose: list.beforeCloseFunction,
				isTitleHTMLEncoded: true,
				closeSVGIconId: "svg-close-icon",
				closeButton: list.closeButton,
				position: {
					top: "42px"
				},
				animation: {
					open: {
						className: "zc-dialogShowAnimation",

					},
					close: {
						className: "zc-dialogHideAnimation",

					}
				}
			});

			if (typeof (list.targetId) !== "string") {
				$.each(list.targetId, function (index, value) {
					$('#' + value + '').on('click', function (event) {
						$('#' + list.dialogId + '').zdialog('open');
						dialogInputReset(list.dialogId);
					});
				});
			} else {
				$('#' + list.targetId + '').on('click', function (event) {
					$('#' + list.dialogId + '').zdialog('open');
					dialogInputReset(list.dialogId);
				});
			}

		});
	}

});

$(window).load(function () {

	initDialog(dialogObj);

	//INIT CHOSEN
	var config = {
		'.chosen-select': {},
		'.chosen-select-deselect': {
			allow_single_deselect: true
		},
		'.chosen-select-no-single': {
			disable_search_threshold: 10
		},
		'.chosen-select-no-results': {
			no_results_text: 'Oops, nothing found!'
		},
		'.chosen-select-width': {
			width: "95%"
		}
	}

	for (var selector in config) {
		$(selector).chosen(config[selector]);
	}

	//APPEND CHOOSEN SELECT ARROW 
	$(".chosen-container-single .chosen-single div b").append('<svg> <use xlink:href="#svg-selectarrow-icon"> </use> </svg>');

});


