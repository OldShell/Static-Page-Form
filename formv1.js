var htmlHeader = "<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">\n" +
"<html xmlns=\"http://www.w3.org/1999/xhtml\">\n"+
"<head>\n" +
"<meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\">\n"+
"<link rel=\"stylesheet\" type=\"text/css\" href=\"https://oldshell.github.io/Static-Page-Form/reportView.css\" media=\"all\">\n"+
"<title>Static Report Test Sheet</title>\n"+
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



