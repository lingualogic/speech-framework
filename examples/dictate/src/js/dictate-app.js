/**
 * DictateApp-Hauptklasse fuer Web-Client zum Testen von Listen-API im Diktiermodus.
 */


function DictateApp() {

    var listen = null;
    var litenText = '';

    // Update DOM on a Received Event

    var receivedEvent = function() {
        var errorButton = document.getElementById('errorClick');
        var startButton = document.getElementById('startClick');
        var stopButton = document.getElementById('stopClick');
        var errorText = document.getElementById('errorText');

        // Language-Button

        var language1Button = document.getElementById('language1Click');
        var language2Button = document.getElementById('language2Click');

        // ListenMode-Button

        var mode1Button = document.getElementById('mode1Click');
        var mode2Button = document.getElementById('mode2Click');

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
            listen.setTimeout( 5000 );
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


        // Eingabemodus bestimmen

        
        var onMode1Click = function() {
            clearErrorText();
            console.log('===> onMode1Click: auf Command umschalten');
            listen.setMode( 'Command' );
        };


        var onMode2Click = function() {
            clearErrorText();
            console.log('===> onMode2Click: auf Dictate umschalten');
            listen.setMode( 'Dictate' );
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

        // ListenMode

        mode1Button.addEventListener('click', onMode1Click, false);
        mode2Button.addEventListener('click', onMode2Click, false);

        // ASR

        asr1Button.addEventListener('click', onASR1Click, false);
        asr2Button.addEventListener('click', onASR2Click, false);
        asr3Button.addEventListener('click', onASR3Click, false);
        asr4Button.addEventListener('click', onASR4Click, false);

    };


    // Start Listen


    var initListen = function() {
        console.log('DictateApp.init: start...');

        var startButton = document.getElementById('startClick');
        var startButtonColor = startButton.style.backgroundColor;

        // erzeugt das Speech-System
        if ( speech.SpeechMain.init() !== 0 ) {
            console.log('DictateApp: wurde nicht initialisiert');
            return;
        }
        // erzeugt die Listen-Komponente
        listen = speech.ListenFactory.create();
        listen.setErrorOutputOn();

        // Listen-Events einbinden

        listen.addStartEvent( 'DictateApp', function() {
            console.log('DictateApp.startEvent');
            listenText = '';
        });

        listen.addStopEvent( 'DictateApp', function() {
            console.log('DictateApp.stopEvent');
        });

        listen.addListenAudioStartEvent( 'DictateApp', function() {
            console.log('DictateApp.startAudioEvent');
            var startButton = document.getElementById('startClick');
            startButton.style.backgroundColor = 'red';
        });

        listen.addListenAudioStopEvent( 'DictateApp', function() {
            console.log('DictateApp.stopAudioEvent');
            var startButton = document.getElementById('startClick');
            startButton.style.backgroundColor = startButtonColor;
        });

        listen.addListenResultEvent( 'DictateApp', function(aResult) {
            console.log('DictateApp.resultEvent', aResult);
            var listenResult = document.getElementById( 'listenResult' );
            if ( !listenText ) {
                listenText += aResult;
            } else {
                listenText += ' ' + aResult;
            }
            listenResult.value = listenText;
        });

        listen.addListenInterimResultEvent( 'DictateApp', function(aResult) {
            console.log('DictateApp.interimResultEvent', aResult);
            var listenResult = document.getElementById( 'listenResult' );
            listenResult.value = listenText + aResult;
        });

        listen.addErrorEvent( 'DictateApp', function(aError) {
            console.log('DictateApp.errorEvent', aError.message);
            var errorText = document.getElementById( 'errorText' );
            errorText.value = aError.message;
        });

        // Intent-Version ausgeben

        var versionName = document.getElementById('versionName');
        versionName.innerHTML = listen.getVersion();

        receivedEvent();
        console.log('DictateApp.init: end');
    };


    // Hauptprogramm


    try {
        console.log('DictateApp: create...');
        // Google-Zurgiffsdaten als Optionen eintragen
        var googleOption = {
            googleAppKey: GOOGLE_APP_KEY,
            googleServerUrl: GOOGLE_SERVER_URL,
            errorOutputFlag: true
        };
        // erzeugt das Google-Modul
        if ( speech.Google ) {
            if ( speech.Google.init( googleOption ) === 0 ) {
                speech.Google.open((aError, aPortName, aPortResult) => {
                    // TODO: Open geschieht im Moment noch nicht asynchron, sonst muss Nuance hier eingefuegt werden
                    console.log('DictateApp.init: Google', aPortResult);
                });
            } else {
                console.log('DictateApp.init: Google nicht initialisiert');
            }
        } else {
            console.log('DictateApp.init: Google nicht vorhanden');
        }

        // Microsoft-Zurgiffsdaten als Optionen eintragen
        var microsoftOption = {
            microsoftRegion: MICROSOFT_REGION,
            microsoftSubscriptionKey: MICROSOFT_SUBSCRIPTION_KEY,
            errorOutputFlag: true
        };
        // erzeugt das Microsoft-Modul
        if ( speech.Microsoft ) {
            if ( speech.Microsoft.init( microsoftOption ) === 0 ) {
                speech.Microsoft.open((aError, aPortName, aPortResult) => {
                    // TODO: Open geschieht im Moment noch nicht asynchron, sonst muss Nuance hier eingefuegt werden
                    console.log('DictateApp.init: Microsoft', aPortResult);
                });
            } else {
                console.log('DictateApp.init: Microsoft nicht initialisiert');                
            }
        } else {
            console.log('DictateApp.init: Microsoft nicht vorhanden');
        }
        // startet Listen
        initListen();
    } catch ( aException ) {
        console.log('DictateApp.init: Exception', aException.message);
        return;
    }

}


