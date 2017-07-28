# Magick
A MTG card querying tool using Angular JS (1.6)

# Objective
Create a full fledged Angular app that leverages the MTG API's data about cards and
card sets. Provide search and view capabilities initially. Add special ordering, custom
decks, metrics and statistics in future versions.

# Notes
The project has brought the differences between AngularJS < 1.4 and AngularJS > 1.5 into
sharp relief. Directives (restrict: 'E') are not the preferred vehicle for making custom
elements anymore. Now you should use components. Apparently, components must have a name
that starts with a lowercase letter or Angular's injector will puke. ngRepeat is a finnicky
beast that bears much closer examination.
