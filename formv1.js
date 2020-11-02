var htmlHeader = "<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">\n" +
"<html xmlns=\"http://www.w3.org/1999/xhtml\">\n"+
"<head>\n" +
"<meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\">\n"+
"<link rel=\"stylesheet\" type=\"text/css\" href=\"https://oldshell.github.io/Static-Page-Form/reportView.css\" media=\"all\">\n"+
"<title>Test Report Sheet</title>\n"+
"</head>\n"+
"<body id=\"main_body\" >\n"+
"<fieldset disabled=\"disabled\">";
var html = "";
var userPassword = "";
var thisFileName = "referral";

window.onload = (event) => {
	document.getElementById("caseForm").reset();//clear the form
	document.getElementById("li_decodePassword").style.display = "none"; // hide the unscramble option, nothing to descramble

};
function saveData(form){
	if(document.getElementById("encoded").value == "Unsecure"){ // re-scramble if there is a password
		if(userPassword != ""){
			// encode the data
			encodeWithPwd(form,userPassword);
		}
	}
	formToXml(form);
	return false; //return false to the HTML from element. Important for the form, as it is working in the normal way.
}
function NoPwd(form){// by clearing the password, data will not be re-scrambled when it is saved.
	if(document.getElementById("encoded").value == "Secure"){ // Don't do it if data is currently scrambled.
		return;
	}
	userPassword = "";

}
//Creates the string 'xmlString' with the input values within XML tags that get their names from the element's name.
// Also updates the outerHTML with the input values. The form's outerHTML goes to the string'outerInputs'.
// 'outerInputs' and 'xmlString' are combined and put to file to create a static HTML page with the XML data embedded.

function formToXml(form){
	var eValue, eType, eName, newEle, newText, i;
	var xmlString = "<case></case>"; // case is the parent node and all the form inputs are added as children of case.
	var parser = new DOMParser();
	var xmlDoc = parser.parseFromString(xmlString, "text/xml"); //important to use "text/xml"
	var inputs=form.elements; //Array of all the form elements as objects.
	for(i=0;i<inputs.length;i++){
		if (inputs[i].name){ // only look at elements with names
			eValue = inputs[i].value; // The text the user entered
			eType = inputs[i].type; // text, radio button, checkbox, text area. all are treated differently
			eName = inputs[i].name; // The question, used to create the enclosing tabs around the users input in the XML file
			if(eType == "radio"){
				if(!document.getElementById(inputs[i].id).checked){ // don't create a XML child if not checked
					eValue = ""; 
				}else{
					str = inputs[i].outerHTML; //Update element's outerHTML 
					str = str.replace("type=\"radio\" ", "type=\"radio\" checked=\"true\" ");
					inputs[i].outerHTML = str;
				}
			}else if(eType == "text"){ // create XML child as is, no need to process the data from the element
				str = inputs[i].outerHTML;//Update element's outerHTML
				str = str.replace("value=\"\"","value=\"" + eValue + "\"");
				inputs[i].outerHTML = str;
			}else if(eType == "textarea"){// create XML child as is, no need to process the data from the element
				str = inputs[i].outerHTML;
				str = str.replace("</textarea>", eValue + "</textarea>");
				inputs[i].outerHTML = str;
			}else if(eType == "checkbox"){ // process as for type == radio
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
			// add child
			newEle = xmlDoc.createElement(eName);
			newText = xmlDoc.createTextNode(eValue);
			newEle.appendChild(newText);
			xmlDoc.getElementsByTagName("case")[0].appendChild(newEle);
		}
	}
	// put XML to string
	var serialXml = new XMLSerializer();
	var strXml = serialXml.serializeToString(xmlDoc);
	// build the complete HTML script for the HTML document. The outerHTML has been updated by the section above so that the
	// the original "value = "" now has data it it and is looks something like value = "Peppa". htmlHeader is a string holding
	// the section before the form element. form_container is the form element. The open and save buttons are within the form,
	// they are not needed and are hidden. The last few bits are then added including the XML tags containing the 
	// form data in a machine readable form.
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

function dataDownload(xmlString) { //put a string to file
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
function xmlToForm(form,xmlString){// File has arrived. parse the file and put the data into the form
	//extract the xml data.
	var xmlStart = xmlString.indexOf("<xml>");
	var xmlEnd = xmlString.lastIndexOf("</xml>");
	xmlString = xmlString.slice(xmlStart + 5,xmlEnd);
	var i, x, y;
	var parser = new DOMParser();
	var xmlDoc = parser.parseFromString(xmlString,"text/xml"); //important to use "text/xml"
	var fields= form.elements; // get the form elements and search the XML data for a match
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
	//fields are now populated, if data is Secure (scrambled) then display decode button and hide encode button
	if(	document.getElementById("encoded").value == "Secure"){
		document.getElementById("li_decodePassword").style.display = "block";
		document.getElementById("li_encodePassword").style.display = "none";
	}// update the form, misc actions.
	document.getElementById("rscn").innerHTML = "Case Number: " + document.getElementById("admin_case_number").value;
	document.getElementById("escn").innerHTML = "Case Number: " + document.getElementById("admin_case_number").value;
	displayMaterials();
}

function locationReload(){ // reset the form 
	location.reload();
	return false;
} 
function getXmlTextNode(xmlDoc,tag){ // Search the XML data for a given tag and return the data within if it exists.
	var x, y;
	x = xmlDoc.getElementsByTagName(tag)[0];
	if(x){
		y = x.childNodes[0]; //y = the node inside the tags
		return y.nodeValue; // it's text
	}
	return "";
}
function totUpMaterials(index,coin,eleValue){ // todo: index,coin,eleValue not used, needs sorting.
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
function newItem(index){ // used to grow the materials list todo the whole idea needs sorting, is it worth the fuss.
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
	//window.location.assign(res);
   window.open(res, '_blank');
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
			if(str.search("_cipher") != -1){ // unscramble all the element with a name that end with "_cipher"
				res = inputs[i].value;
				if(res == ""){continue;}
				var decrypted = CryptoJS.AES.decrypt(res, key);
				if(decrypted == ""){return;}
				inputs[i].value = decrypted.toString(CryptoJS.enc.Utf8);
				inputs[i].disabled = false; // let user edit unscrambled text
			}
		}
	}
	//data has been decoded without error
	document.getElementById("encoded").value = "Unsecure";
	document.getElementById("li_decodePassword").style.display = "none";
	document.getElementById("li_encodePassword").style.display = "block";
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
function encodeWithPwd(form,key){ // see decode function for comments
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
	document.getElementById("li_decodePassword").style.display = "block";
	document.getElementById("li_encodePassword").style.display = "none";
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
//		window.location.assign(document.getElementById("eng_project_url").value);
    window.open(document.getElementById("eng_project_url").value, '_blank');
}
function validateEmail(field) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if(re.test(String(field.value).toLowerCase())){
		field.setCustomValidity("");
	}else{
		field.setCustomValidity("Invalid field.");
	}
}



