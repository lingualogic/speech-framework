/**
 * SpeakApp-Hauptklasse fuer Web-Client zum Testen von Speak-API.
 */


function SpeakApp() {

    var speak = null;

    // Update DOM on a Received Event

    var receivedEvent = function() {
        var audioButton = document.getElementById('audioClick');
        var errorButton = document.getElementById('errorClick');

        var startButton = document.getElementById('startClick');
        var stopButton = document.getElementById('stopClick');

        var errorText = document.getElementById('errorText');

        // Language-Button

        var language1Button = document.getElementById('language1Click');
        var language2Button = document.getElementById('language2Click');

        // TTS-Button

        var tts1Button = document.getElementById('tts1Click');
        var tts2Button = document.getElementById('tts2Click');
        var tts3Button = document.getElementById('tts3Click');
        var tts4Button = document.getElementById('tts4Click');
        var tts1Name = document.getElementById('tts1Name');
        var tts2Name = document.getElementById('tts2Name');
        var tts3Name = document.getElementById('tts3Name');
        var tts4Name = document.getElementById('tts4Name');

        // Speak-Elemente

        var speakText = document.getElementById('speakText');

        var voice1Button = document.getElementById('voice1Click');
        var voice2Button = document.getElementById('voice2Click');
        var voice3Button = document.getElementById('voice3Click');
        var voice4Button = document.getElementById('voice4Click');
        var voice5Button = document.getElementById('voice5Click');
        var voice6Button = document.getElementById('voice6Click');
        var voice1Name = document.getElementById('voice1Name');
        var voice2Name = document.getElementById('voice2Name');
        var voice3Name = document.getElementById('voice3Name');
        var voice4Name = document.getElementById('voice4Name');
        var voice5Name = document.getElementById('voice5Name');
        var voice6Name = document.getElementById('voice6Name');

        var voiceList = [];        

        // alle TTS-Button initialisieren

        var ttsList = speak.getTTSList();
        // console.log('TTS-Liste:', ttsList);

        // TTS1
        if ( ttsList.length > 0 ) {
            tts1Name.innerHTML = ttsList[ 0 ];
        } else {
            tts1Button.style.display = 'none';
        }
        // TTS2
        if ( ttsList.length > 1 ) {
            tts2Name.innerHTML = ttsList[ 1 ];
        } else {
            tts2Button.style.display = 'none';
        }
        // TTS3
        if ( ttsList.length > 2 ) {
            tts3Name.innerHTML = ttsList[ 2 ];
        } else {
            tts3Button.style.display = 'none';
        }
        // TTS4
        if ( ttsList.length > 3 ) {
            tts4Name.innerHTML = ttsList[ 3 ];
        } else {
            tts4Button.style.display = 'none';
        }

        // alle Voice-Button initialisieren

        var setVoiceList = function() {
            voiceList = speak.getVoiceList();
            console.log('Stimmenliste:', voiceList);
            if ( voiceList.length > 0 ) {
                voice1Name.innerHTML = voiceList[ 0 ];
                voice1Button.style.display = 'block';
            } else {
                voice1Button.style.display = 'none';
            }
            if ( voiceList.length > 1 ) {
                voice2Name.innerHTML = voiceList[ 1 ];
                voice2Button.style.display = 'block';
            } else {
                voice2Button.style.display = 'none';
            }
            if ( voiceList.length > 2 ) {
                voice3Name.innerHTML = voiceList[ 2 ];
                voice3Button.style.display = 'block';
            } else {
                voice3Button.style.display = 'none';
            }
            if ( voiceList.length > 3 ) {
                voice4Name.innerHTML = voiceList[ 3 ];
                voice4Button.style.display = 'block';
            } else {
                voice4Button.style.display = 'none';
            }
            if ( voiceList.length > 4 ) {
                voice5Name.innerHTML = voiceList[ 4 ];
                voice5Button.style.display = 'block';
            } else {
                voice5Button.style.display = 'none';
            }
            if ( voiceList.length > 5 ) {
                voice6Name.innerHTML = voiceList[ 5 ];
                voice6Button.style.display = 'block';
            } else {
                voice6Button.style.display = 'none';
            }
        };

        var clearErrorText = function() {
            errorText.value = '';
        };

        
        /**
         * Audio ein/ausschalten
         */

        var onAudioClick = function() {
            clearErrorText();
            if ( speak.isAudio()) {
                console.log('===> onAudioClick: audio off');
                speak.setAudioOff();
                audioButton.innerHTML = 'Audio ein';
            } else {
                console.log('===> onAudioClick: audio on');
                speak.setAudioOn();
                audioButton.innerHTML = 'Audio aus';
            }
        };
        

        /**
         * Fehler ein/ausschalten
         */

        var onErrorClick = function() {
            clearErrorText();
            if ( speak.isErrorOutput()) {
                console.log('===> onErrorClick: error off');
                speak.setErrorOutputOff();
                errorButton.innerHTML = 'Fehler ein';
            } else {
                console.log('===> onErrorClick: error on');
                speak.setErrorOutputOn();
                errorButton.innerHTML = 'Fehler aus';
            }
        };


        /**
         * Speak einschalten
         */

        var onStartClick = function() {
            clearErrorText();
            var text = speakText.value;
            console.log('===> onStartClick: starten der Sprachausgabe ', text);
            // speak.setAudioFilePath('../assets/speech/audio/');
            speak.setAudioFileName('yannick1');
            speak.setSpeakText( text );
            speak.start();
        };


        /**
         * Speak ausschalten
         */

        var onStopClick = function() {
            clearErrorText();
            console.log('===> onStopClick: stoppen der Sprachausgabe');
            speak.stop();
        };


        // Sprache bestimmen


        var onLanguage1Click = function() {
            clearErrorText();
            console.log('===> onLanguage1Click: auf Deutsch umschalten');
            speak.setLanguage( 'de' );
            setVoiceList();
        };


        var onLanguage2Click = function() {
            clearErrorText();
            console.log('===> onLanguage2Click: auf Englisch umschalten');
            speak.setLanguage( 'en' );
            setVoiceList();
        };


        // TTS bestimmen


        var onTTS1Click = function() {
            clearErrorText();
            console.log('===> onTTS1Click: auf TTS1 umschalten');
            if ( ttsList.length > 0 ) {
                speak.setTTS( ttsList[ 0 ]);
                setVoiceList();
            }
        };


        var onTTS2Click = function() {
            clearErrorText();
            console.log('===> onTTS2Click: auf TTS2 umschalten');
            if ( ttsList.length > 1 ) {
                speak.setTTS( ttsList[ 1 ]);
                setVoiceList();
            }
        };


        var onTTS3Click = function() {
            clearErrorText();
            console.log('===> onTTS3Click: auf TTS3 umschalten');
            if ( ttsList.length > 2 ) {
                speak.setTTS( ttsList[ 2 ]);
                setVoiceList();
            }
        };


        var onTTS4Click = function() {
            clearErrorText();
            console.log('===> onTTS4Click: auf TTS4 umschalten');
            if ( ttsList.length > 3 ) {
                speak.setTTS( ttsList[ 3 ]);
                setVoiceList();
            }
        };


        // Voice bestimmen


        var onVoice1Click = function() {
            clearErrorText();
            console.log('===> onVoice1Click: auf Voice1 umschalten');
            if ( voiceList.length > 0 ) {
                speak.setVoice( voiceList[ 0 ]);
            }
        };

    
        var onVoice2Click = function() {
            clearErrorText();
            console.log('===> onVoice2Click: auf Voice2 umschalten');
            if ( voiceList.length > 1 ) {
                speak.setVoice( voiceList[ 1 ]);
            }
        };


        var onVoice3Click = function() {
            clearErrorText();
            console.log('===> onVoice3Click: auf Voice3 umschalten');
            if ( voiceList.length > 2 ) {
                speak.setVoice( voiceList[ 2 ]);
            }
        };


        var onVoice4Click = function() {
            clearErrorText();
            console.log('===> onVoice4Click: auf Voice4 umschalten');
            if ( voiceList.length > 3 ) {
                speak.setVoice( voiceList[ 3 ]);
            }
        };


        var onVoice5Click = function() {
            clearErrorText();
            console.log('===> onVoice5Click: auf Voice5 umschalten');
            if ( voiceList.length > 4 ) {
                speak.setVoice( voiceList[ 4 ]);
            }
        };


        var onVoice6Click = function() {
            clearErrorText();
            console.log('===> onVoice6Click: auf Voice6 umschalten');
            if ( voiceList.length > 5 ) {
                speak.setVoice( voiceList[ 5 ]);
            }
        };


        audioButton.addEventListener('click', onAudioClick, false);
        errorButton.addEventListener('click', onErrorClick, false);

        startButton.addEventListener('click', onStartClick, false);
        stopButton.addEventListener('click', onStopClick, false);

        // Language

        language1Button.addEventListener('click', onLanguage1Click, false);
        language2Button.addEventListener('click', onLanguage2Click, false);
    
        // TTS

        tts1Button.addEventListener('click', onTTS1Click, false);
        tts2Button.addEventListener('click', onTTS2Click, false);
        tts3Button.addEventListener('click', onTTS3Click, false);
        tts4Button.addEventListener('click', onTTS4Click, false);

        // Voice 

        voice1Button.addEventListener('click', onVoice1Click, false);
        voice2Button.addEventListener('click', onVoice2Click, false);
        voice3Button.addEventListener('click', onVoice3Click, false);
        voice4Button.addEventListener('click', onVoice4Click, false);
        voice5Button.addEventListener('click', onVoice5Click, false);
        voice6Button.addEventListener('click', onVoice6Click, false);

        // Warten, bis Stimmen asynchron geladen sind

        setTimeout( setVoiceList, 500 );
    };


    // Start Speak


    var initSpeak = function() {
        console.log('SpeakApp.init: start');

        // erzeugt das Speech-System
        if ( speech.SpeechMain.init() !== 0 ) {
            console.log('SpeakApp: wurde nicht initialisiert');
            return;
        }

        // erzeugt die Speak-Komponente
        speak = speech.SpeakFactory.create();
        speak.setErrorOutputOn();

        // Speak-Events einbinden

        speak.addStartEvent('SpeakApp', function() {
            console.log('SpeakApp.startSpeakEvent');
        });

        speak.addStopEvent('SpeakApp', function() {
            console.log('SpeakApp.stopSpeakEvent');
        });

        speak.addErrorEvent('SpeakApp', function(aError) {
            console.log('SpeakApp.errorEvent', aError.message);
            var errorText = document.getElementById('errorText');
            errorText.value = aError.message;
        });

        // Speak-Version ausgeben

        var versionName = document.getElementById('versionName');
        versionName.innerHTML = speak.getVersion();

        receivedEvent();
        console.log('SpeakApp.init: end');
    };


    // Hauptprogramm


    try {
        console.log('SpeakApp: create...');
        // Amazon-Zurgiffsdaten als Optionen eintragen
        var amazonOption = {
            amazonRegion: REGION,
            amazonIdentityPoolId: IDENTITY_POOL_ID,
            errorOutputFlag: true
        };
        // erzeugt das Amazon-Modul
        // console.log('pruefen auf speech.Amazon', speech.Amazon );
        if ( speech.Amazon ) {
            if ( speech.Amazon.init( amazonOption ) === 0 ) {
                speech.Amazon.open((aError, aPortName, aPortResult) => {
                    console.log('SpeakApp.init: Amazon', aPortResult);
                });
            } else {
                console.log('Amazon nicht initialisiert');
            }
        } else {
            console.log('Amazon nicht vorhanden');
        }
        // Google-Zurgiffsdaten als Optionen eintragen
        var googleOption = {
            googleAppKey: GOOGLE_APP_KEY,
            errorOutputFlag: true
        };
        // erzeugt das Google-Modul
        // console.log('pruefen auf speech.Google', speech.Google );
        if ( speech.Google ) {
            if ( speech.Google.init( googleOption ) === 0 ) {
                speech.Google.open((aError, aPortName, aPortResult) => {
                    console.log('SpeakApp.init: Google', aPortResult);
                });
            } else {
                console.log('Google nicht initialisiert');
            }
        } else {
            console.log('Google nicht vorhanden');
        }
        // Nuance-Zurgiffsdaten als Optionen eintragen
        var nuanceOption = {
            nuanceAppId: APP_ID,
            nuanceAppKey: APP_KEY,
            errorOutputFlag: false
        };
        // console.log('pruefen auf speech.Nuance', speech.Nuance );
        // erzeugt das Nuance-Modul
        if ( speech.Nuance ) {
            // console.log('start von Nuance.init');
            if ( speech.Nuance.init( nuanceOption ) === 0 ) {
                // console.log('start von Nuance.open');
                if ( speech.Nuance.open((aError, aPortName, aPortResult) => {
                    console.log('SpeakApp.init: Nuance', aPortResult);
                    initSpeak();
                    console.log('SpeakApp.init: nach initSpeak');
                }) !== 0 ) {
                    console.log('SpeakApp.init: Nuance.open = -1');
                    initSpeak();
                }
            } else {
                console.log('SpeakApp.init: Nuance.init = -1');
                initSpeak();
            }
        } else {
            console.log('SpeakApp.init: Nuance nicht vorhanden');
            initSpeak();
            console.log('SpeakApp.init: nach initSpeak');
        }
    } catch ( aException ) {
        console.log('SpeakApp.init: Exception', aException.message);
        return;
    }


}


