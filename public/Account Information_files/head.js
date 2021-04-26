var filter_array = {
    'page' : 1, 
    'source' : 'All', 
    'target' : 'All',
    'job' : '',
    'sclevel' : '', 
    'scid' : '', 
    'service' : '',
    'type' : '', 
    'subtype' : '',
    'field' : '', 
    'subfield' : '',
    'tag' : '',
    'status' : 'all',  
    'sort' : 'mp', 
    'sort_asc':'',
    'findvalue' : '',
    'type-text' : '',
    'field-text' : ''
};

var in_provider_php = false;


$(function() {


    //Begin main navigation
    var curNavIndex=0;
    jQuery('#mynav a').each(function(){
        if(jQuery(this).hasClass('unLine')){
            curNavIndex = jQuery(this).index();
        }
    }); 
    if (window.location.pathname.substr(4,12).toLowerCase()=='/services'){
        in_provider_php = true;
        jQuery('#mynav a').removeClass('unLine');
        jQuery('#mynav a').eq(curNavIndex).addClass('unLine');
    } 

    ////log_in buttons
    var main_nav = document.getElementById("main_nav");
    main_nav.addEventListener("mouseover",function(){
        document.getElementById("sub_nav").style.display='block';
    });
    main_nav.addEventListener("mouseout",function(){
        document.getElementById("sub_nav").style.display='none';
    });

    var search_input = document.getElementById('search_text');
    search_input.addEventListener('keyup',function(e){
        if (e.keyCode == 13){
          search_provider();  
        }
    });

    ////Mega Menu Hover
    // jQuery('.dropDownCon').hover(function(){
    //     jQuery('.dropDown .dropDownCon').show();   
    //     jQuery('#mynav a.unLine').children().show(); 
    // },
    // function(){
    //     // jQuery('.nav a').children().hide(); 
    //     // jQuery('.dropDown .dropDownCon').hide();
    //     // jQuery('.nav a').removeClass('unLine');
    //     // jQuery('.nav a').eq(curNavIndex).addClass('unLine');
    // });

    ////After Close
    jQuery('#close').click(function(){
        jQuery('.dropDown .dropDownCon').hide();
        jQuery('#mynav a').siblings().removeClass('unLine');
        if (window.location.pathname.substr(4,12).toLowerCase()=='/services'){
            jQuery('#mynav a').eq(curNavIndex).addClass('unLine');
        }
    });

    ////Other Actions
    jQuery('#action_browser').click(function(){
        RefreshBrowserURL();    
    });
    jQuery('#action_cart').click(function(){
       AddServiceToCart();
    });

	var window_w = jQuery(window).width();
	if(is_pc == 1){
		////PC Menu Hover
		jQuery('.nav-pc li').hover(function(){
			var service = jQuery(this).children("a").data('service');
			// control style
			jQuery('.nav-pc li a').removeClass('unLine')
			jQuery(this).children("a").addClass('unLine');
			jQuery(this).children('.dropDownPc').slideDown('fast');
			jQuery(this).children('.dropDownPc').append(jQuery(".mega-menu"));
			jQuery(".dropDownCon").show();
			//load data
			load_megamenu(service);
		 },function(){
			jQuery(this).children('.dropDownPc').hide();
			jQuery(this).children("a").removeClass('unLine');
			jQuery('.nav-pc li:eq('+curNavIndex+') a').addClass('unLine');
		});
	}else{
		////Mobile Menu
		jQuery('#mynav a').click(function(){
			var service = jQuery(this).data('service');
			// control style
			jQuery(this).addClass('unLine').siblings().removeClass('unLine');  
			jQuery(this).siblings().children().hide(); 
			jQuery(this).children().show();
			jQuery('.dropDown .dropDownCon').slideDown('fast');
			jQuery(".nav, .responsive-btn").removeClass('active');
			//load data
			load_megamenu(service);
		});
	}
});

