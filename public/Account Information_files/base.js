/**
 * 定义全局变量
 */

 var W3C = (document.getElementById)? true: false;
 var AGT = navigator.userAgent.toLowerCase();
 var IE = ((AGT.indexOf("msie") != -1) && (AGT.indexOf("opera") == -1) && (AGT.indexOf("omniweb") == -1));

 function addLoadListener(fn) {
 	if (typeof window.addEventListener != 'undefined') {
 		window.addEventListener('load', fn, false);
 	} else if (typeof document.addEventListener != 'undefined') {
 		document.addEventListener('load', fn, false);
 	} else if (typeof window.attachEvent != 'undefined') {
 		window.attachEvent('onload', fn);
 	} else {
 		var oldfn = window.onload;
 		if (typeof window.onload != 'function') {
 			window.onload = fn;
 		} else {
 			window.onload = function() {
 				oldfn();
 				fn();
 			};
 		}
 	}
 }

function showcontent(event,id) { //移动图层的函数
	var scrollleft, scrolltop, pointerX, pointerY;
	var x=screen.width;
	scrollleft = GetScrollLeft();
	scrolltop = GetScrollTop();
	if (event.pageX) {
		pointerX = event.pageX + 10;
		pointerY = event.pageY  + 10;
	} else {
		pointerX = event.clientX + scrollleft + 10 ;
		pointerY = event.clientY + scrolltop + 10;
	}
	$(id).setStyle({
		left: pointerX + "px",
		top: pointerY + "px"
	});
	$(id).show();
} 

function hidecontent(div1){
	document.getElementById(div1).style.display = "none";
}

function attachEventListener(target, eventType, functionRef, capture) {
	if (typeof target.addEventListener != "undefined") {
		target.addEventListener(eventType, functionRef, capture);
	} else if (typeof target.attachEvent != "undefined") {
		target.attachEvent("on" + eventType, functionRef);
	} else {
		eventType = "on" + eventType;

		if (typeof target[eventType] == "function") {
			var oldListener = target[eventType];

			target[eventType] = function() {
				oldListener();

				return functionRef();
			}
		} else {
			target[eventType] = functionRef;
		}
	}

	return true;
}

/**
  * @var object pe  控制时间间隔的对象，当达到一定的时间间隔的时候执行预设函数
  */
  var pe;

/**
  * @var int page  页码
  */
  var page;

/**
  * @var array parameters  译员自身属性以及译员测试相关属性组成的数组
  */
  var parameters;

/**
  * @var array calendar  译员工作安排日历属性组成的数组
  */
  var calendar = { 'prevelement' : null,
  'wordload' : 0,
  'year' : null,
  'month' : null,
  'day' : null,
  'period' : null,
  'comment' : null
};

/**
  * @author WordCube
  * @desc 取得文档body对象
  * @return object
  */
  function IeTrueBody() {
  	return (document.compatMode && document.compatMode!="BackCompat")? document.documentElement : document.body;
  }

/**
  * @author WordCube
  * @desc 获取当前页面的滚动条纵坐标位置
  * @return int
  */
  function GetScrollTop() {
  	return IE ? IeTrueBody().scrollTop : window.pageYOffset;
  }

/**
  * @author WordCube
  * @desc 获取位于对象左边界和窗口中目前可见内容的最左端之间的距离
  * @return int
  */
  function GetScrollLeft() {
  	return IE ? IeTrueBody().scrollLeft : window.pageXOffset;
  }

// Trim() , Ltrim() , RTrim() function
String.prototype.Trim = function() {
	return this.replace(/(^\s*)|(\s*$)/g, "");
}

String.prototype.LTrim = function() {
	return this.replace(/(^\s*)/g, "");
}

String.prototype.RTrim = function() {
	return this.replace(/(\s*$)/g, "");
}

/**
  * 实现鼠标移动切换图片的效果
  */
function MM_swapImgRestore() { //v3.0
	var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) 
	x.src=x.oSrc;
}

function MM_preloadImages() { //v3.0
	var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
		var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
		if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
	}

function MM_findObj(n, d) { //v4.01
	var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
		d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
		if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
		for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
			if(!x && d.getElementById) x=d.getElementById(n); return x;
	}

function MM_swapImage() { //v3.0
	var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
	if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}

/**
  * 首页相关参数组成的数组
  */



/**
  * 高级搜索相关参数组成的数组
  */
  var advancedSearch = { 'isLogin' : false,
  'source' : '',
  'target' : ''
};

/**
  * @author ryan
  * @param object currentform, 表单对象
  * @param string elementname, 元素ID名称
  * @param string description, 描述信息
  * @param string filename
  * @desc 提交上传文件的表单
  * @return void
  */
  function gonext(currentform, element, description, filename) {
  	var value;
  	value = currentform[element].value;
  	if (value == '') {
  		alert(description);
  	} else {
  		if (filename == '') {
  			currentform.submit();		
  		} else {
  			location.href = filename;
  		}
  	}	
  }

/**
  * @author sara
  * @param string url
  * @desc 修改用户密码
  * @return string
  */		
  function modifyitem(url) {
  	var password = $F('password');
  	var repassword = $F('repassword');
  	var pars = 'password=' + password + '&repassword=' + repassword;
  	var myAjax = new Ajax.Request(
  		url,
  		{
  			method: 'get',
  			parameters: pars,
  			onSuccess: function(transport) {
  				var result = transport.responseText;
  				if (result == 'success') {
  					$('cform').hide();
  				} else {
  					$('errormodiinfo').innerHTML = result; 
  				}
  			}
  		});
  }

/**
  * @author WordCube
  * @desc 取得列表页的时间间隔执行器对象
  * @return object
  */
  function getListPE() {
  	var seconds = parameters['seconds'];
  	pe = new PeriodicalExecuter(getAjaxUpdater, seconds);
  }

/**
  * @author WordCube
  * @desc 取得客户项目管理列表更新内容
  * @return void
  */
  function getAjaxUpdater() {
  	var url = parameters['url'];
  	var pars = parameters['pars'];
  	var myAjax = new Ajax.Request(
  		url,
  		{
  			method: 'get',
  			parameters: pars,
  			onComplete: updateComplete
  		});
  }

/**
  * @author WordCube
  * @param object originalRequest, 返回的请求对象
  * @desc 更新项目列表容器层的内容
  * @return void
  */
  function updateComplete(originalRequest) {
  	var result = originalRequest.responseText;
  	var elementname = parameters['elementname'];
  	if (result.Trim() != 'failure') {
  		$(elementname).innerHTML = result;
  	}
  }

  function addit(filename, element, key) {
  	var url = filename;
  	var params = 'key=' + key;
  	var elementid = element + key;
  	var myAjax = new Ajax.Request(
  		url,
  		{
  			method: 'get',
  			parameters: params,
  			onSuccess: function(transport) {
  				var result = transport.responseText.evalJSON(true);
  				$(elementid).innerHTML = result.action;
  				$('transcount').innerHTML = result.count;
  			}
  		});
  }

/**
  * @author WordCube
  * @desc  提交规则的搜索请求表单
  * @return void
  */
  function submitRegularSearchRequest() {
  	document.searchForm.submit();
  }

  function changeSelectedTranslator() {
  	/*
	var url = 'app/src/domain/main/browseselectedproviders.php';
  	new Ajax.Updater( 'translatorside', url, {
  		asynchronous: true,
  		method: "get",
  		parameters: "",
  		evalScripts: true,
  		onLoading: function(request) {},
  		onComplete: function(request) {}
  	});
	*/
	$.ajax({
    type: 'get',
    url: '/app/src/domain/main/browseselectedproviders.php',
    data: '',
    dataType:'text',
    beforeSend: function(){
		//
    },
    success:function(data){
        $("#translatorside").html(data);
    },
    complete:function(){      
        //
    }
    });
  }

  function browseViewType(viewType) {
  	var tile; 
  	var list;
  	tile = viewType == 'tile' ? '<img src="./images/display_mode_grid_act.gif" alt="Guid View" border="0" style="margin-right:2px;"/>' : '<img src="./images/display_mode_grid.gif" onclick="javascript: return browseViewType(\'tile\');" alt="Guid View" border="0" />';
  	list = viewType == 'list' ? '<img src="./images/display_mode_list_act.gif" alt="List View" border="0" style="margin-left:2px;"/>' : '<img src="./images/display_mode_list.gif" onclick="javascript: return browseViewType(\'list\');" alt="List View" border="0" />';
  	$('view-nav').innerHTML = tile + list;
  	setFilterValue('view', viewType);
  	changeView();
  }

  function browseSelectViewType(viewType) {
  	var tile; 
  	var list;
  	tile = viewType == 'tile' ? '<img src="./images/display_mode_grid_act.gif" alt="Guid View" border="0" style="margin-right:2px;"/>' : '<img src="./images/display_mode_grid.gif" onclick="javascript: return browseSelectViewType(\'tile\');" alt="Guid View" border="0" />';
  	list = viewType == 'list' ? '<img src="./images/display_mode_list_act.gif" alt="List View" border="0" style="margin-left:2px;"/>' : '<img src="./images/display_mode_list.gif" onclick="javascript: return browseSelectViewType(\'list\');" alt="List View" border="0" />';
  	$('view-nav').innerHTML = tile + list;
  	setFilterValue('view', viewType);
  	changeViewSelect();
  }

  function browseRate(rate) {
  	var start;
  	var allrate; 
  	var fiverate;
  	var halfrate;
  	var fourrate;

  	start = '<span class="black12b">Rating&nbsp;:&nbsp;</span>';
  	allrate = rate == 'all' ? '<span class="black12b">All</span>' : '<a href="#" class="green12" onclick="javascript: return browseRate(\'all\');">All </a>';
  	fiverate = rate == 'five' ? '<span class="black12b">5 Stars</span>' : '<a href="#" class="green12" onclick="javascript: return browseRate(\'five\');">5 Stars </a>';
  	halfrate = rate == 'half' ? '<span class="black12b">4.5 Stars</span>' : "<a href='#' class='green12' onclick=\"javascript: return browseRate('half');\">4.5 Stars </a>";
  	fourrate = rate == 'four' ? '<span class="black12b">4 stars</span>' : "<a href='#' class='green12' onclick=\"javascript: return browseRate('four');\">4 Stars </a>";
  	$('rate-nav').innerHTML = start + allrate + '&nbsp; | &nbsp;' + fiverate + '&nbsp; | &nbsp;'+ halfrate + '&nbsp; | &nbsp;'+ fourrate;
  	setFilterValue('rate', rate);
  	changeView();
  }

  function browseStatus(status) {
  	var start;
  	var allstatus;
  	var busy; 
  	var leisure;
  	var holiday;

  	start = '<span class="black12b">Status&nbsp;:&nbsp;</span>';
  	allstatus = status == 'all' ? '<span class="black12b">All</span>' : '<a href="#" class="green12" onclick="javascript: return browseStatus(\'all\');">All </a>';
  	busy = status == 'busy' ? '<span class="black12b">Busy</span>' : '<a href="#" class="green12" onclick="javascript: return browseStatus(\'busy\');">Busy</a>';
  	leisure = status == 'leisure' ? '<span class="black12b">Free</span>' : "<a href='#' class='green12' onclick=\"javascript: return browseStatus('leisure');\">Free </a>";
  	holiday = status == 'holiday' ? '<span class="black12b">Vocation</span>' : "<a href='#' class='green12' onclick=\"javascript: return browseStatus('holiday');\">Vocation</a>";
  	$('status-nav').innerHTML = start + allstatus + '&nbsp; | &nbsp;' + busy + '&nbsp; | &nbsp;' + leisure + '&nbsp; | &nbsp;'+ holiday;
  	setFilterValue('status', status);
  	changeView();
  }

  function browseCo(cooperate) {
  	var start;
  	var allco
  	var noco; 
  	var yesco;

  	start = '<span class="black12b">Previous cooperation&nbsp;:&nbsp;</span>';
  	allco = cooperate == 'all' ? '<span class="black12b">All</span>' : '<a href="#" class="green12" onclick="javascript: return browseCo(\'all\');">All </a>';
  	noco = cooperate == 'noco' ? '<span class="black12b">No</span>' : '<a href="#" class="green12" onclick="javascript: return browseCo(\'noco\');">No</a>';
  	yesco = cooperate == 'yesco' ? '<span class="black12b">Yes</span>' : "<a href='#' class='green12' onclick=\"javascript: return browseCo('yesco');\">Yes</a>";
  	$('cooperate-nav').innerHTML = start + allco + '&nbsp; | &nbsp;' + noco+ '&nbsp; | &nbsp;'+ yesco;
  	setFilterValue('cooperate', cooperate);
  	changeView();
  }

  function browseSortTypeHome(sortType) {
  	var mostpopular; 
  	var addingtime; 
  	var volume;
  	var turnaround;
  	var end;
  	
  	mostpopular = sortType == 'mp' ? '<div class="span3 c6">&nbsp;</div><div class="span3 c4">Popularity</div>' : '<div class="span3 c6">&nbsp;</div><div class="span3 c5" ><a href="#" class="green12w" onclick="javascript: return browseSortTypeHome(\'mp\');">Popularity</a></div>';
  	addingtime = sortType == 'at' ? '<div class="span3 c6">&nbsp;</div><div class="span3 c4">Joining Time</div>' : '<div class="span3 c6">&nbsp;</div><div class="span3 c5" ><a href="#" class="green12w" onclick="javascript: return browseSortTypeHome(\'at\');">Joining Time</a></div>';
  	volume = sortType == 't' ? '<div class="span3 c6">&nbsp;</div><div class="span3 c4">Volume</div>' : '<div class="span3 c6">&nbsp;</div><div class="span3 c5" ><a href="#" class="green12w" onclick="javascript: return browseSortTypeHome(\'t\');">Volume</a></div>';
  	turnaround = sortType == 'ts' ? '<div class="span3 c6">&nbsp;</div><div class="span3 c4">Turn Around</div>' : '<div class="span3 c6">&nbsp;</div><div class="span3 c5" ><a href="#" class="green12w" onclick="javascript: return browseSortTypeHome(\'ts\');">Turn Around</a></div>';
  	end = '<div class="span3 c6" style="width: 22px;margin-bottom: 10px">&nbsp;</div>';
  	$('sort-nav').innerHTML = mostpopular + addingtime + volume + turnaround + end;
  	setFilterValue('sort', sortType);
  	changeViewHome();
  }

/**
 * @author WordCube
 * @param string serviceType, 服务类型
 * @desc 查看服务类型
 * @return void
 */
 function browseServiceType(serviceType) {
 	var rush; 
 	var regular;
 	var large; 
 	
 	rush = serviceType == 'g' ? '<li class="green12">Rush</li>' : "<li><a href=\"###\" onclick=\"javascript: return browseServiceType('g');\">Rush</a></li>";
 	regular = serviceType == 'u' ? '<li class="green12">Regular</li>' : "<li><a href=\"###\" onclick=\"javascript: return browseServiceType('u');\">Regular</a></li>";
 	large = serviceType == 'l' ? '<li class="green12">Large</li>' : "<li><a href=\"###\" onclick=\"javascript: return browseServiceType('l');\">Large</a></li>";
 	$('service-type-nav').innerHTML = rush + '<li class="menuDiv"></li>' + regular + '<li class="menuDiv"></li>' + large;
 	setFilterValue('servicetype', serviceType);
 	changeView();
 }

