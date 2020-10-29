var htmlHeader = "<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">\n" +
"<html xmlns=\"http://www.w3.org/1999/xhtml\">\n"+
"<head>\n" +
"<meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\">\n"+
"https://oldshell.github.io/Static-Page-Form/\n"+
"<title>Static Report Test Sheet</title>\n"+
"<style>\n"+
"body{background:#dddddd;font-family:\"Lucida Grande\", Tahoma, Arial, Verdana, sans-serif;	font-size:small;margin:8px 0 16px;text-align:center;}\n"+
"#form_container{background:#fff;margin:0 auto;text-align:left;width:640px;}\n"+
"#top{	display:block;	height:10px;	margin:10px auto 0;	width:650px;}\n"+
"#footer{	width:640px;	clear:both;	color:#999999;	text-align:center;	width:640px;	padding-bottom: 15px;	font-size: 85%;}\n"+
"#footer a{	color:#999999;	text-decoration: none;	border-bottom: 1px dotted #999999;}\n"+
"#bottom{	display:block;	height:10px;	margin:0 auto;	width:650px;}\n"+
"form.appnitro{	margin:20px 20px 0;	padding:0 0 20px;}\n"+
"h1{	background-color:#6699CC;	margin:0;	min-height:0;	padding:0;	text-decoration:none;	text-indent:-8000px;	}\n"+
"h1 a{		display:block;	height:100%;	min-height:40px;	overflow:hidden;}\n"+
"img{	behavior:url(css/iepngfix.htc);	border:none;}\n"+
".appnitro{	font-family:Lucida Grande, Tahoma, Arial, Verdana, sans-serif;	font-size:small;}\n"+
".appnitro li{	width:61%;}\n"+
"form ul{	font-size:100%;	list-style-type:none;	margin:0;	padding:0;	width:100%;}\n"+
"form li{	display:block;	margin:0;	padding:4px 5px 2px 9px;	position:relative;}\n"+
"form li:after{	clear:both;	content:\".\";	display:block;	height:0;	visibility:hidden;}\n"+
".buttons:after{	clear:both;	content:\".\";	display:block;	height:0;	visibility:hidden;}\n"+
".buttons{	clear:both;	display:block;	margin-top:10px;}\n"+
"* html form li{	height:1%;}\n"+
"* html .buttons{	height:1%;}\n"+
"* html form li div{	display:inline-block;}\n"+
"form li div{	color:#444;	margin:0 4px 0 0;	padding:0 0 8px;}\n"+
"form li span{	color:#444;	float:left;	margin:0 4px 0 0;	padding:0 0 8px;}\n"+
"form li div.left{	display:inline;	float:left;	width:48%;}\n"+
"form li div.right{	display:inline;	float:right;	width:48%;}\n"+
"form li div.left .medium{	width:100%;}\n"+
"form li div.right .medium{	width:100%;}\n"+
".clear{	clear:both;}\n"+
"form li div label{	clear:both;	color:#444;	display:block;	font-size:9px;	line-height:9px;	margin:0;	padding-top:3px;}\n"+
"form li span label{	clear:both;	color:#444;	display:block;	font-size:9px;	line-height:9px;	margin:0;	padding-top:3px;}\n"+
"form li .datepicker{	cursor:pointer !important;	float:left;	height:16px;	margin:.1em 5px 0 0;	padding:0;	width:16px;}\n"+
".form_description{	border-bottom:1px dotted #ccc;	clear:both;	display:inline-block;	margin:0 0 1em;}\n"+
".form_description[class]{	display:block;}\n"+
".form_description h2{	clear:left;	font-size:160%;	font-weight:400;	margin:0 0 3px;}\n"+
".form_description p{	font-size:95%;	line-height:130%;	margin:0 0 12px;}\n"+
"form hr{	display:none;}\n"+
"form li.section_break{	border-top:1px dotted #111;	margin-top:9px;	padding-bottom:0;	padding-left:9px;	padding-top:13px;	width:97% !important;}\n"+
"form ul li.first{	border-top:none !important;	margin-top:0 !important;	padding-top:0 !important;}\n"+
"form .section_break h3{	font-size:150%;	font-weight:400;	line-height:130%;	margin:0 0 2px;}\n"+
"form .section_break p{	font-size:85%;	margin:0 0 10px;}\n"+
"input.button_text{	overflow:visible;	padding:0 7px;	width:auto;}\n"+
".buttons input{	font-size:120%;	margin-right:5px;}\n"+
"label.description{	border:none;	color:#222;	display:block;	font-size:95%;	font-weight:700;	line-height:150%;	padding:0 0 1px;}\n"+
"span.symbol{	font-size:115%;	line-height:130%;}\n"+
"input.text{	background:#fff url(../../../images/shadow.gif) repeat-x top;	border-bottom:1px solid #ddd;	border-left:1px solid #c3c3c3;	border-right:1px solid #c3c3c3;	border-top:1px solid #7c7c7c;	color:#333;	font-size:100%;	margin:0;	padding:2px 0;}\n"+
"input.file{	color:#333;	font-size:100%;	margin:0;	padding:2px 0;}\n"+
"textarea.textarea{	background:#fff url(../../../images/shadow.gif) repeat-x top;	border-bottom:1px solid #ddd;	border-left:1px solid #c3c3c3;	border-right:1px solid #c3c3c3;	border-top:1px solid #7c7c7c;	color:#333;	font-family:\"Lucida Grande\", Tahoma, Arial, Verdana, sans-serif;	font-size:100%;	margin:0;	width:99%;}\n"+
"select.select{	color:#333;	font-size:100%;	margin:1px 0;	padding:1px 0 0;	background:#fff url(../../../images/shadow.gif) repeat-x top;	border-bottom:1px solid #ddd;	border-left:1px solid #c3c3c3;	border-right:1px solid #c3c3c3;	border-top:1px solid #7c7c7c;}\n"+
"input.currency{	text-align:right;}\n"+
"input.checkbox{	display:block;	height:13px;	line-height:1.4em;	margin:6px 0 0 3px;	width:13px;}\n"+
"input.radio{	display:block;	height:13px;	line-height:1.4em;	margin:6px 0 0 3px;	width:13px;}\n"+
"label.choice{	color:#444;	display:block;	font-size:100%;	line-height:1.4em;	margin:-1.55em 0 0 25px;	padding:4px 0 5px;	width:90%;}\n"+
"select.select[class]{	margin:0;	padding:1px 0;}\n"+
"*:first-child+html select.select[class]{	margin:1px 0;}\n"+
".safari select.select{	font-size:120% !important;	margin-bottom:1px;}\n"+
"input.small{	width:25%;}\n"+
"select.small{	width:25%;}\n"+
"input.medium{	width:50%;}\n"+
"select.medium{	width:50%;}\n"+
"input.large{	width:99%;}\n"+
"select.large{	width:100%;}\n"+
"textarea.small{	height:5.5em;}\n"+
"textarea.medium{	height:10em;}\n"+
"textarea.large{	height:20em;}\n"+
"#error_message{	background:#fff;	border:1px dotted red;	margin-bottom:1em;	padding-left:0;	padding-right:0;	padding-top:4px;	text-align:center;	width:99%;}\n"+
"#error_message_title{	color:#DF0000;	font-size:125%;	margin:7px 0 5px;	padding:0;}\n"+
"#error_message_desc{	color:#000;	font-size:100%;	margin:0 0 .8em;}\n"+
"#error_message_desc strong{	background-color:#FFDFDF;	color:red;	padding:2px 3px;}\n"+
"form li.error{	background-color:#FFDFDF !important;	border-bottom:1px solid #EACBCC;	border-right:1px solid #EACBCC;	margin:3px 0;}\n"+
"form li.error label{	color:#DF0000 !important;}\n"+
"form p.error{	clear:both;	color:red;	font-size:10px;	font-weight:700;	margin:0 0 5px;}\n"+
"form .required{	color:red;	float:none;	font-weight:700;}\n"+
"form li.highlighted{	background-color:#fff7c0;}\n"+
"form .guidelines{	background:#f5f5f5;	border:1px solid #e6e6e6;	color:#444;	font-size:80%;	left:100%;	line-height:130%;	margin:0 0 0 8px;	padding:8px 10px 9px;	position:absolute;	top:0;	visibility:hidden;	width:42%;	z-index:1000;}\n"+
"form .guidelines small{	font-size:105%;}\n"+
"form li.highlighted .guidelines{	visibility:visible;}\n"+
"form li:hover .guidelines{	visibility:visible;}\n"+
".no_guidelines .guidelines{	display:none !important;}\n"+
".no_guidelines form li{	width:97%;}\n"+
".no_guidelines li.section{	padding-left:9px;}\n"+
".form_success {	clear: both;	margin: 0;	padding: 90px 0pt 100px;	text-align: center}\n"+
".form_success h2 {    clear:left;    font-size:160%;    font-weight:normal;    margin:0pt 0pt 3px;}\n"+
"ul.password{    margin-top:60px;    margin-bottom: 60px;    text-align: center;}\n"+
".password h2{    color:#DF0000;    font-weight:bold;    margin:0pt auto 10px;}\n"+
".password input.text {   font-size:170% !important;   width:380px;   text-align: center;}\n"+
".password label{   display:block;   font-size:120% !important;   padding-top:10px;   font-weight:bold;}\n"+
"#li_captcha{   padding-left: 5px;}\n"+
"#li_captcha span{	float:none;}\n"+
".embed #form_container{	border: none;}\n"+
".embed #top, .embed #bottom, .embed h1{	display: none;}\n"+
".embed #form_container{	width: 100%;}\n"+
".embed #footer{	text-align: left;	padding-left: 10px;	width: 99%;}\n"+
".embed #footer.success{	text-align: center;}\n"+
".embed form.appnitro{	margin:0px 0px 0;}\n"+
"</style>"+
"</head>\n"+
"<body id=\"main_body\" >\n"+
"<fieldset disabled=\"disabled\">";
var html = "";
var userPassword = "";
var thisFileName = "referral";