function search_provider(){
    var text = document.getElementById('search_text').value;    
    if (text == '') {
        return;
    }
    var search_service = document.getElementById('search_service');
    var index = encodeURIComponent(search_service.selectedIndex); // 选中索引
    var sclevel = encodeURIComponent(search_service.options[index].text); // 选中文本
    var search_param = "?findvalue="+text; 
    sclevel = sclevel.replace(/%20/g, '-');
    var url = "/services/"+sclevel+"/all-languages/all-fields/all-features/all-tags"
    window.location.href=url.toLowerCase() + search_param;
}

function load_megamenu(service){
    resetFilterValue();
    load_service(service);
    load_languages(InitLanguageSelect);
}

function load_service(service, default_scid=''){
    var param = {"action":"get_sub_service","service":service,"default_scid":default_scid};
    jQuery.ajax({
        url:'/app/src/domain/main/controller/ajax/ajax.mega.php',
        type:'post',
        async:false,
        data:param,
        dataType:'json'
    })
    .done(function(response){
        if (response.status) {           
            jQuery('#serviceList').html(response.data);
            setFilterValue('service',service);
            setFilterValue('scid',response.scid);
            setFilterValue('sclevel', response.subservice);    
            if (default_scid == '') {
              Init_attr_field_tag(response.subservice);    
            }            
        }
        else{
            console.log(response);
        }        
    })
    .fail(function(xhr){
        console.log(xhr);
    });
}

function load_languages(callback){
    var languages = getFilterValue('languages');
    if (languages != undefined){
        callback();
        return ;  
    }
    var param = {"action":"get_languages"};
    jQuery.ajax({
        url:'/app/src/domain/main/controller/ajax/ajax.mega.php',
        type:'post',
        async:false,
        data:param,
        dataType:'json'
    })
    .done(function(response){
        if (response.status) {            
            setFilterValue('languages',  response.data); 
            setFilterValue('sign_languages',  response.sign_data);            
            callback();
        }
        else{
            console.log(response);
        }        
    })
    .fail(function(xhr){
        console.log(xhr);
    });

}

function InitLanguageSelect(){
    var source = 'All';
    var target = 'All';

    service = getFilterValue('service');
    subService = getFilterValue('sclevel');

    var lang_options = LangOptions('languages');
    jQuery('#sourceLanguage').html(lang_options);
    jQuery('#targetLanguage').html(lang_options); 
    jQuery('#sourceLanguage').val(source);
    jQuery('#targetLanguage').val(target);

    if (service == 'Editing' || service == 'Writing' || service == 'Publishing' || subService == 'Audio/Video Transcription') {
        if (jQuery('#sourceLanguage').data('chosen') !== undefined){
            jQuery('#sourceLanguage').chosen("destroy");
        }
        jQuery('.source_lang').hide();
    }
    else{        
        if (jQuery('#sourceLanguage').data('chosen') == undefined){
            jQuery('.source_lang').show();
            jQuery('#sourceLanguage').chosen({width: "100%"});
        }      
    }

    if (jQuery('#targetLanguage').data('chosen') == undefined){
        jQuery('#targetLanguage').chosen({width: "100%"});
    }
    else{
        jQuery('#targetLanguage').trigger("chosen:updated");
    }
    
}

function LangOptions(lang, all_option){
    var langNames = getFilterValue(lang);
    var options = "<option value='All'>All</option>";
    if (all_option == false){
        options = "";
    }
    for(var i=0; i<langNames.length;i++){
        options = options +"<option value='"+langNames[i]+"'>"+langNames[i]+"</option>";  
    }
    return options;
}