/**
  * 初始化高级搜索页面各选择项的值
  * @return void
  */
  function initAdvancedSearch() {
  	var select, input, button;
  	button = document.getElementById('btnedit');
  	attachEventListener(button, 'click', editLanguagePair, false);

  //设置关键词文本框的内容为空
  input = document.getElementById('keyword');
  input.value = '';

  form = document.getElementById('frmadvancedsearch');

  //设置父领域下拉列表的选择项为-- Select --
  select = document.getElementById('field');
  select.selectedIndex = 0;
  attachEventListener( select,
  	"change",
  	function() {
  		var select = document.getElementById('field');
  		var value = select.options[select.selectedIndex].value;
  		if (value == 'null') {
                           //清除子下拉列表中的选项
                           updateSubSelectOption('subfield', '');

                           return;
                       }

                       getSubSelectOptions(value, 'field');											
                   },
                   false
                   );
  
  //清除子领域下拉列表除-- Select --的其它选项并设置子领域下拉列表的选择项为-- Select --
  updateSubSelectOption('subfield', '');
  select = document.getElementById('subfield');
  select.selectedIndex = 0;

  //设置父类型下拉列表的选择项为-- Select --
  select = document.getElementById('type');
  select.selectedIndex = 0;
  attachEventListener( select,
  	"change",
  	function() {
  		var select = document.getElementById('type');
  		var value = select.options[select.selectedIndex].value;
  		if (value == 'null') {
                           //清除子下拉列表中的选项
                           updateSubSelectOption('subtype', '');

                           return;
                       }

                       getSubSelectOptions(value, 'type');											
                   },
                   false
                   );

  //清除子类型下拉列表除-- Select --的其它选项并设置子类型下拉列表的选择项为-- Select --
  updateSubSelectOption('subtype', '');
  select = document.getElementById('subtype');
  select.selectedIndex = 0;

  //设置项目类型下拉列表的选择项为-- Select --
  select = document.getElementById('servicetype');
  select.selectedIndex = 0;

  //设置源语和目标语默认值
  var sourceDiv = document.getElementById('source_language_div');
  var targetDiv = document.getElementById('target_language_div');

  sourceDiv.innerHTML = '';
  targetDiv.innerHTML = '';

  sourceDiv.innerHTML = 'Source: <font class="deep11">' + advancedSearch['source'] + '</font>';
  targetDiv.innerHTML = 'Target: <font class="deep11">' + advancedSearch['target'] + '</font>';
}

/**
  * 初始化tag搜索结果页面各选择项的值
  * @return void
  */
  function initTagSearch() {
  	var button;
  	button = document.getElementById('btnedit');
  	attachEventListener(button, 'click', editLanguagePair, false);

  //设置源语和目标语默认值
  var sourceDiv = document.getElementById('source_language_div');
  var targetDiv = document.getElementById('target_language_div');

  sourceDiv.innerHTML = '';
  targetDiv.innerHTML = '';

  sourceDiv.innerHTML = '<font class="black12b">Source:</font> <font class="deep11">' + filter_array['source'] + '</font>';
  targetDiv.innerHTML = '<font class="black12b">Target :</font> <font class="deep11">' + filter_array['target'] + '</font>';
}

function editLanguagePair() {
	getLanguage();
}

function getLanguage() {
	var url = 'getlanguage.php';
	var params = '';      
	new Ajax.Request(url, {
		method: "get",
		parameters: params,
		onComplete: function(request) {
			var result = request.responseText.evalJSON(true);
                  //alert(request.responseText);
                  if (typeof result.error == 'undefined') {
                  	changeEditLanguagePairView(result);
                  }
              }
          });
}

function changeEditLanguagePairView(languages) {
	var sourceDiv, targetDiv, button;
	var label, select, option;

	if (typeof languages == 'object') {
		sourceDiv = document.getElementById('source_language_div');
		targetDiv = document.getElementById('target_language_div');
		button = document.getElementById('btnedit');

		sourceDiv.innerHTML = '';
		targetDiv.innerHTML = '';

		label = document.createElement('label');
		label.innerHTML = '<font class="black12b">Source:</font>';

		select = createLanguageSelect(languages, 'source');
		sourceDiv.appendChild(label);
		sourceDiv.appendChild(select);
		attachEventListener(select, 'change', updateTargetSelectOptions, false);

		label = document.createElement('label');
		label.innerHTML = '<font class="black12b">Target :</font>';

		select = createLanguageSelect(languages, 'target');
		targetDiv.appendChild(label);
		targetDiv.appendChild(select);

		button.style.display = 'none';

		buttonContainer = document.getElementById('language_pair_button');
		saveButton = document.createElement('input');
		saveButton.id = 'btnsave';
		saveButton.name = 'btnsave';
		saveButton.type = 'button';
		saveButton.value = 'Save';
		buttonContainer.appendChild(saveButton);
		attachEventListener(saveButton, 'click', saveLanguagePairSet, false);
	}
}

function updateTargetSelectOptions() {
	var option;
	var sourceSelect, sourceLanguage, sourceSelectLength;
	var targetSelect, targetSelectLength;

	sourceSelect = document.getElementById('source');
	targetSelect = document.getElementById('target');

	sourceLanguage = sourceSelect.options[sourceSelect.selectedIndex].value;

  //删除目标语下拉列表所有选项，只保留All选项
  targetSelectLength = targetSelect.length;
  for (var i = 1; i < targetSelectLength; i++) {
  	targetSelect.remove(1);
  }

  sourceSelectLength = sourceSelect.length;
  for (var i = 1; i < sourceSelectLength; i++) {
  	if (sourceLanguage != sourceSelect.options[i].value) {
  		option = document.createElement('option');
  		option.value = sourceSelect.options[i].value;
  		option.text = sourceSelect.options[i].text;

  		try {
        targetSelect.add(option, null); // standards compliant
    } catch(ex) {
        targetSelect.add(option); // IE only
    }

    if (advancedSearch['target'] == option.value) {
    	option.selected = true;
    }
}
}
}

function createLanguageSelect(languages, type) {
	var elementId = type == 'source' ? 'source' : 'target';
	var defaultLanguage = type == 'source' ? filter_array['source'] : filter_array['target'];

	select = document.createElement('select');
	select.id = elementId;
	select.name = elementId;

	option = document.createElement('option');
	option.value = 'All';
	option.text = 'All';

	try {
    select.add(option, null); // standards compliant
} catch(ex) {
    select.add(option); // IE only
}

if (defaultLanguage.toLowerCase() == 'all') {
	option.selected = true;
}

optionsLength = languages.length;
for (var i = 0; i < optionsLength; i++) {
	option = document.createElement('option');
	option.value = languages[i].name;
	option.text = languages[i].name;
    //alert(defaultLanguage + ' ' + languages[i].name);

    try {
      select.add(option, null); // standards compliant
  } catch(ex) {
      select.add(option); // IE only
  }

  if (defaultLanguage == languages[i].name) {
  	option.selected = true;
  }
}

return select;
}

function saveLanguagePairSet() {
	var url = '/app/src/sys/setdefaultlanguage.php';
	var pars = Form.serialize('frmlanguagepair');
	var myAjax = new Ajax.Request(
		url,
		{
			method: 'post',
			parameters: pars,
			onComplete: function (request) {
                    //alert(request.responseText);
                    var result = request.responseText.evalJSON(true);
                    //alert(request.responseText);
                    //if (result.error == 'false') {
                    	setCookie('default_source_language', result.source, 1);
                    	setCookie('default_target_language', result.target, 1);
                    	filter_array['source'] = result.source;
                    	filter_array['target'] = result.target;
                    //}
                    changeSaveLanguagePairView(result);
                }
            }
            );
}

function changeSaveLanguagePairView(result) {
	var sourceDiv, targetDiv, buttonContainer;
	var editButton, saveButton;

	sourceDiv = document.getElementById('source_language_div');
	targetDiv = document.getElementById('target_language_div');

	sourceDiv.innerHTML = '';
	targetDiv.innerHTML = '';

	sourceDiv.innerHTML = '<font class="black12b">Source:</font> <font class="deep11">' + result.source + '</font>';
	targetDiv.innerHTML = '<font class="black12b">Target :</font> <font class="deep11">' + result.target + '</font>';

	buttonContainer = document.getElementById('language_pair_button');
	saveButton = document.getElementById('btnsave');
	buttonContainer.removeChild(saveButton);

	editButton = document.getElementById('btnedit');
	editButton.style.display = 'block';
	setFilterValue('source', result.source);
	setFilterValue('target', result.target);
	$('languagepair').innerHTML = result.source + ' - ' + result.target;
	changeView();
}

/**
  * @author WordCube
  * @param string parentSelectId,, 上一级下拉列表ID
  * @param string subSelectId,, 下一级下拉列表ID
  * @param string type, 用于区分领域和类型
  * @desc 更改子领域或子类型下拉列表菜单选项
  * @return void
  */
/*
function changeSubSelectOption(parentSelectId, subSelectId, type) {
  var parentSelect, parentID, subSelectLength
  parentSelect = document.getElementById(parentSelectId);
  subSelect = document.getElementById(subSelectId);
  parentId = parentSelect.options[parentSelect.selectedIndex].value
  if (parentId == 'null') {
    //清除子下拉列表中的选项
    updateSubSelectOption(subSelectId, '');

    return;
  }

  //var options;
  //options = getSubSelectOptions(parentId, type);
  getSubSelectOptions(parentId, type);
  //alert(options);
}
*/

/**
  * @author WordCube
  * @param int parentId,, 父领域或着父类型ID值
  * @param string type, 用于区分领域和类型
  * @desc 取得子领域或子类型下拉列表菜单选项集合
  * @return void
  */
  function getSubSelectOptions(parentId, type) {
  	var elementId = type == 'field' ? 'subfield' : 'subtype';
  	var url = 'getsubselectoptions.php';
  	var params = "id=" + encodeURIComponent(parentId) +
  	"&type=" + encodeURIComponent(type);      
  	new Ajax.Request(url, {
  		method: "get",
  		parameters: params,
  		onComplete: function(request) {
  			var result = request.responseText.evalJSON(true);
  			updateSubSelectOption(elementId, '');
  			if (typeof result.error == 'undefined') {
  				updateSubSelectOption(elementId, result);
  			}
  		}
  	});
  }

/**
  * @author WordCube
  * @param string elementId,, 下拉列表ID
  * @param mixed options,, 选项集合
  * @desc 设置子领域或子类型下拉列表菜单选项
  * @return void
  */
  function updateSubSelectOption(elementId, options) {
  	var select, option, optionsLangth;
  	select = document.getElementById(elementId);
  	if (typeof options == 'object') {
  		optionsLength = options.length;
  		for (var i = 0; i < optionsLength; i++) {
  			option = document.createElement('option');
  			option.value = options[i].id;
  			option.text = options[i].name;

  			try {
        select.add(option, null); // standards compliant
    } catch(ex) {
        select.add(option); // IE only
    }
}
} else {
    //清除下拉列表中的选项,只保留--Select--选项
    selectLength = select.length;
    for (var i = 1; i < selectLength; i++) {
    	select.remove(i);
    }
}
}

/**
 * @author WordCube
 * @param int pid, 子领域或子类型容器ID
 * @param int pid, 父领域ID或父类型ID
 * @param string type, 用于区分领域和类型
 * @desc 取得子领域或子类型下拉列表
 * @return void
 */
 function getSubFieldOrTypeList(eid, pid, type) {
 	var key = type == 'field' ? 'subfield' : 'subtype';
 	var url = 'subfieldortype.php';
 	var params = "pid=" + encodeURIComponent(pid) +
 	"&sid=" + encodeURIComponent(getFilterValue(key)) +
 	"&type=" + encodeURIComponent(type);       
 	new Ajax.Updater( eid, url, {
 		asynchronous: true,
 		method: "get",
 		parameters: params,
 		onComplete: function(request) {
 			var result = request.responseText;
 			if ( result != 'none' ) {
 				$(eid).show();
 			} else {
 				$(eid).update('');
 				$(eid).innerHTML;
 				setFilterValue(key, '');
 			}
 		}
 	});
 }

/**
 * @author WordCube
 * @desc 改变结果展示表格的视图
 * @return void
 */
 function changeResultShowTableView() {
 	var url = 'changetabledata.php';
 	var params = 'sortcolume=' +  encodeURIComponent(getTranslatorParameter('sortcolume')) +
 	'&sorttype=' +  encodeURIComponent(getTranslatorParameter('sorttype')) +
 	'&rowstart=' +  encodeURIComponent(getTranslatorParameter('rowstart')) +
 	'&rowshow=' +  encodeURIComponent(getTranslatorParameter('rowshow')) +
 	'&sourcelanguage=' +  encodeURIComponent(getTranslatorParameter('sourcelanguage')) +
 	'&targetlanguage=' +  encodeURIComponent(getTranslatorParameter('targetlanguage')) +
 	'&keyword=' +  encodeURIComponent(getTranslatorParameter('keyword'));
 	new Ajax.Updater( 'table', 
 		url, 
 		{
 			asynchronous: true,
 			method: "get",
 			parameters: params,
 			evalScripts: true,
 			onLoading: function(request) {},
 			onComplete: function(request) {}
 		}
 		);		
 }

/**
 * @author WordCube
 * @param  int colume, 列号
 * @desc 改变结果展示表格的视图
 * @return void
 */
 function changeSortColume(colume) {
 	var sorttype = getTranslatorParameter('sorttype');
 	var sortcolume = getTranslatorParameter('sortcolume');
 	if (sortcolume == colume) {
 		if (sorttype.toLowerCase() == 'asc') {
 			sorttype = 'desc';
 		} else {
 			sorttype = 'asc';
 		}
 	} else {
 		if (sorttype.toLowerCase() == 'asc') {
 			sorttype = 'asc';
 		} else {
 			sorttype = 'desc';
 		}
 	}
 	
 	setTranslatorParameter('sorttype', sorttype);
 	setTranslatorParameter('sortcolume', colume);
 }


/**
 * @author WordCube
 * @param object sourceselectname， 源下拉列表名称
 * @param object targetselectname， 目标下拉列表名称
 * @param object element， 目标下拉列表的容器层名称
 * @desc 改变目标语言下拉列表的选项
 * @return void
 */
 function changeTargetSelectItem(sourceselectname, targetselectname, element, defaultitem, defaultvalue) {
 	var counter, temp;
 	var sourcelanguage = $F(sourceselectname);
 	var sourcelistlength = $(sourceselectname).length;
	//在源语选择不为none值的情况下， 改变目标语下拉列表
	if (sourcelanguage != 'none') {
	  //清除目标下拉列表的原选项
	  $(targetselectname).length = 0;
	  $(targetselectname).options[0] = new Option(defaultitem, 'none');
	  for (counter = 1; counter < sourcelistlength; counter++) {
	  	temp = $(sourceselectname).options[counter].value;
	  	if (temp.toLowerCase() != sourcelanguage.toLowerCase()) {
	  		$(targetselectname).options[$(targetselectname).length] = new Option(temp, temp);
	  	}
	  }

	  var targetlistlength = $(targetselectname).length;
	  for (counter = 0; counter < targetlistlength; counter++) {
	  	temp = $(targetselectname).options[counter].value;
	  	if (temp.toLowerCase() == defaultvalue.toLowerCase()) {
	  		$(targetselectname).options[counter].selected = true;
	  	}
	  }

		//显示目标下拉列表的容器层
		$(element).show();
	}
}

/**
 * @author WordCube
 * @desc 改变语言对容器层的内容
 * @return void
 */
 function changeLanguagePairBox() {
  //首先隐藏语言对复选框的最外层容器
  $('languagepairbox').hide();
	//清除语言对复选框的容器层的内容
	$('languagepairs').update();
	$('languagepairs').innerHTML;
	
	//母语
	var mothertongue = $F('sltmothertongue');
	//第一外语
	var firstforeignlanguage = $F('sltfflanguage');
	//第二外语
	var secondforeignlanguage = $F('sltsflanguage');
	//语言对数组
	var languagepair = new Array();
	//在母语和第一外语都已经选择的情况下，组织可以测试的语言对组合
	if ((mothertongue != 'none') && (firstforeignlanguage != 'none')) {
		//如果没有选择第二外语，那么只组合母语和第一外语
		if (secondforeignlanguage == 'none') {
			languagepair[0] = mothertongue + '<>' + firstforeignlanguage;
			languagepair[1] = firstforeignlanguage + '<>' + mothertongue;
		} else {
			languagepair[0] = mothertongue + '<>' + firstforeignlanguage;
			languagepair[1] = firstforeignlanguage + '<>' + mothertongue;
			languagepair[2] = mothertongue + '<>' + secondforeignlanguage;
			languagepair[3] = secondforeignlanguage + '<>' + mothertongue;
			languagepair[4] = firstforeignlanguage + '<>' + secondforeignlanguage;
			languagepair[5] = secondforeignlanguage + '<>' + firstforeignlanguage;
		}
		
		var count = languagepair.length;
		//在语言对复选框的容器层中添加内容
		for (var counter = 0; counter < count; counter++) {
			$('languagepairs').innerHTML = $('languagepairs').innerHTML + "<li><input name=\"scape[]\" type=\"checkbox\" class=\"normal-input\" value=\"" + languagepair[counter] + "\"/> " + languagepair[counter] + "</li>";
		}
		//显示语言对复选框的容器层
		$('languagepairbox').show();
	}
}

