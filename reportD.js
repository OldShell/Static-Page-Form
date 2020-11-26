//version 3 used as template in form 3
"use strict";
//var userPassword = "";
var xmlDoc;
window.onload = (event) => {
	//extract the xml data that is embedded in the HTML file in a P element.
	var xmlString = document.getElementById("xmlData").innerHTML;
	var parser = new DOMParser();
	xmlDoc = parser.parseFromString(xmlString,"text/xml"); //important to use "text/xml"
	xmlToForm();
	updateDisplay();
};
function gtn(tag){ // Get Text Node. Search the XML data for a given tag and return the data within if it exists.
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
	}else if(decodeF(key)){
		document.getElementById("cvm").value = "";
		xmlToForm();
		updateDisplay();
	}else{
		document.getElementById("cvm").value = "PWD incorrect";
	}
}

function decodeF(key){
	var xmlList = xmlDoc.getElementsByTagName("case")[0].childNodes;
	for(var i=0;i<xmlList.length;i++){
		var tag = xmlList[i].tagName;
		if(tag.search("_cipher") != -1){
			//found a ciphered node
			var y = xmlList[i].childNodes[0]; //y = the node inside the tags
			var xy = y.nodeValue; // it's text
			var decrypted = CryptoJS.AES.decrypt(xy, key);
			if(decrypted == ""){return false;}
			y.nodeValue = decrypted.toString(CryptoJS.enc.Utf8);
		}else if(tag == "encoded"){
			xmlList[i].childNodes[0].nodeValue = "Unsecure";
		}
	}
	return true;
}

function getMap(){
	var res = document.getElementById("client_address").value;
	res = res.trim();
	res = encodeURI(res);
	res = "https://www.google.com/maps/dir/?api=1&destination=" + res + "&travelmode=driving";
	window.open(res, '_blank');
}

function updateDisplay(){
	//
	var codeState = document.getElementById("encoded").value;
	if(codeState == "Secure"){
		document.getElementById("decode").style.display = "block";
	}else{
		document.getElementById("decode").style.display = "none";
	}
}


