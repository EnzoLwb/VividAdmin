function initUploadContent() {
  $('pastesource1').options[0].selected = true;
  $('filesource1').options[0].selected = true;
  $('largefilesource').options[0].selected = true;

  var pasteState = $('pastestate').checked;
  if (pasteState == true) {
    $('paste1').style.display = 'block';
  } else {
    $('paste1').style.display = 'none';
  }

  var fileState = $('filestate').checked;
  if (fileState == true) {
    $('file1').style.display = 'block';
  } else {
    $('file1').style.display = 'none';
  }

  var largeFileState = $('largefilestate').checked;
  if (largeFileState == true) {
    $('largefile').style.display = 'block';
  } else {
    $('largefile').style.display = 'none';
  }

  //$('paste2').style.display = 'none';
  //$('paste3').style.display = 'none';
  //$('paste4').style.display = 'none';
  //$('paste5').style.display = 'none';
}

function addContentItem(type) {
  switch (type) {
    case 'paste':
      break;

    case 'file':
      break;

    default:
      return;   
  }
 
  for (i=2; i<=5; i++){
    var displayValue = $(type + i).style.display;
    if (displayValue == 'none') {
      $(type + i).style.display = 'block';
      $('chk' + type + i).checked = true;
	   	break;
    }
	}
}

function clearContentItem(type,number) {
 if (isNaN(number)) {
    return;
  }

  if (number > 5 || number < 1) {
    return;
  }
	
  switch (type) {
    case 'paste':
      break;

    case 'file':
      break;

    default:
      return;   
  }
 
  var displayValue = $(type + number).style.display;
  $(type + number).style.display = 'none';
	$('chk' + type + number).checked = false;
	
	try{
		removeLanguagePair($(type + 'languagepair' + number + '[]')); 
	}
	catch(err)
	{ }
}

function ShowLocalService() {
		  
	var localtype = $F('localtype');
	switch(localtype) {
		
		case 'web':
	  		$('e-commerce').show();			
		    $('softwarelocal').hide();
				$('multimedia').hide();
				break;
				
		case 'soft':
	  		$('e-commerce').hide();		
		    $('softwarelocal').show();	
				$('multimedia').hide();		
				 break;
			
		case 'mul':
	  		$('e-commerce').hide();			
		    $('softwarelocal').hide();
				$('multimedia').show();
				 break;
				
		default: 
				$('e-commerce').hide();			
		    $('softwarelocal').hide();
				$('multimedia').hide();
				break;
	}
}

function ShowLanguage(type1,target,content) {  
	var edittype = $F(type1);
	
	if (edittype == content)
		$(target).show();		
	else
		$(target).hide();
}

function toggleContentItem(type, i) {
	switch (type) {
    case 'paste':
		  //if (i=='1')
	  	$('paste' + i).style.display = 'block';
			$('files' + i).style.display = 'none';
			$('largefile' + i).style.display = 'none';
			break;		
		
    case 'file':
			//if (i=='1')
		  $('paste' + i).style.display = 'none';
			$('files' + i).style.display = 'block';
			$('largefile' + i).style.display = 'none';
      break;			
		
		case 'largefile':
			//if (i=='1')
			$('paste' + i).style.display = 'none';
			$('files' + i).style.display = 'none';
			$('largefile' + i).style.display = 'block';
      break;
		
    default:
      return;   
  }
	
}

function changeTargetLanguage(sourceElement, targetElement) {
  var sourceLength;
  var targetLength;
  var tempString;
  sourceLength = $(sourceElement).length;
  sourceLanguage = $F(sourceElement);
  targetLanguage = $F(targetElement);
  $(targetElement).length = 0;
  $(targetElement).options[0] = new Option('-- Target --', 'target');
  var counting;
  for (counting = 1; counting < sourceLength; counting++) {
    tempString = $(sourceElement).options[counting].value;
    if (tempString.toLowerCase() != sourceLanguage.toLowerCase()) {
      $(targetElement).options[$(targetElement).length] = new Option(tempString, tempString);
    }
  }
}