/**
 * @author WordCube
 * @param string element, 元素ID
 * @desc 切换元素的显示方式
 * @return void
 */
 function toggle(element) {
 	$(element).toggle();
 }

/**
 * @author WordCube
 * @param object currentform, 当前表单对象
 * @desc  提交表单请求
 * @return void
 */
 function submitRequest(currentform) {
 	currentform.submit();
 }

/**
  * @author WordCube
  * @param string url, 链接地址
  * @param int id, id
  * @desc 打开修改密码窗口
  * @return void
  */
  function showModifyWindow(url, id) {
  	var status;
  	$('errormodiinfo').innerHTML = '';
  	document.frmmodi.transid.value = '';
  	document.frmmodi.password.value = '';
  	document.frmmodi.repassword.value = ''; 
  	status = $('modifywindow').style.display;
  	if ((status == "none") || (status == '')) {
  		document.frmmodi.transid.value = id;
  		$('modifywindow').style.display = 'block';
  	} else {
  		$('modifywindow').style.display = 'none';
  	}
  }

/**
  * @author WordCube
  * @param string url, 链接地址
  * @desc 请求后台修改某一项的值
  * @return void
  */
  function modifyItemValue(url) {
  	var pars = Form.serialize('frmmodi');
  	var myAjax = new Ajax.Request(
  		url,
  		{
  			method: 'post',
  			parameters: pars,
  			onSuccess: function(transport) {
  				var result = transport.responseText;
  				if (result == 'success') {
  					$('modifywindow').hide();
  				} else {
  					$('errormodiinfo').innerHTML = result; 
  				}
  			}
  		});
  }

/**
  * @author WordCube
  * @desc 切换多个文件上传框的层容器的显示状态
  * @return void
  */
  function toggleMultiFileDiv() {
  	var status;
  	status = $('multifile').style.display;

  	if ((status.Trim() == 'none') || (status.Trim() == "")) {
  		$('multifile').style.display = 'block';
  	} else {
  		$('multifile').style.display = 'none';
  	}
  }

/**
 * @author WordCube
 * @param string filename
 * @param string element, 元素ID
 * @desc 取得译员个人工作安排日历
 * @return void
 */
 function getCalendar(filename, element) {
 	var url = filename;
 	var params = "transid=" + encodeURIComponent(getFilterValue("transid")) +
 	"&year=" + encodeURIComponent(getFilterValue("year")) +
 	"&month=" + encodeURIComponent(getFilterValue("month")) +
 	"&view=" + encodeURIComponent(getFilterValue("view")) +
 	"&source=" + encodeURIComponent(getFilterValue("source")) +
 	"&target=" + encodeURIComponent(getFilterValue("target")) +
 	"&type=" + encodeURIComponent(getFilterValue("type")) +
 	"&subtype=" + encodeURIComponent(getFilterValue("subtype")) +
 	"&field=" + encodeURIComponent(getFilterValue("field")) +
 	"&subfield=" + encodeURIComponent(getFilterValue("subfield")) +
 	"&st=" + encodeURIComponent(getFilterValue("servicetype")) +
 	"&s=" + encodeURIComponent(getFilterValue("sort")) +
 	"&searchtype=" + encodeURIComponent(getFilterValue("searchtype")) +
 	"&searchquery=" + encodeURIComponent(getFilterValue("searchquery"));
 	new Ajax.Updater( element, url, {
 		asynchronous: true,
 		method: "get",
 		parameters: params,
 		evalScripts: true,
 		onLoading: function(request) {},
 		onComplete: function(request) {}
 	});
 }

/**
 * @author WordCube
 * @param string key, 参数键名
 * @desc 取得日历相关的参数值
 * @return mixed
 */             
 function getCalendarParaValue(key) {
 	return calendar[key];
 }

/**
 * @author WordCube
 * @param string key, 参数键名
 * @param string key, 参数键值
 * @desc 设置日历相关的参数值
 * @return void
 */ 
 function setCalendarParaValue(key, value) {
 	calendar[key] = value;
 }

/**
 * @author WordCube
 * @param object event, 浏览器窗口事件对象
 * @param int year, 年
 * @param int month, 月
 * @param int date, 日
 * @param string period, 时段
 * @param string bgcolor, 上一点击层元素的初始背景颜色
 * @desc 打开添加工作量小窗口
 * @return void
 */
 function openAddWorkLoad(event, year, month, day, period) {
 	var element = event.srcElement ? event.srcElement : event.target;
  var elementname = $(element).id;  //取得点击的层名称
  //如果前面点击过其它的层元素，那么恢复前面点击的层元素的背景颜色
  prevelement = getCalendarParaValue('prevelement');
  if (prevelement == null) {
  	setCalendarParaValue('prevelement', element);
  } else {
  	$(prevelement).setStyle({
  		backgroundColor: $($(prevelement).id + 'bgcolor').value
  	});
  	
  	setCalendarParaValue('prevelement', element);
  }
  
	//改变当前点击的层元素的背景颜色
	$(element).setStyle({
		backgroundColor: '#DCDCDC'
	});
	
  //设置日历相关的参数值
  //setCalendarParaValue('workload', workload);
  //setCalendarParaValue('comment', comment);
  /*
  setCalendarParaValue('year', year);
  setCalendarParaValue('month', month);
  setCalendarParaValue('day', day);
  setCalendarParaValue('period', period);
  */
  $('year').value = year;
  $('month').value = month;
  $('day').value = day;
  $('period').value = period;
  $('errormessage').innerHTML = '';
  
  //初始化工作量安排小窗口各参数的值
  $('workload').value = $(elementname + 'workload').value;
  $('comment').value = $(elementname + 'comment').value;
  if ($(elementname + 'state') != null) { 	
  	var state = $(elementname + 'state').value;
  	//$('state').value = state;
  	if (state == 1) {
  		$('state').checked = true;
  	} else {
  		$('state').checked = false;
  	}
  }
  
	//定位工作量安排小窗口
	var scrollleft, scrolltop, pointerX, pointerY;
	scrollleft = GetScrollLeft();
	scrolltop = GetScrollTop();
	if (event.pageX) {
		pointerX = event.pageX + 4;
		pointerY = event.pageY;
	} else {
		pointerX = event.clientX + scrollleft;
		pointerY = event.clientY + scrolltop;
	}

	//$('information_show_box').style.left = pointerX + "px";
	//$('information_show_box').style.top = pointerY + "px";
	$('information_show_box').setStyle({
		left: pointerX + "px",
		top: pointerY + "px"
	});
	$('information_show_box').show();
	//$('information_show_box').update('');
	//$('information_show_box').innerHTML;
	//$('information_show_box').update(Msg);
	//$('information_show_box').innerHTML;
}

/**
 * @author WordCube
 * @desc 关闭添加工作量小窗口
 * @return void
 */
 function closeAddWorkLoad() {
 	var element = getCalendarParaValue('prevelement');
	//恢复上一点击层元素的背景颜色为浅灰色
	$(element).setStyle({
		backgroundColor: $($(element).id + 'bgcolor').value
	});
	
  setCalendarParaValue('prevelement', null);   //恢复上一点击层元素为空
  //setCalendarParaValue('bgcolor', null);   //恢复上一点击层元素背景颜色为空
  $('information_show_box').hide();
}

/**
 * @author WordCube
 * @desc 请求后台页面改变工作量并改变页面视图
 * @return void
 */
 function changeWorkLoad() {
 	var result, element, bgcolor;
 	var url = 'changeworkload.php';
 	var pars = Form.serialize('frmcalendar');
 	var myAjax = new Ajax.Request(
 		url,
 		{
 			method: 'post',
 			parameters: pars,
 			onComplete: function(transport) {
 				var result = transport.responseText.evalJSON(true);   
 				element = getCalendarParaValue('prevelement');
 				if (result.msg.empty()) {
 					element.innerHTML = result.periodstring + result.workload;
 					
                        var elementname = $(element).id;  //取得点击的层名称
                        //初始化工作量安排小窗口各参数的值
                        $(elementname + 'workload').value = result.workload;
                        $(elementname + 'comment').value = result.comment;
                        if ($(elementname + 'state') != null) {
                        	$(elementname + 'state').value = result.state;
                        	if (result.state == 0) {
                        		bgcolor = '#9AAABA';
                        	} else {
                        		bgcolor = '#d2e6d2';
                        	}
                        } else {
                        	bgcolor = '#9AAABA';
                        }
                        
                        //设置上一点击层元素的背景颜色为橙色
                        $(element).setStyle({
                          //backgroundColor: '#ff9900'
                          backgroundColor: bgcolor
                      });
                        
                        setCalendarParaValue('prevelement', null);   //恢复上一点击层元素为空
                        $(elementname + 'bgcolor').value = bgcolor;
                        if ($('state') != null) {
                          $('state').checked = false;  //恢复复选框的状态为不选中状态
                      }
                      $('information_show_box').hide();
                  } else {
                  	$('errormessage').innerHTML = result.msg;
                  }             			
              }
          });
 }

/**
 * @author WordCube
 * @param string sourceelement, 源语下拉列表元素ID
 * @param string targetelement, 目标语下拉列表元素ID
 * @desc 根据源语下拉列表的变化去改变目标语下拉列表
 * @return void
 */
 function _changeTargetLanguage(sourceelement, targetelement) {
 	var sourcelistlength;
 	var targetlistlength;
 	var tempstring;
 	sourcelistlength = $(sourceelement).length;
 	sourcelanguage = $F(sourceelement);
 	targetlanguage = $F(targetelement);
 	$(targetelement).length = 0;
 	$(targetelement).options[0] = new Option('- Select -', '');
 	var counting;
 	for (counting = 1; counting < sourcelistlength; counting++) {
 		tempstring = $(sourceelement).options[counting].value;
 		if (tempstring.toLowerCase() != sourcelanguage.toLowerCase()) {
 			$(targetelement).options[$(targetelement).length] = new Option(tempstring, tempstring);
 		}
 	}
 }

/**
  * @author WordCube
  * @desc 通过设置层的显示样式隐藏层
  * @return void
  */
  function closewindow(element) {
  	$(element).style.display = 'none';
  }

/**
 * @author WordCube
 * @desc 取得时间间隔执行器对象
 * @return object
 */
function getPeriodicalExecuter() {
  pe = new PeriodicalExecuter(getRemainTime, 60);   //每间隔60秒执行一次getRemainTime函数
}

/**
 * @author WordCube
 * @desc 取得剩余时间
 * @return object
 */
 function getRemainTime() {
 	var pars = '';
	$.ajax({
		type: 'get',
		url: '/app/src/domain/provider/test/remaintime.php',
		data: pars,
		dataType:'text',
		beforeSend: function(){
			//
		},
		success:function(data){
			checkHandle(data)
		},
		complete:function(){      
			//
		}
    });
 }

/**
 * @author WordCube
 * @param object originalRequest, 请求返回的对象
 * @desc 请求剩余时间的回调函数
 * @return void
 */
 function checkHandle(originalRequest) {
 	var result = originalRequest;
 	$("remaining").html("Test Duration: " + result + " minutes.");
 	if (result == 0) {
 		pe.stop();
 	}
 }

/***************************************************************
 *
 * 网站总后台用到的Javascript函数
 *
 ***************************************************************/
/**
 * @author WordCube
 * @desc 切换添加领域小窗口的显示状态，显示或隐藏
 * @return void
 */
 function showfielditem() {
 	var status;
 	status = $('fielditem').style.display;
 	if ( ( status == "none" ) || ( status == "" ) ){
 		document.frmadd.fieldname.value = "";
 		document.frmadd.contentone.value = "";
 		$('errorinfo').innerHTML = "";
 		$('fielditem').style.display = "block";
 	}else{
 		$('fielditem').style.display = "none";
 	}
 }

/**
 * @author WordCube
 * @desc 切换添加子领域小窗口的显示状态，显示或隐藏
 * @return void
 */
 function showsubfielditem(parentid) {
 	var status;
 	status = $('fieldsubitem').style.display;
 	if ((status == "none") || (status == "")){
 		document.frmsubadd.fieldname.value = "";
 		document.frmsubadd.content.value = "";
 		$('errorsubinfo').innerHTML = "";
 		$('fieldsubitem').style.display = "block";
 	} else {
 		$('fieldsubitem').style.display = "none";
 	}
 	document.frmsubadd.parentid.value = parentid;
 	$('parentname').innerHTML = $('item' + parentid).innerHTML;
 }

/**
 * @author WordCube
 * @desc 切换修改领域小窗口的显示状态，显示或隐藏
 * @return void
 */
 function showmodifyfielditem(url,id) {
 	var status;
 	status = $('modifyitem').style.display;
 	if ((status == "none") || (status == "")) {
 		document.frmmodi.fieldmodiname.value = $('item' + id).innerHTML;
 		document.frmmodi.contenttwo.value = $('introduction' + id).innerHTML;
 		document.frmmodi.id.value = id;
 		$('buttonok').innerHTML = "<input name=\"btnok\" type=\"button\" value=\"OK\" onclick=\"javascript:modifyfielditem('"+url+"');\" />";
 		$('modifyitem').style.display = "block";
 	} else {
 		$('modifyitem').style.display = "none";
 	}
 }

/**
 * @author WordCube
 * @desc 切换修改子领域小窗口的显示状态，显示或隐藏
 * @return void
 */
 function showmodifysubfielditem(url, id, parentid) {
 	var status;
 	status = $('modifysubitem').style.display;
 	if ((status == "none") || (status == "")) {
 		$('parentfieldname').innerHTML = $('item' + parentid).innerHTML
 		document.frmsubmodi.fieldname.value = $('subitem' + id).innerHTML;
 		document.frmsubmodi.content.value = $('subintroduction' + id).innerHTML;
 		document.frmsubmodi.id.value = id;
 		document.frmsubmodi.parentid.value = parentid;
 		$('buttonoks').innerHTML = "<input name=\"btnok\" type=\"button\" value=\"OK\" onclick=\"javascript:modifysubfielditem('"+url+"');\" />";
 		$('modifysubitem').style.display = "block";
 	} else {
 		$('modifysubitem').style.display = "none";
 	}
 }

/**
  * @author WordCube
  * @param string filename 
  * @desc 添加领域
  * @return void
  */
  function addnewfielditem(filename) {
  	var url = filename;
  	var pars = Form.serialize('frmadd');
  	var myAjax = new Ajax.Request(
  		url,
  		{
  			method: 'post',
  			parameters: pars,
  			onComplete: complete_addfield
  		});
  }

/**
  * @author WordCube
  * @param object originalRequest
  * @desc 添加领域回调函数
  * @return void
  */
  function complete_addfield(originalRequest){
  	var result = originalRequest.responseText;
  	resultArray = new Array();
  	resultArray = result.split("#");
  	if (resultArray[0] == "success") {
  		$('fielditem').style.display = "none";
  		new Insertion.After('rows',"<tr id=\"subrows"+resultArray[1]+"\"><td>" + resultArray[1] + "</td><td><div id=\"item" + resultArray[1] + "\">" + resultArray[2] + "</div></td><td style=\"word-break: break-all;\"><div id=\"introduction" + resultArray[1] + "\">" + resultArray[3] + "</div></td><td><div id=\"edititem\"><div class=\"textedit\"><a href=\"javascript:void(0);\" onclick=\"javascript:showsubfielditem(" + resultArray[1] + ",'"+ resultArray[2]+"');\">Add Subclass</a></div><div class=\"textedit\"><a href=\"javascript:void(0);\" onclick=\"javascript:showmodifyfielditem('modifyitem.php','" + resultArray[1] + "');\">Modify</a></div><div class=\"textedit\"><a href=\"###\" onClick=\"if(confirm('The operation is not restored, and have you decided to delete this field?'))location.href='delfield.php?fieldid=" + resultArray[1] + "';\">Delete</a></div></div></td></tr>");
  	} else {
  		$('errorinfo').innerHTML = result;
  	}
  }

