package languagementor.db.api.google.data;

import com.google.appengine.repackaged.com.google.gson.annotations.SerializedName;
import java.util.ArrayList;
import java.util.List;

public class PhraseTranslationData {

	@SerializedName("sourcePhrase")
	private final PhraseData _sourcePhrase;

	@SerializedName("translationList")
	private final List<PhraseTranslationTargetData> _translationTargetList;

	public PhraseTranslationData(PhraseData sourcePhrase) {
		_sourcePhrase = sourcePhrase;
		_translationTargetList = new ArrayList<PhraseTranslationTargetData>();
	}

	public PhraseData getSourcePhrase() {
		return _sourcePhrase;
	}

	public List<PhraseTranslationTargetData> getTranslationTargetList() {
		return _translationTargetList;
	}
}
