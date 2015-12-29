
#I18n
  - i18n: why do we have ModeLabels.js + presence of the ModeLabels in I18NMessages again
  - i18n: how is it managed by other frameworks. Is there any emerging standard for React apps ?

#Formatting
  - conventions
  - see if it's possible to see in a source editor that a function overrides a parent one
  - I18NMessages -> I18nMessages ?

#Source folders
  - LESS files / JS files and folders

#Naming
 - mui -> maui ? Capitalized or not ? Maui ? (for React we use import React from 'react')

#Mosaic-ui-map:
  - map background tiles URL: can be set via this.props.tilesUrl but how to pass that property ?
  - map background: in a later stage, manage several layers (see 'externalize it' in Map.js) eg land + labels

#Mosaic-ui-list:
  - icons configuration
    - icons used by the list pagination widget (instead of the default glyphicons)
    - collapse / expand button icon in the list title
  - see how to update the list title style when the list is collapsed / expanded
  - see we can avoid to overwrite the function `_updateSearchResultsHeight` just for setting the space below the list
  - check if we still need ListItemLayout in ListItemView
