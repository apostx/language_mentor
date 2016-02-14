package languagementor.db.api.data;

import java.util.List;
import languagementor.db.api.google.data.PhraseTranslationData;

public interface ICollectionData {
	String getId();
	
	String getTitle();
    
    List<PhraseTranslationData> getCollection();
}
