
var outputFileName = "Case_Data.xml";
var pounds = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var pence = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
window.onload = (event) => {
	document.getElementById("caseForm").reset();
};
function formToXml(form){
	var eValue, eType, eName, newEle, newText;
	var xmlString = "<case></case>";
	var parser = new DOMParser();
	var xmlDoc = parser.parseFromString(xmlString, "text/xml"); //important to use "text/xml"
	
	var inputs=form.elements;

	for(var i=0;i<inputs.length;i++){
		if (inputs[i].name){
			eValue = inputs[i].value;
			eType = inputs[i].type;
			eName = inputs[i].name;
			if(eType == "radio"){
				if(!document.getElementById(inputs[i].id).checked){
					eValue = ""; 
				}
			}else if(eType == "text"){
				// eValue need no intervention at the moment
			}else if(eType == "textarea"){
				// eValue need no intervention at the moment
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
	var s = new XMLSerializer();
	var str = s.serializeToString(xmlDoc);
	dataDownload(str);
	form.reset();
}
function dataDownload(xmlString) {
	var filename = document.getElementById("CaseDataFileName").value + ".xml";// ToDo: check validity of file name
	if(filename == ""){
		filename = outputFileName;
	}
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
	var str = "input[id=" + buttonId + "]"; // id of input button
	var file = document.querySelector(str).files[0];
	outputFileName = file.name;
	outputFileName = outputFileName.replace(/\.[^/.]+$/, "");
	var reader = new FileReader();
	reader.addEventListener("load", function () {
		xmlToForm(form,reader.result);
	}, false);
	if (file) {
		reader.readAsText(file);
	}
}
function xmlToForm(form,xmlString){
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
				// no action at the moment
			}else if(fields[i].type == "textarea"){
				// no action at the moment
			}else{
				continue; // only fill a field if there is a corresponding data element in the XML file
			}
		}
		fields[i].value = getXmlTextNode(xmlDoc,fields[i].name);
	}
	setCypherState(); // The Security status element has been updated, use it to set readonly status and display correct button
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
//Functions for test2. Called by 'onchange' in Pounds and Pence input elements. Values are converted to pence on input
function totUpMaterials(index,coin,eleValue){
	if(coin == "pounds"){
		pounds[index] = 100 * Number(eleValue);
	}else{
		pence[index] =  Number(eleValue);
	}
	var total = pounds.reduce((a, b) => a + b);
	total += pence.reduce((a, b) => a + b);
	document.getElementById("engineerMaterialsTotalPounds").value = Math.floor(total/100);
	document.getElementById("engineerMaterialsTotalPence").value = total%100;
}
function newItem(index){
	index++;
	var strIndex = "li_" + index.toString();
	document.getElementById(strIndex).style.display = "block";
}
//Functions for test1.
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
	console.log(res);
	window.location.assign(res);

}
//Functions for test3.
function code(sec,encode){
	var key = document.getElementById("pwd").value;
	var encoded = document.getElementById("encoded").value;
	if(key.length < 8){return;}
	var res = "";
	var inputs = sec.elements;
	for(var i=0;i < inputs.length;i++){
		var str = inputs[i].name;
		if(str){
			if(str.search("_cipher") != -1){
				res = inputs[i].value;
				if(res == ""){continue;}
				if(encode == "true"){
					var encrypted = CryptoJS.AES.encrypt(res, key);
					inputs[i].value = encrypted;
					inputs[i].disabled = true;
				}else{
					var decrypted = CryptoJS.AES.decrypt(res, key);
					if(decrypted == ""){return;}
					inputs[i].value = decrypted.toString(CryptoJS.enc.Utf8);
					inputs[i].disabled = false;
				}
			}
		}
	}
	//data has been encoded or decoded without error
	if(encode == "true"){
		document.getElementById("encoded").value ="Secure";
		
	}else{
		document.getElementById("encoded").value = "Unsecure";
	}
	setCypherState();
}
function setCypherState(){
	var state = document.getElementById("encoded").value;
	if(state == "Secure"){
		document.getElementById("encode").style.display = "none";
		document.getElementById("decode").style.display = "block";
	}else{
		document.getElementById("encode").style.display = "block";
		document.getElementById("decode").style.display = "none";
	}
}