function SourceLangChange(){
    var res = false;
    var sourceLang = jQuery('#sourceLanguage').val();
    filter_array['source'] = sourceLang;
    var req = {"action":"refresh_browser_condition","key":'source',"value":sourceLang};
    jQuery.ajax({
        url : '/app/src/domain/main/controller/ajax/ajax.mega.php',
        type : "post",
        data : req,
        async : false,
        complete : function(data) {
            res = true;
        }
    });
    var subservice = getFilterValue('sclevel');
    if (subservice == "Sign Language Interpretation"){
        var lang_options = GetSignLangOptions(sourceLang);    
        jQuery('#targetLanguage').html(lang_options);        
    }
    else{
        jQuery('#targetLanguage').html(jQuery('#sourceLanguage').html());
    }
  
    if (sourceLang != 'All'){
       jQuery("#targetLanguage option[value='"+sourceLang+"']").remove(); 
    }
    var targetLang = getFilterValue("target");
    var res2 = (sourceLang == targetLang) ? false : true;
    if (sourceLang == targetLang){
        jQuery("#targetLanguage").val('All');
        var targetLanguage = jQuery('#targetLanguage').val();
        filter_array['target'] = targetLanguage;
        var req = {"action":"refresh_browser_condition","key":'target',"value":targetLanguage};
        jQuery.ajax({
            url : '/app/src/domain/main/controller/ajax/ajax.mega.php',
            type : "post",
            data : req,
            async : false,
            complete : function(data) {
                res2 = true;
            }
        });
    }
    else{
       jQuery("#targetLanguage").val(targetLang);        
    }
    jQuery('#targetLanguage').trigger("chosen:updated");

    if(res2 && res){
       if (getFilterValue("field")=='' && getFilterValue("subfield")==''){
            UpdateFieldList("0");
        } else {
            UpdateFieldList("1");
        }
        if (getFilterValue("type")=='' && getFilterValue("subtype")==''){
            UpdateAttributeList("0");
        } else {
            UpdateAttributeList("1");
        }
        if (getFilterValue("tag")==''){
            UpdateTagList("0");
        } else {
            UpdateTagList("1");
        } 
    }
}

function TargetLangChange(){
    var targetLanguage = jQuery('#targetLanguage').val();
    filter_array['target'] = targetLanguage;
    var req = {"action":"refresh_browser_condition","key":'target',"value":targetLanguage};
    jQuery.ajax({
        url : '/app/src/domain/main/controller/ajax/ajax.mega.php',
        type : "post",
        data : req,
        async : false,
        complete : function(data) {
            var service = getFilterValue('service');
            var subService = getFilterValue('sclevel');
            if (service == 'Editing' || service == 'Writing' || service == 'Publishing' || subService == 'Audio/Video Transcription'){
                jQuery('#sourceLanguage').val('All');
                setFilterValue('source',jQuery('#sourceLanguage').val());    
            }
            updateTargetLangChange()
        }
    });  
 }

 function updateTargetLangChange(){
    if (getFilterValue("field")=='' && getFilterValue("subfield")==''){
            UpdateFieldList("0");
        } else {
            UpdateFieldList("1");
        }
        if (getFilterValue("type")=='' && getFilterValue("subtype")==''){
            UpdateAttributeList("0");
        }
        else{
            UpdateAttributeList("1");
        }
        if (getFilterValue("tag")==''){
            UpdateTagList("0");
        }
        else{
            UpdateTagList("1");
        }
 }

function Init_attr_field_tag(subservice){
    var requestData = {        
        "source" : getFilterValue('source'),
        "target": getFilterValue('target'),
        "service": getFilterValue('service'),
        "subservice": getFilterValue('scid'),
        'action':'Init_attr_field_tag'
    };
    // console.log(requestData);
    jQuery.ajax({
        url:'/app/src/domain/main/controller/ajax/ajax.mega.php',
        type:'post',
        data:requestData,
        dataType:'json'})
    .done(function(data){
        UpdateFieldList('0');
        UpdateAttributeList('0');
        UpdateTagList('0');
    })
    .fail(function(xhr,error){
            console.log(error);
            console.log(xhr);
    });
}

function setFilterValue(key, value) {
    filter_array[key] = value;
    var keys = ['source','target','field','subfield','type','subtype','tag']
    if (keys.indexOf(key)>=0){
      RefreshBrowserCondition(key,value);
    }
}

function getFilterValue(key) {
    return filter_array[key];
}

function resetFilterValue(){
    // setFilterValue('service','');
    setFilterValue('scid','');
    setFilterValue('sclevel','');
    setFilterValue('source','All');
    setFilterValue('target','All');
    setFilterValue('field','');
    setFilterValue('subfield','');
    setFilterValue('type','');
    setFilterValue('subtype','');
    setFilterValue('tag','');
    setFilterValue('job','');
    setFilterValue('page',1);
    setFilterValue('field-text','');
    setFilterValue('type-text','');
}

