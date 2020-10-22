// decodePwd newPwd confirmPwd decode(this.form) encode(this.form) li_decodePassword li_encodePassword
var userPassword = "";

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
}
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
			}else if(eType == "checkbox"){
				if(!document.getElementById(inputs[i].id).checked){
					eValue = "";
				}
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
//	var filename = document.getElementById("CaseDataFileName").value + ".xml";// ToDo: check validity of file name
//	if(filename == ""){
		var filename = "referral.xml";
//	}
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
	var outputFileName;
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
				fields[i].value = getXmlTextNode(xmlDoc,fields[i].name);
			}else if(fields[i].type == "textarea"){
				fields[i].value = getXmlTextNode(xmlDoc,fields[i].name);
			}else if(fields[i].type == "checkbox"){// not needed, same logic as radio but might change
				if(fields[i].value == getXmlTextNode(xmlDoc,fields[i].name)){
					fields[i].checked = true;
				}else{
					fields[i].checked = false;
				}
			}
		}
	}
	if(	document.getElementById("encoded").value == "Secure"){
		document.getElementById("li_decodePassword").style.display = "block";
		document.getElementById("li_encodePassword").style.display = "none";
	}
	displayMaterials();
}
function locationreload(){ 
	location.reload(); 
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
//		console.log(document.getElementById(inputId0).value,document.getElementById(inputId1).value,document.getElementById(inputId2).value,);
		if(document.getElementById(inputId0).value != ""){found = true;}
		if(document.getElementById(inputId1).value != ""){found = true;}
		if(document.getElementById(inputId2).value != ""){found = true;}
		if(found == true){
			var liId = "li_" + i.toString();
			document.getElementById(liId).style.display = "block";
		}
	}
}



