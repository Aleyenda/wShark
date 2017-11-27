function loadXMLDoc(dname) {
	 // ajax. Load XML structure in xhttp.responseXML

    if (window.XMLHttpRequest)
    {
        xhttp = new XMLHttpRequest();
    }
    else
    {
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhttp.open("GET", dname+"?nocache="+ Math.random(), false); // random() needed to avoid cache in Firefox
    xhttp.send();
    return xhttp.responseXML;

}

function writeAscii()
{ // write, according to the right structure, ascci and hexadecimal info in the third table
    index = 0;
    var lastLine = false;
    var aux = ascii;
    var table = document.getElementById("tab-0");
    var pre = document.createElement("pre");

    while (aux != "")
    {
        var text = aux.substr(0, aux.indexOf(" ") + 2);
        aux = aux.substr(aux.indexOf(" ") + 2);

        var preText = document.createTextNode(text);
        pre.appendChild(preText);

        for (var i = 0; i < 16; i++)
        { // 16 hex values per file
            text = aux.substr(0, aux.indexOf(" "));
            aux = aux.substr(aux.indexOf(" ") + 1);
            if (!(text == ""))
            {
                var spanText = document.createTextNode(text);
                span = document.createElement("span");
                span.setAttribute("class", "h");
                span.setAttribute("id", "h" + (i + index)); // used to select this packets when needed
                span.appendChild(spanText);
                pre.appendChild(span);
                text = " ";
                spanText = document.createTextNode(text);
                pre.appendChild(spanText);
            }
            else
            {
                lastLine = true;
                break;
            }
        }

        if (!lastLine)
        {
            text = aux.substr(0, 2); // blank spaces
            aux = aux.substr(2);
            var spanText = document.createTextNode(text);
            pre.appendChild(spanText);
        }
        else
        {
            while ((text == "") || (text == " "))
            {
                text = " ";
                var spanText = document.createTextNode(text);
                pre.appendChild(spanText);
                text = aux.substr(1, 1);
                aux = aux.substr(1);
            }
            text = " ";
            var spanText = document.createTextNode(text);
            pre.appendChild(spanText);
        }

        for (var j = 0; j < 16; j++)
        { // after 16 hex and 2 blank spaces, 16 ascii simbols
            if (aux == "") break;

            text = aux.substr(0, 1);
            aux = aux.substr(1);
            var spanText = document.createTextNode(text);
            span = document.createElement("span");
            span.setAttribute("class", "d");
            span.setAttribute("id", "d" + (j + index)); // used to select this packets when needed
            span.appendChild(spanText);
            pre.appendChild(span);
        }

        index = index + 16;
    }

    table.appendChild(pre);
}

function writePSML(branch_name, xmlDOC)
// writes in html summary information of packets included in psml.xml
{ // branch_name -> branch where looking for values <packet> <section> 1 </section> </packet>
    x = xmlDOC.getElementsByTagName(branch_name); // x tree from <packet>
    tabla = document.getElementById("SummaryTable"); // table reference
    // lastPacket = x.length; // Number of packets in file
    var numPackets = x.length;
    if (numPackets != 0) lastPacket = x[numPackets - 1].childNodes[1].childNodes[0].nodeValue; // when file non continuous (filters)
    else globalError = "NoPackets";

    if (document.getElementById('Red') == "")
    {
        var error = document.createElement("img");
        error.setAttribute('src', 'images/error.png');
        tabla.appendChild(error);
    }

    for (i = 0; i < x.length; i++)
    { // all <packet> from file
        y = x[i].childNodes; // y tree from section
        var row = document.createElement("tr");
        row.setAttribute("class", "");
        for (j = 1; j < y.length; j = j + 2)
        { // j + 2 because text type is in the odd positions
            var cell = document.createElement("td");

            if (y[j].childNodes.length != 0)

            var cellText = document.createTextNode(y[j].childNodes[0].nodeValue); // Each section's value
            cell.appendChild(cellText);

            //if (j==1) // es el número de paquete, lo utilizaremos después para detectar en cuál se ha clicado
            //row.setAttribute('name', y[j].childNodes[0].nodeValue);
            row.appendChild(cell);
        }
        row.setAttribute('onmousedown', 'packetDetails(this)');
        if (i == 0) { 
			row.setAttribute('class', 'picked'); // pdml details from first packet by default
			row.setAttribute('id','picked'); // needed to navigate packets
		}
        tabla.appendChild(row);
    }
}

function writePDML(branch_name, xmlDOC, packet)
{ /* writes in html info of the packet included in pdml.xml */
    var x = xmlDOC.getElementsByTagName(branch_name);
    var tabla = document.getElementById("detail-div"); // details table's reference
    try
    { // empty pdml.xml or no file -> error
        var y = x[packet].childNodes;

        for (protos = 3; protos < y.length; protos = protos + 2)
        {
            var divProtos = document.createElement("div");
            divProtos.setAttribute('id', y[protos].getAttribute("name"));
            divProtos.setAttribute('size', y[protos].getAttribute("size"));
            divProtos.setAttribute('pos', y[protos].getAttribute("pos"));
            divProtos.setAttribute('class', 'protocol');
            //divProtos.setAttribute('onmouseup', 'selectAscii(this)');
            var spanProtos = document.createElement("span");
            spanProtos.setAttribute('onmousedown', 'expandClass(this.parentNode)');
            spanProtos.setAttribute('class', 'protoLabel');
            spanProtos.setAttribute('style', 'cursor:pointer');
            var spanProtosText = document.createTextNode(y[protos].getAttribute("showname"));

            spanProtos.appendChild(spanProtosText);
            divProtos.appendChild(spanProtos);


            var z = y[protos].childNodes;

            for (fields = 1; fields < z.length; fields = fields + 2)
            {
                if (z[fields].childNodes.length != 0)
                {
                    z2 = z[fields].childNodes.length;

                    if (z[fields].getAttribute("name") == "")
                    {
                        z[fields].setAttribute("name", "changed" + fields);
                        var divFields = document.createElement("div");
                        divFields.setAttribute('id', z[fields].getAttribute("name"));
                        divFields.setAttribute('size', z[fields].getAttribute("size"));
                        divFields.setAttribute('pos', z[fields].getAttribute("pos"));
                        divFields.setAttribute('class', 'parent field');
                        //divFields.setAttribute('onmouseup', 'selectAscii(this)');
                        var imgFields = document.createElement("img");
                        imgFields.setAttribute('src', 'images/arrow-rigth12px.png');
                        imgFields.setAttribute('align', 'left');
                        imgFields.setAttribute('class', '');

                        var spanFields = document.createElement("span");
                        spanFields.setAttribute('onmousedown', 'expandClass(this.parentNode)');
                        spanFields.setAttribute('class', 'fieldLabel');
                        spanFields.setAttribute('style', 'cursor:pointer');
                        var spanFieldsText = document.createTextNode(z[fields].getAttribute("show"));

                        divFields.appendChild(imgFields); // here, 'cause could be or not be
                    }
                    else
                    {
                        var divFields = document.createElement("div");
                        divFields.setAttribute('id', z[fields].getAttribute("name"));
                        divFields.setAttribute('size', z[fields].getAttribute("size"));
                        divFields.setAttribute('pos', z[fields].getAttribute("pos"));
                        divFields.setAttribute('class', 'parent field');
                        //divFields.setAttribute('onmouseup', 'selectAscii(this)');
                        var imgFields = document.createElement("img");
                        imgFields.setAttribute('src', 'images/arrow-rigth12px.png');
                        imgFields.setAttribute('align', 'left');
                        imgFields.setAttribute('class', '');

                        var spanFields = document.createElement("span");
                        spanFields.setAttribute('onmousedown', 'expandClass(this.parentNode)');
                        spanFields.setAttribute('class', 'fieldLabel');
                        spanFields.setAttribute('style', 'cursor:pointer');
                        var spanFieldsText = document.createTextNode(z[fields].getAttribute("showname"));

                        divFields.appendChild(imgFields); // here, 'cause could be or not be
                    }

                    spanFields.appendChild(spanFieldsText);
                    divFields.appendChild(spanFields);

                    for (subfields = 1; subfields < z2; subfields = subfields + 2)
                    {
                        var divSubFields = document.createElement("div");
                        if (z[fields].childNodes[subfields].getAttribute("name") == "") divSubFields.setAttribute('id', "changed" + fields + "_" + subfields);
                        else
                        divSubFields.setAttribute('id', z[fields].childNodes[subfields].getAttribute("name"));

                        divSubFields.setAttribute('size', z[fields].childNodes[subfields].getAttribute("size"));
                        divSubFields.setAttribute('pos', z[fields].childNodes[subfields].getAttribute("pos"));
                        divSubFields.setAttribute('class', 'field');
                        //divSubFields.setAttribute('onmouseup', 'selectAscii(this)');
                        if (z[fields].childNodes[subfields].getAttribute("name") == "")
                        {
                            var spanSubFields = document.createElement("span");
                            spanSubFields.setAttribute('onmousedown', 'expandClass(this.parentNode)');
                            spanSubFields.setAttribute('class', 'fieldLabel');
                            var spanSubFieldsText = document.createTextNode(z[fields].childNodes[subfields].getAttribute("show"));
                        }
                        else
                        {
                            var spanSubFields = document.createElement("span");
                            spanSubFields.setAttribute('onmousedown', 'expandClass(this.parentNode)');
                            spanSubFields.setAttribute('class', 'fieldLabel');
                            var spanSubFieldsText = document.createTextNode(z[fields].childNodes[subfields].getAttribute("showname"));
                        }
                        spanSubFields.appendChild(spanSubFieldsText);
                        divSubFields.appendChild(spanSubFields);
                        divFields.appendChild(divSubFields);

                    }

                }
                else
                {
                    if (z[fields].getAttribute("name") != 'data')
                    {

                        var divFields = document.createElement("div");
                        divFields.setAttribute('id', z[fields].getAttribute("name"));
                        divFields.setAttribute('size', z[fields].getAttribute("size"));
                        divFields.setAttribute('pos', z[fields].getAttribute("pos"));
                        divFields.setAttribute('class', 'field');
                        //divFields.setAttribute('onmouseup', 'selectAscii(this)');
                        if (z[fields].getAttribute("name") == "")
                        {
                            var spanFields = document.createElement("span");
                            spanFields.setAttribute('onmousedown', 'expandClass(this.parentNode)');
                            spanFields.setAttribute('class', 'fieldLabel');
                            var spanFieldsText = document.createTextNode(z[fields].getAttribute("show"));
                        }
                        else
                        {
                            var spanFields = document.createElement("span");
                            spanFields.setAttribute('onmousedown', 'expandClass(this.parentNode)');
                            spanFields.setAttribute('class', 'fieldLabel');
                            var spanFieldsText = document.createTextNode(z[fields].getAttribute("showname"));
                        }
                        spanFields.appendChild(spanFieldsText);
                        divFields.appendChild(spanFields);
                    }
                }

                divProtos.appendChild(divFields);
            }
            tabla.appendChild(divProtos);
        }
    }

    catch (err)
    {
    }
}