/**
 * @author WordCube
 * @param string filename 
 * @desc 添加子领域
 * @return void
 */
 function addsubfielditem(filename){
 	var url = filename;
 	var pars = Form.serialize('frmsubadd');
 	var myAjax = new Ajax.Request(
 		url,
 		{
 			method: 'post',
 			parameters: pars,
 			onComplete: complete_sub_addfield
 		});
 }

/**
 * @author WordCube
 * @param object originalRequest 
 * @desc 添加子领域回调函数
 * @return void
 */
 function complete_sub_addfield(originalRequest){
 	var result = originalRequest.responseText;
 	resultArray = new Array();
 	resultArray = result.split("#");
 	if (resultArray[0] == "success") {
 		new Insertion.After('subrows'+resultArray[2],"<tr><td width=\"9%\">&nbsp;&nbsp;&nbsp;&nbsp;|----</td><td width=\"18%\"><div id=\"subitem" + resultArray[1] + "\">" + resultArray[3] + "</div></td><td width=\"59%\"  style=\"word-break: break-all;\"><div id=\"subintroduction" + resultArray[1] + "\">" + resultArray[4] + "</div></td><td width=\"14%\"><div class=\"textedit\"><a href=\"javascript:void(0);\" onclick=\"javascript:showmodifysubfielditem('modifysubitem.php','" + resultArray[1] + "','" + resultArray[2] + "');\">Modify</a></div><div class=\"textedit\"><a href=\"###\" onClick=\"if(confirm('The operation is not restored, and have you decided to delete this field?'))location.href='delsubfield.php?fieldid=" + resultArray[1] + "';\">Delete</a></div></td></tr>");
 		$('fieldsubitem').style.display = "none";
 	} else {
 		$('errorsubinfo').innerHTML = result;
 	}
 }

/**
 * @author WordCube
 * @param string filename 
 * @desc 修改领域
 * @return void
 */
 function modifyfielditem(filename){
 	var url = filename;
 	var pars = Form.serialize('frmmodi');
 	var myAjax = new Ajax.Request(
 		url,
 		{
 			method: 'post',
 			parameters: pars,
 			onComplete: complete_modifyfield
 		});
 }

/**
 * @author WordCube
 * @param string filename 
 * @desc 修改领域回调函数
 * @return void
 */
 function complete_modifyfield(originalRequest) {
 	var result = originalRequest.responseText;
 	resultArray = new Array();
 	resultArray = result.split("#");
 	if ( resultArray[0] == "Success" ){
 		$('item'+resultArray[1]).innerHTML = resultArray[2];
 		$('introduction'+resultArray[1]).innerHTML = resultArray[3];
 		$('modifyitem').style.display = "none";
 	}else{
 		$('errormodiinfo').innerHTML = resultArray[0];
 	}
 }

/**
 * @author WordCube
 * @param string filename 
 * @desc 修改子领域
 * @return void
 */
 function modifysubfielditem(filename) {
 	var url = filename;
 	var pars = Form.serialize('frmsubmodi');
 	var myAjax = new Ajax.Request(
 		url,
 		{
 			method: 'post',
 			parameters: pars,
 			onComplete: complete_sub_modifyfield
 		});
 }

/**
 * @author WordCube
 * @param object originalRequest
 * @desc 修改领域回调函数
 * @return void
 */
 function complete_sub_modifyfield(originalRequest) {
 	var result = originalRequest.responseText;
 	resultArray = new Array();
 	resultArray = result.split("#");
 	if ( resultArray[0] == "Success" ){
 		$('subitem'+resultArray[1]).innerHTML = resultArray[2];
 		$('subintroduction'+resultArray[1]).innerHTML = resultArray[3];
 		$('modifysubitem').style.display = "none";
 	}else{
 		$('errormodisubinfo').innerHTML = resultArray[0];
 	}
 }

/**
 * @author WordCube
 * @desc 切换添加语言小窗口的显示状态，显示或着隐藏
 * @return void
 */
 function showlangitem() {
 	var status;
 	status = $('fielditem').style.display;
 	if ((status == "none") || (status == "")) {
 		$('errorinfo').innerHTML = "";
 		document.frmadd.fieldname.value = "";
 		document.frmadd.shortname.value = "";
 		$('fielditem').style.display = "block";	
 	} else {
 		$('fielditem').style.display = "none";
 	}
 }

/**
 * @author WordCube
 * @param string url
 * @param int id
 * @desc 切换修改语言小窗口的显示状态，显示或着隐藏
 * @return void
 */
 function showmodifylangitem(url, id) {
 	var status;
 	status = $('modifyitem').style.display;
 	if ( ( status == "none" ) || ( status == "" ) ){
 		$('errormodiinfo').innerHTML = ""; 
 		document.frmmodi.fieldmodiname.value = $('item' + id).innerHTML;
 		document.frmmodi.shortmodiname.value = $('short' + id).innerHTML;
 		$('buttonok').innerHTML = "<input name=\"btnok\" type=\"button\" value=\"OK\" onclick=\"javascript:modifylangitem('"+url+"','fieldmodiname','shortmodiname',"+id+");\" />";
 		$('modifyitem').style.display = "block";
 	} else {
 		$('modifyitem').style.display = "none";
 	}
 }

/**
 * @author WordCube
 * @param string filename 
 * @desc 添加新语种
 * @return void
 */
 function addnewlangitem(filename){
 	var url = filename;
 	var pars = Form.serialize('frmadd');
 	var myAjax = new Ajax.Request(
 		url,
 		{
 			method: 'post',
 			parameters: pars,
 			onComplete: complete_addlang
 		});
 }

/**
 * @author WordCube
 * @param object originalRequest 
 * @desc 添加新语种回调函数
 * @return void
 */
 function complete_addlang(originalRequest){
 	var result = originalRequest.responseText;
 	resultArray = new Array();
 	resultArray = result.split("#");
 	if (resultArray[0] == "success") {
 		$('fielditem').style.display = "none";
 		new Insertion.After('rows',"<tr><td>" + resultArray[1] + "</td><td><div id=\"item" + resultArray[1] + "\">" + resultArray[2] + "</div></td><td><div id=\"short" + resultArray[1] + "\">" + resultArray[3] + "</div></td><td><div id=\"edititem\"><div class=\"textedit\"><a href=\"javascript:void(0);\" onclick=\"javascript:showmodifylangitem('modifylanguage.php','" + resultArray[1] + "');\">Modify</a></div> <div class=\"textedit\"><a href=\"###\" onClick=\"if(confirm('The operation is not restored, and have you decided to delete this language?'))location.href='dellanguage.php?languageid=" + resultArray[1] + "';\">Delete</a></div></div></td></tr>");
 	} else {
 		$('errorinfo').innerHTML = result;
 	}
 }

/**
 * @author WordCube
 * @param string filename
 * @param string elementone, 第一个元素名称
 * @param string elementtwo， 第二个元素名称
 * @param int id 
 * @desc 修改语种
 * @return void
 */
 function modifylangitem(filename, elementone, elementtwo, id){
 	var url = filename;
 	var itemvalue = $F(elementone);
 	var shortname = $F(elementtwo);
 	var pars = 'id=' + id + '&itemname=' + itemvalue + '&shortname=' + shortname ;
 	var myAjax = new Ajax.Request(
 		url,
 		{
 			method: 'get',
 			parameters: pars,
 			onComplete: complete_modifylang
 		});
 }

/**
 * @author WordCube
 * @param object originalRequest 
 * @desc 修改语种回调函数
 * @return void
 */
 function complete_modifylang(originalRequest){
 	var result = originalRequest.responseText;
 	resultArray = new Array();
 	resultArray = result.split("#");
 	if (resultArray[0] == "Success") {
 		$('item'+resultArray[1]).innerHTML = resultArray[2];
 		$('short'+resultArray[1]).innerHTML = resultArray[3];
 		$('modifyitem').style.display = "none";
 	} else {
 		$('errormodiinfo').innerHTML = resultArray[0];
 	}
 }

/**
 * @author WordCube
 * @desc 切换添加新语沿对价格小窗口显示状态，显示或隐藏
 * @return void
 */
 function showpriceitem(){
 	var status;
 	status = $('fielditem').style.display;
 	if ((status == "none") || (status == "")) {
 		$('errorinfo').innerHTML = "";
 		document.frmadd.sltsource.options[0].selected = true;
 		document.frmadd.slttarget.options[0].selected = true;
 		document.frmadd.txtprice.value="0.00";
 		$('fielditem').style.display = "block";	
 	} else {
 		$('fielditem').style.display = "none";
 	}
 }

/**
 * @author WordCube
 * @param string url 
 * @param int id
 * @param string source
 * @param string target  
 * @desc 切换修改语言对价格小窗口的显示状态，显示或者隐藏
 * @return void
 */
 function showmodifypriceitem(url, id, source, target) {
 	$('m_c_w').toggle();
 	document.frmmodi.id.value = id;
 	$('errormodiinfo').innerHTML = "";
 	$('sourcelanguage').innerHTML = source;
 	$('targetlanguage').innerHTML = target;
 	document.frmmodi.txtprice.value = $('item' + id).innerHTML;
 	$('buttonok').innerHTML = "<input name=\"btnok\" type=\"button\" value=\"OK\" onclick=\"javascript:modifypriceitem('"+url+"');\" />";
 }

/**
 * @author WordCube
 * @param string filename
 * @desc 添加新的语言对翻译价格
 * @return void
 */
 function addnewpriceitem(filename){
 	var url = filename;
 	var pars = Form.serialize('frmadd');
 	var myAjax = new Ajax.Request(
 		url,
 		{
 			method: 'post',
 			parameters: pars,
 			onComplete: complete_addprice
 		});
 }

/**
 * @author WordCube
 * @param object originalRequest
 * @desc 添加新的语言对翻译价格的回调函数
 * @return void
 */
 function complete_addprice(originalRequest){
 	var result = originalRequest.responseText;
 	resultArray = new Array();
 	resultArray = result.split("#");
 	if (resultArray[0] == "success") {
 		$('fielditem').style.display = "none";
 		new Insertion.After('rows',"<tr><td>" + resultArray[2] + "</td><td>" + resultArray[3] + "</td><td><div id=\"item" + resultArray[1] + "\">" + resultArray[4] + "</div></td><td><div id=\"edititem\"><div class=\"textedit\"><a href=\"javascript:void(0);\" onclick=\"javascript:showmodifypriceitem('modilangprice.php','" + resultArray[1] + "','" + resultArray[2] + "','" + resultArray[3] + "');\">Modify</a></div> <div class=\"textedit\"><a href=\"###\" onClick=\"if(confirm('The operation is not restored, and have you decided to delete this language?'))location.href='dellangprice.php?id=" + resultArray[1] + "';\">Delete</a></div></div></td></tr>");
 	} else {
 		$('errorinfo').innerHTML = result;
 	}
 }

/**
 * @author WordCube
 * @param string filename
 * @desc 修改语言对翻译价格
 * @return void
 */
 function modifypriceitem(filename){
 	var url = filename;
 	var pars = Form.serialize('frmmodi');
 	var myAjax = new Ajax.Request(
 		url,
 		{
 			method: 'post',
 			parameters: pars,
 			onComplete: complete_modifyprice
 		});
 }

/**
 * @author WordCube
 * @param object originalRequest
 * @desc 修改语言对翻译价格的回调函数
 * @return void
 */
 function complete_modifyprice(originalRequest){
 	var result = originalRequest.responseText;
 	resultArray = new Array();
 	resultArray = result.split("#");
 	if (resultArray[0] == "Success") {
 		$('item'+resultArray[1]).innerHTML = resultArray[2];
 		$('m_c_w').hide();
 	} else {
 		$('errormodiinfo').innerHTML = resultArray[0];
 	}
 }

/**
 * @author WordCube
 * @param string eid， 元素ID
 * @desc 切换指定元素的显示状态
 * @return void
 */
 function s_a_w(eid) {
 	$(eid).toggle();
 	document.frmadd.languagescape.selectedIndex = 0;
 	document.frmadd.field.selectedIndex = 0;
 	document.frmadd.type.selectedIndex = 0;
 	document.frmadd.content.value = "";
 }

/**
 * @author WordCube
 * @param string filename
 * @desc 切换修改测试考题小窗口的显示状态并为各选项设置默认值
 * @return void
 */
 function s_m_w(url, id) {
 	$('m_c_w').toggle();
 	var s;
 	var l_s = $( 'scape' + id ).innerHTML;
 	var f = $( 'field' + id ).innerHTML;
 	var t = $( 'type' + id ).innerHTML;
 	f = f.replace(/&amp;/g,"&");
 	for (var i = 0; i < document.frmmodi.languagepair.length; i++) {
 		if (document.frmmodi.languagepair.options[i].value == l_s) {
 			document.frmmodi.languagepair.selectedIndex = i;
 		}
 	}
 	
 	for (var i = 0; i < document.frmmodi.field.length; i++) {
 		s = document.frmmodi.field.options[i].text;
 		if ((s.Trim() == f.Trim()) || (s.Trim() == ("|--" + f).Trim())) {
 			document.frmmodi.field.selectedIndex = i;
 		}
 	}
 	
 	for (var i = 0; i < document.frmmodi.type.length; i++) {
 		s = document.frmmodi.type.options[i].text;
 		if ((s.Trim() == t.Trim()) || (s.Trim() == ("|--" + t).Trim())) {
 			document.frmmodi.type.selectedIndex = i;
 		}
 	}
 	document.frmmodi.content.value = $('item' + id).innerHTML;
 	document.frmmodi.id.value = id;
 	$('buttonok').innerHTML = "<input name=\"btnok\" type=\"button\" value=\"OK\" onclick=\"javascript:m_c('"+url+"');\" />";
 }

/**
 * @author WordCube
 * @param string filename
 * @desc 添加新的语言对测试考题
 * @return void
 */
 function a_c(filename){
 	var url = filename;
 	var pars = Form.serialize('frmadd');
 	var myAjax = new Ajax.Request(
 		url,
 		{
 			method: 'post',
 			parameters: pars,
 			onComplete: c_add
 		});
 }

/**
 * @author WordCube
 * @param object or
 * @desc 添加新的语言对测试考题的回调函数
 * @return void
 */
 function c_add(or) {
 	var str = or.responseText;
 	strArray = new Array();
 	strArray = str.split("#");
 	if (strArray[0].toLowerCase() == "success") {
 		$('a_c_w').hide();
 		new Insertion.After('rows',"<tr><td>" + strArray[1] + "</td><td><div id=\"scape" + strArray[1] + "\">" + strArray[2] + "</div></td><td><div id=\"field" + strArray[1] + "\">" + strArray[3] + "</div></td><td><div id=\"type" + strArray[1] + "\">" + strArray[4] + "</div></td><td><div id=\"item" + strArray[1] + "\">" + strArray[5] + "</div></td><td><div id=\"edititem\"><div class=\"textedit\"><a href=\"javascript:void(0);\" onclick=\"javascript:s_m_w('modifyquestion.php','" + strArray[1] + "');\">Modify</a></div><div class=\"textedit\"><a href=\"###\" onClick=\"if(confirm('The operation is not restored, and have you decided to delete this question?'))location.href='delquestion.php?questionid=" + strArray[1] + "';\">Delete</a></div></div></td></tr>");
 	} else {
 		$('errorinfo').innerHTML = str;
 	}
 }

/**
 * @author WordCube
 * @param string filename
 * @desc 修改语言对测试考题
 * @return void
 */
 function m_c(filename){
 	var url = filename;
 	var pars = Form.serialize('frmmodi');
 	var myAjax = new Ajax.Request(
 		url,
 		{
 			method: 'post',
 			parameters: pars,
 			onComplete: c_modify
 		});
 }

