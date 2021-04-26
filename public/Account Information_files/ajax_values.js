/*
	Ajax (prompts + errors + notifications)：
	包括ajax文件中js变量输出的内容，如：提示（prompts通常是非弹出窗口页面内提示，提示过程完成，结果为空，确认信息等），通知（notifications通常是弹出窗口），错误（errors）。
*/
var ERR_Enter_Company = 'Please enter your company name.';
var ERR_Delete_User = 'The operation can not be restored, do you still want to delete this user?';

var ERR_Email_Required = "Email address is required";
var ERR_LoginName_Required = "Login name is required.";
var ERR_LoginName_Exists = "Login name already exists! Try a different one please.";
var ERR_Password_Required = "Password is required.";
var ERR_ReenteredPassword_Required = "Re-entered password is required.";
var ERR_ReenteredPassword_NotSame = "Re-entered password is not the same as password.";

var ERR_JobName_Required = "Job title is required.";
var ERR_NativeLanguage_Required = "Native language is required.";
var ERR_FirstForeignLanguage_Required = "First foreign language is required.";
var ERR_Feature_Required = "Please select at least one feature for each job.";
var ERR_AddTag = "Tag adding error:";
var ERR_Upload = "File uploading error:";
var ERR_UploadAvatar = "Upload avatar error";
var ERR_SourceLanguage_Required = "Please select the source language";
var ERR_TargetLanguage_Required = "Please select the target language";
var ERR_File_Required = "Please upload your project and reference files.";
var ERR_ProjectFile_Required = "At least one primary project file is required.";
var ERR_Requirements_Required = "Please fill out the Requirements field";
var ERR_EventStartTime_Required = "Event start time is required.";
var ERR_EventStartTime_Min = "Event start time can not be earlier than the current time.";
var ERR_EventStartTime_Min2 = "Requested delivery time can not be earlier than the current time.";
var ERR_Duration_Required = "Event duration should be at least 15 minutes.";
var ERR_SourceLanguageBlank = 'The source language can not be empty.';
var ERR_TargetLanguageBlank = 'The target language can not be empty.';
var ERR_SourceLanguageLimit = 'Only one language can be selected as the source language.';
var ERR_LanguagePairSelected = 'The language pair has been selected.';

var ERR_SelectFeature = "Please select a feature";
var ERR_EnterRates = "Please enter job rates";
var ERR_SelectJob = "Please select your jobs";
var ERR_SelectSRCLang = "Please select the source language";
var ERR_SelectTRGLang = "Please select the target language";
var ERR_JobLimit = "You have reached your job limit and can not add more jobs."
var ERR_DEL_FEATURE = "Are you sure you want to delete this feature?";

var PROMPTS_Referral_Success = "Thank you for your referral. Your message has been sent successfully";
var PROMPTS_Tags_Limit = "No more than five tags can be selected. You can add more tags by deselecting some of the existing tags.";
var PROMPTS_JobFeature_Limit = "Job features exceed the maximum limit of five.";
var PROMPTS_Field_Required = "Please select at least one Field.";
var PROMPTS_JobFields_Limit = "Job fields exceed the maxium limit of five.";
var PROMPTS_Tag_Required = "Please select at least one tag.";
var PROMPTS_Tag_Tip = "Enter your self-created tags";
var PROMPTS_Avatar_Tip = "Please select an avatar";
var PROMPTS_Accept = "Please check and agree to the terms and conditions before proceed.";
var PROMPTS_Confirm = "Are you sure you want to ";

var PROMPTS_VRI_MIN_Start = 'Your requested VRI interpretation service can only start at least 30 minutes from now.';
var PROMPTS_VRI_Duration = 'The VRI interpretation service requires a duration of at least 15 minutes.';
var PROMPTS_VRI_Long_Start = 'The VRI interpretation service you\'ve requested is not available within the next six hours, please try a later time to start.';
var PROMPTS_VRI_Unavailable = 'The VRI interpretation service you\'ve requested is not available, you may try different languages or check back at a later time.';
var PROMPTS_VRI_IM_Unavailable = 'The VRI interpretation service you\'ve requested is not immediately available. Please try a start time at least six hours from now or different languages.';
var PROMPTS_VRI_NAME = "Please enter your name.";

var NOTIF_EMAIL_FAILED = "Order successful, but send email failed.";
var NOTIF_TICKET_FAILED = "Order successful, but ticket creation failed.";
var NOTIF_WAIT_QUOTE = "Please wait for our quote before proceed.";
var NOTIF_COMMENT_SUBMITTED = 'Your feedback has been submited successfully.';
var NOTIF_INV_COPIED = "Invitation link has been copied to the clipboard.";

var NOTIF_TERM_CONFIRM = "Please confirm you have read the terms and conditions, and check the box to proceed.";