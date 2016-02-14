package languagementor.db.api.google.data;

import com.google.appengine.repackaged.com.google.gson.annotations.SerializedName;

public class PhraseData {

    @SerializedName("phrase")
    private final String _phrase;
    
    @SerializedName("phonetic")
    private final String _phonetic;
    
    @SerializedName("audio")
    private final String _audio;

    public PhraseData(String phrase, String phonetic, String audio) {
        _phrase = phrase;
        _phonetic = phonetic;
        _audio = audio;
    }
    
    public String getPharse() {
        return _phrase;
    }
    
    public String getPhonetic() {
        return _phonetic;
    }
    
    public String getAudio() {
        return _audio;
    }
}
