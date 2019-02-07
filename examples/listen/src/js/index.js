/**
 * Hauptkomponente fuer Listen-API Web-Client.
 */


var listenApp = null;

// OnLoad-Event eintragen
/**
window.addEventListener('load', () => {
    intentApp = new IntentApp();
    console.log('alles initialisiert');
});
**/

var app = {
    // Application Constructor
    initialize: function() {
        if ( !window.cordova ) {
            window.addEventListener('load', this.onLoadReady.bind(this), false);
        } else {
            document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        }
    },


    // loadready Event Handler
    //
    onLoadReady: function() {
        this.receivedEvent('load');
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        console.log('Cordova initialisiert');
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        listenApp = new ListenApp();
        console.log('ListenApp initialisiert');
    }
};

app.initialize();
