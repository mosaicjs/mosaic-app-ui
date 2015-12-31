##Select
  - check if any local adaptation can be proposed upstream
  - the discard button does not seem to work

##Leaflet
  - Leaflet discussion group: https://groups.google.com/forum/#!forum/leaflet-js
  - Canvas plugin:
      Full name:  Leaflet Canvas Data Grid Tile Layer
      JS class name: Leaflet.TileLayer.CanvasDataGrid
      Short name (to appear on the Leaflet plugins page): TileLayer.CanvasDataGrid

##Conventions
  - see if it's possible to see in a source editor that a function overrides a parent one
  - conventions
  - I18NMessages -> I18nMessages ?
  - mui -> mau ? Capitalized or not ? See if existing conventions in JavaScript
  - package naming: should we use a dash or a point as separator? mosaic.app, mosaic.ui.map, ...

  ###Airbnb

https://github.com/airbnb/javascript

###ProseMirror

Explore the code structure of ProseMirror and CodeMirror + recommendations in Eloquent JavaScript

###Leaflet

https://github.com/Leaflet/Leaflet

- Usage of dots for naming projects, for example: Leaflet.markercluster

### Meteor

Everything in one project https://github.com/meteor/meteor

##Libs
  - Consider using Saas instead of LESS?

##Source folders
  - LESS files / JS files and folders
  - all libs: update `lib` into `src` ? see how the src folder is named in other projects

##I18n
  - i18n: remove `*Labels.js`
  - see also https://github.com/yahoo/react-intl
  - https://hacks.mozilla.org/2014/12/introducing-the-javascript-internationalization-api/
  - see also the module used by uMap

##Mosaic-app-core
  - We may rename this project into mosaic-app and mosaic-app-ui into mosaic-app-map?

##Mosaic-ui-map
  - map background tiles URL: can be set via this.props.tilesUrl but how to pass that property ?
  - map background: in a later stage, manage several layers (see 'externalize it' in Map.js) eg land + labels

##Mosaic-ui-list
  - the CSS classes relating to the list are currently prefixed with `search-results`: `search-results-title`, `search-results-container`, etc. We may consider renaming this prefix to `list`? (as the search results could have other representations: maps, graphs, ...). Shouldn't the search-results-title element be moved to the search-results-container block?
      search-container
        search-box-container
          search-input-container
          search-results-title (-> list-title)
        search-results-container (-> list-container)
  - introduce a config object (instead of labels) ?
  - configuration of:
    - icons used by the list pagination widget (instead of the default glyphicons)
    - collapse / expand button icon in the list title
    - space below the list (instead of rewriting `_updateSearchResultsHeight`)
    - to be completed
  - a CSS class reflecting the list state (collapsed/expanded) would be handy in the list container for adapting the internal widgets rendering
  - check if we still need ListItemLayout in ListItemView

##Mosaic-app-ui
  - rename AppScreen and AppScreenView into Screen, ScreenView?
  - what's the main difference between Screen and ScreenView and how can we reflect that in their respective names?h
  - MainApplication extends Application. What does MainApplication bring to Application and how can we reflect this into its name?
  - desktop layout: header / map / search-panel / footer
      -> header / map / search-box / list / footer ?
      -> header / search-box / workspace / footer ?

##Community
  - Mailman hosting: http://www.mailmanlists.net/

##Prm
  - why this.get('key') and not this.get('type') for retrieving the type property of a resource ? (in TypeSearchCritera)
  - rename `lib` into `src` ?
  - check that all resources have a unique id (for creating a unique react id key for each of them)
  - resourceListItemView: why do we need a bind for handling the click?
  - how to replace the `map` function of Underscore (see ResourceListItem.renderNetworks)
