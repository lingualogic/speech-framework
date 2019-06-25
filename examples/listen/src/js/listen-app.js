/**
 * ListenApp-Hauptklasse fuer Web-Client zum Testen von Listen-API.
 */


function ListenApp() {

    var listen = null;

    // Update DOM on a Received Event

    var receivedEvent = function() {
        var errorButton = document.getElementById('errorClick');
        var startButton = document.getElementById('startClick');
        var stopButton = document.getElementById('stopClick');
        var errorText = document.getElementById('errorText');

        // Language-Button

        var language1Button = document.getElementById('language1Click');
        var language2Button = document.getElementById('language2Click');

        // ASR-Button

        var asr1Button = document.getElementById('asr1Click');
        var asr2Button = document.getElementById('asr2Click');
        var asr3Button = document.getElementById('asr3Click');
        var asr4Button = document.getElementById('asr4Click');
        var asr1Name = document.getElementById('asr1Name');
        var asr2Name = document.getElementById('asr2Name');
        var asr3Name = document.getElementById('asr3Name');
        var asr4Name = document.getElementById('asr4Name');

        // alle ASR-Button initialisieren

        var asrList = listen.getASRList();
        console.log('ASR-Liste:', asrList);

        // ASR1
        if ( asrList.length > 0 ) {
            asr1Name.innerHTML = asrList[ 0 ];
        } else {
            asr1Button.style.display = 'none';
        }
        // ASR2
        if ( asrList.length > 1 ) {
            asr2Name.innerHTML = asrList[ 1 ];
        } else {
            asr2Button.style.display = 'none';
        }
        // ASR3
        if ( asrList.length > 2 ) {
            asr3Name.innerHTML = asrList[ 2 ];
        } else {
            asr3Button.style.display = 'none';
        }
        // ASR4
        if ( asrList.length > 3 ) {
            asr4Name.innerHTML = asrList[ 3 ];
        } else {
            asr4Button.style.display = 'none';
        }

        var clearErrorText = function() {
            errorText.value = '';
        };

        /**
         * Fehler ein/ausschalten
         */

        var onErrorClick = function() {
            clearErrorText();
            if (listen.isErrorOutput()) {
                console.log('===> onErrorClick: error off');
                listen.setErrorOutputOff();
                errorButton.innerHTML = 'Fehler ein';
            } else {
                console.log('===> onErrorClick: error on');
                listen.setErrorOutputOn();
                errorButton.innerHTML = 'Fehler aus';
            }
        };


        /**
         * Listen starten
         */

        var onStartClick = function() {
            clearErrorText();
            console.log('===> onStartClick: starten der Spracherkennung');
            listen.start();
        };


        /**
         * Listen abbrechen
         */

        var onStopClick = function() {
            clearErrorText();
            console.log('===> onStopClick: stoppen der Spracherkennung');
            listen.stop();
        };


        // Sprache bestimmen

        var onLanguage1Click = function() {
            clearErrorText();
            console.log('===> onLanguage1Click: auf Deutsch umschalten');
            listen.setLanguage( 'de' );
        };


        var onLanguage2Click = function() {
            clearErrorText();
            console.log('===> onLanguage2Click: auf Englisch umschalten');
            listen.setLanguage( 'en' );
        };

        // ASR bestimmen

        var onASR1Click = function() {
            clearErrorText();
            console.log('===> onASR1Click: auf ASR1 umschalten');
            if ( asrList.length > 0 ) {
                listen.setASR( asrList[ 0 ]);
            }
        };


        var onASR2Click = function() {
            clearErrorText();
            console.log('===> onASR2Click: auf ASR2 umschalten');
            if ( asrList.length > 1 ) {
                listen.setASR( asrList[ 1 ]);
            }
        };


        var onASR3Click = function() {
            clearErrorText();
            console.log('===> onASR3Click: auf ASR3 umschalten');
            if ( asrList.length > 2 ) {
                listen.setASR( asrList[ 2 ]);
            }
        };


        var onASR4Click = function() {
            clearErrorText();
            console.log('===> onASR4Click: auf ASR4 umschalten');
            if ( asrList.length > 3 ) {
                listen.setASR( asrList[ 3 ]);
            }
        };

        errorButton.addEventListener('click', onErrorClick, false);
        startButton.addEventListener('click', onStartClick, false);
        stopButton.addEventListener('click', onStopClick, false);

        // Language

        language1Button.addEventListener('click', onLanguage1Click, false);
        language2Button.addEventListener('click', onLanguage2Click, false);

        // ASR

        asr1Button.addEventListener('click', onASR1Click, false);
        asr2Button.addEventListener('click', onASR2Click, false);
        asr3Button.addEventListener('click', onASR3Click, false);
        asr4Button.addEventListener('click', onASR4Click, false);

    };


    // Start Listen


    var initListen = function() {
        console.log('ListenApp.init: start...');

        var startButton = document.getElementById('startClick');
        var startButtonColor = startButton.style.backgroundColor;

        // erzeugt das Speech-System
        if ( speech.SpeechMain.init() !== 0 ) {
            console.log('ListenApp: wurde nicht initialisiert');
            return;
        }
        // erzeugt die Listen-Komponente
        listen = speech.ListenFactory.create();
        listen.setErrorOutputOn();

        // Listen-Events einbinden

        listen.addStartEvent( 'ListenApp', function() {
            console.log('ListenApp.startEvent');
            var startButton = document.getElementById('startClick');
            startButton.style.backgroundColor = 'red';
        });

        listen.addStopEvent( 'ListenApp', function() {
            console.log('ListenApp.stopEvent');
            var startButton = document.getElementById('startClick');
            startButton.style.backgroundColor = startButtonColor;
        });

        listen.addListenResultEvent( 'ListenApp', function(aResult) {
            console.log('ListenApp.resultEvent', aResult);
            var listenResult = document.getElementById( 'listenResult' );
            listenResult.value = aResult;
        });

        listen.addErrorEvent( 'ListenApp', function(aError) {
            console.log('ListenApp.errorEvent', aError.message);
            var errorText = document.getElementById( 'errorText' );
            errorText.value = aError.message;
        });

        // Intent-Version ausgeben

        var versionName = document.getElementById('versionName');
        versionName.innerHTML = listen.getVersion();

        receivedEvent();
        console.log('ListenApp.init: end');
    };


    // Hauptprogramm


    try {
        console.log('ListenApp: create...');
        // Nuance-Zurgiffsdaten als Optionen eintragen
        var option = {
            googleAppKey: GOOGLE_APP_KEY,
            microsoftRegion: MICROSOFT_REGION,
            microsoftSubscriptionKey: MICROSOFT_SUBSCRIPTION_KEY,
            nuanceAppId: APP_ID,
            nuanceAppKey: APP_KEY,
            nuanceNluTag: NLU_TAG
        };
        // erzeugt das Google-Modul
        if ( speech.Google ) {
            speech.Google.init( option );
            speech.Google.open((aError, aPortName, aPortResult) => {
                // TODO: Open geschieht im Moment noch nicht asynchron, sonst muss Nuance hier eingefuegt werden
                console.log('ListenApp.init: Google', aPortResult);
            });
        } else {
            console.log('ListenApp.init: kein Google vorhanden');
        }

        // erzeugt das Microsoft-Modul
        if ( speech.Microsoft ) {
            speech.Microsoft.init( option );
            speech.Microsoft.open((aError, aPortName, aPortResult) => {
                // TODO: Open geschieht im Moment noch nicht asynchron, sonst muss Nuance hier eingefuegt werden
                console.log('ListenApp.init: Microsoft', aPortResult);
            });
        } else {
            console.log('ListenApp.init: kein Microsoft vorhanden');
        }

        // erzeugt das Nuance-Modul
        if ( speech.Nuance ) {
            speech.Nuance.init( option );
            speech.Nuance.open((aError, aPortName, aPortResult) => {
                console.log('ListenApp.init: Nuance', aPortResult);
                initListen();
            });
        } else {
            console.log('ListenApp.init: kein Nuance vorhanden');
            initListen();
        }
    } catch ( aException ) {
        console.log('ListenApp.init: Exception', aException.message);
        return;
    }

}