function addLanguagePair(sourceElement, targetElement, languagePairElement) {
  var sourceLanguage = $F(sourceElement);
  var targetLanguage = $F(targetElement);

  if (sourceLanguage == 'source') {
    $('errormessage').innerHTML = ERR_SourceLanguageBlank;
		return;
  } else {
		$('errormessage').innerHTML = '';
	}

  if (targetLanguage == 'target') {
    $('errormessage').innerHTML = ERR_TargetLanguageBlank;
    return;
  } else {
		$('errormessage').innerHTML = '';
	}
	
  if (targetLanguage == '') {
   $('errormessage').innerHTML = ERR_TargetLanguageBlank;
    return;
  } else {
		$('errormessage').innerHTML = '';
	}
	
  var languagePairLength = $(languagePairElement).length;
  var languagePair = '';
  var addLanguagePair = sourceLanguage + "-" + targetLanguage;
  var isExsit = false;
  var counting;
	var sublanguagePair= '';
	var strlanguage = '';
	
	//sub string ,is the same of source language
	try {
	  languagePair = $(languagePairElement).options[0].value;
	}	catch(e)	{
	}
	if (languagePair != ''){
	  var sublanguagePairLength = languagePair.length;
	  for (counting = 0; counting < sublanguagePairLength; counting++) {
		  strlanguage = languagePair.substr(counting, 1);
		  if (strlanguage != '-') {
		    sublanguagePair = sublanguagePair + strlanguage;  
	  	 } else {
			      break;
		   }
	  }
    
	  if (sourceLanguage != sublanguagePair){
	    $('errormessage').innerHTML = ERR_SourceLanguageLimit;
      return;
    } else {
		  $('errormessage').innerHTML = '';
	  }
	}
  for (counting = 0; counting < languagePairLength; counting++) {
    languagePair = $(languagePairElement).options[counting].value;
    if (addLanguagePair == languagePair) {
      isExsit = true;
		  $('errormessage').innerHTML = ERR_LanguagePairSelected;
      return;
    } else {
		  $('errormessage').innerHTML = '';
	  }
  }

  if (isExsit == false) {
    var y = document.createElement('option');
    y.text = addLanguagePair;
    y.selected = true;
    var x = $(languagePairElement);
    try {
      x.add(y, null); // standards compliant
    } catch(ex) {
      x.add(y); // IE only
    }
  }
}

function removeLanguagePair(languagePairElement) {
  var x = $(languagePairElement);
  x.remove(x.selectedIndex);
}

function selectAll(prefix, type, checked) {
  var parentname, subname;
  switch (type) {
    case 'field':
      parentname = prefix + 'fields[]';
      subname = prefix + 'subfields[]';
      break;

    case 'style':
      parentname = prefix + 'styles[]';
      subname = prefix + 'substyles[]';
      break;

    case 'translator':
      parentname = prefix + 'translators[]';
      break;

    case 'categorie':
      parentname = prefix + 'categories[]';
			subname = prefix +'subcategorie[]';
      break;

    default:
      return;

  }

  var checkboxs;

  checkboxs = document.getElementsByName(parentname);
  //alert(checkboxs.length);
  for (var i=0; i < checkboxs.length; i++) {
	checkboxs[i].checked = checked;
  }

  if (subname != null) {
    checkboxs = document.getElementsByName(subname);
    //alert(checkboxs.length);
    for (var i=0; i < checkboxs.length; i++) {
	  checkboxs[i].checked = checked;
    }
  }

}

function displaySubProperty(prefix, name, id) {
  var parentname;
  switch (name) {
     case 'subfield':
      parentname = prefix + 'fields[]';
      subname = prefix + 'subfields[]';
			startname = prefix +'subfields' + id +'_1';
			endname = prefix +'subfields' + id +'_2';
      break;

    case 'substyle':
      parentname = prefix + 'styles[]';
      subname = prefix + 'substyles[]';
			startname = prefix +'substyles' + id +'_1';
			endname = prefix +'substyles' + id +'_2';
      break;
   
    case 'subcategorie':
      parentname = prefix + 'categories[]';
			subname = prefix +'subcategorie[]';
			startname = prefix +'subcategorie' + id +'_1';
			endname = prefix +'subcategorie' + id +'_2';
      break;
			
    default:
      return;

  }
	var element = $(prefix + name + id);
	var checkboxs = document.getElementsByName(parentname);
	
	var startid = $(startname).value; 
	var endid = $(endname).value;
	
  for (var counter=0; counter< 25; counter++){
		try{
	     if($(prefix + name + counter).style.display == 'block' && counter != id){
				  
		     $(prefix + name + counter).style.display='none';
			 }
		}catch(e){}
	}
   
  if (element != null) {
	var status = element.style.display;
	if (status == 'none') { 

      element.style.display = 'block';
	} else {
      element.style.display = 'none';
    }
  }
}

function toggleTargetFormat(ElementName, Display) {
  var element = $(ElementName);
  if (Display == true) {
    element.style.display = 'block';
  } else {
    element.style.display = 'none';
  }
}

function toggleCategorie(ElementName1, ElementName2) {
  var element1 = $(ElementName1);
  //var display1 = element1.style.display;
  //if (display1 == 'none') {
    element1.style.display = 'block';
  //}

  var element2 = $(ElementName2);
  //var display2 = element2.style.display;
  //alert(display2);
  //if (display2 == 'block') {
    element2.style.display = 'none';
  //}
}