window.onload = (event) => {
	document.getElementById("caseForm").reset();
	document.getElementById("li_decodePassword").style.display = "none";

};
function saveData(form){
	if(document.getElementById("encoded").value == "Unsecure"){
		if(userPassword != ""){
			// encode the data
			encodeWithPwd(form,userPassword);
		}
	}
	formToXml(form);
	return false;
}
function NoPwd(form){
	if(document.getElementById("encoded").value == "Secure"){
		return;
	}
	userPassword = "";

}
//Creates 'xmlString' with the input values within XML tags that get their names from the element's name.
// Also updates the outerHTML with the input values. The form's outerHTML goes to 'outerInputs' and
// 'outerInputs' and 'xmlString' are combined and put to file to create a static HTML page with the XML data embedded.

function formToXml(form){
	var eValue, eType, eName, newEle, newText, i;
	var xmlString = "<case></case>";
	var parser = new DOMParser();
	var xmlDoc = parser.parseFromString(xmlString, "text/xml"); //important to use "text/xml"
	var inputs=form.elements;
	for(i=0;i<inputs.length;i++){
		if (inputs[i].name){
			eValue = inputs[i].value;
			eType = inputs[i].type;
			eName = inputs[i].name;
			if(eType == "radio"){
				if(!document.getElementById(inputs[i].id).checked){
					eValue = ""; 
				}else{
					str = inputs[i].outerHTML;
					str = str.replace("type=\"radio\" ", "type=\"radio\" checked=\"true\" ");
					inputs[i].outerHTML = str;
				}
			}else if(eType == "text"){
				str = inputs[i].outerHTML;
				str = str.replace("value=\"\"","value=\"" + eValue + "\"");
				inputs[i].outerHTML = str;
			}else if(eType == "textarea"){
				str = inputs[i].outerHTML;
				str = str.replace("</textarea>", eValue + "</textarea>");
				inputs[i].outerHTML = str;
			}else if(eType == "checkbox"){
				if(!document.getElementById(inputs[i].id).checked){
					eValue = "";
				}else{
					str = inputs[i].outerHTML;
					str = str.replace("type=\"checkbox\" ", "type=\"checkbox\" checked=\"true\" ");
					inputs[i].outerHTML = str;
				}
			}else if(eType == "url"){
				str = inputs[i].outerHTML;
				str = str.replace("value=\"\"","value=\"" + eValue + "\"");
				inputs[i].outerHTML = str;
			}else if(eType == "number"){
				str = inputs[i].outerHTML;
				str = str.replace("value=\"\"","value=\"" + eValue + "\"");
				inputs[i].outerHTML = str;
			}else{
				eValue = ""; // all other element types are ignored.
			}
			if(eValue == ""){continue} // at the moment don't create an empty element.
			// add child with text
			newEle = xmlDoc.createElement(eName);
			newText = xmlDoc.createTextNode(eValue);
			newEle.appendChild(newText);
			xmlDoc.getElementsByTagName("case")[0].appendChild(newEle);
		}
	}
	// put XML to string
	var serialXml = new XMLSerializer();
	var strXml = serialXml.serializeToString(xmlDoc);

	var outerInputs = document.getElementById("form_container");	
	html = htmlHeader;
	html += outerInputs.outerHTML;
	html = html.replace("id=\"openFile\"","style=\"display:none;\"");
	html = html.replace("id=\"saveFile\"","style=\"display:none;\"");
	html += "</fieldset>\n"+
	"\n</body>\n"+
	"<xml>"+
	strXml +
	"</xml>\n"+
	"</html>";

	dataDownload(html);
	locationReload();
}

