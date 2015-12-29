##I18n
  - i18n: remove `*Labels.js`
  - see also https://github.com/yahoo/react-intl
  - https://hacks.mozilla.org/2014/12/introducing-the-javascript-internationalization-api/
  - see also the module used by uMap

##Conventions
  - see if it's possible to see in a source editor that a function overrides a parent one
  - conventions
  - I18NMessages -> I18nMessages ?
  - mui -> mau ? Capitalized or not ? See if existing conventions in JavaScript
  - https://github.com/airbnb/javascript

##Source folders
  - LESS files / JS files and folders
  - lib -> src ? see also what we do for others

##Mosaic-ui-map
  - map background tiles URL: can be set via this.props.tilesUrl but how to pass that property ?
  - map background: in a later stage, manage several layers (see 'externalize it' in Map.js) eg land + labels

##Mosaic-ui-list
  - introduce a config object (instead of labels) ?
  - configuration of:
    - icons used by the list pagination widget (instead of the default glyphicons)
    - collapse / expand button icon in the list title
    - space below the list (instead of rewriting `_updateSearchResultsHeight`)
    - ...
  - a CSS class reflecting the list state (collapsed/expanded) would be handy in the list container for adapting the internal widgets rendering
  - check if we still need ListItemLayout in ListItemView
