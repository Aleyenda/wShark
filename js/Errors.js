function detectBrowser()
{ // Browsers supported by application
	
    var browser = navigator.userAgent;
    if ((browser.match("Firefox") || browser.match("Chrome") || browser.match("Opera")) == null)
    {
        if (language == "Català")
        {
            var conf = confirm("Aquesta pàgina està optimitzada per Mozilla Firefox i suporta altres navegadors com Google Chrome i Safari.\nNecessites instal·lar algun d'aquests navegadors (gratuits) per poder utilitzar-la.\nPresiona OK per anar a la pàgina de descàrregues de Firefox o CANCEL per abandonar-la.");
            if (conf) window.location.replace("http://www.mozilla.com/ca/");
            else window.location.replace("http://www.google.com/webhp?hl=ca");
        }
        if (language == "Castellano")
        {
            var conf = confirm("Está página está optimizada para Mozilla Firefox y soporta otros navegadores como Google Chrome y Safari.\nNecesitas instalar alguno de estos navegadores (gratuitos) para poder usarla.\nPresiona OK para ir a la página de descargas de Firefox o CANCEL para abandonarla .");
            if (conf) window.location.replace("http://www.mozilla.com/es/");
            else window.location.replace("http://www.google.com/webhp?hl=es");
        }
        if (language == "Galego")
        {
            var conf = confirm("Está páxina está optimizada para Mozilla Firefox e soporta outros navegadores como Google Chrome e Safari.\nNecesitas instalar algún destes navegadores (gratuitos) para poder usala.\nPresiona OK para ir á páxina de descargas de Firefox ou CANCEL para abandoa-la.");
            if (conf) window.location.replace("http://www.mozilla.com/gl/");
            else window.location.replace("http://www.google.com/webhp?hl=gl");
        }
        if (language == "English")
        {
            var conf = confirm("This page is optimized for Mozilla Firefox and work properly on Google Chrome and Safari.\nOne of this free browsers is needed. \nClick OK to go to Firefox Download Page or CANCEL to leave.");
            if (conf) window.location.replace("http://www.mozilla.com");
            else window.location.replace("http://www.google.com/webhp?hl=en");
        }
    }

}

function manageErrors(error)
{ // Prints error info in details table and deactivate all

	if	(error.match("Session Expired") != null) {
		alert(manageLanguage("NoSession"));
		window.location.replace("IntroWebShark.php");
	}
    else if (error.match("doesn't exist") != null)
    { // capture files don't exist -- deactivate buttons and drop-list
        var tabla = document.getElementById('detail-div');
        var error = document.createTextNode(manageLanguage("NoFich"));
        tabla.appendChild(error);
        CaptureNet = ""
        document.getElementById('Red').disabled = true
        document.getElementById('filter-button').setAttribute('onmousedown', '');
        document.getElementById('filter-clear-button').setAttribute('onmouseup', '');
        return true;

    } // manual reload needed  
    else if (error.match("no web session") != null)
    { // session web expired
        window.location.reload();
    }



    else if (error.match("is neither a field nor a protocol name.") != null)
    { // incorrect display filter
        var tabla = document.getElementById('detail-div');
        var error = document.createTextNode(manageLanguage("Syntax"));
        tabla.appendChild(error);
        return true;
    }
    else if (error == "NoPackets")
    {
        var tabla = document.getElementById('detail-div');
        var error = document.createTextNode(manageLanguage("NoPackets"));
        tabla.appendChild(error);
        return true;
    }
    else if (error == "Capturing") // no click or filter updating while live capture simulation
    alert(manageLanguage("Capturing"));
}