function dataDownload(xmlString) {
		var filename = thisFileName + ".html";
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(xmlString));
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}
// This function takes the data from the uploaded XML file and uses it to fill in the form.
// It requests the file and uses an event listener to process the file when it arrives.
function fromLocalFile(buttonId,textId,form){
	userPassword = "";
	document.getElementById("decodePwd").value = "";
	document.getElementById("confirmPwd").value = "";
	document.getElementById("newPwd").value = "";
	var str = "input[id=" + buttonId + "]"; // id of input button
	var file = document.querySelector(str).files[0];
	thisFileName = file.name;
	thisFileName = thisFileName.replace(/\.[^/.]+$/, "");
	var reader = new FileReader();
	reader.addEventListener("load", function () {
		xmlToForm(form,reader.result);
	}, false);
	if (file) {
		reader.readAsText(file);
	}
}
function xmlToForm(form,xmlString){
	//extract the xml data.
	var xmlStart = xmlString.indexOf("<xml>");
	var xmlEnd = xmlString.lastIndexOf("</xml>");
	xmlString = xmlString.slice(xmlStart + 5,xmlEnd);
	var i, x, y;
	var parser = new DOMParser();
	var xmlDoc = parser.parseFromString(xmlString,"text/xml"); //important to use "text/xml"
	var fields= form.elements;
	for(i=0;i<fields.length;i++){
		if (fields[i].name){
			if(fields[i].type == "radio"){ // Group of radios, makes no difference, each is in the fields array as a separate item
				if(fields[i].value == getXmlTextNode(xmlDoc,fields[i].name)){
					fields[i].checked = true;
				}else{
					fields[i].checked = false;
				}
			}else if(fields[i].type == "text"){
				fields[i].value = getXmlTextNode(xmlDoc,fields[i].name);
			}else if(fields[i].type == "textarea"){
				fields[i].value = getXmlTextNode(xmlDoc,fields[i].name);
			}else if(fields[i].type == "checkbox"){// same logic as radio but might change
				if(fields[i].value == getXmlTextNode(xmlDoc,fields[i].name)){
					fields[i].checked = true;
				}else{
					fields[i].checked = false;
				}
			}else if(fields[i].type == "url"){
				fields[i].value = getXmlTextNode(xmlDoc,fields[i].name);
			}else if(fields[i].type == "number"){
				fields[i].value = getXmlTextNode(xmlDoc,fields[i].name);
			}
		}
	}
	if(	document.getElementById("encoded").value == "Secure"){
		document.getElementById("li_decodePassword").style.display = "block";
		document.getElementById("li_encodePassword").style.display = "none";
	}// update the form, misc actions.
	document.getElementById("rscn").innerHTML = "Case Number: " + document.getElementById("admin_case_number").value;
	document.getElementById("escn").innerHTML = "Case Number: " + document.getElementById("admin_case_number").value;
	displayMaterials();
}

