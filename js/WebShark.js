var fileDate; // last modified
var updating = false,
    fileReady = true,
    Capturing = false,
	stopCapture = false; // boolean
var lastPacket = 0,
    currentPacket = 0;
var xmlDocLive, ascii;
var packetPDML = "1";
var CaptureFilter = "",
    globalError = "";
var CaptureNet = 0;
var path = "../"; // root directory from php/
var time = 0;
var files = new Array();

function simulateCaptureLive()
{ /* Show packets one by one in the summary simulating real time capture */
    if (fileReady)
    {
        if (!Capturing)
        {
            Capturing = true;
            xmlDocLive = loadXMLDoc("psml.xml");
        }
        var x = xmlDocLive.getElementsByTagName("packet"); // x is the tree from <packet>
        if (currentPacket < x.length)
        {
            var tabla = document.getElementById("SummaryTable"); // table's beggining reference
            y = x[currentPacket].childNodes; // y tree from section
            var row = document.createElement("tr");
            for (j = 1; j < y.length; j = j + 2)
            { // j + 2 because text type is in the odd positions
                var cell = document.createElement("td");

                if (y[j].childNodes.length != 0)

                var cellText = document.createTextNode(y[j].childNodes[0].nodeValue); // each section's value
                cell.appendChild(cellText);
                row.appendChild(cell);
            }
            row.setAttribute('class', '');
            row.setAttribute('onmousedown', 'packetDetails(this)');
            tabla.appendChild(row);
            currentPacket = currentPacket + 1;
            setTimeout("simulateCaptureLive()", 500);
            scrollDown();
        }
        else
        {
            updating = false;
            Capturing = false;
            if (currentPacket != 0) lastPacket = x[currentPacket - 1].childNodes[1].childNodes[0].nodeValue; // last packet value
            currentPacket = 0;
            setTimeout("modifyFile(CaptureNet)", 2500);
        }
    }
    else
    {
        setTimeout("simulateCaptureLive()", 500); 
    }
}


function modifyFile(net)
{ /* main js function. Detects if there is any change in .cap files that lead to 
 * update information. Loop here checking. */
 
    if ((!updating) && (fileReady) && (!stopCapture))
    {
        updating = true;
        CaptureNet = net;
        if (window.XMLHttpRequest) // ajax
        { // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        }
        else
        { // code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function ()
        { // Ajax. Change -> Update
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
            { 
                updating = true;
                if (fileDate != xmlhttp.responseText)
                {
                    if (lastPacket == 0)
                    { // first time or net change. Update all summary together
                        fileDate = xmlhttp.responseText;
                        newSummary(net);
                        updating = false;
                    }

                    else
                    { // Simulate real time capture. 
                        fileDate = xmlhttp.responseText;
                        updateFile(net, CaptureFilter);
                        setTimeout("simulateCaptureLive()", 500);
                        return;
                    }

                }
                else updating = false;

                //if (!(CaptureNet == "")) // if there is still files, loop.
                //setTimeout("modifyFile(CaptureNet)", 2500); // recursive call
            }

        }


        xmlhttp.open("GET", "php/fileModified.php?net=" + CaptureNet + "&path=" + path, true);
        xmlhttp.send();
    }
    else setTimeout("modifyFile(CaptureNet)", 2500); // recursive call
}

function updateFile(net, filter)
{ /* Call php function that execute tshark to update psml.xml, pdml.xml and ascii.txt */ 
    fileReady = false;
    if (!Capturing)
    {
        //CaptureFilter = filter; // update filter
        if (window.XMLHttpRequest)
        { // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        }
        else
        { // code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function ()
        {
            if ((xmlhttp.readyState == 4) && (xmlhttp.status == 200)) {
				var str = xmlhttp.responseText;
				if (str != "Session Expired") {
					$.get('php/session.php');
	                globalError = (str.substring(0, str.indexOf("%"))); 
	                ascii = str.substring(str.indexOf("%") + 1);
	                fileReady = true;
	                newPackets = true;
				}
				else manageErrors("Session Expired");
			}
        }
        xmlhttp.open("GET", "php/changeFile.php?net=" + net + "&path=" + path + "&lastPacket=" + lastPacket + 
        "&packet=" + packetPDML + "&filter=" + CaptureFilter, true);
        xmlhttp.send();
    }
}