function SetSubService(scid,sclevel,element){
    resetFilterValue();
    UpdateLanguageSelect('#sourceLanguage', '#targetLanguage', sclevel)
    setFilterValue('source' ,jQuery('#sourceLanguage').val());
    setFilterValue('target' ,jQuery('#targetLanguage').val());
    setFilterValue('sclevel' ,sclevel);
    setFilterValue('scid',scid);
    jQuery('#serviceList li span').removeClass('clickOn');
    jQuery(element).addClass('clickOn');    
    Init_attr_field_tag(sclevel);
}

// this function depends on load_languages
function UpdateLanguageSelect(sourceId, targetId, subservice){
    var source_lang = jQuery(sourceId).val();
    var target_lang = jQuery(targetId).val();
    if (subservice == "Sign Language Interpretation"){
        var lang_options = LangOptions("sign_languages")+LangOptions("languages", false);
        jQuery(sourceId).html(lang_options); 
        source_lang = "All";
        target_lang = "All";
    }
    else {
        jQuery(sourceId).html(LangOptions("languages"));       
    }
    jQuery(targetId).html(jQuery(sourceId).html());
    jQuery(sourceId).val(source_lang) ;
    jQuery(targetId).val(target_lang) ;
    if (jQuery(sourceId).val() == null){
        jQuery(sourceId).val('All');
    }
    if (jQuery(targetId).val() == null){
        jQuery(targetId).val('All');
    }
    jQuery(sourceId).trigger("chosen:updated");
    jQuery(targetId).trigger("chosen:updated");
}

// this function depends on load_languages
function GetSignLangOptions(sourceLang){  
    var sign_langs = getFilterValue("sign_languages");
    if (sign_langs.indexOf(sourceLang)!=-1){
        var lang_options = LangOptions("languages");
    }
    else{               
        var lang_options = LangOptions("sign_languages");
    } 
    return lang_options;
}

function ServiceDomainChange(level,element){
    var fieldValue = jQuery(element).attr('data');
    var fieldText = "";  
    event.stopPropagation();
    jQuery('#fieldselect span').removeClass('clickOn');
    jQuery('#fieldselect p').removeClass('pOn');
    var isall ="0";
    var res2 =false;
    var res = false;
    if (level == 0 || level == 1){
        filter_array['field'] = fieldValue;
        filter_array['subfield'] = '';
        var req = {"action":"refresh_browser_condition","key":'field',"value":fieldValue};
        jQuery.ajax({
            url : '/app/src/domain/main/controller/ajax/ajax.mega.php',
            type : "post",
            data : req,
            async : false,
            complete : function(data) {
                res = true;
            }
        });
        
        var req = {"action":"refresh_browser_condition","key":'subfield',"value":''};
        jQuery.ajax({
            url : '/app/src/domain/main/controller/ajax/ajax.mega.php',
            type : "post",
            data : req,
            async : false,
            complete : function(data) {
                res2 = true;
            }
        });
       
        if (level==1){
            fieldText = fieldValue;
            isall = "1";
        }
    } else {
        filter_array['subfield'] = fieldValue;
        filter_array['field'] = '';
        var req = {"action":"refresh_browser_condition","key":'subfield',"value":fieldValue};
        jQuery.ajax({
            url : '/app/src/domain/main/controller/ajax/ajax.mega.php',
            type : "post",
            data : req,
            async : false,
            complete : function(data) {
                res = true;
            }
        });
        
        var req = {"action":"refresh_browser_condition","key":'field',"value":''};
        jQuery.ajax({
            url : '/app/src/domain/main/controller/ajax/ajax.mega.php',
            type : "post",
            data : req,
            async : false,
            complete : function(data) {
                res2 = true;
            }
        });
        
        fieldText = jQuery(element).attr('text');
        isall = "1";
    }
    
    if(res && res2){
        //更新菜单
        updateAllMenu(level,element, "field")
        setFilterValue('field-text',fieldText);
    }
}

