var dictionary = {};
  
dictionary.get = function(word) {
  return this.cambridge.get(word);
};

dictionary.cambridge = {};
  
var dc = dictionary.cambridge;
  
dc._getUrlCambridge = "http://dictionary.cambridge.org/license/chromeapp/dictionary/english/$1";
dc._getUrlYahoo = "https://query.yahooapis.com/v1/public/yql?format=xml&q=$1";
  
dc._query = "select * from html where url = '$1' and xpath = '$2'";

dc._xPathStrogPron = "(//div[@id=\"dataset-british\"]//span[@class=\"uk\"]/span[@class=\"pron\"]/span[@class=\"lab\" and text()=\"strong\"]/../span[@class=\"ipa\"])[1]/descendant::text()";
dc._xPathWeakPron  = "(//div[@id=\"dataset-british\"]//span[@class=\"uk\"]/span[@class=\"pron\"]/span[@class=\"lab\" and text()=\"weak\"]/../span[@class=\"ipa\"])[1]/descendant::text()";
dc._xPathPron      = "(//div[@id=\"dataset-british\"]//span[@class=\"uk\"]/span[@class=\"pron\"]/span[@class=\"ipa\"])[1]/descendant::text()";
dc._xPathAudio     = "(//div[@id=\"dataset-british\"]//span[@class=\"uk\"]/span[@data-src-mp3])[1]/@data-src-mp3";

dc._xPath = "//div[@id=\"dataset-british\"]/*/*/span[@class=\"entry\"][1]/*/div[@class=\"pos-header\"][1]//span[@class=\"uk\"]/span[@class=\"pron\"] | //div[@id=\"dataset-british\"]/*/*/span[@class=\"entry\"][1]/*/div[@class=\"pos-header\"][1]//span[@class=\"uk\"]/span/@data-src-mp3";

dc._getXPathResults = function(xPath, word) {
  var cambridgeUrl = this._getUrlCambridge.replace("$1",this._prepareWord(word));
  var query = this._query.replace("$1",cambridgeUrl).replace("$2",xPath);
  var url = this._getUrlYahoo.replace("$1",encodeURIComponent(query));
  return XmlService.parse(UrlFetchApp.fetch(url).getContentText()).getRootElement().getChild("results");
}

dc._prepareWord = function(word) {
  return encodeURIComponent(
    word.toLowerCase()
      .replace("á","a")
      .replace("é","e")
      .replace("í","i")
      .replace("ó","o")
      .replace("ő","ö")
      .replace("ú","u")
      .replace("ű","ü")
      .replace(/[^a-z\-]|/g, "")
  );
}

dc._getStrongPron = function(word) {
  return this._getXPathResults(this._xPathStrogPron,word).getValue();
}

dc._getWeakPron = function(word) {
  return this._getXPathResults(this._xPathWeakPron,word).getValue();
}

dc._getPron = function(word) {
  var tmp = this._getXPathResults(this._xPathPron,word);
  var asd = tmp.getText();
  
  return tmp.getValue();
}

dc._getAudio = function(word) {
  var results = this._getXPathResults(this._xPathAudio,word).getChildren();
  return 0 < results.length ? results[0].getAttribute("data-src-mp3").getValue() : null;
}

dc.get = function(word) {
  var result = null;
  
  var strongPron = this._getStrongPron(word);
  var weakPron = this._getWeakPron(word);

  if (strongPron && weakPron)
    result = {strongPron:strongPron, weakPron:weakPron};
    
  else {
    var pron = this._getPron(word);
    
    if (pron)
      result = {pron:pron};
  }
  
  var sound = this._getAudio(word);
  
  if (sound) {
    result = result || {};
    result.sound = sound;
  }
  
  return result;
}