/**
 * @author WordCube
 * @param object or
 * @desc 修改语言对测试考题的回调函数
 * @return void
 */
 function c_modify(or){
 	var str = or.responseText;
 	var strArray = new Array();
 	strArray = str.split("#");

 	if (strArray[0].toLowerCase() == "success") {
 		$( 'scape' + strArray[1] ).innerHTML = strArray[2];
 		$( 'field' + strArray[1] ).innerHTML = strArray[3];
 		$( 'type' + strArray[1] ).innerHTML = strArray[4];
 		$( 'item' + strArray[1] ).innerHTML = strArray[5];
 		$('m_c_w').hide();
 	} else {
 		$('errormodiinfo').innerHTML = strArray[0];
 	}
 }

/**
 * @author WordCube
 * @desc 切换添加类型小窗口的显示状态，显示或者隐藏
 * @return void
 */
 function showtypeitem(){
 	var status;
 	status = $('fielditem').style.display;
 	if ((status == "none") || (status == "")) {
 		document.frmadd.typename.value = "";
 		document.frmadd.content.value = "";
 		$('errorinfo').innerHTML = "";
 		$('fielditem').style.display = "block";
 	} else {
 		$('fielditem').style.display = "none";
 	}
 }

/**
 * @author WordCube
 * @param string parentid, 上一级元素ID
 * @desc 切换添加子类型小窗口的显示状态，显示或者隐藏
 * @return void
 */
 function showsubtypeitem(parentid) {
 	var status;
 	status = $('fieldsubitem').style.display;
 	if ((status == "none") || (status == "")) {
 		document.frmsubadd.typename.value = "";
 		document.frmsubadd.content.value = "";
 		$('errorsubinfo').innerHTML = "";
 		document.frmsubadd.parentid.value = parentid;
 		$('parentname').innerHTML = $('item' + parentid).innerHTML;
 		$('fieldsubitem').style.display = "block";
 	} else {
 		$('fieldsubitem').style.display = "none";
 	}
 }

/**
 * @author WordCube
 * @param string url
 * @param string id, 元素ID
 * @desc 切换修改类型小窗口的显示状态，显示或者隐藏
 * @return void
 */
 function showmodifytypeitem(url, id) {
 	var status;
 	status = $('modifyitem').style.display;
 	if ((status == "none") || (status == "")) {
 		document.frmmodi.typename.value = $('item' + id).innerHTML;
 		document.frmmodi.content.value = $('introduction' + id).innerHTML;
 		document.frmmodi.id.value = id;
 		$('buttonok').innerHTML = "<input name=\"btnok\" type=\"button\" value=\"OK\" onclick=\"javascript:modifytypeitem('"+url+"');\" />";
 		$('modifyitem').style.display = "block";
 	} else {
 		$('modifyitem').style.display = "none";
 	}
 }

/**
 * @author WordCube
 * @param string url
 * @param string id, 元素ID
 * @param string parentid, 父元素ID
 * @desc 切换修改子类型小窗口的显示状态，显示或者隐藏
 * @return void
 */
 function showmodifysubtypeitem(url, id, parentid) {
 	var status;
 	status = $('modifysubitem').style.display;
 	if ((status == "none") || (status == "")) {
 		$('parenttypename').innerHTML = $('item' + parentid).innerHTML
 		document.frmsubmodi.typename.value = $('subitem' + id).innerHTML;
 		document.frmsubmodi.content.value = $('subintroduction' + id).innerHTML;
 		document.frmsubmodi.id.value = id;
 		document.frmsubmodi.parentid.value = parentid;
 		$('buttonoks').innerHTML = "<input name=\"btnok\" type=\"button\" value=\"OK\" onclick=\"javascript:modifysubtypeitem('"+url+"');\" />";
 		$('modifysubitem').style.display = "block";
 	} else {
 		$('modifysubitem').style.display = "none";
 	}
 }

/**
 * @author WordCube
 * @param string filename
 * @desc 添加新类型
 * @return void
 */
 function addnewtypeitem(filename){
 	var url = filename;
 	var pars = Form.serialize('frmadd');
 	var myAjax = new Ajax.Request(
 		url,
 		{
 			method: 'post',
 			parameters: pars,
 			onComplete: complete_addtype
 		});
 }

/**
 * @author WordCube
 * @param object originalRequest
 * @desc 添加新类型回调函数
 * @return void
 */
 function complete_addtype(originalRequest){
 	var result = originalRequest.responseText;
 	resultArray = new Array();
 	resultArray = result.split("#");
 	if (resultArray[0] == "success") {
 		$('fielditem').style.display = "none";
 		new Insertion.After('rows',"<tr id=\"subrows"+resultArray[1]+"\"><td>" + resultArray[1] + "</td><td><div id=\"item" + resultArray[1] + "\">" + resultArray[2] + "</div></td><td style=\"word-break: break-all;\"><div id=\"introduction" + resultArray[1] + "\">" + resultArray[3] + "</div></td><td><div id=\"edititem\"><div class=\"textedit\"><a href=\"javascript:void(0);\" onclick=\"javascript:showsubtypeitem("+resultArray[1]+");\">Add Sub Type</a></div><div class=\"textedit\"><a href=\"javascript:void(0);\" onclick=\"javascript:showmodifytypeitem('modifytype.php','" + resultArray[1] + "');\">Modify</a></div><div class=\"textedit\"><a href=\"###\" onclick=\"if(confirm('The operation is not restored, and have you decided to delete this type?'))location.href='deltype.php?typeid=" +resultArray[1] + "';\">Delete</a></div></div></td></tr>");
 	} else {
 		$('errorinfo').innerHTML = result;
 	}
 }

/**
 * @author WordCube
 * @param string filename
 * @desc 添加新的子类型
 * @return void
 */
 function addsubtypeitem(filename) {
 	var url = filename;
 	var pars = Form.serialize('frmsubadd');
 	var myAjax = new Ajax.Request(
 		url,
 		{
 			method: 'post',
 			parameters: pars,
 			onComplete: complete_sub_addtype
 		});
 }

/**
 * @author WordCube
 * @param object originalRequest
 * @desc 添加新的子类型的回调函数
 * @return void
 */
 function complete_sub_addtype(originalRequest) {
 	var result = originalRequest.responseText;
 	resultArray = new Array();
 	resultArray = result.split("#");
 	if (resultArray[0] == "success") {
 		new Insertion.After('subrows'+resultArray[2],"<tr><td width=\"9%\">&nbsp;&nbsp;&nbsp;&nbsp;|----</td><td width=\"18%\"><div id=\"subitem" + resultArray[1] + "\">" + resultArray[3] + "</div></td><td width=\"59%\"  style=\"word-break: break-all;\"><div id=\"subintroduction" + resultArray[1] + "\">" + resultArray[4] + "</div></td><td width=\"14%\"><div class=\"textedit\"><a href=\"javascript:void(0);\" onclick=\"javascript:showmodifysubtypeitem('modifysubtype.php','" + resultArray[1] + "','" + resultArray[2] + "');\">Modify</a></div><div class=\"textedit\"><a href=\"###\" onClick=\"if(confirm('The operation is not restored, and have you decided to delete this field?'))location.href='delsubtype.php?typeid=" + resultArray[1] + "';\">Delete</a></div></td></tr>");
 		$('fieldsubitem').style.display = "none";
 	} else {
 		$('errorsubinfo').innerHTML = result;
 	}
 }

/**
 * @author WordCube
 * @param string filename
 * @desc 修改类型
 * @return void
 */
 function modifytypeitem(filename) {
 	var url = filename;
 	var pars = Form.serialize('frmmodi');
 	var myAjax = new Ajax.Request(
 		url,
 		{
 			method: 'post',
 			parameters: pars,
 			onComplete: complete_modifytype
 		});
 }

/**
 * @author WordCube
 * @param object originalRequest
 * @desc 修改类型回调函数
 * @return void
 */
 function complete_modifytype(originalRequest) {
 	var result = originalRequest.responseText;
 	resultArray = new Array();
 	resultArray = result.split("#");
 	if ( resultArray[0] == "Success" ){
 		$('item'+resultArray[1]).innerHTML = resultArray[2];
 		$('introduction'+resultArray[1]).innerHTML = resultArray[3];    
 		$('modifyitem').style.display = "none";  
 	}else{
 		$('errormodiinfo').innerHTML = resultArray[0]; 
 	}
 }

/**
 * @author WordCube
 * @param string filename
 * @desc 修改子类型
 * @return void
 */
 function modifysubtypeitem(filename){
 	var url = filename;
 	var pars = Form.serialize('frmsubmodi');
 	var myAjax = new Ajax.Request(
 		url,
 		{
 			method: 'post',
 			parameters: pars,
 			onComplete: complete_sub_modifytype
 		});
 }

/**
 * @author WordCube
 * @param object originalRequest
 * @desc 修改类型的回调函数
 * @return void
 */
 function complete_sub_modifytype(originalRequest) {
 	var result = originalRequest.responseText;
 	resultArray = new Array();
 	resultArray = result.split("#");
 	if ( resultArray[0] == "Success" ){
 		$('subitem'+resultArray[1]).innerHTML = resultArray[2]; 
 		$('subintroduction'+resultArray[1]).innerHTML = resultArray[3];   
 		$('modifysubitem').style.display = "none";  
 	}else{
 		$('errormodisubinfo').innerHTML = resultArray[0]; 
 	}
 }
/***************************************************************
 *
 * 结束网站总后台用到的Javascript函数
 *
 ***************************************************************/

/***************************************************************
 *
 * 开始项目经理后台用到的Javascript函数
 *
 ***************************************************************/
/**
 * @author WordCube
 * @desc 改变测试列表内容
 * @return void
 */
 function changeTestingLists() {
 	var url = getTranslatorParameter('url');
 	var params = "sl=" + encodeURIComponent(getTranslatorParameter('sourcelanguage')) +
 	"&tl=" + encodeURIComponent(getTranslatorParameter('targetlanguage')) +
 	"&round=" + encodeURIComponent(getTranslatorParameter('round')) +
 	"&role=" + encodeURIComponent(getTranslatorParameter('role')) +
 	"&mt=" + encodeURIComponent(getTranslatorParameter('mothertongue')) +
 	"&s=" + encodeURIComponent(getTranslatorParameter('sort')) +
 	"&timing=" + encodeURIComponent(getTranslatorParameter('timing')) +
 	"&state=" + encodeURIComponent(getTranslatorParameter('state')) +
 	"&statescore=" + encodeURIComponent(getTranslatorParameter('statescore')) +
 	"&keyword=" + encodeURIComponent(getTranslatorParameter('keyword')) +
 	"&rowcount=" + encodeURIComponent(getTranslatorParameter('rowcount')) +
 	"&rowstart=" + encodeURIComponent(getTranslatorParameter('rowstart')) +
 	"&rowshow=" + encodeURIComponent(getTranslatorParameter('rowshow')) +
 	"&action=" + encodeURIComponent(getTranslatorParameter('action')) +
 	"&transid=" + encodeURIComponent(getTranslatorParameter('transid'));
	//alert(getTranslatorParameter('role'));
	new Ajax.Updater('show_testing_lists', url, {
		asynchronous: true,
		method: "get",
		parameters: params,
		evalScripts: true,
		onLoading: function(request) {},
		onComplete: function(request) {}
	});
}

/**
 * @author WordCube
 * @param object sourceelement， 源语下拉列表
 * @param object targetelement， 目标语下拉列表
 * @desc 设置源语的值并改变目标语下拉列表的菜单
 * @return void
 */
 function setSourceLanguageOfResult(sourceelement, targetelement) {
 	var sourcelanguage;
 	var targetlanguage;
 	var sourcelistlength;
 	var targetlistlength;
 	var tempstring;
 	var counter;
 	
 	sourcelistlength = $(sourceelement).length;
 	sourcelanguage = $F(sourceelement);
 	targetlanguage = $F(targetelement);
 	$(targetelement).length = 0;
 	$(targetelement).options[0] = new Option('- Select -', 'none');

 	for (counter = 0; counter < sourcelistlength; counter++) {
 		tempstring = $(sourceelement).options[counter].value;
 		if (tempstring.toLowerCase() != sourcelanguage.toLowerCase()) {
 			$(targetelement).options[$(targetelement).length] = new Option(tempstring, tempstring);
 		}
 	}

 	targetlistlength = $(targetelement).length;
 	for (counter = 0; counter < targetlistlength; counter++) {
 		tempstring = $(targetelement).options[counter].value;
 		if (tempstring.toLowerCase() == targetlanguage.toLowerCase()) {
 			$(targetelement).options[counter].selected = true;
 		}
 	}

	// setTranslatorParameter('keyword', '');   //设置关键词的值为空
	// setTranslatorParameter('sourcelanguage', sourcelanguage);  //设置源语的值
	// setTranslatorParameter('targetlanguage', $F(targetelement));  //设置目标语的值
}

/**
 * @author WordCube
 * @param object sourceelement， 源语下拉列表
 * @param object targetelement， 目标语下拉列表
 * @desc 设置源语的值并改变目标语下拉列表的菜单
 * @return void
 */
 function setSourceLanguage(sourceelement, targetelement) {
 	var sourcelanguage;
 	var targetlanguage;
 	var sourcelistlength;
 	var targetlistlength;
 	var tempstring;
 	var counting;
 	
 	sourcelistlength = $(sourceelement).length;
 	sourcelanguage = $F(sourceelement);
 	targetlanguage = $F(targetelement);
 	$(targetelement).length = 0;
 	$(targetelement).options[0] = new Option('- Select -', 'target');

 	for (counting = 1; counting < sourcelistlength; counting++) {
 		tempstring = $(sourceelement).options[counting].value;
 		if (tempstring.toLowerCase() != sourcelanguage.toLowerCase()) {
 			$(targetelement).options[$(targetelement).length] = new Option(tempstring, tempstring);
 		}
 	}

 	targetlistlength = $(targetelement).length;
 	for (counting = 0; counting < targetlistlength; counting++) {
 		tempstring = $(targetelement).options[counting].value;
 		if (tempstring.toLowerCase() == targetlanguage.toLowerCase()) {
 			$(targetelement).options[counting].selected = true;
 		}
 	}

	// setTranslatorParameter('keyword', '');   //设置关键词的值为空
	// setTranslatorParameter('sourcelanguage', sourcelanguage);  //设置源语的值
	// setTranslatorParameter('targetlanguage', $F(targetelement));  //设置目标语的值
	//_toggleDisabled();  //切换Total Score列表框和Sort列表框隐藏项的可视的状态
	//changeTestingLists();
}

function setSourceLanguagecn(sourceelement, targetelement) {
	var sourcelanguage;
	var targetlanguage;
	var sourcelistlength;
	var targetlistlength;
	var tempstring;
	var counting;
	
	sourcelistlength = $(sourceelement).length;
	sourcelanguage = $F(sourceelement);
	targetlanguage = $F(targetelement);
	$(targetelement).length = 0;
	$(targetelement).options[0] = new Option('- 选择 -', 'target');

	for (counting = 1; counting < sourcelistlength; counting++) {
		tempstring = $(sourceelement).options[counting].value;
		if (tempstring.toLowerCase() != sourcelanguage.toLowerCase()) {
			$(targetelement).options[$(targetelement).length] = new Option(tempstring, tempstring);
		}
	}

	targetlistlength = $(targetelement).length;
	for (counting = 0; counting < targetlistlength; counting++) {
		tempstring = $(targetelement).options[counting].value;
		if (tempstring.toLowerCase() == targetlanguage.toLowerCase()) {
			$(targetelement).options[counting].selected = true;
		}
	}

	setTranslatorParameter('keyword', '');   //设置关键词的值为空
	setTranslatorParameter('sourcelanguage', sourcelanguage);  //设置源语的值
	setTranslatorParameter('targetlanguage', $F(targetelement));  //设置目标语的值
	//_toggleDisabled();  //切换Total Score列表框和Sort列表框隐藏项的可视的状态
	//changeTestingLists();
}



