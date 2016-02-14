function onOpen() {
  var menu = SpreadsheetApp.getUi().createMenu('Custom');
  menu.addItem('Init Pronunciation', 'initPronunciation').addToUi();
  menu.addItem('Clear Pronunciation', 'clearPronunciation').addToUi();
}

function clearPronunciation() {
  SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getRange("B1:C").setValue("");
  SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getRange("H1:I").setValue("");
  
  SpreadsheetApp.flush();
}

function initPronunciation() {
  var s = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var content = getAllValue(s);
  var phrase;
  var phraseData;
  var j;
  
  for (var i = 0 ; i < content.length ; ++i) {
    phrase = content[i][0];
      
    if (phrase != "") {
      var phraseData = getPhraseData(phrase);
          
      if (phraseData) {
        s.getRange(i+1, 2).setValue(phraseData.pron || "");
        s.getRange(i+1, 3).setValue(phraseData.sound || "");
      }
    }
  }
  
  SpreadsheetApp.flush();
}

function getAllValue(sheet) {
  return sheet.getRange("A1:D").getValues();
}

function getPhraseData(phrase) {
  var words = removeComments(phrase).split(/[ ]+/);

  switch (words.length) {
    case 0:
      return null;
      
    case 1:
      var d = dictionary.get(words[0]);
      
      if (d)
        return (d.weakPron && d.strongPron) ? {pron:d.weakPron.concat("; ",d.strongPron), sound:d.sound} : d;

      else
        return null;
      
    default:
      var word = null;
      for (var i = 0; i < words.length; ++i) {
        word = dictionary.get(words[i]);
        
        if (word && (word.pron || word.weakPron))
          words[i] = word.pron || word.weakPron;
        
        else
          return null;
      }
      
      return {pron:words.join(" ")};
  }
}

function removeComments(str) {
  var newStr = str.replace(/[\(][^\(\)]+[\)]/g," ").replace(/^[ ]+|[ ]+$/g, "").replace(/[ ]{2,}/g," ");

  return newStr === str ? newStr : removeComments(newStr);
}