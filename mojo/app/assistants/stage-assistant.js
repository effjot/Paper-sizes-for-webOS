function StageAssistant() {
    /* this is the creator function for your stage assistant object */

    this.aboutMessage =
        "<div style=\"float: right\"><img src=\"images/fj-logo.png\"></div>"
        + $L("Copyright 2011, Florian Jenn.") + " "
        + "<a href=\""
        + Mojo.Controller.appInfo.vendorurl
        + "\">www.effjot.net</a><br/>"
        + "<div style=\"clear: both\">"
        + $L("A collection of common ISO/DIN and North American paper size series.")
        + "</div>";


    /* Global variable holding data and preferences */

    Papersizes = {};

    // Paper size definitions

    Papersizes.seriesNames = {
        A: $L("ISO 216 Series A"),
        B: $L("ISO 216 Series B"),
        C: $L("ISO 216 Series C"),
        D: $L("ISO 216 Series D"),
        N: $L("North American Sizes")
    };

    Papersizes.seriesMenuItems = [
        { command: 'A', label: Papersizes.seriesNames.A },
        { command: 'B', label: Papersizes.seriesNames.B },
        { command: 'C', label: Papersizes.seriesNames.C },
        { command: 'D', label: Papersizes.seriesNames.D },
        { command: 'N', label: Papersizes.seriesNames.N }
    ];

    Papersizes.seriesItemsPortrait = {
        A: [
            { dt: "A0",  width: "841", height: "1189" },
            { dt: "A1",  width: "594", height: "841" },
            { dt: "A2",  width: "420", height: "594" },
            { dt: "A3",  width: "297", height: "420" },
            { dt: "A4",  width: "210", height: "297" },
            { dt: "A5",  width: "148", height: "210" },
            { dt: "A6",  width: "105", height: "148" },
            { dt: "A7",  width:  "74", height: "105" },
            { dt: "A8",  width:  "52", height:  "74" },
            { dt: "A9",  width:  "37", height:  "52" },
            { dt: "A10", width:  "26", height:  "37" }
        ],

        B: [
            { dt: "B0",  width: "1000", height: "1414" },
            { dt: "B1",  width: "707", height: "1000" },
            { dt: "B2",  width: "500", height: "707" },
            { dt: "B3",  width: "353", height: "500" },
            { dt: "B4",  width: "250", height: "353" },
            { dt: "B5",  width: "176", height: "250" },
            { dt: "B6",  width: "125", height: "176" },
            { dt: "B7",  width:  "88", height: "125" },
            { dt: "B8",  width:  "62", height:  "88" },
            { dt: "B9",  width:  "44", height:  "62" },
            { dt: "B10", width:  "31", height:  "44" }
        ],

        C: [
            { dt: "C0",  width: "917", height: "1297" },
            { dt: "C1",  width: "648", height: "917" },
            { dt: "C2",  width: "458", height: "648" },
            { dt: "C3",  width: "324", height: "458" },
            { dt: "C4",  width: "229", height: "324" },
            { dt: "C5",  width: "162", height: "229" },
            { dt: "C6",  width: "114", height: "162" },
            { dt: "C7",  width:  "81", height: "114" },
            { dt: "C8",  width:  "57", height:  "81" },
            { dt: "C9",  width:  "40", height:  "57" },
            { dt: "C10", width:  "28", height:  "40" }
        ],

        D: [
            { dt: "D0",  width: "771", height: "1091" },
            { dt: "D1",  width: "545", height: "771" },
            { dt: "D2",  width: "385", height: "545" },
            { dt: "D3",  width: "272", height: "385" },
            { dt: "D4",  width: "192", height: "272" },
            { dt: "D5",  width: "136", height: "192" },
            { dt: "D6",  width:  "96", height: "136" },
            { dt: "D7",  width:  "68", height:  "96" }
        ],

        N: [
            { dt: "Broadsheet",   width: "432", height: "559" },     // 241488 mm²
            { dt: "Ledger / Tabloid", width: "279", height: "432" }, // 120528 mm²
            { dt: "Legal",        width: "216", height: "356" },     //  76896 mm²
            { dt: "Letter",       width: "216", height: "279" },     //  60264
            { dt: "Executive",    width: "184", height: "267" },     //  49128
            { dt: "Invoice",      width: "140", height: "216" },     //  30240
            { dt: "Junior Legal", width: "127", height: "203" }      //  25781
        ]
    };

    // create landscape formats

    Papersizes.seriesItemsLandscape = new Object();
    for (s in Papersizes.seriesItemsPortrait) {
        Papersizes.seriesItemsLandscape[s] =
            Papersizes.seriesItemsPortrait[s].map(
                function(item) {
                    return { dt: item.dt, width: item.height, height: item.width };
                });
    };

    Papersizes.seriesItems = {
        P: Papersizes.seriesItemsPortrait,
        L: Papersizes.seriesItemsLandscape
    };

    // preferences

    Papersizes.prefs = {
        startseries: "A",
        keeplast:    true // not yet used; last series always kept
    };

    // app menu

    Papersizes.appMenuAttr = { omitDefaultItems: true };

    Papersizes.appMenuModel = {
        items: [
            {label: $L("About"), command: 'do-about' }
        ]
    };
};


StageAssistant.prototype.setup = function() {
    /* this function is for setup tasks that have to happen when the
       stage is first created */

    // get preferences

    this.cookie = new Mojo.Model.Cookie("PapersizesPrefs");
    var cookiedata = this.cookie.get();
    if (cookiedata) {
        Papersizes.prefs = { startseries: cookiedata.startseries };
    } else {
        this.cookie.put(Papersizes.prefs);
    }

    // free orientation

    if (this.controller.setWindowOrientation) {
        this.controller.setWindowOrientation("free");
    }

    // push scene

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
                    { onChoose: function(value) {},
                      title: $L(Mojo.Controller.appInfo.title) + " "
                             + Mojo.Controller.appInfo.version,
                      message: this.aboutMessage,
                      allowHTMLMessage: true,
                      choices:[
                          { label:$L("OK"), value:"" }
                      ]
                    });
            break;
        }
    }
};