/**
 * @author WordCube
 * @param object element， 目标语下拉列表
 * @desc 设置目标语的值
 * @return void
 */
 function setTargetLanguage(element) {
	setTranslatorParameter('keyword', '');   //设置关键词的值为空
	setTranslatorParameter('targetlanguage', $F(element));  //设置目标语的值
	//_toggleDisabled();  //切换Total Score列表框和Sort列表框隐藏项的可视的状态
	//changeTestingLists();	
}

function setSourceTranslatorLanguage(sourceelement, targetelement) {
	var sourcelanguage;
	var targetlanguage;
	var sourcelistlength;
	var targetlistlength;
	var tempstring;
	var counting;
	
	sourcelistlength = $(sourceelement).length;
	sourcelanguage = $F(sourceelement);
	targetlanguage = $F(targetelement);
	$(targetelement).length = 0;
	$(targetelement).options[0] = new Option('- Select -', 'all');


	for (counting = 1; counting < sourcelistlength; counting++) {
		tempstring = $(sourceelement).options[counting].value;
		if (tempstring.toLowerCase() != sourcelanguage.toLowerCase()) {
			$(targetelement).options[$(targetelement).length] = new Option(tempstring, tempstring);
		}
	}

	targetlistlength = $(targetelement).length;
	for (counting = 0; counting < targetlistlength; counting++) {
		tempstring = $(targetelement).options[counting].value;
		if (tempstring.toLowerCase() == targetlanguage.toLowerCase()) {
			$(targetelement).options[counting].selected = true;
		}
	}

	setFilterValue('source', sourcelanguage); //设置源语的值
	setFilterValue('target', $F(targetelement)); //设置源语的值
}

function setTargetTranslatorLanguage(element) {
	setFilterValue('target', $F(element)); //设置源语的值空
}

/**
 * @author WordCube
 * @desc 切换列表框的可用状态
 * @return void
 */
 function _toggleDisabled() {
 	var counter;
 	var arr = new Array();
 	var sourcelanguage = getTranslatorParameter('sourcelanguage');
 	var targetlanguage = getTranslatorParameter('targetlanguage');
 	var sort = getTranslatorParameter('sort');
 	var round = getTranslatorParameter('round');
 	var role = getTranslatorParameter('role');
 	if ( ( sourcelanguage.toLowerCase() != 'none' ) && ( sourcelanguage.toLowerCase() != 'all' ) && ( targetlanguage.toLowerCase() != 'none' ) && ( targetlanguage.toLowerCase() != 'all' ) && ( round.toLowerCase() != 'none' ) && ( round.toLowerCase() != 'all' ) )
 	{
 		Element.show('total_score_list');  /*显示Total Score下拉列表*/
 		/*组织排序类型数组*/
 		arr[0] = new Array("Add Time","at");
 		arr[1] = new Array("Full Name","n");
 		arr[2] = new Array("City of Residence","c");
 		arr[3] = new Array("Test Time","t");
 		arr[4] = new Array("Score-Language","sl");
 		arr[5] = new Array("Score-Accuracy","sac");
 		arr[6] = new Array("Score-Attitude","sat");
 		arr[7] = new Array("Total Score","s");
 	} else {
 		Element.hide('total_score_list');  /*隐藏Total Score下拉列表*/
 		/*组织排序类型数组*/
 		arr[0] = new Array("Add Time", "at");
 		arr[1] = new Array("Full Name", "n");
 		arr[2] = new Array("City of Residence", "c");
 		/*如果排序值是除时间、全称、居住地以外的其它值,那么恢复到初始值*/
 		if ( ( sort.toLowerCase()!="at" ) && ( sort.toLowerCase()!="n" ) && ( sort.toLowerCase()!="c" ) ){
 			setTranslatorParameter('sort', 'at');
 		}
 		/*使Total Score下拉列表恢复到初始值的状态*/
		//scorestatus = '';
		setTranslatorParameter('statescore', 'none');
		$('sc').options[0].selected = true;
	}

	$('s').length = 0; /*清除排序列表的内容*/
	for ( counter = 0; counter < arr.length; counter++ )  /*重新部署排序列表的内容*/
	{
		$('s').options[counter] = new Option(arr[counter][0], arr[counter][1]);
		if ( sort == arr[counter][1] ){
			$('s').options[counter].selected = true;
		}
	}
	
	if (role == 1) {
		Element.show('status_list');   //显示status下拉列表
	} else {
		Element.hide('status_list');   //隐藏status下拉列表
	}
}

/**
 * @author WordCube
 * @param int a
 * @desc 分页导航
 * @return void
 */
 function _togglePage(a) {
 	var rowcount = getTranslatorParameter('rowcount');
 	var rowstart = getTranslatorParameter('rowstart');
 	var rowshow = getTranslatorParameter('rowshow');

 	if (a != 0) {
		//alert(rowcount + "  " +rowstart + "  " + rowshow + "  " + a);
		var b = rowstart + rowshow*a;
		if (b < 0) {
			if (rowcount%rowshow == 0) {
				b = rowcount - rowshow;
			} else {
				b = rowcount - rowcount%rowshow + 1;
			}
		} else if ( b > rowcount) {
			b = 0;
		}
		
		if (b == 0) {
			//rowstart = 1;
			setTranslatorParameter('rowstart', 1);
		} else {
			//rowstart = b;
			setTranslatorParameter('rowstart', b);
		}
	}
}

/**
 * @author WordCube
 * @desc 导航到首页
 * @return void
 */
 function _toggleHomePage() {
	//rowstart = 1;
	setTranslatorParameter('rowstart', 1);
}

/**
 * @author WordCube
 * @desc 导航到尾页
 * @return void
 */
 function _toggleEndPage() {
 	var rowcount = getTranslatorParameter('rowcount');
 	var rowstart = getTranslatorParameter('rowstart');
 	var rowshow = getTranslatorParameter('rowshow');
 	var b;
 	if( rowcount%rowshow == 0 ){
 		b = rowcount - rowshow;
 	}else{
 		b = rowcount - rowcount%rowshow + 1;
 	}
 	if ( b == 0 )
 	{
		//rowstart = 1;
		setTranslatorParameter('rowstart', 1);
	}
	else
	{
		//rowstart = b;
		setTranslatorParameter('rowstart', b+1);
	}
}

/**
 * @author WordCube
 * @param string key， 键名
 * @param string value， 键值
 * @desc 设置译员参数的值
 * @return void
 */
 function setTranslatorParameter(key, value) {
 	parameters[key] = value;
 }

/**
 * @author WordCube
 * @param string key， 键名
 * @desc 取得译员参数的值
 * @return mixed
 */
 function getTranslatorParameter(key) {
 	return parameters[key];
 }

/**
 * @author WordCube
 * @param object currentform, 当前表单对象的引用
 * @param object loading, 层对象
 * @desc 保存对译员测试信息状态编辑的数据
 * @return void
 */
 function saveData(currentform, loading) {
 	var action;
 	setTranslatorParameter('action', 'save');
 	var url = getTranslatorParameter('url');
 	if (url == 'changeresultlist.php') {
 		action = 'edit';
 	} else {
 		action = 'view';
 	}

 	url = url + "?sl=" + encodeURIComponent(getTranslatorParameter('sourcelanguage')) +
 	"&tl=" + encodeURIComponent(getTranslatorParameter('targetlanguage')) +
 	"&round=" + encodeURIComponent(getTranslatorParameter('round')) +
 	"&role=" + encodeURIComponent(getTranslatorParameter('role')) +
 	"&mt=" + encodeURIComponent(getTranslatorParameter('mothertongue')) +
 	"&s=" + encodeURIComponent(getTranslatorParameter('sort')) +
 	"&timing=" + encodeURIComponent(getTranslatorParameter('timing')) +
 	"&state=" + encodeURIComponent(getTranslatorParameter('state')) +
 	"&statescore=" + encodeURIComponent(getTranslatorParameter('statescore')) +
 	"&keyword=" + encodeURIComponent(getTranslatorParameter('keyword')) +
 	"&rowcount=" + encodeURIComponent(getTranslatorParameter('rowcount')) +
 	"&rowstart=" + encodeURIComponent(getTranslatorParameter('rowstart')) +
 	"&rowshow=" + encodeURIComponent(getTranslatorParameter('rowshow')) +
 	"&action=" + encodeURIComponent(getTranslatorParameter('action')) +
 	"&transid=" + encodeURIComponent(getTranslatorParameter('transid'));
 	var params = Form.serialize(currentform);
 	new Ajax.Request(url, {
 		asynchronous: true,
 		method: "post",
 		parameters: params,
 		onLoading: function(request) {
 			$('top_error_message').update();
 			$('top_error_message').innerHTML;
 			$('bottom_error_message').update();
 			$('bottom_error_message').innerHTML;
 			$(loading).style.top = '0px';
 			$(loading).style.right = '0px';
 			Element.show(loading);
 		},
 		onComplete: function(request) {
 			Element.hide(loading);
 			result = request.responseText;
 			if (result.toLowerCase() == 'success') {
 				Element.hide(loading);
 				$('top_error_message').update(result);
 				$('top_error_message').innerHTML;
 				$('bottom_error_message').update(result);
 				$('bottom_error_message').innerHTML;
 				$('top_error_message').show();
 				$('bottom_error_message').show();
 				setTranslatorParameter('action', action);
 				changeTestingLists();
 			} else {
 				$('top_error_message').update('Error Hanppened!');
 				$('top_error_message').innerHTML;
 				$('bottom_error_message').update('Error Hanppened!');
 				$('bottom_error_message').innerHTML;
 				$('top_error_message').show();
 				$('bottom_error_message').show();
 			}
 		}
 	});
 }
 
/**
 * @author WordCube
 * @param int id, 译员ID
 * @desc 删除译员信息
 * @return void
 */
 function deleteTranslatorInfo(id) {
 	if (confirm('The operation is not restored, and have you decided to delete?')) {
 		action = 'd';
 		transid = id;
 		changeTestingLists();	
 	}
 }

/**
 * @author WordCube
 * @param object currentform, 当前表单对象的引用
 * @param string url, 请求的地址
 * @desc  提交过滤条件请求
 * @return void
 */
 function submitFilterRequest(currentform, url) {
 	currentform.action = url;
 	currentform.submit();
 }

/**
 * @author WordCube
 * @param string msg, 信息内容
 * @param object event, 事件对象
 * @desc  显示信息提示框
 * @return void
 */
 function tip(msg, event) {
	// check for IE4+ DOM and W3C DOM
	//scope = document.all? document.all.message : document.getElementById("message");

	//scope.innerHTML="<font color=#FFFFFF size=2 face=arial>"+msg+"</font>";

	// check for IE4+ DOM and W3C DOM
	//twnd= document.all? document.all.tip : document.getElementById("tip");
	//twnd.style.visibility="visible";
	//twnd.style.top=myEvent.clientY+19;
	//twnd.style.left=myEvent.clientX-2;
	var scrollleft, scrolltop, pointerX, pointerY;
	scrollleft = GetScrollLeft();
	scrolltop = GetScrollTop();

	if (event.pageX) {
		pointerX = event.pageX + 4;
		pointerY = event.pageY;
	} else {
		pointerX = event.clientX + scrollleft;
		pointerY = event.clientY + scrolltop;
	}

	$('information_show_box').style.left = pointerX + "px";
	$('information_show_box').style.top = pointerY + "px";
	$('information_show_box').update('');
	$('information_show_box').innerHTML;
	$('information_show_box').update(msg);
	$('information_show_box').innerHTML;
	$('information_show_box').show();
}

/**
 * @author WordCube
 * @desc 隐藏信息窗口
 * @return void
 */
 function hideElement() {
 	$('information_show_box').style.left = "0px";
 	$('information_show_box').style.top = "0px";
 	$('information_show_box').update('');
 	$('information_show_box').innerHTML;
 	$('information_show_box').hide();
 }

/**
 * @author WordCube
 * @desc 切换多个文件域选项的层的显示状态
 * @return void
 */
 function showmultifile() {
 	var status;
 	status = $('multifile').style.display;

 	if ((status.Trim() == "none") || (status.Trim() == "")) {
 		$('multifile').style.display = "block";
 	} else {
 		$('multifile').style.display = "none";
 	}
 }

/**
 * @author WordCube
 * @desc 切换层的显示状态，显示或者隐藏
 * @return void
 */
 function showitem() {
 	var status;
 	status = $('fielditem').style.display;
 	if ((status == "none") || (status == "")) {
 		$('fielditem').style.display = "block";
 	}else{
 		$('fielditem').style.display = "none";
 	}
 }
 function showitemsupport1() {
 	var status1;
 	status1 = $('introduce').style.display;
 	if ((status1 == "none") || (status1 == "")) {
 		$('introduce').style.display = "block";
 	}else{
 		$('introduce').style.display = "none";
 	}
 }
 function showitemsupport2() {
 	var status2;
 	status2 = $('individual').style.display;
 	if ((status2 == "none") || (status2 == "")) {
 		$('individual').style.display = "block";
 	}else{
 		$('individual').style.display = "none";
 	}
 }
 function showitemsupport3() {
 	var status3;
 	status3 = $('enterprise').style.display;
 	if ((status3 == "none") || (status3 == "")) {
 		$('enterprise').style.display = "block";
 	}else{
 		$('enterprise').style.display = "none";
 	}
 }
/**
 * @author WordCube
 * @param string filename
 * @desc 添加新题单
 * @return void
 */
 function addnewticketitem(filename){
 	var url = filename;
 	var pars = Form.serialize('frmadd');
 	var myAjax = new Ajax.Request(
 		url,
 		{
 			method: 'post',
 			postBody: pars,
 			onComplete: complete_addticket
 		});
 }

/**
 * @author WordCube
 * @param object originalRequest
 * @desc 添加新题单的回调函数
 * @return void
 */
 function complete_addticket(originalRequest){
 	var result = originalRequest.responseText;
 	if (result.Trim() == "success") {
 		$('fielditem').style.display = "none";
 	} else {
 		$('errorinfo').innerHTML = result;
 	}
 }

/**
 * @author WordCube
 * @param string url
 * @param int id, 元素ID
 * @desc 切换修改密码小窗口的显示状态，显示或者隐藏
 * @return void
 */
 function showmodipassworditem(url, id){
 	var status;
 	status = $('modifyitem').style.display;
 	if ((status == "none") || (status == "")) {
 		document.frmmodi.transid.value = id;
 		$('modifyitem').style.display = "block";
 	} else {
 		$('modifyitem').style.display = "none";
 	}
 }
 
/**
 * @author WordCube
 * @param string filename
 * @desc 修改密码
 * @return void
 */
 function modipassworditem(filename){
 	var url = filename;

 	var pars = Form.serialize('frmmodi');
 	var myAjax = new Ajax.Request(
 		url,
 		{
 			method: 'post',
 			postBody: pars,
 			onComplete: complete_modifypassword
 		});
 }

/**
 * @author WordCube
 * @param object originalRequest
 * @desc 修改密码回调函数
 * @return void
 */
 function complete_modifypassword(originalRequest){
 	var result = originalRequest.responseText;

 	if (result.Trim() == "success") {
 		$('modifyitem').style.display = "none";
 		$('errormodiinfo').innerHTML = "";
 		document.frmmodi.transid.value = "";
 		document.frmmodi.password.value = "";
 		document.frmmodi.repassword.value = "";
 	} else {
 		$('errormodiinfo').innerHTML = result;
 	}
 }

/**
 * @author WordCube
 * @param string elementname,元素名称
 * @desc 关闭修改密码小窗口
 * @return void
 */
 function closepasswordwindow(elementname){
 	$(elementname).style.display = "none";
 	$('errormodiinfo').innerHTML = "";
 	document.frmmodi.transid.value = "";
 	document.frmmodi.password.value = "";
 	document.frmmodi.repassword.value = ""; 	
 }

/**
 * @author WordCube
 * @param object current_form
 * @param string filename
 * @desc 重新给译员分配任务
 * @return void
 */
 function reassign(current_form, filename) {
 	var url = filename;
 	var projid = $F('projid');
 	var trans = $F('translator');
 	var pars = 'projid=' + projid + '&translator=' + trans;
 	
 	var myAjax = new Ajax.Request(
 		url,
 		{
 			method: 'get',
 			parameters: pars,
 			onComplete: complete_assign
 		});
 }