function ServiceAttributeChange(level,element){
    var typeValue = jQuery(element).attr('data');
    var typeText = "";
    // console.log('type changed:'+typeValue);
    jQuery('#styleselect span').removeClass('clickOn');
    jQuery('#styleselect p').removeClass('pOn');
    var res2 =false;
    var res = false;
    if (level == 0 || level==1){
        filter_array['type'] = typeValue;
        req = {"action":"refresh_browser_condition","key":'type',"value":typeValue};
        jQuery.ajax({
            url : '/app/src/domain/main/controller/ajax/ajax.mega.php',
            type : "post",
            data : req,
            async : false,
            complete : function(data) {
                res = true;
            }
        });
        filter_array['subtype'] = '';
        req = {"action":"refresh_browser_condition","key":'subtype',"value":''};
        jQuery.ajax({
            url : '/app/src/domain/main/controller/ajax/ajax.mega.php',
            type : "post",
            data : req,
            async : false,
            complete : function(data) {
                res2 = true;
            }
        });
        if (level==1){
            typeText = typeValue;
        }
    }
    else{
        filter_array['type'] = '';
        filter_array['subtype'] = typeValue;
        req = {"action":"refresh_browser_condition","key":'type',"value":''};
        jQuery.ajax({
            url : '/app/src/domain/main/controller/ajax/ajax.mega.php',
            type : "post",
            data : req,
            async : false,
            complete : function(data) {
                res = true;
            }
        });
        req = {"action":"refresh_browser_condition","key":'subtype',"value":typeValue};
        jQuery.ajax({
            url : '/app/src/domain/main/controller/ajax/ajax.mega.php',
            type : "post",
            data : req,
            async : false,
            complete : function(data) {
                res2 = true;
            }
        });
        typeText = jQuery(element).attr('text');
    }    
    if(res && res2){
        //更新菜单
        updateAllMenu(level,element, 'type')
        setFilterValue('type-text',typeText);
    }
}

function updateAllMenu(level,element,noaction)
{
    if (noaction != "field"){
        if (getFilterValue("field")=='' && getFilterValue("subfield")==''){
            UpdateFieldList("0");
        } else {
            UpdateFieldList("1");
        }
    }

    if (noaction != "tag"){ 
        if (getFilterValue("tag")==''){
            UpdateTagList("0");
        } else {
            UpdateTagList("1");
        }
    }

    if (noaction != "type"){ 
        if (getFilterValue("type")=='' && getFilterValue("subtype")==''){
            UpdateAttributeList("0");
        } else {
            UpdateAttributeList("1");
        }
    }

    if (level == 0 || level==1){
        jQuery(element).addClass('clickOn');
    }else{
        jQuery(element).addClass('pOn');
        jQuery(element).parent().siblings('span').addClass('clickOn');
    }
}

function ServiceTagChange(level,element){
    var tagValue = jQuery(element).attr('data');
    // setFilterValue('tag',tagValue);
    filter_array['tag'] = tagValue;
    req = {"action":"refresh_browser_condition","key":'tag',"value":tagValue};
    jQuery.ajax({
        url : '/app/src/domain/main/controller/ajax/ajax.mega.php',
        type : "post",
        data : req,
        async : false,
        complete : function(data) {
            jQuery('#tagselect span').removeClass('clickOn');
            jQuery(element).addClass('clickOn');
            if (getFilterValue("field")=='' && getFilterValue("subfield")==''){
                UpdateFieldList("0");
            }
            else{
                UpdateFieldList("1");
            }
            if (getFilterValue("type")=='' && getFilterValue("subtype")==''){
                UpdateAttributeList("0");
            }
            else{
                UpdateAttributeList("1");
            }
        }
    });
}

function toggle_son(element){
    if (jQuery(element).siblings('.ulSon')[0].style['display']=='block'){
        jQuery(element).siblings('.ulSon').toggle();
    }
    else{
        var ulId = jQuery(element).parent().parent().attr('id');
        jQuery('#'+ulId+' .ulSon').hide();
        jQuery(element).siblings('.ulSon').toggle();
    }
}

