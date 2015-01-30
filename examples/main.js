var app = require("biojs-sub-cellular-localization-in-cell");

var instance = new app({
  path: "../img/"
});

//Getting public functions
var view = instance.view;

//Setting html functions
var mouseEventHandler = view.mouseEventHandler;
var ClearPopup = view.ClearPopup;
var showHighlightScore = view.showHighlightScore;
var main = view.main;
