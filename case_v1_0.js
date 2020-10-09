// xmlTemplateMaster formats the XML file with indents and newlines to make it human readable, at a push.
// It also maps the HTML form elements to the XML nodes.
// It uses the tab character to delimit the placeholders, they are replaced by the text in the corresponding form elements.
// before the data is downloaded in an XML file.
xmlTemplateMaster = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n" +
"<case>\n" +
"  <referral>\n" +
"    <date>\n" +
"      <YYYY></YYYY>\n" +
"      <MM></MM>\n" +
"      <DD></DD>\n" +
"    </date>\n" +
"    <name>\n" +
"      <first>\telement_11_1\t</first>\n" +
"      <last>\telement_11_2\t</last>\n" +
"    </name>\n" +
"    <phone>\telement_1\t</phone>\n" +
"    <email>\telement_2\t</email>\n" +
"    <role>\telement_15\t\telement_15\t\telement_15\t</role>\n" +//one placeholder for each radio button in group
"  </referral>\n" +
"  <client>\n" +
"    <name>\n" +
"      <first>\telement_10_1\t</first>\n" +
"      <last>\telement_10_2\t</last>\n" +
"    </name>\n" +
"    <problem>\telement_5\t</problem>\n" +
"    <suggestion>\telement_6\t</suggestion>\n" +
"  </client>\n" +
"  <engineer>\n" +
"    <name>\n" +
"      <first>\telement_9_1\t</first>\n" +
"      <last>\telement_9_2\t</last>\n" +
"    </name>\n" +
"    <solution>\telement_8\t</solution>\n" +
"    <cost>\n" +
"      <pounds>\telement_12_1\t</pounds>\n" +
"      <pence>\telement_12_2\t</pence>\n" +
"    </cost>\n" +
"    <endDate>\n" +
"      <YYYY></YYYY>\n" +
"      <MM></MM>\n" +
"      <DD></DD>\n" +
"    </endDate>\n" +
"  </engineer>\n" +
"</case>\n";
// xmap maps the XML nodes to the form elements, it is a reverse look up table.
var xmap = [{eName:"element_11_1", xpath:"/case/referral/name/first"},
{eName:"element_11_2", xpath:"/case/referral/name/last"},
{eName:"element_1", xpath:"/case/referral/phone"},
{eName:"element_2", xpath:"/case/referral/email"},
{eName:"element_15", xpath:"/case/referral/role"},
{eName:"element_10_1", xpath:"/case/client/name/first"},
{eName:"element_10_2", xpath:"/case/client/name/last"},
{eName:"element_5", xpath:"/case/client/problem"},
{eName:"element_6", xpath:"/case/client/suggestion"},
{eName:"element_9_1", xpath:"/case/engineer/name/first"},
{eName:"element_9_2", xpath:"/case/engineer/name/last"},
{eName:"element_8", xpath:"/case/engineer/solution"},
{eName:"element_12_1", xpath:"/case/engineer/cost/pounds"},
{eName:"element_12_2", xpath:"/case/engineer/cost/pence"},
];
var xmlTemplate = "";
var outputFileName = "Case_Data.xml";
// This function reads the data in the form and send it to file. It reads in the master template, 
// it puts all the data from the form fields in an array. 
// It works through the array, element by element, and searches the template for a placeholder with the same element name. 
// If found it replaces it with the user's text from the element, even if the text field in the element is blank.
function formToXml(form){
	xmlTemplate = xmlTemplateMaster;
	var inputs=form.elements;
	var evalue;
	for(var i=0;i<inputs.length;i++){
		if (inputs[i].name){
			evalue = inputs[i].value;
			if(inputs[i].type == "radio"){
				if(!document.getElementById(inputs[i].id).checked){
					evalue = ""; // Replace a placeholder with "". There is one placeholder for each radio button in xmlTemplate.
				}
			}
			updateTemplate(inputs[i].name,evalue);
		}
	}
	xmlTemplate = xmlTemplate.replace(/\t.*\t/g, ""); // remove any placeholders that have not been replaced
	dataDownload(xmlTemplate);
	form.reset();
}
function updateTemplate(p,v){ // placeholder, value from form
	xmlTemplate = xmlTemplate.replace("\t" + p + "\t",v); //Placeholder is delimited by 'tab' characters
}
function dataDownload(xmlString) {
	var filename = document.getElementById("element_1111").value + ".xml";// ToDo: check validity of file name
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
	document.getElementById("element_1111").value = outputFileName;
	var reader = new FileReader();
	reader.addEventListener("load", function () {
		xmlToForm(form,reader.result);
	}, false);
	if (file) {
		reader.readAsText(file);
	}
}
function xmlToForm(ourFormObject,xmlString){
	var i, textNode, elementName
	var parser = new DOMParser();
	var xmlDoc = parser.parseFromString(xmlString, "text/xml"); //important to use "text/xml"
	for(var i=0;i<xmap.length;i++){
		textNode = getTextNode(xmap[i].xpath,xmlDoc);
		elementName = xmap[i].eName;
		if(!textNode){continue;}
		if(document.getElementsByName(elementName)){ // some forms do not have a field for every node in the XML
			ourFormObject.elements[elementName].value = textNode;
		}
	}
}
function getTextNode(xpath,xmlDoc){
    if (xmlDoc.evaluate) {
        var nodes = xmlDoc.evaluate(xpath, xmlDoc, null, XPathResult.ANY_TYPE, null);
        var result = nodes.iterateNext();
				if (result.firstChild) {
					return result.firstChild.nodeValue;
				}else{
					return false;
				}
		}else{return false;}
}

