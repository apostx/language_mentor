package languagementor.db.api.google.data;

import com.google.appengine.repackaged.com.google.gson.annotations.SerializedName;

public class PhraseTranslationTargetData {
    
    @SerializedName("targetPhrase")
    private final PhraseData _targetPhrase;
    
    @SerializedName("sourceExamplePhrase")
    private final PhraseData _sourceExamplePhrase;
    
    @SerializedName("targetExamplePhrase")
    private final PhraseData _targetExamplePhrase;
    
    public PhraseTranslationTargetData(PhraseData targetPhrase, PhraseData sourceExamplePhrase, PhraseData targetExamplePhrase) {
        _targetPhrase = targetPhrase;
        _sourceExamplePhrase = sourceExamplePhrase;
        _targetExamplePhrase = targetExamplePhrase;
    }

    public PhraseData getTargetPhrase() {
        return _targetPhrase;
    }

    public PhraseData getSourceExamplePhrase() {
        return _sourceExamplePhrase;
    }

    public PhraseData getTargetExamplePhrase() {
        return _targetExamplePhrase;
    }
}
