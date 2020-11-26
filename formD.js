"use strict";
var inFilename = "Default Report Name";
var userPassword = "";
var xmlDoc;
window.onload = (event) => {
	document.getElementById("caseForm").reset();//clear the form
	initForm();
};
function initForm(){
	updateDisplay();
}
function fromLocalFile(buttonId,form){
	var str = "input[id=" + buttonId + "]"; // id of input button
	var file = document.querySelector(str).files[0];
	inFilename = file.name;
	inFilename = inFilename.replace(/\.[^/.]+$/, "");
	var reader = new FileReader();
	reader.addEventListener("load", function () {
		xmlToForm(form,reader.result);
	}, false);
	if (file) {
		reader.readAsText(file);
	}
}
function xmlToForm(form,xmlString){// File has arrived. parse the file and put the data into the form
	initForm();
	//extract the xml data.
	var xmlStart = xmlString.indexOf("<case>");
	var xmlEnd = xmlString.lastIndexOf("</case>");
	xmlString = xmlString.slice(xmlStart,xmlEnd + 7);
	var i, x, y, t;
	var parser = new DOMParser();
	var xmlDoc = parser.parseFromString(xmlString,"text/xml"); //important to use "text/xml"
	var fields= form.elements; // get the form elements and search the XML data for a match
	for(i=0;i<fields.length;i++){
		if (fields[i].name){
			t = fields[i].type;
			if(t == "radio" || t == "checkbox"){ // Group of radios, makes no difference, each is in the fields array as a separate item
				if(fields[i].value == getXmlTextNode(xmlDoc,fields[i].name)){
					fields[i].checked = true;
				}else{
					fields[i].checked = false;
				}
			}else if(t == "text"||t == "textarea"||t == "url"||t == "number"||t == "email"||t == "date"){
				fields[i].value = getXmlTextNode(xmlDoc,fields[i].name);
			}
		}
	}
	updateDisplay();
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
function decodeForm(form){
	var key = document.getElementById("cpw").value;
	if(key.length < 8){
		document.getElementById("cvm").value = "PWD to short";
		return;
	}
	if(decodeF(form,key)){
		userPassword = key;
		document.getElementById("encoded").value = "Unsecure";
		document.getElementById("cvm").value = "";
		updateDisplay();
	}else{
		document.getElementById("cvm").value = "PWD incorrect";
	}
}
function decodeF(form,key){
		var formV = "";
	var inputs = form.elements;
	for(var i=0;i < inputs.length;i++){
		var str = inputs[i].name;
		if(str){
			if(str.search("_cipher") != -1){ // unscramble all the element with a name that end with "_cipher"
				formV = inputs[i].value;
				if(formV == ""){continue;}
				var decrypted = CryptoJS.AES.decrypt(formV, key);
				if(decrypted == ""){return false;}
				inputs[i].value = decrypted.toString(CryptoJS.enc.Utf8);
				inputs[i].disabled = false; // let user edit unscrambled text
			}
		}
	}
	return true;
}
function encodeForm(form){ // Event: Encode Apply button
	//get passwords
	var key = document.getElementById("npw").value;
	var keyCon = document.getElementById("ccpw").value;
	if(key != keyCon){
		document.getElementById("csm").value = "PWDs are not the same";
		return;
	}
	if(key.length < 8){
		document.getElementById("csm").value = "PWD to short";
		return;
	}
	document.getElementById("csm").value = "PWD is OK";
	userPassword = key;
	encodeF(form,key);
	updateDisplay();

}
function encodeF(form,key){
	var formV = "";
	var inputs = form.elements;
	for(var i=0;i < inputs.length;i++){
		var str = inputs[i].name;
		if(str){
			if(str.search("_cipher") != -1){
				inputs[i].style.background = "black";
				inputs[i].disabled = true; // prevent user from corrupting the encrypted data
				formV = inputs[i].value;
				if(formV == ""){continue;}
				var encrypted = CryptoJS.AES.encrypt(formV, key);
				inputs[i].value = encrypted;
				inputs[i].disabled = true; // prevent user from corrupting the encrypted data
			}
		}
	}
	document.getElementById("encoded").value = "Secure";
	return true;
}

function redact(colour,able){
	var form = document.getElementById("caseForm");
	var formV = "";
	var inputs = form.elements;
	for(var i=0;i < inputs.length;i++){
		var str = inputs[i].name;
		if(str){
			if(str.search("_cipher") != -1){
				inputs[i].style.background = colour;
				inputs[i].disabled = able; // prevent user from corrupting the encrypted data
			}
		}
	}
}

function removePwd(form){
	var key = userPassword;
	if(document.getElementById("encoded").value == "Secure"){ // needs decoding
		if(userPassword == ""){ // user has not entered password to encode or encode/decode.
			// get password
			key = document.getElementById("pw").value;
			if(key.length < 8){
				document.getElementById("sm").value = "PWD to short";
				return;
			}
		}
		if(!decodeF(form,key)){
			document.getElementById("sm").value = "PWD incorrect";
			return;
		} // data successfully decoded
		document.getElementById("encoded").value = "Unsecure"
	}
	userPassword = "";//if userPassword is not"" then data will be re-encoded on 'Generate report'
	document.getElementById("sm").value = "";
	updateDisplay();
}

function updateDisplay(){
	// show which fields are encoded
		var codeState = document.getElementById("encoded").value;
		if(codeState == "Secure"){
			redact("black",true);
		}else{
			redact("#f8f8f8",false);
		}
	// if data is Secure then display decode button and hide encode button
	if(	codeState == "Secure"&& userPassword != ""){//User has encoded the data
		document.getElementById("decode").style.display = "block";
		document.getElementById("encode").style.display = "none";
		document.getElementById("removePwd").style.display = "block";
	}else if(codeState == "Secure"&& userPassword == ""){// loaded secure data from file
		document.getElementById("decode").style.display = "block";
		document.getElementById("encode").style.display = "none";
		document.getElementById("removePwd").style.display = "block";
	}else if(codeState == "Unsecure"&& userPassword != ""){// User has decoded the data
		document.getElementById("decode").style.display = "none";
		document.getElementById("encode").style.display = "none";
		document.getElementById("removePwd").style.display = "block";
	}else if(codeState == "Unsecure"&& userPassword == ""){// user has typed or loaded unsecure data
		document.getElementById("decode").style.display = "none";
		document.getElementById("encode").style.display = "block";
		document.getElementById("removePwd").style.display = "none";
	}
}
function testUrl(){
	window.open(document.getElementById("project_url").value, '_blank');
}
function totUp(){
	var i = 0, pence = 0;
	var T = document.getElementById("tableM");
	var maxRows = T.rows.length; // the .children[0] bit is the <input> element in the cell
	for(i = 1;i < maxRows-2;i++){ // range exclude the top row of column header text and the bottom two rows; total text and totals
		pence += Number(T.rows[i].cells[2].children[0].value); // pence
		pence += Number(T.rows[i].cells[1].children[0].value * 100); // Pounds
	}
	T.rows[maxRows-1].cells[1].children[0].value = Math.floor(pence/100); // input in Cell = Total Pounds
	T.rows[maxRows-1].cells[2].children[0].value = pence%100;// input in Cell = Total Pence
}


function formToXml(form){
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
	var t, v, newEle, newText;
	var xmlString = "<case></case>";
	var parser = new DOMParser();
	xmlDoc = parser.parseFromString(xmlString, "text/xml"); //important to use "text/xml"
	
	var inputs=form.elements;

	for(var i=0;i<inputs.length;i++){
		if(inputs[i].name && inputs[i].value){
			t = inputs[i].type;
			if(t == "text"||t == "textarea"||t == "url"||t == "number"||t == "email"||t == "radio"||t == "checkbox"||t == "date"){
				if(t == "datexxxxxx"){
					const HTMLDate = inputs[i].valueAsDate; // HTML format is yyyy-mm-dd, change it to local format
					v = HTMLDate.toLocaleDateString(undefined, options);
				}else{
					v = inputs[i].value;
				}
				if(t == "radio"||t == "checkbox"){ // skip it if is not checked
					if(!inputs[i].checked){
						continue; 
					}
				}
				// add child with text
				newEle = xmlDoc.createElement(inputs[i].name);
				newText = xmlDoc.createTextNode(v);
				newEle.appendChild(newText);
				xmlDoc.getElementsByTagName("case")[0].appendChild(newEle);
			}
		}
	}
}

function dataDownload(xmlString) { //put a string to file
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(xmlString));
  element.setAttribute('download', inFilename + ".html");
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}
function gtn(tag){ // Search the XML data for a given tag and return the data within if it exists.
	var x, y;
	x = xmlDoc.getElementsByTagName(tag)[0];
	if(x){
		y = x.childNodes[0]; //y = the node inside the tags
		return y.nodeValue; // return the text in the node
	}
	return "..."; // else return an indicator to the user that there is no data for the given field
}
function saveData(form){

	if(document.getElementById("encoded").value == "Unsecure"){ // re-scramble if there is a password
		if(userPassword != ""){
			// encode the data
			encodeF(form,userPassword);
		}
	}
	formToXml(form); // load global variable xmlDoc with data from the form.
	var serialXml = new XMLSerializer();
	var strXml = serialXml.serializeToString(xmlDoc);
	dataDownload(genReport(strXml));
	form.reset();
	return false; //return false to the HTML from element. Important for the form, as it is working in the normal way.
}