function showTranslatorInfo(ElementName, Id) {
  var url = 'gettranslatorinfo.php';
  var params = 'id=' + Id;
  new Ajax.Request(url, {
    method: "get",
    parameters: params,
    onComplete: function(request) {
                  var xmlDoc, property, error;

                  xmlDoc = request.responseXML.documentElement;
                  property = 'textContent';
                  error = xmlDoc.getElementsByTagName('error')[0][property];
                  if (typeof error == 'undefined') {
                    property = "text";
                    error = xmlDoc.getElementsByTagName('error')[0][property];
                  }

                  if (error == "true") {
                    var star = xmlDoc.getElementsByTagName('star')[0][property];
                    var status = xmlDoc.getElementsByTagName('status')[0][property];
                    var cooperation = xmlDoc.getElementsByTagName('cooperation')[0][property];
                    var graduated = xmlDoc.getElementsByTagName('graduated')[0][property];
                    var major = xmlDoc.getElementsByTagName('major')[0][property];
                    var education = xmlDoc.getElementsByTagName('education')[0][property];

                    $(ElementName).innerHTML = 'Ranking:' + star +
                                               '&nbsp;&nbsp;' +
                                               'Status:' + status +
                                               '&nbsp;&nbsp;' +
                                               'Graduate From::' + graduated +
                                               '&nbsp;&nbsp;' +
                                               'Major:' + major +
                                               '&nbsp;&nbsp;' +
                                               'Degree: ' + education;
										 $(ElementName).show();													 
                  }
                }
  });
}


function hideTranslatorInfo(ElementName) {
  //清空译员信息层内容
  $(ElementName).innerHTML = '';

  //隐藏译员信息层内容
  $(ElementName).hide() = '';
}

function selectSub(prefix, type, id) {
  var parentname;
 
  switch (type) {
    case 'field':
      parentname = prefix + 'fields[]';
      break;

    case 'style':
      parentname = prefix + 'styles[]';
       break;
   
    case 'subcategorie':
      parentname = prefix + 'categories[]';	    
			break;

    default:
      return;
  }
	
	var checkboxs = document.getElementsByName(parentname);
  
  for (var i=0; i < checkboxs.length; i++) {
    if (checkboxs[i].value == id) {
       if (checkboxs[i].checked == false) {
	        checkboxs[i].checked = true;
        }
     }
	}	 
}

function changedescription(subtype){
	var edittype = $F(subtype);
	switch(edittype){
		case '同传':
			$('interdes').style.display = 'none';
			$('samei').style.display = 'block';
			$('consecutive').style.display = 'none';
			$('accompany').style.display = 'none';
			$('exhibition').style.display = 'none';
			$('guides').style.display = 'none';
			break;
			
		case '交传':
			$('interdes').style.display = 'none';
			$('samei').style.display = 'none';
			$('consecutive').style.display = 'block';
			$('accompany').style.display = 'none';
			$('exhibition').style.display = 'none';
			$('guides').style.display = 'none';
			break;	
			
		case '陪同':
			$('interdes').style.display = 'none';
			$('samei').style.display = 'none';
			$('consecutive').style.display = 'none';
			$('accompany').style.display = 'block';
			$('exhibition').style.display = 'none';
			$('guides').style.display = 'none';
			break;	
			
		case '展会':
			$('interdes').style.display = 'none';
			$('samei').style.display = 'none';
			$('consecutive').style.display = 'none';
			$('accompany').style.display = 'none';
			$('exhibition').style.display = 'block';
			$('guides').style.display = 'none';
			break;	
			
		case '导游':
			$('interdes').style.display = 'none';
			$('samei').style.display = 'none';
			$('consecutive').style.display = 'none';
			$('accompany').style.display = 'none';
			$('exhibition').style.display = 'none';
			$('guides').style.display = 'block';
			break;	
			
	default:
			$('interdes').style.display = 'block';
			$('samei').style.display = 'none';
			$('consecutive').style.display = 'none';
			$('accompany').style.display = 'none';
			$('exhibition').style.display = 'none';
			$('guides').style.display = 'none';
			break;	
	
	}
}

function cancelSub(prefix, type, id){
 var parentname, subname, startname, endname;
 
  switch (type) {
    case 'subfield':
      parentname = prefix + 'fields[]';
      subname = prefix + 'subfields[]';
			startname = prefix +'subfields' + id +'_1';
			endname = prefix +'subfields' + id +'_2';
      break;

    case 'substyle':
      parentname = prefix + 'styles[]';
      subname = prefix + 'substyles[]';
			startname = prefix +'substyles' + id +'_1';
			endname = prefix +'substyles' + id +'_2';
      break;
   
    case 'subcategorie':
      parentname = prefix + 'categories[]';
			subname = prefix +'subcategorie[]';
			startname = prefix +'subcategorie' + id +'_1';
			endname = prefix +'subcategorie' + id +'_2';
      break;

    default:
      return;
  }

	var checked
	var checkboxs = document.getElementsByName(parentname);
  for (var i=0; i < checkboxs.length; i++) { 
    if (checkboxs[i].value == id) {
    	 checked = $(checkboxs[i]).checked;
			 break;
		}
	}
	
	var startid = $(startname).value; 
	var endid = $(endname).value;

  if (checked == false) {   
	  if (subname != null) {
      checkboxs = document.getElementsByName(subname);
      for (i = startid; i < endid; i++) {
				try {
	       checkboxs[i].checked = false;
				}catch(e){}
      }
		}
  } else{
		if (subname != null) {
      checkboxs = document.getElementsByName(subname);
      for (i = startid; i < endid; i++) {
				try {
	       checkboxs[i].checked = true;
				}catch(e){}
      }
		}
	}
}

