function PrefsAssistant(currentSeries, currentUnit) {
    /* this is the creator function for your scene assistant
       object. It will be passed all the additional parameters (after
       the scene name) that were passed to pushScene. The reference to
       the scene controller (this.controller) has not be established
       yet, so any initialization that needs the scene controller
       should be done in the setup function below. */

    this.currentSeries = currentSeries;
    this.currentUnit   = currentUnit;

    if (Papersizes.prefs.keeplast) {
        this.startSeriesSelection = "keeplast"
    } else {
        this.startSeriesSelection = Papersizes.prefs.startseries
    }

    if (Papersizes.prefs.keeplastunit) {
        this.startUnitSelection = "keeplast"
    } else {
        this.startUnitSelection = Papersizes.prefs.unit
    }

    this.cookie = new Mojo.Model.Cookie("PapersizesPrefs");
}

PrefsAssistant.prototype.setup = function() {
    /* this function is for setup tasks that have to happen when the scene is first created */

    /* use Mojo.View.render to render view templates and add them to the scene, if needed */

    /* setup widgets here */

    this.controller.setupWidget(Mojo.Menu.appMenu, Papersizes.appMenuAttr,
                                { items: [
                                    { label: $L("About"), command: 'do-about' }
                                ]});

    this.controller.setupWidget("selectStartSeries",
                                this.attributes = {
                                    label: $L("Series"),
                                    choices: Papersizes.startSeriesPrefsItems
                                },
                                this.model = {
                                    value: this.startSeriesSelection
                                });

    this.controller.setupWidget("selectStartUnit",
                                this.attributes = {
                                    label: $L("Unit"),
                                    choices: [
                                        { label: $L("Millimetre"), value: "mm" },
                                        { label: $L("Inch"),       value: "in" },
                                        { label: $L("Point"),      value: "pt" },
                                        { label: $L("Pixel"),      value: "px" },
                                        { label: $L("Aspect ratio"),       value: "aspect" },
                                        { label: $L("Keep last selected"), value: "keeplast" }
                                    ]},
                                this.model = {
                                    value: this.startUnitSelection
                                });

    this.controller.setupWidget("selectDPI",
                                this.attributes = {
                                    label: $L("DPI"),
                                    choices: [
                                        { label: "100", value: 100 },
                                        { label: "150", value: 150 },
                                        { label: "200", value: 200 },
                                        { label: "300", value: 300 },
                                        { label: "600", value: 600 }
                                    ]},
                                this.model = {
                                    value: Papersizes.prefs.dpi,
                                });

    this.controller.setupWidget("selectAspect",
                                this.attributes = {
                                    label: $L("Display"),
                                    choices: [
                                        { label: $L("Ratio"),    value: "ratio" },
                                        { label: $L("Fraction"), value: "fraction" }
                                    ]},
                                this.model = {
                                    value: Papersizes.prefs.showaspectas,
                                });

    /* add event handlers to listen to events from widgets */

    this.selectStartSeriesHandler = this.handleSelectStartSeries.bindAsEventListener(this);
    this.selectStartUnitHandler = this.handleSelectStartUnit.bindAsEventListener(this);
    this.selectDPIHandler = this.handleSelectDPI.bindAsEventListener(this);
    this.selectAspectHandler = this.handleSelectAspect.bindAsEventListener(this);

};

PrefsAssistant.prototype.activate = function(event) {
    /* put in event handlers here that should only be in effect when
       this scene is active. For example, key handlers that are
       observing the document */

    Mojo.Event.listen(this.controller.get("selectStartSeries"), Mojo.Event.propertyChange,
                      this.selectStartSeriesHandler);
    Mojo.Event.listen(this.controller.get("selectStartUnit"), Mojo.Event.propertyChange,
                      this.selectStartUnitHandler);
    Mojo.Event.listen(this.controller.get("selectDPI"), Mojo.Event.propertyChange,
                      this.selectDPIHandler);
    Mojo.Event.listen(this.controller.get("selectAspect"), Mojo.Event.propertyChange,
                      this.selectAspectHandler);

    Mojo.Log.info("showaspectas=", Papersizes.prefs.showaspectas);
};

PrefsAssistant.prototype.deactivate = function(event) {
    /* remove any event handlers you added in activate and do any
       other cleanup that should happen before this scene is popped or
       another scene is pushed on top */

    Mojo.Event.stopListening(this.controller.get("selectStartSeries"), Mojo.Event.propertyChange,
                             this.selectStartSeriesHandler);
    Mojo.Event.stopListening(this.controller.get("selectStartUnit"), Mojo.Event.propertyChange,
                             this.selectStartUnitHandler);
    Mojo.Event.stopListening(this.controller.get("selectDPI"), Mojo.Event.propertyChange,
                             this.selectDPIHandler);
    Mojo.Event.stopListening(this.controller.get("selectAspect"), Mojo.Event.propertyChange,
                             this.selectAspectHandler);
};

PrefsAssistant.prototype.cleanup = function(event) {
    /* this function should do any cleanup needed before the scene is
       destroyed as a result of being popped off the scene stack */
};


PrefsAssistant.prototype.handleSelectStartSeries = function(event) {
    if (event.value == "keeplast") {
        Papersizes.prefs.keeplast = true;
        Papersizes.prefs.startseries = this.currentSeries;
    } else {
        Papersizes.prefs.keeplast = false;
        Papersizes.prefs.startseries = event.value;
    }
    this.cookie.put(Papersizes.prefs);
}

PrefsAssistant.prototype.handleSelectStartUnit = function(event) {
    if (event.value == "keeplast") {
        Papersizes.prefs.keeplastunit = true;
        Papersizes.prefs.unit = this.currentUnit;
    } else {
        Papersizes.prefs.keeplastunit = false;
        Papersizes.prefs.unit = event.value;
    }
    this.cookie.put(Papersizes.prefs);
}

PrefsAssistant.prototype.handleSelectDPI = function(event) {
    Papersizes.prefs.dpi = event.value;
    Papersizes.displaySettingsUpdated = true;
    this.cookie.put(Papersizes.prefs);
}

PrefsAssistant.prototype.handleSelectAspect = function(event) {
    Papersizes.prefs.showaspectas = event.value;
    Papersizes.displaySettingsUpdated = true;
    this.cookie.put(Papersizes.prefs);
}
