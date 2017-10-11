function loadJs(){
	if(window.jsLoaded){
		return false;
	}
	var baseIncude = '';
	baseIncude += '<meta charset="UTF-8">';
	baseIncude += '<script type="text/javascript" src="' + jsPath + '/jquery-1.9.1.js"></script>';
	baseIncude += '<link rel="stylesheet" type="text/css" href="' + easyUiPath + '/themes/default/easyui.css">';
	baseIncude += '<link rel="stylesheet" type="text/css" href="' + easyUiPath + '/themes/icon.css">';
	baseIncude += '<link rel="stylesheet" type="text/css" href="' + easyUiPath + '/themes/color.css">';
	baseIncude += '<script type="text/javascript" src="' + easyUiPath + '/jquery.easyui.min.js"></script>';
	baseIncude += '<script type="text/javascript" src="' + easyUiPath + '/locale/easyui-lang-zh_CN.js"></script>';
	baseIncude += '<script type="text/javascript" src="' + jsPath + '/jquery.easyui.extends.js"></script>';
	baseIncude += '<link rel="stylesheet" type="text/css" href="' + cssPath + '/style.css">';
	document.write(baseIncude);
	window.jsLoaded = true;
}
loadJs();