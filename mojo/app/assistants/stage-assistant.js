function StageAssistant() {
    /* this is the creator function for your stage assistant object */

    this.aboutMessage =
        "<div style='float: right'><img src='images/fj-logo.png'></div>"
        + $L("Copyright 2011, Florian Jenn.") + " "
        + "<a href='"
        + Mojo.Controller.appInfo.vendorurl
        + "'>www.effjot.net</a><br>"
        + "<div style='clear: both'>"
        + $L("A reference of ISO/DIN and North American paper size series and common photo print formats.")
        + "<br>"
        + $L("Support and development:")
        + " <a href='http://forums.precentral.net/webos-homebrew-apps/276750-paper-sizes.html'>"
        + $L("PreCentral forum")
        + "</a>.</div>";


    /* Global variable holding data and preferences */

    Papersizes = {

        // Paper size definitions
        seriesNames: {
            A: $L("ISO 216 Series A"),
            B: $L("ISO 216 Series B"),
            C: $L("ISO 216 Series C"),
            D: $L("ISO 216 Series D"),
            N: $L("North American Sizes"),
            P: $L("Photo Prints")
        },

        seriesItems: {
            P: {                // portrait ("L" for landscape will be filled in below)
                A: [
                    { dt: "A0",  width: 841, height: 1189 },
                    { dt: "A1",  width: 594, height: 841 },
                    { dt: "A2",  width: 420, height: 594 },
                    { dt: "A3",  width: 297, height: 420 },
                    { dt: "A4",  width: 210, height: 297 },
                    { dt: "A5",  width: 148, height: 210 },
                    { dt: "A6",  width: 105, height: 148 },
                    { dt: "A7",  width:  74, height: 105 },
                    { dt: "A8",  width:  52, height:  74 },
                    { dt: "A9",  width:  37, height:  52 },
                    { dt: "A10", width:  26, height:  37 }
                ],

                B: [
                    { dt: "B0",  width: 1000, height: 1414 },
                    { dt: "B1",  width: 707, height: 1000 },
                    { dt: "B2",  width: 500, height: 707 },
                    { dt: "B3",  width: 353, height: 500 },
                    { dt: "B4",  width: 250, height: 353 },
                    { dt: "B5",  width: 176, height: 250 },
                    { dt: "B6",  width: 125, height: 176 },
                    { dt: "B7",  width:  88, height: 125 },
                    { dt: "B8",  width:  62, height:  88 },
                    { dt: "B9",  width:  44, height:  62 },
                    { dt: "B10", width:  31, height:  44 }
                ],

                C: [
                    { dt: "C0",  width: 917, height: 1297 },
                    { dt: "C1",  width: 648, height: 917 },
                    { dt: "C2",  width: 458, height: 648 },
                    { dt: "C3",  width: 324, height: 458 },
                    { dt: "C4",  width: 229, height: 324 },
                    { dt: "C5",  width: 162, height: 229 },
                    { dt: "C6",  width: 114, height: 162 },
                    { dt: "C7",  width:  81, height: 114 },
                    { dt: "C8",  width:  57, height:  81 },
                    { dt: "C9",  width:  40, height:  57 },
                    { dt: "C10", width:  28, height:  40 }
                ],

                D: [
                    { dt: "D0",  width: 771, height: 1091 },
                    { dt: "D1",  width: 545, height: 771 },
                    { dt: "D2",  width: 385, height: 545 },
                    { dt: "D3",  width: 272, height: 385 },
                    { dt: "D4",  width: 192, height: 272 },
                    { dt: "D5",  width: 136, height: 192 },
                    { dt: "D6",  width:  96, height: 136 },
                    { dt: "D7",  width:  68, height:  96 }
                ],

                N: [
                    { dt: "Broadsheet",   width: 431.8, height: 558.8 },
                    { dt: "Ledger / Tabloid", width: 279.4, height: 431.8 },
                    { dt: "Legal",        width: 215.9, height: 355.6 },
                    { dt: "Letter",       width: 215.9, height: 279.4 },
                    { dt: "Executive",    width: 184.15, height: 266.7 }, // 7.25 x 10.5
                    { dt: "Invoice",      width: 139.7, height: 215.9 },
                    { dt: "Junior Legal", width: 127,   height: 203.2 }
                ],

                P: [
                    { dt: "3R   (" + $L("“9×13 cm”") + ")",   width: 88.9,  height: 127 },
                    { dt: "4R   (" + $L("“10×15 cm”") + ")",  width: 101.6, height: 152.4 },
                    { dt: "4D",   width: 114.3, height: 152.4 },
                    { dt: "5R   (" + $L("“13×18 cm”") + ")",  width: 127,   height: 177.8 },
                    { dt: "6R",   width: 152.4, height: 203.2 },
                    { dt: "8R   (" + $L("“20×25 cm”") + ")",  width: 203.2, height: 254 },
                    { dt: "S8R   (" + $L("“20×30 cm”") + ")", width: 203.2, height: 304.8 },
                    { dt: "10R",  width: 254,   height: 304.8 },
                    { dt: "S10R", width: 254,   height: 381 },
                    { dt: "11R   (" + $L("“28×36 cm”") + ")", width: 279.4, height: 355.6 },
                    { dt: "S11R", width: 279.4, height: 431.8 },
                    { dt: "12R",  width: 304.8, height: 381 },
                    { dt: "S12R", width: 304.8, height: 457.2 },
                    { dt: "16R",  width: 406.4, height: 508 },
                    { dt: "S16R", width: 406.4, height: 609.6 },
                    { dt: "18R",  width: 457.2, height: 609.6 },
                    { dt: "S18R", width: 457.2, height: 685.8 },
                    { dt: "20R",  width: 508,   height: 609.6 },
                    { dt: "S20R", width: 508,   height: 762 },
                    { dt: "24R",  width: 609.6, height: 762 },
                    { dt: "S24R", width: 609.6, height: 914.4 },
                    { dt: "30R",  width: 762,   height: 1270 },
                    { dt: "40R",  width: 1016,  height: 1778 },
                    { dt: "50R",  width: 1270,  height: 2032 },
                ]
            }
        }
    };

    // menu labels and commands

    Papersizes.seriesMenuItems = [
        { command: 'A', label: Papersizes.seriesNames.A },
        { command: 'B', label: Papersizes.seriesNames.B },
        { command: 'C', label: Papersizes.seriesNames.C },
        { command: 'D', label: Papersizes.seriesNames.D },
        { command: 'N', label: Papersizes.seriesNames.N },
        { command: 'P', label: Papersizes.seriesNames.P }
    ];

    Papersizes.startSeriesPrefsItems = [
        { value: 'A', label: Papersizes.seriesNames.A },
        { value: 'B', label: Papersizes.seriesNames.B },
        { value: 'C', label: Papersizes.seriesNames.C },
        { value: 'D', label: Papersizes.seriesNames.D },
        { value: 'N', label: Papersizes.seriesNames.N },
        { value: 'P', label: Papersizes.seriesNames.P },
        { value: 'keeplast', label: $L("Keep last selected") }
    ];

    // create landscape formats

    Papersizes.seriesItems.L = new Object();
    for (s in Papersizes.seriesItems.P) {
        Papersizes.seriesItems.L[s] =
            Papersizes.seriesItems.P[s].map(
                function(item) {
                    return { dt: item.dt, width: item.height, height: item.width };
                });
    };


    // preferences / defaults

    Papersizes.prefs = {
        keeplast:     true,    // remeber last selected series when starting app again
        keeplastunit: true,    // remeber last selected unit when starting app again
        dpi:          300,     // for pixel sizes
        showaspectas: "ratio", // show aspect as ratio (1:x) instead of fraction (e.g. 4:3)
        showwelcome:  true,    // show welcome message (first startup)?
        appversion:   Mojo.Controller.appInfo.version,
                               // app version (show welcome at first startup with new version)
        prefsversion: 8        // internal version of preferences format
    };
    if (Mojo.Locale.getCurrentLocale() == "en_us") {
        Mojo.Log.info("Locale for default prefs: en_us");
        Papersizes.prefs.startseries = "N";
        Papersizes.prefs.unit =        "in";
    } else {
        Mojo.Log.info("Locale for default prefs: not en_us");
        Papersizes.prefs.startseries = "A";
        Papersizes.prefs.unit =        "mm";
    }

    Papersizes.prefsversion = 8; // required version of internal preferences format

    Papersizes.displaySettingsUpdated = false; // will be set to true from prefs when redisplay needed

    // app menu

    Papersizes.appMenuAttr = { omitDefaultItems: true };

    Papersizes.appMenuModel = {
        items: [
            { label: $L("Preferences"), command: 'do-prefs' },
            { label: $L("About"), command: 'do-about' }
        ]
    };

    // convert between units

    Papersizes.toUnit = function(x, unit) {
        var inch = x / 25.4;

        switch (unit) {
        case "mm":
            return Mojo.Format.formatNumber(x, { fractionDigits: 0 });
        case "in":
            var digits = 1;
            if ((inch % 1).toFixed(2) == 0.25) // special treatment for .25 in Executive
                digits = 2;
            return Mojo.Format.formatNumber(inch,
                                            { fractionDigits: digits });
        case "px":
            return Mojo.Format.formatNumber(inch * Papersizes.prefs.dpi,
                                            { fractionDigits: 0 });
        }
    }

    // greatest common divisor for aspect fraction calculation (algorithm
    // adapted from http://stackoverflow.com/q/8044419/23813)

    Papersizes.gcd = function(a, b){
        var aa = (a * 1.0).toFixed(); // ensure integers for further calculations (aa, bb)
        var bb = (b * 1.0).toFixed(); // multiply by 1.0 to ensure float (otherwise no toFixed() method)
        if (aa == 0 || bb == 0)
            return Math.abs(Math.max(Math.abs(aa), Math.abs(bb)));
        r = aa % bb;
        return (r != 0) ?
            Papersizes.gcd(bb, r) :
            Math.abs(bb);
    }
};