/**
 * @author WordCube
 * @param object originalRequest
 * @desc 重新给译员分配任务的回调函数
 * @return void
 */
 function complete_assign(originalRequest){
 	var result = originalRequest.responseText;
 	if (result == "success") {
 		location.href = 'manageoutproj.php';
 	} else {
 		$('errormodiinfo').innerHTML = result;
 	}
 }

/**
 * @author WordCube
 * @param string filename
 * @param string elementname
 * @desc 邀请译员
 * @return void
 */
 function invite(filename, elementname) {
 	var url = filename;
 	var pars = Form.serialize('frminvite');
 	var myAjax = new Ajax.Request(
 		url,
 		{
 			method: 'post',
 			parameters: pars,
 			onComplete: complete_invite
 		});
 }

/**
 * @author WordCube
 * @param object originalRequest
 * @desc 邀请译员的回调函数
 * @return void
 */
 function complete_invite(originalRequest) {
 	var result = originalRequest.responseText;
 	if (result == "success") {
 		$('fielditem').style.display = "none";
 	} else {
 		$('errorinfo').innerHTML = result;
 	}
 }
 
/**
 * @author WordCube
 * @param string element
 * @param string filename
 * @param int id
 * @desc 推荐译员
 * @return void
 */
 function doit(element, filename, id) {
 	var url = filename;
 	if (element.checked) {
 		action = "suggest";  
 	} else {
 		action = "nosuggest";  	  
 	}
 	
 	var pars = 'id=' + id + '&action=' + action;
 	var myAjax = new Ajax.Request(
 		url,
 		{
 			method: 'get',
 			parameters: pars,
 			onComplete: completedoit
 		});
 }

/**
  * @author WordCube
  * @param object originalRequest
  * @desc 推荐译员的回调函数
  * @return void
  */
  function completedoit(originalRequest){
  	var result = originalRequest.responseText;
  	if ( result != "success" ){
  		$('errorinfo').innerHTML = result; 
  	} 
  }

/**
  * @author WordCube
  * @param object element
  * @param string action, 执行的动作
  * @desc 控制层的显示与隐藏状态
  * @return void
  */
  function urlclick(element) {
  	var display = document.getElementById(element).style.display;
  	if (display == "none") {
			document.getElementById(element).style.display = "block";   //显示			
		} else {
		  document.getElementById(element).style.display = "none";    //隐藏
		}

	}
/***************************************************************
  *
  * 结束项目经理后台用到的Javascript函数
  *
  ***************************************************************/

/**
  * @author Sara
  * @desc  取得子类型下拉列表
  * @return void
  */
  function sub_type ()
  {
  	var slttype = $F('slttype');
  	var url = 'deliverSubtype.php';
  	var pars = 'slttype=' + slttype;
  	var myAjax = new Ajax.Request(
  		url,
  		{
  			method: 'get',
  			parameters: pars,
  			onSuccess: function(transport){
  				var result = transport.responseText;
  				if (result == "none" || result == "Parameter Errors")
  				{
  					$('subprojtype').hide();
  				}
  				else
  				{
  					var splitresult = result . split(',');
  					$('sub_proj_type').length = 0;
  					$('sub_proj_type').options[0] = new Option('All','');
  					var i;
  					for (i=0;i < splitresult.length-1; i++)
  					{
  						$('sub_proj_type').options[$('sub_proj_type').length] = new Option(splitresult[i], splitresult[i]);
  					}
  					$('subprojtype').show();
  				}
  			}
  		});
  }

/**
  * @author Sara
  * @desc  取得子领域下拉列表
  * @return void
  */
  function sub_fields ()
  {
  	var field = $F('field');
  	var url = 'deliverSubfields.php';
  	var pars = 'field=' + field;
  	var myAjax = new Ajax.Request(
  		url,
  		{
  			method: 'get',
  			parameters: pars,
  			onSuccess: function(transport){
  				var result = transport.responseText;
  				if (result == "none" || result == "Parameter Errors")
  				{
  					$('subfield').length = 0;
  					$('subfield').options[0] = new Option('- All -','All');
  				}
  				else
  				{
  					var splitresult = result . split(',');
  					$('subfield').length = 0;
  					$('subfield').options[0] = new Option('- All -','All');
  					var i;
  					for (i=0;i < splitresult.length-1; i++)
  					{	
  						$('subfield').options[$('subfield').length] = new Option(splitresult[i], splitresult[i]);
  					}
  					
  				}
  			}
  		});
  }

  function sub_fields_new(fieldID)
  {
  	var field = $F('field' + fieldID);
  	var url = 'deliverSubfields.php';
  	var pars = 'field=' + field;
  	var myAjax = new Ajax.Request(
  		url,
  		{
  			method: 'get',
  			parameters: pars,
  			onSuccess: function(transport){
  				var result = transport.responseText;
  				if (result == "none" || result == "Parameter Errors")
  				{
  					$('subfield' + fieldID).length = 0;
  					$('subfield' + fieldID).options[0] = new Option('- All -','All');
  				}
  				else
  				{
  					var splitresult = result . split(',');
  					$('subfield' + fieldID).length = 0;
  					$('subfield' + fieldID).options[0] = new Option('- All -','All');
  					var i;
  					for (i=0;i < splitresult.length-1; i++)
  					{	
  						$('subfield' + fieldID).options[$('subfield' + fieldID).length] = new Option(splitresult[i], splitresult[i]);
  					}
  					
  				}
  			}
  		});
  }

  function sub_fieldscn ()
  {
  	var field = $F('field');
  	var url = 'deliverSubfields.php';
  	var pars = 'field=' + field;
  	var myAjax = new Ajax.Request(
  		url,
  		{
  			method: 'get',
  			parameters: pars,
  			onSuccess: function(transport){
  				var result = transport.responseText;
  				if (result == "none" || result == "Parameter Errors")
  				{
  					$('subfield').length = 0;
  					$('subfield').options[0] = new Option('- 全部 -','All');
  				}
  				else
  				{
  					var splitresult = result . split(',');
  					$('subfield').length = 0;
  					$('subfield').options[0] = new Option('- 全部 -','All');
  					var i;
  					for (i=0;i < splitresult.length-1; i++)
  					{
  						$('subfield').options[$('subfield').length] = new Option(splitresult[i], splitresult[i]);
  					}
  					
  				}
  			}
  		});
  }
  function sub_category ()
  {
  	var category = $F('category');
  	var url = 'deliverSubcategory.php';
  	var pars = 'category=' + category;
  	var myAjax = new Ajax.Request(
  		url,
  		{
  			method: 'get',
  			parameters: pars,
  			onSuccess: function(transport){
  				var result = transport.responseText;
  				if (result == "none" || result == "Parameter Errors")
  				{
  					$('subcategory').length = 0;
				//$('subcategory').options[0] = new Option('General','General');
			}
			else
			{
				var splitresult = result . split(',');
				$('subcategory').length = 0;
				$('subcategory').options[0] = new Option('General','General');
				var i;
				for (i=0;i < splitresult.length-1; i++)
				{	
					
					if (splitresult[i] != 'General') {
						$('subcategory').options[$('subcategory').length] = new Option(splitresult[i], splitresult[i]);
					}

				}
				
			}
		}
	});
  }

  function sub_category_new(catID)
  {
  	var category = $F('category' + catID);
  	var url = 'deliverSubcategory.php';
  	var pars = 'category=' + category;
  	var myAjax = new Ajax.Request(
  		url,
  		{
  			method: 'get',
  			parameters: pars,
  			onSuccess: function(transport){
  				var result = transport.responseText;
  				if (result == "none" || result == "Parameter Errors")
  				{
  					$('subcategory'+ catID).length = 0;
				//$('subcategory').options[0] = new Option('General','General');
			}
			else
			{
				var splitresult = result . split(',');
				$('subcategory' + catID).length = 0;
				$('subcategory' + catID).options[0] = new Option('General','General');
				var i;
				for (i=0;i < splitresult.length-1; i++)
				{	
					
					if (splitresult[i] != 'General') {
						$('subcategory' + catID).options[$('subcategory' + catID).length] = new Option(splitresult[i], splitresult[i]);
					}

				}
				
			}
		}
	});
  }
  function sub_categorycn ()
  {
  	var category = $F('category');
  	var url = 'deliverSubcategory.php';
  	var pars = 'category=' + category;
  	var myAjax = new Ajax.Request(
  		url,
  		{
  			method: 'get',
  			parameters: pars,
  			onSuccess: function(transport){
  				var result = transport.responseText;
  				if (result == "none" || result == "Parameter Errors")
  				{
  					$('subcategory').length = 0;
				//$('subcategory').options[0] = new Option('General','General');
			}
			else
			{
				var splitresult = result . split(',');
				$('subcategory').length = 0;
				$('subcategory').options[0] = new Option('普通','普通');
				var i;
				for (i=0;i < splitresult.length-1; i++)
				{	
					
					if (splitresult[i] != '普通') {
						$('subcategory').options[$('subcategory').length] = new Option(splitresult[i], splitresult[i]);
					}

				}
				
			}
		}
	});
  }


  function setPrice (sl,tl,cat1,cat2)
  {
  	var sl = $F(sl);
  	var tl = $F(tl);
  	var cat1 = $F(cat1);
  	var cat2 = $F(cat2);
	//alert(sl + ", " + tl + ", " + cat1 + ", " + cat2);
	var url = 'deliverprice.php';
	var pars = 'sl=' + sl +'& tl=' + tl + '& cat1=' + cat1 +'& cat2='+cat2;
	var myAjax = new Ajax.Request(
		url,
		{
			method: 'get',
			parameters: pars,
			onSuccess: function(transport){
				var result = transport.responseText;
				if (result == "none" || result == "Parameter Errors")
				{
					document.getElementById('price').innerHTML= result; 
				}
				else
				{
					document.getElementById('price').innerHTML= result; 				
				}			
			}
		});
}

function calculatePrice (id, sl,tl,cat1,cat2)
{
	var sl 		= $F(sl);
	var tl 		= $F(tl);
	var cat1 	= $F(cat1);
	var cat2 	= $F(cat2);
	//alert(sl + ", " + tl + ", " + cat1 + ", " + cat2 + ", " + id);
	var url 	= 'calculateprice.php';
	var pars 	= 'sl=' + sl +'&tl=' + tl + '&cat1=' + cat1 +'&cat2='+cat2;
	var myAjax 	= new Ajax.Request(url,{
		method: 'get',
		parameters: pars,
		onSuccess: function(transport){
			
			var result = transport.responseText;
			//alert(result);
			if (result == "none" || result == "Parameter Errors")
			{
				document.getElementById('price' + id).innerHTML= result; 
			}
			else
			{
				document.getElementById('price' + id).innerHTML= result; 				
			}			
		}
	});
}

/**
  * @author Sara
  * @desc  取得子类型下拉列表
  * @return void
  */
  function option_subtype ()
  {
  	var slttype = $F('types');
  	var url = 'deliverSubtype.php';
  	var pars = 'slttype=' + slttype;
  	var myAjax = new Ajax.Request(
  		url,
  		{
  			method: 'get',
  			parameters: pars,
  			onSuccess: function(transport){
  				var result = transport.responseText;
  				if (result == "none" || result == "Parameter Errors")
  				{
  					$('sub_type').hide();
  				}
  				else
  				{
  					var splitresult = result . split(',');
  					$('optionsubtype').length = 0;
  					$('optionsubtype').options[0] = new Option('All','');
  					var i;
  					for (i=0;i < splitresult.length-1; i++)
  					{
  						$('optionsubtype').options[$('optionsubtype').length] = new Option(splitresult[i], splitresult[i]);
  					}
  					$('sub_type').show();
  				}
  			}
  		});
  }

/**
  * @author sara
  * @param string str
  * @desc 判断字符串是否为空
  * @return boolean
  */		
  function space(str)
  {
  	for(i=0 ; i<str.length ; i++)
  	{
  		if(str.charAt(i) != " ")
  			return false;
  	}
  	return true;
  }
  
  var edit = 0;  /*设置编辑状态初始值*/

/**
  * @author sara
  * @param string value
  * @desc 设置编辑状态
  * 根据状态值显示表的内容
  */		
  function setEditStatus(value)
  {
  	edit = value;
  	showtable();
  }

/**
  * @author sara
  * @desc 显示所要查看的表
  */		
  function showtable()
  {
  	var pricetablename = $F('pricetablename');
  	var url = 'showtable.php';
  	var pars = 'pricetablename=' + pricetablename + '&edit=' + edit;
  	var myAjax = new Ajax.Request(
  		url,
  		{
  			method: 'get',
  			parameters:pars,
  			onSuccess: function(transport)
  			{
  				var result = transport.responseText;
  				if (result.toLowerCase() != 'parameter errors')
  				{
  					$('price_table').innerHTML = result;
  				}
  				else 
  				{
  					$('price_table').hide();
  					location.href = "index.php";
  				}
  			}
  		});
  	return true;  
  }
  
/**
  * @author sara
  * @param string currentform
  * @desc 保存当前表单中的肉容
  */		
  function savetable(currentform)
  {
  	var url = "save.php";
  	var pricetablename = $F('pricetablename');
  	var params = Form.serialize(currentform) + '&pricetablename=' + pricetablename;
  	new Ajax.Request(url, {
  		asynchronous: true,
  		method: "post",
  		parameters: params,
  		onSuccess: function(transport)	{
  			result = transport.responseText;
  			if (result.toLowerCase() == 'save success' ) {
  				setEditStatus(0);
  			} 
  			else
  			{
  				$('errormessage').update(result);
  				$('errormessage').innerHTML;
  				$('errormessage').show();
  			}	
  		} 
  	});
  }
  
/**
  * @author sara
  * @param string currentform
  * @desc 将当前表单中的内容保存到另一个表中
  */		
  function saveasData(currentform)
  {
  	var savename = $F('savename');
  	if (space(savename)){
  		alert("请填写表名");
  		currentform.savename.focus();
  		currentform.savename.select();
  		return false;
  	}
  	else
  	{
  		var url = "checktablename.php";
  		var savename = $F('savename');
  		var params = 'savename=' + savename;
  		new Ajax.Request(url, {
  			asynchronous: true,
  			method: "get",
  			parameters:params,
  			onSuccess: function(transport) {
  				result = transport.responseText;
  				if ( result == "success" )
  				{
  					var url = "saveastable.php";
  					var params = Form.serialize(currentform);
  					new Ajax.Request(url, {
  						asynchronous: true,
  						method: "post",
  						parameters: params,
  						onSuccess: function(transport) {
  							result = transport.responseText;
  							if ( result == "success" )
  							{
  								setEditStatus(0);
  								location.href='index.php';
  							}
  							else
  							{
  								$('errormessage').update(result);
  								$('errormessage').innerHTML;
  								$('errormessage').show();
  							}	 
  						}
  					});	
  				}
  				else
  				{
  					$('errormessage').update(result);
  					$('errormessage').innerHTML;
  					$('errormessage').show();
  				}
  			}
  		});
  	}			 
  }
  
/**
  * @author sara
  * @param string fm
  * @desc 判断表单中内容的有效性,若有效则显示人民币价格参考表,即show()函数
  * return boolean
  */		
  function checkform(fm)
  {
  	var turnrate = $F('turnrate');
  	var exchangerate = $F('exchangerate');
  	if (space(turnrate)){
  		alert("请填写转换率！");
  		fm.turnrate.focus();
  		fm.turnrate.select();
  		return false;
  	}
  	else if(turnrate == 0){
  		alert ("转换率不能为0");
  		fm.turnrate.focus();
  		fm.turnrate.select();
  		return false;
  	}	
  	else if(space(exchangerate)){
  		alert("请填写汇率！");
  		fm.exchangerate.focus();
  		fm.exchangerate.select();
  		return false;
  	}
  	else if(exchangerate == 0){
  		alert ("汇率不能为0");
  		fm.exchangerate.focus();
  		fm.exchangerate.select();
  		return false;
  	}	
  	else
  		show();
  }
  
  function show()
  {
  	var url = 'convertprice.php';
  	var pricetablename = $F('pricetablename');
  	var turnrate = $F('turnrate');
  	var exchangerate = $F('exchangerate');
  	var pars = 'turnrate=' + turnrate + '&exchangerate=' + exchangerate + '&pricetablename=' + pricetablename;
  	var myAjax = new Ajax.Request(
  		url,
  		{
  			method: 'get',
  			parameters:pars,
  			onSuccess: function(transport){
  				var result = transport.responseText;
  				if (result=="failure")
  				{
  					$('error').show();
  					$('convert_table').hide();
  					$('error').innerHTML = "numeric";
  				}
  				else
  				{
  					$('error').hide();
  					$('convert_table').show();
  					$('convert_table').innerHTML = result;
  				}
  			}
  		});
  	return true;
  }

