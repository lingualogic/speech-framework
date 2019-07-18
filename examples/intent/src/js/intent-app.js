/**
 * IntentApp-Hauptklasse fuer Web-Client zum Testen von Intent-API.
 */


function IntentApp() {


    var intent = null;


    // Update DOM on a Received Event

    var receivedEvent = function() {
        var errorButton = document.getElementById('errorClick');

        var startButton = document.getElementById('startClick');
        var stopButton = document.getElementById('stopClick');

        var errorText = document.getElementById('errorText');

        // Language-Button

        var language1Button = document.getElementById('language1Click');
        var language2Button = document.getElementById('language2Click');

        // NLU-Button

        var nlu1Button = document.getElementById('nlu1Click');
        var nlu2Button = document.getElementById('nlu2Click');
        var nlu3Button = document.getElementById('nlu3Click');
        var nlu4Button = document.getElementById('nlu4Click');
        var nlu1Name = document.getElementById('nlu1Name');
        var nlu2Name = document.getElementById('nlu2Name');
        var nlu3Name = document.getElementById('nlu3Name');
        var nlu4Name = document.getElementById('nlu4Name');

        // Intent-Elemente

        var intentText = document.getElementById('intentText');
        var clearErrorText = function() {
            errorText.value = '';
        };

        /**
         * Fehler ein/ausschalten
         */

        var onErrorClick = function() {
            clearErrorText();
            if (intent.isErrorOutput()) {
                console.log('===> onErrorClick: error off');
                intent.setErrorOutputOff();
                errorButton.innerHTML = 'Fehler ein';
            } else {
                console.log('===> onErrorClick: error on');
                intent.setErrorOutputOn();
                errorButton.innerHTML = 'Fehler aus';
            }
        };


        /**
         * Intent starten
         */

        var onStartClick = function() {
            clearErrorText();
            var text = intentText.value;
            console.log('===> onStartClick: starten der Sprachanalyse ', text);
            intent.setIntentText( text );
            intent.start();
        };


        /**
         * Intent abbrechen
         */

        var onStopClick = function() {
            clearErrorText();
            console.log('===> onStopClick: stoppen der Sprachanalyse');
            intent.stop();
        };


        // Sprache bestimmen

        var onLanguage1Click = function() {
            clearErrorText();
            console.log('===> onLanguage1Click: auf Deutsch umschalten');
            intent.setLanguage( 'de' );
        };


        var onLanguage2Click = function() {
            clearErrorText();
            console.log('===> onLanguage2Click: auf Englisch umschalten');
            intent.setLanguage( 'en' );
        };

        // alle NLU-Button initialisieren

        var nluList = intent.getNLUList();
        console.log('NLU-Liste:', nluList);

        // NLU1
        if ( nluList.length > 0 ) {
            nlu1Name.innerHTML = nluList[ 0 ];
        } else {
            nlu1Button.style.display = 'none';
        }
        // NLU2
        if ( nluList.length > 1 ) {
            nlu2Name.innerHTML = nluList[ 1 ];
        } else {
            nlu2Button.style.display = 'none';
        }
        // NLU3
        if ( nluList.length > 2 ) {
            nlu3Name.innerHTML = nluList[ 2 ];
        } else {
            nlu3Button.style.display = 'none';
        }
        // NLU4
        if ( nluList.length > 3 ) {
            nlu4Name.innerHTML = nluList[ 3 ];
        } else {
            nlu4Button.style.display = 'none';
        }

        // NLU bestimmen

        var onNLU1Click = function() {
            clearErrorText();
            console.log('===> onNLU1Click: auf NLU1 umschalten');
            if ( nluList.length > 0 ) {
                intent.setNLU( nluList[ 0 ]);
            }
        };


        var onNLU2Click = function() {
            clearErrorText();
            console.log('===> onNLU2Click: auf NLU2 umschalten');
            if ( nluList.length > 1 ) {
                intent.setNLU( nluList[ 1 ]);
            }
        };


        var onNLU3Click = function() {
            clearErrorText();
            console.log('===> onNLU3Click: auf NLU3 umschalten');
            if ( nluList.length > 2 ) {
                intent.setNLU( nluList[ 2 ]);
            }
        };


        var onNLU4Click = function() {
            clearErrorText();
            console.log('===> onNLU4Click: auf NLU4 umschalten');
            if ( nluList.length > 3 ) {
                intent.setNLU( nluList[ 3 ]);
            }
        };

        errorButton.addEventListener('click', onErrorClick, false);
        startButton.addEventListener('click', onStartClick, false);
        stopButton.addEventListener('click', onStopClick, false);

        // Language

        language1Button.addEventListener('click', onLanguage1Click, false);
        language2Button.addEventListener('click', onLanguage2Click, false);

        // NLU

        nlu1Button.addEventListener('click', onNLU1Click, false);
        nlu2Button.addEventListener('click', onNLU2Click, false);
        nlu3Button.addEventListener('click', onNLU3Click, false);
        nlu4Button.addEventListener('click', onNLU4Click, false);
    };


    // Intent initialisieren


    var initIntent = function() {
        console.log('IntentApp.init: start...');

        var startButton = document.getElementById('startClick');
        var startButtonColor = startButton.style.backgroundColor;

        // erzeugt das Speech-System
        if ( speech.SpeechMain.init() !== 0 ) {
            console.log('IntentApp: wurde nicht initialisiert');
            return;
        }
        // erzeugt die Intent-Komponente
        intent = speech.IntentFactory.create();
        intent.setErrorOutputOn();

        // Intent-Events einbinden

        intent.addStartEvent('IntentApp', function() {
            console.log('IntentApp.startEvent');
            var startButton = document.getElementById('startClick');
            startButton.style.backgroundColor = 'red';
        });

        intent.addStopEvent('IntentApp', function() {
            console.log('IntentApp.stopEvent');
            var startButton = document.getElementById('startClick');
            startButton.style.backgroundColor = startButtonColor;
        });

        intent.addListenResultEvent('IntentApp', function(aResult) {
            console.log('IntentApp.listenResultEvent', aResult);
            var listenResult = document.getElementById('listenResult');
            listenResult.value = aResult;
        });

        intent.addIntentResultEvent('IntentApp', function(aResult) {
            console.log('IntentApp.IntentResultEvent', aResult);
            var listenResult = document.getElementById('listenResult');
            listenResult.value = aResult.literal;
            var intentResult = document.getElementById('intentResult');
            if ( aResult.confidence > 0.0 ) {
                intentResult.value = 'Intent = ' + aResult.intent + ',  Confidence = ' + aResult.confidence;
            } else {
                intentResult.value = aResult.intent;
            }
            var entityResult = document.getElementById('entityResult');
            if ( aResult.conceptList.length > 0 ) {
                let confidence = '';
                if ( aResult.conceptList[0].confidence ) {
                    confidence = ',  Confidence = ' + aResult.conceptList[0].confidence;
                }
                entityResult.value = 'Konzept = ' + aResult.conceptList[0].concept + ',  Wert = ' + aResult.conceptList[0].literal + confidence;
            } else {
                entityResult.value = '';
            }
            var speechResult = document.getElementById('speechResult');
            if ( aResult.speech ) {
                speechResult.value = aResult.speech;
            } else {
                speechResult.value = '';
            }
        });

        intent.addErrorEvent('IntentApp', function(aError) {
            console.log('IntentApp.errorEvent', aError.message);
            var errorText = document.getElementById('errorText');
            errorText.value = aError.message;
        });

        // Intent-Version ausgeben

        var versionName = document.getElementById('versionName');
        versionName.innerHTML = intent.getVersion();

        receivedEvent();

        console.log('IntentApp.init: end');
    };


    // Hauptprogramm


    try {
        console.log('IntentApp: create...');
        var option = {
            rasaAppKey: RASA_APP_KEY,
            googleAppKey: GOOGLE_APP_KEY,
            nuanceAppId: APP_ID,
            nuanceAppKey: APP_KEY,
            nuanceNluTag: NLU_TAG
        };

        // erzeugt das Google-Modul

        if ( speech.Google ) {
            speech.Google.init( option );
            speech.Google.open((aError, aPortName, aPortResult) => {
                // TODO: Open geschieht im Moment noch nicht asynchron, sonst muss Nuance hier eingefuegt werden
                console.log('IntentApp.init: Google', aPortResult);
            });
        } else {
            console.log('IntentApp.init: kein Google vorhanden');
        }

        // erzeugt das Rasa-Modul

        if ( speech.Rasa ) {
            speech.Rasa.init( option );
            speech.Rasa.open((aError, aPortName, aPortResult) => {
                // TODO: Open geschieht im Moment noch nicht asynchron, sonst muss Nuance hier eingefuegt werden
                console.log('IntentApp.init: Rasa', aPortResult);
            });
        } else {
            console.log('IntentApp.init: kein Rasa vorhanden');
        }

        // erzeugt das Nuance-Modul

        if ( speech.Nuance ) {
            speech.Nuance.init( option );
            speech.Nuance.open((aError, aPortName, aPortResult) => {
                console.log('IntentApp.init: Nuance', aPortResult);
                initIntent();
            });
        } else {
            console.log('IntentApp.init: kein Nuance vorhanden');
            initIntent();
        }
    } catch (aException) {
        console.log('IntentApp.init: Exception', aException.message);
        return;
    }

}