function toggle_brother(element){
    if(jQuery(element).parent().next().is(':hidden') == false){
        jQuery(element).parent().siblings("li").toggle();
    }else{
        jQuery("#fieldselect").children(':first').siblings().hide();
        jQuery("#styleselect").children(':first').siblings().hide();
        jQuery("#tagselect").children(':first').siblings().hide();
        jQuery(element).parent().siblings("li").toggle();
    }
}

//deprecated 
function RefreshBrowserURL_bk(){
    var url = '/services?';
    var params = "service=" + encodeURIComponent(getFilterValue("service")) +
            "&scid=" + encodeURIComponent(getFilterValue("scid"))+
            "&sclevel=" + encodeURIComponent(getFilterValue("sclevel"));
    var val = getFilterValue("source");
    if (val !==''){
        params = params+"&source=" + encodeURIComponent(val);
    }

    val = getFilterValue("target");
    if (val !==''){
        params = params+"&target=" + encodeURIComponent(val);
    }
    val = getFilterValue("tag");
    if (val !==''){
        params = params+"&tag=" + encodeURIComponent(val);
    }
    val = getFilterValue("field");
    if (val !==''){
        params = params+"&field=" + encodeURIComponent(val);
    val = getFilterValue("subfield");
    if (val !==''){
        params = params+"&subfield=" + encodeURIComponent(val);
    }
    val = getFilterValue("type");
    if (val !==''){
        params = params+"&type=" + encodeURIComponent(val);
    }
    val = getFilterValue("subtype");
    if (val !==''){
        params = params+"&subtype=" + encodeURIComponent(val);
    }
    val = getFilterValue("job");
    if (val !==''){
        params = params+"&job=" + encodeURIComponent(val);
    }
    // console.log(params);
    url = url+ window.btoa(params);
    window.location.href = url;    }

}

function RefreshBrowserURL(){
    var url = '/services/'; 
    var service= encodeURIComponent(getFilterValue("sclevel")) ;
    var val = getFilterValue("job");
    var params  = '';
    if (val !==''){
        params = "?job=" + encodeURIComponent(val);
    }

    var lang = '';
    var lang_src = getFilterValue("source");
    if (lang_src !=='All'){
        if (lang_src == 'Chinese (Simplified)'){
            lang_src = 'Chinese-Simplified';
        }
        else if  (lang_src == 'Chinese (Traditional)'){
            lang_src = 'Chinese-Traditional';
        }
        lang_src = encodeURIComponent(lang_src);
    }
    else{
        lang_src = 'all-languages' ; 
    }
    var lang_tar = getFilterValue("target");
    if (lang_tar !=='All'){
        if (lang_tar == 'Chinese (Simplified)'){
            lang_tar = 'Chinese-Simplified';
        }
        else if  (lang_tar == 'Chinese (Traditional)'){
            lang_tar = 'Chinese-Traditional';
        }
        lang_tar = encodeURIComponent(lang_tar);
    }
    else{
        lang_tar = 'all-languages' ; 
    }
    if( lang_src === 'all-languages' &&  lang_tar === 'all-languages'){
        lang = 'all-languages';
    }
    else {
        var service2= getFilterValue("service") ;
        if (service2 == 'Editing' || service2 == 'Writing' || service2 == 'Publishing' || service == 'Audio/Video Transcription'){
            lang = lang_tar;
        }
        else{
            lang = lang_src +'-to-' + lang_tar;
        }
    }  
    var tag = getFilterValue("tag");
    if (tag !==''){
        tag = encodeURIComponent(tag);
    }
    else{
        tag = 'all-tags';
    }
    var field = getFilterValue("field");
    if (field !==''){
        field = encodeURIComponent(field);
    }    
    if (getFilterValue("subfield") !==''){
        var field_text = getFilterValue("field-text");
        field = encodeURIComponent(field_text.split('-',2)[1]);
    }
    if (field === ''){
        field = 'all-fields'
    }
    var type = getFilterValue("type");
    if (type !==''){
        type =  encodeURIComponent(type);
    }
    if (getFilterValue("subtype") !==''){
        var type_text = getFilterValue("type-text");
        type = encodeURIComponent(type_text.split('-',2)[1]);
    }
    if (type === ''){
        type = 'all-features'
    }

    if (tag !== "all-tags"){    
        var path_params = service + '/' + lang + '/' + field+'/'+type;
    }
    else if (type !== "all-features"){
        var path_params = service + '/' + lang + '/' + field+'/'+type;
    }
    else if (field !== "all-fields"){
        var path_params = service + '/' + lang + '/' + field;
    }
    else if (lang !== "all-languages"){
        var path_params = service + '/' + lang ;
    }
    else{
        var path_params = service;
    }
    path_params = path_params.replace(/%20%26%20/g, '-and-');
    path_params = path_params.replace(/ & /g, '-and-');    
    path_params = path_params.replace(/%20/g, '-');
    path_params = path_params.replace(/ /g, '-');
    path_params = path_params.toLowerCase() ;
    if (tag !== "all-tags"){
        path_params = path_params  + '/'+tag
    }    
    url = url+ path_params+params
    console.log(url);
    window.location.href = url;
}