StageAssistant.prototype.setup = function() {
    /* this function is for setup tasks that have to happen when the
       stage is first created */

    // get preferences

    this.cookie = new Mojo.Model.Cookie("PapersizesPrefs");
    var cookiedata = this.cookie.get();
    if (cookiedata && cookiedata.prefsversion == Papersizes.prefsversion) {
        Mojo.Log.info("Read prefs cookie version", cookiedata.prefsversion);
        Papersizes.prefs = { startseries:  cookiedata.startseries,
                             keeplast:     cookiedata.keeplast,
                             unit:         cookiedata.unit,
                             keeplastunit: cookiedata.keeplastunit,
                             dpi:          cookiedata.dpi,
                             showaspectas: cookiedata.showaspectas,
                             showwelcome:  cookiedata.showwelcome,
                             appversion:   cookiedata.appversion,
                             prefsversion: cookiedata.prefsversion };
        Mojo.Log.info("Papersizes.prefs =", Papersizes.prefs);
    } else {
        Mojo.Log.info("Wrote new prefs cookie.");
        this.cookie.put(Papersizes.prefs);
    }

    if (Papersizes.prefs.appversion != Mojo.Controller.appInfo.version) {
        Papersizes.prefs.showwelcome = true;
        Papersizes.prefs.appversion = Mojo.Controller.appInfo.version;
        this.cookie.put(Papersizes.prefs);
    }

    // free orientation

    if (this.controller.setWindowOrientation) {
        this.controller.setWindowOrientation("free");
    }

    // push scene

    if (Papersizes.prefs.showwelcome)
        this.controller.pushScene("welcome", this.controller.getWindowOrientation(), true);
    else
        this.controller.pushScene("sizes-list", this.controller.getWindowOrientation());
};


/* Handle "About" menu */

StageAssistant.prototype.handleCommand = function(event) {
    this.controller = Mojo.Controller.stageController.activeScene();
    if (event.type == Mojo.Event.command) {
        switch (event.command) {
        case 'do-about':
            this.controller.
                showAlertDialog(
                    { onChoose:
                        function(value) {
                            switch (value) {
                            case "ok":
                                return;
                            case "moreinfo":
                                this.controller.stageController.
                                    pushScene("welcome",
                                              this.controller.getWindowOrientation,
                                              false);
                                break;
                            }
                        },
                      title: $L(Mojo.Controller.appInfo.title) + " "
                             + Mojo.Controller.appInfo.version,
                      message: this.aboutMessage,
                      allowHTMLMessage: true,
                      choices:[
                          { label: $L("More info / change log"), type: "secondary", value: "moreinfo" },
                          { label: $L("OK"), type: "primary", value: "ok" }
                      ]
                    });
            break;
        }
    }
};
