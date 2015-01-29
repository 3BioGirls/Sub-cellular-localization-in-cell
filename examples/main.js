

  app = require("biojs-sub-cellular-localization-in-cell");
  app.cell();

  //Getting public functions
  view = app.view;

  //Function to set picture path
  view.setPath("../img/");

  //Setting html functions
  var mouseEventHandler = view.mouseEventHandler;
  var ClearPopup = view.ClearPopup;
  var showHighlightScore = view.showHighlightScore;
  var main = view.main;