function UpdateFieldList(isall){
    // console.log('UpdateFieldList');
    var requestData = {
        'action':'get_fields',
        'isall':isall
    }
    jQuery.ajax({
        url:'/app/src/domain/main/controller/ajax/ajax.browser.php',
        type:'post',
        async:true,
        data:requestData,
        dataType:'json',
        success:function(data){           
            if (data['status']){
                jQuery('#fieldselect').html(data['data']);
                UpdateFieldStatus();  
            }
            else{
                console.log(data);
            }
        },
        error:function(xhr,error){
            console.log(error);
            console.log(xhr);
        }
    });
}

function UpdateAttributeList(isall){
    // console.log('UpdateAttributeList');
    var requestData = {
        'action':'get_features',
        'isall':isall
    }
    jQuery.ajax({
        url:'/app/src/domain/main/controller/ajax/ajax.browser.php',
        type:'post',
        async:true,
        data:requestData,
        dataType:'json',
        success:function(data){
            if (data['status']){
                jQuery('#styleselect').html(data['data']);
                UpdateTypeStatus(); 
            }
            else{
                console.log(data);
            }           
        },
        error:function(xhr,error){
            console.log(error);
        }
    });
}

function UpdateTagList(isall){
    var requestData = {
        'action':'get_tags',
        'isall':isall
    }
    jQuery.ajax({
        url:'/app/src/domain/main/controller/ajax/ajax.browser.php',
        type:'post',
        async:true,
        data:requestData,
        dataType:'json',
        success:function(data){
            if (data['status']){
                jQuery('#tagselect').html(data['data']);
                UpdateTagStatus();
            }
            else{
                console.log(data);
            }
             // console.log(data);
        },
        error:function(xhr,error){
            console.log(error);
        }
    });

}

function UpdateFieldStatus(){
    var field = getFilterValue("field");
    var subfield = getFilterValue("subfield");
    var fieldText = 'All';
    jQuery("#fieldselect span").removeClass('clickOn');
    jQuery("#fieldselect p").removeClass('pOn');
    if (subfield != '' && subfield !=undefined){
        var item = jQuery("#fieldselect li div p[data="+subfield+"]");  // get sub field item
        if(item.length>0){
            jQuery(item).addClass('pOn');
            var itemParent = jQuery(item).parent();
            jQuery(itemParent).show();
            jQuery(itemParent).siblings('span').addClass('clickOn');
            fieldText = jQuery(item).attr('text');          
        }
    } else if (field != '' && field != undefined ) {
        var item = jQuery("#fieldselect li span[data='"+field+"']");
        if(item.length>0){
            jQuery(item).addClass('clickOn');
            fieldText = field;           
        }
    } else {
        jQuery('#fieldselect li span[data=""]').addClass('clickOn');
    }
    setFilterValue('field-text',fieldText);
    // if (in_provider_php){
    //     $('fieldid').innerHTML = fieldText;        
    // }   

}