function locationReload(){ 
	location.reload();
	return false;
} 
function getXmlTextNode(xmlDoc,tag){
	var x, y;
	x = xmlDoc.getElementsByTagName(tag)[0];
	if(x){
		y = x.childNodes[0]; //y = the node inside the tags
		return y.nodeValue; // it's text
	}
	return "";
}
function totUpMaterials(index,coin,eleValue){
	var i, pence = 0;
	for(i = 19;i > 0;i--){
		var inputId1 = "eng_materials_" + i.toString() + "_pence";
		var inputId2 = "eng_materials_" + i.toString() + "_pounds";
		pence += Number(document.getElementById(inputId1).value);
		pence += Number(document.getElementById(inputId2).value) * 100;
	}
	document.getElementById("engineerMaterialsTotalPounds").value = Math.floor(pence/100);
	document.getElementById("engineerMaterialsTotalPence").value = pence%100;
}
function newItem(index){
	index++;
	var strIndex = "li_" + index.toString();
	document.getElementById(strIndex).style.display = "block";
}
function getMap(sec){
	var res = "";
	var inputs = sec.elements;
	for(var i=0;i < inputs.length;i++){
		var str = inputs[i].name;
		if(str){
			if(!str.search("client_address")){
				res += inputs[i].value +" ";
			}
		}
	}
	res = res.trim();
	res = encodeURI(res);
	res = "https://www.google.com/maps/dir/?api=1&destination=" + res + "&travelmode=driving";
	window.location.assign(res);
}
function decodeBits(form){
	var key = document.getElementById("decodePwd").value;
	if(key.length < 8){return;}
	userPassword = key;
	var res = "";
	var inputs = form.elements;
	for(var i=0;i < inputs.length;i++){
		var str = inputs[i].name;
		if(str){
			if(str.search("_cipher") != -1){
				res = inputs[i].value;
				if(res == ""){continue;}
				var decrypted = CryptoJS.AES.decrypt(res, key);
				if(decrypted == ""){return;}
				inputs[i].value = decrypted.toString(CryptoJS.enc.Utf8);
				inputs[i].disabled = false;
			}
		}
	}
	//data has been decoded without error
	document.getElementById("encoded").value = "Unsecure";
	document.getElementById("li_decodePassword").style.display = "none";
}
function encodeBits(form){
	var key = document.getElementById("newPwd").value;
	var keyCon = document.getElementById("confirmPwd").value;
	if(key != keyCon){
		document.getElementById("pwd_input_Status").innerHTML = "ERROR: Not the same";
		document.getElementById("pwd_input_Status").style.color = "red";
		return;
	}
	if(key.length < 8){
		document.getElementById("pwd_input_Status").innerHTML = "ERROR: To short";
		document.getElementById("pwd_input_Status").style.color = "red";
		return;
	}
	document.getElementById("pwd_input_Status").innerHTML = "Password: OK";
	userPassword = key;
	document.getElementById("pwd_input_Status").style.color = "black";
	encodeWithPwd(form,key);
}
function encodeWithPwd(form,key){
	var res = "";
	var inputs = form.elements;
	for(var i=0;i < inputs.length;i++){
		var str = inputs[i].name;
		if(str){
			if(str.search("_cipher") != -1){
				res = inputs[i].value;
				if(res == ""){continue;}
				var encrypted = CryptoJS.AES.encrypt(res, key);
				inputs[i].value = encrypted;
				inputs[i].disabled = true; // prevent user from corrupting the encrypted data
			}
		}
	}
	//data has been encoded without error
	document.getElementById("encoded").value ="Secure";
}
function displayMaterials(form){
	var i,found = false;
	for(i = 19;i > 1;i--){
		var inputId0 = "eng_materials_" + i.toString();
		var inputId1 = "eng_materials_" + i.toString() + "_pence";
		var inputId2 = "eng_materials_" + i.toString() + "_pounds";
		if(document.getElementById(inputId0).value != ""){found = true;}
		if(document.getElementById(inputId1).value != ""){found = true;}
		if(document.getElementById(inputId2).value != ""){found = true;}
		if(found == true){
			var liId = "li_" + i.toString();
			document.getElementById(liId).style.display = "block";
		}
	}
}
function linkToSolution(form){
		window.location.assign(document.getElementById("eng_project_url").value);
}
function validateEmail(field) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if(re.test(String(field.value).toLowerCase())){
		field.setCustomValidity("");
	}else{
		field.setCustomValidity("Invalid field.");
	}
}



