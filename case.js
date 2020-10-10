
var outputFileName = "Case_Data.xml";
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

