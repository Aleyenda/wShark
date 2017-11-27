function scrollDown()
{ /* scroll summary table till the end */

    var objDiv = document.getElementById("wholeSummary");
    objDiv.scrollTop = (objDiv.scrollHeight);
}

function showLoadingSummary()
{ /* show loading image in the middle of the summary table */

    table = document.getElementById("wholeSummary"); // table's reference
    var loading = document.createElement("img");
    loading.setAttribute("src", "images/loading.gif");
    loading.setAttribute("id", "summaryLoading");
    loading.setAttribute("style", "margin-left: 45% ; margin-top: 5%; ");
    table.appendChild(loading);
    
}

function showLoadingDetails()
{ // show loading image in the packets details table
    tabla = document.getElementById("detail-div");
    var loading = document.createElement("img");
    loading.setAttribute("src", "images/loadingPDML.gif");
    loading.setAttribute("id", "detailsLoading");
    loading.setAttribute("style", "margin-left: 47% ; margin-top: 3% ; ");
    tabla.appendChild(loading);
}

function deleteTable(ref)
{ // delete information in any table (xml tree structure)

    var Parent = document.getElementById(ref);
    while (Parent.hasChildNodes())
    {
        Parent.removeChild(Parent.firstChild);
    }

}

function rewriteTable()
{ // rewrite summary and details with the new information in psml and pdml
    if (fileReady)
    {
        $("#summaryLoading").remove();
        $("#detailsLoading").remove();
        if (!manageErrors(globalError))
        { // if true, error detected
            var xmlDoc = loadXMLDoc(path + "psml.xml");
            writePSML("packet", xmlDoc);
            scrollDown();
            if (!manageErrors(globalError))
            { // if there are no packets, error
                var xmlDoc = loadXMLDoc(path + "pdml.xml");
                writePDML("packet", xmlDoc, 0);
                writeAscii();
            }
        }
    }
    else setTimeout("rewriteTable()", 500);
}

function newSummary(net)
{ // info psml.xml is written together
    deleteTable("SummaryTable");
    deleteTable("detail-div");
    deleteTable("tab-0");
    updateFile(net, CaptureFilter);
    showLoadingSummary();
    showLoadingDetails();
    setTimeout("rewriteTable()", 1000);
}