/**
  * @author sara
  * @desc 根据人民币表中要编辑的类型，显示所编辑的表,若类型为美元参考，则显示人民币价格参考表
  */		
  function checkeditname()
  {
  	var editname = $F('editname');
  	if ( editname == "dollarpreference" )
  	{
  		setEditStatus(1); 
  	}	
  	if ( editname == "currentprice" )
  	{
  		checkrmb();
  	}
  }
  
/**
  * @author sara
  * @desc 判断转换率和汇率的有效性,若有效则显示编辑状态下的人民币价格参考表
  * return boolean
  */		
  function checkrmb()
  {
  	var turnrate = $F('turnrate_rmb');
  	var exchangerate = $F('exchangerate_rmb');
  	var pricetablename = $F('pricetablename');
  	if (space(turnrate)){
  		alert("请填写转换率！");
  		$('turnrate_rmb').focus();
  		$('turnrate_rmb').select();
  		return false;
  	}
  	else if(turnrate == 0){
  		alert ("转换率不能为0");
  		$('turnrate_rmb').focus();
  		$('turnrate_rmb').select();
  		return false;
  	}	
  	else if(space(exchangerate)){
  		alert("请填写汇率！");
  		$('exchangerate_rmb').focus();
  		$('exchangerate_rmb').select();
  		return false;
  	}
  	else if(exchangerate == 0){
  		alert ("汇率不能为0");
  		$('exchangerate_rmb').focus();
  		$('exchangerate_rmb').select();
  		return false;
  	}	
  	else
  		showrmbtable();
  }
  
/**
  * @author sara
  * @desc 显示人民币价格参考表
  */		
  function showrmbtable() {
  	var url = 'convertprice.php';
  	var turnrate = $F('turnrate_rmb');
  	var pricetablename = $F('pricetablename');
  	var exchangerate = $F('exchangerate_rmb');
  	var pars = 'turnrate=' + turnrate + '&exchangerate=' + exchangerate + '&pricetablename=' + pricetablename;
  	var myAjax = new Ajax.Request(
  		url,
  		{
  			method: 'get',
  			parameters:pars,
  			onSuccess: function(transport){
  				var result = transport.responseText;
  				if (result=="failure") {
  					$('error_rmb').show();
  					$('error_rmb').innerHTML = "numeric";
  				} else {
  					$('error_rmb').hide();
  					var result = transport.responseText;
  					$('price_table').innerHTML = result;
  				}
  			}
  		});
  }

/**
  * @author sara
  * @param string field
  * @desc 当field中值为文本翻译时，显示项目类型下拉列表
  */		
  function showproject(field) {
  	var result = $F(field).Trim();
  	var str = "Translation";
  	if(result.length==str.length && result.search(str)==0) {
  		$('quoteproject').show();
  		$('special').hide();
  	}	else {
  		$('quoteproject').hide();
  		$('special').hide();
  	}	
  }
  
/**
  * @author sara
  * @param string field
  * @desc 当field中值为特殊用途翻译时，显示其子类型下拉列表
  */		
  function showpurpose(field) {
  	var result = $F(field).Trim();
  	var category = $F('categorytran');
  	var str = "Special Purpose Translation";
  	var str1 = "Translation";
  	if(result.length==str.length && result.search(str)==0 && category.length==str1.length && category.search(str1)==0) {
  		$('special').show();
  	} else {
  		$('special').hide();
  	}	
  }

  function displaySubMenu(li) {
  	var subMenu = li.getElementsByTagName("ul")[0];
  	subMenu.style.display = "block";
  }
  function hideSubMenu(li) {
  	var subMenu = li.getElementsByTagName("ul")[0];
  	subMenu.style.display = "none";
  }
/**
 * @author sara
 * @desc 取得时间间隔执行器对象
 * @return object
 */
 function getPeriodicalExecuterCN() {
  pe = new PeriodicalExecuter(getRemainTimeCN, 1);   //每间隔60秒执行一次getRemainTime函数
}

/**
 * @author sara
 * @desc 取得剩余时间
 * @return object
 */
 function getRemainTimeCN() {
 	var url = 'remaintime.php';
 	var pars = '';
 	var myAjax = new Ajax.Request(
 		url,
 		{
 			method: 'get',
 			parameters: pars,
 			onComplete: checkHandleCN
 		}
 		);
 }

/**
 * @author sara
 * @param object originalRequest, 请求返回的对象
 * @desc 请求剩余时间的回调函数
 * @return void
 */
 function checkHandleCN(originalRequest) {
 	var result = originalRequest.responseText;
 	$('remaining').innerHTML = "<br />剩余时间 ： " + result + " 分。";
 	if (result == 0) {
 		pe.stop();
 	}
 }

 function setTotalScore (attitude, language, accuracy, score) {
 	var attitude = $F(attitude);
 	var language = $F(language);
 	var accuracy = $F(accuracy);
 	var totalscore = (parseInt(attitude)+parseInt(language)+parseInt(accuracy))/3;
 	var rank = '';
 	totalscore = totalscore . toFixed(2);
 	if (totalscore == 4.0) {
 		rank = 'A';
 	} else if ((totalscore >= 3.67) && (totalscore < 4.0)) {
 		rank = 'A-';
 	} else if ((totalscore >= 3.33) && (totalscore < 3.67)) {
 		rank = 'B+';
 	}	 else if ((totalscore >= 1.00) && (totalscore < 3.33)) {
 		rank = 'D';
 	}	 else if (totalscore < 1.00) {
 		rank = 'F';
 	}
 	document.getElementById(score). innerHTML = totalscore  + ' ' + rank;
 }

 function setPublish(currentform)
 {
 	var action;
 	setTranslatorParameter('action', 'publish');
 	var url = "changetestlist.php";
 	url = url + "?sl=" + encodeURIComponent(getTranslatorParameter('sourcelanguage')) +
 	"&tl=" + encodeURIComponent(getTranslatorParameter('targetlanguage')) +
 	"&starttime=" + encodeURIComponent(getTranslatorParameter('starttime')) +
 	"&endtime=" + encodeURIComponent(getTranslatorParameter('endtime')) +
 	"&qualify=" + encodeURIComponent(getTranslatorParameter('qualify')) +
 	"&sorttype=" + encodeURIComponent(getTranslatorParameter('sorttype')) +
 	"&sortcolume=" + encodeURIComponent(getTranslatorParameter('sortcolume')) +
 	"&round=" + encodeURIComponent(getTranslatorParameter('round')) +
 	"&role=" + encodeURIComponent(getTranslatorParameter('role')) +
 	"&mt=" + encodeURIComponent(getTranslatorParameter('mothertongue')) +
 	"&s=" + encodeURIComponent(getTranslatorParameter('sort')) +
 	"&timing=" + encodeURIComponent(getTranslatorParameter('timing')) +
 	"&state=" + encodeURIComponent(getTranslatorParameter('state')) +
 	"&statescore=" + encodeURIComponent(getTranslatorParameter('statescore')) +
 	"&keyword=" + encodeURIComponent(getTranslatorParameter('keyword')) +
 	"&rowcount=" + encodeURIComponent(getTranslatorParameter('rowcount')) +
 	"&rowstart=" + encodeURIComponent(getTranslatorParameter('rowstart')) +
 	"&rowshow=" + encodeURIComponent(getTranslatorParameter('rowshow')) +
 	"&action=" + encodeURIComponent(getTranslatorParameter('action')) +
 	"&transid=" + encodeURIComponent(getTranslatorParameter('transid'));
 	var params = Form.serialize(currentform);
 	new Ajax.Request(url, {
 		asynchronous: true,
 		method: "post",
 		parameters: params,
 		onComplete: function(request) {
 			result = request.responseText;
 			if (result.toLowerCase() == 'success') {
 				$('top_error_message').update(result);
 				$('top_error_message').innerHTML;
 				$('bottom_error_message').update(result);
 				$('bottom_error_message').innerHTML;
 				$('top_error_message').show();
 				$('bottom_error_message').show();
 				setTranslatorParameter('action', 'view');
 				changeTestingLists();
 			} else {
 				$('top_error_message').update(result);
 				$('top_error_message').innerHTML;
 				$('bottom_error_message').update(result);
 				$('bottom_error_message').innerHTML;
 				$('top_error_message').show();
 				$('bottom_error_message').show();
 			}
 		}
 	});
 }
 var video_array = { 'page' : 1, 'view' : 'tile', 'type' : '', 'sort' : 'newpublish'};

 function setVideoValue(key, value) {
 	video_array[key] = value;
 }

 function getVideoValue(key) {
 	return video_array[key];
 }

 function changeVideoList() {
 	var url = 'videolist.php';
 	var params = "page=" + encodeURIComponent(getVideoValue("page")) +
 	"&view=" + encodeURIComponent(getVideoValue("view")) +
 	"&type=" + encodeURIComponent(getVideoValue("type")) +
 	"&s=" + encodeURIComponent(getVideoValue("sort"));
 	new Ajax.Updater( 'videoshow', url, {
 		asynchronous: true,
 		method: "get",
 		parameters: params,
 		evalScripts: true,
 		onLoading: function(request) {},
 		onComplete: function(request) {}
 	});
 }

 function browseVideoViewType(viewType) {
 	var tile; 
 	var list;
 	tile = viewType == 'tile' ? '<img src="../images/display_mode_grid_act.gif" alt="Guid View" border="0" style="margin-right:2px;"/>' : '<img src="../images/display_mode_grid.gif" onclick="javascript: return browseVideoViewType(\'tile\');" alt="Guid View" border="0" />';
 	list = viewType == 'list' ? '<img src="../images/display_mode_list_act.gif" alt="List View" border="0" style="margin-left:2px;"/>' : '<img src="../images/display_mode_list.gif" onclick="javascript: return browseVideoViewType(\'list\');" alt="List View" border="0" />';
 	$('view-nav').innerHTML = tile + list;
 	setVideoValue('view', viewType);
 	changeVideoList();
 }

 function browseVideoSortType(sortType) {
 	var newpublish;
 	var mostpopular; 
 	var mostcollect; 
 	var collect;
 	var end;
 	
 	newpublish = sortType == 'newpublish' ? '<div class="span3 c6">&nbsp;</div><div class="span3 c4">最新发布</div>' : '<div class="span3 c6">&nbsp;</div><div class="span3 c5" ><a href="#" class="green12w" onclick="javascript: return browseVideoSortType(\'newpublish\');">最新发布</a></div>';
 	mostpopular = sortType == 'mostpopular' ? '<div class="span3 c6">&nbsp;</div><div class="span3 c4">最受欢迎</div>' : '<div class="span3 c6">&nbsp;</div><div class="span3 c5" ><a href="#" class="green12w" onclick="javascript: return browseVideoSortType(\'mostpopular\');">最受欢迎</a></div>';
 	mostcollect = sortType == 'mostcollect' ? '<div class="span3 c6">&nbsp;</div><div class="span3 c4">最多收藏</div>' : '<div class="span3 c6">&nbsp;</div><div class="span3 c5" ><a href="#" class="green12w" onclick="javascript: return browseVideoSortType(\'mostcollect\');">最多收藏</a></div>';
 	collect = sortType == 'collect' ? '<div class="span3 c6">&nbsp;</div><div class="span3 c4">最多收藏</div>' : '<div class="span3 c6">&nbsp;</div><div class="span3 c5" ><a href="#" class="green12w" onclick="javascript: return browseVideoSortType(\'collect\');">最多收藏</a></div>';
 	end = '<div class="span3 c6" style="width: 22px;margin-bottom: 10px">&nbsp;</div>';
 	$('sort-nav').innerHTML = newpublish + mostpopular + mostcollect + collect + end;
 	setVideoValue('sort', sortType);
 	changeVideoList();
 }

 function movenext1(current_form,  description){
 	
 	current_form.submit();
 	alert(description);
 	return true;
 }
 function movenext(current_form){
 	
 	current_form.submit();
 	return true;
 }

 function openloading(){
 	var loaddiv = document.createElement('div');
 	loaddiv.id="loadingdiv";
 	loaddiv.className = "loading-icon";
 	loaddiv.innerHTML = "<img src='/images/loading.gif' alt='loading......'' />";
 	document.appendChild(loaddiv);

 }

 function closeloading(){
 	var loaddiv = document.getElementById('loadingdiv');
 	if (loaddiv){
 		document.removeChild(loaddiv);
 	}
 }

//zhang lichao 20161111
// function: get url request parameters
function GetRequestParams(query) {
	var params = new Object();
	if (query.indexOf("?") != -1) {
		var paramsStr = query.substr(1).split("&");
		for(var i = 0; i < paramsStr.length; i ++) {
			var oneParam =paramsStr[i].split("=");
			params[decodeURIComponent(oneParam[0])]=decodeURIComponent(oneParam[1]);
		}
	}
	return params;
}

function GetRequestPathParams(path) {
	var params = new Object();
	if (path.endsWith('/')){
		path = path.substr(0, path.length-1);
	}
	var p_array = path.split("/");
	if (p_array.length > 2){
		params.service = decodeURIComponent(p_array[2]);
	}
	else{
		params.service ='Document Translation';
	}
	

	if (p_array.length >= 4){
		params.source = "All";
		params.target = "All";
	    if (p_array[3].indexOf("-to-") > 0){
			lang = decodeURIComponent(p_array[3]).split('-to-')			
			if (lang[0] != "all-languages"){
				params.source = lang[0];
			}
			if (lang[1] != "all-languages"){
				params.target = lang[1];
			}
		}
		else if (p_array[3] != "all-languages"){
			params.target = p_array[3];
			params.source = p_array[3];
		}

		if (params.source == 'Chinese-Simplified'.toLowerCase()){
			params.source = 'Chinese (Simplified)';
		}
		else if  (params.source == 'Chinese-Traditional'.toLowerCase()){
			params.source = 'Chinese (Traditional)';
		}
		else{
			params.source = params.source.replace(params.source[0],params.source[0].toUpperCase());
		}				
			
		if (params.target == 'Chinese-Simplified'.toLowerCase()){
			params.target = 'Chinese (Simplified)';
		}
		else if  (params.target == 'Chinese-Traditional'.toLowerCase()){
			params.target = 'Chinese (Traditional)';
		}
		else{
			params.target = params.target.replace(params.target[0],params.target[0].toUpperCase());
		}
	}
	
	if (p_array.length > 4){
		if (p_array[4] == 'all-fields'){
			params.field = '';
		}
		else{
			params.field = decodeURIComponent(p_array[4]) ;
		}
	}
	
	if (p_array.length > 5){
		if (p_array[5] == 'all-features'){
			params.type = '';
		}
		else{
			params.type= decodeURIComponent(p_array[5]) ;
		}
	}
	if (p_array.length > 6){
		if (p_array[6] == 'all-tags'){
			params.tag = '';
		}
		else{
			params.tag = decodeURIComponent(p_array[6]); 
		}
	}
	for (p in params){
		if (p == 'service' && params[p] == 'over-the-phone-interpretation'){
			params[p] = "Over-The-Phone Interpretation";
		}
		else if (p !== 'tag'){
			params[p] = params[p].replace(/-and-/g, ' & ');
			params[p] = params[p].replace(/-/g, ' ');
		}						
	}
	return params;
}