function UpdateTypeStatus(){
    var type = getFilterValue("type");
    var subtype = getFilterValue("subtype");
    var typeText = "All";

    jQuery("#styleselect span").removeClass('clickOn');
    jQuery("#styleselect p").removeClass('pOn');
    if (subtype != '' && subtype !=undefined){
        var item = jQuery("#styleselect li div p[data="+subtype+"]");  // get sub field item
        if(item.length>0){
            jQuery(item).addClass('pOn');
            var itemParent = jQuery(item).parent();
            jQuery(itemParent).show();
            jQuery(itemParent).siblings('span').addClass('clickOn');
            typeText = jQuery(item).attr('text');            
        }
    } else if (type != '' && type != undefined ) {
        var item = jQuery("#styleselect li span[data='"+type+"']");
        if(item.length>0){
            jQuery(item).addClass('clickOn');
            typeText = type;      
        }
    } else {
        jQuery('#styleselect li  span[data=""]').addClass('clickOn');
    }
    setFilterValue('type-text',typeText);
    // if (in_provider_php){
    //     $('typeid').innerHTML = typeText;        
    // } 
}

function UpdateTagStatus(){
    var tag = getFilterValue("tag");
    var tagText = 'All';
    jQuery("#tagselect .clickOn").removeClass('clickOn');
    if (tag=='') {
        jQuery('#tagselect li span[data=""]').addClass('clickOn');        
    } else {
        var item = jQuery("#tagselect span[data='"+tag+"']");
        if (item.length>0){
            jQuery(item).addClass('clickOn');
        }
        tagText =  tag;
    }
    // if (in_provider_php){
    //     $('tagid').innerHTML = tagText;        
    // }  
}

function AddServiceToCart(){
   // console.log(filter_array);
    var requestData = {
        'action':'add_supplier',
        'sourceLang':getFilterValue("source"),
        'targetLang':getFilterValue("target"),
        'serviceId':getFilterValue('scid'),
        's_level2_name':getFilterValue('service'),
        's_level3_name':getFilterValue('sclevel'),
        'supplierNo':'',
        'supplierId':'',
        'field':getFilterValue("field-text"),
        'subField':getFilterValue("subfield"),
        'feature':getFilterValue("type-text"),
        'subFeature':getFilterValue("subtype"),
        'job':getFilterValue("job"),
        'tag':getFilterValue("tag")
    }
    jQuery.ajax({
        url:'/app/src/domain/main/controller/ajax/ajax.serviceCart.php',
        type:'post',
        data:requestData,
        dataType:'json',
        success:function(data){
            //console.log(data);
            if (data['status']==true){
                window.location.href= '/service-cart';                
            }
            else{
                alert(data['msg']);
            }
        },
        fail:function(xhr){
            console.log(xhr);
        }
    });

}

function getCookie(c_name) {
  if (document.cookie.length > 0) {
    c_start = document.cookie.indexOf(c_name + "=");
    if (c_start != -1) { 
      c_start = c_start + c_name.length + 1;
      c_end = document.cookie.indexOf(";", c_start);
      if (c_end == -1) c_end = document.cookie.length;
      return unescape(document.cookie.substring(c_start,c_end));
    } 
  }

  return "";
}

function setCookie(c_name, value, expiredays) {
  var exdate=new Date();
  exdate.setDate(exdate.getDate() + expiredays);
  document.cookie = c_name + "=" + escape(value) +
    ((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
}

function checkCookie() {
  username = getCookie('username');
  if (username != null && username != "") {
   alert('Welcome again '+username+'!');
  } else {
    username = prompt('Please enter your name:', "");
    if (username != null && username != "") {
      setCookie('username',username,365)
    }
  }
}

function RefreshBrowserCondition(key, value){
    req = {"action":"refresh_browser_condition","key":key,"value":value};
    jQuery.post('/app/src/domain/main/controller/ajax/ajax.mega.php',req,function(data){
        // console.log(key+':'+value+'=='+data);
    });       
}

jQuery(document).ready(function(){
    // "use strict";
    jQuery(".responsive-btn").on('click', function(){
		jQuery(".nav").toggleClass('active');
		jQuery(this).toggleClass('active');
	});

	jQuery("#mynav > a").on('click', function(){
		jQuery(".nav, .responsive-btn").removeClass('active');
	});
});