MongolPackage = {
  'startup': function () {
    console.log("This application contains Mongol. Press Control + M to activate it.");
    console.log("Mongol comes with a few security pre-cautions that you should read about here: ");
    console.log("https://github.com/msavin/Mongol");
  },
  'toggleDisplay': function () {

    var displayStatus = Session.get("Mongol_settings_display");

    if (displayStatus) {
      Session.set("Mongol_settings_display", false);
    } else {
      Session.set("Mongol_settings_display", true);
    }
  },
  'colorize': function (json) {
    // colorized the JSON objects
    if (typeof json != 'string') {
      json = JSON.stringify(json, undefined, 2);
    }
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function(match) {
      var cls = 'Mongol_number';
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = 'Mongol_key';
        } else {
          cls = 'Mongol_string';
        }
      } else if (/true|false/.test(match)) {
        cls = 'Mongol_boolean';
      } else if (/null/.test(match)) {
        cls = 'Mongol_null';
      }
      return '<span class="' + cls + '">' + match + '</span>';
    });
  },
  'getDocumentUpdate': function (data) {

    var elementID = 'MongolDoc_' + data,
      newData = document.getElementById(elementID).textContent;

    return newData;

  },
  'error': function (data) {

    switch (data) {
      case "json.parse":
        alert("There is an error with your JSON syntax.");
        break;
      case "duplicate":
        alert("Strange, there was an error duplicating your document.");
        break;
      case "remove":
        alert("Strange, there was an error removing your document.");
        break;
      case "insert":
        alert("Strange, there was an error inserting your document.");
        break;
      case "update":
        alert("There was an error updating your document. Please review your changes and try again.");
        break;
      case "permission":
        // under consideration
        alert("This Meteor applications looks to be deployed in debug mode. Mongol cannot edit this document because it onlys works if the absolute URL beings with 'http://localhost:'")
      default:
        return "Request Credentials";
        break;
    }

  },
  'parse': function (data) {
    // FIXME: variable newObject is not defined - or is it some global var from somewhere?
    newObject = false;

    try {
      newObject = JSON.parse(data);
    } catch (error) {
      MongolPackage.error("json.parse");
    }

    return newObject;

  }
};
