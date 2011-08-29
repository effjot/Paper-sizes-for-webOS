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
    if (this.pageOrientation == "L")
        this.seriesName += " " + $L("(Landscape)");
    this.items      = Papersizes.seriesItems[this.pageOrientation][this.series];

    this.cookie = new Mojo.Model.Cookie("PapersizesPrefs");
}


SizesListAssistant.prototype.setup = function() {
    /* this function is for setup tasks that have to happen when the
       scene is first created */

    /* use Mojo.View.render to render view templates and add them to
       the scene, if needed */


    /* setup widgets here */

    /* app menu */

    this.controller.setupWidget(Mojo.Menu.appMenu, Papersizes.appMenuAttr,
                                Papersizes.appMenuModel);


    /* view menu (choose paper size series) */

    this.viewMenuModel = {
        visible: true,
        items: [ {},            // empty item for centering
                 { items: [
                       { label:   this.seriesName,
                         width:   window.innerWidth,
                         submenu: 'series-menu' }
                   ]
                 },
                 {}             // empty item for centering
               ] };
    this.viewMenuAttr = { spacerHeight: 0 };
    this.controller.setupWidget(Mojo.Menu.viewMenu, this.viewMenuAttr,
                                this.viewMenuModel);

    this.seriesMenuModel = { items: Papersizes.seriesMenuItems };
    this.controller.setupWidget('series-menu', undefined,
                                this.seriesMenuModel);


    /* list of sizes in the series */

    this.listAttr = { itemTemplate: 'sizes-list/listitem' };
    this.listModel = { items: this.items };
    this.controller.setupWidget('sizes-list', this.listAttr,
                                this.listModel);

    this.controller.get("info").update($L("Lengths in mm"));


    /* add event handlers to listen to events from widgets */

};


SizesListAssistant.prototype.activate = function(event) {
    /* put in event handlers here that should only be in effect when
       this scene is active. For example, key handlers that are
       observing the document */
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

        switch (event.command) {
        case 'A':
        case 'B':
        case 'C':
        case 'D':
        case 'N':
            this.series = event.command;
            seriesSelected = true;
            event.stopPropagation();
            break;
        }

        if (seriesSelected) {
            this.seriesName = Papersizes.seriesNames[this.series];
            if (this.pageOrientation == "L")
                this.seriesName += " " + $L("(Landscape)");
            this.viewMenuModel.items[1].items[0].label = this.seriesName;
            this.controller.modelChanged(this.viewMenuModel, this);

            this.listModel.items =
                Papersizes.seriesItems[this.pageOrientation][this.series];
            this.controller.modelChanged(this.listModel, this);

            this.cookie.put({
                startseries: this.series
            });
        }
    }
};


SizesListAssistant.prototype.orientationChanged = function(windowOrientation) {
    this.pageOrientation = this.getPageOrientation(windowOrientation);

    this.seriesName = Papersizes.seriesNames[this.series];
    if (this.pageOrientation == "L")
        this.seriesName += " " + $L("(Landscape)");
    this.viewMenuModel.items[1].items[0].label = this.seriesName;
    this.viewMenuModel.items[1].items[0].width = window.innerWidth;
    this.controller.modelChanged(this.viewMenuModel, this);

    this.listModel.items =
        Papersizes.seriesItems[this.pageOrientation][this.series];
    this.controller.modelChanged(this.listModel, this);
};


SizesListAssistant.prototype.getPageOrientation = function(windowOrientation) {
    switch (windowOrientation) {
    case 'up':
    case 'down':
        return 'P';
    case 'left':
    case 'right':
        return 'L';
    }
};
