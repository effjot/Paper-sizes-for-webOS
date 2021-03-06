function SizesListAssistant(windowOrientation) {
    /* this is the creator function for your scene assistant
       object. It will be passed all the additional parameters (after
       the scene name) that were passed to pushScene. The reference to
       the scene controller (this.controller) has not be established
       yet, so any initialization that needs the scene controller
       should be done in the setup function below. */

    this.pageOrientation = this.getPageOrientation(windowOrientation);

    this.series     = Papersizes.prefs.startseries;
    this.seriesName = Papersizes.seriesNames[this.series];
    if (this.pageOrientation == "L"
        && this.series != "ENVISO" && this.series != "ENVNAM")
        this.seriesName += " " + $L("(Landscape)");

    this.unit       = Papersizes.prefs.unit;

    this.items      = this.listItemsUnitConversion(
        Papersizes.seriesItems[this.pageOrientation][this.series]);

    this.cookie = new Mojo.Model.Cookie("PapersizesPrefs");
}


SizesListAssistant.prototype.setup = function() {
    /* this function is for setup tasks that have to happen when the
       scene is first created */

    /* use Mojo.View.render to render view templates and add them to
       the scene, if needed */


    /* setup widgets here */

    // app menu

    this.controller.setupWidget(Mojo.Menu.appMenu, Papersizes.appMenuAttr,
                                Papersizes.appMenuModel);


    // view menu (choose paper size series)

    this.viewMenuModel = {
        visible: true,
        items: [ {},            // empty item for centering
                 { items: [
                       { label:   this.seriesName,
                         width:   window.innerWidth,
                         submenu: "series-menu" }
                   ]
                 },
                 {}             // empty item for centering
               ] };
    this.viewMenuAttr = { spacerHeight: 0 };
    this.controller.setupWidget(Mojo.Menu.viewMenu, this.viewMenuAttr,
                                this.viewMenuModel);

    this.seriesMenuModel = { items: Papersizes.seriesMenuItems };
    this.controller.setupWidget("series-menu", undefined,
                                this.seriesMenuModel);

    // command menu (choose units)

    this.controller.setupWidget(Mojo.Menu.commandMenu, { menuClass: "fade" },
                                {
                                    items: [
                                        {}, // centering
                                        {
                                            items: [
                                                { label: $L("mm"), command: "mm"},
                                                { label: $L("in"), command: "in", width: 51},
                                                                // without width, nothing is
                                                                // displayed ("in" too narrow);
                                                                // must be at least 51
                                                { label: $L("pt"), command: "pt"},
                                                { label: $L("px"), command: "px"},
                                                { label: $L("asp."), command: "aspect"}
                                            ],
                                            toggleCmd: this.unit
                                        },
                                        {} // centering
                                    ]
                                });

    // list of sizes in the series

    this.listAttr = { itemTemplate: "sizes-list/listitem" };
    this.listModel = { items: this.items };
    this.controller.setupWidget("sizes-list", this.listAttr,
                                this.listModel);


    /* add event handlers to listen to events from widgets */

};


SizesListAssistant.prototype.activate = function(event) {
    /* put in event handlers here that should only be in effect when
       this scene is active. For example, key handlers that are
       observing the document */

    if (Papersizes.displaySettingsUpdated &&
        (this.unit == "px" || this.unit == "aspect")) {
        Mojo.Log.info("SizesListAssistant.activate(): displaySettingsUpdated");
        this.updateListModel();
    }
};


SizesListAssistant.prototype.deactivate = function(event) {
    /* remove any event handlers you added in activate and do any
       other cleanup that should happen before this scene is popped or
       another scene is pushed on top */
};


SizesListAssistant.prototype.cleanup = function(event) {
    /* this function should do any cleanup needed before the scene is
       destroyed as a result of being popped off the scene stack */
};


SizesListAssistant.prototype.handleCommand = function(event) {
    if (event.type == Mojo.Event.command) {

        var seriesSelected = false;
        var unitSelected   = false;

        switch (event.command) {

        case "A":
        case "B":
        case "C":
        case "D":
        case "N":
        case "ANSI":
        case "ARCH":
        case "ENVISO":
        case "ENVNAM":
        case "P":
            this.series = event.command;
            seriesSelected = true;
            break;

        case "mm":
        case "in":
        case "pt":
        case "px":
        case "aspect":
            this.unit = event.command;
            unitSelected = true;
            break;

        case "do-prefs":
            Mojo.Controller.stageController.pushScene("prefs", this.series, this.unit);
            break;

        default:
            return;
        }

        if (seriesSelected) {
            this.seriesName = Papersizes.seriesNames[this.series];
            if (this.pageOrientation == "L"
                && this.series != "ENVISO" && this.series != "ENVNAM")
                this.seriesName += " " + $L("(Landscape)");
            this.viewMenuModel.items[1].items[0].label = this.seriesName;
            this.controller.modelChanged(this.viewMenuModel, this);

            this.updateListModel();

            if (Papersizes.prefs.keeplast) {
                Papersizes.prefs.startseries = this.series;
                this.cookie.put(Papersizes.prefs);
            }
        }

        if (unitSelected) {
            this.updateListModel();
            if (Papersizes.prefs.keeplastunit) {
                Papersizes.prefs.unit = this.unit;
                this.cookie.put(Papersizes.prefs);
            }
        }
    }
}


SizesListAssistant.prototype.orientationChanged = function(windowOrientation) {
    this.pageOrientation = this.getPageOrientation(windowOrientation);

    this.seriesName = Papersizes.seriesNames[this.series];
    if (this.pageOrientation == "L"
        && this.series != "ENVISO" && this.series != "ENVNAM")
        this.seriesName += " " + $L("(Landscape)");
    this.viewMenuModel.items[1].items[0].label = this.seriesName;
    this.viewMenuModel.items[1].items[0].width = window.innerWidth;
    this.controller.modelChanged(this.viewMenuModel, this);

    this.updateListModel();
}


SizesListAssistant.prototype.getPageOrientation = function(windowOrientation) {
    switch (windowOrientation) {
    case "up":
    case "down":
        return "P";
    case "left":
    case "right":
        return "L";
    }
}


SizesListAssistant.prototype.updateListModel = function() {
    this.listModel.items =
        this.listItemsUnitConversion(
            Papersizes.seriesItems[this.pageOrientation][this.series]);
    this.controller.modelChanged(this.listModel, this);
}


SizesListAssistant.prototype.listItemsUnitConversion = function(items, unit) {
    if (!unit) var unit = this.unit;
    Mojo.Log.info("conversion to", unit);

    if (unit != "aspect") {
        return items.map(function(item) {
            return { dt: item.dt,
                     width: Papersizes.toUnit(item.width, unit),
                     symbol: " × ",
                     height: Papersizes.toUnit(item.height, unit) };
        });
    } else {
        return items.map(function(item) {
            var width  = item.width  * 100; // ensure integers (sizes are to 1/10 or 1/100 of a mm)
            var height = item.height * 100;
            var reswidth, resheight;

            if (Papersizes.prefs.showaspectas == "ratio") {
                var asp = height / width;
                resheight = Mojo.Format.formatNumber(asp, { fractionDigits: 3 });
                reswidth = 1;
            } else {
                var gcd = Papersizes.gcd(width, height);
                reswidth = Mojo.Format.formatNumber(width / gcd,
                                                    { fractionDigits: 0 });
                resheight = Mojo.Format.formatNumber(height / gcd,
                                                     { fractionDigits: 0 });
            }

            return { dt: item.dt,
                     width: reswidth,
                     symbol: " : ",
                     height: resheight
                   };
        });
    }
}
