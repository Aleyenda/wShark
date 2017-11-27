var language = "English";

function changeLanguage(lang)
{
	$.cookie('lang', lang, {expires: 7});
	language = $.cookie('lang');
	window.location.reload();
	/*
		if (window.XMLHttpRequest)
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
				language = lang;
				
				window.location.reload();
			}
				 
        }

        xmlhttp.open("GET", "php/changeLanguage.php?lang="+lang, false); // wait till ajax response
        xmlhttp.send(); */
}

function readLanguage()
{
	/*if (window.XMLHttpRequest)
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
				language = xmlhttp.responseText;
			}
				 
        }

        xmlhttp.open("GET", "php/language.php", false); // wait till ajax response
        xmlhttp.send(); */
}

function manageLanguage(text)
{ // Language options in interface and errors
    switch (language)
    {
    case "English":
        switch (text)
        {
		
		case "AlreadySession":
		return 'You already have a session. Select "New" in the menu "File" to close it and upload new files'
		
		case "NoSession":
		return 'Session finished. You will be automatically redirected to the main website.'
		
        case "StatusBarPlay":
            return "Capturing"

        case "StatusBarStop":
            return "Stopped"
            
        case "Filename":
			return "Name:"

        case "Status":
            return "Current Status:"

        case "Droplist":
            return "Net";

        case "Filter":
            return "Filter";

        case "Red":
            return "Choose network to capture:";

        case "NoFich":
            return "No interface to capture. Refresh page to check for changes.";

        case "Syntax":
            return 'Filter syntax is wrong.';

        case "NoPackets":
            return 'No packets found matching this filter.';

        case "Capturing":
            return "Packets in this interface are updating. Wait until it's finished";
            
          case "Language":
          return 'Language:';
          
          case "Change":
          return 'Change'
          
          // Menu File
          
          case "File":
          return 'File'
          
          case "New":
          return 'New'
          
          case "changeModal":
          return 'Choose the file to visualize:'
          
          case "Save":
          return 'Save'
          
          case "SaveAll":
          return 'Save all networks'
          
          case "SaveFilter":
          return 'Save (filter)'
          
          case "SaveAllFilter":
          return 'Save all networks (filter)'
          
          // Menu Go
          
          case "Go":
          return 'Go'
          
          case "Navigate":
          return 'Navigate packets'
          
          case "First":
          return 'First packet'
          
          case "Last":
          return 'Last packet'
          
          case "Next":
          return 'Next packet'
          
          case "Previous":
          return 'Previous packet'
          
          // Menu Capture
          
          case "Capture":
          return 'Capture'
           
          case "ManageNets":
          return 'Manage networks'
          
          case "Network":
          return 'Change network'
          
          case "Live":
          return 'Live capture'
          
          case "Play":
          return 'Play'
          
          case "Stop":
          return 'Stop'
          
          // Menu Filter
          
          case "MenuFilter":
          return 'Filter'
          
          // Menu Statistics
          
          case "Statistics":
          return 'Statistics'
          
          case "FileInfo":
          return 'File Information'
          
          case "GeneralInfo":
          return 'General Info'
          
          case "HierInfo":
          return 'Hierarchy Info'
          
          case "ProtoConv":
          return 'Protocols Conversations'
          
          case "Graphs":
          return 'Graphs'
          
          case "Density":
          return 'Density'
          
          case "GeneralInfoMod":
          return 'General Information of the File'
          
          case "HierInfoMod":
          return 'Protocol Hierarchy Information'
          
          case "ProtoConvMod":
          return 'Conversation of the protocol:'
          
          case "DensityMod":
          return 'Density of'
          
          case "Packets":
          return 'Packets'
          
          case "Bytes":
          return 'Bytes'
          
          case "Num":
          return 'Number of '
          
          case "Interval":
          return 'Interval'
            
          
          // Menu Language
          
          case "MenuLanguage":
          return 'Language'
          
          case "English":
          return 'English'
          
          case "Spanish":
          return 'Spanish'
          
          case "Catalan":
          return 'Catalan'
          
          case "Galician":
          return 'Galician'
          
          case "Basque":
          return 'Basque'
        
        // Summary
        
        case "Time":
        return 'Time'
        
        case "Source":
        return 'Source'
        
        case "Destination":
        return 'Destination'
        
        case "Protocol":
        return 'Protocol'
        
        case "Length":
        return 'Length'
        
        case "Info":
        return 'Information'
        
        // IntroWebShark
        
        case "Welcome":
        return 'Welcome to '
        
        case "Browse":
        return '<b>Browse</b> your hard drive and select the file(s) to visualize or simply <b>drag</b> them to the area of the button'
        
        case "Default":
        return 'Default Example'
	}

    case "Spanish":
        switch (text)
        {
		
		case "AlreadySession":
		return 'Ya tienes una sesión abierta. Selecciona "Nuevo" en el menú "Fichero" para cerrarla y subir nuevos ficheros.'
		
		case "NoSession":
		return 'Sesión finalizada. Se le redirigirá automáticamente a la página principal.'
		
        case "StatusBarPlay":
            return "Capturando"

        case "StatusBarStop":
            return "Detenido"
           
        case "Filename":
			return "Nombre:"

        case "Status":
            return "Estado Actual:"

        case "Droplist":
            return "Red";

        case "Filter":
            return "Filtro";

        case "Red":
            return "Elige la red de la que quieras capturar:";

        case "NoFich":
            return 'No hay una interfaz válida de la que poder capturar. Actualiza la página para comprobar si esto ha cambiado.';

        case "Syntax":
            return 'La sintaxis del filtro escogido es incorrecta.';

        case "NoPackets":
            return 'No se han encontrado paquetes que se correspondan con el filtro especificado.';

        case "Capturing":
            return 'Se están actualizando los paquetes capturados en la interfaz seleccionada. Espera a que terminen de mostrarse los nuevos paquetes.';
            
            case "Language":
            return 'Idioma:';
            
            case "Change":
            return 'Cambiar'
            
          // Menu File
          
          case "File":
          return 'Fichero'
          
          case "New":
          return 'Nuevo'
          
          case "changeModal":
          return 'Elige el fichero a visualizar:'
          
          case "Save":
          return 'Guardar'
          
          case "SaveAll":
          return 'Guardar todas las redes'
          
          case "SaveFilter":
          return 'Guardar (filtro)'
          
          case "SaveAllFilter":
          return 'Guardar todas las redes (filtro)'
          
          // Menu Go
          
          case "Go":
          return 'Ir'
          
          case "Navigate":
          return 'Navegar paquetes'
          
          case "First":
          return 'Primer paquete'
          
          case "Last":
          return 'Último paquete'
          
          case "Next":
          return 'Siguiente paquete'
          
          case "Previous":
          return 'Anterior paquete'
          
          // Menu Capture
          
          case "Capture":
          return 'Captura'
           
          case "ManageNets":
          return 'Gestionar redes'
          
          case "Network":
          return 'Cambiar red'
          
          case "Live":
          return 'Captura live'
          
          case "Play":
          return 'Play'
          
          case "Stop":
          return 'Stop'
          
          // Menu Filter
          
          case "MenuFilter":
          return 'Filtro'
          
          // Menu Statistics
          
          case "Statistics":
          return 'Estadísticas'
          
          case "FileInfo":
          return 'Información de Fichero'
          
          case "GeneralInfo":
          return 'Información General'
          
          case "HierInfo":
          return 'Información Jerárquica'
          
          case "ProtoConv":
          return 'Conversaciones de Protocolos'
          
          case "Graphs":
          return 'Gráficas'
          
          case "Density":
          return 'Densidad'
          
          case "GeneralInfoMod":
          return 'Información General del Fichero'
          
          case "HierInfoMod":
          return 'Información Jerárquica de los Protocolos'
          
          case "ProtoConvMod":
          return 'Conversación del protocolo:'
          
          case "DensityMod":
          return 'Densidad de'
          
          case "Packets":
          return 'Paquetes'
          
          case "Bytes":
          return 'Bytes'
          
          case "Num":
          return 'Número de '
          
          case "Interval":
          return 'Intervalo'
          
          // Menu Language
          
          case "MenuLanguage":
          return 'Idioma'
          
          case "English":
          return 'Inglés'
          
          case "Spanish":
          return 'Castellano'
          
          case "Catalan":
          return 'Catalán'
          
          case "Galician":
          return 'Gallego'
          
          case "Basque":
          return 'Euskera'
                
        // Summary
        
        case "Time":
        return 'Tiempo'
        
        case "Source":
        return 'Origen'
        
        case "Destination":
        return 'Destino'
        
        case "Protocol":
        return 'Protocolo'
        
        case "Length":
        return 'Longitud'
        
        case "Info":
        return 'Información'
        
        // IntroWebShark
        
        case "Welcome":
        return '¡Bienvenido a '
        
        case "Browse":
        return '<b>Navega</b> por tu disco duro y selecciona lo(s) fichero(s) a visualizar o simplemente <b>arrástralos</b> al área del botón'
        
        case "Default":
        return 'Ejemplo por Defecto'
	}

    case "Catalan":
        switch (text)
        {
		
		case "AlreadySession":
		return 'Ja tens una sessió oberta. Sel·lecciona “Nou” al menú "Fitxer" per tancarla i apujar nous fitxers.'
			
		case "NoSession":
		return 'Sessió finalitzada. Serà redirigit automàticament a la pàgina principal.'

        case "StatusBarPlay":
            return "Capturant"

        case "StatusBarStop":
            return "Aturat"

        case "Filename":
			return "Nom:"
			
        case "Status":
            return "Estat Actual:"

        case "Droplist":
            return "Xarxa";

        case "Filter":
            return "Filtre";

        case "Red":
            return "Tria la xarxa de la que vols capturar:";

        case "NoFich":
            return 'No hi ha una interfície vàlida que es pugui capturar. Actualitza la pàgina per comprovar si hi ha hagut canvis.';

        case "Syntax":
            return 'La sintaxi del filtre escollit és incorrecta.';

        case "NoPackets":
            return "No s'han trobat paquets que es corresponguin amb el filtre especificat.";

        case "Capturing":
            return "S'estan actualitzant els paquets capturats en la interfície escollida. Espera que s'acabin de mostrar els nous paquets.";
            
            case "Language":
            return 'Idioma:';
            
            case "Change":
            return 'Canviar'
           
// Menu File
          
          case "File":
          return 'Fitxer'
          
          case "New":
          return 'Nou'
          
          case "changeModal":
          return "Esculli l'arxiu a visualitzar"
          
          case "Save":
          return 'Desar'
          
          case "SaveAll":
          return 'Desar totes les xarxes'
          
          case "SaveFilter":
          return 'Desar (filtre)'
          
          case "SaveAllFilter":
          return 'Desar totes les xarxes (filtre)'
          
          // Menu Go
          
          case "Go":
          return 'Anar'
          
          case "Navigate":
          return 'Navegar paquets'
          
          case "First":
          return 'Primer paquet'
          
          case "Last":
          return 'Últim paquet'
          
          case "Next":
          return 'Següent paquet'
          
          case "Previous":
          return 'Anterior paquet' 
          
          // Menu Capture
          
          case "Capture":
          return 'Captura'
           
          case "ManageNets":
          return 'Gestionar xarxes'
          
          case "Network":
          return 'Canviar xarxa'
          
          case "Live":
          return 'Captura live'
          
          case "Play":
          return 'Play'
          
          case "Stop":
          return 'Stop'
          
          // Menu Filter
          
          case "MenuFilter":
          return 'Filtre'
          
          // Menu Statistics
          
          case "Statistics":
          return 'Estadístiques'
          
          case "FileInfo":
          return 'Informació del Fitxer'
          
          case "GeneralInfo":
          return 'Informació General'
          
          case "HierInfo":
          return 'Informació Jeràrquica'
          
          case "ProtoConv":
          return 'Converses de Protocols'
          
          case "Graphs":
          return 'Gràfiques'
          
          case "Density":
          return 'Densitat'
          
          case "GeneralInfoMod":
          return 'Informació General del Fitxer'
          
          case "HierInfoMod":
          return 'Informació Jeràrquica dels Protocols'
          
          case "ProtoConvMod":
          return 'Conversació del protocol:'
          
          case "DensityMod":
          return 'Densitat de'
          
          case "Packets":
          return 'Paquets'
          
          case "Bytes":
          return 'Bytes'
          
          case "Num":
          return 'Número de '
          
          case "Interval":
          return 'Interval'

          
          // Menu Language
          
          case "MenuLanguage":
          return 'Idioma'
          
          case "English":
          return 'Anglès'
          
          case "Spanish":
          return 'Castellà'
          
          case "Catalan":
          return 'Català'
          
          case "Galician":
          return 'Gallec'
          
          case "Basque":
          return 'Basc'
        
        // Summary
        
        case "Time":
        return 'Temps'
        
        case "Source":
        return 'Orígen'
        
        case "Destination":
        return 'Destí'
        
        case "Protocol":
        return 'Protocol'
        
        case "Length":
        return 'Longitud'
        
        case "Info":
        return 'Informació'
        
        // IntroWebShark
        
        case "Welcome":
        return 'Benvingut a '
        
        case "Browse":
        return '<b>Navega</b> pel teu disc dur i selecciona el(s) fitxer(s) a visualitzar o senzillament <b>arrosega’ls</b> al àrea del botó'
        
        case "Default":
        return 'Exemple per defecte'
	}

    case "Galician":
        switch (text)
        {
			
		case "AlreadySession":
		return 'Xa tes unha sesión comezada. Selecciona a opción "Novo" do menú "Ficheiro" para pechala e poder subir novos arquivos.'
			
		case "NoSession":
		return 'Sesión rematada. Se lle redirixirá á páxina principal.'
        
        case "StatusBarPlay":
            return "Capturando"

        case "StatusBarStop":
            return "Detido"

        case "Filename":
			return "Nome:"
			
        case "Status":
            return "Estado Actual:"

        case "Droplist":
            return "Rede";

        case "Filter":
            return "Filtro";

        case "Red":
            return "Elixe a rede da que queres capturar:";

        case "NoFich":
            return 'Non hai unha interfaz válida da que poder capturar. Actualiza a páxina para comprobar se isto cambiou.';

        case "Syntax":
            return 'A sintaxe do filtro escollido é incorrecta.';

        case "NoPackets":
            return 'Non se atoparon paquetes que se correspondan co filtro especificado.';

        case "Capturing":
            return 'Estanse a actualizar os paquetes capturados na interfaz escollida. Espera a que rematen de mostrarse os novos paquetes.';
            
            case "Language":
            return 'Idioma:';
            
            case "Change":
            return 'Cambiar'
            
          // Menu File
          
          case "File":
          return 'Ficheiro'
          
          case "New":
          return 'Novo'
          
          case "changeModal":
          return 'Elixe o ficheiro a visualizar:'
          
          case "Save":
          return 'Gardar'
          
          case "SaveAll":
          return 'Gardar todas as redes'
          
          case "SaveFilter":
          return 'Gardar (filtro)'
          
          case "SaveAllFilter":
          return 'Gardar todas as redes (filtro)'
          
          
          // Menu Go
          
          case "Go":
          return 'Ir'
          
          case "Navigate":
          return 'Navegar paquetes'
          
          case "First":
          return 'Primeiro paquete'
          
          case "Last":
          return 'Último paquete'
          
          case "Next":
          return 'Seguinte paquete'
          
          case "Previous":
          return 'Anterior paquete'
          
          // Menu Capture
          
          case "Capture":
          return 'Captura'
           
          case "ManageNets":
          return 'Xestionar redes'
          
          case "Network":
          return 'Cambiar rede'
          
          case "Live":
          return 'Captura Live'
          
          case "Play":
          return 'Play'
          
          case "Stop":
          return 'Stop'
          
          // Menu Filter
          
          case "MenuFilter":
          return 'Filtro'
          
          // Menu Statistics
          
          case "Statistics":
          return 'Estatísticas'
          
          case "FileInfo":
          return 'Información do Ficheiro'
          
          case "GeneralInfo":
          return 'Información Xeral'
          
          case "HierInfo":
          return 'Información Xerárquica'
          
          case "ProtoConv":
          return 'Conversacións dos Protocolos'
          
          case "Graphs":
          return 'Gráficas'
          
          case "Density":
          return 'Densidade'
          
          case "GeneralInfoMod":
          return 'Información Xeral do Ficheiro'
          
          case "HierInfoMod":
          return 'Información Xerárquica dos Protocolos'
          
          case "ProtoConvMod":
          return 'Conversación do protocolo:'
          
          case "DensityMod":
          return 'Densidade de'
          
          case "Packets":
          return 'Paquetes'
          
          case "Bytes":
          return 'Bytes'
          
          case "Num":
          return 'Número de '
          
          case "Interval":
          return 'Intervalo'
          
          
          // Menu Language
          
          case "MenuLanguage":
          return 'Idioma'
          
          case "English":
          return 'Inglés'
          
          case "Spanish":
          return 'Castelán'
          
          case "Catalan":
          return 'Catalán'
          
          case "Galician":
          return 'Galego'
          
          case "Basque":
          return 'Éuscaro'
        
        // Summary
        
        case "Time":
        return 'Tempo'
        
        case "Source":
        return 'Orixe'
        
        case "Destination":
        return 'Destino'
        
        case "Protocol":
        return 'Protocolo'
        
        case "Length":
        return 'Lonxitude'
        
        case "Info":
        return 'Información'
        
        // IntroWebShark
        
        case "Welcome":
        return '¡Benvenido a '
        
        case "Browse":
        return '<b>Navega</b> polo teu disco duro e selecciona o(s) ficheiro(s) a visualizar ou simplemente <b>arrástraos</b> á área do botón'
        
        case "Default":
        return 'Exemplo por Defecto'
	}
	
	    case "Basque":
        switch (text)
        {
		
		case "AlreadySession":
		return 'Badaukazu sesio bat irekita. “Berria” sakatu Fitxageti menuan sesioa ixteko eta fitxategi berriak igotzeko.'
		
		case "NoSession":
		return 'Sesioa bukatuta. Orri nagusia kagatuko da orain.'
		
        case "StatusBarPlay":
            return "Paketeak harrapatzen"

        case "StatusBarStop":
            return "Geldituta"

        case "Filename":
			return "Izena:"
			
        case "Status":
            return "Egoera:"

        case "Droplist":
            return "Sarea";

        case "Filter":
            return "Bilatu";

        case "Red":
            return "Aukeratu entzun nahi duzun sarea:";

        case "NoFich":
            return 'Ez dago paketeak harrapatzeko balio duen interfazerik. Orria freskatu ea aldatu den ikusteko.';

        case "Syntax":
            return 'Aukeratu duzun bilaketan zerbait txarto idatzita dago.';

        case "NoPackets":
            return 'Ez da aurkitu aukeratutako bilaketarekin bat egiten duten paketerik.';

        case "Capturing":
            return 'Aukeratutako interfazean harrapatu diren paketeak eguneratzen ari dira. Itxaron pakete berriak agertu arte.';
            
            case "Language":
            return 'Hizkuntza:';
            
            case "Change":
            return 'Aldatu'
            
          // Menu File
          
          case "File":
          return 'Fitxategia'
          
          case "New":
          return 'Berria'
          
          case "changeModal":
          return 'Aukeratu ikusi nahi duzun fitxategia:'
          
          case "Save":
          return 'Gorde'
          
          case "SaveAll":
          return 'Sare guztiak gorde'
          
          case "SaveFilter":
          return 'Gorde (Bilaketa)'
          
          case "SaveAllFilter":
          return 'Sare guztiak gorde (bilaketa)'
          
          // Menu Go
          
          case "Go":
          return 'Joan'
          
          case "Navigate":
          return 'Paketeak nabigatu'
          
          case "First":
          return 'Lehenengo paketea'
          
          case "Last":
          return 'Azken paketea'
          
          case "Next":
          return 'Hurrengo paketea'
          
          case "Previous":
          return 'Aurreko paketea'
          
          // Menu Capture
          
          case "Capture":
          return 'Harrapatu'
           
          case "ManageNets":
          return 'Sareak kudeatu'
          
          case "Network":
          return 'Sarea aldatu'
          
          case "Live":
          return '”live” harrapaketa' //No se traducirlo mejor, a lo mejor momentuko harrapaketa queda mejor
          
          case "Play":
          return 'Hasi'
          
          case "Stop":
          return 'Gelditu'
          
          // Menu Filter
          
          case "MenuFilter":
          return 'Bilaketa'
          
          // Menu Statistics
          
          case "Statistics":
          return 'Estatistikak'
          
          case "FileInfo":
          return 'Fitxategiaren informazioa'
          
          case "GeneralInfo":
          return 'Informazio orokorra'
          
          case "HierInfo":
          return 'Informazio hierarkikoa'
          
          case "ProtoConv":
          return 'Protokolo elkarrizketak'
          
          case "Graphs":
          return 'Gráfikak'
          
          case "Density":
          return 'Dentsitatea'
          
          case "GeneralInfoMod":
          return 'Fitxategiaren informazio orokorra'
          
          case "HierInfoMod":
          return 'Protokoloen informazio hierarkikoa'
          
          case "ProtoConvMod":
          return 'Protokoloaren elkarrizketa:'
          
          case "DensityMod":
          return '-ren dentsitatea' //ojo que aqui es al revés que en castellano, densidad de algo es algo-ren dentsitatea
          
          case "Packets":
          return 'Paketeak'
          
          case "Bytes":
          return 'Byteak'
          
          case "Num":
          return 'Kopurua ' //este tambien es al reves, nombre kopurua, 
          
          case "Interval":
          return 'Tartea'
          
          // Menu Language
          
          case "MenuLanguage":
          return 'Hizkuntza'
          
          case "English":
          return 'Ingelesa'
          
          case "Spanish":
          return 'Gaztelera'
          
          case "Catalan":
          return 'Katalaniera'
          
          case "Galician":
          return 'Galiziera'
          
          case "Basque":
          return 'Euskara' //el nombre oficial es con a ¬¬
                
        // Summary
        
        case "Time":
        return 'Denbora'
        
        case "Source":
        return 'Iturburua'
        
        case "Destination":
        return 'Helburua'
        
        case "Protocol":
        return 'Protokoloa'
        
        case "Length":
        return 'Luzeera'
        
        case "Info":
        return 'Informazioa'
        
        // IntroWebShark
        
        case "Welcome":
        return '¡Ongi etorri  '
        
        case "Browse":
        return 'Diska gogorrean zehar <b>nabigatu</b> eta ikusi nahi d(it)uzun fitxategia(k) aukeratu  edo bestela  <b>arrastatu</b> fitxategiak botoiaraino'
        
        case "Default":
        return 'Oinarrizko adibidea'
	}
	
}
}
